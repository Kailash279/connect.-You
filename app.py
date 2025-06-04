import streamlit as st
import folium
from streamlit_folium import folium_static
import pandas as pd

# Page config
st.set_page_config(
    page_title="Connect You - Store Locator",
    page_icon="🏪",
    layout="wide"
)

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
    st.title("Connect You - Store Locator")

    # Sidebar filters
    st.sidebar.title("Filters")
    store_type = st.sidebar.selectbox(
        "Store Type",
        ["All", "Grocery", "Books", "General"]
    )
    
    search_query = st.sidebar.text_input("Search Stores")

    # Load data
    df = load_store_data()

    # Filter data
    if store_type != "All":
        df = df[df['type'] == store_type.lower()]
    if search_query:
        df = df[df['name'].str.contains(search_query, case=False) | 
                df['address'].str.contains(search_query, case=False)]

    # Create two columns
    col1, col2 = st.columns([2, 1])

    with col1:
        # Create map
        m = folium.Map(location=[40.7128, -74.0060], zoom_start=13)
        
        # Add markers
        for idx, row in df.iterrows():
            folium.Marker(
                [row['lat'], row['lon']],
                popup=f"{row['name']}<br>{row['address']}<br>Rating: {row['rating']}⭐",
                tooltip=row['name']
            ).add_to(m)
        
        # Display map
        folium_static(m)

    with col2:
        # Display store list
        st.subheader("Stores")
        for idx, row in df.iterrows():
            with st.container():
                st.markdown(f"""
                    ### {row['name']}
                    **Address:** {row['address']}  
                    **Type:** {row['type'].capitalize()}  
                    **Rating:** {row['rating']}⭐
                    ---
                """)

if __name__ == "__main__":
    main()
