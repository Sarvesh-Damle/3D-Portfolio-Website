import { useState, useEffect } from "react";

/**
 * Custom hook to detect media query matches
 *
 * @param {string} query - The media query string to match (e.g., "(max-width: 768px)")
 * @returns {boolean} - Whether the media query matches
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 500px)");
 * const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event) => setMatches(event.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};
