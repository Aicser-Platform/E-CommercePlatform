"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Hook that scrolls to top when route changes
 */
export function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
}

/**
 * Utility function to manually scroll to top
 */
export function scrollToTop(behavior: ScrollBehavior = "smooth") {
  window.scrollTo({ top: 0, behavior });
}
