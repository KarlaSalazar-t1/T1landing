"use client";

import { useState, useEffect, useCallback } from "react";
import {
  NAV_LINKS,
  MEGA_MENU_COLUMNS,
  MEGA_MENU_BOTTOM,
  RECURSOS_MENU_COLUMNS,
  SIGNUP_URL,
  LOGIN_URL,
} from "@/lib/constants";
import { track } from "@/lib/analytics";
import T1Marca from "@/components/T1Marca";

/* Lockup de marca del header: logo T1 + descriptor del producto (CAMBIO header).
   El "T1" lo aporta el logo; el descriptor es solo "Envíos"/"Tienda"/"Pagos". */
/* Finanzas vive aquí solo para el lockup de su propia landing: todavía NO va
   en el mega menú ni en el switcher de productos (PRODUCT_SWITCHER). */
const PRODUCT_DESCRIPTORS = { envios: "Envíos", tienda: "Tienda", pagos: "Pagos", finanzas: "Finanzas" } as const;
type ProductKey = keyof typeof PRODUCT_DESCRIPTORS;
type PageType = "home" | "producto" | "sublanding";

/* Switcher de productos que cuelga del nombre del servicio en el lockup
   (CEO: al dar click en el nombre se despliegan los demás productos, tipo
   Adobe pero más sutil). */
const PRODUCT_SWITCHER: { key: ProductKey; name: string; desc: string; href: string }[] = [
  { key: "tienda", name: "T1 Tienda", desc: "Crea y vende en línea", href: "/productos/t1tienda" },
  { key: "envios", name: "T1 Envíos", desc: "Envía al mejor precio", href: "/productos/t1envios" },
  { key: "pagos", name: "T1 Pagos", desc: "Cobra en línea", href: "/productos/t1pagos" },
];


/* ── Inline SVGs ── */
function T1Logo() {
  return <T1Marca size={45} />;
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
export default function T1Navbar({ ctaLabel = "Comienza gratis", ctaHref = SIGNUP_URL, product, pageType = "home" }: { ctaLabel?: string; ctaHref?: string; product?: ProductKey; pageType?: PageType }) {
  const descriptor = product ? PRODUCT_DESCRIPTORS[product] : null;
  const productHref = product ? `/productos/t1${product}` : "/";
  const trackLogo = (target: "general" | "producto") =>
    track("logo_click", { page_type: pageType, product: product ?? null, target, scroll_position: typeof window !== "undefined" ? Math.round(window.scrollY) : 0 });
  const scrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Símbolo T1 → T1 general (marca madre). Si ya estás en home, solo scroll al inicio.
  const onSymbolClick = (e: React.MouseEvent) => { trackLogo("general"); if (pageType === "home") scrollTop(e); };
  const [menuOpen, setMenuOpen] = useState(false);
  const [recursosOpen, setRecursosOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileScreen, setMobileScreen] = useState<"main" | "productos" | "recursos">("main");
  const [scrolled, setScrolled] = useState(false);

  const close = useCallback(() => { setMenuOpen(false); setRecursosOpen(false); setSwitcherOpen(false); setMobileOpen(false); setMobileScreen("main"); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  /* Click fuera → cierra el switcher de producto y el menú Productos. Escucha en
     el documento (no con overlay) para que también funcione al dar clic dentro
     de la barra, p. ej. en "Productos" con el switcher abierto. */
  useEffect(() => {
    if (!switcherOpen && !menuOpen && !recursosOpen) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("[data-nav-menu]")) return;
      setSwitcherOpen(false);
      setMenuOpen(false);
      setRecursosOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [switcherOpen, menuOpen, recursosOpen]);

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
          className={`relative mx-auto flex max-w-[var(--max-w)] items-center justify-between transition-all duration-300 ${pill ? "rounded-[20px] px-4 py-2 tablet:px-6" : "px-5 py-3 tablet:px-6"}`}
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
            {/* Lockup: símbolo T1 (marca madre) + descriptor del producto (switcher).
                Móvil: T1 en la esquina y el descriptor centrado en la barra. */}
            <div className="flex min-h-[44px] shrink-0 items-center gap-2 tablet:gap-2.5">
              {/* Símbolo T1 rojo → marca madre (siempre en la esquina izquierda) */}
              <a href="/" onClick={onSymbolClick} aria-label="Ir a T1" className="flex items-center [&>svg]:h-[30px] [&>svg]:w-auto">
                <T1Logo />
              </a>

              {descriptor && (
                <>
                  {/* Separador — divisor vertical sutil, solo desktop (no una flecha, para no competir con el chevron del switcher) */}
                  <span aria-hidden className="mx-0.5 hidden h-[22px] w-px bg-white/20 tablet:block" />

                  {/* Descriptor + switcher.
                      Móvil: centrado absoluto en la barra. Desktop: en línea tras el símbolo. */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 tablet:static tablet:translate-x-0 tablet:translate-y-0">
                    <div className="relative" data-nav-menu>
                      {/* Nombre del producto = trigger del switcher */}
                      <button
                        type="button"
                        onClick={() => { setMenuOpen(false); setRecursosOpen(false); setSwitcherOpen((v) => !v); }}
                        aria-haspopup="menu"
                        aria-expanded={switcherOpen}
                        aria-label={`T1 ${descriptor} — cambiar de producto`}
                        className="group flex items-center gap-1.5 border-none bg-transparent font-sora text-[19px] font-normal leading-none text-white tablet:text-[20px]"
                      >
                        {descriptor}
                        <ChevronDown className={`mt-0.5 text-white/45 transition-all duration-200 group-hover:text-white/80 ${switcherOpen ? "rotate-180" : ""}`} />
                      </button>

                  {/* Panel del switcher */}
                  <div
                    role="menu"
                    className={`absolute left-1/2 -translate-x-1/2 tablet:left-0 tablet:translate-x-0 top-[calc(100%+8px)] z-[70] w-[252px] origin-top tablet:origin-top-left overflow-hidden rounded-[14px] border border-white/[0.10] bg-[#1A1A1D] p-1.5 shadow-[0_20px_44px_rgba(0,0,0,0.55)] transition-all duration-150 ${
                      switcherOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
                    }`}
                  >
                    {/* Marca madre primero: T1 (ecosistema) */}
                    <a
                      href="/"
                      role="menuitem"
                      onClick={() => { track("product_switch", { from: product ?? null, to: "general" }); close(); }}
                      className="block rounded-[10px] px-3 py-2.5 no-underline transition-colors hover:bg-white/[0.05]"
                    >
                      <span className="block font-inter text-[14px] font-semibold text-white">Conoce T1</span>
                      <span className="block font-inter text-[12px] font-light text-white/45">Todo el comercio en un solo ecosistema</span>
                    </a>

                    {/* Productos (submarcas de T1) */}
                    <div className="mb-0.5 mt-1.5 border-t border-white/[0.08] px-3 pb-1 pt-2.5">
                      <span className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.09em] text-white/35">Productos</span>
                    </div>
                    {PRODUCT_SWITCHER.map((p) => {
                      const current = p.key === product;
                      return (
                        <a
                          key={p.key}
                          href={p.href}
                          role="menuitem"
                          onClick={(e) => { track("product_switch", { from: product ?? null, to: p.key }); if (current) { scrollTop(e); } close(); }}
                          className={`flex items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 no-underline transition-colors ${current ? "bg-white/[0.07]" : "hover:bg-white/[0.05]"}`}
                        >
                          <span className="min-w-0 flex-1">
                            <span className={`block font-inter text-[14px] font-medium ${current ? "text-white" : "text-white/90"}`}>{p.name}</span>
                            <span className="block font-inter text-[12px] font-light text-white/45">{p.desc}</span>
                          </span>
                          {current && (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#FF6F5E]"><path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          )}
                        </a>
                      );
                    })}
                  </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Desktop nav links - hidden on mobile */}
            <button
              data-nav-menu
              onClick={() => { setRecursosOpen(false); setSwitcherOpen(false); setMenuOpen(!menuOpen); }}
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

          {/* Right: Rastreo (envíos) + Login + CTA (desktop) + Hamburger (mobile) */}
          <div className="flex shrink-0 items-center gap-4 tablet:gap-6">
            {/* Rastreo — acción de cliente que regresa, agrupada con Iniciar sesión (solo Envíos) */}
            {product === "envios" && (
              <a
                href="/rastreo"
                className={`hidden whitespace-nowrap font-inter text-[16px] font-medium no-underline transition-colors duration-150 tablet:block ${textClass}`}
              >
                Rastreo
              </a>
            )}
            <a
              href={LOGIN_URL}
              className={`hidden whitespace-nowrap font-inter text-[16px] font-medium no-underline transition-colors duration-150 tablet:block ${textClass}`}
            >
              Iniciar sesión
            </a>
            <a
              href={ctaHref}
              data-cta-text={ctaLabel}
              data-cta-destination={ctaHref}
              data-cta-section="header"
              className="hidden h-[45px] items-center justify-center whitespace-nowrap rounded-[18px] bg-[#DB3B2B] px-6 font-inter text-[16px] font-semibold text-white no-underline transition-all duration-150 hover:bg-[#C0332A] hover:shadow-[0_4px_12px_rgba(219,54,43,0.3)] tablet:inline-flex"
            >
              {ctaLabel}
            </a>

            {/* Hamburger button - mobile only */}
            <button
              onClick={() => { setSwitcherOpen(false); setMobileOpen(!mobileOpen); }}
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
            <div className="flex h-full flex-col px-6 py-6">
              {/* Navegación (arriba) */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileScreen("productos")}
                  className="flex cursor-pointer items-center justify-between border-b border-white/[0.08] bg-transparent py-4 font-inter text-[16px] font-medium text-white"
                >
                  <span>Productos</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {product === "envios" && (
                  <a
                    href="/rastreo"
                    className="border-b border-white/[0.08] py-4 font-inter text-[16px] font-medium text-white no-underline"
                  >
                    Rastrea tu envío
                  </a>
                )}
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="border-b border-white/[0.08] py-4 font-inter text-[16px] font-medium text-white no-underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* CTA + login (abajo, adaptado a la pantalla) */}
              <div className="mt-auto flex flex-col gap-4 border-t border-white/[0.08] pt-6">
                <a
                  href={LOGIN_URL}
                  className="text-center font-inter text-[16px] font-medium text-white/70 no-underline"
                >
                  Iniciar sesión
                </a>
                <a
                  href={ctaHref}
                  data-cta-text={ctaLabel}
                  data-cta-destination={ctaHref}
                  data-cta-section="header_mobile"
                  className="flex h-[52px] items-center justify-center rounded-[18px] bg-[#DB3B2B] font-inter text-[16px] font-semibold text-white no-underline"
                >
                  {ctaLabel}
                </a>
              </div>
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

      {/* Overlay click-away del switcher de productos (móvil + desktop) */}
      {switcherOpen && <div className="fixed inset-0 z-[60]" onClick={close} />}

      {/* Mega Menu - desktop only */}
      <div
        data-nav-menu
        className={`fixed left-1/2 top-[86px] z-[60] hidden w-[calc(100%-40px)] max-w-[var(--max-w)] -translate-x-1/2 overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#1A1A1D] shadow-[0_24px_50px_rgba(0,0,0,0.55)] tablet:block ${
          menuOpen ? "tablet:block animate-slide-down" : "!hidden"
        }`}
      >
        {/* Columns */}
        <div className="mx-auto flex max-w-[var(--max-w)] gap-0 px-6">
          {MEGA_MENU_COLUMNS.map((col) => (
            <MenuColumn key={col.title} col={col} />
          ))}

          {/* El panel de "Casos de exito" y "Novedades recientes" se quitó: la
              foto era de banco y el texto, provisional. Va siempre oculto. */}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08]">
          <div className="mx-auto flex max-w-[var(--max-w)] gap-0 px-6">
            <div className="flex flex-1 items-center px-5 first:pl-0" style={{ paddingTop: 20, paddingBottom: 20 }}>
              <span className="font-inter text-[12px] font-medium text-white/40">
                ¿Cómo quieres empezar?
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
