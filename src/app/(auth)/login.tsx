import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/ui/form";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { HeaderTemplate } from "@/components/ui/template";
import { Text } from "@/components/ui/text";
import { useLogin } from "@/hooks/auth";
import images from "@assets/images";
import { View } from "react-native";

const SignInScreen = () => {
  const { form, show, passwordRef, toggleShowPassword, handleSubmit } = useLogin();

  return (
    <HeaderTemplate headerTitle="Login">
      <View className="py-[18px] items-center justify-center">
        <Image className="w-20 h-24 " source={images.thaBate} />
      </View>
      <View className="gap-4">
        <FormInputField
          control={form.control}
          name="phoneNo"
          label="Phone Number"
          placeholder="Enter your phone number"
          onSubmitEditing={passwordRef.current?.focus}
          keyboardType="phone-pad"
        />
        <View className="gap-2">
          <FormInputField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            ref={passwordRef}
            secureTextEntry={show}
            rightIcon={<Image source={images.eye} className="h-4 w-4" />}
            rightIconButtonProps={{
              onPress: toggleShowPassword,
            }}
          />
          <Link href={"/(auth)/sign-up"}>
            <Text className="text-right" title="Forgot password?" />
          </Link>
        </View>
        <View className="py-5">
          <Button title="Login" onPress={handleSubmit} />
        </View>
        <View className="flex-row items-center justify-center gap-2 pt-7">
          <Text title="Don't have an account?" />
          <Link href={"/sign-up"}>
            <Text title="Sign Up" />
          </Link>
        </View>
      </View>
    </HeaderTemplate>
  );
};

export default SignInScreen;
