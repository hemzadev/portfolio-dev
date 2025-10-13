import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue, MotionValue, Transition } from 'motion/react';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
}

const getRotationTransition = (duration: number, from: number, loop: boolean = true) => ({
  from,
  to: from + 360,
  ease: 'linear' as const,
  duration,
  type: 'tween' as const,
  repeat: loop ? Infinity : 0
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300
  }
});

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = ''
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation: MotionValue<number> = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [rotationDirection, setRotationDirection] = useState<1 | -1>(1);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360 * rotationDirection,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, text, onHover, controls, rotationDirection]);

  const handleHoverStart = () => {
    setIsHovered(true);
    // Reverse direction on hover
    setRotationDirection(-1);
    
    const start = rotation.get();

    if (!onHover) return;

    let transitionConfig: ReturnType<typeof getTransition> | Transition;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 }
        };
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360 * rotationDirection,
      scale: scaleVal,
      transition: transitionConfig
    });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    // Return to normal direction when not hovering
    setRotationDirection(1);
    
    const start = rotation.get();
    controls.start({
      rotate: start + 360 * rotationDirection,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  };

  return (
    <motion.div
      className={`m-0 mx-auto rounded-full w-[200px] h-[200px] relative font-black text-center cursor-pointer origin-center bg-gray-900 dark:bg-gray-800 shadow-lg ${className}`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {/* Dark background circle */}
      <div className="absolute inset-0 rounded-full bg-indigo-900 dark:bg-indigo-800" />
      
      {/* Center area with ring separator */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Ring separator */}
        <div className="absolute w-16 h-16 rounded-full border-2 border-gray-600/50" />
        
        {/* Arrow container - independent from circle rotation */}
        <motion.div
          className="w-8 h-8 text-white relative z-10"
          initial={{ rotate: -45 }} // Initial position: between right and top (↗)
          animate={{ rotate: isHovered ? 45 : -45 }} // On hover: move to bottom-right (↘)
          transition={{ 
            duration: 0.5, 
            ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Text letters */}
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span
            key={i}
            className="absolute inline-block inset-0 text-2xl text-white transition-all duration-500 ease-[cubic-bezier(0,0,0,1)] font-semibold"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;