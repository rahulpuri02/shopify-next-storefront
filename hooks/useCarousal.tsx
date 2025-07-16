"use client";

import { useState, useEffect, useCallback } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

export function useCarousel<T>(items: T[]) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api || items.length === 0) return;

    const update = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    update();
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, [api, items]);

  const scrollTo = useCallback(
    (index: number) => {
      console.log("hereee", api);
      api?.scrollTo(index);
    },
    [api]
  );

  return { api, setApi, current, count, scrollTo };
}
