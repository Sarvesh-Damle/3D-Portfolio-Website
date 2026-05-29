import { ComputersCanvas } from "@components/canvas";
import { styles } from "@styles/styles";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] z-10 max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 pointer-events-none`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I&apos;m <span className='text-[#915eff]'>Sarvesh</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I develop user interfaces <br className='sm:block hidden' /> and Front-end web
            applications
          </p>
        </div>
      </div>

      <div className='absolute inset-0 top-[180px] z-0'>
        <ComputersCanvas />
      </div>
    </section>
  );
};

export default Hero;
