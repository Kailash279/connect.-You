# Activate virtual environment if it exists
if (Test-Path "venv\Scripts\Activate.ps1") {
    .\venv\Scripts\Activate.ps1
}

# Install requirements if needed
if (Test-Path "requirements.txt") {
    pip install -r requirements.txt
}

# Ensure data directory exists
if (-not (Test-Path "data")) {
    New-Item -ItemType Directory -Path "data"
}

# Start the Flask server
$env:FLASK_APP = "app.py"
$env:FLASK_ENV = "development"
$env:FLASK_DEBUG = "1"
python app.py
