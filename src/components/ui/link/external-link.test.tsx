import { fireEvent, render } from "@testing-library/react-native";
import * as WebBrowser from "expo-web-browser";
import { ExternalLink } from "./external-link";

jest.mock("expo-web-browser", () => ({
  openBrowserAsync: jest.fn(),
  WebBrowserPresentationStyle: {
    AUTOMATIC: "automatic",
  },
}));

// Mock expo-router's Link to a plain pressable to avoid native module crashes
jest.mock("expo-router", () => ({
  Link: (props: any) => {
    const { Text } = require("react-native");
    return <Text onPress={props.onPress}>{props.children}</Text>;
  },
}));

// Prevent expo-linking native module from initializing
jest.mock("expo-linking", () => ({
  createURL: jest.fn(),
  parse: jest.fn(),
}));

describe("ExternalLink", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.EXPO_OS = "ios";
  });

  it("renders correctly with children", () => {
    const { getByText } = render(<ExternalLink href="https://expo.dev">Test Link</ExternalLink>);
    expect(getByText("Test Link")).toBeTruthy();
  });

  it("opens in-app browser when pressed on native platforms", async () => {
    process.env.EXPO_OS = "ios";

    const { getByText } = render(<ExternalLink href="https://expo.dev">Open Link</ExternalLink>);

    fireEvent.press(getByText("Open Link"), {
      preventDefault: jest.fn(),
    });

    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledWith("https://expo.dev", {
      presentationStyle: "automatic",
    });
  });
});
