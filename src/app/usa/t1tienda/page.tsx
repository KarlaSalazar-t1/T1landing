import T1USAState from "@/components/T1USAState";

export const metadata = {
  title: "T1 Store · Coming soon to the U.S.",
  description:
    "T1 Store is launching in the United States in November 2026. Build an online store in under a minute. Get notified at launch.",
};

export default function USAStorePage() {
  return (
    <T1USAState
      variant="coming-soon"
      product="T1 Store"
      headline="T1 Store is coming to the U.S."
      description="Describe your business and AI builds an online store, ready to sell, get paid, and ship. We're bringing it to the United States."
      date="November 2026"
      features={[
        "AI-built storefront in under a minute",
        "Sell online, on marketplaces, and social media",
        "Payments and shipping built in",
      ]}
    />
  );
}
