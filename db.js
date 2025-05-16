// MongoDB connection and database setup
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URL - using environment variable for security
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'financial_ai_agent_db';

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    return client.db(dbName);
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
}

// Close the connection
async function closeConnection() {
  try {
    await client.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    throw err;
  }
}

// Export the connection functions
module.exports = {
  connectToDatabase,
  closeConnection,
  getClient: () => client
};
