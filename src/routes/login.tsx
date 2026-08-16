import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">SevaCare</p>
        <h1 className="mt-2 font-display text-3xl">Sign in</h1>
        <p className="mt-2 mb-6 text-sm text-muted">
          Optional for exploring the prototype. Families, providers, and ops can still click through without an account.
        </p>
        {authEnabled ? (
          <div className="space-y-2">
            {GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                variant="outline"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Continue with {p.label}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">Sign-in is disabled.</p>
        )}
        <Link to="/" className="mt-6 inline-block text-sm font-semibold text-primary">
          Back to prototype
        </Link>
      </div>
    </main>
  );
}
