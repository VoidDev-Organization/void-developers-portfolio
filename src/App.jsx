import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";

import {
  About,
  Contact,
  Journey,
  Members,
  Pricing,
  Hero,
  Navbar,
  ScrollManager,
  Tech,
  Works,
  StarsCanvas,
} from "./components";

const App = () => {
  return (
    <MotionConfig reducedMotion='user'>
      <BrowserRouter>
        <ScrollManager />
        <div className='relative z-0 bg-primary'>
          <div className='bg-hero-pattern'>
            <Navbar />
            <Hero />
          </div>
          <About />
          <Journey />
          <Tech />
          <Works />
          <Pricing />
          <Members />
          <div className='relative z-0'>
            <Contact />
            <StarsCanvas />
          </div>
        </div>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;