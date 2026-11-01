import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { members } from "../constants";
import { SectionWrapper } from "../hoc";
import SectionHeading from "./SectionHeading";
import { fadeIn } from "../utils/motion";

const GitHubIcon = () => (
  <svg width='15' height='15' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
    <path d='M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.8 5.65-5.48 5.95.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z' />
  </svg>
);

const MailIcon = () => (
  <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
    <rect x='2' y='4' width='20' height='16' rx='2' />
    <path d='m2 7 10 6 10-6' />
  </svg>
);

const DownloadIcon = () => (
  <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
    <path d='m7 10 5 5 5-5' />
    <path d='M12 15V3' />
  </svg>
);

const HoverHint = () => (
  <span className='pointer-events-none absolute top-4 right-4 inline-flex items-center gap-1.5 bg-primary/70 backdrop-blur-sm border border-white/15 text-accent-soft rounded-full px-3 py-1.5 text-[10px] uppercase tracking-widest whitespace-nowrap transition-opacity duration-300 group-hover:opacity-0'>
    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
      <path d='M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
    Hover to see CV
  </span>
);

const Sheen = () => (
  <span className='pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]'>
    <span className='absolute -inset-y-1/2 -left-1/2 w-1/2 rotate-12 bg-linear-to-r from-transparent via-white/10 via-45% to-white/60 to-transparent transition-transform duration-[900ms] ease-out -translate-x-[160%] group-hover:translate-x-[360%]' />
  </span>
);

const Tag = ({ children }) => (
  <span className='bg-white/[0.07] border border-white/15 text-secondary rounded-full px-2.5 py-1 text-[11px] leading-none'>
    {children}
  </span>
);

const Group = ({ label, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <p className='text-[11px] font-bold uppercase tracking-wider text-accent-bright mb-2'>
        {label}
      </p>
      <div className='flex flex-wrap gap-1.5'>
        {items.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </div>
  );
};

const IconButton = ({ href, label, children }) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    aria-label={label}
    title={label}
    onClick={(e) => e.stopPropagation()}
    className='w-11 h-11 rounded-full border-2 border-accent text-accent-bright grid place-items-center hover:bg-accent hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright'
  >
    {children}
  </a>
);

/* ---------------- front: photo, name, role, bio overlay ---------------- */
const FrontFace = ({ name, role, profile, profilePosition, bio, focus, showBack }) => (
  <div
    aria-hidden={showBack}
    className={`absolute inset-0 flex flex-col overflow-hidden rounded-[20px] transition-[opacity,transform] duration-500 ease-out ${
      showBack
        ? 'pointer-events-none opacity-0 -translate-y-3'
        : 'opacity-100 translate-y-0 group-hover:pointer-events-none group-hover:opacity-0 group-hover:-translate-y-3 group-focus-within:pointer-events-none group-focus-within:opacity-0 group-focus-within:-translate-y-3'
    }`}
  >
    <div className='relative w-full h-[260px] overflow-hidden shrink-0'>
      {profile ? (
        <img
          src={profile}
          alt={name}
          style={profilePosition ? { objectPosition: profilePosition } : undefined}
          className='w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110'
          loading='lazy'
        />
      ) : (
        <div className='w-full h-full violet-gradient' />
      )}

      <div className='absolute inset-0 bg-linear-to-t from-tertiary via-tertiary/50 to-transparent' />

      <HoverHint />

      <div className='absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out'>
        <p className='text-white text-[13px] leading-[21px] line-clamp-3'>{bio}</p>
        <p className='mt-2 text-[11px] uppercase tracking-widest text-accent-bright'>
          Hover for full CV
        </p>
      </div>
    </div>

    <div className='flex flex-col items-center text-center px-6 pt-5 pb-6'>
      <h3 className='text-white text-[21px] font-bold leading-tight'>{name}</h3>
      <p className='mt-1.5 text-accent-bright text-[12px] font-semibold uppercase tracking-wider'>
        {role}
      </p>
      <div className='mt-4 flex flex-wrap justify-center gap-1.5'>
        {focus.slice(0, 3).map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </div>
  </div>
);

/* ---------------- back: skills, contact, CV ---------------- */
const BackFace = ({
  name,
  education,
  languages,
  frameworks,
  databases,
  skills,
  projects,
  email,
  github,
  cv,
  showBack,
}) => (
  <div
    aria-hidden={!showBack}
    className={`absolute inset-0 flex flex-col text-left p-6 rounded-[20px] transition-[opacity,transform] duration-500 ease-out ${
      showBack
        ? 'opacity-100 translate-y-0'
        : 'pointer-events-none opacity-0 translate-y-3 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0'
    }`}
  >
    <h4 className='text-white text-[16px] font-bold'>{name}</h4>

    {education && (
      <p className='mt-1.5 text-[11.5px] leading-[18px] text-muted'>{education}</p>
    )}

    <div className='mt-4 flex-1 min-h-0 overflow-y-auto pr-1 space-y-3.5 thin-scrollbar'>
      <Group label='Languages' items={languages} />
      <Group label='Frameworks & Libraries' items={frameworks} />
      <Group label='Databases' items={databases} />
      <Group label='Skills' items={skills} />

      {projects?.length > 0 && (
        <div>
          <p className='text-[11px] font-bold uppercase tracking-wider text-accent-bright mb-2'>
            Projects
          </p>
          <div className='flex flex-wrap gap-1.5'>
            {projects.map((project) =>
              project.url ? (
                <a
                  key={project.name}
                  href={project.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={(e) => e.stopPropagation()}
                  className='inline-flex items-center bg-accent/15 border border-accent/40 text-accent-soft rounded-full px-3 py-2 min-h-[34px] text-[11px] leading-tight hover:bg-accent/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright'
                >
                  {project.name}
                </a>
              ) : (
                <Tag key={project.name}>{project.name}</Tag>
              ),
            )}
          </div>
        </div>
      )}
    </div>

    <div className='mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-3'>
      <div className='flex items-center gap-2'>
        {github && (
          <IconButton href={github} label={`${name} on GitHub`}>
            <GitHubIcon />
          </IconButton>
        )}
        {email && (
          <IconButton href={`mailto:${email}`} label={`Email ${name}`}>
            <MailIcon />
          </IconButton>
        )}
      </div>

      {cv ? (
        <a
          href={`${import.meta.env.BASE_URL}cv/${cv}`}
          download
          onClick={(e) => e.stopPropagation()}
          className='inline-flex items-center gap-2 min-h-[44px] text-[13px] font-semibold bg-accent text-white rounded-lg px-4 py-2.5 hover:bg-accent-bright hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright'
        >
          <DownloadIcon />
          Download CV
        </a>
      ) : (
        <span className='text-[11px] text-muted'>CV coming soon</span>
      )}
    </div>
  </div>
);

const FlipCard = ({ member, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const reduceMotion = useReducedMotion();
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (!isInView || reduceMotion) return;

    setReveal(true);
    const done = setTimeout(() => {
      setReveal(false);
    }, 940);

    return () => {
      clearTimeout(done);
    };
  }, [isInView, reduceMotion]);

  const showBack = reveal;

  return (
    <motion.div
      ref={ref}
      variants={fadeIn('up', 'spring', index * 0.2, 0.75)}
      initial='hidden'
      animate={isInView ? 'show' : 'hidden'}
      whileHover={{ y: -4, transition: { duration: 0.22, ease: 'easeOut' } }}
      className='w-full h-full'
    >
      <div className='w-full h-full'>
        <div
          tabIndex={0}
          role='group'
          aria-label={`${member.name} — hover or focus to see CV details`}
          style={{ perspective: 1200 }}
          className={`group relative w-full h-full min-h-[560px] rounded-[20px] bg-tertiary ring-1 ring-accent/40 shadow-card transition-transform duration-500 ease-out ${
            showBack
              ? 'rotate-y-[-5deg] scale-[1.015]'
              : 'rotate-y-0 scale-100 group-hover:rotate-y-[-5deg] group-hover:scale-[1.015] group-focus-within:rotate-y-[-5deg] group-focus-within:scale-[1.015]'
          }`}
        >
          <span
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 rounded-[20px] shadow-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100'
          />
          <FrontFace {...member} showBack={showBack} />
          <BackFace {...member} showBack={showBack} />
          <Sheen />
          <span
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-white/5 transition-all duration-500 group-hover:ring-accent-bright/60'
          />
        </div>
      </div>
    </motion.div>
  );
};

const Members = () => {
  return (
    <>
      <SectionHeading
        kicker='The people behind the work'
        title='Meet the Team.'
        subtitle="Four developers and designers working as one team — backend, frontend and design covered end to end, so a project never falls between roles. Hover any card for the full skill set, contact links and CV."
      />

      <div className='mt-16 grid grid-cols-1 sm:grid-cols-2 gap-7 items-stretch'>
        {members.map((member, index) => (
          <FlipCard key={member.name} member={member} index={index} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Members, 'team');
