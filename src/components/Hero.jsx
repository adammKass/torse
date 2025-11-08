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
    gsap.from(".hero-image-mask img", {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    });
    const herotl = gsap.timeline();
    herotl.from(titleLine1Split.words, {
      xPercent: -100,
      opacity: 0,
      delay: 1,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.2,
    });
    herotl.fromTo(
      "#hero-image-baw",
      { opacity: 0 },
      {
        opacity: 1,

        duration: 0.5,
        ease: "power2.inOut",
      }
    );
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
    herotl.from(paragraphSplit.lines, {
      yPercent: -20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      stagger: 0.15,
    });
    herotl.to("#title-paragraph span", {
      fontWeight: 500,
      duration: 0.3,
      ease: "power2.inOut",
      stagger: 0.07,
    });
  }, [isReady]);

  return (
    <main className="w-full h-dvh relative grid grid-rows-[calc(100dvh-70dvh)_0_70dvh] overflow-hidden">
      <div className="left-0 right-0 mx-auto content flex flex-col justify-end self-end row-start-1 row-end-2">
        <h1 id="title-line1" className="text-left self-start mb-[-0.22em]">
          Your vision.{" "}
        </h1>
      </div>
      <div className="hero-image-mask w-full relative row-start-3 row-end-3 overflow-hidden">
        <img
          src={heroImageLine}
          id="hero-image-line"
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
        <img
          src={heroImageBaW}
          id="hero-image-baw"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-0 z-20"
        />
      </div>
      {/* 8rem 9xl */}

      <div className="content flex flex-col h-fit left-0 right-0 mx-auto ">
        <h1
          id="title-line2"
          className="text-white  text-right self-end z-30 mt-[-0.02em]"
        >
          With Style.{" "}
        </h1>
        <p
          id="title-paragraph"
          className="uppercase text-white  w-full max-w-[450px] self-end"
        >
          Our <span>award-winning designers</span> and architects will turn{" "}
          <span>YOUR VISION</span> to <span>striking visualisations</span>{" "}
        </p>
      </div>
    </main>
  );
};
export default Hero;
