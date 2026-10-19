import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";

const Hero = () => {
  const heroRef = useRef(null);
  const isVisible = useInView(heroRef);

  return (
    <section ref={heroRef} className='relative mx-auto flex min-h-[720px] h-[100svh] max-h-[960px] w-full items-center justify-center overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 z-[1] bg-linear-to-b from-[#111111]/10 via-[#111111]/35 to-primary' />
      <div className={`relative z-10 mx-auto w-full max-w-6xl flex-none ${styles.paddingX} pt-20 text-center`}>
        <motion.div
          variants={staggerContainer(0.14, 0.08)}
          initial='hidden'
          animate='show'
          className='mx-auto flex w-full max-w-5xl flex-col items-center'
        >
          <motion.p
            variants={fadeIn('up', 'tween', 0, 0.45)}
            className='mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-bright sm:text-xs'
          >
            Design <span aria-hidden='true'>✦</span> Engineering <span aria-hidden='true'>✦</span> Delivery
          </motion.p>
          <motion.h1
            variants={textVariant()}
            className='w-full max-w-5xl text-center text-balance text-[clamp(3rem,7vw,6.25rem)] font-semibold leading-[0.98] text-white'
          >
            We turn ideas into <span className='text-accent-bright'>digital experiences.</span>
          </motion.h1>
          <motion.p
            variants={fadeIn('up', 'tween', 0, 0.55)}
            className='mt-7 max-w-2xl text-pretty text-[15px] leading-7 text-secondary sm:text-[18px] sm:leading-8'
          >
            A close-knit team building thoughtful websites and digital products, from the first sketch to the final line of code.
          </motion.p>
          <motion.div variants={fadeIn('up', 'tween', 0.08, 0.55)} className='mt-9 flex flex-wrap items-center justify-center gap-3'>
            <a href='#contact' className='inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-bright'>
              Start a project <span aria-hidden='true'>↗</span>
            </a>
            <a href='#projects' className='inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 text-sm font-medium text-white transition-colors hover:border-accent-bright hover:text-accent-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-bright'>
              Explore our work
            </a>
          </motion.div>
        </motion.div>
      </div>

      <ComputersCanvas isVisible={isVisible} />

      <div className='absolute bottom-7 z-10 flex w-full items-center justify-center sm:bottom-9'>
        <a href='#about'>
          <div aria-label='Scroll to About' className='flex h-11 w-7 items-start justify-center rounded-full border border-white/40 p-1.5'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='mb-1 h-2 w-2 rounded-full bg-accent-bright'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
