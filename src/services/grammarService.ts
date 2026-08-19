import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function grammarCheck(text: string) {
  if (!ai) {
    throw new Error('Grammar check is unavailable: GEMINI_API_KEY is not configured on the server.');
  }

  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;

  if (wordCount > 2000) {
    throw new Error('Text exceeds maximum word limit of 2000 words.');
  }

  const prompt = `
    Please act as a professional editor. 
    Perform a comprehensive grammar check on the following text.
    Ensure strict adherence to UK English standards (spelling, vocabulary, grammar).
    
    Return the response as a JSON object with the following structure:
    {
      "correctedText": "The fully corrected text in UK English.",
      "suggestions": ["List of specific grammar, spelling, or style suggestions."]
    }
    
    Text to check:
    ${text}
  `;

  const model = await ai.models.generateContent({
    model: "gemini-2.0-flash", // Using a fast, reliable model
    contents: prompt,
  });

  const response = model.text || '';
  
  // Basic cleaning to ensure only JSON is returned if the model includes formatting
  const jsonResponse = response.replace(/^```json\s*|\s*```$/g, '');
  
  return JSON.parse(jsonResponse);
}
