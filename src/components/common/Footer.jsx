import { CarFront } from "lucide-react";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* About */}
          <div>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ed1d26]">
                <CarFront size={21} className="text-[#fefefe]" />
              </div>

              <span className="text-xl font-bold tracking-tight text-[#07030e] dark:text-[#fefefe]">
                Go<span className="text-[#ed1d26]">Drive</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              Helping students and professionals achieve their goals through
              quality education and expert guidance.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-gray-700"
              >
                <FaFacebookF size={17} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-gray-700"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-gray-700"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-gray-700"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="ml-0 sm:ml-20">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Useful Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/explore-cars"
                  className="text-gray-400 transition hover:text-white"
                >
                  Explore Car
                </Link>
              </li>

              <li>
                <Link
                  href="/add-car"
                  className="text-gray-400 transition hover:text-white"
                >
                  Add Car
                </Link>
              </li>

              <li>
                <Link
                  href="/my-bookings"
                  className="text-gray-400 transition hover:text-white"
                >
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="ml-0 sm:ml-20">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact Information
            </h3>

            <ul className="mt-5 space-y-5 text-sm text-gray-400">
              {/* Address */}
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0" size={17} />

                <span>
                  123 Main Street,
                  <br />
                  Dhaka, Bangladesh
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3">
                <FaPhone className="shrink-0" size={15} />

                <a
                  href="tel:+8801234567890"
                  className="transition hover:text-white"
                >
                  +880 1234-567890
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <FaEnvelope className="shrink-0" size={16} />

                <a
                  href="mailto:info@example.com"
                  className="transition hover:text-white"
                >
                  info@godrive.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} GoDrive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
