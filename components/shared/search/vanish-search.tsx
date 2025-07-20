"use client";

import { SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ComponentProps = {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type Particle = {
  x: number;
  y: number;
  r: number;
  color: string;
};

export function VanishSearch({ onChange, onSubmit, value, setValue }: ComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<Particle[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const inputWidth = inputRef.current.offsetWidth;
    const inputHeight = inputRef.current.offsetHeight;

    canvas.width = inputWidth * 2;
    canvas.height = inputHeight * 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const computedStyles = getComputedStyle(inputRef.current);
    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));

    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;

    const x = 16;
    const y = canvas.height / 2;

    ctx.fillStyle = "#FFF";
    ctx.fillText(value, x, y);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;
    const newData: Particle[] = [];

    for (let t = 0; t < canvas.height; t++) {
      const i = 4 * t * canvas.width;
      for (let n = 0; n < canvas.width; n++) {
        const e = i + 4 * n;
        if (pixelData[e] !== 0 && pixelData[e + 1] !== 0 && pixelData[e + 2] !== 0) {
          newData.push({
            x: n,
            y: t,
            // @ts-expect-error - TypeScript doesn't recognize the r property
            color: [pixelData[e], pixelData[e + 1], pixelData[e + 2], pixelData[e + 3]],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start: number) => {
    const animateFrame = (pos: number = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x, y, r, color } = t;
            if (x > pos) {
              ctx.beginPath();
              ctx.rect(x, y, r, r);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !animating) {
      vanish();
    }
  };

  const vanish = () => {
    setAnimating(true);
    draw();

    const value = inputRef.current?.value || "";
    if (value) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanish();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative mx-auto h-10 w-full max-w-xl overflow-hidden",
        value && "animate-fade-in border-b"
      )}
    >
      {value?.length > 0 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            vanish();
          }}
          className="absolute top-[30%] right-2 z-[100] border-b border-b-slate-900 pb-[0.5px] text-xs"
        >
          Clear
        </button>
      )}
      <canvas
        ref={canvasRef}
        className={cn(
          "pointer-events-none absolute top-[20%] left-2 origin-top-left scale-50 pr-20 invert filter sm:left-8 dark:invert-0",
          !animating ? "opacity-0" : "opacity-100"
        )}
      />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value);
            if (onChange) {
              onChange(e);
            }
          }
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        type="text"
        className={cn(
          "relative z-50 h-full w-full border-none bg-transparent pr-20 text-sm text-black focus:ring-0 focus:outline-none sm:pl-6 sm:text-base",
          animating && "text-transparent dark:text-transparent"
        )}
      />
    </form>
  );
}
