import { Link } from "@tanstack/react-router";
import { Clock3, Star } from "lucide-react";
import type { ReactNode } from "react";
import { categories, inr, slots, type Service, type Shop } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { Badge, Button, EmptyState, ErrorBanner, Skeleton } from "@/components/ui";
import { useShop } from "@/lib/store";

export function Price({ value, quote }: { value: number; quote?: boolean }) {
  if (quote) return <span className="font-display text-xl">On quote</span>;
  return <span className="font-display text-xl tabular-nums">{inr(value)}</span>;
}

export function CategoryRail() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((c) => (
        <Link
          key={c.slug}
          to="/c/$slug"
          params={{ slug: c.slug }}
          className="group overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-card)]"
        >
          <img
            src={c.image}
            alt=""
            className="h-24 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] outline outline-1 -outline-offset-1 outline-ink/10"
          />
          <div className="p-3">
            <p className="text-sm font-semibold">{c.name}</p>
            <p className="text-xs text-muted">{c.blurb}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to="/s/$id"
      params={{ id: service.id }}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-card)] transition-shadow duration-150 hover:shadow-[0_12px_32px_-20px_rgba(31,42,46,0.45)]"
    >
      <div className="relative">
        <img
          src={service.image}
          alt=""
          className="h-44 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
        />
        {service.tag ? (
          <span className="absolute top-3 left-3 rounded-full bg-surface/95 px-2.5 py-1 text-[11px] font-semibold text-ink">
            {service.tag}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs tracking-wide text-subtle uppercase">{service.duration}</p>
        <h3 className="mt-1 font-display text-lg leading-snug">{service.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{service.blurb}</p>
        <div className="mt-auto flex items-end justify-between pt-4">
          <Price value={service.price} quote={service.quoteOnly} />
          <span className="flex items-center gap-1 text-xs text-muted">
            <Star className="size-3.5 fill-ink text-ink" />
            {service.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ShopCard({ shop }: { shop: Shop }) {
  return (
    <Link
      to="/shop/$id"
      params={{ id: shop.id }}
      className="flex gap-4 overflow-hidden rounded-xl bg-surface p-2 shadow-[var(--shadow-card)]"
    >
      <img
        src={shop.image}
        alt=""
        className="h-24 w-28 shrink-0 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-ink/10"
      />
      <div className="py-2 pr-2">
        <Badge tone="neutral">{shop.kind}</Badge>
        <p className="mt-1 font-semibold">{shop.name}</p>
        <p className="text-xs text-muted">
          {shop.city} · {shop.rating}
        </p>
      </div>
    </Link>
  );
}

export function CatalogState({
  children,
  emptyTitle,
  emptyBody,
}: {
  children: ReactNode;
  emptyTitle: string;
  emptyBody: string;
}) {
  const demo = useShop((s) => s.demo);
  if (demo === "loading") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    );
  }
  if (demo === "empty") {
    return <EmptyState title={emptyTitle} body={emptyBody} />;
  }
  if (demo === "error") {
    return (
      <ErrorBanner
        title="Could not load this shelf"
        body="Check the connection. The catalog is still bookable by phone."
      />
    );
  }
  return <>{children}</>;
}

export function SlotGrid() {
  const slotId = useShop((s) => s.slotId);
  const setSlot = useShop((s) => s.setSlot);
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {slots.map((sl) => (
        <button
          key={sl.id}
          type="button"
          onClick={() => setSlot(sl.id)}
          className={cn(
            "rounded-lg border px-3 py-3 text-left",
            slotId === sl.id ? "border-primary bg-primary-soft" : "border-line bg-surface",
          )}
        >
          <p className="text-xs text-muted">{sl.label}</p>
          <p className="text-sm font-semibold">{sl.time}</p>
        </button>
      ))}
    </div>
  );
}

export function MetaRow({
  duration,
  rating,
  reviews,
}: {
  duration: string;
  rating: number;
  reviews: number;
}) {
  return (
    <div className="flex flex-wrap gap-4 text-sm text-muted">
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="size-4" /> {duration}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Star className="size-4 fill-ink text-ink" /> {rating} · {reviews.toLocaleString("en-IN")} reviews
      </span>
    </div>
  );
}

export function StickyBook({
  price,
  quote,
  onBook,
  onCart,
}: {
  price: number;
  quote?: boolean;
  onBook: () => void;
  onCart: () => void;
}) {
  return (
    <div className="sticky bottom-0 z-20 -mx-4 mt-8 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur-sm sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
      <div className="flex items-center justify-between gap-3">
        <Price value={price} quote={quote} />
        <div className="flex flex-1 justify-end gap-2">
          <Button variant="outline" className="w-auto min-h-11 px-4" onClick={onCart}>
            Add
          </Button>
          <Button className="w-auto min-h-11 px-5" onClick={onBook}>
            {quote ? "Request quote" : "Book this"}
          </Button>
        </div>
      </div>
    </div>
  );
}
