import { signUpSchema } from "@/schemas/sign-up-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import type z from "zod";

export const useSignUp = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      phoneNo: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      contactPhoneNo: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const passwordRef = useRef<TextInput>(null);

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    console.log(data);
    setShowSuccessModal(true);
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const closeSuccessModal = () => setShowSuccessModal(false);

  return {
    form,
    showPassword,
    passwordRef,
    showSuccessModal,
    toggleShowPassword,
    handleSubmit,
    closeSuccessModal,
  };
};
