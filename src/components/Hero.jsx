import heroImageBaW from "../assets/images/Hero-Interior-BaW.png";
import heroImageLine from "../assets/images/Hero-Interior-Line.png";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const Hero = ({ isReady }) => {
  useGSAP(() => {
    if (!isReady) return;
    const titleLine1Split = new SplitText("#title-line1", { type: "words" });
    const titleLine2Split = new SplitText("#title-line2", { type: "words" });
    const paragraphSplit = new SplitText("#title-paragraph", {
      type: "words, lines",
    });
    // Show Hero Image - lineart
    gsap.from(".hero-image-mask img", {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    });
    const herotl = gsap.timeline();
    // Show First line of h1
    herotl.from(titleLine1Split.words, {
      xPercent: -100,
      opacity: 0,
      delay: 1,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.2,
    });
    // Overlay B&W image over lineart
    herotl.fromTo(
      "#hero-image-baw",
      { opacity: 0 },
      {
        opacity: 1,

        duration: 0.5,
        ease: "power2.inOut",
      }
    );
    // Disable lineart
    herotl.to(
      "#hero-image-line",
      {
        display: "none",
        duration: 0.5,
        ease: "power2.inOut",
      },
      "<"
    );
    // Show second line of h1, flip effect
    herotl.from(
      titleLine2Split.words,
      {
        y: -30,
        transformOrigin: "top center",
        scaleY: -1,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.15,
      },
      "<"
    );
    // Show paragraph
    herotl.from(paragraphSplit.lines, {
      yPercent: -20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      stagger: 0.15,
    });
    // Make span items bolder
    herotl.to("#title-paragraph span", {
      fontWeight: 500,
      duration: 0.3,
      ease: "power2.inOut",
      stagger: 0.07,
    });
  }, [isReady]);

  return (
    <main className="relative w-full h-dvh bg-primary grid grid-rows-[calc(100dvh-70dvh)_0_70dvh] overflow-hidden">
      <div className="content left-0 right-0 mx-auto flex flex-col justify-end self-end row-start-1 row-end-2">
        <h1
          id="title-line1"
          className="text-secondary text-left self-start mb-[-0.22em]"
        >
          Your vision.{" "}
        </h1>
      </div>
      {/* Img container with 2 overlayed images, lineart an baw */}
      <div className="hero-image-mask relative w-full row-start-3 row-end-3 overflow-hidden">
        <img
          src={heroImageLine}
          id="hero-image-line"
          alt="Line art of living room interior"
          width="1920"
          height="1080"
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
        <img
          src={heroImageBaW}
          id="hero-image-baw"
          alt="Black and White image of living room interior"
          width="1920"
          height="1080"
          className="absolute inset-0 w-full h-full object-cover opacity-0 z-20"
        />
      </div>

      <div className="content left-0 right-0 mx-auto h-fit flex flex-col">
        <h1
          id="title-line2"
          className="text-white text-right self-end  mt-[-0.02em] z-30"
        >
          With Style.{" "}
        </h1>
        <p
          id="title-paragraph"
          className="w-full uppercase text-white max-w-[450px] lg:max-w-[500px] self-end"
        >
          Our <span>award-winning designers</span> and architects will turn
          <span> YOUR VISION</span> to <span>striking visualisations</span>
        </p>
      </div>
    </main>
  );
};
export default Hero;
