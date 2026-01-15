import PropTypes from "prop-types";

/**
 * Reusable button component with loading state
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button text or content
 * @param {string} [props.variant] - Button style variant: 'primary' or 'secondary' (default: 'primary')
 * @param {boolean} [props.loading] - Loading state (default: false)
 * @param {boolean} [props.disabled] - Disabled state (default: false)
 * @param {function} [props.onClick] - Click handler function
 * @param {string} [props.type] - Button type attribute (default: 'button')
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element}
 *
 * @example
 * <Button
 *   variant="primary"
 *   loading={isLoading}
 *   onClick={handleSubmit}
 *   type="submit"
 * >
 *   Send Message
 * </Button>
 */
const Button = ({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
}) => {
  const baseClasses =
    "py-3 px-8 rounded-xl outline-none w-fit font-bold shadow-md shadow-primary transition-all duration-200";

  const variantClasses = {
    primary: "bg-tertiary text-white hover:bg-opacity-90",
    secondary: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-tertiary",
  };

  const disabledClasses = disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={buttonClasses}>
      {loading ? "Loading..." : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
};

export default Button;
