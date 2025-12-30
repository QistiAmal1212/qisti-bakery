
import { GoogleGenAI, Type, Schema, Chat } from "@google/genai";
import { GeneratedCakeResponse } from '../types';

/**
 * Creates a chat session with specific context for Qisti Bakery
 */
export const createBakeryChat = (): Chat => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are QisAI, the charming and helpful AI assistant for Qisti Bakery in Kuala Lumpur.
      
      YOUR ROLE:
      - Assist customers with questions about our premium wedding/event cakes and daily pastry menu.
      - Reflect our brand voice: Elegant, professional, warm, and inviting.
      - Keep answers concise (under 60 words) unless a detailed explanation is requested.
      
      KEY INFORMATION:
      - Location: 123 Jalan Ampang, 50450 Kuala Lumpur.
      - Contact/WhatsApp: +60 13-992 7122.
      - Custom Cakes: We specialize in bespoke wedding, engagement, and corporate event cakes.
      
      DAILY MENU (Quick Reference):
      - Signature Choc Lava (RM 15)
      - Classic Cheese Leleh (RM 25)
      - Hokkaido Cheese Tarts (RM 38/box)
      - Premium Choc Moist (RM 18)
      - Nutella Pods (RM 28)
      - Pandan Gula Melaka (RM 22)
      - Red Velvet Luxury (RM 20)
      - Salted Caramel Macarons (RM 45)
      - Tiramisu Box (RM 26)
      - Fruit Tartlets (RM 30)

      ACTIONS:
      - If they want to order specific items, guide them to click the "Order" button on the menu items or WhatsApp us.
      - If they want a custom cake design, suggest they use the "Design Studio" section on our website or fill out the booking form.
      - If asked about prices for custom cakes, explain that it depends on design complexity, but generally starts from RM 500.
      `,
    }
  });
};

/**
 * Generates a visual representation of the cake using gemini-2.5-flash-image
 */
export const generateCakeImage = async (prompt: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Create a professional, high-resolution food photography image of a bespoke wedding or event cake. 
            The cake is described as: "${prompt}". 
            If the description is vague, assume a high-end, elegant multi-tier cake suitable for a luxury wedding or gala in Malaysia.
            The lighting should be warm, romantic, and appetizing. Photorealistic style, 4k quality, white background or elegant event setting.`
          },
        ],
      },
      config: {
        imageConfig: {
            aspectRatio: "1:1",
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating cake image:", error);
    throw error;
  }
};

/**
 * Generates text details about the cake using gemini-3-flash-preview
 */
export const generateCakeDetails = async (prompt: string): Promise<GeneratedCakeResponse> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        description: {
          type: Type.STRING,
          description: "A mouth-watering marketing description of the cake, focusing on its role as an event centerpiece.",
        },
        estimatedPrice: {
          type: Type.STRING,
          description: "An estimated quote for this custom event cake in Malaysian Ringgit (e.g. 'RM 1,200 - RM 1,500').",
        },
        flavorProfile: {
          type: Type.STRING,
          description: "A sophisticated description of the flavor notes.",
        },
        visualDetails: {
          type: Type.STRING,
          description: "A summary of the visual aesthetics and structural design.",
        }
      },
      required: ["description", "estimatedPrice", "flavorProfile", "visualDetails"],
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a detailed quote and description for a custom wedding or event cake request: "${prompt}".
      The tone should be professional, celebratory, and upscale, suitable for a Malaysian audience.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No text returned from Gemini");
    }
    return JSON.parse(text) as GeneratedCakeResponse;
  } catch (error) {
    console.error("Error generating cake details:", error);
    throw error;
  }
};
