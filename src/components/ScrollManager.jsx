import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Decides where the page should sit vertically.
 *
 * - Fresh open / refresh: top of the page, unless the URL carries a #hash.
 * - Route change: back to the top, instantly.
 *
 * Deliberately driven by a *previous pathname* comparison rather than a
 * "first render" flag: React StrictMode invokes effects twice on mount, which
 * would flip a boolean guard and make the second pass scroll a second time.
 */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(null);

  useEffect(() => {
    const isFirstRun = previousPath.current === null;
    const routeChanged = !isFirstRun && previousPath.current !== pathname;

    if (isFirstRun) {
      previousPath.current = pathname;
      const navigation = performance.getEntriesByType?.("navigation")[0];
      const isReload = navigation?.type === "reload";

      // Honour an explicit deep link such as /#team. The target may not be
      // mounted yet on a cold load, so retry across a few frames. A refresh
      // always starts at the top, even when the current URL contains a hash.
      if (hash && !isReload) {
        const id = hash.slice(1);
        let attempts = 0;

        const tryScroll = () => {
          const target = document.getElementById(id);
          if (target) {
            target.scrollIntoView({ block: "start" });
            return;
          }
          if (attempts++ < 20) {
            requestAnimationFrame(tryScroll);
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          }
        };

        tryScroll();
        return;
      }

      // Nothing to restore to: always start at the very top.
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    // Same path (StrictMode replay, re-render, hash-only anchor click): leave
    // the visitor exactly where they are.
    if (!routeChanged) return;

    previousPath.current = pathname;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;
