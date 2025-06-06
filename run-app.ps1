# Check if virtual environment exists and create if it doesn't
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..."
    python -m venv venv
}

# Activate virtual environment
Write-Host "Activating virtual environment..."
.\venv\Scripts\Activate.ps1

# Install requirements
Write-Host "Installing requirements..."
pip install -r requirements.txt

# Run the Streamlit app
Write-Host "Starting Streamlit app..."
# Start the Streamlit application
Write-Host "Starting Store Locator application..."
$env:PYTHONPATH = $PWD
streamlit run app.py