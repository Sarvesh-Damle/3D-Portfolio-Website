import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "@components/common/Card";

describe("Card Component", () => {
  it("renders children correctly", () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies default green-pink gradient", () => {
    const { container } = render(<Card>Content</Card>);
    const cardWrapper = container.firstChild;
    expect(cardWrapper).toHaveClass("green-pink-gradient");
  });

  it("applies custom gradient class", () => {
    const { container } = render(<Card gradient='violet'>Content</Card>);
    const cardWrapper = container.firstChild;
    expect(cardWrapper).toHaveClass("violet-gradient");
  });

  it("applies custom className to outer wrapper", () => {
    const { container } = render(<Card className='custom-class'>Content</Card>);
    const cardWrapper = container.firstChild;
    expect(cardWrapper).toHaveClass("custom-class");
  });

  it("applies custom innerClassName to inner content", () => {
    const { container } = render(<Card innerClassName='inner-custom'>Content</Card>);
    const innerDiv = container.querySelector(".bg-tertiary");
    expect(innerDiv).toHaveClass("inner-custom");
  });

  it("has proper card styling classes", () => {
    const { container } = render(<Card>Content</Card>);
    const cardWrapper = container.firstChild;
    expect(cardWrapper).toHaveClass("w-full", "p-[1px]", "rounded-[20px]", "shadow-card");
  });

  it("renders with multiple gradient variants", () => {
    const gradients = ["green-pink", "violet", "orange", "blue"];

    gradients.forEach((gradient) => {
      const { container } = render(<Card gradient={gradient}>Content</Card>);
      const cardWrapper = container.firstChild;
      expect(cardWrapper).toHaveClass(`${gradient}-gradient`);
    });
  });

  it("falls back to green-pink gradient for invalid gradient", () => {
    const { container } = render(<Card gradient='invalid'>Content</Card>);
    const cardWrapper = container.firstChild;
    expect(cardWrapper).toHaveClass("green-pink-gradient");
  });
});
