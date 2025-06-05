'use client';

import { useEffect, useRef, useState } from 'react';
import type mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Store } from '@/types/store';

interface MapProps {
  searchQuery: string;
  selectedType: string;
}

// Sample store data with coordinates (you would typically fetch this from an API)
const sampleStores: (Store & { coordinates: [number, number] })[] = [
  {
    id: 1,
    name: 'Central Grocery',
    type: 'grocery',
    address: '123 Main St',
    distance: '0.5 km',
    rating: 4.5,
    coordinates: [-74.006, 40.7128]
  },
  {
    id: 2,
    name: 'City Books',
    type: 'books',
    address: '456 Book Lane',
    distance: '1.2 km',
    rating: 4.8,
    coordinates: [-74.009, 40.7138]
  },
];

export default function Map({ searchQuery, selectedType }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapboxInstance, setMapboxInstance] = useState<typeof mapboxgl | null>(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('mapbox-gl').then((mapbox) => {
        setMapboxInstance(mapbox.default);
        setIsLoading(false);
      }).catch(err => {
        setError('Failed to load map. Please try again later.');
        setIsLoading(false);
      });
    }
  }, []);

  const addMarkers = () => {
    if (!map.current || !mapboxInstance) return;

    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Filter stores based on search and type
    const filteredStores = sampleStores.filter(store => {
      const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          store.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || store.type === selectedType;
      return matchesSearch && matchesType;
    });

    // Add new markers
    filteredStores.forEach(store => {
      const el = document.createElement('div');
      el.className = 'store-marker';
      
      const marker = new mapboxInstance.Marker(el)
        .setLngLat(store.coordinates)
        .setPopup(
          new mapboxInstance.Popup({ offset: 25 })
            .setHTML(
              `<h3 class="font-bold">${store.name}</h3>
               <p>${store.address}</p>
               <p>Rating: ${store.rating}⭐</p>`
            )
        )
        .addTo(map.current!);
      
      markers.current.push(marker);
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainer.current || !mapboxInstance) return;

    if (!map.current) {
      mapboxInstance.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
      
      try {
        map.current = new mapboxInstance.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-74.006, 40.7128], // New York City coordinates
          zoom: 13
        });

        // Add navigation controls
        map.current.addControl(new mapboxInstance.NavigationControl());
        
        // Get user location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              if (map.current) {
                map.current.flyTo({
                  center: [position.coords.longitude, position.coords.latitude],
                  zoom: 13
                });
              }
            },
            (error) => {
              console.error('Error getting location:', error);
            }
          );
        }

        map.current.on('load', addMarkers);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
      markers.current.forEach(marker => marker.remove());
    };
  }, [mapboxInstance]);

  // Update markers when search or type changes
  useEffect(() => {
    addMarkers();
  }, [searchQuery, selectedType]);

  const toggleMap = () => {
    setIsMapExpanded(!isMapExpanded);
    if (map.current) {
      setTimeout(() => {
        map.current?.resize();
      }, 300);
    }
  };

  return (
    <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-red-500 text-center p-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <button
        onClick={toggleMap}
        className="absolute top-4 right-4 z-10 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
      >
        {isMapExpanded ? 'Collapse Map' : 'Expand Map'}
      </button>

      <div 
        ref={mapContainer} 
        className={`w-full map-container ${
          isMapExpanded ? 'h-[70vh]' : 'h-[30vh]'
        }`} 
      />
    </div>
  );
}
