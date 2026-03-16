import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/ui/form";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { HeaderTemplate } from "@/components/ui/template";
import { Text } from "@/components/ui/text";
import { useSignUp } from "@/hooks/auth/use-sign-up";
import images from "@assets/images";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

type Params = {
  role: "user" | "monk";
};

const SignUpScreen = () => {
  const { role } = useLocalSearchParams<Params>();

  // TODO: control by role
  console.log("role", role);
  const { form, handleSubmit } = useSignUp();
  return (
    <HeaderTemplate
      templateClassName="pt-safe pb-0"
      headerTitle="Register"
      scrollable
      childClassName="pb-safe-offset-10"
    >
      <View className="py-[18px] items-center justify-center">
        <Image className="w-24 h-28" source={images.thaBate} />
      </View>
      <View className="gap-4">
        <Text title="Account Information" variant="label1" weight="bold" />
        <FormInputField
          control={form.control}
          name="phoneNo"
          required
          label="Phone Number"
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
        <FormInputField
          required
          control={form.control}
          name="username"
          label="Username"
          placeholder="Set your username"
        />
        <FormInputField
          required
          control={form.control}
          name="password"
          label="Password"
          placeholder="Set your password"
          secureTextEntry
          rightIcon={<Image source={images.eye} className="h-4 w-4" />}
          // rightIconButtonProps={{
          //   onPress: toggleShowPassword,
          // }}
        />
        <FormInputField
          required
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry
          rightIcon={<Image source={images.eye} className="h-4 w-4" />}
          // rightIconButtonProps={{
          //   onPress: toggleShowPassword,
          // }}
        />
        <Text title="Contact Information" variant="label1" weight="bold" />
        <FormInputField
          optional
          control={form.control}
          name="email"
          label="Email Address"
          placeholder="Enter your email address"
          keyboardType="email-address"
        />
        <FormInputField
          optional
          control={form.control}
          name="contactPhoneNo"
          label="Phone Number"
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
        <View className="py-5">
          <Button title="Register" onPress={handleSubmit} />
        </View>
        <View className="flex-row items-center justify-center gap-2 pt-7 pb-safe-offset-4">
          <Text title="Already have an account?" />
          <Link href={"/(auth)/login"}>
            <Text className={"underline text-orange-500 text-sm leading-5"} title="Login" />
          </Link>
        </View>
      </View>
    </HeaderTemplate>
  );
};

export default SignUpScreen;
