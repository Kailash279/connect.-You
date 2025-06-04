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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('mapbox-gl').then((mapbox) => {
        setMapboxInstance(mapbox.default);
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

  return (
    <div ref={mapContainer} className="w-full h-[calc(100vh-4rem)]" />
  );
}
