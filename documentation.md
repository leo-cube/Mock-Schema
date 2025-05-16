# MongoDB Collection Structure for Financial AI Agent

## Overview
This document provides an overview of the MongoDB collection structure created for the Financial AI Agent system. The system uses a parent-child relationship between a General Assistant and specialized agents for different investigation types (Murder, Theft, Fraud, and Accident).

## Collection Structure

### General Assistant Collection
The General Assistant serves as the parent collection that understands and coordinates all specialized agents.

**Collection Name:** `general_assistant`

**Key Fields:**
- `name`: Name of the general assistant
- `description`: Description of the assistant's purpose and capabilities
- `capabilities`: Array of capabilities the assistant has
- `knowledge_base`: Object containing sources and last updated timestamp
- `created_at`: Timestamp when the assistant was created
- `updated_at`: Timestamp when the assistant was last updated

### Specialized Agent Collections
Each specialized agent has its own collection with fields tailored to its specific investigation type.

#### Murder Agent Collection
**Collection Name:** `murder_agent`

**Key Fields:**
- `agent_type`: Set to "Murder"
- `name`: Name of the murder investigation agent
- `description`: Description of the agent's purpose
- `parent_id`: Reference to the parent General Assistant
- `knowledge_base`: Specialized knowledge for murder investigations
- `investigation_protocols`: Array of protocols specific to murder cases
- `case_templates`: Templates for handling different murder case scenarios
- `created_at` & `updated_at`: Timestamps

#### Theft Agent Collection
**Collection Name:** `theft_agent`

**Key Fields:**
- `agent_type`: Set to "Theft"
- `name`: Name of the theft investigation agent
- `description`: Description of the agent's purpose
- `parent_id`: Reference to the parent General Assistant
- `knowledge_base`: Specialized knowledge for theft investigations
- `theft_categories`: Categories of theft with specific handling procedures
- `case_templates`: Templates for handling different theft case scenarios
- `created_at` & `updated_at`: Timestamps

#### Fraud Agent Collection
**Collection Name:** `fraud_agent`

**Key Fields:**
- `agent_type`: Set to "Fraud"
- `name`: Name of the fraud investigation agent
- `description`: Description of the agent's purpose
- `parent_id`: Reference to the parent General Assistant
- `knowledge_base`: Specialized knowledge for fraud investigations
- `fraud_types`: Types of fraud with detection and investigation methods
- `case_templates`: Templates for handling different fraud case scenarios
- `created_at` & `updated_at`: Timestamps

#### Accident Agent Collection
**Collection Name:** `accident_agent`

**Key Fields:**
- `agent_type`: Set to "Accident"
- `name`: Name of the accident investigation agent
- `description`: Description of the agent's purpose
- `parent_id`: Reference to the parent General Assistant
- `knowledge_base`: Specialized knowledge for accident investigations
- `accident_types`: Types of accidents with investigation procedures
- `case_templates`: Templates for handling different accident case scenarios
- `created_at` & `updated_at`: Timestamps

### Conversation Collection
Stores all interactions between users (police officials) and the AI agents.

**Collection Name:** `conversations`

**Key Fields:**
- `user_id`: ID of the police official using the system
- `agent_id`: Reference to the agent handling the conversation
- `agent_type`: Type of agent (General, Murder, Theft, Fraud, Accident)
- `case_reference`: Reference to the case being discussed
- `messages`: Array of messages in the conversation
  - Each message includes: sender, content, timestamp, and references used in RAG responses
- `metadata`: Additional metadata about the conversation
- `created_at` & `updated_at`: Timestamps

## RAG Methodology Support
The schema is designed to support the Retrieval-Augmented Generation (RAG) methodology:

1. Each agent has a `knowledge_base` field containing sources of information
2. The `messages` array in conversations includes a `references` field that stores:
   - Source of the information
   - Content snippet used
   - Relevance score

This structure allows the AI to provide solutions and tips based on retrieved information, with proper attribution to sources.

## API Integration
The schema is designed to be flexible for API integration:

1. All collections use MongoDB's schema validation for data integrity
2. Indexes are created for efficient querying
3. The CRUD operations are modular and can be easily extended
4. Parent-child relationships are maintained through references

## Usage Instructions
To use this MongoDB collection structure:

1. Set up MongoDB connection using the provided `db.js`
2. Create collections and indexes using `collection_setup.js`
3. Use the CRUD operations in `crud.js` for data manipulation
4. Test functionality using `validation.js`
5. Sample data can be inserted using `sample_data.js`

## Future Modifications
The schema is designed to be extensible:

1. New specialized agents can be added following the same pattern
2. Additional fields can be added to existing collections
3. New collections can be created and linked to the existing structure
4. The RAG methodology components can be enhanced with additional metadata
