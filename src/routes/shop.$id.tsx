import { createFileRoute, notFound } from "@tanstack/react-router";
import { CatalogState, ServiceCard } from "@/components/commerce";
import { MarketShell } from "@/components/shell";
import { Badge } from "@/components/ui";
import { caregivers, servicesForShop, shopById } from "@/lib/catalog";

export const Route = createFileRoute("/shop/$id")({
  component: ShopPage,
});

function ShopPage() {
  const { id } = Route.useParams();
  const shop = shopById(id);
  if (!shop) throw notFound();
  const items = servicesForShop(id);
  const people = caregivers.filter((c) => c.shopId === id);

  return (
    <MarketShell>
      <div className="relative h-56">
        <img src={shop.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-6 text-primary-fg">
          <Badge tone="neutral">{shop.kind}</Badge>
          <h1 className="mt-2 font-display text-4xl">{shop.name}</h1>
          <p className="text-sm text-primary-fg/80">
            {shop.city} · {shop.rating} rating
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="max-w-2xl text-base leading-relaxed text-muted">{shop.about}</p>
        {people.length > 0 ? (
          <div className="mt-8">
            <h2 className="font-display text-2xl">People</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {people.map((p) => (
                <div key={p.id} className="rounded-xl bg-surface p-4 shadow-[var(--shadow-card)]">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-muted">
                    {p.role} · {p.years} yrs · {p.languages.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <h2 className="mt-10 mb-4 font-display text-2xl">On their shelf</h2>
        <CatalogState emptyTitle="This house has no listed SKUs" emptyBody="Treatments here are quoted case by case.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </CatalogState>
      </div>
    </MarketShell>
  );
}
