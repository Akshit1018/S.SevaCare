import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketShell } from "@/components/shell";
import { Badge, Button, Card } from "@/components/ui";
import { inr, plans } from "@/lib/catalog";

export const Route = createFileRoute("/plans")({ component: PlansPage });

function PlansPage() {
  return (
    <MarketShell>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-xs tracking-[0.18em] text-subtle uppercase">Membership</p>
        <h1 className="mt-2 max-w-xl font-display text-4xl">Monthly care, not a pile of one-off bookings.</h1>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Credits spend on any SKU. Unused credits do not roll into unlimited visits — they expire with the month, so we can actually staff the city.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <Card key={p.id} className={p.highlight ? "border-primary" : ""}>
              {p.highlight ? <Badge tone="primary">Held by most NRI families</Badge> : null}
              <h2 className="mt-3 font-display text-2xl">{p.name}</h2>
              <p className="mt-1 font-display text-3xl">{inr(p.price)}</p>
              <p className="text-sm text-muted">{inr(p.credits)} credits each month</p>
              <ul className="mt-4 space-y-2 text-sm">
                {p.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
              <Button className="mt-6" variant={p.highlight ? "primary" : "outline"}>
                {p.highlight ? "Continue with Care Plus" : "Choose"}
              </Button>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Need a one-time diagnostic only?{" "}
          <Link to="/s/$id" params={{ id: "diag-499" }} className="font-semibold text-primary">
            Book the Rs 499 panel
          </Link>
        </p>
      </div>
    </MarketShell>
  );
}
