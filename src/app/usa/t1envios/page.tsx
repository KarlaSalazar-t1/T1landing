import T1USAState from "@/components/T1USAState";

export const metadata = {
  title: "T1 Shipping · Not available in the U.S. yet",
  description:
    "T1 Shipping isn't available in the United States yet. See what T1 is launching in the U.S.",
};

export default function USAShippingPage() {
  return (
    <T1USAState
      variant="not-available"
      product="T1 Shipping"
      headline="T1 Shipping isn't available in the U.S. yet"
      description="Quote, create labels, and track across 10+ carriers from one panel. We haven't brought it to the United States yet, but T1 Store and Payments are on the way."
    />
  );
}
