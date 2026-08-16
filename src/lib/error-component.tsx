import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-ink">
      <TriangleAlert className="size-10 text-danger" strokeWidth={1.75} />
      <h1 className="font-display text-2xl">Something went wrong</h1>
      <p className="max-w-md text-sm leading-relaxed text-muted">
        {error.message || "An unexpected error occurred. Try reloading the page."}
      </p>
      <Link to="/" className="text-sm font-semibold text-primary">
        Back to the shop
      </Link>
    </main>
  );
}

export function AppNotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-ink">
      <h1 className="font-display text-2xl">This shelf is empty</h1>
      <p className="max-w-md text-sm text-muted">The service or shop you asked for is not listed.</p>
      <Link to="/" className="text-sm font-semibold text-primary">
        Back to the shop
      </Link>
    </main>
  );
}
