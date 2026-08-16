import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CatalogState, CategoryRail, ServiceCard, ShopCard } from "@/components/commerce";
import { MarketShell } from "@/components/shell";
import { Button } from "@/components/ui";
import { services, shops } from "@/lib/catalog";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const featured = services.filter((s) => ["diag-499", "companion-2", "nurse-1", "pickup-clinic", "meals-week", "physio-1"].includes(s.id));

  return (
    <MarketShell>
      <section className="relative">
        <img
          src="/brand/hero.jpg"
          alt=""
          className="h-[420px] w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-10 text-primary-fg">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase">For families who live away</p>
          <h1 className="mt-2 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
            A shop for the care you cannot give in person.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-primary-fg/85">
            Book a nurse, a companion, a diagnostic, or a hospital day — for your parents or yourself. Credits, quotes, and a Care Manager on every order.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link to="/c/$slug" params={{ slug: "diagnostics" }}>
              <Button className="w-auto px-5">Start at Rs 499</Button>
            </Link>
            <Link to="/plans">
              <Button variant="outline" className="w-auto border-primary-fg/30 bg-ink/20 px-5 text-primary-fg">
                See memberships
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12">
        <section>
          <SectionHead title="Shop by need" to="/c/$slug" params={{ slug: "health" }} />
          <CategoryRail />
        </section>

        <section>
          <SectionHead title="This week’s shelf" hint="Fixed prices. Credits apply at checkout." />
          <CatalogState emptyTitle="Nothing on the shelf" emptyBody="We are restocking this city. Leave a custom request.">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </CatalogState>
        </section>

        <section className="grid gap-6 rounded-xl bg-primary px-6 py-8 text-primary-fg md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase opacity-80">Membership</p>
            <h2 className="mt-2 font-display text-3xl">Care Plus is the plan most NRI children keep.</h2>
            <p className="mt-2 max-w-md text-sm text-primary-fg/80">
              Rs 4,999 a month. A named Care Manager, 3,500 credits, weekly visits, and WhatsApp that does not sleep when you do.
            </p>
          </div>
          <Link to="/plans" className="justify-self-start md:justify-self-end">
            <Button variant="outline" className="w-auto border-primary-fg/30 bg-transparent px-5 text-primary-fg">
              Compare plans <ArrowRight className="size-4" />
            </Button>
          </Link>
        </section>

        <section>
          <SectionHead title="Houses we work with" hint="Agencies, labs, hospitals — each a shop." />
          <div className="grid gap-3 md:grid-cols-2">
            {shops.slice(0, 4).map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-surface p-6 shadow-[var(--shadow-card)]">
          <p className="text-xs font-semibold tracking-wide text-subtle uppercase">Cannot find a price</p>
          <h2 className="mt-2 font-display text-2xl">Describe it. We quote it.</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Ayurveda, night sitters, village travel, after-life rites — if it is not on the shelf, it goes to a Care Manager, never a guessed SKU.
          </p>
          <Link to="/custom" className="mt-4 inline-block">
            <Button className="w-auto px-5">Write a custom request</Button>
          </Link>
        </section>
      </div>
    </MarketShell>
  );
}

function SectionHead({
  title,
  hint,
  to,
  params,
}: {
  title: string;
  hint?: string;
  to?: "/c/$slug";
  params?: { slug: string };
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-2xl">{title}</h2>
        {hint ? <p className="text-sm text-muted">{hint}</p> : null}
      </div>
      {to && params ? (
        <Link to={to} params={params} className="text-sm font-semibold text-primary">
          Browse
        </Link>
      ) : null}
    </div>
  );
}
