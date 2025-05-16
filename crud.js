// CRUD operations for MongoDB collections
const { connectToDatabase, closeConnection } = require('./db');
const { ObjectId } = require('mongodb');

// General Assistant CRUD operations
const GeneralAssistant = {
  // Create a new general assistant
  async create(assistantData) {
    let db;
    try {
      db = await connectToDatabase();
      const collection = db.collection('general_assistant');
      
      // Add timestamps
      assistantData.created_at = new Date();
      assistantData.updated_at = new Date();
      
      const result = await collection.insertOne(assistantData);
      console.log(`Created general assistant with ID: ${result.insertedId}`);
      return result.insertedId;
    } catch (err) {
      console.error('Error creating general assistant:', err);
      throw err;
    } finally {
      if (db) await closeConnection();
    }
  },
  
  // Get a general assistant by ID
  async getById(id) {
    let db;
    try {
      db = await connectToDatabase();
      const collection = db.collection('general_assistant');
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.error('Error getting general assistant:', err);
      throw err;
    } finally {
      if (db) await closeConnection();
    }
  },
  
  // Update a general assistant
  async update(id, updateData) {
    let db;
    try {
      db = await connectToDatabase();
      const collection = db.collection('general_assistant');
      
      // Update timestamp
      updateData.updated_at = new Date();
      
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      
      return result.modifiedCount > 0;
    } catch (err) {
      console.error('Error updating general assistant:', err);
      throw err;
    } finally {
      if (db) await closeConnection();
    }
  },
  
  // Delete a general assistant
  async delete(id) {
    let db;
    try {
      db = await connectToDatabase();
      const collection = db.collection('general_assistant');
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (err) {
      console.error('Error deleting general assistant:', err);
      throw err;
    } finally {
      if (db) await closeConnection();
    }
  }
};

// Factory function to create CRUD operations for specialized agents
function createSpecializedAgentCRUD(agentType) {
  const collectionName = `${agentType.toLowerCase()}_agent`;
  
  return {
    // Create a new specialized agent
    async create(agentData) {
      let db;
      try {
        db = await connectToDatabase();
        const collection = db.collection(collectionName);
        
        // Ensure agent_type is set correctly
        agentData.agent_type = agentType;
        
        // Add timestamps
        agentData.created_at = new Date();
        agentData.updated_at = new Date();
        
        const result = await collection.insertOne(agentData);
        console.log(`Created ${agentType} agent with ID: ${result.insertedId}`);
        return result.insertedId;
      } catch (err) {
        console.error(`Error creating ${agentType} agent:`, err);
        throw err;
      } finally {
        if (db) await closeConnection();
      }
    },
    
    // Get a specialized agent by ID
    async getById(id) {
      let db;
      try {
        db = await connectToDatabase();
        const collection = db.collection(collectionName);
        return await collection.findOne({ _id: new ObjectId(id) });
      } catch (err) {
        console.error(`Error getting ${agentType} agent:`, err);
        throw err;
      } finally {
        if (db) await closeConnection();
      }
    },
    
    // Get specialized agents by parent ID
    async getByParentId(parentId) {
      let db;
      try {
        db = await connectToDatabase();
        const collection = db.collection(collectionName);
        return await collection.find({ parent_id: new ObjectId(parentId) }).toArray();
      } catch (err) {
        console.error(`Error getting ${agentType} agents by parent ID:`, err);
        throw err;
      } finally {
        if (db) await closeConnection();
      }
    },
    
    // Update a specialized agent
    async update(id, updateData) {
      let db;
      try {
        db = await connectToDatabase();
        const collection = db.collection(collectionName);
        
        // Update timestamp
        updateData.updated_at = new Date();
        
        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );
        
        return result.modifiedCount > 0;
      } catch (err) {
        console.error(`Error updating ${agentType} agent:`, err);
        throw err;
      } finally {
        if (db) await closeConnection();
      }
    },
    
    // Delete a specialized agent
    async delete(id) {
      let db;
      try {
        db = await connectToDatabase();
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
      } catch (err) {
        console.error(`Error deleting ${agentType} agent:`, err);
        throw err;
      } finally {
        if (db) await closeConnection();
      }
    }
  };
}

// Create CRUD operations for each specialized agent type
const MurderAgent = createSpecializedAgentCRUD('Murder');
const TheftAgent = createSpecializedAgentCRUD('Theft');
const FraudAgent = createSpecializedAgentCRUD('Fraud');
const AccidentAgent = createSpecializedAgentCRUD('Accident');

// Conversation CRUD operations
const Conversation = {
  // Create a new conversation
  async create(conversationData) {
    let db;
    try {
      db = await connectToDatabase();
      const collection = db.collection('conversations');
      
      // Add timestamps
      conversationData.created_at = new Date();
      conversationData.updated_at = new Date();
      
      // Initialize messages array if not provided
      if (!conversationData.messages) {
        conversationData.messages = [];
      }
      
      const result = await collection.insertOne(conversationData);
      console.log(`Created conversation with ID: ${result.insertedId}`);
      return result.insertedId;
    } catch (err) {
      console.error('Error creating conversation:', err);
      throw err;
    } finally {
      if (db) await closeConnection();
    }
  },
  
  // Get a conversation by ID
  async getById(id) {
    let db;
    try {
      db = await connectToDatabase();
      const collection = db.collection('conversations');
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.error('Error getting conversation:', err);
      throw err;
    } finally {
      if (db) await closeConnection();
    }
  },
  
  // Get conversations by user ID
  async getByUserId(userId) {
    let db;
    try {
      db = await connectToDatabase();
      const collection = db.collection('conversations');
      return await collection.find({ user_id: userId }).sort({ created_at: -1 }).toArray();
    } catch (err) {
      console.error('Error getting conversations by user ID:', err);
      throw err;
    } finally {
      if (db) await closeConnection();
    }
  },
  
  // Add a message to a conversation
  async addMessage(id, message) {
    let db;
    try {
      db = await connectToDatabase();
      const collection = db.collection('conversations');
      
      // Ensure message has a timestamp
      if (!message.timestamp) {
        message.timestamp = new Date();
      }
      
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $push: { messages: message },
          $set: { updated_at: new Date() }
        }
      );
      
      return result.modifiedCount > 0;
    } catch (err) {
      console.error('Error adding message to conversation:', err);
      throw err;
    } finally {
      if (db) await closeConnection();
    }
  },
  
  // Update conversation metadata
  async updateMetadata(id, metadata) {
    let db;
    try {
      db = await connectToDatabase();
      const collection = db.collection('conversations');
      
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            metadata: metadata,
            updated_at: new Date() 
          }
        }
      );
      
      return result.modifiedCount > 0;
    } catch (err) {
      console.error('Error updating conversation metadata:', err);
      throw err;
    } finally {
      if (db) await closeConnection();
    }
  },
  
  // Delete a conversation
  async delete(id) {
    let db;
    try {
      db = await connectToDatabase();
      const collection = db.collection('conversations');
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (err) {
      console.error('Error deleting conversation:', err);
      throw err;
    } finally {
      if (db) await closeConnection();
    }
  }
};

// Export all CRUD operations
module.exports = {
  GeneralAssistant,
  MurderAgent,
  TheftAgent,
  FraudAgent,
  AccidentAgent,
  Conversation
};
