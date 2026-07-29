"use client";

import { useState } from "react";
import { FOOTER_COLUMNS } from "@/lib/constants";

function T1LogoWhite() {
  return (
    <svg width="45" height="44" viewBox="0 0 45 44" fill="none">
      <g clipPath="url(#t1foot)">
        <path
          d="M27.6733 19.1041H31.4027C31.5444 19.1041 31.6388 19.1041 31.7332 19.1985C31.7332 19.1985 31.7332 19.1985 31.7332 19.2457V37.7039C31.7332 38.5064 32.4885 39.0729 33.291 38.8369C35.0377 38.1288 37.3037 37.2318 38.956 36.4765C39.2392 36.3349 39.6169 36.1932 39.6169 35.6268V19.2457C39.6169 19.2457 39.6169 19.1985 39.6169 19.1513C39.6169 19.1041 39.6169 19.1041 39.6169 19.1041V7.86867C39.6169 7.20776 39.0976 6.68848 38.4367 6.68848H35.6514C35.1321 6.68848 34.7073 7.01893 34.5184 7.491C33.3855 10.6539 31.2139 13.0143 27.9566 13.5808C24.6992 14.1473 27.6733 13.628 27.4845 13.628C26.8708 13.7224 26.4459 14.1945 26.4459 14.8082V17.8767C26.4459 18.5376 26.9652 19.0569 27.6261 19.0569L27.6733 19.1041Z"
          fill="white"
        />
        <path
          d="M32.5831 5.41411C32.4415 5.27248 32.2055 5.13086 31.9694 5.13086H4.63622C3.78648 5.13086 3.07837 5.74456 3.07837 6.54709V10.7014C3.07837 11.6927 3.2672 12.1648 4.4946 12.1648H13.6057C13.8417 12.1648 14.0305 12.3536 14.0305 12.5897V16.083V35.5326C14.0305 35.9574 14.3138 36.2879 14.7387 36.4767C15.5412 36.8072 18.3264 38.1762 19.2706 38.6955C20.2147 39.2148 21.867 38.3178 21.867 36.996V13.2506C21.867 13.2034 21.867 13.0617 21.867 13.0617C21.8198 12.7313 21.867 12.4008 22.1975 12.2592C22.2919 12.2592 22.3391 12.2592 22.4335 12.2592H25.4076C31.9222 11.6455 32.5831 6.5943 32.6303 6.02781C32.6303 6.02781 32.6303 5.9806 32.6303 5.93339V5.79177C32.6303 5.65014 32.6303 5.55573 32.4887 5.46131L32.5831 5.41411Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="t1foot">
          <rect width="44.1244" height="43.0982" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* Social icons */
function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export default function T1Footer() {
  const [langOpen, setLangOpen] = useState(false);

  return (
    <footer className="bg-black" style={{ paddingTop: 60, paddingBottom: 32 }}>
      <div className="mx-auto max-w-[var(--max-w)] px-5 tablet:px-6">
        {/* Top row — 3 columns distributed evenly */}
        <div
          className="grid gap-10 tablet:gap-0"
          style={{ gridTemplateColumns: "1fr", marginBottom: 48 }}
        >
          {/* Desktop: logo + 4 link columns */}
          <div className="hidden tablet:grid" style={{ gridTemplateColumns: "1.4fr 1fr 1fr 1fr 0.8fr", gap: 40 }}>
            {/* Col 1: Logo + socials */}
            <div>
              <div style={{ marginBottom: 24 }}>
                <T1LogoWhite />
              </div>
              <div className="flex items-center gap-3">
                {[
                  { Icon: LinkedInIcon, label: "LinkedIn" },
                  { Icon: InstagramIcon, label: "Instagram" },
                  { Icon: XIcon, label: "X" },
                  { Icon: FacebookIcon, label: "Facebook" },
                  { Icon: TikTokIcon, label: "TikTok" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/10 text-white/60 no-underline transition-colors hover:bg-white/20 hover:text-white"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <img src="/img/hecho-en-mexico.jpg" alt="Hecho en México" className="h-[70px] w-[70px] shrink-0 rounded-[8px] object-contain" />
                <span className="font-inter text-[13px] font-medium leading-snug text-white/60">Una empresa<br />100% mexicana</span>
              </div>
            </div>

            {/* Link columns */}
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-inter text-[15px] font-semibold text-white" style={{ marginBottom: 18 }}>
                  {col.title}
                </p>
                <ul className="list-none">
                  {col.links.map((link) => (
                    <li key={link.label} style={{ marginBottom: 12 }}>
                      <a
                        href={link.href}
                        className="font-inter text-[14px] text-white/50 no-underline transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile: stacked layout */}
          <div className="flex flex-col gap-8 tablet:hidden">
            {/* Logo + socials */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <T1LogoWhite />
              </div>
              <div className="flex items-center gap-3">
                {[
                  { Icon: LinkedInIcon, label: "LinkedIn" },
                  { Icon: InstagramIcon, label: "Instagram" },
                  { Icon: XIcon, label: "X" },
                  { Icon: FacebookIcon, label: "Facebook" },
                  { Icon: TikTokIcon, label: "TikTok" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/10 text-white/60 no-underline transition-colors hover:bg-white/20 hover:text-white"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <img src="/img/hecho-en-mexico.jpg" alt="Hecho en México" className="h-[70px] w-[70px] shrink-0 rounded-[8px] object-contain" />
                <span className="font-inter text-[13px] font-medium leading-snug text-white/60">Una empresa<br />100% mexicana</span>
              </div>
            </div>

            {/* Link columns — grid 2×2 */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-8">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title}>
                  <p className="font-inter text-[15px] font-semibold text-white" style={{ marginBottom: 14 }}>
                    {col.title}
                  </p>
                  <ul className="list-none">
                    {col.links.map((link) => (
                      <li key={link.label} style={{ marginBottom: 10 }}>
                        <a href={link.href} className="font-inter text-[14px] text-white/50 no-underline">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start gap-4 border-t border-white/10 pt-5 tablet:flex-row tablet:items-center tablet:justify-between">
          {/* Language/country dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex cursor-pointer items-center gap-2 rounded-[8px] border border-white/10 bg-transparent px-3 py-2 font-inter text-[13px] text-white/60 transition-colors hover:border-white/20 hover:text-white/80"
            >
              {/* Generic globe — country-agnostic icon so the language
                  switcher reads as "international", not "currently-MX". */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3a13 13 0 0 1 0 18" />
                <path d="M12 3a13 13 0 0 0 0 18" />
              </svg>
              <span>México | Español</span>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ transform: langOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {langOpen && (
              <div
                className="absolute bottom-full left-0 mb-2 overflow-hidden rounded-[14px] border border-white/10 bg-[#0e0d0d]"
                style={{ width: 260, padding: "8px 0", animation: "fadeSlideIn 0.2s ease-out" }}
              >
                {[
                  { flag: "🇧🇷", name: "Brasil", langs: ["Português", "Inglés"], selected: false, href: undefined },
                  { flag: "🇨🇴", name: "Colombia", langs: ["Inglés", "Español"], selected: false, href: "/colombia" },
                  { flag: "🇺🇸", name: "Estados Unidos", langs: ["Inglés", "Español"], selected: false, href: undefined },
                  { flag: "🇲🇽", name: "México", langs: ["Español", "Inglés"], selected: true, href: "/" },
                ].map((country) => (
                  <button
                    key={country.name}
                    onClick={() => {
                      setLangOpen(false);
                      // Colombia isn't live yet → its waitlist; México → home.
                      if (country.href) window.location.href = country.href;
                    }}
                    className="flex w-full cursor-pointer items-start gap-3 border-none bg-transparent px-5 py-3.5 text-left transition-colors hover:bg-white/5"
                  >
                    <span className="text-[18px]" style={{ marginTop: 2 }}>{country.flag}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-inter text-[15px] font-semibold text-white">{country.name}</span>
                        {country.selected && (
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-1 font-inter text-[13px] text-white/55" style={{ marginTop: 2 }}>
                        {country.langs.map((lang, li) => (
                          <span key={lang}>
                            {li > 0 && <span className="mx-0.5 text-white/20">|</span>}
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-2 font-inter text-[13px] text-white/50">
            <a href="#" className="text-white/50 no-underline transition-colors hover:text-white/60">Términos y condiciones</a>
            <span>|</span>
            <a href="#" className="text-white/50 no-underline transition-colors hover:text-white/60">Privacidad</a>
          </div>

          {/* Copyright */}
          <span className="font-inter text-[13px] text-white/50">
            © 2026 T1. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
