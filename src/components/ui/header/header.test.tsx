import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { fireEvent, render, screen } from "@/lib/test-utils";
import { Header } from ".";

const mockBack = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

jest.mock("@expo/vector-icons/MaterialCommunityIcons", () => {
  return function MockIcon(props: { testID?: string }) {
    const { Text: RNText } = require("react-native");
    return <RNText {...props}>icon</RNText>;
  };
});

describe("Header", () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it("renders the title", () => {
    render(<Header title="Schedule Reminder" />);

    expect(screen.getByText("Schedule Reminder")).toBeOnTheScreen();
  });

  it("calls router.back when the back button is pressed", () => {
    render(<Header title="Profile" />);
    const backButton = screen.getByTestId("header-back-button");
    fireEvent.press(backButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("renders the icon", () => {
    render(<Header title="Profile" />);

    expect(screen.getByText("icon")).toBeOnTheScreen();
    expect(MaterialCommunityIcons).toBeDefined();
  });
});
