Write the complete module specification for `03_MODULES/UX-03_STATE_VISUALIZATION.md`.

MODULE:
UX-03 — State Visualization

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

The existing Lovable React prototype is the official UI foundation for
ATLAS.

UX-03 owns the visual representation of ATLAS runtime, AI, task, operation,
permission, and system states.

UX-03 must display state clearly without becoming the owner of the underlying
state.

Define UX-03 in detail.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Consumers
9. State Model
10. AI State Visualization
11. Task State Visualization
12. Tool Execution State Visualization
13. Permission State Visualization
14. System/Guardian State Visualization
15. Error Visualization
16. Loading and Progress Visualization
17. Completion Visualization
18. Cancellation Visualization
19. IPC/Event Boundary
20. Accessibility
21. Security
22. Performance
23. Events
24. Interfaces
25. Testing Requirements
26. Verification Requirements
27. Acceptance Criteria
28. Failure Conditions
29. Git Requirements
30. Implementation Notes
31. Definition of Done

RESPONSIBILITIES:

UX-03 owns:

- Visual representation of runtime state
- AI activity indicators
- Task progress indicators
- Execution status
- Verification status
- Permission waiting states
- Success states
- Failure states
- Cancellation states
- Guardian/system status presentation
- Loading states
- Progress indicators
- Visual feedback for long-running operations

UX-03 does NOT own:

- AI reasoning
- Task planning
- Tool execution
- Permission decisions
- System monitoring
- Database operations
- Event-runtime implementation
- Conversation logic
- LLM execution
- Filesystem operations
- Terminal execution
- Process management
- OpenCode
- MCP development infrastructure

STATE OWNERSHIP:

The underlying state belongs to the responsible runtime module.

UX-03 observes and represents that state.

Use the principle:

Runtime State
→ controlled interface/event
→ UX-03
→ visual representation

UX-03 must not mutate privileged runtime state directly.

STATE CATEGORIES:

Define visual handling for conceptual states including:

Application:

- Starting
- Ready
- Busy
- Error
- Shutting Down
- Stopped

AI:

- Listening
- Thinking
- Planning
- Waiting
- Executing
- Verifying
- Responding
- Failed

Task:

- Created
- Planned
- Running
- Waiting
- Verifying
- Completed
- Failed
- Cancelled

Permission:

- Not Required
- Required
- Waiting
- Granted
- Denied

Operation:

- Queued
- Running
- Completed
- Failed
- Cancelled

Guardian:

- Normal
- Warning
- Critical
- Unavailable

Do not create a new runtime state system.

These are conceptual visualization states only.

AT-17 Event Runtime provides runtime event coordination.

AI-07 Task Manager owns task state.

AT-16 Permissions owns permission decisions.

AT-07 Guardian owns guardian/system health capability.

AI-08 Reasoning & Verification owns verification logic.

UX-03 only represents their states.

PROGRESS:

For long-running operations, the UI should communicate:

- Current operation
- Current phase
- Progress where measurable
- Waiting state
- Completion
- Failure
- Cancellation

Do not invent fake progress percentages when the runtime cannot provide
real progress.

If exact progress is unavailable, use an indeterminate progress state.

ERRORS:

Errors must be visually distinguishable from:

- Permission denial
- Cancellation
- Normal completion
- Waiting states

The UI should display useful information without exposing unnecessary
internal or sensitive details.

PERMISSION VISUALIZATION:

When AT-16 requires approval:

Runtime
→ permission event
→ UX-03 state
→ UX interaction/presentation

UX-03 visualizes the state.

UX-02 handles the user interaction.

UX-03 must not make the permission decision.

UX-04 may provide contextual explanation.

Do not merge these responsibilities.

AI STATE:

UX-03 may visually represent the AI pipeline:

User Input
→ Understanding
→ Context
→ Planning
→ Tool Execution
→ Verification
→ Response

Only display states that are actually available from runtime information.

Do not pretend that an internal AI phase occurred if the runtime did not
report it.

GUARDIAN:

Guardian/system states may be displayed through UX-03.

Example:

AT-07 Guardian
→ warning event
→ UX-03
→ visual system warning

UX-03 does not diagnose the system.

ACCESSIBILITY:

Include:

- Non-color state indicators
- Accessible labels
- Screen-reader compatible status updates
- Keyboard accessibility for interactive state elements
- Clear error communication
- Appropriate live-region behavior for important status changes
- Avoid excessive animated motion
- Respect reduced-motion preferences where supported

SECURITY:

UX-03 must not expose:

- Secrets
- Credentials
- Private data unnecessarily
- Raw internal logs
- Sensitive tool parameters

State visualization should expose only the information required for the
user to understand what ATLAS is doing.

PERFORMANCE:

State updates should not cause unnecessary application-wide rerenders.

Long-running operations should update only the relevant UI surfaces.

Avoid high-frequency rendering when runtime events arrive rapidly.

EVENTS:

UX-03 may consume conceptual events such as:

- Runtime state changed
- AI state changed
- Task state changed
- Tool state changed
- Permission state changed
- Guardian warning
- Operation completed
- Operation failed
- Operation cancelled

Do not define final event names or schemas.

TESTING:

Include tests for:

- Initial loading state
- AI state transitions
- Task progress
- Permission waiting
- Permission denial
- Success state
- Failure state
- Cancellation state
- Guardian warning
- Missing progress information
- Accessibility
- Rapid state updates
- Renderer/runtime boundary

ACCEPTANCE CRITERIA:

UX-03 is complete when:

- Relevant runtime states are represented accurately.
- No fake progress is displayed.
- AI/task/tool states are visually distinguishable.
- Permission states are clearly represented.
- Errors, cancellation, and completion are distinct.
- Guardian warnings are visible when reported.
- Accessibility requirements are satisfied.
- State visualization does not own or mutate runtime state.
- No AI/AT responsibilities are implemented inside UX-03.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a new state-management module.

Do not move Task Manager, Event Runtime, Permissions, Guardian, or
Reasoning/Verification responsibilities into UX-03.

Do not redesign the Lovable prototype.

Do not introduce OpenCode or MCP into ATLAS runtime.

Do not invent APIs, event schemas, package versions, routes, or implementation
details.

This document defines the module contract only.