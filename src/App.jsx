import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Nav from "./components/Nav.jsx";
import Preloader from "./components/Preloader.jsx";
import Hero from "./components/Hero.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const [loadingDone, setLoadingDone] = useState(false);
  return (
    <>
      {/* When loading is done, send the signal to Nav and Hero and show their content */}
      <Preloader onComplete={() => setLoadingDone(true)}></Preloader>
      <div id="page-content" className="opacity-0">
        <Nav isReady={loadingDone}></Nav>
        <Hero isReady={loadingDone}></Hero>
      </div>
    </>
  );
}

export default App;
