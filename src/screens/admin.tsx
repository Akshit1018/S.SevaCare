import { Badge, Button, Card, EmptyState, ErrorBanner, Field, Input, Skeleton, Textarea } from "@/components/ui";
import { useDesk } from "@/lib/desk";
import { useShop } from "@/lib/store";

const nav = [
  ["dashboard", "Overview"],
  ["queue", "Quote queue"],
  ["bookings", "Bookings"],
  ["providers", "Providers"],
  ["pricing", "Pricing"],
] as const;

export function AdminApp() {
  const screen = useDesk((s) => s.adminScreen);
  const go = useDesk((s) => s.goAdmin);
  const demo = useShop((s) => s.demo);
  const quoteDraft = useDesk((s) => s.quoteDraft);
  const setQuoteDraft = useDesk((s) => s.setQuoteDraft);
  const quoteAmount = useDesk((s) => s.quoteAmount);
  const setQuoteAmount = useDesk((s) => s.setQuoteAmount);

  return (
    <div className="flex min-h-[640px] flex-col md:min-h-[720px] md:flex-row">
      <aside className="border-b border-line bg-surface-2 p-4 md:w-52 md:border-r md:border-b-0">
        <p className="font-display text-lg">SevaCare Ops</p>
        <p className="mb-4 text-xs text-muted">Care Manager desk</p>
        <nav className="flex gap-1 overflow-x-auto md:flex-col">
          {nav.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              className={`rounded-md px-3 py-2 text-left text-sm whitespace-nowrap ${
                screen === id ? "bg-primary text-primary-fg" : "text-muted hover:bg-bg-warm"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="flex-1 p-4 md:p-6">
        {screen === "dashboard" && (
          <>
            <h2 className="font-display text-2xl">Today</h2>
            {demo === "loading" ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </div>
            ) : (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Card>
                  <p className="text-xs text-muted">Open quotes</p>
                  <p className="font-display text-3xl">{demo === "empty" ? "0" : "7"}</p>
                </Card>
                <Card>
                  <p className="text-xs text-muted">Live visits</p>
                  <p className="font-display text-3xl">{demo === "empty" ? "0" : "12"}</p>
                </Card>
                <Card>
                  <p className="text-xs text-muted">Providers on</p>
                  <p className="font-display text-3xl">{demo === "empty" ? "0" : "34"}</p>
                </Card>
              </div>
            )}
            {demo === "error" ? (
              <div className="mt-4">
                <ErrorBanner title="Metrics delayed" body="Bookings are still flowing. Refresh the desk." />
              </div>
            ) : null}
            <button type="button" onClick={() => go("queue")} className="mt-6 text-sm font-semibold text-primary">
              Open quote queue
            </button>
          </>
        )}

        {screen === "queue" && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl">Quote queue</h2>
              <Badge tone="warn">SLA 30 min</Badge>
            </div>
            {demo === "loading" ? (
              <div className="space-y-3">
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
              </div>
            ) : demo === "empty" ? (
              <EmptyState
                title="Queue is clear"
                body="New custom requests from families will land here for a Care Manager quote."
              />
            ) : (
              <div className="space-y-3">
                {demo === "error" ? (
                  <ErrorBanner title="Queue sync failed" body="Showing last known requests." />
                ) : null}
                {[
                  { who: "Rahul · for Sunita", need: "Eye checkup + wait", wait: "8 min" },
                  { who: "Ananya · for father", need: "Weekend companion, 4 hrs", wait: "19 min" },
                  { who: "Self · Mr. Iyer", need: "Ayurvedic home consult", wait: "26 min" },
                ].map((row) => (
                  <Card key={row.need} className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{row.who}</p>
                      <p className="text-sm text-muted">{row.need}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-warn">{row.wait}</span>
                      <Button className="w-auto min-h-10 px-4" onClick={() => go("quote")}>
                        Quote
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {screen === "quote" && (
          <>
            <button type="button" className="mb-3 text-sm font-semibold text-primary" onClick={() => go("queue")}>
              Back to queue
            </button>
            <h2 className="font-display text-2xl">Create quote</h2>
            <p className="mt-1 mb-4 text-sm text-muted">Rahul Sharma · Sunita · Delhi</p>
            {demo === "error" ? (
              <ErrorBanner title="Could not send quote" body="Amount must be greater than zero." />
            ) : null}
            <Field label="Amount (INR)">
              <Input value={quoteAmount} onChange={(e) => setQuoteAmount(e.target.value)} />
            </Field>
            <Field label="What is included">
              <Textarea rows={4} value={quoteDraft} onChange={(e) => setQuoteDraft(e.target.value)} />
            </Field>
            <Field label="Valid for">
              <Input defaultValue="24 hours" />
            </Field>
            <div className="flex max-w-sm gap-2">
              <Button onClick={() => go("queue")}>Send quote</Button>
              <Button variant="outline" onClick={() => go("queue")}>
                Cancel
              </Button>
            </div>
          </>
        )}

        {screen === "bookings" && (
          <>
            <h2 className="mb-4 font-display text-2xl">Bookings</h2>
            {demo === "empty" ? (
              <EmptyState title="No live bookings" body="Assigned visits will appear here for reassignment." />
            ) : (
              <Card className="overflow-x-auto p-0">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="border-b border-line text-xs tracking-wide text-muted uppercase">
                    <tr>
                      <th className="px-4 py-3">Senior</th>
                      <th className="px-4 py-3">Service</th>
                      <th className="px-4 py-3">Provider</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-line">
                      <td className="px-4 py-3">Sunita Sharma</td>
                      <td className="px-4 py-3">Nurse</td>
                      <td className="px-4 py-3">Priya Nair</td>
                      <td className="px-4 py-3">
                        <Badge tone="ok">Assigned</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <button type="button" className="font-semibold text-primary">
                          Reassign
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">K. Iyer</td>
                      <td className="px-4 py-3">Companion</td>
                      <td className="px-4 py-3">—</td>
                      <td className="px-4 py-3">
                        <Badge tone="warn">Finding</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <button type="button" className="font-semibold text-primary">
                          Assign
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            )}
          </>
        )}

        {screen === "providers" && (
          <>
            <h2 className="mb-4 font-display text-2xl">Provider verification</h2>
            {demo === "empty" ? (
              <EmptyState title="No pending checks" body="New nurses and companions wait here after document upload." />
            ) : (
              <Card className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">Meera Joshi</p>
                  <p className="text-sm text-muted">Companion · Pune · Aadhaar + police check uploaded</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="w-auto min-h-10">
                    Reject
                  </Button>
                  <Button className="w-auto min-h-10">Approve</Button>
                </div>
              </Card>
            )}
          </>
        )}

        {screen === "pricing" && (
          <>
            <h2 className="mb-4 font-display text-2xl">Catalog pricing</h2>
            <Card className="space-y-3">
              {[
                { n: "Basic diagnostic", p: "499", fixed: true },
                { n: "Nurse visit", p: "1299", fixed: true },
                { n: "Companion 2 hrs", p: "899", fixed: true },
                { n: "Ayurvedic consult", p: "—", fixed: false },
              ].map((row) => (
                <div key={row.n} className="flex items-center justify-between border-b border-line pb-2 last:border-0">
                  <div>
                    <p className="font-semibold">{row.n}</p>
                    <p className="text-xs text-muted">{row.fixed ? "Fixed package" : "Quote required"}</p>
                  </div>
                  <p className="font-display text-lg">{row.fixed ? `Rs ${row.p}` : "Quote"}</p>
                </div>
              ))}
            </Card>
          </>
        )}
      </section>
    </div>
  );
}

export default AdminApp;
