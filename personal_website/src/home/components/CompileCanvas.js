import React, { useCallback, useEffect, useRef } from "react";
import { useMotionValueEvent } from "framer-motion";
import { CANVAS_SCALE, ACTIVE_EPSILON } from "./canvasConsts";

/* ═══════════════════════════════════════════════════
   COMPILE EFFECT — canvas binary/hex inside silhouette
   ═══════════════════════════════════════════════════ */
export default function CompileCanvas({ width, height, intensityValue, opacityValue }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const timeoutRef = useRef(null);
  const intensityRef = useRef(0);
  const activeRef = useRef(false);
  const visibleRef = useRef(true);

  const rW = width * CANVAS_SCALE;
  const rH = height * CANVAS_SCALE;

  useMotionValueEvent(intensityValue, "change", (v) => {
    intensityRef.current = v;
  });

  useMotionValueEvent(opacityValue, "change", (v) => {
    activeRef.current = v > ACTIVE_EPSILON;
  });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const intensity = intensityRef.current;
    const fontSize = 11 * CANVAS_SCALE;
    const cellW = fontSize;
    const cellH = Math.round(fontSize * 1.36);
    const cols = Math.ceil(rW / cellW);
    const rows = Math.ceil(rH / cellH);

    ctx.clearRect(0, 0, rW, rH);
    ctx.font = `${fontSize}px 'DM Mono', monospace`;
    ctx.textBaseline = "top";

    const brightBoost = intensity * 0.4;
    const redChance = 0.08 + intensity * 0.25;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const roll = Math.random();
        let ch;
        if (roll < 0.65) {
          ch = Math.random() > 0.5 ? "1" : "0";
        } else if (roll < 0.85) {
          ch = "0123456789abcdef"[Math.floor(Math.random() * 16)];
        } else {
          ch = "{}[]();=><+-*/%&|!".charAt(Math.floor(Math.random() * 18));
        }

        const bright = Math.random() + brightBoost;
        if (Math.random() < redChance) {
          ctx.fillStyle = `rgba(192,48,48,${0.5 + intensity * 0.4})`;
        } else if (bright > 0.85) {
          ctx.fillStyle = `rgba(255,255,255,${0.75 + intensity * 0.2})`;
        } else if (bright > 0.5) {
          ctx.fillStyle = `rgba(255,255,255,${0.35 + intensity * 0.25})`;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${0.12 + intensity * 0.15})`;
        }

        ctx.fillText(ch, c * cellW, r * cellH);
      }
    }
  }, [rW, rH]);

  const tick = useCallback(() => {
    if (activeRef.current && visibleRef.current) {
      draw();
      const delay = Math.max(30, 80 - intensityRef.current * 50);
      timeoutRef.current = setTimeout(() => {
        rafRef.current = requestAnimationFrame(tick);
      }, delay);
    } else {
      timeoutRef.current = setTimeout(() => {
        rafRef.current = requestAnimationFrame(tick);
      }, 250);
    }
  }, [draw]);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { rootMargin: "200px" },
    );
    io.observe(el);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [tick]);

  return <canvas ref={canvasRef} width={rW} height={rH} className="hm__compile-canvas" />;
}
