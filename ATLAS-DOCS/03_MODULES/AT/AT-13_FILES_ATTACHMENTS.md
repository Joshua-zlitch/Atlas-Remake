Write the complete module specification for `03_MODULES/AT-13_FILES_ATTACHMENTS.md`.

MODULE:
AT-13 — Files & Attachments

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

AT-13 provides the capability for ATLAS to receive, manage, inspect, track,
and make user-provided files and attachments available to relevant runtime
and AI workflows.

AT-13 owns attachment lifecycle and attachment metadata.

AT-02 Filesystem owns the underlying filesystem operations.

AT-10 Search & Retrieval owns search/indexing.

AI-03 Context Engine decides whether an attachment is relevant to AI
context.

AT-13 must not become a second filesystem module.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Attachment Model
9. Attachment Creation
10. Attachment Ingestion
11. Attachment Validation
12. Attachment Metadata
13. Attachment Storage Boundary
14. Attachment Access
15. Attachment Processing Boundary
16. Context Integration
17. AI Integration
18. Search Integration
19. Workspace Relationship
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

AT-13 owns:

- Attachment lifecycle
- Attachment registration
- Attachment metadata
- Attachment validation
- Attachment availability
- Attachment cleanup
- Attachment access coordination
- Attachment-related events
- User-provided file lifecycle within ATLAS workflows

AT-13 does NOT own:

- General filesystem operations
- Workspace management
- Search/indexing
- Memory
- Context construction
- LLM execution
- AI reasoning
- Planning
- Tool orchestration
- Terminal execution
- Process management
- Application control
- Permissions policy
- Notification delivery
- OpenCode
- MCP development infrastructure

ATTACHMENT MODEL:

Define a conceptual attachment containing information such as:

- Identity
- Filename
- Type
- Size
- Source
- Location/reference
- Creation/received timestamp
- Availability
- Processing state
- Related conversation/task where applicable

Do not define the final database schema.

INGESTION:

General flow:

User
→ UX-02 Interaction System
→ AT-13 Files & Attachments
→ validate
→ register/store reference
→ make available to relevant workflow
→ AI-03 Context Engine when relevant

Do not assume every attachment must be sent to the LLM.

VALIDATION:

Validate where applicable:

- File existence
- Path/location
- File type
- File size
- Accessibility
- Metadata
- Processing compatibility

Do not invent arbitrary file-size or file-type limits unless defined later.

Treat attachment contents as untrusted input.

STORAGE BOUNDARY:

AT-13 manages attachment lifecycle.

AT-02 performs filesystem operations.

If the attachment is copied, moved, read, or deleted, AT-13 must use the
approved filesystem interface rather than duplicating filesystem logic.

Example:

AT-13
→ AT-02 Filesystem
→ operation
→ result

Do not implement a second filesystem abstraction that bypasses AT-02.

PROCESSING:

AT-13 manages the attachment lifecycle.

Actual content interpretation belongs to the relevant consumer.

For AI workflows:

AT-13
→ attachment reference/content access
→ AI-03 Context Engine
→ relevant AI processing

Do not create a separate document-processing or file-parsing ATLAS module.

Any parsing functionality should remain an implementation detail of the
relevant capability.

CONTEXT:

AI-03 Context Engine determines whether attachment information belongs in
the current AI context.

Do not automatically inject all attachment contents into every prompt.

Large attachments should be handled efficiently.

AI INTEGRATION:

AI-02 Conversation may receive attachment references.

AI-03 Context Engine determines relevance.

AI-05 Planner may use attachment information when planning.

AI-06 Tool Orchestrator may request attachment operations.

AI-08 Reasoning & Verification may use attachment-derived results.

AI modules must access attachments through approved interfaces.

SEARCH:

AT-10 Search & Retrieval may index/search approved attachment content or
metadata.

AT-13 remains the owner of attachment lifecycle.

WORKSPACE:

Attachments may be associated with an AT-01 Workspace where appropriate.

Workspace association does not automatically grant unrestricted access.

PERMISSIONS:

Potentially protected operations include:

- Reading sensitive attachments
- Accessing attachments outside the active workflow
- Moving/copying attachments
- Deleting attachments
- Sharing attachment content with an external capability

Use:

Request
→ AT-16 Permissions where required
→ AT-13
→ approved operation

AT-13 must not create its own permission system.

IPC:

Renderer
→ IPC
→ runtime
→ AT-13

The renderer must not directly access arbitrary filesystem paths.

Validate all renderer-originated attachment requests.

EVENTS:

Conceptual events:

- Attachment added
- Attachment validated
- Attachment available
- Attachment processing started
- Attachment processing completed
- Attachment unavailable
- Attachment deleted
- Attachment operation failed

Do not define final event schemas.

ERROR HANDLING:

Cover:

- File missing
- Invalid attachment
- Unsupported type
- Size limitation
- Access denied
- Storage failure
- Processing failure
- Attachment unavailable
- Corrupt content
- Cleanup failure
- Permission denial

Never report an attachment as available when validation/access failed.

SECURITY:

Treat attachment contents as untrusted.

Protect against:

- Malicious files
- Path traversal
- Unexpected file types
- Oversized files
- Malicious metadata
- Prompt injection contained in documents
- Unintended execution of attachments
- Unauthorized attachment access

Do not automatically execute an attachment.

Do not treat text inside a file as trusted system instructions.

PRIVACY:

Attachments may contain highly sensitive user data.

Use:

User provides attachment
→ validate
→ store/access minimally
→ provide only to relevant workflow
→ clean up according to lifecycle

Do not retain temporary attachments indefinitely.

Do not expose attachment content to unrelated AI contexts.

PERFORMANCE:

Avoid loading large attachments entirely into memory when unnecessary.

Use streaming, chunking, references, or other appropriate mechanisms where
required.

Do not duplicate large files unnecessarily.

TESTING:

Include tests for:

- Attachment registration
- Validation
- Metadata
- Supported/unsupported files
- Missing files
- Access denial
- Large files
- Cleanup
- Conversation integration
- Context integration
- Search integration
- Permission boundary
- Malicious/untrusted content
- IPC boundary
- Persistence where applicable

VERIFICATION:

Attachment operations should be verified where practical.

Examples:

Registration
→ verify attachment exists/is accessible
→ report result

Cleanup
→ perform cleanup
→ verify expected state
→ report result

ACCEPTANCE CRITERIA:

AT-13 is complete when:

- User attachments can be registered and managed reliably.
- Attachment metadata is maintained.
- Invalid/unavailable attachments are handled correctly.
- Attachment lifecycle is controlled.
- Filesystem operations use AT-02.
- Search uses AT-10 where required.
- AI context uses AI-03.
- Protected access respects AT-16.
- Attachment contents are treated as untrusted.
- Temporary data is cleaned up appropriately.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate File Upload module.

Do not create a separate Document Parser module.

Do not create a separate Attachment Storage module.

Attachment capability belongs entirely to AT-13.

Do not move filesystem ownership into AT-13.

AT-02 remains the filesystem authority.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact parsers, schemas, APIs, package versions, or
implementation details.

This document defines the module contract only.