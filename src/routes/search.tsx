import { createFileRoute } from "@tanstack/react-router";
import { CatalogState, ServiceCard, ShopCard } from "@/components/commerce";
import { MarketShell } from "@/components/shell";
import { services, shops } from "@/lib/catalog";

type Search = { q?: string };

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : "",
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const needle = q.trim().toLowerCase();
  const hits = needle
    ? services.filter(
        (s) =>
          s.name.toLowerCase().includes(needle) ||
          s.blurb.toLowerCase().includes(needle) ||
          s.category.includes(needle),
      )
    : services.slice(0, 6);
  const house = needle
    ? shops.filter((s) => s.name.toLowerCase().includes(needle) || s.kind.toLowerCase().includes(needle))
    : [];

  return (
    <MarketShell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs tracking-wide text-subtle uppercase">Search</p>
        <h1 className="font-display text-3xl">{q ? `Results for “${q}”` : "Browse the shop"}</h1>
        {house.length > 0 ? (
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {house.map((s) => (
              <ShopCard key={s.id} shop={s} />
            ))}
          </div>
        ) : null}
        <div className="mt-8">
          <CatalogState emptyTitle="No matching services" emptyBody="Try nurse, companion, diagnostic, or write a custom request.">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hits.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </CatalogState>
        </div>
      </div>
    </MarketShell>
  );
}
