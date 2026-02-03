import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatSession, MediaProject, Post, UserSettings } from "./types";

const STORAGE_KEYS = {
  CHAT_SESSIONS: "chat_sessions",
  MEDIA_PROJECTS: "media_projects",
  POSTS: "posts",
  USER_SETTINGS: "user_settings",
  GENERATED_ITEMS: "generated_items",
};

// Chat Sessions
export async function getChatSessions(): Promise<ChatSession[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CHAT_SESSIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting chat sessions:", error);
    return [];
  }
}

export async function saveChatSession(session: ChatSession): Promise<void> {
  try {
    const sessions = await getChatSessions();
    const index = sessions.findIndex((s) => s.id === session.id);
    if (index >= 0) {
      sessions[index] = session;
    } else {
      sessions.push(session);
    }
    await AsyncStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(sessions));
  } catch (error) {
    console.error("Error saving chat session:", error);
  }
}

export async function deleteChatSession(sessionId: string): Promise<void> {
  try {
    const sessions = await getChatSessions();
    const filtered = sessions.filter((s) => s.id !== sessionId);
    await AsyncStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error deleting chat session:", error);
  }
}

// Media Projects
export async function getMediaProjects(): Promise<MediaProject[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.MEDIA_PROJECTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting media projects:", error);
    return [];
  }
}

export async function saveMediaProject(project: MediaProject): Promise<void> {
  try {
    const projects = await getMediaProjects();
    const index = projects.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      projects[index] = project;
    } else {
      projects.push(project);
    }
    await AsyncStorage.setItem(STORAGE_KEYS.MEDIA_PROJECTS, JSON.stringify(projects));
  } catch (error) {
    console.error("Error saving media project:", error);
  }
}

export async function deleteMediaProject(projectId: string): Promise<void> {
  try {
    const projects = await getMediaProjects();
    const filtered = projects.filter((p) => p.id !== projectId);
    await AsyncStorage.setItem(STORAGE_KEYS.MEDIA_PROJECTS, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error deleting media project:", error);
  }
}

// Posts
export async function getPosts(): Promise<Post[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.POSTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting posts:", error);
    return [];
  }
}

export async function savePost(post: Post): Promise<void> {
  try {
    const posts = await getPosts();
    const index = posts.findIndex((p) => p.id === post.id);
    if (index >= 0) {
      posts[index] = post;
    } else {
      posts.push(post);
    }
    await AsyncStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  } catch (error) {
    console.error("Error saving post:", error);
  }
}

export async function deletePost(postId: string): Promise<void> {
  try {
    const posts = await getPosts();
    const filtered = posts.filter((p) => p.id !== postId);
    await AsyncStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

// User Settings
export async function getUserSettings(): Promise<UserSettings> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
    return data
      ? JSON.parse(data)
      : {
          language: "th",
          theme: "auto",
          autoSave: true,
          notifications: true,
          defaultImageQuality: "high",
        };
  } catch (error) {
    console.error("Error getting user settings:", error);
    return {
      language: "th",
      theme: "auto",
      autoSave: true,
      notifications: true,
      defaultImageQuality: "high",
    };
  }
}

export async function saveUserSettings(settings: UserSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving user settings:", error);
  }
}

// Clear all data
export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error("Error clearing all data:", error);
  }
}
