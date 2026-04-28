import { Stack } from "expo-router";

import { SettingsDestinationScreen } from "@/components/settings/settings-destination-screen";

export default function NotificationsScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Notifications" }} />
      <SettingsDestinationScreen
        title="Notifications"
        description="This page can hold notification preferences and reminder toggles."
        accentColor="#E1DCFF"
      />
    </>
  );
}
