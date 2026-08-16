import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MarketShell } from "@/components/shell";
import { Button, Card, ErrorBanner, Field, Textarea } from "@/components/ui";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/custom")({ component: CustomPage });

function CustomPage() {
  const [text, setText] = useState("");
  const demo = useShop((s) => s.demo);
  const navigate = useNavigate();

  return (
    <MarketShell>
      <div className="mx-auto max-w-xl px-4 py-10">
        <p className="text-xs tracking-[0.18em] text-subtle uppercase">Custom request</p>
        <h1 className="mt-2 font-display text-3xl">If it is not on the shelf, write it here.</h1>
        <p className="mt-2 text-sm text-muted">
          A Care Manager quotes within 30 minutes. We never invent a price for an unknown service.
        </p>
        {demo === "error" ? (
          <div className="mt-4">
            <ErrorBanner title="Could not send" body="Add a short description and try again." />
          </div>
        ) : null}
        <Field label="What do you need">
          <Textarea
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Need someone to take mother for an eye checkup and wait with her at the clinic."
          />
        </Field>
        <Card className="mb-4">
          <p className="text-xs text-muted">For</p>
          <p className="font-semibold">Sunita Sharma · Green Park</p>
        </Card>
        <Button
          variant="accent"
          disabled={demo === "loading"}
          onClick={() => void navigate({ to: "/admin" })}
        >
          {demo === "loading" ? "Sending…" : "Send to Care Manager"}
        </Button>
      </div>
    </MarketShell>
  );
}
