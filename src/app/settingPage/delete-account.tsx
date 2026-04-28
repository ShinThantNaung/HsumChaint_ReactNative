import { Stack } from "expo-router";

import { SettingsDestinationScreen } from "@/components/settings/settings-destination-screen";

export default function DeleteAccountScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Delete Account" }} />
      <SettingsDestinationScreen
        title="Delete Account"
        description="This page can hold the account deletion confirmation flow."
        accentColor="#F3DEDE"
      />
    </>
  );
}
