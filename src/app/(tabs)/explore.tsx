import { Button } from "@/components/ui/button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View className="flex-1 py-20 px-8 bg-white">
      <ScrollView contentContainerClassName="gap-4">
        <Button title="Login" variant={"primary"} leftIcon={<MaterialIcons name="login" />} />
        <Button title="Login" variant={"outline"} leftIcon={<MaterialIcons name="login" />} />
        <Button title="Login" disabled leftIcon={<MaterialIcons name="login" />} />
        <Button
          title="Login"
          variant={"primary"}
          size={"sm"}
          leftIcon={<MaterialIcons name="login" />}
        />
        <Button
          title="Login"
          size={"sm"}
          variant={"outline"}
          leftIcon={<MaterialIcons name="login" />}
        />
        <Button title="Login" size={"sm"} disabled leftIcon={<MaterialIcons name="login" />} />
        <Button
          title="Login"
          size={"lg"}
          variant={"primary"}
          leftIcon={<MaterialIcons name="login" />}
        />
        <Button
          title="Login"
          size={"lg"}
          variant={"outline"}
          leftIcon={<MaterialIcons name="login" />}
        />
        <Button title="Login" size={"lg"} disabled leftIcon={<MaterialIcons name="login" />} />
        <Button title="Login" variant={"primary"} />
        <Button title="Login" variant={"outline"} />
        <Button title="Login" disabled />
        <Button title="Login" variant={"primary"} size={"sm"} />
        <Button title="Login" variant={"outline"} size={"sm"} />
        <Button title="Login" disabled size={"sm"} />
        <Button title="Login" variant={"primary"} size={"lg"} />
        <Button title="Login" variant={"outline"} size={"lg"} />
        <Button title="Login" disabled size={"lg"} />
      </ScrollView>
    </View>
  );
}
