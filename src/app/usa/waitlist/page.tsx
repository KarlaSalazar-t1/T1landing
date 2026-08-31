import T1USAState from "@/components/T1USAState";

export const metadata = {
  title: "T1 · Join the waitlist",
  description:
    "T1 brings your online store, payments, and shipping together — powered by AI. Join the waitlist and we'll let you know when T1 reaches your country.",
};

export default function USAWaitlistPage() {
  return (
    <T1USAState
      variant="waitlist"
      product="T1"
      headline="Everything to sell online, in one platform"
      description="T1 brings your online store, payments, and shipping together — powered by AI. Join the waitlist and we'll let you know when T1 reaches your country."
      features={[
        "Build your store with AI in under a minute",
        "Sell, get paid, and ship in one place",
        "Start with no monthly fee",
      ]}
    />
  );
}
