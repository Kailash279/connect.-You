'use client';

import { useState } from 'react';
import StoreList from '@/components/StoreList';
import Map from '@/components/Map';
import SearchBar from '@/components/SearchBar';

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  return (
    <div className="flex flex-col md:flex-row flex-1 h-[calc(100vh-4rem)]">
      <div className="w-full md:w-1/3 p-4">
        <SearchBar 
          onSearch={setSearchQuery} 
          onTypeChange={setSelectedType} 
        />
        <StoreList 
          searchQuery={searchQuery} 
          selectedType={selectedType} 
        />
      </div>
      <div className="w-full md:w-2/3">
        <Map searchQuery={searchQuery} selectedType={selectedType} />
      </div>
    </div>
  );
}
