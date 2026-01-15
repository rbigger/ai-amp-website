'use client';

import { motion } from 'framer-motion';

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up', // 'up', 'down', 'left', 'right', 'none'
  className = '',
  ...props
}) {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
    none: {},
  };

  const initial = {
    opacity: 0,
    ...directions[direction],
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
