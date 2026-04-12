import React from "react";
import { motion } from "framer-motion";

const BG = "#060606";
const ACCENT = "#c03030";
const ACCENT_BRIGHT = "#e04040";

export default function Lamp() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height: "25rem",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        width: "100%",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          flex: 1,
          transform: "scaleY(1.25)",
          alignItems: "center",
          justifyContent: "center",
          isolation: "isolate",
          zIndex: 0,
        }}
      >
        {/* Left conic gradient */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            right: "50%",
            height: "14rem",
            overflow: "visible",
            backgroundImage: `conic-gradient(from 70deg at center top, ${ACCENT}, transparent, transparent)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              left: 0,
              backgroundColor: BG,
              height: "10rem",
              bottom: 0,
              zIndex: 20,
              WebkitMaskImage: "linear-gradient(to top, white, transparent)",
              maskImage: "linear-gradient(to top, white, transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "10rem",
              height: "100%",
              left: 0,
              backgroundColor: BG,
              bottom: 0,
              zIndex: 20,
              WebkitMaskImage: "linear-gradient(to right, white, transparent)",
              maskImage: "linear-gradient(to right, white, transparent)",
            }}
          />
        </motion.div>

        {/* Right conic gradient */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: "50%",
            height: "14rem",
            overflow: "visible",
            backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, ${ACCENT})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "10rem",
              height: "100%",
              right: 0,
              backgroundColor: BG,
              bottom: 0,
              zIndex: 20,
              WebkitMaskImage: "linear-gradient(to left, white, transparent)",
              maskImage: "linear-gradient(to left, white, transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "100%",
              right: 0,
              backgroundColor: BG,
              height: "10rem",
              bottom: 0,
              zIndex: 20,
              WebkitMaskImage: "linear-gradient(to top, white, transparent)",
              maskImage: "linear-gradient(to top, white, transparent)",
            }}
          />
        </motion.div>

        {/* Blur behind */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            height: "12rem",
            width: "100%",
            transform: "translateY(3rem) scaleX(1.5)",
            backgroundColor: BG,
            filter: "blur(24px)",
          }}
        />

        {/* Backdrop blur */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            zIndex: 50,
            height: "12rem",
            width: "100%",
            backgroundColor: "transparent",
            opacity: 0.1,
            backdropFilter: "blur(12px)",
          }}
        />

        {/* Large glow */}
        <div
          style={{
            position: "absolute",
            zIndex: 50,
            height: "9rem",
            width: "28rem",
            transform: "translateY(-50%)",
            borderRadius: "9999px",
            backgroundColor: ACCENT,
            opacity: 0.5,
            filter: "blur(48px)",
          }}
        />

        {/* Expanding inner glow */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            zIndex: 30,
            height: "9rem",
            transform: "translateY(-6rem)",
            borderRadius: "9999px",
            backgroundColor: ACCENT_BRIGHT,
            filter: "blur(24px)",
          }}
        />

        {/* Bright thin line */}
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            zIndex: 50,
            height: "2px",
            transform: "translateY(-7rem)",
            backgroundColor: ACCENT_BRIGHT,
          }}
        />

        {/* Background cover above */}
        <div
          style={{
            position: "absolute",
            zIndex: 40,
            height: "11rem",
            width: "100%",
            transform: "translateY(-12.5rem)",
            backgroundColor: BG,
          }}
        />
      </div>
    </div>
  );
}
