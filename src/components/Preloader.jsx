import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

const Preloader = ({ onComplete }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let timeout;
    const incrementValue = () => {
      /* Loading value, increment it by random numbers at random intervals to simulate loading effect */

      setValue((prev) => {
        if (prev >= 100) return 100;
        const next = prev + Math.floor(Math.random() * 8) + 1;
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
    // On complete, send signal to App.jsx, disable preloader and show nav and hero contents - (to prevent blick)
    if (value === 100) {
      gsap.to("#preloader", {
        duration: 0.2,
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
      className="fixed inset-0 w-full h-screen bg-primary pointer-events-none z-9999"
    >
      {/* Loading bar, mask object and inner lading bar, in middle of screen plus translated down a bit */}
      <div className="absolute top-1/2 left-0 w-full h-6 bg-transparent translate-y-8">
        <div
          id="loading-bar"
          role="progressbar"
          className="relative h-full w-full bg-secondary scale-x-0 origin-left"
          style={{
            transformOrigin: "left center",
          }}
        ></div>
      </div>
      {/* Big loading number */}
      <span
        id="Loading-number"
        role="status"
        className="absolute m-auto top-0 bottom-0 right-[10%] h-fit text-8xl text-secondary font-bold"
      >
        {value}%
      </span>

      {/*

      Shutter blade animation, optional, not complete
      
      <div className="absolute inset-0 flex flex-col">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="shutter-blade flex-1 bg-secondary origin-top my-[4dvh]"
            style={{
              transform: "scaleY(0)",
              transformOrigin: "center",
            }}
          />
        ))}
      </div> */}
    </section>
  );
};
export default Preloader;
