#!/bin/bash
set -e

VERSION="v1.0.0"
BINARY_URL="https://github.com/skillDeCoder/Idle-finance-v2-backend/releases/download/v1.0.0/backend-macos"
ENV_FILE_ID="1H8uAgVARe4GkMHNU2usNc73u39GjHndu"

# Retry settings
RETRY_COUNT=5
RETRY_DELAY=5
TIMEOUT=30

echo "
#### ########  ##       ########         ######## #### ##    ##    ###    ##    ##  ######  ######## 
 ##  ##     ## ##       ##               ##        ##  ###   ##   ## ##   ###   ## ##    ## ##       
 ##  ##     ## ##       ##               ##        ##  ####  ##  ##   ##  ####  ## ##       ##       
 ##  ##     ## ##       ######   ####### ######    ##  ## ## ## ##     ## ## ## ## ##       ######   
 ##  ##     ## ##       ##               ##        ##  ##  #### ######### ##  #### ##       ##       
 ##  ##     ## ##       ##               ##        ##  ##   ### ##     ## ##   ### ##    ## ##       
#### ########  ######## ########         ##       #### ##    ## ##     ## ##    ##  ######  ######## 
"

echo "Downloading backend (macOS)..."
curl --retry $RETRY_COUNT --retry-delay $RETRY_DELAY --retry-connrefused --fail --show-error --location --max-time $TIMEOUT "$BINARY_URL" -o backend

echo "Making backend executable..."
chmod +x backend

echo "Downloading .env file from Google Drive..."
curl --retry $RETRY_COUNT --retry-delay $RETRY_DELAY --retry-connrefused --fail --show-error --location --max-time $TIMEOUT -o .env "https://drive.google.com/uc?export=download&id=${ENV_FILE_ID}"

echo "Running backend..."
./backend