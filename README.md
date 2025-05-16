# README.md - Financial AI Agent MongoDB Collection Setup

## Overview
This project provides a MongoDB collection structure for a Financial AI Agent system that uses the RAG (Retrieval-Augmented Generation) methodology to assist police officials during interrogations. The system consists of a parent "General Assistant" collection and specialized agent collections for different investigation types: Murder, Theft, Fraud, and Accident.

## Project Structure
```
financial_ai_agent/
├── documentation.md       # Detailed documentation of the collection structure
├── schemas/
│   └── general_assistant_schema.js  # Schema definitions for all collections
├── setup.js               # Main setup script
├── src/
│   ├── collection_setup.js  # Collection and index creation
│   ├── crud.js              # CRUD operations for all collections
│   ├── db.js                # MongoDB connection setup
│   ├── sample_data.js       # Sample data insertion
│   └── validation.js        # Validation and testing
└── todo.md                # Project task list (completed)
```

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```
4. Edit the `.env` file with your MongoDB connection details
5. Run the setup script:
   ```
   npm run setup
   ```

## Features

- **Parent-Child Structure**: General Assistant as parent with specialized agents
- **Schema Validation**: MongoDB schema validation for data integrity
- **RAG Methodology Support**: Knowledge base and reference tracking
- **CRUD Operations**: Complete set of operations for all collections
- **Indexing**: Optimized for efficient querying
- **Sample Data**: Pre-configured sample data for testing
- **Validation**: Test scripts to verify functionality

## Collection Structure

1. **General Assistant**: Parent collection for all agents
2. **Specialized Agents**:
   - Murder Agent: For murder investigations
   - Theft Agent: For theft investigations
   - Fraud Agent: For fraud investigations
   - Accident Agent: For accident investigations
3. **Conversations**: Stores interactions between users and agents

## API Integration

The collection structure is designed to be easily integrated with your API:

- Modular code structure
- Clear separation of concerns
- Well-documented schema
- Flexible for future modifications

For detailed information about the collection structure and API integration, please refer to the `documentation.md` file.

## Testing

Run the validation tests:
```
npm test
```

## License

This project is provided for your use as requested.
