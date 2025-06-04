'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onTypeChange: (type: string) => void;
}

export default function SearchBar({ onSearch, onTypeChange }: SearchBarProps) {
  const [localSearch, setLocalSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Search for stores..."
            className="w-full p-2 border rounded-md"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
        <div>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => onTypeChange(e.target.value)}
          >
            <option value="all">All Stores</option>
            <option value="grocery">Grocery Stores</option>
            <option value="books">Book Stores</option>
            <option value="general">General Shops</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
}
