from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import json
from datetime import datetime
import os
import sys
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Ensure the data directory exists
try:
    if not os.path.exists('data'):
        os.makedirs('data')
except Exception as e:
    logger.error(f"Failed to create data directory: {e}")
    sys.exit(1)

# Load store data from a JSON file (we'll create this later)
def load_store_data():
    try:
        with open('data/stores.json', 'r') as f:
            return pd.DataFrame(json.load(f))
    except FileNotFoundError:
        # Sample data if file doesn't exist
        return pd.DataFrame({
            'id': range(1, 6),
            'name': ['Central Grocery', 'City Books', 'Electronics Hub', 'Fashion Store', 'General Shop'],
            'type': ['grocery', 'books', 'electronics', 'clothing', 'general'],
            'address': [
                '123 Main St, New York, NY',
                '456 Book Lane, New York, NY',
                '789 Tech Ave, New York, NY',
                '321 Fashion Blvd, New York, NY',
                '654 Market St, New York, NY'
            ],
            'lat': [40.7128, 40.7138, 40.7148, 40.7158, 40.7168],
            'lon': [-74.0060, -74.0070, -74.0080, -74.0090, -74.0100],
            'rating': [4.5, 4.8, 4.2, 4.6, 4.4],
            'reviews': [120, 85, 95, 150, 75]
        })

@app.route('/api/stores', methods=['GET'])
def get_stores():
    store_type = request.args.get('type', 'all').lower()
    search_query = request.args.get('query', '').lower()
    
    df = load_store_data()
    
    # Apply filters
    if store_type != 'all':
        df = df[df['type'] == store_type]
    
    if search_query:
        df = df[
            df['name'].str.lower().str.contains(search_query) |
            df['address'].str.lower().str.contains(search_query)
        ]
    
    # Convert to dictionary format
    stores = df.to_dict('records')
    return jsonify({
        'stores': stores,
        'total': len(stores),
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/store-types', methods=['GET'])
def get_store_types():
    df = load_store_data()
    types = sorted(df['type'].unique().tolist())
    return jsonify({
        'types': types,
        'total': len(types)
    })

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    df = load_store_data()
    
    analytics = {
        'total_stores': len(df),
        'stores_by_type': df['type'].value_counts().to_dict(),
        'average_rating': df['rating'].mean(),
        'total_reviews': df['reviews'].sum(),
        'top_rated': df.nlargest(5, 'rating')[['name', 'rating', 'type']].to_dict('records')
    }
    
    return jsonify(analytics)

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    feedback = request.json
    # In a real application, you would save this to a database
    # For now, we'll just return a success message
    return jsonify({
        'status': 'success',
        'message': 'Feedback received successfully',
        'timestamp': datetime.now().isoformat()
    })

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    try:
        # Check if port 5000 is available
        import socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = sock.connect_ex(('127.0.0.1', 5000))
        sock.close()
        
        if result == 0:
            logger.warning("Port 5000 is already in use. Trying port 5001...")
            port = 5001
        else:
            port = 5000
            
        # Run the Flask app
        logger.info(f"Starting Flask server on port {port}")
        app.run(
            host='0.0.0.0',
            port=port,
            debug=True,
            use_reloader=True
        )
    except Exception as e:
        logger.error(f"Failed to start Flask server: {e}")
        sys.exit(1)
