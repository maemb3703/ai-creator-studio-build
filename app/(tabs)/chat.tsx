import { ScrollView, Text, View, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect, useRef } from "react";
import { chatWithAI } from "@/lib/ai-service";
import { saveChatSession, getChatSessions } from "@/lib/storage";
import { ChatSession, ChatMessage } from "@/lib/types";
import { generateId } from "@/lib/utils";
import * as Haptics from "expo-haptics";

export default function ChatScreen() {
  const colors = useColors();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    initializeChat();
  }, []);

  const initializeChat = async () => {
    const sessions = await getChatSessions();
    if (sessions.length > 0) {
      setCurrentSession(sessions[0]);
      setMessages(sessions[0].messages);
    } else {
      const newSession: ChatSession = {
        id: generateId(),
        title: "New Chat",
        personalityId: "default",
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setCurrentSession(newSession);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !currentSession) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const reply = await chatWithAI(input);

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Save session
      if (currentSession) {
        const updatedSession: ChatSession = {
          ...currentSession,
          messages: [...messages, userMessage, assistantMessage],
          updatedAt: new Date(),
        };
        setCurrentSession(updatedSession);
        await saveChatSession(updatedSession);
      }

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error("Error sending message:", error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    setMessages([]);
    if (currentSession) {
      const updatedSession: ChatSession = {
        ...currentSession,
        messages: [],
        updatedAt: new Date(),
      };
      setCurrentSession(updatedSession);
      await saveChatSession(updatedSession);
    }
  };

  return (
    <ScreenContainer className="p-0">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 bg-background">
          {/* Header */}
          <View className="bg-surface border-b border-border p-4 flex-row justify-between items-center">
            <Text className="text-xl font-bold text-foreground">AI Chat</Text>
            {messages.length > 0 && (
              <TouchableOpacity onPress={handleClearChat} className="p-2">
                <Text className="text-error text-sm">ล้าง</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Messages */}
          <FlatList
            ref={scrollViewRef as any}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                className={`px-4 py-2 ${
                  item.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <View
                  className={`max-w-xs rounded-lg p-3 ${
                    item.role === "user"
                      ? "bg-primary"
                      : "bg-surface border border-border"
                  }`}
                >
                  <Text
                    className={`${
                      item.role === "user"
                        ? "text-background"
                        : "text-foreground"
                    }`}
                  >
                    {item.content}
                  </Text>
                  <Text
                    className={`text-xs mt-1 ${
                      item.role === "user"
                        ? "text-background/70"
                        : "text-muted"
                    }`}
                  >
                    {item.timestamp.toLocaleTimeString()}
                  </Text>
                </View>
              </View>
            )}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center p-4">
                <Text className="text-2xl mb-2">👋</Text>
                <Text className="text-foreground font-semibold">สวัสดี!</Text>
                <Text className="text-muted text-center mt-2">
                  เริ่มสนทนากับ AI เพื่อขอคำแนะนำ สร้างสรรค์ผลงาน หรือแค่สนทนา
                </Text>
              </View>
            }
          />

          {/* Input */}
          <View className="bg-surface border-t border-border p-4 gap-2">
            <View className="flex-row gap-2 items-end">
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="พิมพ์ข้อความ..."
                placeholderTextColor={colors.muted}
                multiline
                maxLength={500}
                editable={!loading}
                className="flex-1 bg-background border border-border rounded-lg p-3 text-foreground"
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                disabled={loading || !input.trim()}
                className={`p-3 rounded-lg ${
                  loading || !input.trim()
                    ? "bg-muted/30"
                    : "bg-primary"
                }`}
              >
                <Text className="text-lg">
                  {loading ? "⏳" : "📤"}
                </Text>
              </TouchableOpacity>
            </View>
            {loading && (
              <Text className="text-xs text-muted text-center">
                AI กำลังคิด...
              </Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
