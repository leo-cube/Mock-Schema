// Sample data insertion for testing
const { connectToDatabase, closeConnection } = require('./db');
const { ObjectId } = require('mongodb');
const {
  GeneralAssistant,
  MurderAgent,
  TheftAgent,
  FraudAgent,
  AccidentAgent,
  Conversation
} = require('./crud');

// Insert sample General Assistant
async function insertSampleGeneralAssistant() {
  try {
    const generalAssistantId = await GeneralAssistant.create({
      name: "Financial Investigation Assistant",
      description: "A general assistant for financial investigations that can handle various case types",
      capabilities: [
        "Case analysis",
        "Financial data interpretation",
        "Investigation guidance",
        "Legal reference",
        "Report generation"
      ],
      knowledge_base: {
        sources: [
          {
            name: "Financial Investigation Guidelines",
            type: "document",
            content: "General guidelines for conducting financial investigations",
            metadata: { version: "1.0", last_updated: new Date("2025-01-15") }
          }
        ],
        last_updated: new Date()
      }
    });
    
    console.log(`Sample General Assistant created with ID: ${generalAssistantId}`);
    return generalAssistantId;
  } catch (err) {
    console.error('Error creating sample General Assistant:', err);
    throw err;
  }
}

// Insert sample Murder Agent
async function insertSampleMurderAgent(parentId) {
  try {
    const murderAgentId = await MurderAgent.create({
      agent_type: "Murder",
      name: "Murder Investigation Agent",
      description: "Specialized agent for murder investigations with financial implications",
      parent_id: new ObjectId(parentId),
      knowledge_base: {
        sources: [
          {
            name: "Murder Investigation Protocol",
            type: "document",
            content: "Detailed protocol for investigating murders with financial motives",
            metadata: { version: "2.1", last_updated: new Date("2025-02-10") }
          }
        ],
        last_updated: new Date()
      },
      investigation_protocols: [
        {
          protocol_name: "Financial Motive Analysis",
          steps: [
            "Identify financial relationships",
            "Analyze recent financial transactions",
            "Evaluate insurance policies and beneficiaries",
            "Check for debt relationships"
          ],
          legal_references: [
            "Criminal Code Section 302.1",
            "Financial Investigation Act Section 45"
          ]
        }
      ],
      case_templates: [
        {
          template_name: "Insurance Fraud Murder",
          questions: [
            "Was the victim recently insured?",
            "Who are the beneficiaries?",
            "Were there any policy changes before death?"
          ],
          response_guidelines: "Focus on timeline of policy changes and relationship between beneficiaries and suspects."
        }
      ]
    });
    
    console.log(`Sample Murder Agent created with ID: ${murderAgentId}`);
    return murderAgentId;
  } catch (err) {
    console.error('Error creating sample Murder Agent:', err);
    throw err;
  }
}

// Insert sample Theft Agent
async function insertSampleTheftAgent(parentId) {
  try {
    const theftAgentId = await TheftAgent.create({
      agent_type: "Theft",
      name: "Theft Investigation Agent",
      description: "Specialized agent for theft investigations",
      parent_id: new ObjectId(parentId),
      knowledge_base: {
        sources: [
          {
            name: "Theft Investigation Guidelines",
            type: "document",
            content: "Guidelines for investigating various types of theft",
            metadata: { version: "1.5", last_updated: new Date("2025-01-20") }
          }
        ],
        last_updated: new Date()
      },
      theft_categories: [
        {
          category_name: "Corporate Embezzlement",
          investigation_approach: "Focus on accounting discrepancies and access privileges",
          evidence_guidelines: "Secure digital records and transaction logs"
        },
        {
          category_name: "Identity Theft",
          investigation_approach: "Track digital footprint and financial account access",
          evidence_guidelines: "Document unauthorized transactions and access attempts"
        }
      ],
      case_templates: [
        {
          template_name: "Employee Theft",
          questions: [
            "What access did the suspect have to assets?",
            "Were there any security measures bypassed?",
            "Is there a pattern to the missing assets?"
          ],
          response_guidelines: "Analyze access logs and compare with employee schedules."
        }
      ]
    });
    
    console.log(`Sample Theft Agent created with ID: ${theftAgentId}`);
    return theftAgentId;
  } catch (err) {
    console.error('Error creating sample Theft Agent:', err);
    throw err;
  }
}

// Insert sample Fraud Agent
async function insertSampleFraudAgent(parentId) {
  try {
    const fraudAgentId = await FraudAgent.create({
      agent_type: "Fraud",
      name: "Fraud Investigation Agent",
      description: "Specialized agent for fraud investigations",
      parent_id: new ObjectId(parentId),
      knowledge_base: {
        sources: [
          {
            name: "Financial Fraud Detection Manual",
            type: "document",
            content: "Comprehensive guide to detecting various types of financial fraud",
            metadata: { version: "3.0", last_updated: new Date("2025-03-05") }
          }
        ],
        last_updated: new Date()
      },
      fraud_types: [
        {
          fraud_type: "Investment Fraud",
          detection_methods: [
            "Analyze return on investment claims",
            "Verify registration with regulatory bodies",
            "Check for pressure tactics in marketing"
          ],
          financial_indicators: [
            "Unrealistic returns",
            "Lack of transparency in operations",
            "Difficulty withdrawing funds"
          ]
        },
        {
          fraud_type: "Insurance Fraud",
          detection_methods: [
            "Identify patterns in claims",
            "Verify documentation authenticity",
            "Cross-reference with other claims"
          ],
          financial_indicators: [
            "Multiple similar claims",
            "Claims shortly after policy initiation",
            "Inflated value claims"
          ]
        }
      ],
      case_templates: [
        {
          template_name: "Ponzi Scheme",
          questions: [
            "How were returns generated for early investors?",
            "What was the source of funds for payouts?",
            "Were financial statements audited by reputable firms?"
          ],
          response_guidelines: "Focus on cash flow analysis and verification of claimed investments."
        }
      ]
    });
    
    console.log(`Sample Fraud Agent created with ID: ${fraudAgentId}`);
    return fraudAgentId;
  } catch (err) {
    console.error('Error creating sample Fraud Agent:', err);
    throw err;
  }
}

// Insert sample Accident Agent
async function insertSampleAccidentAgent(parentId) {
  try {
    const accidentAgentId = await AccidentAgent.create({
      agent_type: "Accident",
      name: "Accident Investigation Agent",
      description: "Specialized agent for accident investigations with financial implications",
      parent_id: new ObjectId(parentId),
      knowledge_base: {
        sources: [
          {
            name: "Financial Aspects of Accident Investigation",
            type: "document",
            content: "Guide to investigating financial motives and implications in accidents",
            metadata: { version: "1.2", last_updated: new Date("2025-02-25") }
          }
        ],
        last_updated: new Date()
      },
      accident_types: [
        {
          accident_type: "Workplace Accident",
          investigation_procedures: [
            "Assess workplace safety compliance",
            "Review insurance coverage and claims history",
            "Evaluate financial pressure on business operations"
          ],
          evidence_collection: "Secure workplace safety records, insurance documentation, and financial statements."
        },
        {
          accident_type: "Vehicle Accident",
          investigation_procedures: [
            "Review insurance policy details",
            "Check for recent policy changes",
            "Assess financial status of involved parties"
          ],
          evidence_collection: "Obtain insurance policies, financial records, and vehicle maintenance history."
        }
      ],
      case_templates: [
        {
          template_name: "Insurance Claim Accident",
          questions: [
            "Were there any recent insurance policy changes?",
            "Is there a history of similar claims?",
            "What is the financial status of the claimant?"
          ],
          response_guidelines: "Analyze timing of policy changes relative to accident and financial need of claimant."
        }
      ]
    });
    
    console.log(`Sample Accident Agent created with ID: ${accidentAgentId}`);
    return accidentAgentId;
  } catch (err) {
    console.error('Error creating sample Accident Agent:', err);
    throw err;
  }
}

// Insert sample Conversation
async function insertSampleConversation(agentId, agentType) {
  try {
    const conversationId = await Conversation.create({
      user_id: "police_officer_123",
      agent_id: new ObjectId(agentId),
      agent_type: agentType,
      case_reference: "CASE-2025-0542",
      messages: [
        {
          sender: "user",
          content: "I'm investigating a potential fraud case involving corporate embezzlement.",
          timestamp: new Date(Date.now() - 3600000) // 1 hour ago
        },
        {
          sender: "agent",
          content: "I'll help you with this investigation. What financial records have you reviewed so far?",
          timestamp: new Date(Date.now() - 3540000), // 59 minutes ago
          references: [
            {
              source: "Financial Fraud Detection Manual",
              content: "Corporate embezzlement investigations should begin with a review of accounting records and access logs.",
              relevance_score: 0.92
            }
          ]
        },
        {
          sender: "user",
          content: "I've looked at the company's bank statements and found some unusual transfers.",
          timestamp: new Date(Date.now() - 3480000) // 58 minutes ago
        },
        {
          sender: "agent",
          content: "That's a good start. You should also examine the authorization protocols for these transfers and identify who had access rights. Consider reviewing the timing of these transfers in relation to any changes in authorization procedures.",
          timestamp: new Date(Date.now() - 3420000), // 57 minutes ago
          references: [
            {
              source: "Financial Fraud Detection Manual",
              content: "Unusual transfers should be analyzed for timing patterns and authorization anomalies.",
              relevance_score: 0.89
            },
            {
              source: "Corporate Fraud Investigation Protocol",
              content: "Changes in authorization procedures often precede fraudulent activities.",
              relevance_score: 0.78
            }
          ]
        }
      ],
      metadata: {
        case_type: "Corporate Fraud",
        priority: "High",
        tags: ["embezzlement", "financial", "corporate"]
      }
    });
    
    console.log(`Sample Conversation created with ID: ${conversationId}`);
    return conversationId;
  } catch (err) {
    console.error('Error creating sample Conversation:', err);
    throw err;
  }
}

// Run all sample data insertion
async function insertAllSampleData() {
  try {
    console.log('Starting sample data insertion...');
    
    // Insert General Assistant
    const generalAssistantId = await insertSampleGeneralAssistant();
    
    // Insert specialized agents
    const murderAgentId = await insertSampleMurderAgent(generalAssistantId);
    const theftAgentId = await insertSampleTheftAgent(generalAssistantId);
    const fraudAgentId = await insertSampleFraudAgent(generalAssistantId);
    const accidentAgentId = await insertSampleAccidentAgent(generalAssistantId);
    
    // Insert sample conversations
    await insertSampleConversation(generalAssistantId, "General");
    await insertSampleConversation(fraudAgentId, "Fraud");
    
    console.log('All sample data inserted successfully');
    return true;
  } catch (err) {
    console.error('Error inserting sample data:', err);
    throw err;
  }
}

// Export functions
module.exports = {
  insertSampleGeneralAssistant,
  insertSampleMurderAgent,
  insertSampleTheftAgent,
  insertSampleFraudAgent,
  insertSampleAccidentAgent,
  insertSampleConversation,
  insertAllSampleData
};
