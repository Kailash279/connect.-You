'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Store } from '@/types/store';
import { fetchStores } from '@/utils/api';

interface MapProps {
  searchQuery: string;
  selectedType: string;
}

export default function Map({ searchQuery, selectedType }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapboxInstance, setMapboxInstance] = useState<typeof mapboxgl | null>(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);

  // Fetch stores from API
  const loadStores = useCallback(async () => {
    try {
      const response = await fetchStores(selectedType, searchQuery);
      setStores(response.stores);
    } catch (err) {
      console.error('Error loading stores:', err);
      setError('Failed to load store data');
    }
  }, [searchQuery, selectedType]);

  // Load Mapbox
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

  const createMarkerElement = (store: Store) => {
    const el = document.createElement('div');
    el.className = 'store-marker';
    el.innerHTML = `
      <div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform">
        ${getStoreIcon(store.type)}
      </div>
    `;
    return el;
  };

  const getStoreIcon = (type: Store['type']) => {
    const icons = {
      grocery: '🛒',
      books: '📚',
      electronics: '💻',
      clothing: '👕',
      general: '🏪'
    };
    return icons[type] || '📍';
  };

  const createPopupContent = (store: Store) => {
    return `
      <div class="p-3 max-w-sm">
        <h3 class="font-bold text-lg mb-1">${store.name}</h3>
        <p class="text-gray-600 mb-2">${store.address}</p>
        <p class="text-sm text-gray-500 mb-2">${store.hours}</p>
        <div class="flex items-center justify-between">
          <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            ${store.type.charAt(0).toUpperCase() + store.type.slice(1)}
          </span>
          <div class="flex items-center gap-1">
            <span class="text-yellow-500">⭐</span>
            <span class="font-medium">${store.rating.toFixed(1)}</span>
            <span class="text-gray-500 text-sm">(${store.reviews})</span>
          </div>
        </div>
      </div>
    `;
  };

  const addMarkers = useCallback(() => {
    if (!map.current || !mapboxInstance) return;

    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    stores.forEach(store => {
      const el = createMarkerElement(store);
      
      const marker = new mapboxInstance.Marker(el)
        .setLngLat([store.lon, store.lat])
        .setPopup(
          new mapboxInstance.Popup({ 
            offset: 25,
            closeButton: false,
            className: 'store-popup'
          })
            .setHTML(createPopupContent(store))
        )
        .addTo(map.current!);
      
      markers.current.push(marker);
    });

    // Fit bounds to show all markers
    if (stores.length > 0) {
      const bounds = new mapboxInstance.LngLatBounds();
      stores.forEach(store => bounds.extend([store.lon, store.lat]));
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
        duration: 1000
      });
    }
  }, [stores, mapboxInstance]);

  // Initialize map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainer.current || !mapboxInstance) return;

    if (!map.current) {
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      if (!token) {
        setError('Missing Mapbox token');
        return;
      }

      mapboxInstance.accessToken = token;
      
      try {
        map.current = new mapboxInstance.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [-74.006, 40.7128],
          zoom: 13,
          pitchWithRotate: false,
          attributionControl: false
        });

        // Add controls
        map.current.addControl(new mapboxInstance.NavigationControl(), 'top-right');
        map.current.addControl(new mapboxInstance.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true
        }), 'top-right');

        // Load initial data
        loadStores();
        map.current.on('load', addMarkers);
      } catch (error) {
        console.error('Error initializing map:', error);
        setError('Failed to initialize map');
      }
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      markers.current.forEach(marker => marker.remove());
    };
  }, [mapboxInstance, loadStores, addMarkers]);

  // Update markers when stores change
  useEffect(() => {
    loadStores();
  }, [searchQuery, selectedType, loadStores]);

  useEffect(() => {
    addMarkers();
  }, [stores, addMarkers]);

  if (isLoading) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-red-500 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <style jsx global>{`
        .store-marker {
          cursor: pointer;
        }
        .store-popup .mapboxgl-popup-content {
          padding: 0;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
      `}</style>
      <div 
        ref={mapContainer} 
        className={`w-full transition-all duration-300 ease-in-out ${
          isMapExpanded ? 'h-[85vh]' : 'h-[50vh] lg:h-[70vh]'
        }`} 
      />
    </div>
  );
}
