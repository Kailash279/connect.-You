'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface AnalyticsLayoutProps {
  children: ReactNode;
}

export default function AnalyticsLayout({ children }: AnalyticsLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Analytics Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex space-x-6 overflow-x-auto py-4">
            <Link 
              href="/analytics" 
              className="text-gray-600 hover:text-blue-600 whitespace-nowrap"
            >
              Platform Overview
            </Link>
            <Link 
              href="/admin/analytics" 
              className="text-gray-600 hover:text-blue-600 whitespace-nowrap"
            >
              Admin Analytics
            </Link>
            <Link 
              href="/shop/dashboard" 
              className="text-gray-600 hover:text-blue-600 whitespace-nowrap"
            >
              Shop Dashboard
            </Link>
            <Link 
              href="/shop/analytics" 
              className="text-gray-600 hover:text-blue-600 whitespace-nowrap"
            >
              Shop Analytics
            </Link>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-6">
        {children}
      </div>
    </div>
  );
}
