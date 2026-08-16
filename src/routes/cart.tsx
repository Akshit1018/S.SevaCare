import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketShell } from "@/components/shell";
import { Button, Card, EmptyState } from "@/components/ui";
import { inr, serviceById } from "@/lib/catalog";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const cart = useShop((s) => s.cart);
  const remove = useShop((s) => s.removeFromCart);
  const demo = useShop((s) => s.demo);
  const lines = cart
    .map((l) => ({ ...l, svc: serviceById(l.serviceId) }))
    .filter((l) => l.svc);
  const total = lines.reduce((n, l) => n + (l.svc?.price ?? 0) * l.qty, 0);

  return (
    <MarketShell>
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="font-display text-3xl">Bag</h1>
        {demo === "empty" || lines.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="Nothing in the bag"
              body="Add a nurse visit or companion from the shop. Memberships stay on the plans page."
              action={
                <Link to="/">
                  <Button>Continue shopping</Button>
                </Link>
              }
            />
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {lines.map((l) => (
              <Card key={l.serviceId} className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{l.svc?.name}</p>
                  <p className="text-sm text-muted">
                    Qty {l.qty} · {l.svc && inr(l.svc.price)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    to="/book/$id"
                    params={{ id: l.serviceId }}
                    className="text-sm font-semibold text-primary"
                  >
                    Book
                  </Link>
                  <button type="button" className="text-sm text-muted" onClick={() => remove(l.serviceId)}>
                    Remove
                  </button>
                </div>
              </Card>
            ))}
            <Card className="flex items-center justify-between">
              <span className="text-sm">Subtotal</span>
              <span className="font-display text-2xl">{inr(total)}</span>
            </Card>
          </div>
        )}
      </div>
    </MarketShell>
  );
}
