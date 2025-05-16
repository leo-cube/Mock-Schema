// Test script for validating MongoDB collection setup and CRUD operations
const { connectToDatabase, closeConnection } = require('./db');
const { createCollections, createIndexes } = require('./collection_setup');
const {
  GeneralAssistant,
  MurderAgent,
  TheftAgent,
  FraudAgent,
  AccidentAgent,
  Conversation
} = require('./crud');
const { insertAllSampleData } = require('./sample_data');

// Test database connection
async function testConnection() {
  try {
    const db = await connectToDatabase();
    console.log('✅ Database connection successful');
    await closeConnection();
    return true;
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    return false;
  }
}

// Test collection creation and schema validation
async function testCollectionCreation() {
  try {
    await createCollections();
    console.log('✅ Collections created successfully with schema validation');
    return true;
  } catch (err) {
    console.error('❌ Collection creation failed:', err);
    return false;
  }
}

// Test index creation
async function testIndexCreation() {
  try {
    await createIndexes();
    console.log('✅ Indexes created successfully');
    return true;
  } catch (err) {
    console.error('❌ Index creation failed:', err);
    return false;
  }
}

// Test sample data insertion
async function testSampleDataInsertion() {
  try {
    await insertAllSampleData();
    console.log('✅ Sample data inserted successfully');
    return true;
  } catch (err) {
    console.error('❌ Sample data insertion failed:', err);
    return false;
  }
}

// Test CRUD operations
async function testCRUDOperations() {
  try {
    // Test General Assistant CRUD
    console.log('Testing General Assistant CRUD operations...');
    const generalAssistantId = await GeneralAssistant.create({
      name: "Test General Assistant",
      description: "A test general assistant",
      capabilities: ["Testing"],
      created_at: new Date(),
      updated_at: new Date()
    });
    
    const retrievedAssistant = await GeneralAssistant.getById(generalAssistantId);
    console.log('Retrieved assistant:', retrievedAssistant.name);
    
    const updateResult = await GeneralAssistant.update(generalAssistantId, {
      description: "Updated test description"
    });
    console.log('Update result:', updateResult);
    
    const deleteResult = await GeneralAssistant.delete(generalAssistantId);
    console.log('Delete result:', deleteResult);
    
    console.log('✅ General Assistant CRUD operations successful');
    
    // Test Conversation CRUD
    console.log('Testing Conversation CRUD operations...');
    const conversationId = await Conversation.create({
      user_id: "test_user",
      agent_id: generalAssistantId,
      agent_type: "General",
      messages: []
    });
    
    const addMessageResult = await Conversation.addMessage(conversationId, {
      sender: "user",
      content: "Test message",
      timestamp: new Date()
    });
    console.log('Add message result:', addMessageResult);
    
    const retrievedConversation = await Conversation.getById(conversationId);
    console.log('Retrieved conversation message count:', retrievedConversation.messages.length);
    
    const deleteConversationResult = await Conversation.delete(conversationId);
    console.log('Delete conversation result:', deleteConversationResult);
    
    console.log('✅ Conversation CRUD operations successful');
    
    return true;
  } catch (err) {
    console.error('❌ CRUD operations test failed:', err);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('Starting validation tests...');
  
  // Test connection
  const connectionResult = await testConnection();
  if (!connectionResult) {
    console.error('❌ Validation failed at connection test');
    return false;
  }
  
  // Test collection creation
  const collectionResult = await testCollectionCreation();
  if (!collectionResult) {
    console.error('❌ Validation failed at collection creation test');
    return false;
  }
  
  // Test index creation
  const indexResult = await testIndexCreation();
  if (!indexResult) {
    console.error('❌ Validation failed at index creation test');
    return false;
  }
  
  // Test CRUD operations
  const crudResult = await testCRUDOperations();
  if (!crudResult) {
    console.error('❌ Validation failed at CRUD operations test');
    return false;
  }
  
  // Test sample data insertion
  const sampleDataResult = await testSampleDataInsertion();
  if (!sampleDataResult) {
    console.error('❌ Validation failed at sample data insertion test');
    return false;
  }
  
  console.log('✅ All validation tests passed successfully');
  return true;
}

// Export test functions
module.exports = {
  testConnection,
  testCollectionCreation,
  testIndexCreation,
  testSampleDataInsertion,
  testCRUDOperations,
  runAllTests
};

// Run tests if this script is executed directly
if (require.main === module) {
  runAllTests()
    .then(result => {
      console.log(`Validation ${result ? 'completed successfully' : 'failed'}`);
      process.exit(result ? 0 : 1);
    })
    .catch(err => {
      console.error('Error during validation:', err);
      process.exit(1);
    });
}
