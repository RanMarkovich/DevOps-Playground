#!/bin/bash
set -e

echo "Waiting for MongoDB to start (with retries)..."

# Wait for MongoDB to be ready
for i in {1..60}; do
  echo "Attempt $i: Connecting to MongoDB..."
  mongosh --host mongodb:27017 --eval 'db.runCommand({ping: 1})' &>/dev/null
  if [ $? -eq 0 ]; then
    echo "MongoDB is up and ready. Configuring replica set..."
    break
  fi
  echo "MongoDB not yet available, retrying in 2 seconds..."
  sleep 2
  
  # If we've reached our max retries, exit with error
  if [ $i -eq 60 ]; then
    echo "Failed to connect to MongoDB after 60 attempts"
    exit 1
  fi
done

# Initialize the replica set
echo "Initializing MongoDB replica set..."
mongosh --host mongodb:27017 <<EOF
try {
  var status = rs.status();
  if(status.ok === 0) {
    printjson(rs.initiate({
      _id: 'rs0',
      members: [{ _id: 0, host: 'mongodb:27017', priority: 1 }]
    }));
    print('Initiated replica set');
  } else {
    print('Replica set already initialized');
  }
} catch (err) {
  print('Error checking replica set status: ' + err);
  printjson(rs.initiate({
    _id: 'rs0',
    members: [{ _id: 0, host: 'mongodb:27017', priority: 1 }]
  }));
  print('Initiated replica set');
}
EOF

# Wait for replica set to be ready and for a primary to be elected
echo "Waiting for replica set to be ready and primary to be elected..."
for i in {1..60}; do
  echo "Checking replica set status (attempt $i)..."
  
  # Check if replica set is initialized and has a primary
  PRIMARY_CHECK=$(mongosh --host mongodb:27017 --quiet --eval "
    try {
      var status = rs.status();
      if (status.ok === 1) {
        for (var i = 0; i < status.members.length; i++) {
          if (status.members[i].state === 1) {
            // State 1 means primary
            print('PRIMARY_FOUND');
            quit(0);
          }
        }
      }
      print('NO_PRIMARY');
    } catch (err) {
      print('ERROR: ' + err);
    }
  ")
  
  echo "Status check result: $PRIMARY_CHECK"
  
  if [ "$PRIMARY_CHECK" == "PRIMARY_FOUND" ]; then
    echo "Replica set is now initialized with a primary!"
    
    # Create a database to ensure everything is working
    echo "Creating a test database to verify functionality..."
    mongosh --host mongodb:27017 --eval "db.getSiblingDB('test').createCollection('init_test')"
    
    echo "MongoDB replica set is fully operational!"
    exit 0
  fi
  
  echo "Waiting for replica set to be fully initialized with a primary..."
  sleep 2
done

echo "Replica set initialization failed or timed out"
exit 1 