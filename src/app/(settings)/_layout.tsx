import images from "@assets/images";
import { Stack } from "expo-router";
import { DefaultTemplate } from "@/components/ui/template";

const SettingsLayout = () => {
  return (
    <DefaultTemplate bgImage={images.bgFrame2}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="profile" />
        <Stack.Screen name="change-password" />
        <Stack.Screen name="delete-account" />
        <Stack.Screen name="edit-profile" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="language" />
        <Stack.Screen name="schedule-reminder" />
      </Stack>
    </DefaultTemplate>
  );
};

export default SettingsLayout;
