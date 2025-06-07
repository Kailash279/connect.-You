import streamlit as st
import plotly.express as px
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from utils import StorageManager, load_css, set_page_config

# Page config
set_page_config()

# Load custom CSS
load_css()

# Load store data
try:
    df = StorageManager.load_store_data()
except Exception as e:
    st.error(f"Error loading store data: {str(e)}")
    st.stop()

# Main content
st.title("📊 Store Analytics")

# Key metrics in a grid
col1, col2, col3, col4 = st.columns(4)

metrics = [
    {
        "title": "Total Stores",
        "value": len(df),
        "delta": None,
        "container": col1
    },
    {
        "title": "Average Rating",
        "value": f"{df['rating'].mean():.1f}⭐",
        "delta": f"+{(df['rating'].mean() - 4.0):.1f}" if df['rating'].mean() > 4.0 else None,
        "container": col2
    },
    {
        "title": "Total Reviews",
        "value": f"{df['reviews'].sum():,}",
        "delta": f"+{len(df) * 10}" if df['reviews'].sum() > len(df) * 10 else None,
        "container": col3
    },
    {
        "title": "Store Types",
        "value": len(df['type'].unique()),
        "delta": f"+{len(df['type'].unique()) - 3}" if len(df['type'].unique()) > 3 else None,
        "container": col4
    }
]

# Display metrics with consistent styling
for metric in metrics:
    with metric["container"]:
        st.markdown("""
            <div style="
                background-color: white;
                padding: 1rem;
                border-radius: 0.5rem;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12);
            ">
        """, unsafe_allow_html=True)
        st.metric(
            metric["title"],
            metric["value"],
            metric["delta"]
        )
        st.markdown("</div>", unsafe_allow_html=True)

# Store distribution by type
st.subheader("Store Distribution")
type_counts = df['type'].value_counts()

try:
    fig_types = px.pie(
        values=type_counts.values,
        names=type_counts.index,
        title="Store Types",
        hole=0.4,
        color_discrete_sequence=px.colors.sequential.Viridis
    )
    fig_types.update_traces(textposition='inside', textinfo='percent+label')
    fig_types.update_layout(
        showlegend=False,
        height=400,
        margin=dict(l=20, r=20, t=40, b=20),
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)'
    )
    st.plotly_chart(fig_types, use_container_width=True)
except Exception as e:
    st.error(f"Error creating distribution chart: {str(e)}")

# Rating distribution
st.subheader("Rating Distribution")
try:
    fig_ratings = px.histogram(
        df,
        x="rating",
        nbins=10,
        title="Store Ratings",
        color_discrete_sequence=['#2563EB'],
        labels={'rating': 'Rating', 'count': 'Number of Stores'},
        marginal='box'
    )
    fig_ratings.update_layout(
        showlegend=False,
        height=400,
        margin=dict(l=20, r=20, t=40, b=20),
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)'
    )
    st.plotly_chart(fig_ratings, use_container_width=True)
except Exception as e:
    st.error(f"Error creating ratings chart: {str(e)}")

# Top rated stores
st.subheader("Top Rated Stores")
top_stores = df.nlargest(5, 'rating')[['name', 'type', 'rating', 'reviews']]

# Display top stores in cards
for _, store in top_stores.iterrows():
    st.markdown(f"""
        <div style="
            background: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12);
            margin-bottom: 1rem;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h3 style="margin:0;color:#1F2937;font-size:1.25rem">{store['name']}</h3>
                    <span style="
                        background:#E5E7EB;
                        padding:2px 8px;
                        border-radius:9999px;
                        font-size:0.875rem;
                        color:#4B5563;
                    ">
                        {store['type'].title()}
                    </span>
                </div>
                <div style="text-align: right;">
                    <div style="color:#2563EB;font-size:1.25rem">{'⭐' * int(store['rating'])}</div>
                    <div style="color:#6B7280;font-size:0.875rem">{store['reviews']} reviews</div>
                </div>
            </div>
        </div>
    """, unsafe_allow_html=True)
