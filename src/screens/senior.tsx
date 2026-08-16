import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { Button, Card, EmptyState, ErrorBanner, ScreenHead, Skeleton } from "@/components/ui";
import { useShop } from "@/lib/store";

export function SeniorApp() {
  const demo = useShop((s) => s.demo);

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-bg px-5 py-6">
      <ScreenHead title="SevaCare" />
      <p className="mb-6 text-center font-display text-3xl leading-tight">Hello, Mrs. Sharma</p>

      {demo === "loading" ? (
        <div className="space-y-3">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : demo === "error" ? (
        <ErrorBanner title="We could not reach Care Manager" body="Try again, or ask a family member to call." />
      ) : demo === "empty" ? (
        <EmptyState title="Nothing booked yet" body="Tap a large button below. Someone will come to help." />
      ) : (
        <Card className="mb-4">
          <p className="text-xs text-muted">Upcoming</p>
          <p className="text-lg font-semibold">Nurse visit — tomorrow 11 AM</p>
        </Card>
      )}

      <div className="mt-auto space-y-3">
        <Link to="/custom">
          <Button variant="accent" className="min-h-16 text-lg">
            <Phone className="size-5" /> I need help now
          </Button>
        </Link>
        <Link to="/s/$id" params={{ id: "companion-2" }}>
          <Button className="min-h-14 text-base">Book a companion</Button>
        </Link>
        <Link to="/s/$id" params={{ id: "nurse-1" }}>
          <Button variant="secondary" className="min-h-14 text-base">
            Book a nurse
          </Button>
        </Link>
        <Link to="/" className="block text-center text-sm font-semibold text-muted">
          Open family shop
        </Link>
      </div>
    </div>
  );
}
