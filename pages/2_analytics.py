import streamlit as st
import pandas as pd
import plotly.express as px
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from app import load_store_data, load_css

# Page config
st.set_page_config(
    page_title="Store Analytics",
    page_icon="📊",
    layout="wide"
)

# Load custom CSS
load_css()

# Load store data
df = load_store_data()

# Main content
st.title("📊 Store Analytics")

# Key metrics
col1, col2, col3, col4 = st.columns(4)
with col1:
    st.metric("Total Stores", len(df))
with col2:
    st.metric("Average Rating", f"{df['rating'].mean():.1f}⭐")
with col3:
    st.metric("Total Reviews", df['reviews'].sum())
with col4:
    st.metric("Store Types", len(df['type'].unique()))

# Store distribution by type
st.subheader("Stores by Type")
type_counts = df['type'].value_counts()
fig_types = px.pie(
    values=type_counts.values,
    names=type_counts.index,
    title="Store Distribution by Type"
)
st.plotly_chart(fig_types)

# Rating distribution
st.subheader("Rating Distribution")
fig_ratings = px.histogram(
    df,
    x="rating",
    nbins=10,
    title="Store Ratings Distribution"
)
st.plotly_chart(fig_ratings)

# Top rated stores
st.subheader("Top Rated Stores")
top_stores = df.nlargest(5, 'rating')[['name', 'type', 'rating', 'reviews']]
st.dataframe(
    top_stores.style.format({
        'rating': '{:.1f}',
        'reviews': '{:,}'
    })
)
