import React, { useCallback, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from 'framer-motion';

/* ═══════════════════════════════════════════════════
   3-D TILT CARD  (useMotionValue / useSpring /
   useTransform / useMotionTemplate / whileHover)
   ═══════════════════════════════════════════════════ */
function TiltCard({ children, className, onClick }) {
  const cardRef = useRef(null);

  /* normalised cursor position (0-100) */
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);

  /* tilt via springs */
  const rawRx = useTransform(spotY, [0, 100], [5, -5]);
  const rawRy = useTransform(spotX, [0, 100], [-5, 5]);
  const rotateX = useSpring(rawRx, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(rawRy, { stiffness: 220, damping: 22 });

  /* spotlight gradient that follows the cursor */
  const spotlight = useMotionTemplate`radial-gradient(
    600px circle at ${spotX}% ${spotY}%,
    rgba(255,255,255,0.04) 0%,
    transparent 65%
  )`;

  const onMove = useCallback(
    (e) => {
      const r = cardRef.current?.getBoundingClientRect();
      if (!r) return;
      spotX.set(((e.clientX - r.left) / r.width) * 100);
      spotY.set(((e.clientY - r.top) / r.height) * 100);
    },
    [spotX, spotY],
  );

  const onLeave = useCallback(() => {
    spotX.set(50);
    spotY.set(50);
  }, [spotX, spotY]);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileHover={{ scale: 1.018 }}
      whileTap={{ scale: 0.985 }}
    >
      <motion.div className="rp__spotlight" style={{ background: spotlight }} />
      {children}
    </motion.div>
  );
}

export default React.memo(TiltCard);
