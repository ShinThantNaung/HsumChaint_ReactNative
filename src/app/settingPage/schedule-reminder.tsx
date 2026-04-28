import { Stack } from "expo-router";

import { SettingsDestinationScreen } from "@/components/settings/settings-destination-screen";

export default function ScheduleReminderScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Schedule Reminder" }} />
      <SettingsDestinationScreen
        title="Schedule Reminder"
        description="This page can hold reminder times and schedule controls."
        accentColor="#FFE2D5"
      />
    </>
  );
}
