import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { SlotGrid } from "@/components/commerce";
import { MarketShell } from "@/components/shell";
import { Button, Card, ErrorBanner, Field } from "@/components/ui";
import { inr, parents, serviceById, slots } from "@/lib/catalog";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/book/$id")({
  component: BookPage,
});

function BookPage() {
  const { id } = Route.useParams();
  const svc = serviceById(id);
  if (!svc) throw notFound();
  const recipient = useShop((s) => s.recipient);
  const setRecipient = useShop((s) => s.setRecipient);
  const slotId = useShop((s) => s.slotId);
  const place = useShop((s) => s.placeOrder);
  const demo = useShop((s) => s.demo);
  const navigate = useNavigate();
  const who = recipient === "self" ? "You" : parents.find((p) => p.id === recipient)?.name;
  const slot = slots.find((s) => s.id === slotId);

  return (
    <MarketShell>
      <div className="mx-auto max-w-xl px-4 py-10">
        <p className="text-xs tracking-[0.18em] text-subtle uppercase">Checkout</p>
        <h1 className="mt-2 font-display text-3xl">Confirm this visit</h1>
        {demo === "error" ? (
          <div className="mt-4">
            <ErrorBanner title="Payment did not go through" body="Credits were not deducted. Try again or use another method." />
          </div>
        ) : null}
        <Card className="mt-6">
          <p className="font-semibold">{svc.name}</p>
          <p className="text-sm text-muted">{svc.duration}</p>
        </Card>
        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold tracking-wide text-subtle uppercase">Who is this for</p>
          <div className="grid grid-cols-3 gap-2">
            {(["self", "sunita", "harish"] as const).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setRecipient(id)}
                className={`rounded-lg border px-2 py-3 text-sm font-semibold ${
                  recipient === id ? "border-primary bg-primary-soft text-primary" : "border-line bg-surface"
                }`}
              >
                {id === "self" ? "Myself" : id === "sunita" ? "Sunita" : "Harish"}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold tracking-wide text-subtle uppercase">When</p>
          <SlotGrid />
        </div>
        <Field label="Note for the caregiver">
          <textarea
            className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-3 text-sm"
            rows={3}
            placeholder="Ground floor, prefers Hindi, tea after medicines"
          />
        </Field>
        <Card className="mt-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Service</span>
            <span>{svc.quoteOnly ? "Quoted" : inr(svc.price)}</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Credits (Care Plus)</span>
            <span>− {inr(Math.min(1000, svc.price))}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Pay now</span>
            <span>{inr(Math.max(0, svc.price - 1000))}</span>
          </div>
        </Card>
        <p className="mt-3 text-xs text-muted">
          {who} · {slot?.label} {slot?.time}
        </p>
        <Button
          className="mt-5"
          disabled={demo === "loading" || !!svc.quoteOnly}
          onClick={() => {
            const order = place(svc.id);
            if (order) void navigate({ to: "/track/$id", params: { id: order.id } });
          }}
        >
          {demo === "loading" ? "Processing…" : "Pay and confirm"}
        </Button>
        <Link to="/s/$id" params={{ id: svc.id }} className="mt-3 block text-center text-sm font-semibold text-muted">
          Back to service
        </Link>
      </div>
    </MarketShell>
  );
}
