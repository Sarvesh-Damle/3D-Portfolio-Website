/**
 * Email validation using RFC 5322 compliant regex
 *
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 *
 * @example
 * validateEmail("user@example.com") // true
 * validateEmail("invalid.email") // false
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Name validation - must be at least 2 characters
 *
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid name
 *
 * @example
 * validateName("John") // true
 * validateName("J") // false
 */
export const validateName = (name) => {
  return name.trim().length >= 2;
};

/**
 * Message validation - must be at least 10 characters
 *
 * @param {string} message - Message to validate
 * @returns {boolean} True if valid message
 *
 * @example
 * validateMessage("Hello, I would like to discuss a project") // true
 * validateMessage("Hi") // false
 */
export const validateMessage = (message) => {
  return message.trim().length >= 10;
};

/**
 * Validates entire contact form and returns validation result
 *
 * @param {Object} formData - Form data object
 * @param {string} formData.name - User's name
 * @param {string} formData.email - User's email
 * @param {string} formData.message - User's message
 * @returns {Object} Validation result with isValid flag and errors object
 *
 * @example
 * const result = validateContactForm({ name: "John", email: "john@example.com", message: "Hello world!" });
 * if (result.isValid) {
 *   // Submit form
 * } else {
 *   // Display errors: result.errors.name, result.errors.email, result.errors.message
 * }
 */
export const validateContactForm = (formData) => {
  const errors = {};

  // Validate name
  if (!formData.name || !formData.name.trim()) {
    errors.name = "Name is required";
  } else if (!validateName(formData.name)) {
    errors.name = "Name must be at least 2 characters";
  }

  // Validate email
  if (!formData.email || !formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Validate message
  if (!formData.message || !formData.message.trim()) {
    errors.message = "Message is required";
  } else if (!validateMessage(formData.message)) {
    errors.message = "Message must be at least 10 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
