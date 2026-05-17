import images from "@assets/images";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { LogoutModal } from "@/components/settings/logout-modal";
import { Avatar } from "@/components/ui/avatar";
import { Header } from "@/components/ui/header/";
import { DefaultTemplate } from "@/components/ui/template";
import { useCurrentUser } from "@/hooks/users";
import { queryClient } from "@/lib/utils";
import { useAuthUser } from "@/stores/auth-user";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

type SettingsRowItem = {
  title: string;
  iconName: IconName;
  iconColor: string;
  iconBackground: string;
  isDanger?: boolean;
  route:
    | "/edit-profile"
    | "/change-password"
    | "/delete-account"
    | "/notifications"
    | "/language"
    | "/schedule-reminder"
    | "/login";
};

type SettingsSectionProps = {
  title: string;
  rows: SettingsRowItem[];
  onNavigate: (route: SettingsRowItem["route"]) => void;
};

const accountRows: SettingsRowItem[] = [
  {
    title: "Edit Profile",
    iconName: "account-edit-outline",
    iconColor: "#260DB3",
    iconBackground: "#E1DCFF",
    route: "/edit-profile",
  },
  {
    title: "Change Password",
    iconName: "lock-reset",
    iconColor: "#08AE1B",
    iconBackground: "#E5FFE8",
    route: "/change-password",
  },
  {
    title: "Delete Account",
    iconName: "account-remove-outline",
    iconColor: "#AE1D1D",
    iconBackground: "#F3DEDE",
    isDanger: true,
    route: "/delete-account",
  },
];

const preferenceRows: SettingsRowItem[] = [
  {
    title: "Notifications",
    iconName: "bell-outline",
    iconColor: "#260DB3",
    iconBackground: "#E1DCFF",
    route: "/notifications",
  },
  {
    title: "Language",
    iconName: "web",
    iconColor: "#CFB107",
    iconBackground: "#FFF3B0",
    route: "/language",
  },
];

const scheduleRows: SettingsRowItem[] = [
  {
    title: "Schedule Reminder",
    iconName: "clock-outline",
    iconColor: "#A63807",
    iconBackground: "#FFE2D5",
    route: "/schedule-reminder",
  },
];

function SettingsSection({ title, rows, onNavigate }: SettingsSectionProps) {
  return (
    <View className="mx-2 mt-5 rounded-3xl bg-yellow-100 px-4 py-4">
      <Text className="text-[16px]/[22px] font-medium text-black">{title}</Text>

      <View className="mt-2">
        {rows.map((row) => (
          <Pressable
            key={row.title}
            className="flex-row items-center py-3"
            onPress={() => {
              onNavigate(row.route);
            }}
          >
            <View
              className="h-7 w-7 items-center justify-center rounded-md"
              style={{ backgroundColor: row.iconBackground }}
            >
              <MaterialCommunityIcons name={row.iconName} size={16} color={row.iconColor} />
            </View>

            <Text className="ml-3 flex-1 text-[16px]/[22px] font-normal text-black">
              {row.title}
            </Text>

            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={row.isDanger ? "#DC2626" : "#171717"}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const sessionUser = useAuthUser((state) => state.user);
  const { data: currentUser } = useCurrentUser();

  const displayName = currentUser?.name ?? currentUser?.username ?? sessionUser?.username ?? "User";
  const displayPhone =
    currentUser?.contactNo ??
    currentUser?.contactPhone ??
    currentUser?.phone ??
    sessionUser?.phone ??
    "";

  const handleNavigate = (route: SettingsRowItem["route"]) => {
    router.push(route);
  };

  return (
    <DefaultTemplate bgImage={images.bgFrame2} className="relative">
      <ScrollView
        className="flex-1 bg-transparent"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center px-2 pb-10">
          <View className="w-full flex-row items-center justify-center">
            <Header title="Settings" />
          </View>

          <View className="mt-8 items-center">
            <Avatar source={require("../../../assets/images/icon.png")} size={128} />
            <Pressable
              className="rounded-md px-3"
              onPress={() => {
                router.push("/profile");
              }}
            >
              <Text className="mt-4 text-2xl font-semibold text-black">{displayName}</Text>
            </Pressable>
            <Text className="mt-1 text-base text-[#4B4B4B]">{displayPhone || "-"}</Text>
          </View>
        </View>

        <SettingsSection title="Account" rows={accountRows} onNavigate={handleNavigate} />
        <SettingsSection title="Preferences" rows={preferenceRows} onNavigate={handleNavigate} />
        <SettingsSection title="Schedule" rows={scheduleRows} onNavigate={handleNavigate} />

        <View className="mx-2 mt-5 rounded-2xl border border-[#DC2626] py-4">
          <Pressable
            className="h-[48px] w-full flex-row items-center justify-center gap-2"
            onPress={() => {
              setShowLogoutModal(true);
            }}
          >
            <MaterialCommunityIcons name="logout" size={20} color="#AE1D1D" />
            <Text className="text-[18px]/[24px] font-medium text-[#DC2626]">Logout</Text>
          </Pressable>
        </View>
      </ScrollView>

      <LogoutModal
        show={showLogoutModal}
        close={() => {
          setShowLogoutModal(false);
        }}
        confirm={() => {
          setShowLogoutModal(false);
          queryClient.clear();
          router.replace("/login" as never);
        }}
      />
    </DefaultTemplate>
  );
}
