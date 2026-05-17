jest.mock("react-native-gesture-handler", () => {
  const React = require("react");
  const { View } = require("react-native");

  const gesture = {
    activeOffsetY: () => gesture,
    onUpdate: () => gesture,
    onEnd: () => gesture,
  };

  return {
    Gesture: {
      Pan: () => gesture,
    },
    GestureDetector: ({ children }: { children: React.ReactNode }) => <View>{children}</View>,
  };
});

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");

  return {
    __esModule: true,
    default: {
      View,
    },
    runOnJS: (callback: (...args: unknown[]) => unknown) => callback,
    useAnimatedStyle: (factory: () => object) => factory(),
    useSharedValue: (initialValue: number) => ({ value: initialValue }),
    withSpring: (value: unknown) => value,
    withTiming: (value: unknown, _config?: unknown, callback?: () => void) => {
      callback?.();
      return value;
    },
  };
});

import { fireEvent, render, screen } from "@/lib/test-utils";
import { LanguageModal } from "./language-modal";

describe("LanguageModal", () => {
  it("renders nothing when hidden", () => {
    const { queryByText } = render(
      <LanguageModal
        show={false}
        close={jest.fn()}
        selectedLanguage="en-US"
        onSelect={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    expect(queryByText("Language")).toBeNull();
  });

  it("lets the user select a language and save it", () => {
    const close = jest.fn();
    const onSelect = jest.fn();
    const onSave = jest.fn();

    render(
      <LanguageModal
        show
        close={close}
        selectedLanguage="en-US"
        onSelect={onSelect}
        onSave={onSave}
      />,
    );

    fireEvent.press(screen.getByText("Myanmar (Burmese)"));
    fireEvent.press(screen.getByText("Save"));

    expect(onSelect).toHaveBeenCalledWith("my-MM");
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it("calls close when the close button is pressed", () => {
    const close = jest.fn();

    render(
      <LanguageModal
        show
        close={close}
        selectedLanguage="en-US"
        onSelect={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    fireEvent.press(screen.getByLabelText("Close language modal"));

    expect(close).toHaveBeenCalledTimes(1);
  });
});
