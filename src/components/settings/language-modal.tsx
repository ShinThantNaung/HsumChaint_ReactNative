import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Button } from "@/components/ui/button";

export const languages = [
  { label: "English (US)", value: "en-US" },
  { label: "Myanmar (Burmese)", value: "my-MM" },
] as const;

type LanguageValue = (typeof languages)[number]["value"];

type LanguageModalProps = {
  show: boolean;
  close: () => void;
  selectedLanguage: LanguageValue;
  onSelect: (value: LanguageValue) => void;
  onSave: () => void;
};

export function LanguageModal({
  show,
  close,
  selectedLanguage,
  onSelect,
  onSave,
}: LanguageModalProps) {
  const translateY = useSharedValue(0);
  const backdropOpacity = useSharedValue(1);

  const dismiss = () => {
    close();
  };

  const handleGesture = Gesture.Pan()
    .activeOffsetY([8, 9999])
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY);
      backdropOpacity.value = Math.max(0, 1 - translateY.value / 280);
    })
    .onEnd((event) => {
      const shouldClose = event.translationY > 90 || event.velocityY > 900;

      if (shouldClose) {
        translateY.value = withTiming(420, { duration: 180 }, () => {
          runOnJS(dismiss)();
        });
        return;
      }

      translateY.value = withSpring(0, { damping: 18, stiffness: 220 });
      backdropOpacity.value = withSpring(1, { damping: 18, stiffness: 220 });
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!show) {
    return null;
  }

  return (
    <View className="absolute inset-0 justify-end bg-transparent">
      <Animated.View
        style={[
          backdropStyle,
          {
            backgroundColor: "rgba(0,0,0,0.35)",
            zIndex: 10,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
        ]}
      />

      <Pressable
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 11 }}
        onPress={close}
      />

      <Animated.View
        style={[sheetStyle, { zIndex: 20 }]}
        className="rounded-t-[28px] bg-white px-4 pb-6 pt-3"
      >
        <GestureDetector gesture={handleGesture}>
          <View className="mb-3 items-center">
            <View className="h-1.5 w-14 rounded-full bg-grey-300" />
          </View>
        </GestureDetector>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons name="earth" size={20} color="#171007" />
            <Text className="text-[18px]/[26px] font-medium text-black">Language</Text>
          </View>

          <Pressable
            onPress={close}
            accessibilityRole="button"
            accessibilityLabel="Close language modal"
            hitSlop={10}
          >
            <MaterialCommunityIcons name="close" size={28} color="#171717" />
          </Pressable>
        </View>

        <Text className="mt-6 text-[18px]/[26px] text-natural-black">Choose Language</Text>

        <View className="mt-4 overflow-hidden rounded-2xl bg-white">
          {languages.map((language, index) => {
            const isSelected = selectedLanguage === language.value;
            const isLast = index === languages.length - 1;

            return (
              <Pressable
                key={language.value}
                onPress={() => {
                  onSelect(language.value);
                }}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                className={`flex-row items-center gap-3 py-4 ${!isLast ? "border-b border-grey-300" : ""}`}
              >
                <View
                  className={`h-5 w-5 items-center justify-center rounded-full border-2 ${isSelected ? "border-yellow-800" : "border-yellow-800"}`}
                >
                  {isSelected ? <View className="h-2.5 w-2.5 rounded-full bg-yellow-800" /> : null}
                </View>
                <Text className="text-[16px]/[24px] text-natural-black">{language.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Button
          title="Save"
          size="lg"
          className="mt-5 w-full rounded-xl bg-[#F0B24D] py-4"
          textClassName="text-[18px] leading-6 font-medium text-black"
          onPress={onSave}
        />
      </Animated.View>
    </View>
  );
}

export default LanguageModal;
