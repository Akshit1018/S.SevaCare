import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketShell } from "@/components/shell";
import { Badge, Button, Card, ErrorBanner } from "@/components/ui";
import { serviceById } from "@/lib/catalog";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/track/$id")({
  component: TrackPage,
});

function TrackPage() {
  const { id } = Route.useParams();
  const order = useShop((s) => s.orders.find((o) => o.id === id) ?? s.orders[0]);
  const demo = useShop((s) => s.demo);
  const svc = order ? serviceById(order.serviceId) : undefined;
  const steps = ["Booked", "Assigned", "On the way", "Arrived", "Completed"];
  const current = order?.status === "Assigned" ? 1 : 0;

  return (
    <MarketShell>
      <div className="mx-auto max-w-xl px-4 py-10">
        <p className="text-xs tracking-wide text-subtle uppercase">{order?.id}</p>
        <h1 className="mt-1 font-display text-3xl">{svc?.name ?? "Visit"}</h1>
        <p className="mt-1 text-sm text-muted">{order?.slotLabel}</p>
        {demo === "error" ? (
          <div className="mt-4">
            <ErrorBanner title="No provider nearby yet" body="Care Manager is widening the search. You can wait or talk to us." />
          </div>
        ) : null}
        <Card className="mt-6">
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className={`mt-1 size-3 rounded-full ${i <= current ? "bg-heal" : "bg-line-strong"}`} />
                <div>
                  <p className="text-sm font-semibold">{s}</p>
                  {i === 1 && current >= 1 ? <p className="text-xs text-muted">Priya Nair · 4.8 · 5 years</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </Card>
        {current >= 1 ? (
          <Card className="mt-3">
            <Badge tone="ok">Photo proof arrives after arrival</Badge>
            <p className="mt-2 text-sm text-muted">Family members on this account get WhatsApp the moment she checks in.</p>
          </Card>
        ) : null}
        <Link to="/custom" className="mt-6 block">
          <Button variant="outline">Talk to Care Manager</Button>
        </Link>
      </div>
    </MarketShell>
  );
}
