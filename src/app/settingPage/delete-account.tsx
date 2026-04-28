import { Stack } from "expo-router";

import { Header } from "@/components/ui/header/header";

export default function DeleteAccountScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack.Screen options={{ title: "Delete Account" }} />
      <Header title="Delete Account" />
    </>
  );
}
