import { create } from "zustand";
import { serviceById } from "./catalog";

export type DemoState = "happy" | "empty" | "loading" | "error";
export type Recipient = "self" | "sunita" | "harish";

export type CartLine = {
  serviceId: string;
  qty: number;
  slotId?: string;
  recipient: Recipient;
};

export type Order = {
  id: string;
  serviceId: string;
  recipient: Recipient;
  slotLabel: string;
  status: "Booked" | "Assigned" | "On the way" | "Completed";
  total: number;
};

type Store = {
  demo: DemoState;
  recipient: Recipient;
  cart: CartLine[];
  orders: Order[];
  slotId: string;
  query: string;
  setDemo: (demo: DemoState) => void;
  setRecipient: (recipient: Recipient) => void;
  setSlot: (slotId: string) => void;
  setQuery: (query: string) => void;
  addToCart: (serviceId: string) => void;
  removeFromCart: (serviceId: string) => void;
  placeOrder: (serviceId: string) => Order | null;
};

export const useShop = create<Store>((set, get) => ({
  demo: "happy",
  recipient: "sunita",
  cart: [],
  orders: [
    {
      id: "SC-1842",
      serviceId: "nurse-1",
      recipient: "sunita",
      slotLabel: "Tomorrow · 9:00 – 11:00",
      status: "Assigned",
      total: 1299,
    },
  ],
  slotId: "d1m",
  query: "",
  setDemo: (demo) => set({ demo }),
  setRecipient: (recipient) => set({ recipient }),
  setSlot: (slotId) => set({ slotId }),
  setQuery: (query) => set({ query }),
  addToCart: (serviceId) =>
    set((s) => {
      const existing = s.cart.find((l) => l.serviceId === serviceId);
      if (existing) {
        return {
          cart: s.cart.map((l) =>
            l.serviceId === serviceId ? { ...l, qty: l.qty + 1 } : l,
          ),
        };
      }
      return {
        cart: [...s.cart, { serviceId, qty: 1, recipient: s.recipient, slotId: s.slotId }],
      };
    }),
  removeFromCart: (serviceId) =>
    set((s) => ({ cart: s.cart.filter((l) => l.serviceId !== serviceId) })),
  placeOrder: (serviceId) => {
    const svc = serviceById(serviceId);
    if (!svc || svc.quoteOnly) return null;
    const { recipient, slotId } = get();
    const slotLabel =
      slotId === "d1m"
        ? "Tomorrow · 9:00 – 11:00"
        : slotId === "d1a"
          ? "Tomorrow · 12:00 – 14:00"
          : "Tue 18 Aug · 9:00 – 11:00";
    const order: Order = {
      id: `SC-${1800 + get().orders.length + 1}`,
      serviceId,
      recipient,
      slotLabel,
      status: "Booked",
      total: svc.price,
    };
    set((s) => ({
      orders: [order, ...s.orders],
      cart: s.cart.filter((l) => l.serviceId !== serviceId),
    }));
    return order;
  },
}));
