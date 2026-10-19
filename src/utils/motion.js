export const textVariant = (delay) => {
  return {
    hidden: {
      y: -16,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.65,
        bounce: 0.12,
        delay: delay,
      },
    },
  };
};

export const fadeIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? 24 : direction === "right" ? -24 : 0,
      y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type || "tween",
        delay: delay,
        duration: Math.min(duration || 0.55, 0.7),
        ease: "easeOut",
      },
    },
  };
};

export const zoomIn = (delay, duration) => {
  return {
    hidden: {
      scale: 0.94,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay: delay,
        duration: Math.min(duration || 0.55, 0.7),
        ease: "easeOut",
      },
    },
  };
};

export const slideIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? -28 : direction === "right" ? 28 : 0,
      y: direction === "up" ? 28 : direction === "down" ? -28 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type || "tween",
        delay: delay,
        duration: Math.min(duration || 0.55, 0.75),
        ease: "easeOut",
      },
    },
  };
};

export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0.08) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};
