import { TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps &
  Readonly<{
    title: string;
    leftIcon?: ReactNode;
    textClassName?: string;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
  }>;
