import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useMediaQuery } from "@hooks";

describe("useMediaQuery Hook", () => {
  let matchMediaMock;

  beforeEach(() => {
    // Create a mock for matchMedia
    matchMediaMock = {
      matches: false,
      media: "",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    window.matchMedia = vi.fn((query) => {
      matchMediaMock.media = query;
      return matchMediaMock;
    });
  });

  it("returns false initially when media query does not match", () => {
    matchMediaMock.matches = false;
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(false);
  });

  it("returns true initially when media query matches", () => {
    matchMediaMock.matches = true;
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(true);
  });

  it("adds event listener on mount", () => {
    renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(matchMediaMock.addEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("removes event listener on unmount", () => {
    const { unmount } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    unmount();
    expect(matchMediaMock.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("updates when media query match changes", async () => {
    matchMediaMock.matches = false;
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    expect(result.current).toBe(false);

    // Simulate media query change
    const changeListener = matchMediaMock.addEventListener.mock.calls[0][1];
    changeListener({ matches: true });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("works with different media query strings", () => {
    const queries = ["(max-width: 500px)", "(min-width: 1024px)", "(orientation: portrait)"];

    queries.forEach((query) => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() => useMediaQuery(query));
      expect(result.current).toBe(true);
      expect(window.matchMedia).toHaveBeenCalledWith(query);
    });
  });

  it("re-subscribes when query changes", () => {
    const { rerender } = renderHook(({ query }) => useMediaQuery(query), {
      initialProps: { query: "(max-width: 768px)" },
    });

    expect(matchMediaMock.addEventListener).toHaveBeenCalledTimes(1);

    rerender({ query: "(max-width: 1024px)" });

    // Should remove old listener and add new one
    expect(matchMediaMock.removeEventListener).toHaveBeenCalledTimes(1);
    expect(matchMediaMock.addEventListener).toHaveBeenCalledTimes(2);
  });
});
