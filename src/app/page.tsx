"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { HomePage } from "@/components/home/HomePage";

export default function Page() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = document.querySelectorAll("[data-enter]");
    if (reduce) {
      nodes.forEach((n) => {
        (n as HTMLElement).style.opacity = "1";
      });
      return;
    }
    gsap.fromTo(
      nodes,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.1,
      }
    );
  }, []);

  return <HomePage />;
}
