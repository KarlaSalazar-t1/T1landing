"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SIGNUP_URL } from "@/lib/constants";

interface T1FinalCTAProps {
  title: ReactNode;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
}

/**
 * Final CTA — black panel that "rises" over the previous content via
 * borderRadius + negative marginTop, with a scroll-reveal entrance animation
 * (fade + lift + un-blur + scale-up) triggered by IntersectionObserver.
 *
 * Same visual language as T1ScrollShowcase's CTA on the home, but with a
 * normal section height so there's no empty space before the footer.
 */
export default function T1FinalCTA({
  title,
  description,
  buttonLabel = "Comenzar gratis",
  buttonHref = SIGNUP_URL,
}: T1FinalCTAProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-black px-5 py-16 tablet:px-10 tablet:py-24"
      style={{ borderRadius: "40px 40px 0 0", marginTop: -60 }}
    >
      {/* Ambient red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(219,59,43,0.12) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div
        ref={innerRef}
        className="relative mx-auto flex max-w-[860px] flex-col items-center text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(80px) scale(0.88)",
          filter: visible ? "blur(0px)" : "blur(8px)",
          transition:
            "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s ease-out",
        }}
      >
        <h2
          className="font-sora text-[32px] font-light text-white tablet:text-[48px] lg:text-[60px]"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 800, marginBottom: 24 }}
        >
          {title}
        </h2>
        <p
          className="font-inter text-[15px] font-light text-white/40 tablet:text-[18px]"
          style={{ maxWidth: 500, lineHeight: 1.5, marginBottom: 40 }}
        >
          {description}
        </p>
        <a
          href={buttonHref}
          className="inline-flex h-[48px] items-center rounded-full bg-[#DB3B2B] px-7 font-inter text-[14px] font-semibold text-white no-underline transition-all duration-200 hover:scale-[1.03] hover:bg-[#C0332A]"
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}
