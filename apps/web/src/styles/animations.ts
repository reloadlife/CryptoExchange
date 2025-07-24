export const animations = {
  fadeIn: "animate-in fade-in duration-300",
  fadeOut: "animate-out fade-out duration-300",
  slideIn: "animate-in slide-in-from-bottom duration-300",
  slideOut: "animate-out slide-out-to-bottom duration-300",
  scaleIn: "animate-in zoom-in-95 duration-200",
  scaleOut: "animate-out zoom-out-95 duration-200",
  spin: "animate-spin",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
} as const;

export const transitions = {
  fast: "transition-all duration-150 ease-in-out",
  normal: "transition-all duration-300 ease-in-out",
  slow: "transition-all duration-500 ease-in-out",
  colors: "transition-colors duration-200 ease-in-out",
  transform: "transition-transform duration-200 ease-in-out",
} as const;
