"use client";

import Link from "next/link";
import { Menu, X, CarFront } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Cars", href: "/explore-cars" },
    { name: "Add Car", href: "/add-car" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md dark:border-white/10 dark:bg-[#07030e]/95">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ed1d26]">
            <CarFront size={21} className="text-[#fefefe]" />
          </div>

          <span className="text-xl font-bold tracking-tight text-[#07030e] dark:text-[#fefefe]">
            Go<span className="text-[#ed1d26]">Drive</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-700 transition hover:text-[#ed1d26] dark:text-white/80 dark:hover:text-[#ed1d26]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <Link
            href="/login"
            className="rounded-lg bg-[#ed1d26] px-5 py-2.5 text-sm font-semibold text-[#fefefe] transition hover:bg-[#c9151d]"
          >
            Login
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-[#07030e] dark:border-white/10 dark:text-[#fefefe]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pb-5 pt-4 dark:border-white/10 dark:bg-[#07030e] md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-[#ed1d26] dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-[#ed1d26]"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-lg bg-[#ed1d26] px-4 py-3 text-center text-sm font-semibold text-[#fefefe] transition hover:bg-[#c9151d]"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
