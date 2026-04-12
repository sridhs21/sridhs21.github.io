import React, { useCallback, useEffect, useRef } from "react";
import { useMotionValueEvent } from "framer-motion";
import { CANVAS_SCALE, ACTIVE_EPSILON } from "./canvasConsts";

/* ═══════════════════════════════════════════════════
   LEAK EFFECT — binary drips below silhouette
   ═══════════════════════════════════════════════════ */
export default function LeakCanvas({ width, height, opacityValue }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const timeoutRef = useRef(null);
  const activeRef = useRef(false);
  const visibleRef = useRef(true);

  const rW = width * CANVAS_SCALE;
  const rH = height * CANVAS_SCALE;

  useMotionValueEvent(opacityValue, "change", (v) => {
    activeRef.current = v > ACTIVE_EPSILON;
  });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 11 * CANVAS_SCALE;
    const cellW = fontSize;
    const cellH = Math.round(fontSize * 1.36);
    const cols = Math.ceil(rW / cellW);
    const maxRows = Math.ceil(rH / cellH);
    /* inset: skip outer 5% of columns on each side */
    const insetCols = Math.floor(cols * 0.05);

    ctx.clearRect(0, 0, rW, rH);
    ctx.font = `${fontSize}px 'DM Mono', monospace`;
    ctx.textBaseline = "top";

    for (let c = insetCols; c < cols - insetCols; c++) {
      const innerCols = cols - insetCols * 2;
      const innerC = c - insetCols;
      const innerCenter = innerCols / 2;
      const distFromCenter = Math.abs(innerC - innerCenter) / innerCenter;
      const baseHeight = (1 - distFromCenter) * 0.85 + 0.1;
      const isEven = c % 2 === 0;
      const altFactor = isEven ? 1.0 : 0.45;
      /* edge fade: columns near the inset edges fade out */
      const edgeFade = Math.min(innerC, innerCols - 1 - innerC) / (innerCols * 0.2);
      const edgeAlpha = Math.min(1, edgeFade);
      const colRows = Math.floor(maxRows * baseHeight * altFactor);

      for (let r = 0; r < colRows; r++) {
        const roll = Math.random();
        let ch;
        if (roll < 0.65) {
          ch = Math.random() > 0.5 ? "1" : "0";
        } else if (roll < 0.85) {
          ch = "0123456789abcdef"[Math.floor(Math.random() * 16)];
        } else {
          ch = "{}[]();=><+-*/%&|!".charAt(Math.floor(Math.random() * 18));
        }

        const vertFade = 1 - (r / colRows);
        const alpha = vertFade * vertFade * vertFade * edgeAlpha * 0.7;

        if (alpha < 0.02) continue;

        const bright = Math.random();
        if (Math.random() < 0.18) {
          ctx.fillStyle = `rgba(192,48,48,${alpha * 0.9})`;
        } else if (bright > 0.85) {
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.95})`;
        } else if (bright > 0.5) {
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.6})`;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.3})`;
        }

        ctx.fillText(ch, c * cellW, r * cellH);
      }
    }
  }, [rW, rH]);

  const tick = useCallback(() => {
    if (activeRef.current && visibleRef.current) {
      draw();
      timeoutRef.current = setTimeout(() => {
        rafRef.current = requestAnimationFrame(tick);
      }, 60);
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
