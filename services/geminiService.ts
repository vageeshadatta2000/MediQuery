
import { GoogleGenAI, Chat } from "@google/genai";
import type { Source } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

let genAI: GoogleGenAI | null = null;

export const isApiKeyConfigured = (): boolean => {
  return !!process.env.API_KEY;
};

const getGenAI = (): GoogleGenAI => {
  if (!genAI) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set.");
    }
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

export const createChat = (): Chat => {
  const ai = getGenAI();
  return ai.chats.create({
    model: 'gemini-2.5-flash-preview-04-17',
    config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
    },
  });
};

interface BotResponse {
    text: string;
    sources: Source[];
}

export const sendMessage = async (chat: Chat, message: string): Promise<BotResponse> => {
    try {
        const result = await chat.sendMessage({ message });
        const text = result.text;

        const groundingMetadata = result.candidates?.[0]?.groundingMetadata;
        const rawSources = groundingMetadata?.groundingChunks || [];

        const sources: Source[] = rawSources.map((s: any) => ({
            uri: s.web?.uri || '',
            title: s.web?.title || 'Untitled Source',
        })).filter(s => s.uri);
        
        return { text, sources };

    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return {
            text: "I'm sorry, but I encountered an error while processing your request. Please try again later.",
            sources: []
        };
    }
};
