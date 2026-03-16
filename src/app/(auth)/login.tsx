import { LoginSuccessModal } from "@/components/auth";
import { RegisterModal } from "@/components/auth/register-modal";
import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/ui/form";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { HeaderTemplate } from "@/components/ui/template";
import { Text } from "@/components/ui/text";
import { useLogin } from "@/hooks/auth";
import images from "@assets/images";
import { Pressable, View } from "react-native";

const SignInScreen = () => {
  const {
    form,
    showPassword,
    showSuccessModal,
    showRegisterModal,
    passwordRef,
    toggleShowPassword,
    handleSubmit,
    closeSuccessModal,
    closeRegisterModal,
    openRegisterModal,
  } = useLogin();

  return (
    <>
      <HeaderTemplate headerTitle="Login">
        <View className="py-[18px] items-center justify-center">
          <Image className="w-24 h-28" source={images.thaBate} />
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
              secureTextEntry={showPassword}
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
            <Pressable onPress={openRegisterModal}>
              <Text className={"underline text-orange-500 text-sm leading-5"} title="Sign Up" />
            </Pressable>
          </View>
        </View>
      </HeaderTemplate>
      <LoginSuccessModal show={showSuccessModal} close={closeSuccessModal} />
      <RegisterModal show={showRegisterModal} close={closeRegisterModal} />
    </>
  );
};

export default SignInScreen;
