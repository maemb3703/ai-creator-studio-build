import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import { getMediaProjects, getPosts } from "@/lib/storage";
import { MediaProject, Post } from "@/lib/types";

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const [recentProjects, setRecentProjects] = useState<MediaProject[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const projects = await getMediaProjects();
    const posts = await getPosts();
    setRecentProjects(projects.slice(-3).reverse());
    setRecentPosts(posts.slice(-3).reverse());
  };

  const features = [
    {
      id: "chat",
      title: "Chat AI",
      description: "สนทนากับ AI ที่ปรับแต่งได้",
      icon: "💬",
      color: colors.primary,
    },
    {
      id: "generate",
      title: "Create",
      description: "สร้างภาพ เสียง ดนตรี วิดีโอ",
      icon: "✨",
      color: colors.accent,
    },
    {
      id: "editor",
      title: "Edit",
      description: "ตัดต่อและแก้ไขสื่อ",
      icon: "✂️",
      color: colors.success,
    },
    {
      id: "social",
      title: "Share",
      description: "แชร์ไปยังโซเชียลมีเดีย",
      icon: "📱",
      color: colors.warning,
    },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-4xl font-bold text-foreground">AI Creator Studio</Text>
            <Text className="text-muted">สร้างสรรค์ได้ทุกอย่างแบบไม่มีขีดจำกัด</Text>
          </View>

          {/* Quick Actions */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">เริ่มต้นใช้งาน</Text>
            <View className="flex-row flex-wrap gap-2">
              {features.map((feature) => (
                <TouchableOpacity
                  key={feature.id}
                  onPress={() => router.push(`/(tabs)/${feature.id}` as any)}
                  className="flex-1 min-w-[45%] bg-surface border border-border rounded-lg p-4 items-center gap-2"
                >
                  <Text className="text-3xl">{feature.icon}</Text>
                  <Text className="text-sm font-semibold text-foreground text-center">{feature.title}</Text>
                  <Text className="text-xs text-muted text-center">{feature.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Projects */}
          {recentProjects.length > 0 && (
            <View className="gap-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-foreground">โปรเจกต์ล่าสุด</Text>
                <TouchableOpacity onPress={() => router.push("/(tabs)/editor" as any)}>
                  <Text className="text-primary font-semibold">ดูทั้งหมด</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                scrollEnabled={false}
                data={recentProjects}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity className="bg-surface border border-border rounded-lg p-3 mb-2">
                    <Text className="font-semibold text-foreground">{item.title}</Text>
                    <Text className="text-xs text-muted mt-1">{item.type}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {/* Recent Posts */}
          {recentPosts.length > 0 && (
            <View className="gap-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-foreground">โพสต์ล่าสุด</Text>
                <TouchableOpacity onPress={() => router.push("/(tabs)/settings" as any)}>
                  <Text className="text-primary font-semibold">ดูทั้งหมด</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                scrollEnabled={false}
                data={recentPosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity className="bg-surface border border-border rounded-lg p-3 mb-2">
                    <Text className="font-semibold text-foreground">{item.title}</Text>
                    <Text className="text-xs text-muted mt-1">{item.platforms.join(", ")}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {/* Tips */}
          <View className="bg-surface border border-border rounded-lg p-4 gap-2">
            <Text className="font-semibold text-foreground">💡 เคล็ดลับ</Text>
            <Text className="text-sm text-muted">
              ลองใช้ AI Chat เพื่อขอคำแนะนำในการสร้างสรรค์ผลงาน หรือสร้างภาพและวิดีโอจากคำอธิบาย
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
