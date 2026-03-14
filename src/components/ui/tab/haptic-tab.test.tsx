import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, render } from "@testing-library/react-native";
import * as Haptics from "expo-haptics";
import { Text } from "react-native";
import { HapticTab } from "./haptic-tab";

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: "light",
  },
}));

describe("HapticTab", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithNavigation = (ui: React.ReactNode) => {
    return render(<NavigationContainer>{ui}</NavigationContainer>);
  };

  it("renders correctly", () => {
    const { getByText } = renderWithNavigation(
      <HapticTab>
        <Text>Tab Item</Text>
      </HapticTab>,
    );
    expect(getByText("Tab Item")).toBeTruthy();
  });

  it("calls onPressIn prop callback when pressed", () => {
    const onPressIn = jest.fn();
    const { getByText } = renderWithNavigation(
      <HapticTab onPressIn={onPressIn}>
        <Text>Press Me</Text>
      </HapticTab>,
    );

    fireEvent(getByText("Press Me"), "onPressIn");
    expect(onPressIn).toHaveBeenCalled();
  });

  // NOTE: process.env.EXPO_OS is substituted at transform time by jest-expo,
  // so we can only test the behavior for the current platform (ios in test env).
  it("triggers haptic feedback when pressed in on iOS", () => {
    const { getByText } = renderWithNavigation(
      <HapticTab>
        <Text>Press Me</Text>
      </HapticTab>,
    );

    fireEvent(getByText("Press Me"), "onPressIn");
    expect(Haptics.impactAsync).toHaveBeenCalledWith("light");
  });
});
