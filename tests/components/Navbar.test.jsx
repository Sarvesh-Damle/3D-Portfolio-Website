import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";

import Navbar from "@components/Navbar";

const renderNavbar = () =>
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

describe("Navbar", () => {
  it("renders the main navigation links", () => {
    renderNavbar();

    expect(screen.getAllByRole("link", { name: "About" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Experience" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Projects" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Contact" }).length).toBeGreaterThan(0);
  });

  it("toggles the mobile navigation menu", async () => {
    renderNavbar();

    const menuButton = screen.getByRole("button", { name: /open navigation menu/i });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await act(async () => {
      fireEvent.click(menuButton);
    });

    expect(screen.getByRole("button", { name: /close navigation menu/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });
});
