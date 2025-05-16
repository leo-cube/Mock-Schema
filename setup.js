// Main setup script for MongoDB collections
const { createCollections, createIndexes } = require('./src/collection_setup');
const { insertAllSampleData } = require('./src/sample_data');
const { runAllTests } = require('./src/validation');

// Package.json content
const packageJson = {
  "name": "financial-ai-agent-mongodb",
  "version": "1.0.0",
  "description": "MongoDB collection setup for Financial AI Agent with RAG methodology",
  "main": "setup.js",
  "scripts": {
    "setup": "node setup.js",
    "test": "node src/validation.js"
  },
  "dependencies": {
    "dotenv": "^16.0.3",
    "mongodb": "^5.1.0"
  }
};

// Create .env file template
const envTemplate = `# MongoDB Connection Settings
MONGODB_URI=mongodb://localhost:27017
DB_NAME=financial_ai_agent_db

# Add other environment variables as needed
`;

// Write package.json and .env files
const fs = require('fs');
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
fs.writeFileSync('.env.example', envTemplate);
console.log('Created package.json and .env.example files');

// Main setup function
async function setup() {
  console.log('Starting Financial AI Agent MongoDB setup...');
  
  try {
    // Step 1: Create collections with schema validation
    console.log('\n--- Step 1: Creating collections with schema validation ---');
    await createCollections();
    
    // Step 2: Create indexes for efficient querying
    console.log('\n--- Step 2: Creating indexes for efficient querying ---');
    await createIndexes();
    
    // Step 3: Insert sample data (optional)
    console.log('\n--- Step 3: Inserting sample data ---');
    await insertAllSampleData();
    
    // Step 4: Run validation tests
    console.log('\n--- Step 4: Running validation tests ---');
    const validationResult = await runAllTests();
    
    if (validationResult) {
      console.log('\n✅ Financial AI Agent MongoDB setup completed successfully!');
      console.log('The following collections are now available:');
      console.log('- general_assistant: Parent collection for all agents');
      console.log('- murder_agent: Specialized agent for murder investigations');
      console.log('- theft_agent: Specialized agent for theft investigations');
      console.log('- fraud_agent: Specialized agent for fraud investigations');
      console.log('- accident_agent: Specialized agent for accident investigations');
      console.log('- conversations: Stores interactions between users and agents');
    } else {
      console.error('\n❌ Financial AI Agent MongoDB setup encountered errors.');
      console.error('Please check the logs above for details.');
    }
  } catch (err) {
    console.error('\n❌ Error during setup:', err);
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  setup()
    .then(() => {
      console.log('\nSetup process completed.');
    })
    .catch(err => {
      console.error('Unhandled error during setup:', err);
      process.exit(1);
    });
}

module.exports = { setup };
