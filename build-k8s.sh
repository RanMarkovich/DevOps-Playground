#!/bin/bash

# Build script for Kubernetes deployment
echo "Building frontend image for Kubernetes deployment..."

# Build the Docker image with Kubernetes service URL
docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://backend-app-service:80 \
  -t ranmarkovich/devops-frontend-app:main \
  .

echo "Build completed. Pushing to registry..."

# Push to registry
docker push ranmarkovich/devops-frontend-app:main

echo "Image pushed successfully!"
echo "You can now deploy to Kubernetes using: kubectl apply -f fe-deployment.yml" 