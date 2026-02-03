import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import { getMediaProjects, deleteMediaProject } from "@/lib/storage";
import { MediaProject } from "@/lib/types";
import * as ImagePicker from "expo-image-picker";

export default function EditorScreen() {
  const colors = useColors();
  const [projects, setProjects] = useState<MediaProject[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await getMediaProjects();
    setProjects(data.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()));
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // สร้างโปรเจกต์ใหม่
        const newProject: MediaProject = {
          id: Date.now().toString(),
          title: "Untitled Project",
          type: "image",
          sourceUrl: result.assets[0].uri,
          edits: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        // บันทึกและโหลดใหม่
        loadProjects();
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    await deleteMediaProject(projectId);
    loadProjects();
  };

  const editTools = [
    { id: "crop", title: "ตัด", icon: "✂️" },
    { id: "filter", title: "ฟิลเตอร์", icon: "🎨" },
    { id: "effect", title: "เอฟเฟกต์", icon: "✨" },
    { id: "text", title: "ข้อความ", icon: "📝" },
    { id: "sticker", title: "สติกเกอร์", icon: "🏷️" },
    { id: "music", title: "ดนตรี", icon: "🎵" },
    { id: "voiceover", title: "เสียงพูด", icon: "🎙️" },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">ตัดต่อสื่อ</Text>
            <Text className="text-muted">แก้ไขและปรับปรุงผลงานของคุณ</Text>
          </View>

          {/* Edit Tools */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">เครื่องมือแก้ไข</Text>
            <FlatList
              scrollEnabled={false}
              data={editTools}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ gap: 8 }}
              renderItem={({ item }) => (
                <TouchableOpacity className="flex-1 bg-surface border border-border rounded-lg p-4 items-center gap-2">
                  <Text className="text-3xl">{item.icon}</Text>
                  <Text className="text-xs font-semibold text-foreground text-center">{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Import Media */}
          <TouchableOpacity
            onPress={handlePickImage}
            className="bg-primary rounded-lg p-4 items-center gap-2"
          >
            <Text className="text-3xl">📁</Text>
            <Text className="text-background font-semibold">นำเข้าสื่อ</Text>
          </TouchableOpacity>

          {/* Projects List */}
          {projects.length > 0 && (
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">โปรเจกต์ของฉัน</Text>
              <FlatList
                scrollEnabled={false}
                data={projects}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View className="bg-surface border border-border rounded-lg p-3 mb-2 flex-row justify-between items-center">
                    <View className="flex-1">
                      <Text className="font-semibold text-foreground">{item.title}</Text>
                      <Text className="text-xs text-muted mt-1">{item.type}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDeleteProject(item.id)}
                      className="p-2"
                    >
                      <Text className="text-lg">🗑️</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}

          {/* Empty State */}
          {projects.length === 0 && (
            <View className="flex-1 items-center justify-center gap-3">
              <Text className="text-4xl">📭</Text>
              <Text className="text-foreground font-semibold">ไม่มีโปรเจกต์</Text>
              <Text className="text-muted text-center">
                นำเข้าสื่อเพื่อเริ่มแก้ไข
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
