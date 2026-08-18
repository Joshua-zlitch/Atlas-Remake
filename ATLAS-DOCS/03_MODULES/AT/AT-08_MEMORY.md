Write the complete module specification for `03_MODULES/AT-08_MEMORY.md`.

MODULE:
AT-08 — Memory

This is one of the 30 locked ATLAS core modules.

Do not create, rename, split, merge, or introduce any ATLAS module.

LOCKED ARCHITECTURE:

UX:
- UX-01 App Shell
- UX-02 Interaction System
- UX-03 State Visualization
- UX-04 Context & Presentation

AT:
- AT-01 Workspace
- AT-02 Filesystem
- AT-03 Process
- AT-04 Terminal
- AT-05 Application Control
- AT-06 System Information
- AT-07 Guardian
- AT-08 Memory
- AT-09 Context Store
- AT-10 Search & Retrieval
- AT-11 Automation
- AT-12 Notifications
- AT-13 Files & Attachments
- AT-14 Voice
- AT-15 Vision
- AT-16 Permissions
- AT-17 Event Runtime

AI:
- AI-01 LLM Runtime
- AI-02 Conversation
- AI-03 Context Engine
- AI-04 Memory Intelligence
- AI-05 Planner
- AI-06 Tool Orchestrator
- AI-07 Task Manager
- AI-08 Reasoning & Verification
- AI-09 AI Configuration

RELEASE:
- REL-01 Packaging & Release

CORE = 30
TOTAL INCLUDING RELEASE = 31

PURPOSE:

AT-08 provides persistent local memory capability for ATLAS.

It owns the storage, retrieval, updating, deletion, and lifecycle of
information that ATLAS has explicitly determined should persist as memory.

AI-04 Memory Intelligence decides how memory should be interpreted, selected,
or used by the AI.

AT-08 owns the memory capability and persistent memory data.

AT-09 Context Store owns active runtime context.

Do not merge memory and active context.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Memory Model
9. Memory Creation
10. Memory Retrieval
11. Memory Updating
12. Memory Deletion
13. Memory Lifecycle
14. Memory Relevance
15. Persistence
16. SQLite Boundary
17. AI Integration
18. Context Integration
19. Search Integration
20. Permission Boundary
21. IPC Boundary
22. Events
23. Error Handling
24. Security
25. Privacy
26. Performance
27. Testing Requirements
28. Verification Requirements
29. Acceptance Criteria
30. Failure Conditions
31. Git Requirements
32. Implementation Notes
33. Definition of Done

RESPONSIBILITIES:

AT-08 owns:

- Persistent memory records
- Memory creation
- Memory retrieval
- Memory updates
- Memory deletion
- Memory lifecycle
- Memory metadata
- Memory persistence
- Memory availability
- Memory-related events
- Controlled memory access

AT-08 does NOT own:

- AI memory reasoning
- Context construction
- Active conversation state
- Workspace state
- Search-engine implementation
- LLM execution
- Conversation logic
- Planning
- Tool orchestration
- Permissions policy
- Filesystem operations
- Terminal execution
- Notifications
- OpenCode
- MCP development infrastructure

MEMORY MODEL:

Define memory conceptually as information that ATLAS intentionally persists
for future relevance.

Examples may include:

- User preferences
- Stable project information
- Important user-provided facts
- Long-term task/project context
- Other explicitly retained information

Do not assume every conversation message becomes memory.

Do not store information merely because it appeared in a conversation.

MEMORY CREATION:

Memory creation should generally follow:

Conversation/Task
→ AI-04 Memory Intelligence
→ determine whether persistence is appropriate
→ AT-08 Memory
→ persistent storage

AT-08 stores the resulting memory.

AT-08 itself should not independently decide complex semantic importance.

MEMORY RETRIEVAL:

Use:

User Request
→ AI-04 Memory Intelligence
→ AT-08 Memory
→ relevant memories
→ AI-03 Context Engine

AT-08 should provide controlled retrieval capabilities.

It should not automatically inject all memory into every AI request.

MEMORY UPDATE:

When existing information changes:

AI-04 Memory Intelligence
→ identifies relevant memory
→ AT-08 updates memory
→ persistence verified

Avoid unnecessary duplicate memories.

MEMORY DELETION:

Users must be able to remove memory through approved interfaces.

Deletion should be explicit and verifiable.

Do not silently recreate deleted memory unless the user intentionally
provides it again and the system's memory policy permits storing it.

PERSISTENCE:

SQLite is the primary local persistence layer.

Define conceptual requirements for:

- Initialization
- Persistence
- Retrieval
- Transactions
- Migration
- Recovery
- Shutdown
- Data integrity

Do not invent the final database schema.

AI INTEGRATION:

AI-04 owns memory intelligence.

AI-03 owns context construction.

Use:

AI-04
↔ AT-08
↔ AI-03

AI-04 determines relevance.

AT-08 provides persistent memory.

AI-03 decides how relevant memory is incorporated into current context.

SEARCH:

AT-10 Search & Retrieval may provide indexing/retrieval capabilities.

AT-08 remains the owner of memory data.

Do not move memory ownership into AT-10.

PERMISSIONS:

Memory may contain sensitive user information.

Access must respect the appropriate privacy and permission model.

AT-16 remains the permission authority for protected operations.

Do not create a separate memory permission system.

IPC:

Renderer
→ IPC
→ runtime
→ AT-08

The renderer must not directly access SQLite memory storage.

UX-04 may present memory-related information.

SECURITY:

Protect memory against:

- Unauthorized access
- Unintended disclosure
- Unnecessary AI context injection
- Accidental deletion
- Malformed memory data
- Cross-workspace leakage where relevant

Memory should remain local by default.

Do not transmit memory to external services unless explicitly supported
and authorized by the product architecture.

PRIVACY:

Use:

Collect intentionally
→ store minimally
→ retrieve only when relevant
→ allow user control

Do not persist secrets unnecessarily.

Do not treat sensitive information as ordinary memory without appropriate
handling.

PERFORMANCE:

Memory retrieval should be efficient enough for normal AI interaction.

Avoid loading the entire memory store for every request.

Use relevance-aware retrieval through AI-04 and/or AT-10 where appropriate.

EVENTS:

Conceptual events:

- Memory created
- Memory updated
- Memory retrieved
- Memory deleted
- Memory unavailable
- Memory persistence failure

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Database unavailable
- Memory not found
- Invalid memory data
- Persistence failure
- Retrieval failure
- Deletion failure
- Migration failure
- Permission denial

Never report successful persistence when the database operation failed.

VERIFICATION:

Important memory writes/deletes should be verified where practical.

Example:

Create/update
→ database operation
→ verify persisted state
→ report result

Delete
→ delete
→ verify absence
→ report result

TESTING:

Include tests for:

- Create
- Retrieve
- Update
- Delete
- Persistence across restart
- Duplicate handling
- Invalid data
- Database failure
- Migration behavior
- Permission boundaries
- Privacy boundaries
- Context integration
- Search integration
- IPC boundary
- Verification

ACCEPTANCE CRITERIA:

AT-08 is complete when:

- Persistent local memory can be stored reliably.
- Memory can be retrieved selectively.
- Memory can be updated and deleted.
- Persistence survives application restart.
- Failed persistence is reported accurately.
- Memory is not automatically injected into every AI request.
- AI-04 controls semantic memory intelligence.
- AI-03 controls context construction.
- SQLite remains the persistence layer.
- Sensitive memory is handled appropriately.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Memory Intelligence module.

AI-04 already owns memory intelligence.

Do not create a separate Memory Database module.

SQLite is infrastructure, not an ATLAS module.

Do not merge AT-08 with AT-09.

AT-08 owns persistent memory.

AT-09 owns active context storage.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent database schemas, APIs, package versions, or implementation
details.

This document defines the module contract only.