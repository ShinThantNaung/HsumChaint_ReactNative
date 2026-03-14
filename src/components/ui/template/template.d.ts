import type { ImageSourcePropType, PropsWithChildren } from "react";
import { ViewProps } from "react-native";

type DefaultTemplateProps = PropsWithChildren<ViewProps> & {
  bgImage?: ImageSourcePropType;
};

type HeaderTemplateProps = {
  headerTitle: string;
  showBack?: boolean;
  scrollable?: boolean;
  headerClassName?: string;
  childClassName?: string;
};
