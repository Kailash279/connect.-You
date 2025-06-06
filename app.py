import streamlit as st
import pandas as pd
import folium
from streamlit_folium import folium_static
import json
import os
from typing import Optional
import logging
import sys

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# Constants
DATA_DIR = 'data'
STORES_FILE = os.path.join(DATA_DIR, 'stores.json')

def load_store_data() -> pd.DataFrame:
    """Load store data from JSON file with error handling."""
    try:
        if os.path.exists(STORES_FILE):
            with open(STORES_FILE, 'r') as f:
                data = json.load(f)
                stores = data.get('stores', [])
                df = pd.DataFrame(stores)
                # Rename lon to lng for consistency
                if 'lon' in df.columns:
                    df = df.rename(columns={'lon': 'lng'})
                logger.info(f"Loaded {len(df)} stores from {STORES_FILE}")
                return df
        else:
            logger.warning(f"Store data file not found at {STORES_FILE}")
            return pd.DataFrame()
    except Exception as e:
        logger.error(f"Error loading store data: {e}")
        return pd.DataFrame()

def create_map(df: pd.DataFrame, selected_type: Optional[str] = None) -> folium.Map:
    """Create a Folium map with store markers."""
    # Filter stores by type if selected
    if selected_type and selected_type != 'all':
        df = df[df['type'] == selected_type]

    # Create map centered on the mean coordinates
    center_lat = df['lat'].mean() if not df.empty else 40.7128
    center_lng = df['lng'].mean() if not df.empty else -74.0060
    m = folium.Map(location=[center_lat, center_lng], zoom_start=12)

    # Add markers for each store
    for _, store in df.iterrows():
        popup_html = f"""
        <div style='width: 200px'>
            <h4>{store['name']}</h4>
            <p><strong>Type:</strong> {store['type'].title()}</p>
            <p><strong>Address:</strong> {store['address']}</p>
            <p><strong>Rating:</strong> {'⭐' * int(store['rating'])} ({store['reviews']} reviews)</p>
        </div>
        """
        folium.Marker(
            [store['lat'], store['lng' if 'lng' in store else 'lon']],
            popup=folium.Popup(popup_html, max_width=300),
            tooltip=store['name']
        ).add_to(m)
    
    return m

def load_css():
    """Load custom CSS"""
    try:
        with open('style.css', 'r') as f:
            st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)
    except Exception as e:
        logger.error(f"Error loading CSS: {e}")

def main():
    # Page config
    st.set_page_config(
        page_title="Store Locator",
        page_icon="🏪",
        layout="wide"
    )

    # Load custom CSS
    load_css()

    # Navigation bar
    st.markdown("""
        <div class="navbar">
            <div class="nav-brand">Store Locator</div>
            <div class="nav-links">
                <a href="/" class="nav-link active">Home</a>
                <a href="/stores" class="nav-link">Stores</a>
                <a href="/analytics" class="nav-link">Analytics</a>
            </div>
        </div>
    """, unsafe_allow_html=True)

    # Load store data
    df = load_store_data()

    # Sidebar filters
    st.sidebar.title("Filters")
    store_types = ['all'] + sorted(df['type'].unique().tolist()) if not df.empty else ['all']
    selected_type = st.sidebar.selectbox('Store Type', store_types)
    search_query = st.sidebar.text_input('Search Stores')

    # Apply filters
    filtered_df = df.copy()
    if search_query:
        filtered_df = filtered_df[
            filtered_df['name'].str.lower().str.contains(search_query.lower()) |
            filtered_df['address'].str.lower().str.contains(search_query.lower())
        ]

    if selected_type != 'all':
        filtered_df = filtered_df[filtered_df['type'] == selected_type]

    # Main content
    col1, col2 = st.columns([2, 1])

    with col1:
        st.title("Find Stores Near You")
        show_map = st.button("Show Map")
        
        if show_map and not filtered_df.empty:
            # Create and display map
            m = create_map(filtered_df)
            folium_static(m, width=800)
        elif show_map:
            st.warning("No stores found matching your criteria.")

    with col2:
        st.markdown("""
            ## Welcome to Store Locator
            Use the sidebar filters to:
            - Select store type
            - Search for specific stores
            - View store locations on the map
            
            Click the 'Show Map' button to display the interactive map.
        """)

if __name__ == "__main__":
    main()
