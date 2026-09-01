"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
};

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return `translateY(${distance}px)`;
    case "down":
      return `translateY(-${distance}px)`;
    case "left":
      return `translateX(-${distance}px)`;
    case "right":
      return `translateX(${distance}px)`;
    default:
      return "none";
  }
};

// Shared singleton IntersectionObserver for high performance & zero main-thread lag
let sharedObserver: IntersectionObserver | null = null;
const observerCallbacks = new Map<Element, () => void>();

const getSharedObserver = () => {
  if (!sharedObserver && typeof window !== "undefined") {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = observerCallbacks.get(entry.target);
            if (callback) {
              callback();
              observerCallbacks.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: "50px", threshold: 0.05 }
    );
  }
  return sharedObserver;
};

const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 500,
  distance = 18,
  className = "",
}: RevealProps) => {
  const [visible, setVisible] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = getSharedObserver();
    if (!observer) {
      setVisible(true);
      return;
    }

    observerCallbacks.set(node, () => setVisible(true));
    observer.observe(node);

    return () => {
      observerCallbacks.delete(node);
      observer.unobserve(node);
    };
  }, []);

  return (
    <div
      ref={nodeRef}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : offsetFor(direction, distance),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: visible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
