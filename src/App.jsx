import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  About,
  // Feedbacks,
  Hero,
  Navbar,
} from "./components";

const Experience = lazy(() => import("./components/Experience"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const Contact = lazy(() => import("./components/Contact"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Suspense fallback={null}>
          <Experience />
          <Tech />
          <Works />
          {/* <Feedbacks /> */}
          <div className='relative z-0'>
            <Contact />
            <StarsCanvas />
          </div>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
