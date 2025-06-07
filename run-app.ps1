# Check Python installation
try {
    $pythonVersion = python --version
    Write-Host "Using $pythonVersion"
} catch {
    Write-Error "Python is not installed or not in PATH!"
    exit 1
}

# Check if virtual environment exists
if (-not (Test-Path ".\venv")) {
    Write-Host "Creating virtual environment..."
    try {
        python -m venv venv
    } catch {
        Write-Error "Failed to create virtual environment: $_"
        exit 1
    }
}

# Activate virtual environment
Write-Host "Activating virtual environment..."
try {
    .\venv\Scripts\Activate
} catch {
    Write-Error "Failed to activate virtual environment: $_"
    exit 1
}

# Install requirements if needed
if (-not (Test-Path ".\venv\Lib\site-packages\streamlit")) {
    Write-Host "Installing requirements..."
    try {
        pip install -r requirements.txt
        if ($LASTEXITCODE -ne 0) {
            throw "pip install failed with exit code $LASTEXITCODE"
        }
    } catch {
        Write-Error "Failed to install requirements: $_"
        exit 1
    }
}

# Create necessary directories
if (-not (Test-Path ".\data")) {
    Write-Host "Creating data directory..."
    New-Item -ItemType Directory -Path "data"
}

if (-not (Test-Path ".\assets")) {
    Write-Host "Creating assets directory..."
    New-Item -ItemType Directory -Path "assets"
}

# Run the application
Write-Host "Starting Streamlit application..."
try {
    streamlit run app.py
} catch {
    Write-Error "Failed to start Streamlit app: $_"
    exit 1
}