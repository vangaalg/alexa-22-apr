#!/usr/bin/env bash
# This is the start script for Render deployment

# Exit on error
set -o errexit

# Print current directory
echo "Current directory: $(pwd)"
ls -la

# If admin-ui directory exists, navigate to it
if [ -d "admin-ui" ]; then
  echo "admin-ui directory found, navigating..."
  cd admin-ui
elif [ -d "ALEXA/admin-ui" ]; then
  echo "ALEXA/admin-ui directory found, navigating..."
  cd ALEXA/admin-ui
else
  echo "ERROR: Could not find admin-ui directory"
  exit 1
fi

# Print current directory after navigation
echo "Starting app from directory: $(pwd)"

# Start the application
node server.js 