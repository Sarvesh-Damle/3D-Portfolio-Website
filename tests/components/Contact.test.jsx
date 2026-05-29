import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";

import Contact from "@components/Contact";

vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn(),
  },
}));

vi.mock("@components/canvas", () => ({
  EarthCanvas: () => <div data-testid='earth-canvas' />,
}));

describe("Contact", () => {
  it("shows validation errors for an empty submission", async () => {
    render(<Contact />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Send" }));
    });

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Message is required")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Please fix the highlighted fields before sending."
    );
  });

  it("shows a configuration message when EmailJS environment variables are missing", async () => {
    render(<Contact />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/your name/i), {
        target: { value: "Sarvesh" },
      });
      fireEvent.change(screen.getByLabelText(/your email/i), {
        target: { value: "sarvesh@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/your message/i), {
        target: { value: "I would like to discuss a project." },
      });
      fireEvent.click(screen.getByRole("button", { name: "Send" }));
    });

    expect(screen.getByRole("status")).toHaveTextContent(
      "Contact form is not configured yet. Please email me directly."
    );
  });
});
