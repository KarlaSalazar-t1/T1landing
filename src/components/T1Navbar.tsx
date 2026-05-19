"use client";

import { useState, useEffect, useCallback } from "react";
import {
  NAV_LINKS,
  MEGA_MENU_COLUMNS,
  MEGA_MENU_SIDEBAR,
  MEGA_MENU_BOTTOM,
  SIGNUP_URL,
  LOGIN_URL,
} from "@/lib/constants";

/* ── Inline SVGs ── */
function T1Logo() {
  return (
    <svg width="45" height="44" viewBox="0 0 45 44" fill="none">
      <g clipPath="url(#t1clip)">
        <path
          d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985C31.7332 19.1985 31.7332 19.1985 31.7332 19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457C39.6169 19.2457 39.6169 19.1985 39.6169 19.1513C39.6169 19.1041 39.6169 19.1041 39.6169 19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z"
          fill="#D93A26"
        />
        <path
          d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506C21.867 13.2034 21.867 13.0617 21.867 13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592C22.2919 12.2592 22.3391 12.2592 22.4335 12.2592H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781C32.6303 6.02781 32.6303 5.9806 32.6303 5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z"
          fill="#D93A26"
        />
      </g>
      <defs>
        <clipPath id="t1clip">
          <rect width="44.1244" height="43.0982" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" width="12" height="12" fill="none">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
      <path d="M1 1L5.5 6L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ItemArrow() {
  return (
    <svg
      className="opacity-0 -translate-x-1 transition-all duration-150 group-hover/item:opacity-100 group-hover/item:translate-x-0"
      width="14" height="14" viewBox="0 0 14 14" fill="none"
    >
      <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Menu Column ── */
function MenuColumn({ col }: { col: (typeof MEGA_MENU_COLUMNS)[number] }) {
  return (
    <div className="group/col flex-1 px-5 first:pl-0">
      {/* Column header — border changes color on hover of any item in the column */}
      <a
        href={col.href}
        className="flex items-center gap-1.5 border-b border-black/[0.08] font-inter text-[14px] font-medium text-black/90 no-underline transition-all duration-150 group-hover/col:border-[#E26153]/50 hover:text-black"
        style={{ paddingTop: 24, paddingBottom: 16, marginBottom: 20 }}
      >
        {col.title}
        <span className="text-black/30 transition-all duration-150 group-hover/col:translate-x-0.5 group-hover/col:text-black/70">
          <ArrowRight />
        </span>
      </a>

      {/* Items — generous vertical spacing */}
      <div className="flex flex-col" style={{ gap: 6, paddingBottom: 32 }}>
        {col.items.map((item) => (
          <a
            key={item.title}
            href={item.href || "#"}
            className="group/item flex cursor-pointer items-start no-underline"
            style={{ paddingTop: 6, paddingBottom: 6 }}
          >
            <span className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1 font-inter text-[12px] font-normal text-black/70 transition-colors duration-150 group-hover/item:text-[#E26153]">
                {item.title}
                <ItemArrow />
              </span>
              <span className="font-inter text-[12px] font-normal text-black/40 transition-colors duration-150 group-hover/item:text-black/60">
                {item.desc}
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Hamburger icon ── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex h-[20px] w-[20px] flex-col items-center justify-center gap-[5px]">
      <span
        className={`block h-[2px] w-[18px] rounded-full bg-current transition-all duration-200 ${open ? "translate-y-[7px] rotate-45" : ""}`}
      />
      <span
        className={`block h-[2px] w-[18px] rounded-full bg-current transition-all duration-200 ${open ? "opacity-0" : ""}`}
      />
      <span
        className={`block h-[2px] w-[18px] rounded-full bg-current transition-all duration-200 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
      />
    </div>
  );
}

/* ── Main Component ── */
export default function T1Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileScreen, setMobileScreen] = useState<"main" | "productos">("main");
  const [isLight, setIsLight] = useState(false);
  const [hidden, setHidden] = useState(false);

  const close = useCallback(() => { setMenuOpen(false); setMobileOpen(false); setMobileScreen("main"); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Detect when white card section enters viewport + auto-hide on scroll down */
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const whiteCard = document.querySelector("[data-white-card]");
        if (whiteCard) {
          const rect = whiteCard.getBoundingClientRect();
          setIsLight(rect.top <= 60);
        }
        // Stay visible through the entire hero area; only allow hide once
        // the user has scrolled past it. Show again on scroll up.
        const delta = y - lastY;
        const heroThreshold = window.innerHeight * 0.9;
        if (Math.abs(delta) > 4) {
          if (y > heroThreshold && delta > 0) setHidden(true);
          else if (delta < 0) setHidden(false);
          lastY = y;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Determine visual mode — menu open now uses light style */
  const darkMode = !isLight && !menuOpen && !mobileOpen;
  const textClass = darkMode
    ? "text-white/80 hover:text-white"
    : "text-black/70 hover:text-black";
  const textActive = darkMode ? "text-white" : "text-black";

  return (
    <>
      {/* Navbar */}
      <nav
        className="fixed left-0 right-0 top-0 z-[100] transition-transform duration-300 ease-out"
        style={{
          background: menuOpen || mobileOpen
            ? "rgba(255,255,255,0.98)"
            : isLight
              ? "rgba(255,255,255,0.92)"
              : "linear-gradient(180deg, rgba(0,0,0,0.4) 44%, rgba(102,102,102,0) 100%)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          padding: "10px 12px",
          boxShadow: (isLight || menuOpen || mobileOpen) ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
          // Hide on scroll down, show on scroll up. Never hide while a menu is open.
          transform:
            hidden && !menuOpen && !mobileOpen
              ? "translateY(-100%)"
              : "translateY(0)",
        }}
      >
        <div className="mx-auto flex max-w-[var(--max-w)] items-center justify-between">
          {/* Left: Logo + nav links */}
          <div className="flex items-center gap-4 tablet:gap-10">
            <a href="/" className="flex shrink-0 items-center">
              <T1Logo />
            </a>

            {/* Desktop nav links - hidden on mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`hidden cursor-pointer items-center gap-1 border-none bg-transparent font-inter text-[16px] font-medium transition-colors duration-150 tablet:flex ${menuOpen ? textActive : textClass}`}
            >
              Productos
              <ChevronDown
                className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
              />
            </button>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`hidden whitespace-nowrap font-inter text-[16px] font-medium no-underline transition-colors duration-150 tablet:block ${textClass}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Login + CTA (desktop) + Hamburger (mobile) */}
          <div className="flex shrink-0 items-center gap-4 tablet:gap-6">
            <a
              href={LOGIN_URL}
              className={`hidden whitespace-nowrap font-inter text-[16px] font-medium no-underline transition-colors duration-150 tablet:block ${textClass}`}
            >
              Iniciar sesion
            </a>
            <a
              href={SIGNUP_URL}
              className="hidden h-[45px] items-center justify-center rounded-[18px] bg-[#DB3B2B] font-inter text-[16px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A] hover:shadow-[0_4px_12px_rgba(219,54,43,0.3)] tablet:inline-flex"
              style={{ width: 156 }}
            >
              Comienza gratis
            </a>

            {/* Hamburger button - mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150 tablet:hidden ${mobileOpen ? "text-black" : darkMode ? "text-white" : "text-black"}`}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 top-[60px] z-[90] overflow-hidden bg-white transition-all duration-300 tablet:hidden ${
          mobileOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Two-pane sliding wrapper: main + productos */}
        <div
          className="flex h-full"
          style={{
            width: "200%",
            transform: mobileScreen === "productos" ? "translateX(-50%)" : "translateX(0)",
            transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* ── Pane 1: Main menu ── */}
          <div className="h-full w-1/2 overflow-y-auto">
            <div className="flex flex-col px-6 py-6">
              <button
                onClick={() => setMobileScreen("productos")}
                className="flex cursor-pointer items-center justify-between border-b border-black/[0.06] bg-transparent py-4 font-inter text-[16px] font-medium text-black"
              >
                <span>Productos</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="border-b border-black/[0.06] py-4 font-inter text-[16px] font-medium text-black no-underline"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={LOGIN_URL}
                className="border-b border-black/[0.06] py-4 font-inter text-[16px] font-medium text-black/70 no-underline"
              >
                Iniciar sesión
              </a>
              <a
                href={SIGNUP_URL}
                className="mt-6 flex h-[50px] items-center justify-center rounded-[18px] bg-[#DB3B2B] font-inter text-[16px] font-semibold text-white no-underline"
              >
                Comienza gratis
              </a>
            </div>
          </div>

          {/* ── Pane 2: Productos sub-menu ── */}
          <div className="h-full w-1/2 overflow-y-auto">
            <div className="flex flex-col">
              {/* Back header */}
              <button
                onClick={() => setMobileScreen("main")}
                className="flex cursor-pointer items-center gap-2 border-b border-black/[0.06] bg-transparent px-6 py-4 font-inter text-[14px] font-medium text-black/60"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Productos</span>
              </button>

              {/* Product columns stacked vertically */}
              <div className="flex flex-col">
                {MEGA_MENU_COLUMNS.map((col) => (
                  <div key={col.title} className="border-b border-black/[0.06] px-6 py-5">
                    <a href={col.href} className="font-inter text-[15px] font-semibold text-black no-underline">
                      {col.title}
                    </a>
                    <div className="mt-3 flex flex-col gap-3">
                      {col.items.map((item) => (
                        <a
                          key={item.title}
                          href={item.href || "#"}
                          className="block no-underline"
                        >
                          <span className="block font-inter text-[13px] font-medium text-black/75">{item.title}</span>
                          <span className="mt-0.5 block font-inter text-[12px] font-light text-black/45">{item.desc}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay - desktop mega menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[50] hidden tablet:block" onClick={close} />
      )}

      {/* Mega Menu - desktop only */}
      <div
        className={`fixed left-0 right-0 top-[60px] z-[60] hidden overflow-hidden border-t border-black/[0.06] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] tablet:block ${
          menuOpen ? "tablet:block animate-slide-down" : "!hidden"
        }`}
      >
        {/* Columns */}
        <div className="mx-auto flex max-w-[var(--max-w)] gap-0 px-6">
          {MEGA_MENU_COLUMNS.map((col) => (
            <MenuColumn key={col.title} col={col} />
          ))}

          {/* Sidebar */}
          <div className="relative w-[270px] shrink-0 bg-[#F6F6F6] px-6 pb-8 pt-6">
            <div className="absolute bottom-0 left-full top-0 w-screen bg-[#F6F6F6]" />
            <p className="mb-3 font-inter text-[11px] font-semibold uppercase tracking-[0.06em] text-black/40">
              Casos de exito
            </p>
            <div className="mb-5 cursor-pointer overflow-hidden rounded-[10px]">
              <img
                src={MEGA_MENU_SIDEBAR.caseStudy.image}
                alt="Caso de exito"
                className="block h-[100px] w-full rounded-[10px] object-cover"
              />
              <p className="pt-2 font-inter text-[12px] font-medium text-black/50">
                {MEGA_MENU_SIDEBAR.caseStudy.text}
              </p>
            </div>
            <p className="mb-3 font-inter text-[11px] font-semibold uppercase tracking-[0.06em] text-black/40">
              Novedades recientes
            </p>
            <ul className="list-none">
              {MEGA_MENU_SIDEBAR.news.map((n) => (
                <li
                  key={n}
                  className="flex cursor-pointer items-center gap-2 py-1 font-inter text-[13px] font-medium text-black/60 transition-colors duration-150 hover:text-black"
                >
                  <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-black/30" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/[0.06]">
          <div className="mx-auto flex max-w-[var(--max-w)] gap-0 px-6">
            <div className="flex flex-1 items-center px-5 first:pl-0" style={{ paddingTop: 20, paddingBottom: 20 }}>
              <span className="font-inter text-[12px] font-medium text-black/40">
                ¿Como quieres empezar?
              </span>
            </div>
            {MEGA_MENU_BOTTOM.map((opt) => (
              <a
                key={opt.title}
                href={opt.href}
                className="group/bottom flex flex-1 items-center justify-between px-5 no-underline transition-colors duration-150 hover:bg-black/[0.02]"
                style={{ paddingTop: 20, paddingBottom: 20 }}
              >
                <div>
                  <p className="font-inter text-[14px] font-semibold text-black/80 transition-colors duration-150 group-hover/bottom:text-[#E26153]">
                    {opt.title}
                  </p>
                  <p className="font-inter text-[12px] text-black/40">
                    {opt.desc}
                  </p>
                </div>
                <span className="text-[20px] text-black/20 transition-all duration-150 group-hover/bottom:translate-x-[3px] group-hover/bottom:text-[#E26153]">
                  ›
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
