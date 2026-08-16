import { createFileRoute, Link } from "@tanstack/react-router";
import { ProviderApp } from "@/screens/provider";

export const Route = createFileRoute("/provider")({ component: ProviderPage });

function ProviderPage() {
  return (
    <div className="min-h-dvh bg-bg">
      <div className="border-b border-line bg-surface px-4 py-3">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <p className="font-display text-lg">Provider</p>
          <Link to="/" className="text-sm font-semibold text-primary">
            Family shop
          </Link>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[390px]">
        <div className="relative h-[740px] overflow-y-auto px-4 py-3">
          <ProviderApp />
        </div>
      </div>
    </div>
  );
}
