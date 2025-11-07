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
      <Preloader onComplete={() => setLoadingDone(true)}></Preloader>
      <Nav isReady={loadingDone}></Nav>
      <Hero isReady={loadingDone}></Hero>
    </>
  );
}

export default App;
