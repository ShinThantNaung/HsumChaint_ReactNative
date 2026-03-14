import { cn } from "@/lib/utils";
import images from "@assets/images";
import { router } from "expo-router";
import type { PropsWithChildren } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Image } from "../image";
import { Text } from "../text";
import { DefaultTemplate } from "./default-template";
import type { HeaderTemplateProps } from "./template";

export const HeaderTemplate = (props: PropsWithChildren<HeaderTemplateProps>) => {
  const {
    headerTitle,
    showBack = true,
    scrollable = false,
    headerClassName,
    childClassName,
    children,
  } = props;

  const ChildView = scrollable ? ScrollView : View;

  return (
    <DefaultTemplate className="flex-1">
      <View className={cn("w-full flex-row items-center justify-between py-2", headerClassName)}>
        {showBack && (
          <Pressable
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            onPress={() => router.back()}
          >
            <Image source={images.arrowLeft} className="w-6 h-6" />
          </Pressable>
        )}
        <Text variant={"h6"} weight={"bold"} title={headerTitle} />
        <View className="w-6 h-6" />
      </View>
      <ChildView className={cn("flex-1", childClassName)}>{children}</ChildView>
    </DefaultTemplate>
  );
};
