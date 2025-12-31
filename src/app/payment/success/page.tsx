import { PaymentSuccessClient } from "@/components/modules/Payment/PaymentSuccessClient";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { eventId?: string };
}) {
  const { eventId } = await searchParams;
  return <PaymentSuccessClient eventId={eventId || ""} />;
}
