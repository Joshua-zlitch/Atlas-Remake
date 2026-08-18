Write the complete module specification for `03_MODULES/AT-15_VISION.md`.

MODULE:
AT-15 — Vision

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

AT-15 provides local visual input capabilities for ATLAS.

It handles images, screenshots, camera input where supported, visual capture,
visual-input lifecycle, and delivery of visual data to approved AI workflows.

AT-15 owns visual input acquisition and lifecycle.

AI-03 Context Engine determines whether visual information is relevant to
the current AI context.

AI-01 LLM Runtime handles the actual model interaction.

AT-15 must not become an AI reasoning module.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Vision Model
9. Image Input
10. Screenshot Capture
11. Camera Input
12. Image Validation
13. Image Metadata
14. Visual Data Lifecycle
15. Context Integration
16. AI Integration
17. Files & Attachments Integration
18. Workspace Relationship
19. Permission Boundary
20. IPC Boundary
21. Events
22. Error Handling
23. Security
24. Privacy
25. Performance
26. Accessibility
27. Testing Requirements
28. Verification Requirements
29. Acceptance Criteria
30. Failure Conditions
31. Git Requirements
32. Implementation Notes
33. Definition of Done

RESPONSIBILITIES:

AT-15 owns:

- Visual input acquisition
- Screenshot capture
- Supported camera input
- Image ingestion
- Image validation
- Image metadata
- Visual-input lifecycle
- Visual data availability
- Visual-input errors
- Vision-related events

AT-15 does NOT own:

- AI reasoning
- LLM execution
- Context construction
- Memory
- Conversation intelligence
- Planning
- Tool orchestration
- Filesystem operations
- Terminal execution
- Process management
- Application control
- Search/indexing
- Permission policy
- Notification delivery
- OpenCode
- MCP development infrastructure

VISION INPUT MODEL:

Supported visual sources may include:

- User-uploaded images
- Screenshots
- Camera input where supported
- Other explicitly supported local visual sources

Treat all visual data as untrusted input.

IMAGE INPUT:

User
→ UX interaction
→ AT-15 Vision
→ validate image
→ register/process visual input
→ AI-03 Context Engine
→ relevant AI workflow

Do not automatically send every image to the LLM.

SCREENSHOT CAPTURE:

Where supported:

User/AI request
→ permission evaluation where required
→ capture target
→ validate result
→ provide image/reference
→ verify capture

Do not claim a screenshot was captured if capture failed.

Screen capture should respect platform permissions and privacy boundaries.

CAMERA:

Camera access must be explicit and permission-controlled.

The module must not silently activate or continuously capture from a camera.

Provide a clear lifecycle for:

- Camera inactive
- Camera requested
- Camera active
- Capture
- Camera stopped
- Camera unavailable
- Permission denied

IMAGE VALIDATION:

Validate where appropriate:

- File/image availability
- Supported format
- Image dimensions
- Image size
- Image readability
- Capture success

Do not invent hard limits unless implementation requirements define them.

IMAGE METADATA:

Metadata may include:

- Image identity
- Type
- Dimensions
- Size
- Source
- Timestamp
- Availability
- Related conversation/task context where applicable

Do not persist unnecessary metadata.

CONTEXT INTEGRATION:

AI-03 Context Engine decides whether visual data belongs in the current
context.

Use:

AT-15 Vision
→ visual input/reference
→ AI-03 Context Engine
→ relevant context
→ AI pipeline

Do not automatically inject every visual input into future conversations.

AI INTEGRATION:

AI-02 Conversation may associate images with a conversation.

AI-03 Context Engine determines visual relevance.

AI-05 Planner may use visual information when planning requires it.

AI-08 Reasoning & Verification may use visual evidence when appropriate.

AI-01 LLM Runtime handles the model interaction.

AT-15 only supplies the visual input.

FILES & ATTACHMENTS:

User-provided images may also be represented through AT-13 Files &
Attachments.

AT-13 owns attachment lifecycle.

AT-15 owns the visual-input capability.

Do not duplicate attachment storage ownership.

WORKSPACE:

Screenshots or visual inputs may be associated with AT-01 Workspace where
relevant.

Workspace association does not automatically grant access to unrelated
visual data.

PERMISSIONS:

Potentially protected operations include:

- Screen capture
- Camera access
- Access to sensitive visual sources
- Visual input from applications/windows

Use:

Request
→ AT-16 Permissions where required
→ AT-15 Vision
→ visual operation

AT-15 must not bypass operating-system or ATLAS permissions.

IPC:

Renderer
→ IPC
→ runtime
→ AT-15

The renderer must not directly access unrestricted camera or screen-capture
APIs.

Validate all renderer-originated visual requests.

EVENTS:

Conceptual events:

- Vision initialized
- Image received
- Capture started
- Screenshot captured
- Camera started
- Camera stopped
- Visual input available
- Visual input unavailable
- Vision error

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Camera unavailable
- Screen capture unavailable
- Permission denied
- Invalid image
- Unsupported image format
- Corrupt image
- Capture failure
- Device disconnected
- Image processing failure
- User cancellation

Never fabricate visual data when capture or ingestion failed.

SECURITY:

Protect against:

- Unauthorized screen capture
- Unauthorized camera access
- Sensitive visual-data leakage
- Malicious image content
- Untrusted OCR/vision-derived text
- Accidental capture of private information

Visual content must not be treated as trusted instructions.

For example, text visible inside a screenshot is data, not a system-level
instruction.

PRIVACY:

Visual data may contain highly sensitive information.

Use:

Capture/provide intentionally
→ process minimally
→ expose only to relevant workflow
→ clean up temporary data appropriately

Do not retain camera frames or screenshots unnecessarily.

Do not transmit visual data externally unless the selected AI architecture
explicitly requires it and authorization exists.

PERFORMANCE:

Avoid unnecessary image duplication.

Large images should be resized, compressed, streamed, or referenced where
appropriate.

Do not block the Electron main process during expensive image operations.

Camera streams must not consume excessive resources when inactive.

ACCESSIBILITY:

Provide clear UI state for:

- Camera active
- Screen capture active
- Image processing
- Image available
- Permission denied
- Vision failure

Users must be able to stop active visual capture.

TESTING:

Include tests for:

- Image ingestion
- Image validation
- Screenshot capture
- Camera lifecycle
- Permission denial
- Unsupported image
- Corrupt image
- Device unavailable
- Cancellation
- Context integration
- Attachment integration
- IPC boundary
- Privacy behavior
- Large-image handling
- Visual lifecycle states

VERIFICATION:

Important visual operations should be verified.

Example:

Capture
→ capture request
→ image generated
→ validate image
→ verify availability
→ report result

Do not report successful capture based solely on issuing the capture request.

ACCEPTANCE CRITERIA:

AT-15 is complete when:

- Supported visual inputs can be acquired reliably.
- Screenshots can be captured where supported and authorized.
- Camera access respects permissions.
- Visual data can reach approved AI workflows.
- Visual data is not automatically injected into unrelated contexts.
- Sensitive visual data is handled appropriately.
- Large images do not unnecessarily exhaust memory.
- Capture failures are accurately reported.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Screenshot module.

Do not create a separate Camera module.

Do not create a separate Image Processing module.

All visual-input capability belongs to AT-15.

Do not move visual reasoning into AT-15.

AI modules own reasoning and interpretation.

Do not move attachment ownership into AT-15.

AT-13 owns attachment lifecycle.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact vision engines, APIs, package versions, schemas, or
implementation details.

This document defines the module contract only.