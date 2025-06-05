'use client';

import Link from 'next/link';
import Image from 'next/image';
import Map from '@/components/Map';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Connect with Local Stores in Your Community
              </h1>
              <p className="text-xl mb-8">
                Discover and support local businesses while enjoying convenient shopping experiences.
              </p>
              <Link 
                href="/stores" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Find Stores
              </Link>
            </div>
            <div className="relative h-64 md:h-96">
              <Image
                src="/shopping-illustration.png"
                alt="Shopping Illustration"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Connect You?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Discovery</h3>
              <p className="text-gray-600">Find the best local stores near you with our advanced search features.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Shopping</h3>
              <p className="text-gray-600">Browse products and place orders with just a few clicks.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">Support local businesses and help your community thrive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Owners Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-64 md:h-96">
              <Image
                src="/store-owner-illustration.png"
                alt="Store Owner Illustration"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Are You a Store Owner?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join our platform to reach more customers and grow your business with powerful analytics and management tools.
              </p>
              <Link 
                href="/signin" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/*
              Testimonials data can be fetched from an API or a CMS in a real-world scenario.
              For this example, we are using static data.
            */}
            {/*
              {
                text: "Connect You has helped my store reach so many new customers. The analytics tools are fantastic!",
                author: "Sarah Johnson",
                role: "Store Owner"
              },
              {
                text: "I love being able to discover and support local businesses in my area. Great platform!",
                author: "Michael Chen",
                role: "Customer"
              },
              {
                text: "The platform is easy to use and has really helped my business grow in the community.",
                author: "David Smith",
                role: "Store Owner"
              }
            */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">&quot;This is a fantastic service that has connected me with so many local customers. Highly recommend!&quot;</p>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-blue-600">Local Business Owner</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Explore Stores Near You</h2>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Map searchQuery="" selectedType="" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:-translate-y-1 transition-transform">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Shopping</h3>
              <p className="text-gray-600">Connect with local stores and shop from the comfort of your home.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transform hover:-translate-y-1 transition-transform">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Store Analytics</h3>
              <p className="text-gray-600">Get insights into your store's performance and customer behavior.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transform hover:-translate-y-1 transition-transform">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Building</h3>
              <p className="text-gray-600">Build stronger connections between local businesses and customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Connect You</h2>
              <p className="text-gray-600 mb-6">
                Connect You is a platform dedicated to bridging the gap between local businesses and their communities. 
                We believe in supporting local economies while providing modern, convenient shopping experiences.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600">
                  <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Support local businesses
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time store analytics
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Community-driven marketplace
                </li>
              </ul>
            </div>
            <div className="relative h-96">
              <Image
                src="/about-illustration.png"
                alt="About Connect You"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
