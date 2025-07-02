#!/bin/bash

# Script to synchronize Next.js version between admin and customer apps

# Get the Next.js version from admin
cd my-ecommerce-admin
ADMIN_NEXT_VERSION=$(grep -o '"next": ".*"' package.json | sed 's/"next": "\(.*\)"/\1/')
echo "Admin Next.js version: $ADMIN_NEXT_VERSION"

# Update the customer Next.js version
cd ../my-ecommerce-customer
CUSTOMER_NEXT_VERSION=$(grep -o '"next": ".*"' package.json | sed 's/"next": "\(.*\)"/\1/')
echo "Current customer Next.js version: $CUSTOMER_NEXT_VERSION"

if [ "$ADMIN_NEXT_VERSION" != "$CUSTOMER_NEXT_VERSION" ]; then
  echo "Updating customer Next.js version to $ADMIN_NEXT_VERSION"
  sed -i "s/\"next\": \".*\"/\"next\": \"$ADMIN_NEXT_VERSION\"/" package.json
  npm install
  echo "Customer Next.js version updated to $ADMIN_NEXT_VERSION"
else
  echo "Next.js versions are already in sync"
fi
