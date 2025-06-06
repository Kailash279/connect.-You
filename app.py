import streamlit as st
import pandas as pd
import folium
from streamlit_folium import folium_static
import json
import os
import logging
import sys
from typing import Optional, Dict, Any, List
from dataclasses import dataclass

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# Constants
DATA_DIR = "data"
STORES_FILE = os.path.join(DATA_DIR, "stores.json")

# Page config
st.set_page_config(
    page_title="Store Locator",
    page_icon="",
    layout="wide"
)

def load_store_data() -> pd.DataFrame:
    """Load store data from JSON file with error handling."""
    try:
        if os.path.exists(STORES_FILE):
            with open(STORES_FILE, "r") as f:
                data = json.load(f)
                stores = data.get("stores", [])
                df = pd.DataFrame(stores)
                if "lon" in df.columns:
                    df = df.rename(columns={"lon": "lng"})
                logger.info(f"Loaded {len(df)} stores from {STORES_FILE}")
                return df
        else:
            df = pd.DataFrame({
                "id": range(1, 6),
                "name": ["Central Grocery", "City Books", "Electronics Hub", "Fashion Store", "General Shop"],
                "type": ["grocery", "books", "electronics", "clothing", "general"],
                "address": [f"{i} Main St, New York, NY" for i in [123, 456, 789, 321, 654]],
                "lat": [40.7128, 40.7138, 40.7148, 40.7158, 40.7168],
                "lng": [-74.0060, -74.0070, -74.0080, -74.0090, -74.0100],
                "rating": [4.5, 4.2, 4.7, 4.1, 4.3],
                "reviews": [120, 85, 200, 150, 95]
            })
            os.makedirs(DATA_DIR, exist_ok=True)
            with open(STORES_FILE, "w") as f:
                json.dump({"stores": df.to_dict("records")}, f, indent=2)
            logger.info(f"Created sample data with {len(df)} stores")
            return df
    except Exception as e:
        logger.error(f"Error loading store data: {e}")
        return pd.DataFrame()

def create_map(df: pd.DataFrame, selected_type: Optional[str] = None) -> folium.Map:
    """Create a Folium map with store markers."""
    if selected_type and selected_type != "all":
        df = df[df["type"] == selected_type]

    center_lat = df["lat"].mean() if not df.empty else 40.7128
    center_lng = df["lng"].mean() if not df.empty else -74.0060
    m = folium.Map(location=[center_lat, center_lng], zoom_start=12)

    for _, store in df.iterrows():
        popup_html = f"""
        <div style="width: 200px">
            <h4>{store["name"]}</h4>
            <p><strong>Type:</strong> {store["type"].title()}</p>
            <p><strong>Address:</strong> {store["address"]}</p>
            <p><strong>Rating:</strong> {"" * int(store["rating"])} ({store["reviews"]} reviews)</p>
        </div>
        """
        folium.Marker(
            [store["lat"], store["lng"]],
            popup=folium.Popup(popup_html, max_width=300),
            tooltip=store["name"]
        ).add_to(m)
    
    return m

def load_css():
    """Load custom CSS"""
    try:
        with open("style.css", "r") as f:
            st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)
    except Exception as e:
        logger.error(f"Error loading CSS: {e}")
        st.warning("Could not load custom styling.")

def main():
    """Main application."""
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

    # Main content area
    st.title("Welcome to Store Locator")

    # Introduction
    st.markdown("""
    Use the interactive map to find stores near you. Filter by:
    - Store type (grocery, books, electronics, etc.)
    - Search by name or address
    """)

    # Map section
    if st.button("Show Map"):
        if not df.empty:
            m = create_map(df)
            folium_static(m, width=1000, height=600)
        else:
            st.error("No store data available.")

if __name__ == "__main__":
    main()
