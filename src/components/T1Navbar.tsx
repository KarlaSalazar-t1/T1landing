"use client";

import { useState, useEffect, useCallback } from "react";
import {
  NAV_LINKS,
  MEGA_MENU_COLUMNS,
  MEGA_MENU_SIDEBAR,
  MEGA_MENU_BOTTOM,
  RECURSOS_MENU_COLUMNS,
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
        className="flex items-center gap-1.5 border-b border-white/[0.10] font-inter text-[14px] font-medium text-white/90 no-underline transition-all duration-150 group-hover/col:border-[#FF6F5E]/60 hover:text-white"
        style={{ paddingTop: 24, paddingBottom: 16, marginBottom: 20 }}
      >
        {col.title}
        <span className="text-white/30 transition-all duration-150 group-hover/col:translate-x-0.5 group-hover/col:text-white/70">
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
              <span className="flex items-center gap-1 font-inter text-[12px] font-normal text-white/75 transition-colors duration-150 group-hover/item:text-[#FF6F5E]">
                {item.title}
                <ItemArrow />
              </span>
              <span className="font-inter text-[12px] font-normal text-white/40 transition-colors duration-150 group-hover/item:text-white/65">
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
export default function T1Navbar({ bVariant = false }: { bVariant?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [recursosOpen, setRecursosOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileScreen, setMobileScreen] = useState<"main" | "productos" | "recursos">("main");
  const [scrolled, setScrolled] = useState(false);

  const close = useCallback(() => { setMenuOpen(false); setRecursosOpen(false); setMobileOpen(false); setMobileScreen("main"); }, []);

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

  /* Arriba: transparente. Al hacer scroll: pill flotante. Sin modo claro. */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Texto siempre blanco (el CEO no quería el cambio de color a claro).
  const textClass = "text-white/80 hover:text-white";
  const textActive = "text-white";
  const pill = scrolled || menuOpen || recursosOpen || mobileOpen;

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${pill ? "px-3 pt-3 tablet:px-5 tablet:pt-4" : "px-0 pt-0"}`}>
        <div
          className={`mx-auto flex max-w-[var(--max-w)] items-center justify-between transition-all duration-300 ${pill ? "rounded-[20px] px-4 py-2 tablet:px-6" : "px-5 py-3 tablet:px-6"}`}
          style={{
            // Arriba transparente; al scrollear pill flotante oscuro.
            background: (menuOpen || recursosOpen || mobileOpen)
              ? "#000000"
              : scrolled
                ? "rgba(0,0,0,0.42)"
                : "transparent",
            backdropFilter: pill ? "blur(16px)" : "none",
            WebkitBackdropFilter: pill ? "blur(16px)" : "none",
            boxShadow: pill ? "0 12px 34px rgba(0,0,0,0.5)" : "none",
          }}
        >
          {/* Left: Logo + nav links */}
          <div className="flex items-center gap-4 tablet:gap-10">
            <a href="/" className="flex shrink-0 items-center">
              <T1Logo />
            </a>

            {/* Desktop nav links - hidden on mobile */}
            <button
              onClick={() => { setRecursosOpen(false); setMenuOpen(!menuOpen); }}
              className={`hidden cursor-pointer items-center gap-1 border-none bg-transparent font-inter text-[16px] font-medium transition-colors duration-150 tablet:flex ${menuOpen ? textActive : textClass}`}
            >
              Productos
              <ChevronDown
                className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
              />
            </button>
            <button
              onClick={() => { setMenuOpen(false); setRecursosOpen(!recursosOpen); }}
              className={`hidden cursor-pointer items-center gap-1 border-none bg-transparent font-inter text-[16px] font-medium transition-colors duration-150 tablet:flex ${recursosOpen ? textActive : textClass}`}
            >
              Recursos
              <ChevronDown
                className={`transition-transform duration-200 ${recursosOpen ? "rotate-180" : ""}`}
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
              className="flex cursor-pointer items-center justify-center border-none bg-transparent p-1 text-white transition-colors duration-150 tablet:hidden"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 top-0 z-[90] overflow-hidden bg-[#0e0d0d] pt-[68px] transition-all duration-300 tablet:hidden ${
          mobileOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Two-pane sliding wrapper: main + productos */}
        <div
          className="flex h-full"
          style={{
            width: "300%",
            transform: mobileScreen === "recursos" ? "translateX(-66.6667%)" : mobileScreen === "productos" ? "translateX(-33.3333%)" : "translateX(0)",
            transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* ── Pane 1: Main menu ── */}
          <div className="h-full w-1/3 overflow-y-auto">
            <div className="flex flex-col px-6 py-6">
              <button
                onClick={() => setMobileScreen("productos")}
                className="flex cursor-pointer items-center justify-between border-b border-white/[0.08] bg-transparent py-4 font-inter text-[16px] font-medium text-white"
              >
                <span>Productos</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => setMobileScreen("recursos")}
                className="flex cursor-pointer items-center justify-between border-b border-white/[0.08] bg-transparent py-4 font-inter text-[16px] font-medium text-white"
              >
                <span>Recursos</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="border-b border-white/[0.08] py-4 font-inter text-[16px] font-medium text-white no-underline"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={LOGIN_URL}
                className="border-b border-white/[0.08] py-4 font-inter text-[16px] font-medium text-white/70 no-underline"
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
          <div className="h-full w-1/3 overflow-y-auto">
            <div className="flex flex-col">
              {/* Back header */}
              <button
                onClick={() => setMobileScreen("main")}
                className="flex cursor-pointer items-center gap-2 border-b border-white/[0.08] bg-transparent px-6 py-4 font-inter text-[14px] font-medium text-white/60"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Productos</span>
              </button>

              {/* Product columns stacked vertically */}
              <div className="flex flex-col">
                {MEGA_MENU_COLUMNS.map((col) => (
                  <div key={col.title} className="border-b border-white/[0.08] px-6 py-5">
                    <a href={col.href} className="font-inter text-[15px] font-semibold text-white no-underline">
                      {col.title}
                    </a>
                    <div className="mt-3 flex flex-col gap-3">
                      {col.items.map((item) => (
                        <a
                          key={item.title}
                          href={item.href || "#"}
                          className="block no-underline"
                        >
                          <span className="block font-inter text-[13px] font-medium text-white/80">{item.title}</span>
                          <span className="mt-0.5 block font-inter text-[12px] font-light text-white/45">{item.desc}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Pane 3: Recursos sub-menu ── */}
          <div className="h-full w-1/3 overflow-y-auto">
            <div className="flex flex-col">
              <button
                onClick={() => setMobileScreen("main")}
                className="flex cursor-pointer items-center gap-2 border-b border-white/[0.08] bg-transparent px-6 py-4 font-inter text-[14px] font-medium text-white/60"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Recursos</span>
              </button>
              <div className="flex flex-col">
                {RECURSOS_MENU_COLUMNS.map((col) => (
                  <div key={col.title} className="border-b border-white/[0.08] px-6 py-5">
                    <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40">
                      {col.title}
                    </p>
                    <div className="mt-3 flex flex-col gap-3">
                      {col.items.map((item) => (
                        <a key={item.title} href={item.href} className="block no-underline">
                          <span className="block font-inter text-[13px] font-medium text-white/80">{item.title}</span>
                          <span className="mt-0.5 block font-inter text-[12px] font-light text-white/45">{item.desc}</span>
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
      {(menuOpen || recursosOpen) && (
        <div className="fixed inset-0 z-[50] hidden tablet:block" onClick={close} />
      )}

      {/* Mega Menu - desktop only */}
      <div
        className={`fixed left-1/2 top-[86px] z-[60] hidden w-[calc(100%-40px)] max-w-[var(--max-w)] -translate-x-1/2 overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#1A1A1D] shadow-[0_24px_50px_rgba(0,0,0,0.55)] tablet:block ${
          menuOpen ? "tablet:block animate-slide-down" : "!hidden"
        }`}
      >
        {/* Columns */}
        <div className="mx-auto flex max-w-[var(--max-w)] gap-0 px-6">
          {MEGA_MENU_COLUMNS.map((col) => (
            <MenuColumn key={col.title} col={col} />
          ))}

          {/* Sidebar — casos de éxito (solo versión A; en B se oculta) */}
          {!bVariant && (
          <div className="relative w-[270px] shrink-0 bg-[#212125] px-6 pb-8 pt-6">
            <div className="absolute bottom-0 left-full top-0 w-screen bg-[#212125]" />
            <p className="mb-3 font-inter text-[11px] font-semibold uppercase tracking-[0.06em] text-white/40">
              Casos de exito
            </p>
            <div className="mb-5 cursor-pointer overflow-hidden rounded-[10px]">
              <img
                src={MEGA_MENU_SIDEBAR.caseStudy.image}
                alt="Caso de exito"
                className="block h-[100px] w-full rounded-[10px] object-cover"
              />
              <p className="pt-2 font-inter text-[12px] font-medium text-white/55">
                {MEGA_MENU_SIDEBAR.caseStudy.text}
              </p>
            </div>
            <p className="mb-3 font-inter text-[11px] font-semibold uppercase tracking-[0.06em] text-white/40">
              Novedades recientes
            </p>
            <ul className="list-none">
              {MEGA_MENU_SIDEBAR.news.map((n) => (
                <li
                  key={n}
                  className="flex cursor-pointer items-center gap-2 py-1 font-inter text-[13px] font-medium text-white/60 transition-colors duration-150 hover:text-white"
                >
                  <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-white/30" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08]">
          <div className="mx-auto flex max-w-[var(--max-w)] gap-0 px-6">
            <div className="flex flex-1 items-center px-5 first:pl-0" style={{ paddingTop: 20, paddingBottom: 20 }}>
              <span className="font-inter text-[12px] font-medium text-white/40">
                ¿Como quieres empezar?
              </span>
            </div>
            {MEGA_MENU_BOTTOM.map((opt) => (
              <a
                key={opt.title}
                href={opt.href}
                className="group/bottom flex flex-1 items-center justify-between px-5 no-underline transition-colors duration-150 hover:bg-white/[0.04]"
                style={{ paddingTop: 20, paddingBottom: 20 }}
              >
                <div>
                  <p className="font-inter text-[14px] font-semibold text-white/85 transition-colors duration-150 group-hover/bottom:text-[#FF6F5E]">
                    {opt.title}
                  </p>
                  <p className="font-inter text-[12px] text-white/40">
                    {opt.desc}
                  </p>
                </div>
                <span className="text-[20px] text-white/25 transition-all duration-150 group-hover/bottom:translate-x-[3px] group-hover/bottom:text-[#FF6F5E]">
                  ›
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mega Menu Recursos - desktop only */}
      <div
        className={`fixed left-1/2 top-[86px] z-[60] hidden w-[calc(100%-40px)] max-w-[var(--max-w)] -translate-x-1/2 overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#1A1A1D] shadow-[0_24px_50px_rgba(0,0,0,0.55)] tablet:block ${
          recursosOpen ? "tablet:block animate-slide-down" : "!hidden"
        }`}
      >
        <div className="mx-auto grid max-w-[var(--max-w)] grid-cols-4 gap-0 px-6" style={{ paddingBottom: 32 }}>
          {RECURSOS_MENU_COLUMNS.map((col) => (
            <div key={col.title} className="px-5 first:pl-0">
              <p
                className="border-b border-white/[0.10] font-inter text-[14px] font-medium text-white/90"
                style={{ paddingTop: 24, paddingBottom: 16, marginBottom: 20 }}
              >
                {col.title}
              </p>
              <div className="flex flex-col" style={{ gap: 6 }}>
                {col.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="group/item block no-underline"
                    style={{ paddingTop: 6, paddingBottom: 6 }}
                  >
                    <span className="block font-inter text-[12px] font-normal text-white/75 transition-colors duration-150 group-hover/item:text-[#FF6F5E]">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block font-inter text-[12px] font-normal text-white/40 transition-colors duration-150 group-hover/item:text-white/65">
                      {item.desc}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
