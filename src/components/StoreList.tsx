'use client';

import { useEffect, useState } from 'react';
import { Store } from '@/types/store';

interface StoreListProps {
  searchQuery: string;
  selectedType: string;
}

export default function StoreList({ searchQuery, selectedType }: StoreListProps) {
  const [stores] = useState<Store[]>([
    {
      id: 1,
      name: 'Central Grocery',
      type: 'grocery',
      address: '123 Main St',
      distance: '0.5 km',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'City Books',
      type: 'books',
      address: '456 Book Lane',
      distance: '1.2 km',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Downtown General Store',
      type: 'general',
      address: '789 Market St',
      distance: '0.8 km',
      rating: 4.2,
    },
    {
      id: 4,
      name: 'Fresh Mart',
      type: 'grocery',
      address: '321 Food Ave',
      distance: '1.5 km',
      rating: 4.6,
    },
    {
      id: 5,
      name: 'Readers Corner',
      type: 'books',
      address: '654 Library Lane',
      distance: '2.0 km',
      rating: 4.9,
    }
  ]);

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || store.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4 overflow-auto max-h-[calc(100vh-12rem)]">
      {filteredStores.length === 0 ? (
        <div className="text-center p-4 text-gray-500">
          No stores found matching your criteria.
        </div>
      ) : (
        filteredStores.map(store => (
          <div 
            key={store.id} 
            className="p-4 border rounded-lg hover:shadow-md bg-white transition-all duration-200 hover:scale-[1.02]"
          >
            <h3 className="font-bold text-lg">{store.name}</h3>
            <p className="text-gray-600 mt-1">{store.address}</p>
            <div className="flex justify-between mt-3 items-center">
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {store.type.charAt(0).toUpperCase() + store.type.slice(1)}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{store.distance}</span>
                <span className="text-sm font-medium bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full flex items-center gap-1">
                  ⭐ {store.rating}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
