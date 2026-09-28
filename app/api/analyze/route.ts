import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

export const runtime = "nodejs";

const schema = {
  type: Type.OBJECT,
  properties: {
    objectName: { type: Type.STRING },
    category: { type: Type.STRING },
    confidence: { type: Type.STRING },
    shortDescription: { type: Type.STRING },
    explanation: { type: Type.STRING },
    howItWorks: { type: Type.STRING },
    realWorldApplication: { type: Type.STRING },
    funFact: { type: Type.STRING },
    learningLevel: { type: Type.STRING },
    microChallenge: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        options: { type: Type.ARRAY, items: { type: Type.STRING } },
        correctAnswer: { type: Type.STRING },
        explanation: { type: Type.STRING }
      },
      required: ["question", "options", "correctAnswer", "explanation"]
    }
  },
  required: [
    "objectName", "category", "confidence", "shortDescription",
    "explanation", "howItWorks", "realWorldApplication",
    "funFact", "learningLevel", "microChallenge"
  ]
};

export async function POST(req: Request) {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return NextResponse.json({ error: "GEMINI_API_KEY is missing. Add it to .env.local." }, { status: 500 });

    const body = await req.json();
    const language =
  body?.language === "Hindi" || body?.language === "Marathi"
    ? body.language
    : "English";
    if (!body?.image || !body?.mimeType) return NextResponse.json({ error: "Image data is required." }, { status: 400 });

    const ai = new GoogleGenAI({ apiKey: key });
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{
        role: "user",
        parts: [
          { inlineData: { mimeType: body.mimeType, data: body.image } },
          { text: `You are CityClass, an educational AI. Analyze the photographed real-world object and create a short, accurate, beginner-friendly learning experience.

IMPORTANT LANGUAGE RULE:
Generate all human-readable lesson content in ${language}.
This includes objectName, category, shortDescription, explanation, howItWorks, realWorldApplication, funFact, learningLevel, microChallenge.question, microChallenge.options, microChallenge.correctAnswer, and microChallenge.explanation.
Keep the JSON field names exactly as defined by the schema.
If the language is Hindi, write the content in natural Hindi using Devanagari script.
If the language is Marathi, write the content in natural Marathi using Devanagari script.
If the language is English, write the content in clear, simple English.

Rules:
- Identify only what can reasonably be inferred from the image.
- If uncertain, use a broad object/category and set confidence to "low".
- Never invent a brand, model, location, date, measurement, or hidden internal detail.
- Explain in simple language suitable for a student.
- Make the lesson connected to real-world science, engineering, technology, nature, civics, or everyday life where appropriate.
- Create exactly 4 useful multiple-choice options.
- correctAnswer must exactly match one option.
- The challenge should test understanding of the lesson, not visual trivia.
Return ONLY the requested structured JSON.` }
        ]
      }],
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const raw = response.text;
    if (!raw) throw new Error("Gemini returned an empty response.");
    const lesson = JSON.parse(raw);
    return NextResponse.json({ lesson });
  } catch (error) {
  console.error("GEMINI ERROR:", error);

  return NextResponse.json(
    {
      error: error instanceof Error ? error.message : String(error)
    },
    { status: 500 }
  );
}
}