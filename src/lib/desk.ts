import { create } from "zustand";

export type ProviderScreen = "jobs" | "job" | "active" | "earnings" | "profile";
export type AdminScreen = "dashboard" | "queue" | "quote" | "bookings" | "providers" | "pricing";

type Desk = {
  providerScreen: ProviderScreen;
  adminScreen: AdminScreen;
  available: boolean;
  jobAccepted: boolean;
  jobStep: 0 | 1 | 2 | 3;
  quoteDraft: string;
  quoteAmount: string;
  goProvider: (providerScreen: ProviderScreen) => void;
  goAdmin: (adminScreen: AdminScreen) => void;
  toggleAvailable: () => void;
  acceptJob: () => void;
  advanceJob: () => void;
  setQuoteDraft: (v: string) => void;
  setQuoteAmount: (v: string) => void;
};

export const useDesk = create<Desk>((set) => ({
  providerScreen: "jobs",
  adminScreen: "dashboard",
  available: true,
  jobAccepted: false,
  jobStep: 0,
  quoteDraft: "Companion + cab for eye checkup. Includes 3 hours wait time.",
  quoteAmount: "1800",
  goProvider: (providerScreen) => set({ providerScreen }),
  goAdmin: (adminScreen) => set({ adminScreen }),
  toggleAvailable: () => set((s) => ({ available: !s.available })),
  acceptJob: () => set({ jobAccepted: true, jobStep: 0, providerScreen: "active" }),
  advanceJob: () =>
    set((s) => ({ jobStep: s.jobStep < 3 ? ((s.jobStep + 1) as Desk["jobStep"]) : s.jobStep })),
  setQuoteDraft: (quoteDraft) => set({ quoteDraft }),
  setQuoteAmount: (quoteAmount) => set({ quoteAmount }),
}));
