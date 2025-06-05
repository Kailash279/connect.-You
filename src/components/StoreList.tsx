'use client';

import { useEffect, useState } from 'react';
import { Store } from '@/types/store';
import { fetchStores } from '@/utils/api';

interface StoreListProps {
  searchQuery: string;
  selectedType: string;
}

export default function StoreList({ searchQuery, selectedType }: StoreListProps) {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStores = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchStores(selectedType, searchQuery);
        setStores(response.stores);
      } catch (err) {
        setError('Failed to load stores. Please try again later.');
        console.error('Error loading stores:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadStores();
  }, [searchQuery, selectedType]);

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded-lg mb-4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 overflow-auto max-h-[calc(100vh-12rem)]">
      {stores.length === 0 ? (
        <div className="text-center p-4 text-gray-500">
          No stores found matching your criteria.
        </div>
      ) : (
        stores.map(store => (
          <div 
            key={store.id} 
            className="p-4 border rounded-lg hover:shadow-md bg-white transition-all duration-200 hover:scale-[1.02]"
          >
            <h3 className="font-bold text-lg">{store.name}</h3>
            <p className="text-gray-600 mt-1">{store.address}</p>
            <div className="mt-2 text-sm text-gray-500">{store.description}</div>
            <div className="mt-2 text-sm text-gray-500">{store.hours}</div>
            <div className="flex justify-between mt-3 items-center">
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {store.type.charAt(0).toUpperCase() + store.type.slice(1)}
              </span>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <span>📍</span>
                  {store.distance || 'Nearby'}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full flex items-center gap-1">
                    ⭐ {store.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    {store.reviews} reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
