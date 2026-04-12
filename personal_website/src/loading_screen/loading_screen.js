import React, { useEffect, useRef } from "react";
import anime from "animejs";
import "./loading_screen.css";

const LoadingScreen = ({ isLoading }) => {
  const brandRef = useRef(null);
  const dotsRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    if (!brandRef.current) return;

    // Letter-by-letter brand entrance
    anime({
      targets: brandRef.current.querySelectorAll(".ls__char"),
      opacity: [0, 1],
      translateY: ["1em", 0],
      easing: "easeOutExpo",
      duration: 900,
      delay: anime.stagger(120, { start: 100 }),
    });

    // Pulsing dot loop
    const dotsAnim = anime({
      targets: dotsRef.current?.querySelectorAll("span"),
      translateY: [-2, -10, -2],
      opacity: [0.35, 1, 0.35],
      easing: "easeInOutSine",
      duration: 900,
      delay: anime.stagger(140),
      loop: true,
      direction: "alternate",
    });

    // Progress bar pulse
    const barAnim = anime({
      targets: barRef.current,
      scaleX: [0, 1],
      easing: "easeInOutQuad",
      duration: 1400,
      loop: true,
    });

    return () => {
      dotsAnim.pause();
      barAnim.pause();
    };
  }, []);

  // Exit flourish
  useEffect(() => {
    if (isLoading || !brandRef.current) return;
    anime({
      targets: brandRef.current.querySelectorAll(".ls__char"),
      opacity: [1, 0],
      translateY: [0, "-0.6em"],
      easing: "easeInExpo",
      duration: 500,
      delay: anime.stagger(60),
    });
  }, [isLoading]);

  return (
    <div className={`ls ${isLoading ? "ls--visible" : "ls--hidden"}`}>
      <div className="ls__brand" ref={brandRef}>
        <span className="ls__char">s</span>
        <span className="ls__char">s</span>
      </div>
      <div className="ls__dots" ref={dotsRef}>
        <span />
        <span />
        <span />
      </div>
      <div className="ls__bar-track">
        <div className="ls__bar" ref={barRef} />
      </div>
    </div>
  );
};

export default LoadingScreen;
