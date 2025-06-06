import streamlit as st
import pandas as pd
import folium
from streamlit_folium import folium_static
import json
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from app import load_store_data, create_map, load_css

# Page config
st.set_page_config(
    page_title="Store List",
    page_icon="🏬",
    layout="wide"
)

# Load custom CSS
load_css()

# Load store data
try:
    df = load_store_data()
except Exception as e:
    st.error(f"Error loading store data: {str(e)}")
    st.stop()

# Sidebar filters
with st.sidebar:
    st.title("Filters")
    store_types = ['all'] + sorted(df['type'].unique().tolist())
    selected_type = st.selectbox('Store Type', store_types)
    search_query = st.text_input('Search Stores')
    
    # Reset filters button
    if st.button('Reset Filters', type='secondary'):
        selected_type = 'all'
        search_query = ''

# Filter data
filtered_df = df.copy()
if search_query:
    filtered_df = filtered_df[
        filtered_df['name'].str.lower().str.contains(search_query.lower()) |
        filtered_df['address'].str.lower().str.contains(search_query.lower())
    ]

if selected_type and selected_type != 'all':
    filtered_df = filtered_df[filtered_df['type'] == selected_type]

# Main content
st.title("📍 Store Locations")

# Map toggle with better styling
show_map = st.checkbox("Show Map", value=False)
if show_map:
    try:
        m = create_map(filtered_df, selected_type)
        folium_static(m, width=None, height=400)
    except Exception as e:
        st.error(f"Error displaying map: {str(e)}")

# Store list with improved layout
st.subheader(f"Found {len(filtered_df)} stores")

# Create two columns for the grid layout
col1, col2 = st.columns(2)

# Iterate through stores and display them in alternating columns
for idx, (_, store) in enumerate(filtered_df.iterrows()):
    # Choose column based on index
    current_col = col1 if idx % 2 == 0 else col2
    
    with current_col:
        st.markdown(f"""
            <div style="
                padding: 1rem;
                border-radius: 0.5rem;
                background: white;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12);
                margin-bottom: 1rem;
                cursor: pointer;
                transition: all 0.2s ease;
                &:hover {{
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }}
            ">
                <h3 style="margin:0;color:#1F2937;font-size:1.25rem">{store['name']}</h3>
                <div style="display:flex;align-items:center;gap:0.5rem;margin:0.5rem 0">
                    <span style="background:#E5E7EB;padding:2px 8px;border-radius:9999px;font-size:0.875rem">
                        {store['type'].title()}
                    </span>
                    <span style="color:#4B5563;font-size:0.875rem">
                        {'⭐' * int(store['rating'])} ({store['reviews']} reviews)
                    </span>
                </div>
                <p style="color:#4B5563;margin:0.5rem 0;display:flex;align-items:center;gap:0.5rem">
                    <span>📍</span> {store['address']}
                </p>
            </div>
        """, unsafe_allow_html=True)
