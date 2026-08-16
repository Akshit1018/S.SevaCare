import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CatalogState, ServiceCard } from "@/components/commerce";
import { MarketShell } from "@/components/shell";
import { categories, services, subcategories } from "@/lib/catalog";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/c/$slug")({
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) throw notFound();
  const subs = subcategories.filter((s) => s.category === slug);
  const items = services.filter((s) => s.category === slug);

  return (
    <MarketShell>
      <div className="relative h-52 overflow-hidden">
        <img src={cat.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-6 text-primary-fg">
          <p className="text-xs tracking-[0.18em] uppercase">Category</p>
          <h1 className="font-display text-4xl">{cat.name}</h1>
          <p className="text-sm text-primary-fg/80">{cat.blurb}</p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {subs.map((s) => (
            <span key={s.slug} className={cn("rounded-full bg-bg-warm px-3 py-1.5 text-xs font-semibold")}>
              {s.name}
            </span>
          ))}
        </div>
        <CatalogState emptyTitle="No services in this city" emptyBody="Ask for a custom quote while we onboard partners.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </CatalogState>
        <p className="mt-8 text-sm text-muted">
          Looking for something narrower?{" "}
          <Link to="/custom" className="font-semibold text-primary">
            Write a request
          </Link>
        </p>
      </div>
    </MarketShell>
  );
}
