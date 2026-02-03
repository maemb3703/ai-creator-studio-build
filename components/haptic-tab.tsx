import { Platform } from "react-native";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import { NavigationHelpers, ParamListBase, TabNavigationState } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { PressableProps } from "react-native";

export function HapticTab(
  props: PressableProps & {
    to?: string;
    href?: string;
    onPress?: (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | { preventDefault: () => void }
    ) => void;
    onLongPress?: () => void;
  }
) {
  return (
    <Pressable
      {...props}
      onPress={(e) => {
        if (Platform.OS !== "web") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPress?.(e);
      }}
    />
  );
}

import { Pressable } from "react-native";
