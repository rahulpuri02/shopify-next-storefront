import { useEffect, useState } from "react";

export function useScroll(threshold = 200) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrollingStart, setIsScrollingStart] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const isScrollingDown = currentY > lastScrollY;

          setIsScrollingStart(currentY > 0);
          setIsVisible(!(isScrollingDown && currentY > threshold));
          lastScrollY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { isVisible, isScrollingStart };
}
