import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { prompt } = req.body ?? {};
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    const apiKey = process.env.GEMINI_API_KEY; // ✅ فقط من سيرفر Vercel
    if (!apiKey) return res.status(500).json({ error: "Gemini API Key is missing" });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    return res.status(200).json({ text: result.response.text() });
  } catch (err: any) {
    console.error("⚠️ Gemini API error:", err);
    return res.status(500).json({ error: err.message });
  }
}
