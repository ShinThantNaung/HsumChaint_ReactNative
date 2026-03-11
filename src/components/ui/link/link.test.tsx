import { render, screen } from "@/lib/test-utils";
import React from "react";
import { Link } from ".";

jest.mock("expo-router", () => ({
  Link: ({ className, ...props }: { className?: string }) => {
    const { Text } = require("react-native");
    return <Text testID="expo-link" className={className} {...props} />;
  },
}));

describe("Link", () => {
  it("should render with default classes", () => {
    render(<Link href="/login" />);

    const link = screen.getByTestId("expo-link");
    expect(link).toBeOnTheScreen();
    expect(link.props.className).toContain("underline");
    expect(link.props.className).toContain("text-orange-500");
    expect(link.props.className).toContain("text-sm");
    expect(link.props.className).toContain("leading-5");
  });

  it("should merge custom className and pass props", () => {
    render(
      <Link href="/login" className="font-semibold" accessibilityLabel="go" />,
    );

    const link = screen.getByTestId("expo-link");
    expect(link.props.className).toContain("font-semibold");
    expect(link.props.href).toBe("/login");
    expect(link.props.accessibilityLabel).toBe("go");
  });
});
