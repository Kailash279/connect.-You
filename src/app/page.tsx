'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Local Stores Near You
            </h1>
            <p className="text-xl mb-8">
              Connect with local businesses and discover great products in your neighborhood
            </p>
            <Link 
              href="/stores" 
              className="inline-block bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Find Stores
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About Connect You</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold mb-4">Local Store Discovery</h3>
              <p className="text-gray-600">
                Find stores in your neighborhood with our interactive map and search features.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold mb-4">Product Variety</h3>
              <p className="text-gray-600">
                Browse through a wide range of products from local stores and retailers.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-4">Community Focused</h3>
              <p className="text-gray-600">
                Support local businesses and help your community thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Info Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Developer Information</h2>
            <div className="inline-block bg-white rounded-lg shadow-md p-8">
              <img 
                src="https://avatars.githubusercontent.com/u/placeholder" 
                alt="Welcome" 
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Hii I am Kailash Kothari</h3>
              <p className="text-gray-600 mt-2">Full Stack Developer</p>
              <div className="mt-4 space-x-4">                <a 
                  href="https://github.com/Kailash279/connect.-You.git" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:text-blue-600"
                >
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/kailash-kothari-b5aa79273" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:text-blue-600"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
