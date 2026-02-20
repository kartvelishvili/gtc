"use client";

import { FC, useEffect, useState, useRef } from "react";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

interface Props {
  stats: Stat[];
}

/**
 * Animated stat counter — numbers count up when scrolled into view.
 */
const StatCounter: FC<Props> = ({ stats }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  /* Intersection observer to trigger animation when in viewport */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Animate counts */
  useEffect(() => {
    if (!visible) return;

    const duration = 2000; // ms
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(stats.map((s) => Math.round(s.value * eased)));

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [visible, stats]);

  return (
    <div className="gtc-stats" ref={containerRef}>
      {stats.map((stat, i) => (
        <div key={i} className="gtc-stat-counter">
          <span className="gtc-stat-counter__value">
            {counts[i]}
            {stat.suffix || ""}
          </span>
          <span className="gtc-stat-counter__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatCounter;
