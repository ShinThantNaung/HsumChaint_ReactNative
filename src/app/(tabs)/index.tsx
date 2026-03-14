import { Textbox } from "@/components/ui/textbox";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <View className="flex-1 py-20 px-8 bg-white">
      <ScrollView contentContainerClassName="gap-4">
        <Textbox
          secureTextEntry={!show}
          placeholder="Password"
          rightIcon={
            show ? (
              <MaterialCommunityIcons name="eye-closed" />
            ) : (
              <MaterialCommunityIcons name="eye-outline" />
            )
          }
          rightIconButtonProps={{
            onPress: () => {
              setShow(!show);
            },
          }}
        />
        <Textbox
          secureTextEntry={!show}
          placeholder="Password"
          size={"sm"}
          rightIcon={
            show ? (
              <MaterialCommunityIcons name="eye-closed" />
            ) : (
              <MaterialCommunityIcons name="eye-outline" />
            )
          }
          rightIconButtonProps={{
            onPress: () => {
              setShow(!show);
            },
          }}
        />
        <Textbox
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          variant={"contained"}
          leftIcon={<MaterialIcons name="search" />}
          rightIcon={<MaterialIcons name="close" />}
          rightIconButtonProps={{
            onPress: () => {
              setSearch("");
            },
          }}
        />
        <Textbox
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          variant={"contained"}
          size={"sm"}
          leftIcon={<MaterialIcons name="search" />}
          rightIcon={<MaterialIcons name="close" />}
          rightIconButtonProps={{
            onPress: () => {
              setSearch("");
            },
          }}
        />
        <Textbox placeholder="Text" />
        <Textbox placeholder="Text" size={"sm"} />
        <Textbox placeholder="Text" multiline numberOfLines={3} />
      </ScrollView>
    </View>
  );
}
