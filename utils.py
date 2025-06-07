import streamlit as st
import pandas as pd
import folium
import json
import os
import logging
from typing import Optional, Dict, Any, List
from pathlib import Path

logger = logging.getLogger(__name__)

class StorageManager:
    """Handles data storage operations."""
    DATA_DIR = Path('data')
    STORES_FILE = DATA_DIR / 'stores.json'
    ASSETS_DIR = Path('assets')

    @classmethod
    def ensure_directories(cls) -> None:
        """Ensure required directories exist."""
        cls.DATA_DIR.mkdir(exist_ok=True)
        cls.ASSETS_DIR.mkdir(exist_ok=True)

    @classmethod
    def load_store_data(cls) -> pd.DataFrame:
        """Load store data from JSON file with error handling."""
        try:
            if cls.STORES_FILE.exists():
                with open(cls.STORES_FILE, 'r') as f:
                    data = json.load(f)
                    stores = data.get('stores', [])
                    df = pd.DataFrame(stores)
                    if 'lon' in df.columns:
                        df = df.rename(columns={'lon': 'lng'})
                    logger.info(f"Loaded {len(df)} stores from {cls.STORES_FILE}")
                    return df
            
            return cls._create_sample_data()
        except Exception as e:
            logger.error(f"Error loading store data: {e}")
            raise

    @classmethod
    def _create_sample_data(cls) -> pd.DataFrame:
        """Create and save sample store data."""
        df = pd.DataFrame({
            'id': range(1, 6),
            'name': ['Central Grocery', 'City Books', 'Electronics Hub', 'Fashion Store', 'General Shop'],
            'type': ['grocery', 'books', 'electronics', 'clothing', 'general'],
            'address': [f"{i} Main St, New York, NY" for i in [123, 456, 789, 321, 654]],
            'lat': [40.7128, 40.7138, 40.7148, 40.7158, 40.7168],
            'lng': [-74.0060, -74.0070, -74.0080, -74.0090, -74.0100],
            'rating': [4.5, 4.2, 4.7, 4.1, 4.3],
            'reviews': [120, 85, 200, 150, 95]
        })
        
        cls.save_store_data(df)
        return df

    @classmethod
    def save_store_data(cls, df: pd.DataFrame) -> None:
        """Save store data to JSON file."""
        cls.ensure_directories()
        with open(cls.STORES_FILE, 'w') as f:
            json.dump({'stores': df.to_dict('records')}, f, indent=2)
        logger.info(f"Saved {len(df)} stores to {cls.STORES_FILE}")

def create_store_map(df: pd.DataFrame, selected_type: Optional[str] = None) -> folium.Map:
    """Create a Folium map with store markers and enhanced features."""
    try:
        if selected_type and selected_type != 'all':
            df = df[df['type'] == selected_type]

        if df.empty:
            raise ValueError("No stores found for the selected criteria")

        center_lat = df['lat'].mean()
        center_lng = df['lng'].mean()
        
        m = folium.Map(
            location=[center_lat, center_lng],
            zoom_start=12,
            control_scale=True,
            tiles='cartodbpositron'
        )

        # Add map controls
        folium.plugins.Fullscreen().add_to(m)
        folium.plugins.LocateControl().add_to(m)
        
        # Add clustered markers
        marker_cluster = folium.plugins.MarkerCluster(
            name='Stores',
            overlay=True,
            control=False
        )

        for _, store in df.iterrows():
            popup_html = f"""
            <div style='width:200px'>
                <h4 style='margin:0;color:#1F2937'>{store['name']}</h4>
                <p style='margin:0.5rem 0'>
                    <span style='background:#E5E7EB;padding:2px 8px;border-radius:9999px;font-size:0.875rem'>
                        {store['type'].title()}
                    </span>
                </p>
                <p style='margin:0.5rem 0'>📍 {store['address']}</p>
                <p style='margin:0.5rem 0'>
                    {'⭐' * int(store['rating'])} ({store['reviews']} reviews)
                </p>
            </div>
            """
            
            folium.Marker(
                [store['lat'], store['lng']],
                popup=folium.Popup(popup_html, max_width=300),
                tooltip=store['name'],
                icon=folium.Icon(color='blue', icon='info-sign')
            ).add_to(marker_cluster)

        marker_cluster.add_to(m)
        return m

    except Exception as e:
        logger.error(f"Error creating map: {e}")
        raise

def load_css() -> None:
    """Load custom CSS styles."""
    try:
        with open('style.css', 'r') as f:
            st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)
    except Exception as e:
        logger.error(f"Error loading CSS: {e}")
        st.warning("Could not load custom styling.")

def set_page_config() -> None:
    """Set consistent page configuration."""
    st.set_page_config(
        page_title="Connect You - Local Store Discovery",
        page_icon="🏪",
        layout="wide",
        initial_sidebar_state="collapsed"
    )