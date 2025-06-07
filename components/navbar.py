import streamlit as st
from pathlib import Path

def get_current_page() -> str:
    """Get the current page name from the script path."""
    try:
        script_path = Path(st.runtime.scriptrunner.script_run_context.get_script_run_ctx().script_path)
        if 'pages' in script_path.parts:
            if '1_stores' in script_path.stem:
                return 'stores'
            elif '2_analytics' in script_path.stem:
                return 'analytics'
        return 'home'
    except:
        return 'home'

def navbar() -> None:
    """Render the navigation bar with improved styling and active state."""
    current_page = get_current_page()
    
    st.markdown("""
        <style>
        .navbar {
            padding: 1rem 2rem;
            background: linear-gradient(to right, #2563EB, #1D4ED8);
            margin: -1rem -1rem 1rem -1rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 999;
        }
        .navbar-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .nav-brand {
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .nav-links {
            display: flex;
            gap: 1rem;
        }
        .nav-link {
            color: rgba(255,255,255,0.9);
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            transition: all 0.2s;
            font-weight: 500;
        }
        .nav-link:hover {
            background: rgba(255,255,255,0.1);
            color: white;
        }
        .nav-link.active {
            background: rgba(255,255,255,0.2);
            color: white;
        }
        @media (max-width: 768px) {
            .navbar-content {
                flex-direction: column;
                gap: 1rem;
            }
            .nav-links {
                flex-wrap: wrap;
                justify-content: center;
            }
        }
        </style>
        
        <div class="navbar">
            <div class="navbar-content">
                <a href="." class="nav-brand" target="_self">
                    🏪 Connect You
                </a>
                <div class="nav-links">
                    <a href="." 
                       class="nav-link {active if current_page == 'home' else ''}" 
                       target="_self">
                        🏠 Home
                    </a>
                    <a href="1_stores" 
                       class="nav-link {active if current_page == 'stores' else ''}" 
                       target="_self">
                        📍 Stores
                    </a>
                    <a href="2_analytics" 
                       class="nav-link {active if current_page == 'analytics' else ''}" 
                       target="_self">
                        📊 Analytics
                    </a>
                </div>
            </div>
        </div>
    """, unsafe_allow_html=True)
