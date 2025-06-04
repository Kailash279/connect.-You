import streamlit as st
import folium
from streamlit_folium import folium_static
import pandas as pd
import streamlit.components.v1 as components

# Page config
st.set_page_config(
    page_title="Connect You - Store Locator",
    page_icon="🏪",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load CSS
with open('style.css') as f:
    st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

# Navigation HTML
nav_html = """
<div class="navbar">
    <div style="display: flex; align-items: center;">
        <h1 style="margin: 0; font-size: 1.5rem;">Connect You</h1>
    </div>
    <div style="display: flex; gap: 2rem;">
        <a href="/" style="color: white; text-decoration: none;">Home</a>
        <a href="/stores" style="color: white; text-decoration: none;">Stores</a>
        <a href="/products" style="color: white; text-decoration: none;">Products</a>
        <a href="/feedback" style="color: white; text-decoration: none;">Feedback</a>
    </div>
</div>
"""
st.markdown(nav_html, unsafe_allow_html=True)

# Sample store data
@st.cache_data
def load_store_data():
    return pd.DataFrame({
        'name': [
            'Central Grocery',
            'City Books',
            'Downtown General Store',
            'Fresh Mart',
            'Readers Corner'
        ],
        'type': [
            'grocery',
            'books',
            'general',
            'grocery',
            'books'
        ],
        'lat': [40.7128, 40.7138, 40.7148, 40.7158, 40.7168],
        'lon': [-74.0060, -74.0070, -74.0080, -74.0090, -74.0100],
        'rating': [4.5, 4.8, 4.2, 4.6, 4.9],
        'address': [
            '123 Main St',
            '456 Book Lane',
            '789 Market St',
            '321 Food Ave',
            '654 Library Lane'
        ]
    })

def main():
    # App title with styling
    st.markdown("""
        <h1 style='text-align: center; color: #1a1a1a; margin-bottom: 2rem;'>
            Find Stores Near You
        </h1>
    """, unsafe_allow_html=True)

    # Sidebar filters with better styling
    with st.sidebar:
        st.markdown("""
            <h2 style='color: #1a1a1a; margin-bottom: 1rem;'>Filters</h2>
        """, unsafe_allow_html=True)
        
        store_type = st.selectbox(
            "Store Type",
            ["All", "Grocery", "Books", "General"],
            key="store_type"
        )
        
        search_query = st.text_input(
            "Search Stores",
            key="search",
            placeholder="Enter store name or address..."
        )

    # Load and filter data
    df = load_store_data()
    if store_type != "All":
        df = df[df['type'] == store_type.lower()]
    if search_query:
        df = df[df['name'].str.contains(search_query, case=False) | 
                df['address'].str.contains(search_query, case=False)]

    # Create responsive layout
    col1, col2 = st.columns([2, 1])

    with col1:
        # Create map with custom styling
        m = folium.Map(
            location=[40.7128, -74.0060],
            zoom_start=13,
            tiles="CartoDB positron"
        )
        
        # Add markers with custom styling
        for idx, row in df.iterrows():
            folium.Marker(
                [row['lat'], row['lon']],
                popup=f"""
                    <div style='font-family: Arial, sans-serif; padding: 10px;'>
                        <h4 style='margin: 0 0 5px 0;'>{row['name']}</h4>
                        <p style='margin: 0 0 5px 0;'>{row['address']}</p>
                        <p style='margin: 0;'>Rating: {row['rating']}⭐</p>
                    </div>
                """,
                tooltip=row['name'],
                icon=folium.Icon(color='blue', icon='info-sign')
            ).add_to(m)
        
        # Display map with fixed size
        folium_static(m, width=800, height=600)

    with col2:
        # Display store list with enhanced styling
        st.markdown("<h2 style='color: #1a1a1a; margin-bottom: 1rem;'>Nearby Stores</h2>", unsafe_allow_html=True)
        
        if len(df) == 0:
            st.info("No stores found matching your criteria.")
        
        for idx, row in df.iterrows():
            st.markdown(f"""
                <div class="store-card">
                    <h3 style="color: #1a1a1a; margin-bottom: 0.5rem;">{row['name']}</h3>
                    <p style="color: #666; margin-bottom: 0.5rem;"><strong>Address:</strong> {row['address']}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="background-color: #e3f2fd; color: #1976d2; padding: 4px 8px; border-radius: 4px; font-size: 0.875rem;">
                            {row['type'].capitalize()}
                        </span>
                        <span style="color: #f9a825; font-size: 1rem;">{'⭐' * int(row['rating'])} {row['rating']}</span>
                    </div>
                </div>
            """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()
