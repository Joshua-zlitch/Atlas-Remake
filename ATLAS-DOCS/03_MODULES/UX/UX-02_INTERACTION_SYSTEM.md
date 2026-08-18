Write the complete module specification for `03_MODULES/UX-02_INTERACTION_SYSTEM.md`.

MODULE:
UX-02 — Interaction System

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

PRODUCT/UI CONTEXT:

The existing Lovable React prototype is the official UI foundation.

UX-02 is responsible for the interaction behavior through which the user
communicates with ATLAS.

Do not redesign the prototype.

Inspect and reuse the existing interaction components and patterns wherever
they already exist.

Define UX-02 in detail.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Consumers
9. Interaction Model
10. User Input Handling
11. Conversation Interaction
12. Keyboard Interaction
13. Mouse/Pointer Interaction
14. Voice Interaction Boundary
15. File/Attachment Interaction Boundary
16. Interaction States
17. IPC Boundary
18. Error Handling
19. Accessibility
20. Security
21. Performance
22. Events
23. Interfaces
24. Testing Requirements
25. Verification Requirements
26. Acceptance Criteria
27. Failure Conditions
28. Git Requirements
29. Implementation Notes
30. Definition of Done

RESPONSIBILITIES:

UX-02 owns:

- User interaction handling
- Chat input interaction
- Sending user requests into the ATLAS runtime
- User interaction states
- Interaction controls
- Input validation at the UI level
- Keyboard interaction
- Pointer interaction
- User cancellation requests
- User confirmation interaction
- Interaction feedback triggers
- Interaction with attachments at the UI boundary
- Interaction with voice input at the UI boundary

UX-02 does NOT own:

- LLM execution
- Conversation intelligence
- Planning
- Tool selection
- Tool execution
- Filesystem operations
- Terminal execution
- Process management
- Memory storage
- Context construction
- Permissions
- Database operations
- Runtime event implementation
- OpenCode
- MCP development infrastructure

BOUNDARIES:

UX-02 communicates with AI/runtime capabilities through approved interfaces.

General flow:

User
→ UX-02
→ approved runtime interface
→ AI-02 Conversation
→ AI pipeline

For an action:

User
→ UX-02
→ AI
→ AI-06 Tool Orchestrator
→ AT-16 Permissions
→ AT Capability

UX-02 must not directly call privileged AT capabilities.

INTERACTION STATES:

Define conceptual states such as:

- Idle
- Input
- Sending
- Thinking
- Planning
- Waiting for Permission
- Executing
- Verifying
- Completed
- Failed
- Cancelled

UX-02 is responsible for interaction behavior associated with these states.

UX-03 is responsible for the actual visual state representation.

Do not merge UX-02 and UX-03.

CONVERSATION:

Define how the user submits a message.

The conceptual flow is:

User Input
→ UX-02
→ validation
→ runtime request
→ AI-02 Conversation
→ AI processing
→ result
→ UX-04 presentation

Do not define final IPC channel names or API schemas.

CANCELLATION:

The user may request cancellation of supported operations.

UX-02 sends a cancellation request through the approved runtime interface.

UX-02 must not forcibly terminate arbitrary processes merely because the user
pressed a UI cancel button.

PERMISSION INTERACTION:

When AT-16 requires user approval:

Runtime
→ UX-02
→ user confirmation
→ permission response
→ runtime

The UI must clearly distinguish:

- Allowed
- Denied
- Waiting for approval

The AI must never receive permission merely because a UI component was
rendered.

ATTACHMENTS:

UX-02 handles the user interaction required to select/provide attachments.

Actual attachment processing belongs to:

AT-13 Files & Attachments

UX-02 must not own attachment storage or parsing.

VOICE:

UX-02 may initiate voice interaction through AT-14 Voice.

UX-02 does not implement speech recognition or text-to-speech.

ACCESSIBILITY:

Include:

- Keyboard navigation
- Focus management
- Visible interaction states
- Accessible controls
- Appropriate labels
- Error communication
- Permission dialog accessibility

SECURITY:

The renderer must not receive unrestricted access to:

- Node.js
- Filesystem
- Shell
- Process APIs
- SQLite
- OS APIs

All privileged actions cross the controlled runtime boundary.

PERFORMANCE:

Avoid:

- Excessive rerenders
- Blocking the renderer
- Large synchronous operations
- Unnecessary duplication of conversation state

Long-running work must remain in the runtime.

ERROR HANDLING:

Define behavior for:

- Invalid user input
- Runtime unavailable
- AI request failure
- Permission denial
- Operation failure
- Cancellation
- Timeout

The UI must not claim an operation succeeded when the runtime reports
failure.

TESTING:

Include tests for:

- Message submission
- Input validation
- Keyboard interactions
- Cancellation
- Permission interactions
- Error states
- Runtime unavailable state
- Attachment interaction
- Voice interaction boundary
- IPC integration

ACCEPTANCE CRITERIA:

UX-02 is complete when:

- User interaction works through the existing Lovable UI.
- User messages can reach the ATLAS AI pipeline.
- Interaction states are correctly communicated.
- Cancellation works through the approved runtime boundary.
- Permission requests can be presented and answered.
- Attachments can be initiated through the UI without UX-02 owning their
  storage/processing.
- No privileged operation bypasses the runtime.
- No AI/AT responsibilities are incorrectly implemented inside UX-02.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create additional modules.

Do not redesign the Lovable prototype.

Do not move responsibilities from UX-03 or UX-04 into UX-02.

Do not introduce OpenCode into ATLAS.

Do not introduce MCP into the ATLAS runtime.

Do not invent final APIs, IPC channels, route names, database schemas,
package versions, or implementation details that have not been established.

This document defines the module contract only.