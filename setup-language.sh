#!/bin/bash

# Function to setup Irish configuration
setup_gaeilge() {
    # Remove existing files
    rm -f _config.yml _layouts/default.html index.md assets/data/dictionary.json
    
    # Rename config file
    mv _config.gaeilge.yml _config.yml
    
    # Rename layout file
    mv _layouts/default.gaeilge.html _layouts/default.html
    
    # Rename index file
    mv index.gaeilge.md index.md
    
    # Update dictionary path
    mv assets/data/dictionary.gaeilge.json assets/data/dictionary.json
}

# Function to setup Manx configuration
setup_gaelg() {
    # Remove existing files
    rm -f _config.yml _layouts/default.html index.md assets/data/dictionary.json
    
    # Rename config file
    mv _config.gaelg.yml _config.yml
    
    # Rename layout file
    mv _layouts/default.gaelg.html _layouts/default.html
    
    # Rename index file
    mv index.gaelg.md index.md
    
    # Update dictionary path
    mv assets/data/dictionary.gaelg.json assets/data/dictionary.json
}

# Check which repository we're in
if [[ "$PWD" == *"focloir-na-ngaylgeoiri"* ]]; then
    setup_gaeilge
elif [[ "$PWD" == *"fockleyr-ny-gaylgyryn"* ]]; then
    setup_gaelg
else
    echo "Not in a language-specific repository"
    exit 1
fi 