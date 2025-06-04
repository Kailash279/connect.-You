'use client';

import { useState } from 'react';
import StoreList from '@/components/StoreList';
import Map from '@/components/Map';
import SearchBar from '@/components/SearchBar';

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isListExpanded, setIsListExpanded] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] relative">
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsListExpanded(!isListExpanded)}
        aria-label={isListExpanded ? 'Collapse store list' : 'Expand store list'}
      >
        <svg 
          className={`w-6 h-6 transform transition-transform ${isListExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Map container */}
      <div className="flex-1 w-full">
        <Map searchQuery={searchQuery} selectedType={selectedType} />
      </div>

      {/* Store list and search panel */}
      <div 
        className={`absolute bottom-0 left-0 right-0 md:relative md:w-1/3 bg-white transition-transform duration-300 ease-in-out transform
          ${isListExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-3.5rem)]'} 
          md:translate-y-0 max-h-[80vh] md:max-h-full md:h-full shadow-lg md:shadow-none z-40`}
      >
        <div className="p-4">
          {/* Mobile header */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Store List</h2>
            <button 
              onClick={() => setIsListExpanded(!isListExpanded)}
              className="text-gray-500"
            >
              <span className="sr-only">Toggle store list</span>
              <svg 
                className={`w-6 h-6 transform transition-transform ${isListExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <SearchBar 
            onSearch={setSearchQuery} 
            onTypeChange={setSelectedType} 
          />
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 16rem)' }}>
            <StoreList 
              searchQuery={searchQuery} 
              selectedType={selectedType} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
