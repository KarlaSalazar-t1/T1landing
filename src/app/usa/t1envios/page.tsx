import T1USAState from "@/components/T1USAState";

export const metadata = {
  title: "T1 Shipping · Join the U.S. waitlist",
  description:
    "T1 Shipping is coming to the United States. Join the waitlist to quote, create labels, and track across 10+ carriers from one dashboard.",
};

export default function USAShippingPage() {
  return (
    <T1USAState
      variant="waitlist"
      product="T1 Shipping"
      headline="Get early access to T1 Shipping"
      description="Quote, create labels, and track across 10+ carriers from a single panel. Join the waitlist to be first when T1 Shipping reaches your country."
      features={[
        "Compare 10+ carriers in one place",
        "Create and print labels in seconds",
        "Real-time tracking and incident control",
      ]}
    />
  );
}
