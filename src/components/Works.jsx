import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Tilt } from "react-tilt";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { SectionHeading } from "./index";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects, projectCategories } from "../constants";

const ArrowIcon = () => (
  <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
    <path d='M14 4h6v6' />
    <path d='M20 4 10 14' />
    <path d='M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5' />
  </svg>
);

const CardLink = ({ href, children, primary }) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className={`inline-flex items-center gap-1.5 text-[12px] font-semibold rounded-lg px-3.5 py-2.5 min-h-[44px] transition-colors ${
      primary
        ? 'bg-accent text-white hover:bg-accent-bright hover:text-primary'
        : 'bg-black-100 text-secondary border border-accent/50 hover:bg-accent/20 hover:text-white'
    }`}
  >
    {children}
  </a>
);

/* Category pills. Buttons (not links) because they filter in place.
   role="group" + aria-pressed keeps them reachable by Tab and announced
   correctly; arrow keys move between them like a tablist. */
const CategoryFilter = ({ active, counts, onChange }) => {
  const refs = useRef([]);

  const onKeyDown = (e, index) => {
    const keys = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 1, ArrowUp: -1 };
    const step = keys[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (index + step + projectCategories.length) % projectCategories.length;
    refs.current[next]?.focus();
    onChange(projectCategories[next].id);
  };

  return (
    <div
      role='group'
      aria-label='Filter projects by category'
      className='flex flex-wrap gap-2 max-w-full'
    >
      {projectCategories.map((category, i) => {
        const isActive = active === category.id;
        const count = counts[category.id] ?? 0;

        return (
          <motion.button
            key={category.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type='button'
            onClick={() => onChange(category.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            aria-pressed={isActive}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 min-h-[44px] text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright ${
              isActive
                ? 'bg-accent border-accent text-white shadow-glow'
                : 'bg-transparent border-accent/40 text-secondary hover:text-white hover:border-accent-bright'
            }`}
          >
            {category.label}
            <span
              className={`text-[11px] tabular-nums ${
                isActive ? 'text-white/80' : 'text-muted'
              }`}
            >
              {count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

const ProjectCard = forwardRef(({
  index,
  name,
  description,
  tags,
  image,
  live_url,
  source_code_link,
  reduceMotion,
}, ref) => {
  const enterY = reduceMotion ? 0 : 16;
  const exitY = reduceMotion ? 0 : -10;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: enterY }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: reduceMotion ? 1 : 0,
        y: exitY,
        transition: { duration: reduceMotion ? 0 : 0.15 },
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.3,
        delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.2),
        ease: 'easeOut',
      }}
      whileHover={!reduceMotion ? { y: -4 } : undefined}
      layout
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-full ring-1 ring-accent/30 transition-shadow duration-300 hover:shadow-glow'
      >
        {/* hover to see: the image zooms and a panel slides up with the full
            description plus the demo / code links */}
        <div className='group relative w-full h-[230px] overflow-hidden rounded-2xl'>
          <img
            src={image}
            alt={name}
            className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
            loading='lazy'
          />

          <div className='absolute inset-0 bg-linear-to-t from-primary via-primary/88 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

          <div className='project-reveal absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-500 ease-out backdrop-blur-[2px]'>
            <p className='project-reveal-desc text-secondary text-[12.5px] leading-[19px] mb-3'>
              {description}
            </p>
            <div className='flex flex-wrap gap-2'>
              {live_url && (
                <CardLink href={live_url} primary>
                  <ArrowIcon />
                  Live demo
                </CardLink>
              )}
              {source_code_link && (
                <CardLink href={source_code_link}>
                  <img src={github} alt='' className='w-3 h-3 object-contain' />
                  Code
                </CardLink>
              )}
            </div>
          </div>

          <span className='project-reveal absolute top-3 right-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest bg-primary/70 backdrop-blur-sm border border-white/15 text-accent-soft rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500'>
            <ArrowIcon />
            View
          </span>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px] break-words'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px] leading-[22px] line-clamp-2'>
            {description}
          </p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const Works = () => {
  const [active, setActive] = useState('all');
  const reduceMotion = useReducedMotion();

  // counts come from the data, so a category can never drift out of sync
  const counts = useMemo(() => {
    const map = { all: projects.length };
    for (const project of projects) {
      for (const id of new Set(project.categories ?? [])) {
        map[id] = (map[id] ?? 0) + 1;
      }
    }
    return map;
  }, []);

  const visible = useMemo(
    () =>
      active === 'all'
        ? projects
        : projects.filter((p) => p.categories?.includes(active)),
    [active],
  );

  // Bring the gallery into view when a filter is chosen - never on mount.
  // Compared against the previous value instead of a boolean flag, because
  // StrictMode replays effects on mount and would fire a stray scroll.
  const previousFilter = useRef(active);
  useEffect(() => {
    if (previousFilter.current === active) return;
    previousFilter.current = active;

    const el = document.getElementById('project-gallery');
    if (!el || reduceMotion) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 150;
    if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
  }, [active, reduceMotion]);

  return (
    <>
      <SectionHeading
        kicker="What we've built"
        title='Projects.'
        subtitle="A selection of what the team has designed, built and shipped. Hover any card for the full description plus links to the live demo and the source code."
      />

      <div className='mt-10'>
        <CategoryFilter active={active} counts={counts} onChange={setActive} />
      </div>

      <div
        id='project-gallery'
        className='mt-10 flex flex-wrap gap-7 items-stretch'
        aria-live='polite'
      >
        <AnimatePresence mode='popLayout' initial={false}>
          {visible.map((project, i) => (
            <ProjectCard
              key={project.name}
              index={i}
              reduceMotion={reduceMotion}
              {...project}
            />
          ))}
        </AnimatePresence>

        {visible.length === 0 && (
          <p className='text-secondary text-[16px]'>
            No projects in this category yet.
          </p>
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'projects');
