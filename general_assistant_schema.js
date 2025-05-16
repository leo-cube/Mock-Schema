// MongoDB Schema for General Assistant Collection

// General Assistant Schema
const generalAssistantSchema = {
  name: "GeneralAssistant",
  schema: {
    bsonType: "object",
    required: ["name", "description", "capabilities", "created_at", "updated_at"],
    properties: {
      name: {
        bsonType: "string",
        description: "Name of the general assistant"
      },
      description: {
        bsonType: "string",
        description: "Description of the general assistant's purpose and capabilities"
      },
      capabilities: {
        bsonType: "array",
        description: "List of capabilities the general assistant has",
        items: {
          bsonType: "string"
        }
      },
      knowledge_base: {
        bsonType: "object",
        description: "General knowledge base for the assistant",
        properties: {
          sources: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["name", "type", "content"],
              properties: {
                name: { bsonType: "string" },
                type: { bsonType: "string" },
                content: { bsonType: "string" },
                metadata: { bsonType: "object" }
              }
            }
          },
          last_updated: { bsonType: "date" }
        }
      },
      created_at: {
        bsonType: "date",
        description: "Timestamp when the assistant was created"
      },
      updated_at: {
        bsonType: "date",
        description: "Timestamp when the assistant was last updated"
      }
    }
  }
};

// Specialized Agent Schema (base for all agent types)
const specializedAgentSchema = {
  name: "SpecializedAgent",
  schema: {
    bsonType: "object",
    required: ["agent_type", "name", "description", "parent_id", "created_at", "updated_at"],
    properties: {
      agent_type: {
        bsonType: "string",
        description: "Type of specialized agent (Murder, Theft, Fraud, Accident)"
      },
      name: {
        bsonType: "string",
        description: "Name of the specialized agent"
      },
      description: {
        bsonType: "string",
        description: "Description of the specialized agent's purpose and capabilities"
      },
      parent_id: {
        bsonType: "objectId",
        description: "Reference to the parent General Assistant"
      },
      knowledge_base: {
        bsonType: "object",
        description: "Specialized knowledge base for this agent type",
        properties: {
          sources: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["name", "type", "content"],
              properties: {
                name: { bsonType: "string" },
                type: { bsonType: "string" },
                content: { bsonType: "string" },
                metadata: { bsonType: "object" }
              }
            }
          },
          last_updated: { bsonType: "date" }
        }
      },
      case_templates: {
        bsonType: "array",
        description: "Templates for handling different case scenarios",
        items: {
          bsonType: "object",
          required: ["template_name", "questions", "response_guidelines"],
          properties: {
            template_name: { bsonType: "string" },
            questions: { 
              bsonType: "array",
              items: { bsonType: "string" }
            },
            response_guidelines: { bsonType: "string" }
          }
        }
      },
      created_at: {
        bsonType: "date",
        description: "Timestamp when the agent was created"
      },
      updated_at: {
        bsonType: "date",
        description: "Timestamp when the agent was last updated"
      }
    }
  }
};

// Murder Agent Schema (extends Specialized Agent)
const murderAgentSchema = {
  name: "MurderAgent",
  schema: {
    bsonType: "object",
    required: ["agent_type", "name", "description", "parent_id", "created_at", "updated_at"],
    properties: {
      agent_type: {
        enum: ["Murder"],
        description: "Type of specialized agent (Murder)"
      },
      name: {
        bsonType: "string",
        description: "Name of the murder investigation agent"
      },
      description: {
        bsonType: "string",
        description: "Description of the murder agent's purpose and capabilities"
      },
      parent_id: {
        bsonType: "objectId",
        description: "Reference to the parent General Assistant"
      },
      knowledge_base: {
        bsonType: "object",
        description: "Murder investigation knowledge base",
        properties: {
          sources: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["name", "type", "content"],
              properties: {
                name: { bsonType: "string" },
                type: { bsonType: "string" },
                content: { bsonType: "string" },
                metadata: { bsonType: "object" }
              }
            }
          },
          last_updated: { bsonType: "date" }
        }
      },
      investigation_protocols: {
        bsonType: "array",
        description: "Specific protocols for murder investigations",
        items: {
          bsonType: "object",
          properties: {
            protocol_name: { bsonType: "string" },
            steps: { 
              bsonType: "array",
              items: { bsonType: "string" }
            },
            legal_references: { 
              bsonType: "array",
              items: { bsonType: "string" }
            }
          }
        }
      },
      case_templates: {
        bsonType: "array",
        description: "Templates for handling different murder case scenarios",
        items: {
          bsonType: "object",
          required: ["template_name", "questions", "response_guidelines"],
          properties: {
            template_name: { bsonType: "string" },
            questions: { 
              bsonType: "array",
              items: { bsonType: "string" }
            },
            response_guidelines: { bsonType: "string" }
          }
        }
      },
      created_at: {
        bsonType: "date",
        description: "Timestamp when the agent was created"
      },
      updated_at: {
        bsonType: "date",
        description: "Timestamp when the agent was last updated"
      }
    }
  }
};

// Theft Agent Schema (extends Specialized Agent)
const theftAgentSchema = {
  name: "TheftAgent",
  schema: {
    bsonType: "object",
    required: ["agent_type", "name", "description", "parent_id", "created_at", "updated_at"],
    properties: {
      agent_type: {
        enum: ["Theft"],
        description: "Type of specialized agent (Theft)"
      },
      name: {
        bsonType: "string",
        description: "Name of the theft investigation agent"
      },
      description: {
        bsonType: "string",
        description: "Description of the theft agent's purpose and capabilities"
      },
      parent_id: {
        bsonType: "objectId",
        description: "Reference to the parent General Assistant"
      },
      knowledge_base: {
        bsonType: "object",
        description: "Theft investigation knowledge base",
        properties: {
          sources: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["name", "type", "content"],
              properties: {
                name: { bsonType: "string" },
                type: { bsonType: "string" },
                content: { bsonType: "string" },
                metadata: { bsonType: "object" }
              }
            }
          },
          last_updated: { bsonType: "date" }
        }
      },
      theft_categories: {
        bsonType: "array",
        description: "Categories of theft with specific handling procedures",
        items: {
          bsonType: "object",
          properties: {
            category_name: { bsonType: "string" },
            investigation_approach: { bsonType: "string" },
            evidence_guidelines: { bsonType: "string" }
          }
        }
      },
      case_templates: {
        bsonType: "array",
        description: "Templates for handling different theft case scenarios",
        items: {
          bsonType: "object",
          required: ["template_name", "questions", "response_guidelines"],
          properties: {
            template_name: { bsonType: "string" },
            questions: { 
              bsonType: "array",
              items: { bsonType: "string" }
            },
            response_guidelines: { bsonType: "string" }
          }
        }
      },
      created_at: {
        bsonType: "date",
        description: "Timestamp when the agent was created"
      },
      updated_at: {
        bsonType: "date",
        description: "Timestamp when the agent was last updated"
      }
    }
  }
};

// Fraud Agent Schema (extends Specialized Agent)
const fraudAgentSchema = {
  name: "FraudAgent",
  schema: {
    bsonType: "object",
    required: ["agent_type", "name", "description", "parent_id", "created_at", "updated_at"],
    properties: {
      agent_type: {
        enum: ["Fraud"],
        description: "Type of specialized agent (Fraud)"
      },
      name: {
        bsonType: "string",
        description: "Name of the fraud investigation agent"
      },
      description: {
        bsonType: "string",
        description: "Description of the fraud agent's purpose and capabilities"
      },
      parent_id: {
        bsonType: "objectId",
        description: "Reference to the parent General Assistant"
      },
      knowledge_base: {
        bsonType: "object",
        description: "Fraud investigation knowledge base",
        properties: {
          sources: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["name", "type", "content"],
              properties: {
                name: { bsonType: "string" },
                type: { bsonType: "string" },
                content: { bsonType: "string" },
                metadata: { bsonType: "object" }
              }
            }
          },
          last_updated: { bsonType: "date" }
        }
      },
      fraud_types: {
        bsonType: "array",
        description: "Types of fraud with specific detection and investigation methods",
        items: {
          bsonType: "object",
          properties: {
            fraud_type: { bsonType: "string" },
            detection_methods: { 
              bsonType: "array",
              items: { bsonType: "string" }
            },
            financial_indicators: { 
              bsonType: "array",
              items: { bsonType: "string" }
            }
          }
        }
      },
      case_templates: {
        bsonType: "array",
        description: "Templates for handling different fraud case scenarios",
        items: {
          bsonType: "object",
          required: ["template_name", "questions", "response_guidelines"],
          properties: {
            template_name: { bsonType: "string" },
            questions: { 
              bsonType: "array",
              items: { bsonType: "string" }
            },
            response_guidelines: { bsonType: "string" }
          }
        }
      },
      created_at: {
        bsonType: "date",
        description: "Timestamp when the agent was created"
      },
      updated_at: {
        bsonType: "date",
        description: "Timestamp when the agent was last updated"
      }
    }
  }
};

// Accident Agent Schema (extends Specialized Agent)
const accidentAgentSchema = {
  name: "AccidentAgent",
  schema: {
    bsonType: "object",
    required: ["agent_type", "name", "description", "parent_id", "created_at", "updated_at"],
    properties: {
      agent_type: {
        enum: ["Accident"],
        description: "Type of specialized agent (Accident)"
      },
      name: {
        bsonType: "string",
        description: "Name of the accident investigation agent"
      },
      description: {
        bsonType: "string",
        description: "Description of the accident agent's purpose and capabilities"
      },
      parent_id: {
        bsonType: "objectId",
        description: "Reference to the parent General Assistant"
      },
      knowledge_base: {
        bsonType: "object",
        description: "Accident investigation knowledge base",
        properties: {
          sources: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["name", "type", "content"],
              properties: {
                name: { bsonType: "string" },
                type: { bsonType: "string" },
                content: { bsonType: "string" },
                metadata: { bsonType: "object" }
              }
            }
          },
          last_updated: { bsonType: "date" }
        }
      },
      accident_types: {
        bsonType: "array",
        description: "Types of accidents with specific investigation procedures",
        items: {
          bsonType: "object",
          properties: {
            accident_type: { bsonType: "string" },
            investigation_procedures: { 
              bsonType: "array",
              items: { bsonType: "string" }
            },
            evidence_collection: { bsonType: "string" }
          }
        }
      },
      case_templates: {
        bsonType: "array",
        description: "Templates for handling different accident case scenarios",
        items: {
          bsonType: "object",
          required: ["template_name", "questions", "response_guidelines"],
          properties: {
            template_name: { bsonType: "string" },
            questions: { 
              bsonType: "array",
              items: { bsonType: "string" }
            },
            response_guidelines: { bsonType: "string" }
          }
        }
      },
      created_at: {
        bsonType: "date",
        description: "Timestamp when the agent was created"
      },
      updated_at: {
        bsonType: "date",
        description: "Timestamp when the agent was last updated"
      }
    }
  }
};

// Conversation Schema for storing user interactions
const conversationSchema = {
  name: "Conversation",
  schema: {
    bsonType: "object",
    required: ["user_id", "agent_id", "agent_type", "messages", "created_at", "updated_at"],
    properties: {
      user_id: {
        bsonType: "string",
        description: "ID of the police official using the system"
      },
      agent_id: {
        bsonType: "objectId",
        description: "Reference to the agent handling the conversation"
      },
      agent_type: {
        bsonType: "string",
        description: "Type of agent (General, Murder, Theft, Fraud, Accident)"
      },
      case_reference: {
        bsonType: "string",
        description: "Reference to the case being discussed"
      },
      messages: {
        bsonType: "array",
        description: "Array of messages in the conversation",
        items: {
          bsonType: "object",
          required: ["sender", "content", "timestamp"],
          properties: {
            sender: {
              bsonType: "string",
              description: "Either 'user' or 'agent'"
            },
            content: {
              bsonType: "string",
              description: "Message content"
            },
            timestamp: {
              bsonType: "date",
              description: "When the message was sent"
            },
            references: {
              bsonType: "array",
              description: "References used in RAG responses",
              items: {
                bsonType: "object",
                properties: {
                  source: { bsonType: "string" },
                  content: { bsonType: "string" },
                  relevance_score: { bsonType: "double" }
                }
              }
            }
          }
        }
      },
      metadata: {
        bsonType: "object",
        description: "Additional metadata about the conversation",
        properties: {
          case_type: { bsonType: "string" },
          priority: { bsonType: "string" },
          tags: { 
            bsonType: "array",
            items: { bsonType: "string" }
          }
        }
      },
      created_at: {
        bsonType: "date",
        description: "Timestamp when the conversation was created"
      },
      updated_at: {
        bsonType: "date",
        description: "Timestamp when the conversation was last updated"
      }
    }
  }
};

// Export all schemas
module.exports = {
  generalAssistantSchema,
  specializedAgentSchema,
  murderAgentSchema,
  theftAgentSchema,
  fraudAgentSchema,
  accidentAgentSchema,
  conversationSchema
};
