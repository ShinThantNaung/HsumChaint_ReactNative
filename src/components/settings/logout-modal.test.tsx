import { fireEvent, render, screen } from "@/lib/test-utils";
import { LogoutModal } from "./logout-modal";

describe("LogoutModal", () => {
  it("renders nothing when hidden", () => {
    const { queryByText } = render(
      <LogoutModal show={false} close={jest.fn()} confirm={jest.fn()} />,
    );

    expect(queryByText("Logout")).toBeNull();
  });

  it("calls close when No is pressed", () => {
    const close = jest.fn();

    render(<LogoutModal show close={close} confirm={jest.fn()} />);

    fireEvent.press(screen.getByText("No"));

    expect(close).toHaveBeenCalledTimes(1);
  });

  it("calls confirm when Yes is pressed", () => {
    const confirm = jest.fn();

    render(<LogoutModal show close={jest.fn()} confirm={confirm} />);

    fireEvent.press(screen.getByText("Yes"));

    expect(confirm).toHaveBeenCalledTimes(1);
  });
});
