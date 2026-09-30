"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fades in every element marked data-reveal as it scrolls into view (the styles are in
 * globals.css). One observer for the whole page, so the sections themselves stay server
 * components. Elements added later, like a filtered list, are picked up as they arrive.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const pending = () => Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])"));

    if (!("IntersectionObserver" in window)) {
      pending().forEach(element => element.setAttribute("data-shown", ""));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    const watch = () => pending().forEach(element => observer.observe(element));
    watch();

    const mutations = new MutationObserver(watch);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
