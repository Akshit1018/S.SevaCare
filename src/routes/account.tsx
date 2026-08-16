import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketShell } from "@/components/shell";
import { Badge, Button, Card } from "@/components/ui";
import { parents } from "@/lib/catalog";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/account")({ component: AccountPage });

function AccountPage() {
  const recipient = useShop((s) => s.recipient);
  const setRecipient = useShop((s) => s.setRecipient);

  return (
    <MarketShell>
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="font-display text-3xl">Family</h1>
        <p className="mt-2 text-sm text-muted">
          Every product page can be bought for yourself or a parent. Permissions stay on this account.
        </p>
        <Card className="mt-6">
          <p className="text-xs text-muted">Plan</p>
          <div className="mt-1 flex items-center justify-between">
            <div>
              <p className="font-semibold">Care Plus</p>
              <p className="text-sm text-muted">Rs 3,500 credits remaining</p>
            </div>
            <Link to="/plans">
              <Button variant="outline" className="w-auto min-h-10 px-4">
                Change
              </Button>
            </Link>
          </div>
        </Card>
        <h2 className="mt-8 font-display text-2xl">People you book for</h2>
        <div className="mt-3 space-y-3">
          <button
            type="button"
            onClick={() => setRecipient("self")}
            className="w-full text-left"
          >
            <Card className={recipient === "self" ? "border-primary" : ""}>
              <p className="font-semibold">Myself</p>
              <p className="text-sm text-muted">Senior-simplified path available</p>
            </Card>
          </button>
          {parents.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setRecipient(p.id)}
              className="w-full text-left"
            >
              <Card className={recipient === p.id ? "border-primary" : ""}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-muted">
                      {p.relation} · {p.age} · {p.city}
                    </p>
                  </div>
                  <Badge tone="ok">Full access</Badge>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </MarketShell>
  );
}
