'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">Connect You</Link>
        
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
          <Link href="/" className="text-white hover:text-gray-200">Home</Link>
          <Link href="/stores" className="text-white hover:text-gray-200">Find Stores</Link>
          <Link href="/products" className="text-white hover:text-gray-200">Products</Link>
          <Link href="/feedback" className="text-white hover:text-gray-200">Feedback</Link>
          <Link href="/admin/analytics" className="text-white hover:text-gray-200">Admin Analytics</Link>
          <Link href="/shop/analytics" className="text-white hover:text-gray-200">Shop Analytics</Link>
          <Link href="/signin" className="text-white hover:text-gray-200">Sign In</Link>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`absolute top-16 left-0 right-0 bg-primary md:hidden transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex flex-col items-center py-2 shadow-lg">
            <Link href="/" className="text-white py-3 w-full text-center hover:bg-primary-dark active:bg-primary-darker transition-colors">Home</Link>
            <Link href="/stores" className="text-white py-3 w-full text-center hover:bg-primary-dark active:bg-primary-darker transition-colors">Find Stores</Link>
            <Link href="/products" className="text-white py-3 w-full text-center hover:bg-primary-dark active:bg-primary-darker transition-colors">Products</Link>
            <Link href="/feedback" className="text-white py-3 w-full text-center hover:bg-primary-dark active:bg-primary-darker transition-colors">Feedback</Link>
            <Link href="/signin" className="text-white py-3 w-full text-center hover:bg-primary-dark active:bg-primary-darker transition-colors">Sign In</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
