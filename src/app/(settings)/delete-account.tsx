import { Stack } from "expo-router";

import { Header } from "@/components/ui/header/";

export default function DeleteAccountScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="Delete Account" />
    </>
  );
}
