import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { SectionHeader } from "@components/common";
import { github } from "@assets";
import { SectionWrapper } from "@hoc";
import { projects } from "@config/constants";
import { fadeIn } from "@utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  deployed_url,
  source_label = "Source unavailable",
  demo_label = "Demo unavailable",
}) => {
  const hasSource = Boolean(source_code_link);
  const hasDemo = Boolean(deployed_url);
  const projectImage = (
    <img
      src={image}
      alt={`${name} project preview`}
      className='w-full h-full object-cover rounded-2xl'
    />
  );

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1}
        transitionSpeed={450}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          {hasDemo ? (
            <a
              href={deployed_url}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`View ${name} project`}
              className='block w-full h-full'
            >
              {projectImage}
            </a>
          ) : (
            <div className='w-full h-full'>{projectImage}</div>
          )}

          <div className='absolute inset-0 flex justify-end items-start m-3 card-img_hover pointer-events-none'>
            {!hasDemo && (
              <span className='mr-auto max-w-[180px] rounded-md bg-black-200/90 px-3 py-2 text-[11px] leading-4 text-white-100'>
                {demo_label}
              </span>
            )}

            {hasSource && (
              <a
                href={source_code_link}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`View ${name} source code`}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center pointer-events-auto'
              >
                <img src={github} alt='source code' className='w-1/2 h-1/2 object-contain' />
              </a>
            )}
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>

        {!hasSource && <p className='mt-3 text-[12px] leading-5 text-secondary'>{source_label}</p>}
      </Tilt>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  image: PropTypes.string.isRequired,
  source_code_link: PropTypes.string,
  deployed_url: PropTypes.string,
  source_label: PropTypes.string,
  demo_label: PropTypes.string,
};

const Works = () => {
  return (
    <>
      <SectionHeader
        subText='My work'
        headText='Projects.'
        description='A focused mix of public portfolio work, smaller React experiments, and professional product work. Private company/client systems are marked clearly instead of linking to placeholder pages.'
      />

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

const WorksSection = SectionWrapper(Works, "works");

export default WorksSection;
