import { Stack } from "expo-router";

import { Header } from "@/components/ui/header/header";

export default function ScheduleReminderScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Schedule Reminder" }} />
      <Header title="Schedule Reminder" />
    </>
  );
}
