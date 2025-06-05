'use client';

import { useState } from 'react';
import StoreList from '@/components/StoreList';
import Map from '@/components/Map';
import SearchBar from '@/components/SearchBar';

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] relative bg-gray-50">
      {/* Left panel - Store list and search */}
      <div 
        className={`
          ${isMapExpanded ? 'lg:w-1/3' : 'lg:w-2/5'}
          w-full lg:h-full bg-white transition-all duration-300 ease-in-out
          ${isListExpanded ? 'h-full' : 'h-auto'}
          lg:shadow-lg lg:z-10 overflow-hidden
        `}
      >
        <div className="p-4 lg:p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Find Stores</h1>
          
          <SearchBar
            onSearch={setSearchQuery}
            onTypeChange={setSelectedType}
          />

          <StoreList
            searchQuery={searchQuery}
            selectedType={selectedType}
          />
        </div>
      </div>

      {/* Right panel - Map */}
      <div 
        className={`
          ${isMapExpanded ? 'lg:w-2/3' : 'lg:w-3/5'}
          flex-1 relative transition-all duration-300
        `}
      >
        <Map 
          searchQuery={searchQuery} 
          selectedType={selectedType}
        />

        {/* Map expand/collapse button */}
        <button
          onClick={() => setIsMapExpanded(!isMapExpanded)}
          className="absolute top-4 right-4 z-10 bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          aria-label={isMapExpanded ? 'Collapse map' : 'Expand map'}
        >
          <svg 
            className="w-6 h-6 text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMapExpanded ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg"
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
    </div>
  );
}
