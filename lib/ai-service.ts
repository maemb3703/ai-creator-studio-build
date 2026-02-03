import axios from "axios";

// ใช้ Manus AI API (built-in, ไม่ต้องให้ API key)
const AI_API_BASE = "http://127.0.0.1:3000";

export interface AIGenerationOptions {
  prompt: string;
  style?: string;
  quality?: "low" | "medium" | "high";
  language?: "th" | "en";
}

export interface AITextOptions {
  text: string;
  voice?: string;
  speed?: number;
  language?: "th" | "en";
}

// Chat with AI
export async function chatWithAI(
  message: string,
  personality?: string
): Promise<string> {
  try {
    const response = await axios.post(`${AI_API_BASE}/api/chat`, {
      message,
      personality: personality || "assistant",
      temperature: 0.7,
      maxTokens: 2000,
    });

    return response.data.reply || "ไม่สามารถได้รับคำตอบจาก AI";
  } catch (error) {
    console.error("Error chatting with AI:", error);
    throw new Error("Failed to chat with AI");
  }
}

// Generate Image
export async function generateImage(options: AIGenerationOptions): Promise<string> {
  try {
    const response = await axios.post(`${AI_API_BASE}/api/generate/image`, {
      prompt: options.prompt,
      style: options.style || "realistic",
      quality: options.quality || "high",
      size: "1024x1024",
    });

    return response.data.imageUrl || "";
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image");
  }
}

// Generate Character
export async function generateCharacter(
  description: string
): Promise<{ name: string; imageUrl: string }> {
  try {
    const response = await axios.post(`${AI_API_BASE}/api/generate/character`, {
      description,
      style: "anime",
    });

    return {
      name: response.data.name || "Character",
      imageUrl: response.data.imageUrl || "",
    };
  } catch (error) {
    console.error("Error generating character:", error);
    throw new Error("Failed to generate character");
  }
}

// Generate Emoji
export async function generateEmoji(description: string): Promise<string> {
  try {
    const response = await axios.post(`${AI_API_BASE}/api/generate/emoji`, {
      description,
    });

    return response.data.emojiUrl || "";
  } catch (error) {
    console.error("Error generating emoji:", error);
    throw new Error("Failed to generate emoji");
  }
}

// Generate Audio/Voice
export async function generateAudio(options: AITextOptions): Promise<string> {
  try {
    const response = await axios.post(`${AI_API_BASE}/api/generate/audio`, {
      text: options.text,
      voice: options.voice || "default",
      speed: options.speed || 1,
      language: options.language || "th",
    });

    return response.data.audioUrl || "";
  } catch (error) {
    console.error("Error generating audio:", error);
    throw new Error("Failed to generate audio");
  }
}

// Generate Music
export async function generateMusic(
  prompt: string,
  genre?: string
): Promise<string> {
  try {
    const response = await axios.post(`${AI_API_BASE}/api/generate/music`, {
      prompt,
      genre: genre || "ambient",
      duration: 30,
    });

    return response.data.musicUrl || "";
  } catch (error) {
    console.error("Error generating music:", error);
    throw new Error("Failed to generate music");
  }
}

// Generate Video (ถ้า API รองรับ)
export async function generateVideo(prompt: string): Promise<string> {
  try {
    const response = await axios.post(`${AI_API_BASE}/api/generate/video`, {
      prompt,
      duration: 10,
    });

    return response.data.videoUrl || "";
  } catch (error) {
    console.error("Error generating video:", error);
    // ถ้า API ไม่รองรับ ให้ return empty string แทน throw error
    return "";
  }
}

// Analyze Image
export async function analyzeImage(imageUrl: string): Promise<string> {
  try {
    const response = await axios.post(`${AI_API_BASE}/api/analyze/image`, {
      imageUrl,
    });

    return response.data.analysis || "";
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error("Failed to analyze image");
  }
}

// Enhance Image
export async function enhanceImage(
  imageUrl: string,
  enhancement: "upscale" | "denoise" | "colorize"
): Promise<string> {
  try {
    const response = await axios.post(`${AI_API_BASE}/api/enhance/image`, {
      imageUrl,
      enhancement,
    });

    return response.data.enhancedUrl || "";
  } catch (error) {
    console.error("Error enhancing image:", error);
    throw new Error("Failed to enhance image");
  }
}

// Translate Text
export async function translateText(
  text: string,
  targetLanguage: "th" | "en"
): Promise<string> {
  try {
    const response = await axios.post(`${AI_API_BASE}/api/translate`, {
      text,
      targetLanguage,
    });

    return response.data.translatedText || "";
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Failed to translate text");
  }
}
