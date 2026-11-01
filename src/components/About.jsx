import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import SectionHeading from "./SectionHeading";
import { fadeIn } from "../utils/motion";

const ServiceCard = ({ title, icon }) => (
  <div className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("up", "tween", 0, 0.5)}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div className='bg-tertiary rounded-[20px] py-4 px-3 min-h-[180px] sm:min-h-[280px] sm:px-12 sm:py-5 flex justify-evenly items-center flex-col'>
        <img
          src={icon}
          alt='web-development'
          className='w-11 h-11 sm:w-16 sm:h-16 object-contain'
        />

        <h3 className='text-white text-[14px] sm:text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </div>
);

const About = () => {
  return (
    <>
      <SectionHeading
        kicker='Introduction'
        title='Overview.'
        subtitle="We are a talented group of developers and designers dedicated to creating exceptional digital solutions. Our team combines creativity with technical expertise to deliver projects that make an impact — from research and design through to clean, tested, production-ready code."
      />

      <div className='mt-10 sm:mt-20 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-10'>
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
