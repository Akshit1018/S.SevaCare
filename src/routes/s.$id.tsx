import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { MetaRow, ServiceCard, SlotGrid, StickyBook } from "@/components/commerce";
import { MarketShell } from "@/components/shell";
import { Badge, Card } from "@/components/ui";
import { caregivers, reviews, serviceById, services, shopById } from "@/lib/catalog";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/s/$id")({
  component: ServicePage,
});

function ServicePage() {
  const { id } = Route.useParams();
  const svc = serviceById(id);
  if (!svc) throw notFound();
  const shop = shopById(svc.shopId);
  const related = services.filter((s) => s.category === svc.category && s.id !== svc.id).slice(0, 3);
  const notes = reviews.filter((r) => r.serviceId === svc.id);
  const people = caregivers.filter((c) => c.shopId === svc.shopId);
  const add = useShop((s) => s.addToCart);
  const navigate = useNavigate();

  return (
    <MarketShell>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <img
            src={svc.image}
            alt=""
            className="h-[360px] w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-ink/10"
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {svc.tag ? <Badge tone="primary">{svc.tag}</Badge> : null}
            <Badge>{svc.duration}</Badge>
          </div>
          <h1 className="mt-3 font-display text-4xl leading-tight">{svc.name}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted">{svc.blurb}</p>
          <div className="mt-4">
            <MetaRow duration={svc.duration} rating={svc.rating} reviews={svc.reviews} />
          </div>

          <h2 className="mt-10 font-display text-2xl">What is included</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {svc.includes.map((i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 size-1.5 rounded-full bg-heal" />
                {i}
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-sm font-semibold">Not included</h3>
          <p className="mt-1 text-sm text-muted">{svc.excludes.join(" · ")}</p>
          <p className="mt-4 text-sm text-muted">
            <span className="font-semibold text-ink">Best for. </span>
            {svc.suitable}
          </p>

          {notes.length > 0 ? (
            <div className="mt-10">
              <h2 className="font-display text-2xl">From families</h2>
              <div className="mt-3 space-y-3">
                {notes.map((r) => (
                  <Card key={r.id}>
                    <p className="text-sm leading-relaxed">{r.text}</p>
                    <p className="mt-2 text-xs text-muted">{r.name}</p>
                  </Card>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <aside className="lg:pt-2">
          <Card className="lg:sticky lg:top-24">
            <p className="text-xs tracking-wide text-subtle uppercase">Schedule</p>
            <p className="mt-1 text-sm text-muted">Pick a window. We confirm the caregiver after payment.</p>
            <div className="mt-4">
              <SlotGrid />
            </div>
            {shop ? (
              <Link to="/shop/$id" params={{ id: shop.id }} className="mt-5 block">
                <p className="text-xs text-muted">Fulfilled by</p>
                <p className="font-semibold">{shop.name}</p>
                <p className="text-xs text-muted">
                  {shop.kind} · {shop.city}
                </p>
              </Link>
            ) : null}
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold tracking-wide text-subtle uppercase">Often assigned</p>
              <div className="space-y-2">
                {people.slice(0, 2).map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-sm">
                    <span>
                      {p.name}
                      <span className="text-muted"> · {p.role}</span>
                    </span>
                    <span className="text-xs text-muted">{p.rating}</span>
                  </div>
                ))}
              </div>
            </div>
            <StickyBook
              price={svc.price}
              quote={svc.quoteOnly}
              onCart={() => add(svc.id)}
              onBook={() => {
                if (svc.quoteOnly) {
                  void navigate({ to: "/custom" });
                  return;
                }
                void navigate({ to: "/book/$id", params: { id: svc.id } });
              }}
            />
          </Card>
        </aside>
      </div>

      {related.length > 0 ? (
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="mb-4 font-display text-2xl">Often booked with</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      ) : null}
    </MarketShell>
  );
}
