Write the complete module specification for `03_MODULES/AT-11_AUTOMATION.md`.

MODULE:
AT-11 — Automation

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

AT-11 provides local automation and scheduling capabilities for ATLAS.

It allows users to define recurring or scheduled actions and allows ATLAS
to execute approved automation workflows at the appropriate time.

Automation must remain subject to the ATLAS permission and security model.

AT-11 owns automation definitions, schedules, lifecycle, triggering, and
execution coordination.

AT-11 does NOT own the capabilities that an automation executes.

For example:

AT-11 Automation
→ scheduled trigger
→ relevant AT capability
→ result
→ AT-12 Notification where appropriate

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Automation Model
9. Automation Creation
10. Scheduling
11. Triggering
12. Execution
13. Recurring Automation
14. One-Time Automation
15. Automation Lifecycle
16. Cancellation
17. Failure and Recovery
18. Permission Boundary
19. AI Integration
20. Workspace Relationship
21. Notification Boundary
22. Event Runtime Boundary
23. Persistence
24. IPC Boundary
25. Events
26. Error Handling
27. Security
28. Privacy
29. Performance
30. Testing Requirements
31. Verification Requirements
32. Acceptance Criteria
33. Failure Conditions
34. Git Requirements
35. Implementation Notes
36. Definition of Done

RESPONSIBILITIES:

AT-11 owns:

- Automation definitions
- Automation schedules
- Automation lifecycle
- Trigger detection
- Automation execution coordination
- Recurrence handling
- One-time execution
- Automation cancellation
- Automation status
- Automation failure state
- Automation persistence
- Automation-related events

AT-11 does NOT own:

- Terminal execution
- Filesystem operations
- Process management
- Application control
- Notifications delivery
- AI reasoning
- Planning
- Tool orchestration
- Permissions policy
- Memory
- Search
- System monitoring
- LLM execution
- OpenCode
- MCP development infrastructure

AUTOMATION MODEL:

Define a conceptual automation as:

Automation
→ identity
→ trigger/schedule
→ action definition
→ enabled/disabled state
→ execution state
→ permission context
→ result/history where required

Do not define the final database schema.

AUTOMATION CREATION:

User
→ UX interaction
→ AI assistance where appropriate
→ AT-11 Automation
→ validate definition
→ persist
→ schedule

AI may help create an automation, but the resulting automation must still be
explicitly represented and subject to the normal security/permission model.

SCHEDULING:

Support conceptually:

- One-time schedules
- Recurring schedules
- Scheduled date/time
- Recurrence
- Enable/disable
- Cancellation

Do not assume a specific scheduling library or implementation.

TRIGGERING:

When the trigger occurs:

Automation
→ validate current state
→ determine required capability
→ permission evaluation where required
→ execute relevant capability
→ verify result where practical
→ update automation state
→ notify user where appropriate

Do not execute an automation merely because its schedule fired if its
authorization requirements are not satisfied.

EXECUTION:

AT-11 coordinates execution.

The actual operation belongs to the appropriate AT module.

Examples:

Automation
→ AT-02 Filesystem

Automation
→ AT-04 Terminal

Automation
→ AT-05 Application Control

Automation
→ AT-11
→ AT-12 Notification

AT-11 must not duplicate these capabilities.

RECURRING AUTOMATION:

Recurring automation must have a clear execution lifecycle.

Define handling for:

- Successful run
- Failed run
- Missed run
- Disabled automation
- Cancelled automation
- Application shutdown
- System sleep/restart
- Schedule changes

Do not silently run missed destructive actions after a long period unless
the automation policy explicitly permits it.

ONE-TIME AUTOMATION:

After successful execution, a one-time automation should transition into an
appropriate completed state.

Do not repeatedly execute it unless explicitly configured as recurring.

PERMISSIONS:

Automation does not create unlimited permission.

Use:

Scheduled trigger
→ identify requested capability
→ AT-16 Permissions
→ allow/deny/approval requirement
→ relevant AT operation

The permission model must account for the fact that automation can execute
without an immediate user interaction.

Do not create a second permission system inside AT-11.

AI INTEGRATION:

AI-05 Planner may help construct automation plans.

AI-06 Tool Orchestrator may be involved when automation requires an AI-driven
operation.

AI-07 Task Manager may coordinate complex automation tasks.

AI-08 Reasoning & Verification may evaluate execution results.

AT-11 remains responsible for scheduling and automation lifecycle.

WORKSPACE:

An automation may be associated with a workspace when appropriate.

Workspace information comes from AT-01.

Workspace association does not automatically grant unrestricted access.

NOTIFICATIONS:

AT-12 owns notification delivery.

AT-11 may request a notification after:

- Successful automation
- Failed automation
- Permission issue
- Missed execution
- Important state change

AT-11 does not implement notification delivery.

EVENT RUNTIME:

AT-17 provides event coordination.

AT-11 may emit/consume automation-related events through the approved event
system.

Do not implement a second event bus inside AT-11.

PERSISTENCE:

Automation definitions must persist locally where required.

SQLite is the primary local persistence layer.

Define conceptual persistence requirements:

- Create
- Update
- Delete
- Enable/disable
- Schedule changes
- Execution state
- Relevant execution history

Do not invent the final schema.

IPC:

Renderer
→ IPC
→ runtime
→ AT-11

The renderer must not directly control the scheduler.

Validate all renderer-originated automation requests.

AUTOMATION LIFECYCLE:

Define conceptual states:

- CREATED
- ENABLED
- DISABLED
- SCHEDULED
- RUNNING
- WAITING
- COMPLETED
- FAILED
- CANCELLED

These are conceptual states only.

ERROR HANDLING:

Cover:

- Invalid schedule
- Invalid automation definition
- Permission denied
- Target capability unavailable
- Execution failure
- Scheduler failure
- Application restart
- Missed schedule
- Corrupt persisted automation
- Cancellation
- Timeout

Never report an automation as successful when its underlying operation
failed.

VERIFICATION:

Where practical:

Trigger
→ execute
→ verify result
→ update automation state
→ notify

Do not use the mere fact that an action was invoked as proof of success.

SECURITY:

Protect against:

- Malicious automation definitions
- Unauthorized recurring commands
- Destructive scheduled operations
- Privilege escalation
- Untrusted AI-generated automation
- Cross-workspace access
- Automation persistence abuse

Automations must not silently gain broader permissions than the user
intended.

PRIVACY:

Automation definitions may contain sensitive information.

Store only what is required.

Do not expose automation details to unrelated AI contexts.

PERFORMANCE:

The scheduler must not create unnecessary high-frequency polling.

Use an appropriate scheduling mechanism.

Do not block the Electron main process with automation execution.

Long-running automation work must be handled without freezing the UI.

TESTING:

Include tests for:

- Create automation
- Update automation
- Delete automation
- Enable/disable
- One-time execution
- Recurring execution
- Schedule validation
- Missed schedule behavior
- Application restart
- Permission denial
- Execution failure
- Cancellation
- Notification integration
- Workspace association
- Persistence
- IPC boundary
- Security boundaries

ACCEPTANCE CRITERIA:

AT-11 is complete when:

- Users can create and manage automations.
- One-time and recurring schedules work reliably.
- Automation execution respects AT-16.
- Automation delegates actual operations to the appropriate AT capabilities.
- Failures are accurately represented.
- Important executions can be verified.
- Automation state persists correctly where required.
- Notifications can be triggered through AT-12.
- The scheduler does not block the application.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Scheduler module.

Do not create a separate Automation Engine module.

Automation belongs entirely to AT-11.

Do not move notification delivery into AT-11.

AT-12 owns notifications.

Do not move permission policy into AT-11.

AT-16 remains the permission authority.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact scheduling libraries, database schemas, APIs, package
versions, or implementation details.

This document defines the module contract only.