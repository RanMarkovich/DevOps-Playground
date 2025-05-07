#!/bin/bash
set -e

# Wait for MongoDB to start
echo "Waiting for MongoDB to start..."
until mongosh --host mongodb:27017 --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
  echo "Waiting for MongoDB connection..."
  sleep 2
done

echo "MongoDB started, initializing replica set..."

# Initialize replica set
mongosh --host mongodb:27017 <<EOF
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongodb:27017" }
  ]
});
EOF

echo "MongoDB Replica Set initialized successfully" 