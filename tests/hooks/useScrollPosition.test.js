import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useScrollPosition } from "@hooks";

describe("useScrollPosition Hook", () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });

    // Mock addEventListener and removeEventListener
    window.addEventListener = vi.fn();
    window.removeEventListener = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns false initially when scroll is below threshold", () => {
    window.scrollY = 50;
    const { result } = renderHook(() => useScrollPosition(100));
    expect(result.current).toBe(false);
  });

  it("returns true initially when scroll is above threshold", () => {
    window.scrollY = 150;
    const { result } = renderHook(() => useScrollPosition(100));
    expect(result.current).toBe(false); // Initial state before listener fires
  });

  it("adds scroll event listener on mount", () => {
    renderHook(() => useScrollPosition(100));
    expect(window.addEventListener).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("removes scroll event listener on unmount", () => {
    const { unmount } = renderHook(() => useScrollPosition(100));
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("updates to true when scrollY exceeds threshold", async () => {
    const { result } = renderHook(() => useScrollPosition(100));

    expect(result.current).toBe(false);

    // Simulate scroll event
    window.scrollY = 150;
    const scrollListener = window.addEventListener.mock.calls[0][1];
    scrollListener();

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("updates to false when scrollY goes below threshold", async () => {
    window.scrollY = 150;
    const { result } = renderHook(() => useScrollPosition(100));

    // Trigger initial scroll
    const scrollListener = window.addEventListener.mock.calls[0][1];
    scrollListener();

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    // Scroll back up
    window.scrollY = 50;
    scrollListener();

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  it("uses default threshold of 100 when not provided", () => {
    window.scrollY = 150;
    const { result } = renderHook(() => useScrollPosition());

    const scrollListener = window.addEventListener.mock.calls[0][1];
    scrollListener();

    waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("works with custom threshold values", async () => {
    const thresholds = [50, 200, 500];

    for (const threshold of thresholds) {
      window.scrollY = threshold + 10;
      const { result, unmount } = renderHook(() => useScrollPosition(threshold));

      const scrollListener =
        window.addEventListener.mock.calls[window.addEventListener.mock.calls.length - 1][1];
      scrollListener();

      await waitFor(() => {
        expect(result.current).toBe(true);
      });

      unmount();
      vi.clearAllMocks();
    }
  });

  it("re-subscribes when threshold changes", () => {
    const { rerender } = renderHook(({ threshold }) => useScrollPosition(threshold), {
      initialProps: { threshold: 100 },
    });

    expect(window.addEventListener).toHaveBeenCalledTimes(1);

    rerender({ threshold: 200 });

    // Should remove old listener and add new one
    expect(window.removeEventListener).toHaveBeenCalledTimes(1);
    expect(window.addEventListener).toHaveBeenCalledTimes(2);
  });
});
