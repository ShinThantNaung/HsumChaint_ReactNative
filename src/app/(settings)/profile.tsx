import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header/";
import { useCurrentUser } from "@/hooks/users";
import { useAuthUser } from "@/stores/auth-user";

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View className="flex-row items-start gap-2 py-2">
      <Text className="w-24 text-[16px]/[22px] text-black">{label}</Text>
      <Text className="text-[16px]/[22px] text-black">:</Text>
      <Text className="flex-1 text-[16px]/[22px] text-black">{value}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const sessionUser = useAuthUser((state) => state.user);
  const { data: currentUser } = useCurrentUser();

  const displayName = currentUser?.name ?? currentUser?.username ?? sessionUser?.username ?? "User";
  const displayRole = currentUser?.role ?? currentUser?.userType ?? sessionUser?.userType ?? "-";
  const displayPhone =
    currentUser?.contactNo ??
    currentUser?.contactPhone ??
    currentUser?.phone ??
    sessionUser?.phone ??
    "-";
  const displayEmail = currentUser?.email ?? sessionUser?.email ?? "-";
  const displayAddress = currentUser?.address ?? currentUser?.monkProfile?.monasteryAddress ?? "-";

  const personalInformation = [
    { label: "Name", value: displayName },
    { label: "Role", value: displayRole },
  ];

  const contactInformation = [
    { label: "Phone", value: displayPhone },
    { label: "Email", value: displayEmail },
    { label: "Address", value: displayAddress },
  ];

  return (
    <View className="flex-1 bg-transparent">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="w-full flex-row items-center">
        <Header title="Profile" />
      </View>
      <ScrollView
        className="flex-1 bg-transparent"
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 28,
        }}
      >
        <View className="items-center">
          <View className="relative">
            <Avatar source={require("../../../assets/images/icon.png")} size={128} />
            <Pressable
              onPress={() => {
                console.log("camera pressed");
              }}
              className="absolute -bottom-1 -right-1 h-9 w-9 items-center justify-center rounded-full border bg-white"
            >
              <MaterialCommunityIcons name="camera-outline" size={18} color="#171717" />
            </Pressable>
          </View>
        </View>
        <View className="mx-2 mt-10 rounded-3xl bg-yellow-200 px-4 pt-4 pb-2">
          <Text className="text-[16px]/[22px] font-medium text-black">Personal Information</Text>
          {personalInformation.map((row) => (
            <InfoRow key={row.label} label={row.label} value={row.value} />
          ))}
        </View>
        <View className="mx-2 mt-3 rounded-3xl bg-yellow-200 px-4 pt-4 pb-2">
          <Text className="text-[16px]/[22px] font-medium text-black">Contact Information</Text>
          {contactInformation.map((row) => (
            <InfoRow key={row.label} label={row.label} value={row.value} />
          ))}
        </View>
        <View className="flex justify-end mt-6 px-5 w-full">
          <Button
            title="Edit"
            onPress={() => {
              router.push("/edit-profile");
            }}
            size="lg"
          />
        </View>
      </ScrollView>
    </View>
  );
}
