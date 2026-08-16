export type Category = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

export type Subcategory = {
  slug: string;
  category: string;
  name: string;
};

export type Service = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  duration: string;
  image: string;
  shopId: string;
  tag?: string;
  blurb: string;
  includes: string[];
  excludes: string[];
  suitable: string;
  rating: number;
  reviews: number;
  quoteOnly?: boolean;
};

export type Shop = {
  id: string;
  name: string;
  kind: "Agency" | "Lab" | "Hospital" | "Clinic";
  city: string;
  rating: number;
  image: string;
  about: string;
};

export type Caregiver = {
  id: string;
  name: string;
  role: string;
  years: number;
  rating: number;
  shopId: string;
  languages: string[];
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  credits: number;
  highlight?: boolean;
  perks: string[];
};

export type Parent = {
  id: "sunita" | "harish";
  name: string;
  age: number;
  city: string;
  relation: string;
};

export const categories: Category[] = [
  { slug: "health", name: "Health at home", blurb: "Nurses, physio, vitals", image: "/brand/nurse.jpg" },
  { slug: "companion", name: "Companionship", blurb: "A dost for the day", image: "/brand/companion.jpg" },
  { slug: "diagnostics", name: "Diagnostics", blurb: "From Rs 499 at home", image: "/brand/diag.jpg" },
  { slug: "daily", name: "Daily help", blurb: "Meals, meds, errands", image: "/brand/daily.jpg" },
  { slug: "hospital", name: "Hospital & travel", blurb: "Pickup, wait, admit", image: "/brand/hospital.jpg" },
  { slug: "ayurveda", name: "Ayurveda", blurb: "Quoted, never guessed", image: "/brand/diag.jpg" },
];

export const subcategories: Subcategory[] = [
  { slug: "nurse-visit", category: "health", name: "Nurse visits" },
  { slug: "physio", category: "health", name: "Physiotherapy" },
  { slug: "post-op", category: "health", name: "Post-operative" },
  { slug: "sit", category: "companion", name: "Sit-with" },
  { slug: "walk", category: "companion", name: "Walks & outings" },
  { slug: "blood", category: "diagnostics", name: "Blood tests" },
  { slug: "full-body", category: "diagnostics", name: "Full body" },
  { slug: "meals", category: "daily", name: "Meals" },
  { slug: "meds", category: "daily", name: "Medication" },
  { slug: "pickup", category: "hospital", name: "Pickup & drop" },
  { slug: "admit", category: "hospital", name: "Admission help" },
  { slug: "panchakarma", category: "ayurveda", name: "Panchakarma" },
];

export const shops: Shop[] = [
  {
    id: "mitra",
    name: "Mitra Home Nursing",
    kind: "Agency",
    city: "Delhi NCR",
    rating: 4.8,
    image: "/brand/nurse.jpg",
    about: "Background-checked nurses and companions. 6-year partner.",
  },
  {
    id: "niramaya",
    name: "Niramaya Diagnostics",
    kind: "Lab",
    city: "Delhi · Mumbai · Bengaluru",
    rating: 4.7,
    image: "/brand/diag.jpg",
    about: "NABL-aligned home collection. Reports the same evening.",
  },
  {
    id: "kalyan",
    name: "Kalyan Memorial",
    kind: "Hospital",
    city: "South Delhi",
    rating: 4.6,
    image: "/brand/hospital.jpg",
    about: "Orthopaedics and geriatrics. SevaCare handles coordination.",
  },
  {
    id: "annapurna",
    name: "Annapurna Kitchen",
    kind: "Agency",
    city: "Delhi NCR",
    rating: 4.9,
    image: "/brand/daily.jpg",
    about: "Home-style meals, timed to medicines. Low-salt and diabetic menus.",
  },
  {
    id: "vriksha",
    name: "Vriksha Ayurveda",
    kind: "Clinic",
    city: "On request",
    rating: 4.5,
    image: "/brand/companion.jpg",
    about: "Physician-led plans. Every treatment is quoted, never listed as a fixed SKU.",
  },
];

export const services: Service[] = [
  {
    id: "diag-499",
    name: "Basic diagnostic at home",
    category: "diagnostics",
    subcategory: "blood",
    price: 499,
    duration: "30–40 min",
    image: "/brand/diag.jpg",
    shopId: "niramaya",
    tag: "Most booked",
    blurb: "CBC, sugar, BP, and a written note a family member can actually read.",
    includes: ["Phlebotomist visit", "8-parameter panel", "Digital report", "Care Manager summary"],
    excludes: ["Specialist consult", "Fasting extras"],
    suitable: "Annual check or a first look after travel.",
    rating: 4.8,
    reviews: 2140,
  },
  {
    id: "nurse-1",
    name: "Nurse visit, 90 minutes",
    category: "health",
    subcategory: "nurse-visit",
    price: 1299,
    duration: "90 min",
    image: "/brand/nurse.jpg",
    shopId: "mitra",
    tag: "Verified",
    blurb: "Vitals, medicines, dressing, and a photo update sent to the family.",
    includes: ["Registered nurse", "Vitals log", "Photo proof", "WhatsApp note"],
    excludes: ["IV / injections unless prescribed"],
    suitable: "Weekly monitoring or post-clinic days.",
    rating: 4.9,
    reviews: 986,
  },
  {
    id: "nurse-4",
    name: "Nurse pack of 4",
    category: "health",
    subcategory: "nurse-visit",
    price: 3999,
    duration: "4 × 90 min",
    image: "/brand/nurse.jpg",
    shopId: "mitra",
    tag: "Save 23%",
    blurb: "Same nurse when possible. Use within 30 days.",
    includes: ["Four visits", "Preferred caregiver", "Shared care log"],
    excludes: ["Night duty"],
    suitable: "A month of check-ins without a subscription.",
    rating: 4.8,
    reviews: 412,
  },
  {
    id: "physio-1",
    name: "Home physiotherapy",
    category: "health",
    subcategory: "physio",
    price: 1499,
    duration: "45 min",
    image: "/brand/nurse.jpg",
    shopId: "mitra",
    blurb: "Knee, hip, and post-stroke sessions designed for a living room.",
    includes: ["Licensed PT", "Exercise sheet", "Progress note"],
    excludes: ["Equipment rental"],
    suitable: "Knee replacement recovery, stiffness, balance.",
    rating: 4.7,
    reviews: 301,
  },
  {
    id: "companion-2",
    name: "Companion, 2 hours",
    category: "companion",
    subcategory: "sit",
    price: 899,
    duration: "2 hrs",
    image: "/brand/companion.jpg",
    shopId: "mitra",
    tag: "Like a dost",
    blurb: "Conversation, a walk in the colony, tea, and no rushing.",
    includes: ["Verified companion", "Check-in call", "Photo at start and end"],
    excludes: ["Medical procedures"],
    suitable: "Lonely afternoons, NRI weekdays.",
    rating: 4.9,
    reviews: 1578,
  },
  {
    id: "companion-day",
    name: "Day companion, 6 hours",
    category: "companion",
    subcategory: "sit",
    price: 2299,
    duration: "6 hrs",
    image: "/brand/companion.jpg",
    shopId: "mitra",
    blurb: "A full day of company while you are in meetings or another city.",
    includes: ["Meals assistance", "Walks", "Family mid-day update"],
    excludes: ["Overnight"],
    suitable: "Office days, travel days.",
    rating: 4.8,
    reviews: 640,
  },
  {
    id: "walk-park",
    name: "Morning park walk",
    category: "companion",
    subcategory: "walk",
    price: 699,
    duration: "60 min",
    image: "/brand/companion.jpg",
    shopId: "mitra",
    blurb: "Slow walk, water, and a return home. Timed before breakfast medicines.",
    includes: ["Companion", "Route confirmation", "Fall-aware pacing"],
    excludes: ["Transport beyond 1 km"],
    suitable: "Daily routine, diabetes walks.",
    rating: 4.8,
    reviews: 220,
  },
  {
    id: "meals-week",
    name: "Lunch delivery, 7 days",
    category: "daily",
    subcategory: "meals",
    price: 2499,
    duration: "1 week",
    image: "/brand/daily.jpg",
    shopId: "annapurna",
    tag: "Timed to meds",
    blurb: "Home-style thali. Salt and spice set to the senior’s chart.",
    includes: ["7 lunches", "11:30–12:30 window", "Disposable or steel"],
    excludes: ["Dinner"],
    suitable: "When the kitchen is too much.",
    rating: 4.9,
    reviews: 188,
  },
  {
    id: "meds-daily",
    name: "Medicine reminder visit",
    category: "daily",
    subcategory: "meds",
    price: 449,
    duration: "20 min",
    image: "/brand/daily.jpg",
    shopId: "mitra",
    blurb: "Someone at the door when the strip is confusing.",
    includes: ["In-person prompt", "Log in the app", "Missed-dose alert"],
    excludes: ["Purchasing medicines"],
    suitable: "Polypharmacy, early dementia.",
    rating: 4.6,
    reviews: 94,
  },
  {
    id: "pickup-clinic",
    name: "Clinic pickup and wait",
    category: "hospital",
    subcategory: "pickup",
    price: 1799,
    duration: "3–4 hrs",
    image: "/brand/hospital.jpg",
    shopId: "mitra",
    blurb: "Cab, companion, file folder, and someone who waits through the queue.",
    includes: ["AC cab", "Companion", "Token handling", "Return home"],
    excludes: ["Consultation fees"],
    suitable: "Eye, ortho, dialysis days.",
    rating: 4.8,
    reviews: 733,
  },
  {
    id: "admit-coord",
    name: "Admission coordination",
    category: "hospital",
    subcategory: "admit",
    price: 4999,
    duration: "Day of admit",
    image: "/brand/hospital.jpg",
    shopId: "kalyan",
    tag: "Care Manager",
    blurb: "Beds, documents, and a human who stays until the family can land.",
    includes: ["Hospital liaison", "Document checklist", "Live family updates"],
    excludes: ["Hospital bills"],
    suitable: "Planned surgery, emergency admit.",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "ayur-consult",
    name: "Ayurvedic home consult",
    category: "ayurveda",
    subcategory: "panchakarma",
    price: 0,
    duration: "Quoted",
    image: "/brand/diag.jpg",
    shopId: "vriksha",
    quoteOnly: true,
    blurb: "Physician reviews history, then we quote. No invented prices.",
    includes: ["Physician review", "Written plan", "Medicine list if any"],
    excludes: ["Panchakarma until quoted"],
    suitable: "Joints, sleep, digestion.",
    rating: 4.5,
    reviews: 67,
  },
];

export const caregivers: Caregiver[] = [
  { id: "priya", name: "Priya Nair", role: "Nurse", years: 5, rating: 4.8, shopId: "mitra", languages: ["Hindi", "English", "Malayalam"] },
  { id: "imran", name: "Imran Sheikh", role: "Companion", years: 3, rating: 4.9, shopId: "mitra", languages: ["Hindi", "Urdu"] },
  { id: "meera", name: "Meera Joshi", role: "Companion", years: 4, rating: 4.7, shopId: "mitra", languages: ["Hindi", "Marathi"] },
  { id: "dev", name: "Devika Rao", role: "Physiotherapist", years: 8, rating: 4.9, shopId: "mitra", languages: ["Hindi", "English", "Kannada"] },
  { id: "lab", name: "Niramaya team", role: "Phlebotomist", years: 6, rating: 4.7, shopId: "niramaya", languages: ["Hindi", "English"] },
];

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 2999,
    credits: 1500,
    perks: ["4 Care Manager check-ins", "1 nurse visit credit", "Priority booking"],
  },
  {
    id: "plus",
    name: "Care Plus",
    price: 4999,
    credits: 3500,
    highlight: true,
    perks: ["Dedicated Care Manager", "Weekly visit credit", "WhatsApp for NRI", "Photo proofs"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 9999,
    credits: 7000,
    perks: ["Daily option", "Surgery coordination", "International travel desk", "After-life opt-in"],
  },
];

export const parents: Parent[] = [
  { id: "sunita", name: "Sunita Sharma", age: 72, city: "Green Park, Delhi", relation: "Mother" },
  { id: "harish", name: "Harish Sharma", age: 76, city: "Green Park, Delhi", relation: "Father" },
];

export const reviews = [
  { id: "r1", serviceId: "companion-2", name: "Rahul, Dubai", text: "Imran sat with my mother through the afternoon. The photo at 4pm was the first time I exhaled that week." },
  { id: "r2", serviceId: "diag-499", name: "Ananya, Bengaluru", text: "Report by evening. Care Manager called to explain the sugar number without scaring her." },
  { id: "r3", serviceId: "nurse-1", name: "Priya, London", text: "Same nurse twice. Dressing was clean. They waited until she finished her tea." },
];

export function inr(n: number) {
  return `Rs ${n.toLocaleString("en-IN")}`;
}

export function serviceById(id: string) {
  return services.find((s) => s.id === id);
}

export function shopById(id: string) {
  return shops.find((s) => s.id === id);
}

export function servicesForCategory(slug: string) {
  return services.filter((s) => s.category === slug);
}

export function servicesForShop(id: string) {
  return services.filter((s) => s.shopId === id);
}

export const slots = [
  { id: "d1m", label: "Tomorrow", time: "9:00 – 11:00" },
  { id: "d1a", label: "Tomorrow", time: "12:00 – 14:00" },
  { id: "d1e", label: "Tomorrow", time: "16:00 – 18:00" },
  { id: "d2m", label: "Tue 18 Aug", time: "9:00 – 11:00" },
  { id: "d2a", label: "Tue 18 Aug", time: "12:00 – 14:00" },
  { id: "d3m", label: "Wed 19 Aug", time: "10:00 – 12:00" },
];
