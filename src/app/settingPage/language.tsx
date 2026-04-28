import { Stack } from "expo-router";

import { SettingsDestinationScreen } from "@/components/settings/settings-destination-screen";

export default function LanguageScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Language" }} />
      <SettingsDestinationScreen
        title="Language"
        description="This page can hold language selection and locale settings."
        accentColor="#FFF3B0"
      />
    </>
  );
}
