"use client";

import { useScrollToTop } from "@/lib/scroll-to-top";

/**
 * Component that automatically scrolls to top on route changes
 * Place this in your layout to enable automatic scroll to top
 */
export function ScrollToTopHandler() {
  useScrollToTop();
  return null;
}
