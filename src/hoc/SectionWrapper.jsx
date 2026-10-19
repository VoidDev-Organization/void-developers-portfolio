import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer(0.12, 0.06)}
        initial='hidden'
        whileInView='show'
        // A percentage-based trigger (amount) never fires for sections taller
        // than ~4x the viewport - e.g. the 3324px project grid in a 780px phone
        // viewport - which left every child stuck at opacity 0. A pixel margin
        // triggers as soon as any part enters, at any section height.
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
