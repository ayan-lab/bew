import { useEffect, useRef, type ReactNode, type HTMLAttributes } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Vertical offset in px before reveal */
  y?: number;
  delay?: number;
  duration?: number;
  /** Animate direct children with stagger instead of the wrapper */
  staggerChildren?: boolean;
  stagger?: number;
};

/** Soft scroll-in reveal powered by GSAP ScrollTrigger. Respects reduced-motion. */
export function Reveal({
  children,
  className,
  y = 36,
  delay = 0,
  duration = 0.75,
  staggerChildren = false,
  stagger = 0.1,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const { gsap } = ensureGsap();
    const targets = staggerChildren
      ? Array.from(el.children) as HTMLElement[]
      : [el];

    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger: staggerChildren ? stagger : 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [y, delay, duration, staggerChildren, stagger]);

  return (
    <div ref={ref} className={cn(className)} {...rest}>
      {children}
    </div>
  );
}
