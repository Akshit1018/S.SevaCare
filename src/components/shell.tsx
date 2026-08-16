import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Search, ShoppingBag, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useShop, type DemoState } from "@/lib/store";
import { parents } from "@/lib/catalog";

const demos: { id: DemoState; label: string }[] = [
  { id: "happy", label: "Live" },
  { id: "empty", label: "Empty" },
  { id: "loading", label: "Loading" },
  { id: "error", label: "Error" },
];

export function MarketShell({ children }: { children: ReactNode }) {
  const cart = useShop((s) => s.cart);
  const recipient = useShop((s) => s.recipient);
  const setRecipient = useShop((s) => s.setRecipient);
  const demo = useShop((s) => s.demo);
  const setDemo = useShop((s) => s.setDemo);
  const query = useShop((s) => s.query);
  const setQuery = useShop((s) => s.setQuery);
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const who =
    recipient === "self"
      ? "Myself"
      : parents.find((p) => p.id === recipient)?.name ?? "Sunita";

  function goSearch(e: React.FormEvent) {
    e.preventDefault();
    void navigate({ to: "/search", search: { q: query } });
  }

  return (
    <div className="min-h-dvh overflow-x-hidden bg-bg text-ink">
      <div className="border-b border-line bg-primary text-primary-fg">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-xs">
          <p className="min-w-0 truncate tracking-wide">
            Care for parents, from anywhere in India or abroad.
          </p>
          <nav className="hidden shrink-0 gap-4 sm:flex">
            <Link to="/plans" className="hover:underline">
              Membership
            </Link>
            <Link to="/provider" className="hover:underline">
              For providers
            </Link>
            <Link to="/admin" className="hover:underline">
              Ops desk
            </Link>
          </nav>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link to="/" className="shrink-0 font-display text-xl tracking-tight">
            SevaCare
          </Link>
          <form className="relative hidden min-w-0 flex-1 md:block" onSubmit={goSearch}>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search nurse, companion, diagnostic…"
              className="h-11 w-full rounded-md border border-line bg-bg pl-10 pr-3 text-sm text-ink placeholder:text-subtle focus:border-primary focus:outline-none"
            />
          </form>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <label className="hidden items-center gap-2 rounded-full bg-bg-warm px-3 py-1.5 text-xs font-semibold lg:flex">
              For
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value as typeof recipient)}
                className="bg-transparent text-primary focus:outline-none"
              >
                <option value="self">Myself</option>
                <option value="sunita">Sunita Sharma</option>
                <option value="harish">Harish Sharma</option>
              </select>
            </label>
            <Link
              to="/bookings"
              className={cn(
                "flex size-11 items-center justify-center rounded-md",
                path.startsWith("/bookings") || path.startsWith("/track")
                  ? "text-primary"
                  : "text-muted",
              )}
              aria-label="Bookings"
            >
              <CalendarDays className="size-5" />
            </Link>
            <Link
              to="/account"
              className="flex size-11 items-center justify-center rounded-md text-muted"
              aria-label="Account"
            >
              <UserRound className="size-5" />
            </Link>
            <Link
              to="/cart"
              className="relative flex size-11 items-center justify-center rounded-md text-muted"
              aria-label="Cart"
            >
              <ShoppingBag className="size-5" />
              {cart.length > 0 ? (
                <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-fg">
                  {cart.length}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
        <form className="mx-auto block max-w-6xl px-4 pb-2 md:hidden" onSubmit={goSearch}>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services"
              className="h-11 w-full rounded-md border border-line bg-bg pl-10 pr-3 text-sm"
            />
          </div>
        </form>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 overflow-x-auto px-4 pb-2">
          <p className="hidden text-xs text-muted sm:block">Booking for {who}</p>
          <div className="flex gap-1">
            {demos.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDemo(d.id)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                  demo === d.id ? "bg-ink text-bg" : "text-subtle",
                )}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-16 border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-4">
          <div>
            <p className="font-display text-lg">SevaCare</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              A service marketplace for parents — health, company, meals, and the hospital days in between.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-subtle uppercase">Shop</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/c/$slug" params={{ slug: "health" }}>
                  Health
                </Link>
              </li>
              <li>
                <Link to="/c/$slug" params={{ slug: "companion" }}>
                  Companionship
                </Link>
              </li>
              <li>
                <Link to="/plans">Memberships</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-subtle uppercase">Desks</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/provider">Provider app</Link>
              </li>
              <li>
                <Link to="/admin">Care Manager</Link>
              </li>
              <li>
                <Link to="/senior">Senior mode</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-subtle uppercase">Cities</p>
            <p className="mt-3 text-sm text-muted">Delhi, Mumbai, Bengaluru, Hyderabad, Pune, and expanding.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
