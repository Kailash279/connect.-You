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
try:
    df = load_store_data()
except Exception as e:
    st.error(f"Error loading store data: {str(e)}")
    st.stop()

# Main content
st.title("📊 Store Analytics")

# Key metrics with improved styling
st.markdown("""
    <style>
        .metric-container {
            background-color: white;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12);
            transition: transform 0.2s ease;
        }
        .metric-container:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .stPlotlyChart {
            background-color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12);
            margin-bottom: 1rem;
        }
    </style>
""", unsafe_allow_html=True)

# Metrics row
col1, col2, col3, col4 = st.columns(4)
metrics = [
    {
        "title": "Total Stores",
        "value": len(df),
        "delta": None,
        "icon": "🏪"
    },
    {
        "title": "Average Rating",
        "value": f"{df['rating'].mean():.1f}⭐",
        "delta": f"{(df['rating'].mean() - 4.0):.1f}" if df['rating'].mean() > 4.0 else None,
        "icon": "⭐"
    },
    {
        "title": "Total Reviews",
        "value": f"{df['reviews'].sum():,}",
        "delta": f"+{len(df) * 10}" if df['reviews'].sum() > len(df) * 10 else None,
        "icon": "📝"
    },
    {
        "title": "Store Types",
        "value": len(df['type'].unique()),
        "delta": f"+{len(df['type'].unique()) - 3}" if len(df['type'].unique()) > 3 else None,
        "icon": "🏷️"
    }
]

for col, metric in zip([col1, col2, col3, col4], metrics):
    with col:
        with st.container():
            st.markdown('<div class="metric-container">', unsafe_allow_html=True)
            st.markdown(f"<h3 style='margin:0;font-size:1.1rem;color:#6B7280'>{metric['icon']} {metric['title']}</h3>", unsafe_allow_html=True)
            st.metric("", metric['value'], delta=metric['delta'])
            st.markdown('</div>', unsafe_allow_html=True)

# Store distribution by type
st.subheader("📊 Stores by Type")
type_counts = df['type'].value_counts()

# Interactive chart options
chart_type = st.radio("Chart Type", ["Donut", "Bar"], horizontal=True)

if chart_type == "Donut":
    fig = px.pie(
        values=type_counts.values,
        names=type_counts.index,
        title="Store Distribution by Type",
        hole=0.4,
        color_discrete_sequence=px.colors.sequential.Viridis,
        labels={'value': 'Number of Stores', 'index': 'Store Type'}
    )
    fig.update_traces(textposition='inside', textinfo='percent+label')
else:
    fig = px.bar(
        x=type_counts.index,
        y=type_counts.values,
        title="Store Distribution by Type",
        color_discrete_sequence=px.colors.sequential.Viridis,
        labels={'x': 'Store Type', 'y': 'Number of Stores'}
    )
    fig.update_traces(texttemplate='%{y}', textposition='outside')

fig.update_layout(
    showlegend=False,
    height=400,
    margin=dict(l=20, r=20, t=40, b=20),
    paper_bgcolor='rgba(0,0,0,0)',
    plot_bgcolor='rgba(0,0,0,0)'
)
st.plotly_chart(fig, use_container_width=True)

# Rating distribution
st.subheader("⭐ Rating Distribution")

# Interactive histogram options
show_box_plot = st.checkbox("Show Box Plot", value=True)
bin_count = st.slider("Number of Bins", min_value=5, max_value=20, value=10)

fig_ratings = px.histogram(
    df,
    x="rating",
    nbins=bin_count,
    color_discrete_sequence=['#2563EB'],
    labels={'rating': 'Rating', 'count': 'Number of Stores'},
    marginal='box' if show_box_plot else None,
    title="Store Ratings Distribution"
)
fig_ratings.update_layout(
    margin=dict(l=20, r=20, t=40, b=20),
    paper_bgcolor='rgba(0,0,0,0)',
    plot_bgcolor='rgba(0,0,0,0)'
)
st.plotly_chart(fig_ratings, use_container_width=True)

# Top rated stores
st.subheader("🏆 Top Rated Stores")
col1, col2 = st.columns([1, 2])
with col1:
    sort_by = st.radio("Sort by", ["Rating", "Reviews"])

if sort_by == "Rating":
    top_stores = df.nlargest(5, ['rating', 'reviews'])[['name', 'type', 'rating', 'reviews']]
else:
    top_stores = df.nlargest(5, ['reviews', 'rating'])[['name', 'type', 'rating', 'reviews']]

# Display top stores with improved styling
for _, store in top_stores.iterrows():
    st.markdown(f"""
        <div style="
            background-color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12);
            margin-bottom: 0.5rem;
        ">
            <h4 style="margin:0;color:#1F2937">{store['name']}</h4>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.5rem">
                <span style="background:#E5E7EB;padding:2px 8px;border-radius:9999px;font-size:0.875rem">
                    {store['type'].title()}
                </span>
                <span style="color:#4B5563;font-size:0.875rem">
                    {'⭐' * int(store['rating'])} ({store['reviews']} reviews)
                </span>
            </div>
        </div>
    """, unsafe_allow_html=True)
