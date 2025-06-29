
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { Message, MessageRole } from '../types';
import { createChat, sendMessage, isApiKeyConfigured } from '../services/geminiService';
import MessageBubble from './MessageBubble';
import SendIcon from './icons/SendIcon';
import InfoIcon from './icons/InfoIcon';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isApiKeyConfigured()) {
      setApiKeyMissing(true);
      return;
    }
    try {
      const newChat = createChat();
      setChat(newChat);
      setMessages([
        {
          id: 'initial',
          role: MessageRole.BOT,
          text: 'Hello! I am MediQuery. I can provide information on health topics. How can I assist you today?',
          sources: [],
        },
      ]);
    } catch (error) {
      console.error("Failed to initialize chat:", error);
      setApiKeyMissing(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isThinking || !chat || apiKeyMissing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    try {
        const botResponse = await sendMessage(chat, input);
        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: MessageRole.BOT,
            text: botResponse.text,
            sources: botResponse.sources,
        };
        setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
        const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: MessageRole.BOT,
            text: "I'm having trouble connecting right now. Please check my configuration or try again later.",
        };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsThinking(false);
    }
  }, [input, isThinking, chat, apiKeyMissing]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 overflow-hidden">
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isThinking && (
          <MessageBubble
            message={{
              id: 'thinking',
              role: MessageRole.BOT,
              text: '...',
            }}
            isTyping={true}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
        {apiKeyMissing ? (
          <div className="flex items-center justify-center p-3 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 rounded-lg">
            <InfoIcon className="w-6 h-6 mr-3 flex-shrink-0" />
            <p className="text-sm font-medium">
              API key not configured. The chat is disabled. Please set the API_KEY environment variable.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about symptoms, conditions, or treatments..."
              disabled={isThinking}
              className="flex-1 w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-slate-100 disabled:opacity-50 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking}
              className="p-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors duration-200"
              aria-label="Send message"
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
