import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>["name"]>;

const MAPPING: IconMapping = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "sparkles.fill": "auto-awesome",
  "image.fill": "image",
  "music.note.fill": "music-note",
  "waveform.circle.fill": "graphic-eq",
  "video.fill": "videocam",
  "chat.bubble.fill": "chat",
  "gear.fill": "settings",
  "chevron.right": "chevron-right",
  "chevron.left": "chevron-left",
  "plus.circle.fill": "add-circle",
  "trash.fill": "delete",
  "pencil.fill": "edit",
  "share.fill": "share",
  "heart.fill": "favorite",
  "star.fill": "star",
  "magnifyingglass": "search",
  "xmark": "close",
  "checkmark": "check",
  "exclamationmark.circle.fill": "error",
};

export type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
