import { useState, useEffect } from "react";

/**
 * Custom hook to detect scroll position
 *
 * @param {number} threshold - The scroll Y position threshold (default: 100)
 * @returns {boolean} - Whether the scroll position is greater than the threshold
 *
 * @example
 * const scrolled = useScrollPosition(100);
 * const scrolledFar = useScrollPosition(500);
 */
export const useScrollPosition = (threshold = 100) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
};
