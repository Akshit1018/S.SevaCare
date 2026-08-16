import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/cn";

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "accent" | "ghost" | "danger";
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold tracking-tight transition-transform duration-150 disabled:cursor-not-allowed disabled:opacity-45",
        "active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        variant === "primary" && "bg-primary text-primary-fg",
        variant === "secondary" && "bg-heal text-primary-fg",
        variant === "outline" && "border border-line-strong bg-surface text-ink",
        variant === "accent" && "bg-accent text-accent-fg",
        variant === "ghost" && "bg-transparent text-muted",
        variant === "danger" && "border border-danger/30 bg-danger-soft text-danger",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-surface p-4 shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="mb-3 block">
      <span className="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-12 w-full rounded-md border border-line bg-surface px-3 text-base text-ink placeholder:text-subtle",
        "focus:border-primary focus:outline-none",
        props.className,
      )}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-md border border-line bg-surface px-3 py-3 text-base text-ink placeholder:text-subtle",
        "focus:border-primary focus:outline-none",
        props.className,
      )}
    />
  );
}

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "ok" | "warn" | "danger" | "primary";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tone === "neutral" && "bg-bg-warm text-muted",
        tone === "ok" && "bg-ok-soft text-ok",
        tone === "warn" && "bg-warn-soft text-warn",
        tone === "danger" && "bg-danger-soft text-danger",
        tone === "primary" && "bg-primary-soft text-primary",
      )}
    >
      {children}
    </span>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-md", className)} />;
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <Card className="py-8 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-bg-warm text-muted">
        <Inbox className="size-5" strokeWidth={1.6} />
      </div>
      <h3 className="font-display text-lg text-ink">{title}</h3>
      <p className="mx-auto mt-1 max-w-xs text-sm leading-relaxed text-muted">{body}</p>
      {action ? <div className="mx-auto mt-4 max-w-xs">{action}</div> : null}
    </Card>
  );
}

export function ErrorBanner({
  title,
  body,
  onRetry,
}: {
  title: string;
  body: string;
  onRetry?: () => void;
}) {
  return (
    <div className="mb-3 rounded-lg border border-danger/25 bg-danger-soft px-3 py-3">
      <p className="text-sm font-semibold text-danger">{title}</p>
      <p className="mt-0.5 text-sm text-ink/80">{body}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 text-sm font-semibold text-danger underline underline-offset-2"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function ScreenHead({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
}) {
  return (
    <div className="mb-5 flex min-h-11 items-center justify-between gap-3">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex h-11 w-11 items-center justify-center rounded-md text-primary"
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      ) : (
        <span className="w-11" />
      )}
      <h1 className="flex-1 text-center font-display text-xl font-medium tracking-tight">
        {title}
      </h1>
      <div className="flex min-w-11 justify-end">{right}</div>
    </div>
  );
}
