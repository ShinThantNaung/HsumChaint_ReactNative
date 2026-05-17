import { Image, View } from "react-native";
import { render } from "@/lib/test-utils";
import { Avatar } from ".";

describe("Avatar", () => {
  it("renders container and image with provided sizes", () => {
    const { UNSAFE_getAllByType, UNSAFE_getByType } = render(
      <Avatar
        source={{ uri: "https://example.com/a.png" }}
        size={80}
        imageScale={0.5}
        backgroundColor="#123456"
      />,
    );

    const container = UNSAFE_getAllByType(View)[0];
    expect(container.props.style).toMatchObject({
      width: 80,
      height: 80,
      backgroundColor: "#123456",
    });

    const image = UNSAFE_getByType(Image);
    expect(image.props.style).toMatchObject({ width: 40, height: 40 });
  });

  it("uses default background color and image scale", () => {
    const { UNSAFE_getAllByType, UNSAFE_getByType } = render(
      <Avatar source={{ uri: "https://example.com/b.png" }} size={100} />,
    );

    const container = UNSAFE_getAllByType(View)[0];
    expect(container.props.style).toMatchObject({
      width: 100,
      height: 100,
      backgroundColor: "#FFE2BF",
    });

    const image = UNSAFE_getByType(Image);
    expect(image.props.style).toMatchObject({ width: 63, height: 63 });
  });
});
