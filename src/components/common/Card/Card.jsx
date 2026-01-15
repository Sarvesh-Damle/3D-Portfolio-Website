import PropTypes from "prop-types";

/**
 * Base Card component with gradient border styling
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes for the outer wrapper
 * @param {string} [props.innerClassName] - Additional CSS classes for the inner content
 * @param {string} [props.gradient] - Gradient variant (green-pink, violet, orange, blue)
 * @returns {JSX.Element}
 *
 * @example
 * <Card gradient="green-pink">
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </Card>
 */
const Card = ({ children, className = "", innerClassName = "", gradient = "green-pink" }) => {
  const gradientClasses = {
    "green-pink": "green-pink-gradient",
    violet: "violet-gradient",
    orange: "orange-gradient",
    blue: "blue-gradient",
  };

  const gradientClass = gradientClasses[gradient] || gradientClasses["green-pink"];

  return (
    <div className={`w-full ${gradientClass} p-[1px] rounded-[20px] shadow-card ${className}`}>
      <div className={`bg-tertiary rounded-[20px] ${innerClassName}`}>{children}</div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  innerClassName: PropTypes.string,
  gradient: PropTypes.oneOf(["green-pink", "violet", "orange", "blue"]),
};

export default Card;
