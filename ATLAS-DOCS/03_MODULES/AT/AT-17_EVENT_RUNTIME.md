Write the complete module specification for `03_MODULES/AT-17_EVENT_RUNTIME.md`.

MODULE:
AT-17 — Event Runtime

This is the final AT module in the locked ATLAS architecture.

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

AT-17 provides the internal runtime event infrastructure used by ATLAS
modules to communicate state changes, operation results, lifecycle changes,
and other relevant runtime signals.

AT-17 is infrastructure for communication.

It does not own the business logic of the modules producing or consuming
events.

AT-17 must remain lightweight and local.

It must not become a general-purpose external message broker, cloud service,
or separate microservice.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Event Model
9. Event Producers
10. Event Consumers
11. Event Routing
12. Event Lifecycle
13. Event Ordering
14. Event Reliability
15. Event Isolation
16. Runtime Communication
17. AI Integration
18. UI Integration
19. Persistence Boundary
20. Permission Boundary
21. IPC Boundary
22. Error Handling
23. Security
24. Privacy
25. Performance
26. Testing Requirements
27. Verification Requirements
28. Acceptance Criteria
29. Failure Conditions
30. Git Requirements
31. Implementation Notes
32. Definition of Done

RESPONSIBILITIES:

AT-17 owns:

- Internal runtime event transport
- Event registration/subscription
- Event publishing
- Event delivery
- Event lifecycle
- Event listener management
- Event isolation
- Event error handling
- Event-related diagnostics where appropriate

AT-17 does NOT own:

- Business logic
- Workspace state
- Filesystem operations
- Process management
- Terminal execution
- Application control
- System information
- Guardian evaluation
- Memory
- Context storage
- Search
- Automation logic
- Notifications logic
- Voice
- Vision
- Permissions policy
- AI reasoning
- LLM execution
- Planning
- Task management
- OpenCode
- MCP development infrastructure

EVENT MODEL:

Define a conceptual event as:

Event
→ type
→ source
→ timestamp
→ payload
→ correlation/context information where required

Do not define final event schemas.

Events should contain only the information required by consumers.

EVENT PRODUCERS:

Any approved AT/AI/runtime module may publish relevant events.

Examples:

AT-02:
→ file operation completed

AT-03:
→ process exited

AT-04:
→ command completed

AT-07:
→ Guardian warning generated

AT-11:
→ automation triggered

AT-12:
→ notification delivered

AT-16:
→ permission decision made

AI modules:
→ task/AI lifecycle events where appropriate

The producing module remains the owner of the underlying state.

AT-17 only transports the event.

EVENT CONSUMERS:

Consumers may include:

- UX modules
- AI modules
- AT modules
- Runtime services

Examples:

AT-07 Guardian event
→ AT-12 Notifications

AT-04 Terminal event
→ AI-08 Reasoning & Verification

AT-11 Automation event
→ AT-12 Notifications

AT-16 Permission event
→ UX-04 Context & Presentation

Do not create direct hard-coded dependencies between every module when an
event subscription is more appropriate.

EVENT ROUTING:

Conceptual flow:

Producer
→ AT-17
→ identify subscribers
→ deliver event
→ consumer

AT-17 should not interpret business meaning beyond what is required for
routing.

Do not put AI reasoning inside the event runtime.

EVENT LIFECYCLE:

Conceptual states:

- CREATED
- PUBLISHED
- DELIVERED
- FAILED
- DISCARDED

These are conceptual states only.

Events do not necessarily need persistence.

EVENT ORDERING:

Where ordering matters, preserve ordering within the relevant event scope.

Do not guarantee global ordering unless explicitly required.

Events from unrelated sources should not be artificially serialized.

EVENT RELIABILITY:

Define the difference between:

- Fire-and-forget events
- Important runtime events requiring delivery acknowledgement
- Events that may be reconstructed from current state

Do not make every event durable by default.

If an event is critical but not persisted, the owning module must provide
another source of truth for its state.

EVENT ISOLATION:

Events must not leak across unrelated:

- Tasks
- Conversations
- Workspaces
- Permission scopes

Where correlation information is required, it should be attached to the
event in a controlled manner.

RUNTIME COMMUNICATION:

AT-17 is primarily an internal ATLAS runtime mechanism.

Example:

AT module
→ Event Runtime
→ another AT/AI module

Do not turn AT-17 into a network server.

Do not require cloud infrastructure.

Do not introduce a message queue service unless explicitly required later.

AI INTEGRATION:

AI modules may subscribe to or publish relevant runtime events.

Examples:

AI-07 Task Manager
→ task started/completed event

AI-08 Reasoning & Verification
→ verification result event

AI-06 Tool Orchestrator
→ tool execution event

AI modules must not bypass AT-17 with arbitrary hidden global state when an
event is the appropriate communication mechanism.

UI INTEGRATION:

UX modules may subscribe to approved runtime events.

Example:

AT-07 Guardian
→ AT-17
→ UX-03 State Visualization

AT-12 Notifications
→ AT-17
→ UX-04 Context & Presentation

The renderer must not directly subscribe to privileged internal runtime
events.

IPC:

Use:

Runtime
→ AT-17
→ approved IPC/event bridge
→ React renderer

Only approved/sanitized events may cross into the renderer.

Do not expose internal sensitive event payloads directly to the UI.

PERSISTENCE:

AT-17 should be non-persistent by default.

Persistent state belongs to the module that owns that state.

Examples:

AT-08
→ memory persistence

AT-11
→ automation persistence

AT-12
→ notification persistence where required

AT-17
→ transient event transport

Do not turn the event bus into a database.

PERMISSIONS:

AT-17 does not make authorization decisions.

AT-16 remains the permission authority.

However, event delivery must respect information boundaries.

Sensitive events should not be delivered to consumers that are not authorized
to receive the information.

AT-17 must not use an event subscription as a permission bypass.

ERROR HANDLING:

Cover:

- Invalid event
- Unknown event type
- Subscriber failure
- Event delivery failure
- Listener registration failure
- Event handler exception
- Event routing failure
- Runtime shutdown during delivery

A failing subscriber must not unnecessarily crash the entire event runtime.

Where appropriate, isolate subscriber errors.

SECURITY:

Protect against:

- Event spoofing
- Unauthorized event publishing
- Unauthorized subscriptions
- Sensitive payload leakage
- Event injection
- Cross-workspace event leakage
- Cross-task event leakage
- Renderer privilege escalation

Do not trust arbitrary event payloads from the renderer.

Only approved runtime components may publish privileged internal events.

PRIVACY:

Events may contain sensitive information.

Use minimum necessary payloads.

Avoid putting:

- Credentials
- Secrets
- Full file contents
- Raw microphone data
- Raw camera data
- Sensitive system information

into events unless absolutely necessary.

Prefer references/identifiers where appropriate.

PERFORMANCE:

AT-17 must be lightweight.

Avoid:

- Unnecessary serialization
- Global polling
- Large event payloads
- Unbounded event queues
- Blocking subscribers
- Excessive event frequency

Long-running work belongs to the module performing the operation, not the
event runtime.

TESTING:

Include tests for:

- Event publishing
- Subscription
- Unsubscription
- Multiple subscribers
- Event ordering where required
- Subscriber failure isolation
- Invalid events
- Unknown events
- Sensitive-event filtering
- Cross-task isolation
- Cross-workspace isolation
- Runtime shutdown
- IPC event filtering
- High-frequency events
- Large payload rejection/handling

VERIFICATION:

For important events, verify that:

- The event was accepted by the runtime.
- Intended subscribers received it.
- Subscriber failures are isolated.
- The event did not cross unauthorized boundaries.

Do not claim delivery merely because publishing succeeded.

ACCEPTANCE CRITERIA:

AT-17 is complete when:

- ATLAS runtime modules can publish and subscribe to events.
- Event delivery is reliable for the required event classes.
- Subscriber failures do not crash the runtime.
- Sensitive event payloads are controlled.
- Events remain isolated by relevant task/workspace/context boundaries.
- Renderer exposure is sanitized.
- AT-17 remains transient infrastructure rather than a database.
- AT-16 remains the permission authority.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Event Bus module.

Do not create a separate Event Manager module.

Do not create a separate Message Broker module.

Event infrastructure belongs entirely to AT-17.

Do not move business logic into AT-17.

Do not move persistence into AT-17.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact event schemas, APIs, package versions, message brokers,
or implementation details.

This document defines the module contract only.