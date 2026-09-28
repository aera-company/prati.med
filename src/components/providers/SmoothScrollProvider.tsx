"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Lenis dirigido pelo ticker do GSAP, para o ScrollTrigger ler o mesmo scroll.
// Sem Lenis em reduced motion. Mantém data-motion em dia se a preferência
// do sistema mudar com a página aberta.
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (mq.matches) delete document.documentElement.dataset.motion;
      else document.documentElement.dataset.motion = "on";
      ScrollTrigger.refresh();
    };
    mq.addEventListener("change", sync);

    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;
    if (!mq.matches) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Recalcula posições depois que fontes e imagens assentam.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("load", refresh);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
