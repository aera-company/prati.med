"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

type Build = (ctx: { desktop: boolean; root: HTMLElement }) => void | (() => void);

// Monta a animação de uma cena só quando há movimento permitido.
// Em reduced motion nada roda e a cena fica no layout estático.
// Desktop e mobile têm montagens próprias (gsap.matchMedia reverte ao trocar).
export function useScene(scope: RefObject<HTMLElement | null>, build: Build) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)",
        },
        (c) => {
          const { desktop, mobile } = c.conditions as { desktop: boolean; mobile: boolean };
          if (!desktop && !mobile) return;
          return build({ desktop, root }) ?? undefined;
        },
      );
      return () => mm.revert();
    },
    { scope },
  );
}
