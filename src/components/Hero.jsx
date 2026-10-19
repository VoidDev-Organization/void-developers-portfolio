import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";

const Hero = () => {
  const heroRef = useRef(null);
  const isVisible = useInView(heroRef);

  return (
    <section ref={heroRef} className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] z-10 max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <motion.div
          variants={staggerContainer(0.14, 0.08)}
          initial='hidden'
          animate='show'
        >
          <motion.h1
            variants={textVariant()}
            className={`${styles.heroHeadText} text-white`}
          >
            Hi, we're <span className='text-[#915EFF]'>VoidDev</span>
          </motion.h1>
          <motion.p
            variants={fadeIn('up', 'tween', 0, 0.55)}
            className={`${styles.heroSubText} mt-2 text-white-100`}
          >
            A professional development team building innovative web
            solutions <br className='sm:block hidden' />
            and digital experiences — frontend, backend and design
          </motion.p>
        </motion.div>
      </div>

      <ComputersCanvas isVisible={isVisible} />

      <div className='absolute xs:bottom-10 bottom-32 z-10 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
