import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";

import {
  About,
  Contact,
  Journey,
  Members,
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
          <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
            <Navbar />
            <Hero />
          </div>
          <About />
          <Journey />
          <Tech />
          <Works />
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