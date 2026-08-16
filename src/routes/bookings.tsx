import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketShell } from "@/components/shell";
import { Badge, Card, EmptyState } from "@/components/ui";
import { inr, parents, serviceById } from "@/lib/catalog";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/bookings")({ component: BookingsPage });

function BookingsPage() {
  const orders = useShop((s) => s.orders);
  const demo = useShop((s) => s.demo);

  return (
    <MarketShell>
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="font-display text-3xl">Visits</h1>
        {demo === "empty" || orders.length === 0 ? (
          <div className="mt-6">
            <EmptyState title="No visits yet" body="When you book for a parent, the timeline lives here." />
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {orders.map((o) => {
              const svc = serviceById(o.serviceId);
              const who = o.recipient === "self" ? "You" : parents.find((p) => p.id === o.recipient)?.name;
              return (
                <Link key={o.id} to="/track/$id" params={{ id: o.id }} className="block">
                  <Card className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{svc?.name}</p>
                      <p className="text-sm text-muted">
                        {who} · {o.slotLabel} · {inr(o.total)}
                      </p>
                    </div>
                    <Badge tone={o.status === "Assigned" ? "ok" : "primary"}>{o.status}</Badge>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </MarketShell>
  );
}
