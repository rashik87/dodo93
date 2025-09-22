// src/services/aiClient.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

let aiInstance: GoogleGenerativeAI | null = null;

export const getAi = (): GoogleGenerativeAI => {
  if (!aiInstance) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "❌ Gemini API Key not found! تأكد أن VITE_GEMINI_API_KEY موجود في Vercel."
      );
    }

    aiInstance = new GoogleGenerativeAI(apiKey);
  }

  return aiInstance;
};
