import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { styles } from "../../../styles";
import { textVariant } from "../../../utils/motion";

/**
 * Standardized section header component with animation
 *
 * @param {Object} props
 * @param {string} [props.subText] - Small text above the heading (e.g., "Introduction", "My work")
 * @param {string} props.headText - Main heading text (e.g., "Overview.", "Projects.")
 * @param {string} [props.description] - Optional description paragraph below the heading
 * @param {string} [props.align] - Text alignment: 'left' or 'center' (default: 'left')
 * @param {string} [props.className] - Additional CSS classes for the wrapper
 * @returns {JSX.Element}
 *
 * @example
 * <SectionHeader
 *   subText="Introduction"
 *   headText="Overview."
 *   description="I'm a skilled software developer..."
 * />
 */
const SectionHeader = ({ subText, headText, description, align = "left", className = "" }) => {
  const alignmentClass = align === "center" ? "text-center items-center" : "";

  return (
    <div className={`flex flex-col ${alignmentClass} ${className}`}>
      <motion.div variants={textVariant()}>
        {subText && <p className={styles.sectionSubText}>{subText}</p>}
        <h2 className={styles.sectionHeadText}>{headText}</h2>
      </motion.div>

      {description && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
          }}
          className={`mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

SectionHeader.propTypes = {
  subText: PropTypes.string,
  headText: PropTypes.string.isRequired,
  description: PropTypes.string,
  align: PropTypes.oneOf(["left", "center"]),
  className: PropTypes.string,
};

export default SectionHeader;
