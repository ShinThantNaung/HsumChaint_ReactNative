import { fireEvent, render } from "@testing-library/react-native";
import * as WebBrowser from "expo-web-browser";
import { ExternalLink } from "./external-link";

jest.mock("expo-web-browser", () => ({
  openBrowserAsync: jest.fn(),
  WebBrowserPresentationStyle: {
    AUTOMATIC: "automatic",
  },
}));

jest.mock("expo-router", () => ({
  Link: (props: any) => {
    const { Text } = require("react-native");
    return <Text onPress={props.onPress}>{props.children}</Text>;
  },
}));

describe("ExternalLink", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.EXPO_OS = "ios";
  });

  it("should be renders correctly with children", () => {
    const { getByText } = render(<ExternalLink href="https://expo.dev">Test Link</ExternalLink>);
    expect(getByText("Test Link")).toBeTruthy();
  });

  it("should be opens browser when pressed on native platforms", async () => {
    process.env.EXPO_OS = "ios";

    const { getByText } = render(<ExternalLink href="https://expo.dev">Open Link</ExternalLink>);
    const link = getByText("Open Link");

    fireEvent.press(link, {
      preventDefault: jest.fn(),
    });

    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledWith("https://expo.dev", {
      presentationStyle: "automatic",
    });
  });
});
