import { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";

export const useScrollMemory = () => {
  const router = useRouter();
  const isRestoring = useRef(false);

  const saveScrollPosition = useCallback(() => {
    if (router.pathname === "/" && !isRestoring.current) {
      const scrollPosition = window.pageYOffset;
      sessionStorage.setItem("homeScrollPosition", scrollPosition.toString());
    }
  }, [router.pathname]);

  const restoreScrollPosition = useCallback(() => {
    if (router.pathname === "/") {
      const savedPosition = sessionStorage.getItem("homeScrollPosition");
      if (savedPosition && !isRestoring.current) {
        const targetPosition = parseInt(savedPosition, 10);

        // Only restore if there's a meaningful difference (> 100px)
        if (targetPosition > 100) {
          isRestoring.current = true;

          // Start from the top instantly (no flash)
          window.scrollTo({ top: 0, behavior: "instant" });

          // Use shorter delay and smoother animation
          requestAnimationFrame(() => {
            setTimeout(() => {
              smoothScrollTo(targetPosition, 1200, () => {
                isRestoring.current = false;
              });
            }, 100); // Reduced delay for faster response
          });
        }
      }
    }
  }, [router.pathname]);

  // Enhanced smooth scroll with Apple-like easing
  const smoothScrollTo = (
    targetY: number,
    duration: number,
    onComplete?: () => void
  ) => {
    const startY = window.pageYOffset;
    const difference = targetY - startY;
    const startTime = performance.now();

    // Apple-style easing curve (ease-out with slight bounce prevention)
    const appleEasing = (t: number) => {
      // Cubic bezier approximation of Apple's ease-out curve
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    let animationId: number;

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = appleEasing(progress);

      const currentY = startY + difference * easedProgress;

      // Use smoother scrolling method
      window.scrollTo({
        top: currentY,
        behavior: "instant",
      });

      if (progress < 1) {
        animationId = requestAnimationFrame(animateScroll);
      } else {
        onComplete?.();
      }
    };

    animationId = requestAnimationFrame(animateScroll);

    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        onComplete?.();
      }
    };
  };

  const navigateToHome = useCallback(() => {
    if (router.pathname === "/") {
      // If already on home, just scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Save current scroll position and navigate
      saveScrollPosition();

      // Use replace instead of push for smoother transition
      router.replace("/").then(() => {
        // Ensure restoration happens after navigation
        setTimeout(() => {
          restoreScrollPosition();
        }, 50);
      });
    }
  }, [router, saveScrollPosition, restoreScrollPosition]);

  useEffect(() => {
    // Debounced scroll position saving
    let saveTimeout: NodeJS.Timeout;

    const debouncedSave = () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveScrollPosition();
      }, 150); // Debounce to avoid excessive saves
    };

    const handleBeforeUnload = () => {
      clearTimeout(saveTimeout);
      saveScrollPosition();
    };

    const handleRouteChangeStart = (url: string) => {
      // Only save if navigating away from home
      if (router.pathname === "/" && url !== "/") {
        clearTimeout(saveTimeout);
        saveScrollPosition();
      }
    };

    const handleRouteChangeComplete = () => {
      // Reset restoring flag on route change
      isRestoring.current = false;
    };

    // Add scroll listener for debounced saving
    window.addEventListener("scroll", debouncedSave, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      clearTimeout(saveTimeout);
      window.removeEventListener("scroll", debouncedSave);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [saveScrollPosition, router.events, router.pathname]);

  return { restoreScrollPosition, saveScrollPosition, navigateToHome };
};
