import { GoogleGenAI, Type } from "@google/genai";
import { AuraResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    primaryColor: {
      type: Type.STRING,
      description: "A hex color code representing the dominant energy (e.g. #FF5733)",
    },
    secondaryColor: {
      type: Type.STRING,
      description: "A hex color code for the supporting energy",
    },
    accentColor: {
      type: Type.STRING,
      description: "A hex color code for the spark or highlight",
    },
    auraName: {
      type: Type.STRING,
      description: "A creative, mystical name for this specific vibe (e.g., 'Neon Melancholy', 'Solar Punk Warrior')",
    },
    description: {
      type: Type.STRING,
      description: "A 2-sentence poetic and witty reading of the vibe based on the image.",
    },
    emoji: {
      type: Type.STRING,
      description: "A single emoji that perfectly captures the mood.",
    },
    playlistName: {
      type: Type.STRING,
      description: "A made-up title for a Spotify playlist that matches this mood.",
    },
  },
  required: ["primaryColor", "secondaryColor", "accentColor", "auraName", "description", "emoji", "playlistName"],
};

export async function analyzeVibe(base64Image: string, mimeType: string): Promise<AuraResult> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: "Analyze this image to detect its 'vibe', emotional aura, and aesthetic energy. Be creative, slightly mystical, yet modern and cool. Return valid JSON.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 1.2, // High creativity
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AuraResult;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}