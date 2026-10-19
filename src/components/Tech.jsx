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

      <div className='mt-14 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10'>
        {technologies.map((technology) => (
          <article key={technology.name} className='min-w-0 text-center'>
            <div className='mx-auto h-28 w-28 max-w-full'>
              <BallCanvas icon={technology.icon} name={technology.name} />
            </div>
            <h3 className='mt-3 text-sm font-semibold text-white sm:text-base'>
              {technology.name}
            </h3>
            <p className='mx-auto mt-2 max-w-[26ch] text-xs leading-5 text-secondary sm:text-sm sm:leading-6'>
              {technology.description}
            </p>
          </article>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
