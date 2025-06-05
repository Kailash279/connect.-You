'use client';

import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onTypeChange: (type: string) => void;
}

export default function SearchBar({ onSearch, onTypeChange }: SearchBarProps) {
  const [localSearch, setLocalSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounce the search to prevent too many rapid searches
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSearch(value);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search for stores..."
            className={`w-full p-3 pl-4 pr-10 border rounded-lg transition-shadow duration-200 text-base
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              ${isFocused ? 'shadow-lg' : 'shadow-sm'}`}
            value={localSearch}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {localSearch && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400
                hover:text-gray-600 transition-colors"
              onClick={() => {
                setLocalSearch('');
                onSearch('');
              }}
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Store Type Select */}
        <div className="relative">
          <select
            className="w-full p-3 pl-4 pr-10 border rounded-lg bg-white shadow-sm
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              appearance-none cursor-pointer text-base"
            onChange={(e) => onTypeChange(e.target.value)}
            defaultValue="all"
          >
            <option value="all">All Stores</option>
            <option value="grocery">Grocery Stores</option>
            <option value="books">Book Stores</option>
            <option value="general">General Shops</option>
            <option value="clothing">Clothing Stores</option>
            <option value="electronics">Electronics Stores</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-lg shadow-sm
            hover:bg-primary-dark active:bg-primary-darker
            transition-colors duration-200 text-base font-medium
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
            disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!localSearch.trim()}
        >
          Search
        </button>
      </form>
    </div>
  );
}
