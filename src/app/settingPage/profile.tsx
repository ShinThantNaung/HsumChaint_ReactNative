import { Avatar } from "@/components/ui/avatar";
import { Header } from "@/components/ui/header/header";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const personalInformation = [
  { label: "Name", value: "U Law Ti Ka" },
  { label: "Role", value: "Owner" },
];

const contactInformation = [
  { label: "Phone", value: "09 422 675 753" },
  { label: "Email", value: "lawtika@gmail.com" },
  { label: "Address", value: "Min Ye Kyaw Swar Street" },
];

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

type InfoCardProps = {
  title: string;
  rows: Array<{ label: string; value: string }>;
};

function InfoCard({ title, rows }: InfoCardProps) {
  return (
    <View className="rounded-[22px] bg-[#FBE7C2] px-4 py-4">
      <Text className="mb-2 text-[17px]/[24px] font-semibold text-black">{title}</Text>
      {rows.map((row) => (
        <InfoRow key={row.label} label={row.label} value={row.value} />
      ))}
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="w-full flex-row items-center items-center">
        <Header title="Profile" />
      </View>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{
          paddingHorizontal: 20,
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
        <View className="mx-5 mt-10 rounded-3xl bg-[#FFF4E3] px-4 py-4">
          <Text className="text-[16px]/[22px] font-medium text-black">Personal Information</Text>
          {personalInformation.map((row) => (
            <InfoRow key={row.label} label={row.label} value={row.value} />
          ))}
        </View>
        <View className="mx-5 mt-3 rounded-3xl bg-[#FFF4E3] px-4 py-4">
          <Text className="text-[16px]/[22px] font-medium text-black">Contact Information</Text>
          {contactInformation.map((row) => (
            <InfoRow key={row.label} label={row.label} value={row.value} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
