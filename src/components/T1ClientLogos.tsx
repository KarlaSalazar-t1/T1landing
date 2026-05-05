import { CLIENT_LOGOS_HEADING, CLIENT_LOGOS } from "@/lib/constants";

export default function T1ClientLogos() {
  return (
    <section className="bg-white" style={{ paddingTop: 32, paddingBottom: 32 }}>
      <div className="mx-auto max-w-[var(--max-w)] px-6">
        <p
          className="font-sora text-[24px] font-light text-black"
          style={{
            letterSpacing: "-0.03em",
            lineHeight: "1.26em",
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          {CLIENT_LOGOS_HEADING}
        </p>

        {/* Logo strip */}
        <div
          className="flex items-center justify-between"
          style={{ padding: "16px 0" }}
        >
          {CLIENT_LOGOS.map((name) => (
            <span
              key={name}
              className="font-inter text-[16px] font-semibold text-black/40"
              style={{ letterSpacing: "-0.01em" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
