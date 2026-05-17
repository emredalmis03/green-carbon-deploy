"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  Target,
  FileText,
  Leaf,
  Menu,
  X,
  Map
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analiz", href: "/analysis", icon: BarChart3 },
  { name: "Öneriler", href: "/recommendations", icon: Lightbulb },
  { name: "Risk Haritası", href: "/risk-map", icon: Map },
  { name: "Ayarlar", href: "/settings", icon: Target },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <Link href="/" className="p-6 flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-sm">
              <Leaf className="w-6 h-6 fill-current" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tighter leading-none">Green <span className="text-green-600">Carbon</span></span>
          </Link>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-green-600" : "text-gray-400")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 font-medium text-center uppercase tracking-widest">
              Developed by Tulpar Team
            </p>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
