import React, { useEffect, useRef, useState } from 'react';
import {
  useMotionValue,
  useTransform,
  useInView,
  animate,
} from 'framer-motion';

/* ═══════════════════════════════════════════════════
   ANIMATED COUNTER  (useMotionValue + animate)
   ═══════════════════════════════════════════════════ */
export default function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(mv, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => ctrl.stop();
  }, [inView, value, mv]);

  return <span ref={ref}>{display}</span>;
}
