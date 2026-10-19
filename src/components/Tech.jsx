import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import SectionHeading from "./SectionHeading";

const Tech = () => {
  return (
    <>
      <SectionHeading
        align='center'
        kicker='What we work with'
        title='Tech Stack.'
        subtitle="The tools the team reaches for — from markup and styling on the front to the servers and databases behind them."
      />

      <div className='mt-16 flex flex-row flex-wrap justify-center gap-10'>
        {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");