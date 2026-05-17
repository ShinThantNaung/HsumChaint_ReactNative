import {Image, type ImageSourcePropType, View} from "react-native";

type AvatarProps = {
  source: ImageSourcePropType;
  size: number;
  backgroundColor?: string;
  imageScale?: number;
};