from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
import pickle
import os

app = Flask(__name__)
CORS(app)

# Global variables for model and scaler
model = None
scaler = None

def load_model_and_scaler():
    """Load the trained model and scaler"""
    global model, scaler
    
    try:
        # Try loading SavedModel format first
        if os.path.exists('laptop_price_model'):
            model = load_model('laptop_price_model')
            print("Model loaded successfully from SavedModel format!")
        elif os.path.exists('laptop_price_model.h5'):
            model = load_model('laptop_price_model.h5')
            print("Model loaded successfully from H5 format!")
        else:
            raise FileNotFoundError("No model file found")
        
        # Load the scaler
        with open('scaler.pkl', 'rb') as f:
            scaler = pickle.load(f)
        print("Scaler loaded successfully!")
        
    except Exception as e:
        print(f"Error loading model or scaler: {e}")
        print("Using mock prediction instead")

@app.route('/')
def index():
    """Serve the main HTML page"""
    try:
        with open('laptop_predictor.html', 'r') as f:
            html_content = f.read()
        return html_content
    except FileNotFoundError:
        return "HTML file not found. Please ensure laptop_predictor.html is in the same directory."

@app.route('/predict', methods=['POST'])
def predict():
    """Predict laptop price based on input features"""
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Extract features in the correct order (matching your model training)
        features = [
            data['inches'],
            data['ram'],
            data['weight'],
            data['cpu_frequency'],
            data['memory_amount'],
            data['screen_width'],
            data['screen_height'],
            data['intel_cpu'],
            data['nvidia_gpu'],
            data['amd_cpu'],
            data['amd_gpu'],
            data['intel_gpu'],
            data['arm_gpu']
        ]
        
        # Convert to numpy array
        input_data = np.array(features).reshape(1, -1)
        
        if model is not None and scaler is not None:
            # Scale the input data
            input_scaled = scaler.transform(input_data)
            
            # Make prediction
            prediction = model.predict(input_scaled, verbose=0)
            predicted_price = float(prediction[0][0])
        else:
            # Mock prediction if model not loaded
            predicted_price = mock_prediction(features)
        
        return jsonify({
            'predicted_price': predicted_price,
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 400

def mock_prediction(features):
    """Generate a mock prediction based on features"""
    # Simple mock prediction logic
    base_price = 500
    
    # Add price based on features
    inches, ram, weight, cpu_freq, memory, screen_w, screen_h, intel_cpu, nvidia_gpu, amd_cpu, amd_gpu, intel_gpu, arm_gpu = features
    
    base_price += ram * 50  # RAM contribution
    base_price += memory * 0.5  # Storage contribution
    base_price += (screen_w / 1920) * 300  # Screen resolution contribution
    base_price += nvidia_gpu * 400  # Nvidia GPU premium
    base_price += amd_gpu * 200  # AMD GPU contribution
    base_price += inches * 30  # Screen size contribution
    base_price += cpu_freq * 100  # CPU frequency contribution
    
    # Add some randomness
    base_price += np.random.normal(0, 50)
    
    return max(200, base_price)  # Minimum price of 200 euros

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'scaler_loaded': scaler is not None
    })

if __name__ == '__main__':
    # Load model and scaler on startup
    load_model_and_scaler()
    
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)