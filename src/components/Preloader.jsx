import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

const Preloader = ({ onComplete }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let timeout;
    const incrementValue = () => {
      setValue((prev) => {
        if (prev >= 100) return 100;
        const next = prev + Math.floor(Math.random() * 8) + 1; // default 8+1
        return next > 100 ? 100 : next;
      });
      timeout = setTimeout(
        incrementValue,
        Math.floor(Math.random() * 200) + 50
      );
    };
    incrementValue();
    return () => clearTimeout(timeout);
  }, []);

  // Animate bar width on value change
  useEffect(() => {
    gsap.to("#loading-bar", {
      scaleX: value / 100,
      duration: 0.2,
      ease: "power2.out",
      transformOrigin: "left center",
    });
    if (value === 100) {
      gsap.to("#preloader", {
        duration: 0.2, //default 2
        yPercent: -100,
        ease: "power2.inOut",
        delay: 0.3,
        onComplete: () => {
          gsap.set("#preloader", { display: "none" });
          gsap.to("#page-content", {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
          onComplete?.();
        },
      });
    }
  }, [value]);
  return (
    <section
      id="preloader"
      className="w-full fixed inset-0 z-9999 bg-white h-screen pointer-events-none"
    >
      <div
        className="absolute top-1/2 left-0 w-full h-6 bg-transparent translate-y-8"
        style={{
          clipPath: "polygon(0 0, 98% 0, 100% 100%, 0% 100%)",
        }}
      >
        <div
          id="loading-bar"
          className="relative h-full w-full bg-black scale-x-0 origin-left"
          style={{
            transformOrigin: "left center",
          }}
        ></div>
      </div>
      <span
        id="Loading-number"
        className="font-bold text-8xl absolute m-auto top-0 bottom-0 right-[10%] h-fit"
      >
        {value}%
      </span>
      {/* <footer className="absolute bottom-0 left-0 w-full text-center">
        <p className="text-center uppercase">Author:Adam Kaščák</p>
      </footer> */}
    </section>
  );
};
export default Preloader;
