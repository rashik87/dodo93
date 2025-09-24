import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  AiGeneratedRecipe, 
  RecipeCategory, 
  FoodItem, 
  AiAnalyzedMeal, 
  Macros, 
  Recipe, 
  DietProtocol, 
  AiGeneratedMealSlot, 
  WeightEntry, 
  UserData, 
  CarbCycleDayType, 
  RecipeTag 
} from "../types";

let aiInstance: GoogleGenerativeAI | null = null;

const getAi = (): GoogleGenerativeAI => {
  if (!aiInstance) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error(
        "Gemini API Key not found. Please add GEMINI_API_KEY in Vercel > Project Settings > Environment Variables and redeploy the application."
      );
    }
    aiInstance = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return aiInstance;
};

// Helper function to safely parse JSON from AI response
const parseJsonResponse = <T>(jsonText: string, functionName: string): T => {
  let textToParse = jsonText.trim();

  // Remove markdown code fences if they exist
  const jsonMatch = textToParse.match(/```(?:json)?\s*([\s\S]+?)\s*```/);
  if (jsonMatch && jsonMatch[1]) {
    textToParse = jsonMatch[1];
  }

  try {
    return JSON.parse(textToParse) as T;
  } catch (error) {
    console.error(`Error parsing JSON in ${functionName}:`, error);
    console.error("Original text from AI:", jsonText);
    throw new Error(`Failed to parse JSON response from AI in ${functionName}.`);
  }
};

export { getAi, parseJsonResponse };
