import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@components/common/Button";

describe("Button Component", () => {
  it("renders button with children", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-tertiary");
  });

  it("applies secondary variant styling", () => {
    render(<Button variant='secondary'>Secondary Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-transparent", "border-2");
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button");

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50", "cursor-not-allowed");
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );
    const button = screen.getByRole("button");

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("shows loading text when loading is true", () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("disables button when loading", () => {
    render(<Button loading>Submit</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<Button className='custom-class'>Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("renders with correct button type", () => {
    render(<Button type='submit'>Submit</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("defaults to button type", () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders with both primary and secondary variants", () => {
    const { rerender } = render(<Button variant='primary'>Primary</Button>);
    let button = screen.getByRole("button");
    expect(button).toHaveClass("bg-tertiary");

    rerender(<Button variant='secondary'>Secondary</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("bg-transparent");
  });
});
