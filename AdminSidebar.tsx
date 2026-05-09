"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminSidebar({children}: {children: React.ReactNode}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <span className="font-bold">Admin Panel</span>
        <button onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Overlay Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-gray-900 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-4 text-lg font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="p-4 space-y-2">
          <Link href="/admin/dashboard" className="block p-2 rounded hover:bg-gray-700">
            Dashboard
          </Link>
          <Link href="/admin/services" className="block p-2 rounded hover:bg-gray-700">
            Services
          </Link>
          <Link href="/admin/customer" className="block p-2 rounded hover:bg-gray-700">
           Customer
          </Link>
          <Link href="/admin/settings" className="block p-2 rounded hover:bg-gray-700">
            Settings
          </Link>
          <Link href="/admin/bills" className="block p-2 rounded hover:bg-gray-700">
            Bills
          </Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="md:ml-64 p-4">
        {children}
      </main>
    </>
  );
}