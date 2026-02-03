import { ScrollView, Text, View, TouchableOpacity, Switch, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import { getUserSettings, saveUserSettings, clearAllData } from "@/lib/storage";
import { UserSettings } from "@/lib/types";
import { useTheme } from "@/lib/theme-provider";

export default function SettingsScreen() {
  const colors = useColors();
  const { colorScheme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState<UserSettings>({
    language: "th",
    theme: "auto",
    autoSave: true,
    notifications: true,
    defaultImageQuality: "high",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await getUserSettings();
    setSettings(data);
  };

  const handleLanguageChange = async (language: "th" | "en") => {
    const updated = { ...settings, language };
    setSettings(updated);
    await saveUserSettings(updated);
  };

  const handleQualityChange = async (quality: "low" | "medium" | "high") => {
    const updated = { ...settings, defaultImageQuality: quality };
    setSettings(updated);
    await saveUserSettings(updated);
  };

  const handleToggleAutoSave = async () => {
    const updated = { ...settings, autoSave: !settings.autoSave };
    setSettings(updated);
    await saveUserSettings(updated);
  };

  const handleToggleNotifications = async () => {
    const updated = { ...settings, notifications: !settings.notifications };
    setSettings(updated);
    await saveUserSettings(updated);
  };

  const handleClearAllData = async () => {
    if (confirm("คุณแน่ใจหรือไม่ที่ต้องการลบข้อมูลทั้งหมด?")) {
      await clearAllData();
      alert("ข้อมูลทั้งหมดได้ถูกลบแล้ว");
    }
  };

  const settingSections = [
    {
      title: "ภาษา",
      items: [
        { label: "ไทย", value: "th" },
        { label: "English", value: "en" },
      ],
      selected: settings.language,
      onSelect: handleLanguageChange,
    },
    {
      title: "คุณภาพภาพเริ่มต้น",
      items: [
        { label: "ต่ำ", value: "low" },
        { label: "ปานกลาง", value: "medium" },
        { label: "สูง", value: "high" },
      ],
      selected: settings.defaultImageQuality,
      onSelect: handleQualityChange,
    },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">การตั้งค่า</Text>
            <Text className="text-muted">ปรับแต่งแอปพลิเคชั่นตามต้องการ</Text>
          </View>

          {/* Theme */}
          <View className="bg-surface border border-border rounded-lg p-4 gap-3">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="font-semibold text-foreground">โหมดมืด</Text>
                <Text className="text-xs text-muted mt-1">
                  {colorScheme === "dark" ? "เปิด" : "ปิด"}
                </Text>
              </View>
              <Switch
                value={colorScheme === "dark"}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>
          </View>

          {/* Toggles */}
          <View className="bg-surface border border-border rounded-lg p-4 gap-3">
            <View className="flex-row justify-between items-center border-b border-border pb-3">
              <View className="flex-1">
                <Text className="font-semibold text-foreground">บันทึกอัตโนมัติ</Text>
                <Text className="text-xs text-muted mt-1">
                  บันทึกงานโดยอัตโนมัติขณะแก้ไข
                </Text>
              </View>
              <Switch
                value={settings.autoSave}
                onValueChange={handleToggleAutoSave}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>

            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="font-semibold text-foreground">การแจ้งเตือน</Text>
                <Text className="text-xs text-muted mt-1">
                  รับการแจ้งเตือนจากแอพ
                </Text>
              </View>
              <Switch
                value={settings.notifications}
                onValueChange={handleToggleNotifications}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>
          </View>

          {/* Selection Settings */}
          {settingSections.map((section) => (
            <View key={section.title} className="gap-2">
              <Text className="text-sm font-semibold text-foreground">
                {section.title}
              </Text>
              <View className="bg-surface border border-border rounded-lg overflow-hidden">
                {section.items.map((item, index) => (
                  <TouchableOpacity
                    key={item.value}
                    onPress={() => section.onSelect(item.value as any)}
                    className={`p-4 flex-row justify-between items-center ${
                      index < section.items.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <Text className="text-foreground">{item.label}</Text>
                    {section.selected === item.value && (
                      <Text className="text-primary font-bold">✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* About */}
          <View className="bg-surface border border-border rounded-lg p-4 gap-2">
            <Text className="font-semibold text-foreground">เกี่ยวกับแอพ</Text>
            <Text className="text-sm text-muted">AI Creator Studio v1.0.0</Text>
            <Text className="text-xs text-muted mt-2">
              แอพพลิเคชั่นสำหรับสร้างสรรค์ผลงานด้วย AI ที่ไม่มีขีดจำกัด
            </Text>
          </View>

          {/* Danger Zone */}
          <View className="bg-error/10 border border-error rounded-lg p-4 gap-3">
            <Text className="font-semibold text-error">โซนอันตราย</Text>
            <TouchableOpacity
              onPress={handleClearAllData}
              className="bg-error/20 p-3 rounded-lg items-center"
            >
              <Text className="text-error font-semibold">ลบข้อมูลทั้งหมด</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="items-center gap-2 py-4">
            <Text className="text-xs text-muted">
              Made with ❤️ by AI Creator Studio
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
