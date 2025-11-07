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
    <main className="w-full h-screen relative">
      <div className="hero-image-mask w-full h-[75%] portrait:max-[930px]:h-[63.1%] absolute bottom-0 left-0 overflow-hidden">
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
      <div
        className="uppercase font-extrabold 
      text-[clamp(2rem,13vh,8rem)] leading-[clamp(2rem,8.6vh,8rem)] 
      portrait:max-[930px]:text-[clamp(2rem,24vw,8rem)]
      portrait:max-[930px]:leading-[clamp(2rem,20vw,6rem)]
      absolute top-0 left-0 w-full h-full flex items-start justify-center pt-[clamp(2rem,17.6vh,11rem)]
      portrait:max-[930px]:pt-[calc(4.2rem+clamp(2rem,30vw,6rem))]
      "
      >
        <div className="content flex flex-col">
          <h1 id="title-line1" className="w-full text-left">
            Your vision,{" "}
          </h1>
          <h1 id="title-line2" className="text-white w-full text-right  z-30">
            With Style{" "}
          </h1>
          <p
            id="title-paragraph"
            className="text-lg uppercase text-white font-normal w-full max-w-[400px] self-end text-left z-30"
          >
            Our <span className="text-3xl">award-winning designers</span> and
            architects will turn <span className="text-3xl ">YOUR VISION</span>{" "}
            to <span className="text-3xl">striking visualisations</span>{" "}
          </p>
        </div>
      </div>
    </main>
  );
};
export default Hero;
