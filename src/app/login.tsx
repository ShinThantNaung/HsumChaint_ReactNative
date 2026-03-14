import { Button } from "@/components/ui/button";
import { FormContainer, FormInputField } from "@/components/ui/form";
import { Link } from "@/components/ui/link";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";

const loginSchema = z.object({
  phoneNo: z.string().min(1, "Phone no. is required"),
  password: z.string().min(6, "Must be at least 6 characters long"),
});

export default function LoginTab() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNo: "",
      password: "",
    },
  });
  const [show, setShow] = useState(false);

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log(data);
  };

  return (
    <View className="flex-1 py-20 px-8 bg-white">
      <View className="gap-6">
        <FormContainer>
          <FormInputField
            control={form.control}
            name="phoneNo"
            label="Phone Number"
            placeholder="Enter your phone number"
          />
          <View className="gap-2">
            <FormInputField
              control={form.control}
              name="password"
              label="Password"
              secureTextEntry={!show}
              placeholder="Enter your password"
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
            <Link href={"/(tabs)/explore"} className="text-right">
              Forgot Password?
            </Link>
          </View>
        </FormContainer>
        <Button title="Login" onPress={form.handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
