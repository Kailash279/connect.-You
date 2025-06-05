'use client';

import { useState } from 'react';
import Map from '@/components/Map';
import SearchBar from '@/components/SearchBar';
import StoreList from '@/components/StoreList';

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const storeTypes = [
    { id: 'all', label: 'All Stores' },
    { id: 'grocery', label: 'Grocery' },
    { id: 'retail', label: 'Retail' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'services', label: 'Services' },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Local Stores</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[300px]">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {storeTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id === 'all' ? '' : type.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    (selectedType === type.id || (type.id === 'all' && !selectedType))
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Map searchQuery={searchQuery} selectedType={selectedType} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <StoreList searchQuery={searchQuery} selectedType={selectedType} />
          </div>
        </div>
      </div>
    </div>
  );
}
