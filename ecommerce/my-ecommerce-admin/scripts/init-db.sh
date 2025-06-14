#!/bin/bash

echo "Waiting for database to be ready..."
until npx prisma db push --force-reset; do
  echo "Database not ready yet, retrying in 5 seconds..."
  sleep 5
done

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Generating Prisma client..."
npx prisma generate

echo "Database initialization completed!"
