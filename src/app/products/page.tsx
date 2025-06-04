'use client';

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Fresh Vegetables Bundle",
    price: 24.99,
    description: "A selection of fresh, locally sourced vegetables",
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3",
  },
  {
    id: 2,
    name: "Bestseller Book Collection",
    price: 49.99,
    description: "Top 3 bestselling novels of the month",
    category: "Books",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3",
  },
  {
    id: 3,
    name: "Organic Fruit Box",
    price: 34.99,
    description: "Seasonal organic fruits from local farms",
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3",
  },
  {
    id: 4,
    name: "Children's Book Set",
    price: 29.99,
    description: "Educational and fun books for kids",
    category: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3",
  }
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="all">All Categories</option>
            <option value="groceries">Groceries</option>
            <option value="books">Books</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-1 text-gray-600 text-sm">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                  <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
