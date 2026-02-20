"use client";

import Link from "next/link";
import Image from "next/image";
import { FC, useState, useEffect, useCallback, useRef } from "react";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl: string;
  videoUrl?: string;
}

interface Props {
  slides: Slide[];
  interval?: number;
}

const HeroSlider: FC<Props> = ({ slides, interval = 6000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, interval);
  }, [slides.length, interval]);

  useEffect(() => {
    if (slides.length > 1) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length, startTimer]);

  function goTo(index: number) {
    setActiveIndex(index);
    startTimer(); // Reset timer on manual navigation
  }

  if (slides.length === 0) return null;

  const slide = slides[activeIndex];

  return (
    <section className="gtc-hero" aria-label="Hero">
      {/* Background */}
      <div className="gtc-hero__bg" key={slide.id}>
        {slide.videoUrl ? (
          <video
            src={slide.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="gtc-hero__video"
          />
        ) : (
          <Image
            src={slide.imageUrl}
            alt=""
            fill
            priority={activeIndex === 0}
            sizes="100vw"
            className="gtc-hero__image"
          />
        )}
        <div className="gtc-hero__overlay" />
      </div>

      {/* Content */}
      <div className="gtc-container gtc-hero__content">
        <h1 className="gtc-hero__title">{slide.title}</h1>
        <p className="gtc-hero__subtitle">{slide.subtitle}</p>
        {slide.ctaText && slide.ctaUrl && (
          <Link href={slide.ctaUrl} className="gtc-btn gtc-btn--primary gtc-btn--lg">
            {slide.ctaText}
          </Link>
        )}
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="gtc-hero__dots" role="tablist" aria-label="Slide navigation">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`gtc-hero__dot ${i === activeIndex ? "gtc-hero__dot--active" : ""}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSlider;
