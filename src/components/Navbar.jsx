import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close the mobile menu on Escape, and when tapping outside it
  useEffect(() => {
    if (!toggle) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setToggle(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !toggleRef.current?.contains(e.target)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [toggle]);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-4 sm:py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center gap-3 max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2 shrink-0 min-h-[44px]'
          onClick={() => {
            setActive("");
            setToggle(false);
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt='VoidDev logo'
            className='w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-[0_0_2px_rgba(255,255,255,0.85)]'
          />
          <p className='text-white text-[16px] sm:text-[18px] font-bold cursor-pointer flex items-baseline min-w-0'>
            Team VoidDev
            <span className='hidden xl:inline'> | Development Team</span>
          </p>
        </Link>

        {/* the five links only fit from ~900px up; below that the burger takes over */}
        <ul className='list-none hidden lg:flex flex-row items-center gap-5 xl:gap-10'>
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <a
                href={`#${nav.id}`}
                onClick={() => setActive(nav.title)}
                className={`inline-flex items-center min-h-[44px] px-2 text-[16px] xl:text-[18px] font-medium transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright ${
                  active === nav.title ? "text-white" : "text-secondary"
                }`}
              >
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        <div className='lg:hidden flex items-center'>
          <button
            ref={toggleRef}
            type='button'
            onClick={() => setToggle((t) => !t)}
            aria-expanded={toggle}
            aria-controls='mobile-menu'
            aria-label={toggle ? 'Close menu' : 'Open menu'}
            className='w-11 h-11 grid place-items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright'
          >
            <motion.img
              src={toggle ? close : menu}
              alt=''
              aria-hidden='true'
              animate={{ rotate: toggle ? 90 : 0, scale: toggle ? 0.92 : 1 }}
              transition={{ duration: 0.2 }}
              className='w-[26px] h-[26px] object-contain'
            />
          </button>

          <AnimatePresence>
            {toggle && (
              <motion.div
                ref={menuRef}
                id='mobile-menu'
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.99 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className='flex flex-col p-5 black-gradient absolute top-[68px] right-4 left-4 z-30 rounded-xl shadow-card border border-accent/30 origin-top'
              >
                <ul className='list-none flex flex-col'>
                  {navLinks.map((nav, index) => (
                    <motion.li
                      key={nav.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18, delay: index * 0.025 }}
                    >
                      <a
                        href={'#' + nav.id}
                        onClick={() => {
                          setToggle(false);
                          setActive(nav.title);
                        }}
                        className={'flex items-center min-h-[44px] font-medium text-[16px] transition-colors duration-300 ' + (active === nav.title ? 'text-white' : 'text-secondary')}
                      >
                        {nav.title}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
