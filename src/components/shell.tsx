import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/#how", label: "How it works" },
  { href: "/#aboutus", label: "About us" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contact", label: "Сontacts" },
];

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [cookies, setCookies] = useState(true);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    setCookies(localStorage.getItem("cra-cookies") === "1");
  }, []);

  function dismissCookies() {
    localStorage.setItem("cra-cookies", "1");
    setCookies(true);
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-30 border-b border-line bg-header">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/" className="shrink-0">
            <img src="/photos/real/cr-logo-2.png" alt="Caravan Rent Alicante" className="h-14 w-auto" />
          </Link>
          <nav className="hidden items-center gap-5 lg:flex">
            {nav.map((item) => {
              const active = item.href === "/" && pathname === "/";
              const className = `text-sm font-semibold uppercase tracking-wide hover:text-clay ${active ? "text-clay" : "text-ink/80"}`;
              return item.href.startsWith("/#") ? (
                <a key={item.label} href={item.href} className={className}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.href} className={className}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-foam lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5 text-ink" /> : <Menu className="size-5 text-ink" />}
          </button>
        </div>
        {open && (
          <nav className="border-t border-line bg-foam px-5 py-2 lg:hidden">
            {nav.map((item) =>
              item.href.startsWith("/#") ? (
                <a key={item.label} href={item.href} className="block py-3 text-sm font-semibold uppercase text-ink" onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.href} className="block py-3 text-sm font-semibold uppercase text-ink">
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="bg-clay">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 py-5 text-sm text-foam">
          <p className="flex gap-3 font-bold">
            <Link to="/terms" className="text-[#127384]">
              Terms & Conditions
            </Link>
            <span>|</span>
            <Link to="/privacy" className="text-[#127384]">
              Privacy Policy
            </Link>
          </p>
          <p>Copyright 2024-2025 © Caravanrent-Alicante S.L., All Rights Reserved.</p>
        </div>
      </footer>
      <a
        href="https://wa.me/34607223726"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 inline-flex size-16 items-center justify-center rounded-full bg-clay text-foam shadow-lg"
        aria-label="Contact us"
      >
        <MessageCircle className="size-7" />
      </a>
      {!cookies && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-foam px-5 py-4 shadow-lg">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              This site uses cookies. See the{" "}
              <Link to="/privacy" className="font-medium text-clay">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex gap-2">
              <button type="button" className="h-10 rounded-md bg-clay px-4 text-sm text-foam" onClick={dismissCookies}>
                Accept
              </button>
              <button type="button" className="h-10 rounded-md bg-clay px-4 text-sm text-foam" onClick={dismissCookies}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
