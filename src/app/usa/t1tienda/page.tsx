import T1USAState from "@/components/T1USAState";

export const metadata = {
  title: "T1 Store · Join the U.S. waitlist",
  description:
    "T1 Store is coming to the United States. Join the waitlist to build an online store in under a minute with AI.",
};

export default function USAStorePage() {
  return (
    <T1USAState
      variant="waitlist"
      product="T1 Store"
      headline="Get early access to T1 Store"
      description="Describe your business and AI builds an online store, ready to sell, get paid, and ship. Join the waitlist to be first when we launch in your country."
      features={[
        "AI-built storefront in under a minute",
        "Sell online, on marketplaces, and social media",
        "Payments and shipping built in",
      ]}
    />
  );
}
