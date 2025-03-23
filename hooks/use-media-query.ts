import { useEffect, useState } from "react";

// Tailwind's default breakpoints
const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

type BreakpointKey = keyof typeof breakpoints;

export function useMediaQuery(
  breakpoint: BreakpointKey,
  type: "up" | "down" | "only" = "up"
) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const currentBreakpoint = parseInt(breakpoints[breakpoint]);

    const getNextBreakpoint = () => {
      const keys = Object.keys(breakpoints) as BreakpointKey[];
      const currentIndex = keys.indexOf(breakpoint);
      const nextKey = keys[currentIndex + 1];
      return nextKey ? parseInt(breakpoints[nextKey]) : Infinity;
    };

    let query = "";
    switch (type) {
      case "up":
        query = `(min-width: ${breakpoints[breakpoint]})`;
        break;
      case "down":
        query = `(max-width: ${breakpoints[breakpoint]})`;
        break;
      case "only":
        const nextBreakpoint = getNextBreakpoint();
        query = `(min-width: ${breakpoints[breakpoint]}) and (max-width: ${
          nextBreakpoint - 1
        }px)`;
        break;
    }

    const mediaQuery = window.matchMedia(query);

    setMatches(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, [breakpoint, type]);

  return matches;
}
