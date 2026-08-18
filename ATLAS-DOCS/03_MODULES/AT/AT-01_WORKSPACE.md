Write the complete module specification for `03_MODULES/AT-01_WORKSPACE.md`.

MODULE:
AT-01 — Workspace

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

PRODUCT CONTEXT:

AT-01 represents the user's active local workspace/project environment.

A workspace provides ATLAS with a defined location and project context that
other capabilities can use when performing relevant operations.

AT-01 is NOT the filesystem itself.

AT-02 owns filesystem operations.

AT-01 owns workspace identity, workspace lifecycle, workspace metadata, and
the relationship between a workspace and the ATLAS runtime.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Consumers
9. Workspace Model
10. Workspace Lifecycle
11. Workspace Discovery
12. Workspace Selection
13. Workspace Switching
14. Workspace Metadata
15. Workspace Context
16. Filesystem Boundary
17. AI Integration
18. Permission Boundary
19. Persistence
20. Events
21. Error Handling
22. Security
23. Performance
24. Testing Requirements
25. Verification Requirements
26. Acceptance Criteria
27. Failure Conditions
28. Git Requirements
29. Implementation Notes
30. Definition of Done

RESPONSIBILITIES:

AT-01 owns:

- Workspace identity
- Active workspace
- Workspace selection
- Workspace switching
- Workspace metadata
- Workspace lifecycle
- Workspace/project context
- Workspace persistence where required
- Providing workspace information to approved consumers
- Workspace-related events

AT-01 does NOT own:

- Raw filesystem operations
- File creation
- File deletion
- File modification
- Terminal execution
- Process control
- Application control
- AI reasoning
- Planning
- Tool orchestration
- Memory storage
- Search implementation
- Permissions implementation
- Database implementation as a general-purpose service
- OpenCode
- MCP development infrastructure

WORKSPACE MODEL:

Define a conceptual workspace as:

Workspace
→ identity
→ local path/location
→ metadata
→ active/inactive state
→ associated project context

Do not invent a final database schema.

Do not assume that every folder on the computer is automatically a workspace.

WORKSPACE LIFECYCLE:

Define conceptual states:

- Discovered
- Selected
- Active
- Switching
- Unavailable
- Closed

Explain:

Workspace discovery
→ user selection
→ validation
→ activation
→ context availability

WORKSPACE SELECTION:

When a user selects a workspace:

1. Validate the requested location.
2. Confirm that the location is accessible.
3. Create/load workspace metadata as required.
4. Mark it as active.
5. Notify relevant runtime components.
6. Make workspace context available to AI and UI.

Do not perform arbitrary filesystem manipulation merely because a workspace
was selected.

FILESYSTEM BOUNDARY:

AT-01 identifies and manages workspace context.

AT-02 performs filesystem operations.

Example:

AT-01
→ active workspace path
→ AT-02
→ file operation

AT-01 must not duplicate the entire filesystem implementation.

AI INTEGRATION:

AI modules may request information about the active workspace.

For example:

AI-03 Context Engine
→ requests active workspace context
→ AT-01
→ workspace information

AI-05 Planner may use workspace information when creating a plan.

AI-06 Tool Orchestrator may use workspace context when invoking filesystem,
terminal, or application capabilities.

AI does not directly modify AT-01 internal state.

PERMISSIONS:

Workspace selection and access may involve AT-16 Permissions where required.

Workspace context must not be treated as permission to perform every possible
operation inside that workspace.

A workspace boundary does not replace the permission system.

PERSISTENCE:

Document conceptual persistence for:

- Known workspaces
- Active workspace preference
- Workspace metadata

Do not define exact tables or database schemas.

DATA OWNERSHIP:

AT-01 owns workspace metadata.

AT-02 owns filesystem operation results.

AT-09 owns active context storage.

AI-03 owns AI context construction.

Do not duplicate ownership.

EVENTS:

Define conceptual events such as:

- Workspace discovered
- Workspace selected
- Workspace activated
- Workspace switched
- Workspace unavailable
- Workspace closed

Do not invent final event names or schemas.

ERROR HANDLING:

Cover:

- Invalid workspace path
- Missing workspace
- Inaccessible workspace
- Permission denial
- Workspace switch failure
- Corrupt/unavailable workspace metadata
- Workspace becoming unavailable during an active task

The module must report actual state and must not claim that a workspace is
active if activation failed.

SECURITY:

Define:

- Path validation
- Permission checks where required
- No unrestricted filesystem access
- No trusting arbitrary renderer-provided paths
- No automatic execution of files
- No privilege escalation through workspace selection

The renderer communicates through approved IPC/runtime interfaces.

PERFORMANCE:

Workspace switching should avoid unnecessary rescanning or duplication of
large project structures.

Do not make AT-01 responsible for indexing the entire workspace.

AT-10 Search & Retrieval owns search/indexing capabilities.

TESTING:

Include tests for:

- Workspace creation/registration where applicable
- Workspace discovery
- Workspace selection
- Workspace activation
- Workspace switching
- Invalid paths
- Missing paths
- Permission denial
- Workspace unavailable state
- Persistence/reload
- Event emission
- AI context integration
- IPC boundary

VERIFICATION:

A workspace operation is complete only when the resulting workspace state
has been verified.

ACCEPTANCE CRITERIA:

AT-01 is complete when:

- A valid local workspace can be selected.
- The active workspace can be retrieved reliably.
- Workspace switching works correctly.
- Workspace metadata persists where required.
- Invalid/inaccessible workspaces are handled correctly.
- Workspace context can be consumed by approved AI/runtime components.
- AT-01 does not perform filesystem operations owned by AT-02.
- Permission boundaries are respected.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Project module.

Do not create a separate Workspace Manager module.

Workspace management belongs entirely to AT-01.

Do not move filesystem ownership into AT-01.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent APIs, database schemas, package versions, or implementation
details.

This document defines the module contract only.