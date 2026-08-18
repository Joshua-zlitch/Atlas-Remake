Write the complete module specification for `03_MODULES/AI-07_TASK_MANAGER.md`.

MODULE:
AI-07 — Task Manager

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

AI-07 owns the lifecycle and execution state of multi-step AI tasks.

It takes structured plans from AI-05 Planner, coordinates their execution
through AI-06 Tool Orchestrator, tracks progress, handles task state,
coordinates failures/cancellation, and reports task results.

AI-07 manages tasks.

AI-05 creates plans.

AI-06 executes individual tools/capabilities.

AI-08 verifies results.

AI-07 must not directly execute system operations or perform LLM inference.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Task Model
9. Task Creation
10. Task Lifecycle
11. Step Lifecycle
12. Plan Integration
13. Execution Coordination
14. Progress Tracking
15. Task Dependencies
16. Cancellation
17. Pause/Resume
18. Failure Handling
19. Retry Policy
20. Verification Integration
21. Conversation Integration
22. Workspace Integration
23. Persistence
24. Permission Boundary
25. IPC Boundary
26. Event Runtime Integration
27. Notifications Integration
28. Security
29. Privacy
30. Performance
31. Testing Requirements
32. Verification Requirements
33. Acceptance Criteria
34. Failure Conditions
35. Git Requirements
36. Implementation Notes
37. Definition of Done

RESPONSIBILITIES:

AI-07 owns:

- Task creation
- Task lifecycle
- Task state
- Step state
- Execution progress
- Plan-to-task coordination
- Task cancellation
- Pause/resume where supported
- Retry coordination
- Task result aggregation
- Task persistence where required
- Task-related events

AI-07 does NOT own:

- LLM inference
- Conversation management
- Context construction
- Memory intelligence
- Planning
- Actual tool execution
- Filesystem operations
- Terminal execution
- Process management
- Application control
- Permission policy
- Guardian evaluation
- Notifications delivery
- Workspace ownership
- OpenCode
- MCP development infrastructure

TASK MODEL:

Define a conceptual task:

Task
→ identity
→ goal
→ plan
→ steps
→ state
→ progress
→ workspace/context association
→ execution metadata
→ result

Do not define the final database schema.

TASK CREATION:

Conceptual flow:

User goal
→ AI-02 Conversation
→ AI-05 Planner
→ structured plan
→ AI-07 Task Manager
→ task created

Not every user request needs to become a persistent task.

Simple conversational questions should remain simple conversations.

TASK LIFECYCLE:

Define conceptual states:

- CREATED
- QUEUED
- READY
- RUNNING
- PAUSED
- WAITING
- VERIFYING
- COMPLETED
- FAILED
- CANCELLED

These are conceptual states only.

State transitions must be explicit.

Do not report a task as completed while required steps remain unverified.

STEP LIFECYCLE:

Each plan step may have conceptual states:

- PENDING
- READY
- RUNNING
- WAITING
- VERIFYING
- COMPLETED
- FAILED
- SKIPPED
- CANCELLED

AI-07 coordinates these states.

AI-06 executes the actual operation.

PLAN INTEGRATION:

AI-05 produces the plan.

AI-07 converts the plan into an executable task structure.

Example:

AI-05:
Step 1 → inspect project
Step 2 → modify code
Step 3 → run tests
Step 4 → verify

AI-07:
→ tracks Step 1
→ waits for completion
→ enables Step 2
→ continues
→ tracks Step 3
→ sends result to AI-08
→ completes task after verification

Do not recreate planning logic inside AI-07.

EXECUTION:

AI-07 sends executable steps to AI-06.

Flow:

AI-07
→ AI-06 Tool Orchestrator
→ AT capability
→ result
→ AI-06
→ AI-07

AI-07 tracks the result and determines what task-level action should happen
next.

PROGRESS:

Provide conceptual progress such as:

- Current step
- Completed steps
- Remaining steps
- Failed steps
- Overall state

Do not assume that simple percentage completion is always meaningful.

A task may have weighted or conditional steps.

DEPENDENCIES:

AI-07 must respect plan dependencies.

A dependent step must not execute until its required dependencies have
successfully completed or been explicitly marked as satisfied.

Do not bypass failed dependencies without an explicit recovery decision.

CANCELLATION:

Users must be able to cancel active tasks.

Cancellation flow:

User
→ AI-07
→ stop future steps
→ request cancellation of current tool through AI-06
→ update task state
→ report result

AI-07 must not directly terminate processes.

AI-06 and the relevant AT capability own actual operation cancellation.

PAUSE/RESUME:

Where supported:

Pause
→ stop scheduling future steps
→ allow current operation to reach a safe stopping point
→ mark task PAUSED

Resume
→ validate current state
→ continue from the appropriate step

Do not blindly repeat already-completed operations.

FAILURE HANDLING:

Cover:

- Plan failure
- Tool failure
- Permission denial
- Verification failure
- Timeout
- Cancellation
- Runtime failure
- Workspace unavailable
- Dependency failure
- Persistence failure

A task must distinguish between:

- Step failure
- Recoverable failure
- Permanent failure
- Verification failure
- User cancellation

Do not silently hide failures.

RETRY:

Retries must be controlled.

A retry may be appropriate for transient failures.

Do not automatically retry potentially destructive operations without an
appropriate safety decision.

Examples of potentially retryable failures:

- Temporary runtime failure
- Temporary connection failure
- Resource availability issue

Examples requiring caution:

- File deletion
- File overwrite
- External side effects
- System configuration changes

Do not invent a universal retry count.

VERIFICATION:

AI-08 Reasoning & Verification owns semantic verification.

AI-07 coordinates verification checkpoints.

Flow:

Step executes
→ result
→ AI-08
→ verification result
→ AI-07
→ continue/fail/revise

A successful tool execution does not automatically mean the task objective
was achieved.

PLAN REVISION:

If verification fails or execution reveals new information:

AI-07
→ report state/result
→ AI-05 Planner
→ revised plan
→ AI-07

Do not blindly restart completed work.

Preserve verified completed steps.

CONVERSATION:

AI-02 Conversation may display task progress and results.

AI-07 owns task state.

Do not move conversation history into AI-07.

WORKSPACE:

Tasks may be associated with AT-01 Workspace.

A task must preserve its workspace context where required.

A task operating in one workspace must not silently switch to another
workspace.

PERSISTENCE:

Task state should persist locally where required.

SQLite may be used.

Persistence should support conceptually:

- Task creation
- Task state
- Step state
- Progress
- Result
- Failure state
- Cancellation
- Relevant timestamps
- Workspace association

Do not define the final database schema.

PERMISSIONS:

AI-07 does not grant permission.

Every executable step must pass through the appropriate authorization path.

Flow:

AI-07
→ AI-06
→ AT-16
→ approved execution

A task approved at creation time does not automatically authorize every
future operation unless the permission scope explicitly allows it.

IPC:

Renderer
→ IPC
→ AI-07

The UI may request:

- Start
- Pause
- Resume
- Cancel
- Inspect status

The renderer must not directly alter task state without runtime validation.

EVENTS:

Use AT-17 Event Runtime.

Conceptual events:

- Task created
- Task started
- Task paused
- Task resumed
- Step started
- Step completed
- Step failed
- Verification started
- Verification completed
- Task completed
- Task failed
- Task cancelled

Do not define final event schemas.

NOTIFICATIONS:

AT-12 owns notification delivery.

AI-07 may request notifications for meaningful task state changes.

Examples:

- Task completed
- Task failed
- Approval required
- Task blocked
- Important verification failure

Do not implement notification delivery inside AI-07.

SECURITY:

Protect against:

- Unauthorized task modification
- Task injection
- Malicious plan execution
- Cross-workspace task access
- Permission bypass
- Destructive retry loops
- Model-generated task manipulation

Task state must be validated by the runtime.

Do not trust task-state changes originating solely from the renderer.

PRIVACY:

Tasks may contain sensitive goals, paths, commands, and results.

Store only required information.

Do not expose task information to unrelated conversations or workspaces.

PERFORMANCE:

Task execution must be asynchronous.

Do not block the Electron main process.

Long-running tasks should provide state updates without excessive event
traffic.

Avoid repeatedly persisting identical state changes.

TESTING:

Include tests for:

- Task creation
- Task lifecycle
- Step lifecycle
- Dependency handling
- Progress tracking
- Cancellation
- Pause/resume
- Tool failure
- Permission denial
- Verification failure
- Retry behavior
- Plan revision
- Workspace isolation
- Persistence
- Notification integration
- IPC boundary
- Event integration
- Security boundaries

VERIFICATION:

Before marking a task complete:

- All required steps are complete
- Required verification has passed
- No unresolved failure remains
- Final task state is persisted where required
- Result is accurately reported

Do not mark a task complete merely because all tool calls returned without
errors.

ACCEPTANCE CRITERIA:

AI-07 is complete when:

- Structured plans can become executable tasks.
- Task and step state are tracked accurately.
- Dependencies are respected.
- Execution is delegated to AI-06.
- Verification is delegated to AI-08.
- Cancellation works safely.
- Failures are represented accurately.
- Task recovery/revision is supported where appropriate.
- Workspace boundaries are preserved.
- Permission checks cannot be bypassed.
- Task state persists locally where required.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Task Engine module.

Do not create a separate Task Queue module.

Do not create a separate Task State Manager module.

Task management belongs entirely to AI-07.

Do not move planning into AI-07.

AI-05 owns planning.

Do not move tool execution into AI-07.

AI-06 owns tool orchestration.

Do not move verification into AI-07.

AI-08 owns verification.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact database schemas, retry algorithms, APIs, package
versions, or implementation details.

This document defines the module contract only.