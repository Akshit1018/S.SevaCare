import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminApp } from "@/screens/admin";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  return (
    <div className="min-h-dvh bg-bg">
      <div className="border-b border-line bg-surface px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <p className="text-sm text-muted">Internal · Care Manager</p>
          <Link to="/" className="text-sm font-semibold text-primary">
            Family shop
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-6xl p-4">
        <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card)]">
          <AdminApp />
        </div>
      </div>
    </div>
  );
}
