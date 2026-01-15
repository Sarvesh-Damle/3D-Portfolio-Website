import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormField from "@components/common/FormField";

describe("FormField Component", () => {
  const mockOnChange = vi.fn();

  const defaultProps = {
    label: "Test Label",
    name: "testField",
    type: "text",
    value: "",
    onChange: mockOnChange,
  };

  it("renders input field with label", () => {
    render(<FormField {...defaultProps} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders textarea when type is textarea", () => {
    render(<FormField {...defaultProps} type='textarea' />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("displays placeholder text", () => {
    render(<FormField {...defaultProps} placeholder='Enter text here' />);
    expect(screen.getByPlaceholderText("Enter text here")).toBeInTheDocument();
  });

  it("displays current value", () => {
    render(<FormField {...defaultProps} value='Test Value' />);
    expect(screen.getByDisplayValue("Test Value")).toBeInTheDocument();
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();
    render(<FormField {...defaultProps} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "a");
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("displays error message when error prop is provided", () => {
    render(<FormField {...defaultProps} error='This field is required' />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("shows required asterisk when required is true", () => {
    render(<FormField {...defaultProps} required={true} />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not show required asterisk by default", () => {
    render(<FormField {...defaultProps} />);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("applies error styling when error exists", () => {
    render(<FormField {...defaultProps} error='Error message' />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-2", "border-red-500");
  });

  it("renders textarea with custom rows", () => {
    render(<FormField {...defaultProps} type='textarea' rows={10} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "10");
  });

  it("applies custom className to wrapper", () => {
    const { container } = render(<FormField {...defaultProps} className='custom-wrapper' />);
    const label = container.querySelector("label");
    expect(label).toHaveClass("custom-wrapper");
  });

  it("renders with different input types", () => {
    const types = ["email", "tel", "password"];

    types.forEach((type) => {
      const { unmount } = render(<FormField {...defaultProps} type={type} />);
      const input = screen.getByLabelText("Test Label");
      expect(input).toHaveAttribute("type", type);
      unmount();
    });
  });
});
