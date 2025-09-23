// api/askGemini.ts
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { prompt } = req.body ?? {};
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key missing" });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    return res.status(200).json({ text: result.response.text() });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

