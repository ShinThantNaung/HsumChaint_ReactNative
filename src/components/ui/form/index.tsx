import type { PropsWithChildren } from "react";
import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";
import { Text, View } from "react-native";
import { Textbox, type TextboxProps } from "../textbox";

export const FormContainer = ({ children }: PropsWithChildren) => {
  return <View className="gap-4">{children}</View>;
};

export type FormInputFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
} & TextboxProps;

export const FormInputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  ...props
}: FormInputFieldProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <View className="gap-2">
          <Text className="font-medium text-base leading-6">{label}</Text>
          <Textbox
            ref={field.ref}
            value={field.value}
            onChangeText={field.onChange}
            {...props}
            className={fieldState.invalid ? "border-warning border" : ""}
          />
          {fieldState.error && (
            <Text className="text-xs text-warning">{fieldState.error.message}</Text>
          )}
        </View>
      )}
    />
  );
};
