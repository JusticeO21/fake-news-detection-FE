"use client"
import React, { useState, ReactNode } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image"

interface NavLink {
  label: string;
  href: string;
  onClick?: () => void;
}

interface NavbarProps {
  logo: string | ReactNode;
  links?: NavLink[];
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ logo, links, className = "" }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => setIsOpen(!isOpen);

  return (
    <nav className={`bg-[#252f41] shadow-md ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink">
            {typeof logo === "string" ? (
              <Image src={logo} alt="Logo" className="h-8 w-auto" />
            ) : (
              logo
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {links?.map((link: NavLink, index: number) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links?.map((link: NavLink, index: number) => (
              <a
                key={index}
                href={link.href}
                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                  setIsOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
