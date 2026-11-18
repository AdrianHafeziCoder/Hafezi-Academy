import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Gentle animation: every element with data-reveal rises in on load and scroll
export function useReveal(scopeRef, routeKey) {
  useLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return; // If the user doesn't want animations, skip it

    const ctx = gsap.context(() => {
      gsap.set("[data-reveal]", { opacity: 0, y: 24 }); // Initial state
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 92%",
        once: true,
        onEnter: (items) =>
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          }),
      });
    }, scopeRef);

    return () => ctx.revert(); // Clean up animations when the page changes
  }, [routeKey]);
}
