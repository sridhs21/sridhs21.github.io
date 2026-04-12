import React, { useMemo } from "react";
import { motion } from "framer-motion";

/* Tiny dust motes that drift through the spotlight beams */
function DustParticles({ count = 14 }) {
  const particles = useMemo(() => {
    const seeded = [];
    for (let i = 0; i < count; i++) {
      // Half on left corner, half on right corner
      const isLeft = i < count / 2;
      seeded.push({
        left: isLeft
          ? `${2 + ((i * 29 + 5) % 22)}%`   // 2–24% (top-left zone)
          : `${76 + ((i * 31 + 11) % 22)}%`, // 76–98% (top-right zone)
        top: `${2 + ((i * 41 + 9) % 28)}%`,  // 2–30% (upper area)
        size: 1.5 + (i % 3) * 0.7,
        duration: 5 + (i % 4) * 2,
        delay: (i % 6) * 1.4,
        driftX: (isLeft ? 1 : -1) * (10 + (i % 4) * 5),
        driftY: 15 + (i % 5) * 10,
      });
    }
    return seeded;
  }, [count]);

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0.55, 0.35, 0],
            x: [0, p.driftX * 0.5, p.driftX],
            y: [0, p.driftY * 0.5, p.driftY],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.8)",
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

export default function Spotlight({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 80%, 85%, .08) 0, hsla(0, 80%, 55%, .02) 50%, hsla(0, 80%, 45%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(0, 80%, 85%, .06) 0, hsla(0, 80%, 55%, .02) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(0, 80%, 85%, .04) 0, hsla(0, 80%, 45%, .02) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
} = {}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        height: "100%",
        width: "100%",
        zIndex: 0,
      }}
    >
      <DustParticles />
      {/* Left beam */}
      <motion.div
        animate={{ x: [0, xOffset, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transformOrigin: "top left",
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transformOrigin: "top left",
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />
      </motion.div>

      {/* Right beam */}
      <motion.div
        animate={{ x: [0, -xOffset, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            transformOrigin: "top right",
            transform: "rotate(45deg) translate(-5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            transformOrigin: "top right",
            transform: "rotate(45deg) translate(180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
