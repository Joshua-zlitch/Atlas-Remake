Write the complete content for `02_ARCHITECTURE/DATA_ARCHITECTURE.md`.

This document defines how ATLAS stores, owns, retrieves, and moves data
within the local-first architecture.

LOCKED CONTEXT:

- ATLAS is local-first.
- SQLite is the primary local persistent database.
- User data should remain local by default.
- Ollama provides the initial local LLM runtime.
- Electron + Node.js provide the desktop runtime.
- React is the renderer/UI.
- OpenCode is development infrastructure only and is NOT part of the
  runtime.
- No cloud database is part of the current architecture.

Define the major categories of ATLAS data:

1. Application configuration
2. User preferences
3. Conversation data
4. Memory
5. Context
6. Workspace/project metadata
7. Task state
8. Automation definitions
9. Notification state
10. System/runtime state where persistence is required
11. AI configuration
12. Permission configuration
13. Attachment metadata
14. Search/retrieval metadata
15. Release/build information only where appropriate

For each category explain:

- Owning module
- Whether it is persistent or transient
- Where it is stored
- Who may read it
- Who may modify it
- Retention expectations
- Security considerations

Use the locked ownership relationships:

- AT-08 owns persistent memory capability.
- AT-09 owns active context storage.
- AT-01 owns workspace/project state.
- AT-11 owns automation definitions and state.
- AT-12 owns notification state.
- AT-13 owns attachment handling and metadata.
- AI-09 owns AI configuration.
- AT-16 owns permission configuration/state where persistence is required.

Explain the distinction between:

Persistent data
→ survives application restart.

Runtime state
→ exists while ATLAS is running.

Task state
→ exists for the lifetime of a task and may require persistence.

Ephemeral data
→ exists only for the immediate operation.

Define the general SQLite architecture.

Do not invent a final database schema yet.

Instead, document:

- Database initialization
- Database location strategy
- Schema versioning
- Migrations
- Transactions
- Error handling
- Backup considerations
- Recovery considerations
- Connection lifecycle
- Shutdown behavior

Explain data ownership.

A module must not directly modify another module's owned data without using
the defined interface.

Explain sensitive data handling.

ATLAS should follow:

- Local-first storage
- Minimum necessary persistence
- Explicit ownership
- Controlled access
- No accidental logging of sensitive user data
- No unnecessary duplication

Define how AI context is constructed from stored information:

User request
→ conversation state
→ relevant context
→ relevant memory
→ workspace/task information
→ AI context

Explain that not all stored information should automatically be injected
into every LLM request.

Define the relationship:

AT-08 Memory
↔ AI-04 Memory Intelligence
↔ AI-03 Context Engine

Define attachment handling:

User file
→ AT-13 Files & Attachments
→ local metadata/content handling
→ AI context when explicitly relevant

Define workspace data:

Workspace
→ AT-01 Workspace
→ project metadata
→ related context/memory/search information

Define data lifecycle operations:

- Create
- Read
- Update
- Delete
- Archive where applicable
- Migration
- Recovery

Define privacy and security requirements.

Do not introduce cloud synchronization, cloud databases, external data
warehouses, or additional persistence systems.

Do not invent exact table names or schemas.

Do not create new ATLAS modules.

Keep this document focused on data ownership, persistence, lifecycle, and
architecture. Exact database schema should be documented only after the
architecture has been approved.