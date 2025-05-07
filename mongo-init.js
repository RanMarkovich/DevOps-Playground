// Wait for MongoDB to start before configuring replica set
setTimeout(() => {
  try {
    // Initialize replica set
    rs.initiate({
      _id: "rs0",
      members: [
        { _id: 0, host: "mongodb:27017" }
      ]
    });
    
    console.log("MongoDB Replica Set initialized successfully");
  } catch (error) {
    console.error("Error initializing replica set:", error);
  }
}, 5000); 