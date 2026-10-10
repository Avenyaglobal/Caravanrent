export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  pickup: string;
  from: string;
  to: string;
  guests: number;
  message: string;
  createdAt: string;
};

const KEY = "cra-inquiries";

export function loadInquiries(): Inquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Inquiry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveInquiry(entry: Omit<Inquiry, "id" | "createdAt">) {
  const next: Inquiry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const all = [next, ...loadInquiries()];
  localStorage.setItem(KEY, JSON.stringify(all));
  return next;
}

export function removeInquiry(id: string) {
  const all = loadInquiries().filter((item) => item.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}
