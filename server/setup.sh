#!/bin/bash

# Initialize package.json if it doesn't exist
if [ ! -f package.json ]; then
  npm init -y
fi

# Install dependencies
npm install express cors helmet morgan mongoose bcrypt jsonwebtoken dotenv

# Install dev dependencies
npm install --save-dev typescript @types/node @types/express @types/cors @types/helmet @types/morgan @types/mongoose @types/bcrypt @types/jsonwebtoken ts-node-dev

# Create tsconfig.json if it doesn't exist
if [ ! -f tsconfig.json ]; then
  npx tsc --init
fi