import { loginSchema } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import type z from "zod";

export const useLogin = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNo: "",
      password: "",
    },
  });
  const [show, setShow] = useState(false);

  const passwordRef = useRef<TextInput>(null);

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log(data);
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  const toggleShowPassword = () => setShow((prev) => !prev);

  return {
    form,
    show,
    passwordRef,
    toggleShowPassword,
    handleSubmit,
  };
};
