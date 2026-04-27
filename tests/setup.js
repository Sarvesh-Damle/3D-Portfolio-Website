/* eslint-disable react/prop-types */
import React from "react";
import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

const stripMotionProps = (props) => {
  const domProps = { ...props };
  [
    "animate",
    "exit",
    "initial",
    "transition",
    "variants",
    "viewport",
    "whileHover",
    "whileInView",
    "whileTap",
  ].forEach((prop) => {
    delete domProps[prop];
  });

  return domProps;
};

vi.mock("framer-motion", () => ({
  AnimatePresence: (props) => props.children,
  motion: new Proxy(
    {},
    {
      get: (_, tag) => {
        const MotionElement = React.forwardRef((props, ref) => {
          const { children, ...rest } = props;
          return React.createElement(String(tag), { ...stripMotionProps(rest), ref }, children);
        });
        MotionElement.displayName = `MockMotion.${String(tag)}`;
        return MotionElement;
      },
    }
  ),
}));

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
