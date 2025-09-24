// api/askGemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error:
          "❌ Gemini API Key not found. Please add GEMINI_API_KEY in Vercel > Project Settings > Environment Variables.",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // النص القادم من الواجهة
    const prompt = req.body?.prompt || "Hello Gemini, are you working?";

    // تنفيذ الطلب
    const result = await model.generateContent(prompt);

    return res.status(200).json({
      success: true,
      text: result.response.text(),
    });
  } catch (error) {
    console.error("Error in askGemini:", error);
    return res.status(500).json({
      error: "❌ Failed to process request with Gemini API.",
      details: error.message,
    });
  }
}
