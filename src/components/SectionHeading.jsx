import { motion } from "framer-motion";

import { fadeIn, textVariant } from "../utils/motion";

/**
 * One heading system for every section: a small letterspaced kicker, a big
 * display title, then optional supporting copy. Same rhythm in About, Journey,
 * Tech, Projects, Members and Contact.
 */
const SectionHeading = ({
  kicker,
  title,
  subtitle,
  align = "left",
  className = "",
}) => (
  <div
    className={`${align === "center" ? "text-center" : ""} ${className}`.trim()}
  >
    {kicker && (
      <motion.p variants={textVariant()} className='section-kicker'>
        {kicker}
      </motion.p>
    )}

    <motion.div variants={textVariant()}>
      <h2 className='section-title'>{title}</h2>
    </motion.div>

    {subtitle && (
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className={`mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default SectionHeading;