
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat as GeminiChat, GenerateContentResponse } from "@google/genai";
import { Message, Source } from '../types';
import { IconUser, IconBot, IconSend, IconSource } from './Icons';

// Helper function to check for Gemini API key
const isApiKeySet = (): boolean => !!process.env.API_KEY;

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [chat, setChat] = useState<GeminiChat | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Effect to initialize the chat session
    useEffect(() => {
        if (!isApiKeySet()) {
            setError("API_KEY environment variable not set. Please set it to use the application.");
            return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        
        const systemInstruction = `You are an advanced conversational healthcare assistant named MediQuery. Provide medically relevant, instruction-following responses. 
        IMPORTANT: You are an AI assistant, not a doctor. Always strongly advise the user to consult with a qualified healthcare professional for any medical advice or diagnosis. 
        Use Google Search to ground your answers in verifiable, up-to-date information and always cite your sources clearly when you use them. Do not provide information if you cannot find a reliable source.`;

        const newChat = ai.chats.create({
            model: 'gemini-2.5-flash-preview-04-17',
            config: {
                systemInstruction: systemInstruction,
                tools: [{ googleSearch: {} }],
            },
        });

        setChat(newChat);
        setMessages([
            {
                id: 'init-message',
                role: 'model',
                text: 'Hello! I am MediQuery. How can I help you with your health questions today? Please remember, I am an AI assistant and not a medical professional.'
            }
        ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Effect to scroll to the bottom of the chat on new messages
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !chat) {
            return;
        }
        
        const userMessage: Message = { id: Date.now().toString(), role: 'user', text: userInput.trim() };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setIsLoading(true);
        setError(null);
        
        try {
            const response: GenerateContentResponse = await chat.sendMessage({ message: userInput.trim() });

            const modelText = response.text;
            
            const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
            const sources: Source[] = groundingChunks
                .filter(chunk => chunk.web && chunk.web.uri && chunk.web.title)
                .map(chunk => ({
                    uri: chunk.web.uri!,
                    title: chunk.web.title!
                }));
            
            // Deduplicate sources based on URI
            const uniqueSources = Array.from(new Map(sources.map(item => [item['uri'], item])).values());

            const modelMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: modelText,
                sources: uniqueSources.length > 0 ? uniqueSources : undefined,
            };
            setMessages(prev => [...prev, modelMessage]);

        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to get response. ${errorMessage}`);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: 'Sorry, I encountered an error. Please try again later.'
            }]);
        } finally {
            setIsLoading(false);
        }
    }, [userInput, isLoading, chat]);

    return (
        <div className="flex flex-col h-full bg-gray-100">
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mx-4 mt-4 rounded-md" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            )}
            <div ref={chatContainerRef} className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto">
                {messages.map((message) => (
                    <div key={message.id} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                        {message.role === 'model' && (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white flex-shrink-0">
                                <IconBot className="w-6 h-6" />
                            </div>
                        )}
                        <div className={`max-w-lg lg:max-w-2xl px-4 py-3 rounded-2xl shadow ${message.role === 'user' 
                            ? 'bg-blue-500 text-white rounded-br-none' 
                            : 'bg-white text-gray-800 rounded-bl-none'}`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                            {message.sources && message.sources.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <h4 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1.5">
                                        <IconSource className="w-4 h-4" />
                                        Sources
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {message.sources.map((source, index) => (
                                            <li key={index}>
                                                <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline break-all" title={source.uri}>
                                                    {index + 1}. {source.title || source.uri}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        {message.role === 'user' && (
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0">
                                <IconUser className="w-6 h-6" />
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white flex-shrink-0">
                            <IconBot className="w-6 h-6" />
                        </div>
                        <div className="max-w-lg px-4 py-3 rounded-2xl bg-white text-gray-800 shadow rounded-bl-none">
                            <div className="flex items-center space-x-1">
                                <span className="text-sm">MediQuery is typing</span>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 sm:p-6 bg-white border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask a health question..."
                        className="flex-1 w-full px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        disabled={isLoading || !!error}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !userInput.trim() || !!error}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white transition-colors duration-300 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        <IconSend className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;