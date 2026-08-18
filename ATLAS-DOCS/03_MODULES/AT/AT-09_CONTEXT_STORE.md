Write the complete module specification for `03_MODULES/AT-09_CONTEXT_STORE.md`.

MODULE:
AT-09 — Context Store

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

AT-09 provides local runtime storage for active and task-specific context
that exists while ATLAS is operating.

AT-09 is NOT persistent long-term memory.

AT-08 owns persistent memory.

AI-03 Context Engine owns context construction and relevance decisions.

AT-09 provides controlled storage and retrieval of active context.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Context Model
9. Context Lifecycle
10. Context Creation
11. Context Updates
12. Context Retrieval
13. Context Removal
14. Conversation Context
15. Task Context
16. Workspace Context
17. Runtime Context
18. Persistence Boundary
19. AI Integration
20. Memory Boundary
21. Search Boundary
22. Permission Boundary
23. IPC Boundary
24. Events
25. Error Handling
26. Security
27. Privacy
28. Performance
29. Testing Requirements
30. Verification Requirements
31. Acceptance Criteria
32. Failure Conditions
33. Git Requirements
34. Implementation Notes
35. Definition of Done

RESPONSIBILITIES:

AT-09 owns:

- Active context storage
- Context retrieval
- Context updates
- Context lifecycle
- Task-specific context storage
- Conversation/session context storage where applicable
- Workspace-associated active context
- Runtime context required by active operations
- Context cleanup
- Context-related events

AT-09 does NOT own:

- Context relevance/intelligence
- Long-term memory
- LLM execution
- Conversation intelligence
- Planning
- Tool orchestration
- Task planning/state ownership
- Search/indexing
- Filesystem operations
- Terminal execution
- Permissions policy
- Workspace ownership
- Database infrastructure as a general service
- OpenCode
- MCP development infrastructure

CONTEXT VS MEMORY:

Clearly define:

AT-08 Memory
→ persistent information intentionally retained for future use

AT-09 Context Store
→ active information required for the current runtime/session/task

AI-03 Context Engine
→ determines what context is relevant and constructs the context supplied
  to AI operations

Use this conceptual relationship:

AT-08 Memory
       ↕
AI-04 Memory Intelligence
       ↓
AT-09 Context Store
       ↓
AI-03 Context Engine
       ↓
AI request

Do not make AT-09 independently decide semantic relevance.

CONTEXT MODEL:

Define conceptual context categories:

- Conversation context
- Task context
- Workspace context
- Tool-operation context
- Runtime context
- Temporary user-provided context

Do not invent the final storage schema.

CONTEXT LIFECYCLE:

Define:

- CREATED
- ACTIVE
- UPDATED
- SUSPENDED where required
- COMPLETED
- EXPIRED
- CLEARED

These are conceptual states only.

Context should have a clear lifecycle.

Do not allow stale task context to remain indefinitely without reason.

CONTEXT CREATION:

Examples:

New conversation
→ create active conversation context

New task
→ create task context

Workspace selected
→ associate relevant workspace context

Tool operation started
→ store relevant temporary operation context

Do not duplicate complete workspace/filesystem data inside the Context
Store.

Store references or minimal required information where appropriate.

CONTEXT RETRIEVAL:

AI-03 Context Engine requests relevant active context.

AT-09 returns the available context.

AT-09 should not automatically provide every stored context item.

AI-03 decides relevance.

CONVERSATION:

AT-09 may store active conversation context needed by the current runtime.

AI-02 Conversation owns conversation behavior.

AT-09 owns the underlying active context storage.

TASK:

AI-07 Task Manager owns task lifecycle/state.

AT-09 may store context associated with that task.

Do not move task ownership into AT-09.

WORKSPACE:

AT-01 Workspace owns workspace identity.

AT-09 may store active context associated with the workspace.

Do not duplicate workspace metadata unnecessarily.

RUNTIME:

AT-17 Event Runtime may communicate context lifecycle events.

AT-09 remains the owner of context data.

PERSISTENCE:

The default expectation is that active context is runtime-oriented.

Define clearly which context must survive restart, if any, without turning
AT-09 into long-term memory.

If persistence is required for recovery, it should be minimal and explicit.

SQLite may be used where persistence is required.

Do not invent a database schema.

AI INTEGRATION:

AI-03 Context Engine is the primary consumer.

AI-02 Conversation may use active conversation context.

AI-05 Planner may use task context.

AI-07 Task Manager may associate task state with context.

AI-08 Reasoning & Verification may consume relevant operation context.

AI modules must not directly modify AT-09 internal storage.

MEMORY BOUNDARY:

When persistent memory is needed:

AI-04 Memory Intelligence
→ AT-08 Memory

When active context is needed:

AI/runtime
→ AT-09 Context Store

Do not automatically convert active context into persistent memory.

SEARCH BOUNDARY:

AT-10 Search & Retrieval may retrieve relevant historical/searchable data.

AT-09 does not become a search engine.

PERMISSIONS:

Context may contain sensitive information.

Access should follow the appropriate permission/security model.

AT-16 remains the permission authority.

Do not create a separate context permission system.

IPC:

Renderer
→ controlled IPC
→ runtime
→ AT-09

The renderer must not directly access context storage.

UX-04 may present relevant context supplied through approved interfaces.

EVENTS:

Conceptual events:

- Context created
- Context updated
- Context activated
- Context completed
- Context expired
- Context cleared
- Context unavailable

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Context not found
- Context unavailable
- Invalid context data
- Storage failure
- Cleanup failure
- Context corruption
- Runtime restart
- Context expiration

The module must report actual state.

Do not silently restore stale or corrupted context as if it were valid.

SECURITY:

Protect against:

- Cross-task context leakage
- Cross-workspace context leakage
- Unauthorized context access
- Unnecessary sensitive-data retention
- Context injection
- Stale-context reuse

Context boundaries must be explicit.

PRIVACY:

Store only what is necessary for active operation.

Avoid unnecessary duplication of:

- User conversations
- Files
- Credentials
- Secrets
- Sensitive system information

Do not expose unrelated context to the AI.

PERFORMANCE:

Context retrieval must be efficient for interactive AI usage.

Do not reload large context structures unnecessarily.

Avoid duplicating large file contents when references are sufficient.

TESTING:

Include tests for:

- Context creation
- Retrieval
- Update
- Completion
- Expiration
- Cleanup
- Conversation context
- Task context
- Workspace context
- Runtime context
- Restart/recovery behavior where applicable
- Cross-context isolation
- Cross-workspace isolation
- Invalid/corrupt context
- IPC boundary
- Security behavior

ACCEPTANCE CRITERIA:

AT-09 is complete when:

- Active context can be created and retrieved reliably.
- Context can be updated and cleared.
- Context is isolated between tasks/workspaces where required.
- Stale context is cleaned up appropriately.
- AT-09 does not become long-term memory.
- AT-08 remains the persistent memory owner.
- AI-03 remains responsible for context construction/relevance.
- Context does not leak across unrelated tasks.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Session Store module.

Do not create a separate Task Context module.

Do not create a separate Context Manager module.

Active context belongs to AT-09.

Persistent memory belongs to AT-08.

Context intelligence belongs to AI-03.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact schemas, APIs, package versions, or implementation
details.

This document defines the module contract only.