import { describe, expect, it } from "vitest";

import {
  validateContactForm,
  validateEmail,
  validateMessage,
  validateName,
} from "@utils/validators";

describe("validators", () => {
  describe("validateEmail", () => {
    it.each([
      ["user@example.com", true],
      [" user@example.com ", true],
      ["user.name+tag@example.co.in", true],
      ["invalid.email", false],
      ["user@", false],
      ["", false],
    ])("returns %s for %s", (email, expected) => {
      expect(validateEmail(email)).toBe(expected);
    });
  });

  describe("validateName", () => {
    it.each([
      ["Sa", true],
      [" Sarvesh ", true],
      ["S", false],
      [" ", false],
      ["", false],
    ])("returns %s for %s", (name, expected) => {
      expect(validateName(name)).toBe(expected);
    });
  });

  describe("validateMessage", () => {
    it.each([
      ["This is a valid message.", true],
      ["  This is valid too  ", true],
      ["Too short", false],
      [" ", false],
      ["", false],
    ])("returns %s for %s", (message, expected) => {
      expect(validateMessage(message)).toBe(expected);
    });
  });

  describe("validateContactForm", () => {
    it("returns valid for complete contact data", () => {
      const result = validateContactForm({
        name: "Sarvesh",
        email: "sarvesh@example.com",
        message: "I would like to discuss a project.",
      });

      expect(result).toEqual({
        isValid: true,
        errors: {},
      });
    });

    it("returns field errors for empty contact data", () => {
      const result = validateContactForm({
        name: "",
        email: "",
        message: "",
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual({
        name: "Name is required",
        email: "Email is required",
        message: "Message is required",
      });
    });

    it("returns field errors for invalid contact data", () => {
      const result = validateContactForm({
        name: "S",
        email: "invalid.email",
        message: "Too short",
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual({
        name: "Name must be at least 2 characters",
        email: "Please enter a valid email address",
        message: "Message must be at least 10 characters",
      });
    });
  });
});
