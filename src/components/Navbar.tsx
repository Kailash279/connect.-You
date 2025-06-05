'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/stores', label: 'Find Stores' },
    { href: '/products', label: 'Products' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/shop/dashboard', label: 'Shop Dashboard' },
    { href: '/feedback', label: 'Feedback' },
    { href: '/signin', label: 'Sign In' },
  ];

  return (
    <nav className="bg-primary p-4 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold hover:text-blue-200 transition-colors">Connect You</Link>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-primary-dark touch-manipulation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-white px-3 py-2 rounded-md transition-colors ${
                isActive(href)
                  ? 'bg-primary-dark font-semibold'
                  : 'hover:bg-primary-dark/50'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`fixed top-16 left-0 right-0 bg-primary md:hidden transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex flex-col items-center py-2 shadow-lg">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-white py-3 w-full text-center ${
                  isActive(href)
                    ? 'bg-primary-dark font-semibold'
                    : 'hover:bg-primary-dark active:bg-primary-darker'
                } transition-colors`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}