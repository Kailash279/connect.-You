import streamlit as st
import sys

def get_current_page():
    """Get the current page name from the script path."""
    try:
        script_path = sys.argv[0]
        if 'pages' in script_path:
            if 'stores' in script_path:
                return 'stores'
            elif 'analytics' in script_path:
                return 'analytics'
        return 'home'
    except:
        return 'home'

def navbar():
    """Render the navigation bar."""
    current_page = get_current_page()
    
    st.markdown(f"""
        <div class="navbar">
            <div class="nav-brand">Store Locator 🏪</div>
            <div class="nav-links">
                <a href="." class="nav-link {'active' if current_page == 'home' else ''}" target="_self">
                    <span class="nav-icon">🏠</span> Home
                </a>
                <a href="1_stores" class="nav-link {'active' if current_page == 'stores' else ''}" target="_self">
                    <span class="nav-icon">📍</span> Stores
                </a>
                <a href="2_analytics" class="nav-link {'active' if current_page == 'analytics' else ''}" target="_self">
                    <span class="nav-icon">📊</span> Analytics
                </a>
            </div>
        </div>
        <div class="nav-spacer"></div>
    """, unsafe_allow_html=True)
