// Chat & AI Types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: string[];
}

export interface AIPersonality {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  avatar?: string;
  tone: "professional" | "casual" | "creative" | "technical";
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  personalityId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Generation Types
export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  style?: string;
  quality?: "low" | "medium" | "high";
  createdAt: Date;
}

export interface GeneratedCharacter {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  personality?: string;
  createdAt: Date;
}

export interface GeneratedEmoji {
  id: string;
  description: string;
  emojiUrl: string;
  createdAt: Date;
}

export interface GeneratedAudio {
  id: string;
  text: string;
  audioUrl: string;
  voice?: string;
  speed?: number;
  createdAt: Date;
}

export interface GeneratedMusic {
  id: string;
  prompt: string;
  musicUrl: string;
  genre?: string;
  duration?: number;
  createdAt: Date;
}

export interface GeneratedVideo {
  id: string;
  prompt: string;
  videoUrl: string;
  duration?: number;
  hasAudio?: boolean;
  createdAt: Date;
}

// Media Editor Types
export interface MediaProject {
  id: string;
  title: string;
  type: "image" | "video" | "audio";
  sourceUrl: string;
  edits: MediaEdit[];
  exportUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaEdit {
  id: string;
  type: "crop" | "filter" | "effect" | "text" | "sticker" | "music" | "voiceover";
  params: Record<string, any>;
  order: number;
}

// Social & Monetization Types
export interface SocialAccount {
  id: string;
  platform: "instagram" | "tiktok" | "youtube" | "facebook" | "twitter";
  username: string;
  accessToken?: string;
  refreshToken?: string;
  connectedAt: Date;
}

export interface MonetizationAccount {
  id: string;
  platform: "patreon" | "ko-fi" | "stripe" | "paypal";
  accountId: string;
  connectedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  scheduledFor?: Date;
  platforms: string[];
  autoShare?: boolean;
  monetizationEnabled?: boolean;
  createdAt: Date;
}

// User Settings
export interface UserSettings {
  language: "th" | "en";
  theme: "light" | "dark" | "auto";
  autoSave: boolean;
  notifications: boolean;
  defaultAIPersonality?: string;
  defaultImageQuality: "low" | "medium" | "high";
  defaultAudioVoice?: string;
}

// Storage Types
export interface StorageStats {
  used: number;
  total: number;
  percentage: number;
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
