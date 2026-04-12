import React, { useRef, useEffect, useCallback } from "react";

/*  Animated starfield canvas — renders tiny white dots that
    drift slowly upward with a gentle twinkle.  Pure canvas,
    no dependencies.  Inspired by the shadcn/ui "stars" bg.  */

function StarsBackground({ className, starCount = 180 }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const rafRef = useRef(null);

  /* seed stars once */
  const initStars = useCallback((w, h) => {
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,           // radius 0.3-1.5
        baseAlpha: Math.random() * 0.6 + 0.15,   // 0.15-0.75
        phase: Math.random() * Math.PI * 2,       // twinkle offset
        speed: Math.random() * 0.15 + 0.03,       // drift speed
      });
    }
    starsRef.current = stars;
  }, [starCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!starsRef.current.length) initStars(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const sec = t / 1000;

      for (const s of starsRef.current) {
        /* drift upward, wrap around */
        s.y -= s.speed;
        if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w; }

        /* twinkle */
        const alpha = s.baseAlpha + Math.sin(sec * 1.2 + s.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, alpha))})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initStars]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export default React.memo(StarsBackground);
