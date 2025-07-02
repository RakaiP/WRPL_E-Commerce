#!/bin/bash

# Script to update the customer app's Next.js version and regenerate package-lock.json

echo "Updating customer app dependencies..."

# Get admin Next.js version
cd my-ecommerce-admin
ADMIN_NEXT_VERSION=$(grep -o '"next": ".*"' package.json | sed 's/"next": "\(.*\)"/\1/')
echo "Admin Next.js version: $ADMIN_NEXT_VERSION"

# Update customer package.json and regenerate package-lock.json
cd ../my-ecommerce-customer
echo "Updating Next.js version to $ADMIN_NEXT_VERSION"

# Update Next.js version in package.json
sed -i "s/\"next\": \".*\"/\"next\": \"$ADMIN_NEXT_VERSION\"/" package.json

# Remove package-lock.json and regenerate it
echo "Regenerating package-lock.json..."
rm -f package-lock.json
npm install --package-lock-only

echo "Customer app dependencies updated successfully!"
