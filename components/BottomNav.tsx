"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", icon: "🏠", label: "الرئيسية" },
  { href: "/flash", icon: "⚡", label: "البطاقات" },
  { href: "/words", icon: "📚", label: "الكلمات" },
  { href: "/schedule", icon: "📅", label: "الجدول" },
  { href: "/print", icon: "🖨️", label: "طباعة" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-brand-100 px-2 py-2 flex items-center justify-around z-50 md:hidden no-print shadow-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all min-w-[60px] ${
                isActive
                  ? "bg-brand-500 text-white"
                  : "text-brand-600 hover:bg-brand-50"
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className={`text-xs font-bold ${isActive ? "text-white" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-0 right-0 bottom-0 w-64 bg-white border-l-2 border-brand-100 flex-col py-8 px-4 z-50 no-print shadow-lg">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-brand-500 rounded-2xl flex items-center justify-center">
            <span className="text-white font-black text-lg">ن</span>
          </div>
          <span className="font-black text-brand-700 text-2xl">نور</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-lg ${
                  isActive
                    ? "bg-brand-500 text-white shadow-lg shadow-brand-200"
                    : "text-brand-700 hover:bg-brand-50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Settings at bottom */}
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-brand-600 hover:bg-brand-50 font-bold transition-all"
        >
          <span className="text-xl">⚙️</span>
          <span>الإعدادات</span>
        </Link>
      </aside>
    </>
  );
}
