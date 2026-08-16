import { Banknote, Briefcase, CircleUser, MapPin } from "lucide-react";
import { Badge, Button, Card, EmptyState, ErrorBanner, ScreenHead, Skeleton } from "@/components/ui";
import { useDesk } from "@/lib/desk";
import { useShop } from "@/lib/store";

function ProvNav({ active }: { active: "jobs" | "earnings" | "profile" }) {
  const go = useDesk((s) => s.goProvider);
  const item = (id: typeof active, label: string, Icon: typeof Briefcase) => (
    <button
      type="button"
      onClick={() => go(id)}
      className={`flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium ${active === id ? "text-primary" : "text-subtle"}`}
    >
      <Icon className="size-5" strokeWidth={1.75} />
      {label}
    </button>
  );
  return (
    <nav className="absolute inset-x-0 bottom-0 flex border-t border-line bg-surface px-1 pb-4 pt-1">
      {item("jobs", "Jobs", Briefcase)}
      {item("earnings", "Earnings", Banknote)}
      {item("profile", "Profile", CircleUser)}
    </nav>
  );
}

export function ProviderApp() {
  const screen = useDesk((s) => s.providerScreen);
  const demo = useShop((s) => s.demo);
  const go = useDesk((s) => s.goProvider);
  const available = useDesk((s) => s.available);
  const toggle = useDesk((s) => s.toggleAvailable);
  const accept = useDesk((s) => s.acceptJob);
  const jobAccepted = useDesk((s) => s.jobAccepted);
  const jobStep = useDesk((s) => s.jobStep);
  const advance = useDesk((s) => s.advanceJob);

  if (screen === "jobs") {
    return (
      <div className="pb-20">
        <ScreenHead title="Jobs" />
        <div className="mb-4 flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3">
          <div>
            <p className="text-sm font-semibold">Available for jobs</p>
            <p className="text-xs text-muted">{available ? "Matching is on" : "You will not receive new jobs"}</p>
          </div>
          <button
            type="button"
            onClick={toggle}
            className={`h-8 w-14 rounded-full p-1 ${available ? "bg-heal" : "bg-line-strong"}`}
            aria-pressed={available}
          >
            <span
              className={`block size-6 rounded-full bg-surface transition-transform ${available ? "translate-x-6" : ""}`}
            />
          </button>
        </div>

        {demo === "loading" ? (
          <div className="space-y-3">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
        ) : demo === "empty" || !available ? (
          <EmptyState
            title={!available ? "You are offline" : "No jobs nearby"}
            body={
              !available
                ? "Turn availability on to receive nurse and companion requests."
                : "We will notify you when a family in your area needs help."
            }
          />
        ) : demo === "error" ? (
          <ErrorBanner title="Could not load jobs" body="Check your connection. Pull to retry." />
        ) : (
          <Card>
            <div className="mb-2 flex items-center justify-between">
              <Badge tone="primary">Nurse visit</Badge>
              <span className="text-sm font-semibold">Rs 980</span>
            </div>
            <p className="font-semibold">Sunita Sharma, 72</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted">
              <MapPin className="size-3.5" /> Green Park, 2.1 km · Tomorrow 11:00
            </p>
            <p className="mt-2 text-sm text-muted">Post-op vitals, medication reminder. Ground floor.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline">Decline</Button>
              <Button onClick={() => go("job")}>View</Button>
            </div>
          </Card>
        )}
        <ProvNav active="jobs" />
      </div>
    );
  }

  if (screen === "job") {
    return (
      <div>
        <ScreenHead title="Job detail" onBack={() => go("jobs")} />
        {demo === "error" ? (
          <ErrorBanner title="This job was taken" body="Another provider accepted it a moment ago." />
        ) : null}
        <Card className="mb-3">
          <p className="text-xs text-muted">Senior</p>
          <p className="font-semibold">Sunita Sharma, 72</p>
          <p className="mt-1 text-sm text-muted">Green Park, Delhi · Ground floor · Near Mother Dairy</p>
        </Card>
        <Card className="mb-3">
          <p className="text-xs text-muted">Notes</p>
          <p className="text-sm">Check BP, give morning medicines, stay 90 minutes. Family is NRI — send a photo after arrival.</p>
        </Card>
        <Card className="mb-4">
          <p className="text-xs text-muted">Payout</p>
          <p className="font-display text-2xl">Rs 980</p>
        </Card>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => go("jobs")}>
            Decline
          </Button>
          <Button disabled={demo === "error"} onClick={accept}>
            Accept job
          </Button>
        </div>
      </div>
    );
  }

  if (screen === "active") {
    const labels = ["Accepted", "On the way", "Arrived", "Completed"];
    return (
      <div>
        <ScreenHead title="Active visit" onBack={() => go("jobs")} />
        {!jobAccepted ? (
          <EmptyState title="No active visit" body="Accept a job from the feed first." />
        ) : (
          <>
            <Card className="mb-4">
              <p className="font-semibold">Sunita Sharma</p>
              <p className="text-sm text-muted">12, Green Park · Tomorrow 11:00</p>
            </Card>
            <ol className="mb-4 space-y-3">
              {labels.map((l, i) => (
                <li key={l} className="flex items-center gap-3 text-sm">
                  <span className={`size-3 rounded-full ${i <= jobStep ? "bg-heal" : "bg-line-strong"}`} />
                  <span className={i <= jobStep ? "font-semibold" : "text-muted"}>{l}</span>
                </li>
              ))}
            </ol>
            {demo === "error" && jobStep === 3 ? (
              <ErrorBanner title="Photo required" body="Upload proof before marking complete." />
            ) : null}
            {jobStep < 3 ? (
              <Button onClick={advance}>Mark {labels[jobStep + 1]?.toLowerCase()}</Button>
            ) : (
              <>
                <Button variant="outline" className="mb-2">
                  Upload visit photo
                </Button>
                <Button disabled={demo === "error"} onClick={() => go("earnings")}>
                  Complete visit
                </Button>
              </>
            )}
          </>
        )}
      </div>
    );
  }

  if (screen === "earnings") {
    return (
      <div className="pb-20">
        <ScreenHead title="Earnings" />
        {demo === "empty" ? (
          <EmptyState title="No payouts yet" body="Complete a visit to see it here." />
        ) : demo === "loading" ? (
          <Skeleton className="h-32" />
        ) : (
          <>
            <Card className="mb-4 text-center">
              <p className="text-xs text-muted">This week</p>
              <p className="font-display text-4xl">Rs 4,820</p>
              <p className="mt-1 text-sm text-muted">Settles every Friday</p>
            </Card>
            <Card className="mb-2 flex justify-between text-sm">
              <span>Nurse · Green Park</span>
              <span>Rs 980</span>
            </Card>
            <Card className="flex justify-between text-sm">
              <span>Companion · Defence Colony</span>
              <span>Rs 720</span>
            </Card>
          </>
        )}
        <ProvNav active="earnings" />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <ScreenHead title="Profile" />
      <Card className="mb-3">
        <p className="font-semibold">Priya Nair</p>
        <p className="text-sm text-muted">Nurse · Delhi South</p>
        <div className="mt-2">
          <Badge tone="ok">Verified</Badge>
        </div>
      </Card>
      <Card>
        <p className="text-sm font-semibold">Documents</p>
        <p className="mt-1 text-sm text-muted">Aadhaar, nursing certificate, police verification — approved.</p>
      </Card>
      <ProvNav active="profile" />
    </div>
  );
}
