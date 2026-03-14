import { cn } from "@/lib/utils";
import { View as RnView } from "react-native";
import { ImageBackground } from "../image";
import type { DefaultTemplateProps } from "./template";

export const DefaultTemplate = ({ children, className, ...props }: DefaultTemplateProps) => {
  const View = props.bgImage ? ImageBackground : RnView;
  return (
    <View
      source={props.bgImage}
      className={cn("flex-1 py-safe px-safe-offset-5", className)}
      {...props}
    >
      {children}
    </View>
  );
};
