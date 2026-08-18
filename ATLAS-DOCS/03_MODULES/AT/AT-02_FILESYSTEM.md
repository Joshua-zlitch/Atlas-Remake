Write the complete module specification for `03_MODULES/AT-02_FILESYSTEM.md`.

MODULE:
AT-02 — Filesystem

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

AT-02 provides controlled local filesystem operations for ATLAS.

It is the primary AT capability for interacting with files and directories.

AT-02 must operate behind the AT-16 Permissions boundary whenever an
operation requires authorization.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Supported Operations
6. Inputs
7. Outputs
8. Dependencies
9. Workspace Relationship
10. Path Handling
11. Read Operations
12. Write Operations
13. Move/Copy Operations
14. Delete Operations
15. Directory Operations
16. Metadata Operations
17. Permission Boundary
18. AI Integration
19. IPC Boundary
20. Events
21. Error Handling
22. Security
23. Performance
24. Persistence Boundary
25. Testing Requirements
26. Verification Requirements
27. Acceptance Criteria
28. Failure Conditions
29. Git Requirements
30. Implementation Notes
31. Definition of Done

RESPONSIBILITIES:

AT-02 owns:

- Reading files
- Writing files
- Creating files
- Modifying files
- Deleting files
- Creating directories
- Removing directories where authorized
- Moving files/directories
- Copying files/directories
- Reading relevant filesystem metadata
- Checking filesystem availability
- Reporting filesystem operation results

AT-02 does NOT own:

- Workspace identity
- Search indexing
- Memory
- Attachments as a product capability
- Terminal execution
- Process management
- Application control
- Permissions policy
- AI reasoning
- Planning
- Task management
- Database management
- OpenCode
- MCP development infrastructure

SUPPORTED OPERATIONS:

Define conceptual operations:

- Read
- Write
- Create
- Update
- Delete
- Move
- Copy
- List
- Create Directory
- Remove Directory
- Metadata Inspection

Do not define final APIs yet.

PATH HANDLING:

All paths must be validated before use.

Cover:

- Absolute paths
- Relative paths
- Workspace-relative paths
- Path normalization
- Path traversal prevention
- Invalid paths
- Missing paths
- Symbolic links where relevant
- Windows path behavior

Do not assume every path is safe simply because it came from the AI.

The AI is not trusted to provide safe paths.

PERMISSIONS:

Use:

AI-06 Tool Orchestrator
→ AT-16 Permissions
→ AT-02 Filesystem

Sensitive operations may require approval.

Examples:

- Delete
- Overwrite
- Move outside an authorized workspace
- Modify protected files
- Access sensitive locations

AT-02 performs the operation only after the required permission decision
has been satisfied.

AT-02 must never implement a hidden permission bypass.

WORKSPACE:

AT-01 provides workspace context.

AT-02 performs operations within that context when applicable.

Example:

AT-01
→ active workspace
→ AT-02
→ filesystem operation

A workspace path does not automatically authorize every destructive
operation.

AI INTEGRATION:

AI-06 Tool Orchestrator invokes filesystem capabilities.

AI-08 Reasoning & Verification evaluates results where required.

AI-03 Context Engine may consume relevant filesystem information through
approved interfaces.

AI must not access the filesystem directly.

IPC:

The React renderer must never directly access the filesystem.

Use:

React
→ IPC
→ runtime
→ AT-02

Validate all renderer-originated requests.

EVENTS:

Conceptual events may include:

- File created
- File modified
- File deleted
- Directory created
- Operation started
- Operation completed
- Operation failed

Do not invent final event schemas.

ERROR HANDLING:

Cover:

- File not found
- Access denied
- Path invalid
- Path traversal attempt
- File locked
- Disk unavailable
- Disk full
- Operation interrupted
- Unsupported operation
- Permission denied

The module must return accurate failure information.

Never report a file operation as successful unless the operation actually
completed.

VERIFICATION:

For important write/delete/move operations, define how the result may be
verified.

Examples:

Write
→ perform write
→ verify file exists/content where practical

Move
→ perform move
→ verify source/destination state where practical

Delete
→ perform delete
→ verify target no longer exists where practical

Do not require expensive verification for every trivial read operation.

SECURITY:

AT-02 must protect against:

- Path traversal
- Unauthorized access
- Accidental destructive operations
- Malicious filenames
- Unsafe symbolic-link behavior where relevant
- Untrusted AI-generated paths
- Untrusted renderer input

Do not execute files automatically merely because AT-02 can access them.

PERFORMANCE:

Handle large files carefully.

Avoid loading entire large files into memory when unnecessary.

Use appropriate streaming/chunking strategies where implementation requires
them.

Do not make AT-02 responsible for search indexing.

AT-10 owns Search & Retrieval.

Do not make AT-02 responsible for attachment processing.

AT-13 owns Files & Attachments.

TESTING:

Include tests for:

- Read
- Write
- Create
- Modify
- Delete
- Move
- Copy
- Directory operations
- Metadata
- Invalid paths
- Traversal prevention
- Permission denial
- Missing files
- Locked files
- Large files
- Windows path behavior
- Workspace boundaries
- IPC boundary
- Verification behavior
- Error reporting

ACCEPTANCE CRITERIA:

AT-02 is complete when:

- Authorized filesystem operations work reliably.
- Unauthorized operations are rejected.
- Paths are validated.
- Destructive operations respect permissions.
- Results are accurately reported.
- Important operations can be verified.
- Renderer cannot directly access the filesystem.
- Workspace context is respected.
- Large-file handling does not unnecessarily exhaust memory.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create separate File Manager, Directory Manager, or Path Security
modules.

All filesystem capability belongs to AT-02.

Do not move permissions into AT-02.

AT-16 remains the permission authority.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact APIs, schemas, package versions, or implementation
details.

This document defines the module contract only.