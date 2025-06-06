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
df = load_store_data()

# Sidebar filters
st.sidebar.title("Filters")
store_types = ['all'] + sorted(df['type'].unique().tolist())
selected_type = st.sidebar.selectbox('Store Type', store_types)
search_query = st.sidebar.text_input('Search Stores')

# Filter data
if search_query:
    df = df[
        df['name'].str.lower().str.contains(search_query.lower()) |
        df['address'].str.lower().str.contains(search_query.lower())
    ]

if selected_type and selected_type != 'all':
    df = df[df['type'] == selected_type]

# Main content
st.title("📍 Store Locations")

if st.button("Show Map"):
    m = create_map(df, selected_type)
    folium_static(m, width=1000, height=600)

# Store list
st.subheader(f"Found {len(df)} stores")
for _, store in df.iterrows():
    with st.expander(f"{store['name']} - {store['type'].title()}"):
        col1, col2 = st.columns([3, 1])
        with col1:
            st.write(f"**Address:** {store['address']}")
            st.write(f"**Type:** {store['type'].title()}")
        with col2:
            st.write(f"**Rating:** {'⭐' * int(store['rating'])}")
            st.write(f"**Reviews:** {store['reviews']}")
