import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, {
  cloneElement,
  ComponentPropsWithRef,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

const textboxVariants = cva("flex-row items-center rounded-lg gap-1.5", {
  variants: {
    variant: {
      outline: "bg-natural-white border-yellow-700 border",
      contained: "bg-grey-200",
    },
    size: {
      sm: "px-4 py-2",
      md: "px-4 py-3",
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});

const iconSizeVariants = {
  sm: 16,
  md: 20,
};

export type TextboxProps = {
  leftIcon?: ReactNode;
  leftIconButtonProps?: TouchableOpacityProps;
  rightIcon?: ReactNode;
  rightIconButtonProps?: TouchableOpacityProps;
} & VariantProps<typeof textboxVariants> &
  ComponentPropsWithRef<typeof TextInput> &
  TextInputProps;

export const Textbox = ({
  variant,
  size,
  leftIcon,
  leftIconButtonProps,
  rightIcon,
  rightIconButtonProps,
  className,
  ...props
}: TextboxProps) => {
  const lIcon =
    leftIcon && isValidElement(leftIcon)
      ? cloneElement(
          leftIcon as ReactElement<{ color: string; size: number }>,
          {
            color: "#171007",
            size: iconSizeVariants[size ?? "md"],
          },
        )
      : leftIcon;
  const rIcon =
    rightIcon && isValidElement(rightIcon)
      ? cloneElement(
          rightIcon as ReactElement<{ color: string; size: number }>,
          {
            color: "#171007",
            size: iconSizeVariants[size ?? "md"],
          },
        )
      : rightIcon;

  return (
    <View className={cn(textboxVariants({ variant, size }), className)}>
      {lIcon ? (
        <TouchableOpacity {...leftIconButtonProps}>{lIcon}</TouchableOpacity>
      ) : null}
      <TextInput
        placeholderTextColor="#939393"
        className="flex-1 text-base leading-6 font-normal text-natural-black p-0 m-0"
        {...props}
      />
      {rIcon ? (
        <TouchableOpacity {...rightIconButtonProps}>{rIcon}</TouchableOpacity>
      ) : null}
    </View>
  );
};
