import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { SectionHeader, TiltCard } from "@components/common";
import { services } from "@config/constants";
import { SectionWrapper } from "@hoc";
import { fadeIn } from "@utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <motion.div variants={fadeIn("right", "spring", index * 0.5, 0.75)}>
    <TiltCard
      className='xs:w-[250px] w-full'
      innerClassName='py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
    >
      <img src={icon} alt='' className='w-16 h-16 object-contain' />

      <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
    </TiltCard>
  </motion.div>
);

ServiceCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

const About = () => {
  return (
    <>
      <SectionHeader
        subText='Introduction'
        headText='Overview.'
        description='I am a Bachelor of Engineering in Information Technology with Honours in AI/ML. As an Associate Software Engineer at CodeArray Technologies, I build React Native subscription flows, modernize web application screens, debug production issues, and work across React, Node.js, MERN-stack, and healthcare billing workflows.'
      />

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

const AboutSection = SectionWrapper(About, "about");

export default AboutSection;
