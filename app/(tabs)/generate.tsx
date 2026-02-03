import { ScrollView, Text, View, TouchableOpacity, TextInput, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import { generateImage, generateCharacter, generateEmoji, generateAudio, generateMusic } from "@/lib/ai-service";
import * as Haptics from "expo-haptics";

interface GenerationItem {
  id: string;
  type: "image" | "character" | "emoji" | "audio" | "music";
  title: string;
  icon: string;
  description: string;
}

export default function GenerateScreen() {
  const colors = useColors();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const generationTypes: GenerationItem[] = [
    {
      id: "image",
      type: "image",
      title: "ภาพ",
      icon: "🖼️",
      description: "สร้างรูปภาพจากคำอธิบาย",
    },
    {
      id: "character",
      type: "character",
      title: "ตัวละคร",
      icon: "👤",
      description: "สร้างตัวละครตามจินตนาการ",
    },
    {
      id: "emoji",
      type: "emoji",
      title: "อิโมจิ",
      icon: "😊",
      description: "สร้างอิโมจิตามคำอธิบาย",
    },
    {
      id: "audio",
      type: "audio",
      title: "เสียง",
      icon: "🎙️",
      description: "สร้างเสียงพูดจากข้อความ",
    },
    {
      id: "music",
      type: "music",
      title: "ดนตรี",
      icon: "🎵",
      description: "สร้างดนตรีตามแนวทาง",
    },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || !selectedType) return;

    setLoading(true);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      let generatedResult: any = null;

      switch (selectedType) {
        case "image":
          const imageUrl = await generateImage({ prompt });
          generatedResult = { type: "image", url: imageUrl, prompt };
          break;
        case "character":
          const character = await generateCharacter(prompt);
          generatedResult = { type: "character", ...character, prompt };
          break;
        case "emoji":
          const emojiUrl = await generateEmoji(prompt);
          generatedResult = { type: "emoji", url: emojiUrl, prompt };
          break;
        case "audio":
          const audioUrl = await generateAudio({ text: prompt });
          generatedResult = { type: "audio", url: audioUrl, prompt };
          break;
        case "music":
          const musicUrl = await generateMusic(prompt);
          generatedResult = { type: "music", url: musicUrl, prompt };
          break;
      }

      setResult(generatedResult);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error("Error generating content:", error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  };

  if (selectedType) {
    return (
      <ScreenContainer className="p-4">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="gap-4">
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => {
                setSelectedType(null);
                setPrompt("");
                setResult(null);
              }}
              className="flex-row items-center gap-2"
            >
              <Text className="text-2xl">←</Text>
              <Text className="text-foreground font-semibold">ย้อนกลับ</Text>
            </TouchableOpacity>

            {/* Title */}
            <View className="gap-2">
              <Text className="text-2xl font-bold text-foreground">
                {generationTypes.find((t) => t.id === selectedType)?.title}
              </Text>
              <Text className="text-muted">
                {generationTypes.find((t) => t.id === selectedType)?.description}
              </Text>
            </View>

            {/* Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">คำอธิบาย</Text>
              <TextInput
                value={prompt}
                onChangeText={setPrompt}
                placeholder="บรรยายสิ่งที่คุณต้องการสร้าง..."
                placeholderTextColor={colors.muted}
                multiline
                numberOfLines={4}
                editable={!loading}
                className="bg-surface border border-border rounded-lg p-3 text-foreground"
              />
            </View>

            {/* Generate Button */}
            <TouchableOpacity
              onPress={handleGenerate}
              disabled={loading || !prompt.trim()}
              className={`p-4 rounded-lg items-center ${
                loading || !prompt.trim() ? "bg-muted/30" : "bg-primary"
              }`}
            >
              <Text className="text-white font-semibold">
                {loading ? "⏳ กำลังสร้าง..." : "✨ สร้าง"}
              </Text>
            </TouchableOpacity>

            {/* Result */}
            {result && (
              <View className="bg-surface border border-border rounded-lg p-4 gap-3">
                <Text className="font-semibold text-foreground">ผลลัพธ์</Text>
                {result.type === "image" && (
                  <View className="bg-background rounded-lg p-4 items-center">
                    <Text className="text-6xl">🖼️</Text>
                    <Text className="text-sm text-muted mt-2">ภาพได้สร้างเสร็จแล้ว</Text>
                  </View>
                )}
                {result.type === "character" && (
                  <View className="bg-background rounded-lg p-4 items-center gap-2">
                    <Text className="text-6xl">👤</Text>
                    <Text className="font-semibold text-foreground">{result.name}</Text>
                    <Text className="text-sm text-muted">ตัวละครได้สร้างเสร็จแล้ว</Text>
                  </View>
                )}
                {result.type === "emoji" && (
                  <View className="bg-background rounded-lg p-4 items-center">
                    <Text className="text-6xl">😊</Text>
                    <Text className="text-sm text-muted mt-2">อิโมจิได้สร้างเสร็จแล้ว</Text>
                  </View>
                )}
                {result.type === "audio" && (
                  <View className="bg-background rounded-lg p-4 items-center gap-2">
                    <Text className="text-6xl">🎙️</Text>
                    <Text className="text-sm text-muted">เสียงได้สร้างเสร็จแล้ว</Text>
                  </View>
                )}
                {result.type === "music" && (
                  <View className="bg-background rounded-lg p-4 items-center gap-2">
                    <Text className="text-6xl">🎵</Text>
                    <Text className="text-sm text-muted">ดนตรีได้สร้างเสร็จแล้ว</Text>
                  </View>
                )}
                <TouchableOpacity className="bg-primary p-3 rounded-lg items-center mt-2">
                  <Text className="text-background font-semibold">บันทึก</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">สร้างสรรค์ผลงาน</Text>
            <Text className="text-muted">เลือกประเภทเนื้อหาที่ต้องการสร้าง</Text>
          </View>

          {/* Generation Types */}
          <FlatList
            scrollEnabled={false}
            data={generationTypes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedType(item.id)}
                className="bg-surface border border-border rounded-lg p-4 mb-3 flex-row items-center gap-3"
              >
                <Text className="text-4xl">{item.icon}</Text>
                <View className="flex-1">
                  <Text className="font-semibold text-foreground">{item.title}</Text>
                  <Text className="text-xs text-muted">{item.description}</Text>
                </View>
                <Text className="text-xl">→</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
