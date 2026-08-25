import T1USAState from "@/components/T1USAState";

export const metadata = {
  title: "T1 Payments · Join the U.S. waitlist",
  description:
    "T1 Payments is coming to the United States. Join the waitlist to get early access to one checkout for cards, transfers, and local methods.",
};

export default function USAPaymentsPage() {
  return (
    <T1USAState
      variant="waitlist"
      product="T1 Payments"
      headline="Get early access to T1 Payments"
      description="One secure checkout for cards, transfers, and local payment methods, with every transaction in a single dashboard. Join the waitlist to be first in line."
      features={[
        "Cards, transfers, and installments",
        "Built-in fraud protection",
        "Next-day payouts",
      ]}
    />
  );
}
