import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Works from "@components/Works";

describe("Works", () => {
  it("renders project cards from the project configuration", () => {
    render(<Works />);

    expect(screen.getByRole("heading", { name: "Projects." })).toBeInTheDocument();
    expect(screen.getByText("Buddies - A Rental Platform")).toBeInTheDocument();
    expect(screen.getByText("Green Your Bills")).toBeInTheDocument();
    expect(screen.getByText("EZ Order")).toBeInTheDocument();
    expect(screen.getByText("3D Portfolio Website")).toBeInTheDocument();
  });

  it("marks private or unpublished project links honestly", () => {
    render(<Works />);

    expect(screen.getByText("Repository not published")).toBeInTheDocument();
    expect(screen.getByText("Private client repository")).toBeInTheDocument();
    expect(screen.getByText("Private company repository")).toBeInTheDocument();
    expect(screen.getByText("Deployment pending")).toBeInTheDocument();
  });

  it("renders source links only when a source URL is available", () => {
    render(<Works />);

    expect(
      screen.getByRole("link", { name: "View 3D Portfolio Website source code" })
    ).toHaveAttribute("href", "https://github.com/Sarvesh-Damle/3D-Portfolio-Website.git");
    expect(screen.queryByRole("link", { name: "View Green Your Bills source code" })).toBeNull();
  });
});
