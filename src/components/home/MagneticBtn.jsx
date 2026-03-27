import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function MagneticBtn({ children, style, className, onClick, to }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 18 });
  const sy = useSpring(my, { stiffness: 180, damping: 18 });

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }, [mx, my]);

  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  const Tag = to ? Link : 'button';
  const extra = to ? { to } : { onClick };

  return (
    <Tag {...extra} ref={ref} style={{ display: 'inline-block', textDecoration: 'none', border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div style={{ x: sx, y: sy, ...style }} className={className}>
        {children}
      </motion.div>
    </Tag>
  );
}