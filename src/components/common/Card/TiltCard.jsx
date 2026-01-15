import PropTypes from "prop-types";
import Tilt from "react-parallax-tilt";
import Card from "./Card";

/**
 * Card component with 3D tilt effect using react-parallax-tilt
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes for the Tilt wrapper
 * @param {string} [props.cardClassName] - Additional CSS classes for the Card component
 * @param {string} [props.innerClassName] - Additional CSS classes for the inner content
 * @param {string} [props.gradient] - Gradient variant for the card border
 * @param {number} [props.tiltMaxAngleX] - Maximum tilt angle on X-axis (default: 45)
 * @param {number} [props.tiltMaxAngleY] - Maximum tilt angle on Y-axis (default: 45)
 * @param {number} [props.scale] - Scale factor on hover (default: 1)
 * @param {number} [props.transitionSpeed] - Transition speed in ms (default: 450)
 * @returns {JSX.Element}
 *
 * @example
 * <TiltCard tiltMaxAngleX={45} tiltMaxAngleY={45}>
 *   <img src={icon} alt="service" />
 *   <h3>Service Title</h3>
 * </TiltCard>
 */
const TiltCard = ({
  children,
  className = "",
  cardClassName = "",
  innerClassName = "",
  gradient = "green-pink",
  tiltMaxAngleX = 45,
  tiltMaxAngleY = 45,
  scale = 1,
  transitionSpeed = 450,
}) => {
  return (
    <Tilt
      className={className}
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      scale={scale}
      transitionSpeed={transitionSpeed}
    >
      <Card className={cardClassName} innerClassName={innerClassName} gradient={gradient}>
        {children}
      </Card>
    </Tilt>
  );
};

TiltCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  cardClassName: PropTypes.string,
  innerClassName: PropTypes.string,
  gradient: PropTypes.oneOf(["green-pink", "violet", "orange", "blue"]),
  tiltMaxAngleX: PropTypes.number,
  tiltMaxAngleY: PropTypes.number,
  scale: PropTypes.number,
  transitionSpeed: PropTypes.number,
};

export default TiltCard;
