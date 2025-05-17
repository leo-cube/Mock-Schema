// Collection creation and schema validation setup
const { connectToDatabase, closeConnection } = require('./db');
const schemas = require('./general_assistant_schema');

// Function to create collections with validation
async function createCollections() {
  let db;
  try {
    db = await connectToDatabase();
    console.log('Creating collections with schema validation...');

    // Create General Assistant collection
    await createCollectionWithValidation(db, 'general_assistant', schemas.generalAssistantSchema.schema);
    
    // Create specialized agent collections
    await createCollectionWithValidation(db, 'murder_agent', schemas.murderAgentSchema.schema);
    await createCollectionWithValidation(db, 'theft_agent', schemas.theftAgentSchema.schema);
    await createCollectionWithValidation(db, 'fraud_agent', schemas.fraudAgentSchema.schema);
    await createCollectionWithValidation(db, 'accident_agent', schemas.accidentAgentSchema.schema);
    
    // Create conversation collection
    await createCollectionWithValidation(db, 'conversations', schemas.conversationSchema.schema);
    
    console.log('All collections created successfully with schema validation');
    return true;
  } catch (err) {
    console.error('Error creating collections:', err);
    throw err;
  } finally {
    if (db) await closeConnection();
  }
}

// Helper function to create a collection with schema validation
async function createCollectionWithValidation(db, collectionName, validationSchema) {
  try {
    // Check if collection already exists
    const collections = await db.listCollections({ name: collectionName }).toArray();
    
    if (collections.length > 0) {
      console.log(`Collection ${collectionName} already exists. Updating validation schema...`);
      await db.command({
        collMod: collectionName,
        validator: { $jsonSchema: validationSchema },
        validationLevel: 'moderate',
        validationAction: 'error'
      });
    } else {
      console.log(`Creating collection: ${collectionName}`);
      await db.createCollection(collectionName, {
        validator: { $jsonSchema: validationSchema },
        validationLevel: 'moderate',
        validationAction: 'error'
      });
    }
    
    console.log(`Collection ${collectionName} setup complete with schema validation`);
    return true;
  } catch (err) {
    console.error(`Error setting up collection ${collectionName}:`, err);
    throw err;
  }
}

// Function to create indexes for efficient querying
async function createIndexes() {
  let db;
  try {
    db = await connectToDatabase();
    console.log('Creating indexes for collections...');
    
    // Indexes for General Assistant collection
    await db.collection('general_assistant').createIndex({ name: 1 }, { unique: true });
    
    // Indexes for specialized agent collections
    await db.collection('murder_agent').createIndex({ parent_id: 1 });
    await db.collection('theft_agent').createIndex({ parent_id: 1 });
    await db.collection('fraud_agent').createIndex({ parent_id: 1 });
    await db.collection('accident_agent').createIndex({ parent_id: 1 });
    
    // Indexes for conversation collection
    await db.collection('conversations').createIndex({ user_id: 1 });
    await db.collection('conversations').createIndex({ agent_id: 1 });
    await db.collection('conversations').createIndex({ agent_type: 1 });
    await db.collection('conversations').createIndex({ created_at: -1 });
    
    console.log('All indexes created successfully');
    return true;
  } catch (err) {
    console.error('Error creating indexes:', err);
    throw err;
  } finally {
    if (db) await closeConnection();
  }
}

(async () => {
  try {
    await createCollections();
    await createIndexes();
    console.log('Database setup completed successfully.');
  } catch (err) {
    console.error('Setup failed:', err);
  }
})();



// Export functions
module.exports = {
  createCollections,
  createIndexes
};
