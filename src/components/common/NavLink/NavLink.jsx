import React from "react";
import PropTypes from "prop-types";

/**
 * Navigation link component with active state styling
 *
 * @param {Object} props
 * @param {Object} props.nav - Navigation link object with id and title
 * @param {string} props.nav.id - Link anchor ID
 * @param {string} props.nav.title - Link display text
 * @param {string} props.active - Currently active link title
 * @param {function} props.onClick - Click handler function
 * @param {string} [props.variant] - Style variant: 'desktop' or 'mobile' (default: 'desktop')
 * @returns {JSX.Element}
 *
 * @example
 * <NavLink
 *   nav={{ id: 'about', title: 'About' }}
 *   active={active}
 *   onClick={() => setActive('About')}
 *   variant="desktop"
 * />
 */
const NavLink = ({ nav, active, onClick, variant = "desktop" }) => {
  const isActive = active === nav.title;

  // Desktop variant styles
  const desktopClasses = `${
    isActive ? "text-white" : "text-secondary"
  } hover:text-white text-[18px] font-medium cursor-pointer`;

  // Mobile variant styles
  const mobileClasses = `font-poppins font-medium cursor-pointer text-[16px] ${
    isActive ? "text-white" : "text-secondary"
  }`;

  const classes = variant === "mobile" ? mobileClasses : desktopClasses;

  return (
    <li className={classes} onClick={onClick}>
      <a href={`#${nav.id}`}>{nav.title}</a>
    </li>
  );
};

NavLink.propTypes = {
  nav: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  active: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["desktop", "mobile"]),
};

export default NavLink;
