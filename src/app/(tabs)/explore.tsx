import { Text, View } from "react-native";

import { ExternalLink } from "@/components/ui/link";

export default function TabTwoScreen() {
  return (
    <View className="flex-1 p-safe items-center justify-center">
      <ExternalLink href="https://expo.dev">
        <Text>External Link</Text>
      </ExternalLink>
    </View>
  );
}
