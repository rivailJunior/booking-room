import { render, fireEvent, screen } from "@testing-library/react";
import { BookingDatePicker } from "@/components";
import { expect, vi } from "vitest";

describe("BookingDatePicker Component", () => {
  test("renders BookingDatePicker without crashing", () => {
    const { container } = render(
      <BookingDatePicker onHandleChange={vi.fn()} />
    );
    expect(screen.getByPlaceholderText("Select the dates")).toBeDefined();
    expect(container).toBeTruthy();
  });

  test.skip("updates value state correctly on handleValueChange", () => {
    const onHandleChange = vi.fn();
    render(<BookingDatePicker onHandleChange={onHandleChange} />);
    const input = screen.getByPlaceholderText("Select the dates");
    fireEvent.change(input, { target: { value: "2022-01-01" } });
    expect(onHandleChange).toHaveBeenCalledWith({
      startDate: "2022-01-01",
      endDate: null,
    });
  });
});
