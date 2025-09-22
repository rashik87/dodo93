// api/askGemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { prompt } = req.body;

    // ✅ المفتاح من بيئة السيرفر (backend)
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "❌ Gemini API Key is missing" });
    }

    // إعداد Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    return res.status(200).json({
      text: result.response.text(),
    });
  } catch (error) {
    console.error("⚠️ Gemini API error:", error);
    return res.status(500).json({ error: error.message });
  }
}
