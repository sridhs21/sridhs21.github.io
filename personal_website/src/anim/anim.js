import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import anime from "animejs";

const EASE = [0.16, 1, 0.3, 1];

/* ═══════════════════════════════════════════════════
   Reveal — fade + slide + blur when it enters the viewport
   ═══════════════════════════════════════════════════ */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  blur = 6,
  duration = 0.75,
  once = true,
  as: Tag = "div",
  className,
  style,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-40px" });
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* ═══════════════════════════════════════════════════
   Stagger — stagger children on enter
   ═══════════════════════════════════════════════════ */
export function Stagger({
  children,
  delay = 0,
  stagger = 0.06,
  y = 16,
  once = true,
  className,
  style,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y, filter: "blur(6px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: EASE },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   LetterTitle — per-letter rotateX cascade matching
   the Repos page so page titles animate identically.
   ═══════════════════════════════════════════════════ */
export function LetterTitle({
  text,
  className,
  charClassName,
  as: Tag = "h1",
  delay = 0,
  stagger = 0.04,
  duration = 0.6,
}) {
  const MotionTag = motion[Tag] || motion.h1;
  const chars = String(text).split("");
  return (
    <MotionTag className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          className={charClassName}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration,
            delay: delay + stagger * i,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {ch === " " ? "\u00a0" : ch}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/* ═══════════════════════════════════════════════════
   SplitText — anime.js character-by-character reveal
   ═══════════════════════════════════════════════════ */
export function SplitText({
  text,
  className,
  delay = 0,
  charDelay = 22,
  duration = 900,
  as: Tag = "span",
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const spans = ref.current.querySelectorAll(".anim-char");
    if (!spans.length) return;
    anime.set(spans, { opacity: 0, translateY: "0.6em", filter: "blur(6px)" });
    const t = setTimeout(() => {
      anime({
        targets: spans,
        opacity: [0, 1],
        translateY: ["0.6em", 0],
        filter: ["blur(6px)", "blur(0px)"],
        easing: "easeOutExpo",
        duration,
        delay: anime.stagger(charDelay),
      });
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay, charDelay, duration]);

  const chars = Array.from(String(text));
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {chars.map((c, i) => (
        <span
          key={i}
          className="anim-char"
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {c === " " ? "\u00a0" : c}
        </span>
      ))}
    </Tag>
  );
}

/* ═══════════════════════════════════════════════════
   Scramble — anime.js-timed text scramble effect
   ═══════════════════════════════════════════════════ */
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function Scramble({ text, className, duration = 1400, delay = 0, as: Tag = "span" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const finalText = String(text);
    let raf;
    const start = performance.now() + delay;

    const tick = (now) => {
      const elapsed = Math.max(0, now - start);
      const progress = Math.min(1, elapsed / duration);
      let out = "";
      for (let i = 0; i < finalText.length; i++) {
        const revealAt = (i / finalText.length) * 0.7;
        if (progress >= revealAt + 0.3) {
          out += finalText[i];
        } else if (progress >= revealAt) {
          out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        } else {
          out += " ";
        }
      }
      el.textContent = out;
      if (progress < 1) raf = requestAnimationFrame(tick);
      else el.textContent = finalText;
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration, delay]);

  return <Tag ref={ref} className={className}>{text}</Tag>;
}

/* ═══════════════════════════════════════════════════
   Magnetic — cursor-following offset on hover
   ═══════════════════════════════════════════════════ */
export function Magnetic({ children, strength = 0.35, className, style, ...rest }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = useCallback(
    (e) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
    },
    [strength],
  );

  const onLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ display: "inline-block", ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.3 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   PageTransition — wraps routed pages
   NOTE: `transform` defaults to false because a transformed
   ancestor breaks `position: fixed` children (Home needs this).
   ═══════════════════════════════════════════════════ */
export function PageTransition({ children, className, transform = false }) {
  const initial = transform
    ? { opacity: 0, y: 18, filter: "blur(8px)" }
    : { opacity: 0 };
  const animate = transform
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : { opacity: 1 };
  const exit = transform
    ? { opacity: 0, y: -14, filter: "blur(8px)" }
    : { opacity: 0 };
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   useCountUp — animated integer (anime.js)
   ═══════════════════════════════════════════════════ */
export function CountUp({ to = 0, duration = 1400, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const obj = { v: 0 };
    const a = anime({
      targets: obj,
      v: to,
      round: 1,
      duration,
      easing: "easeOutExpo",
      update: () => {
        if (ref.current) ref.current.textContent = obj.v;
      },
    });
    return () => a.pause();
  }, [inView, to, duration]);

  return <span ref={ref} className={className}>0</span>;
}

export { AnimatePresence };
