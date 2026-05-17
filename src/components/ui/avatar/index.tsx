import { Image, View } from "react-native";
import type { AvatarProps } from "./avatar";

export function Avatar({
  source,
  size,
  backgroundColor = "#FFE2BF",
  imageScale = 0.625,
}: AvatarProps) {
  const imageSize = Math.round(size * imageScale);

  return (
    <View
      className="items-center justify-center rounded-full"
      style={{ width: size, height: size, backgroundColor }}
    >
      <Image
        source={source}
        className="rounded-full"
        style={{ width: imageSize, height: imageSize }}
        resizeMode="cover"
      />
    </View>
  );
}
