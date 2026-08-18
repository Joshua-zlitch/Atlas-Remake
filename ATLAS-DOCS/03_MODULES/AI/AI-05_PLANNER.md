Write the complete module specification for `03_MODULES/AI-05_PLANNER.md`.

MODULE:
AI-05 — Planner

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

AI-05 is responsible for transforming a user goal or high-level objective
into a structured, actionable plan.

The Planner determines:

- What needs to be accomplished
- What steps may be required
- Dependencies between steps
- What information is missing
- Which ATLAS capabilities may be required
- Which steps require verification

AI-05 plans.

AI-06 Tool Orchestrator executes tools.

AI-07 Task Manager manages execution state.

AI-08 Reasoning & Verification evaluates results.

AI-01 LLM Runtime performs model inference.

AI-05 must never directly execute system operations.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Planning Model
9. Goal Interpretation
10. Plan Generation
11. Step Definition
12. Dependencies
13. Ordering
14. Tool/Capability Selection
15. Risk Awareness
16. Permission Boundary
17. Context Integration
18. Task Integration
19. Tool Orchestration Boundary
20. Verification Boundary
21. Plan Revision
22. Failure Handling
23. Cancellation
24. Persistence Boundary
25. IPC Boundary
26. Events
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

AI-05 owns:

- Goal decomposition
- Plan generation
- Plan structure
- Step definition
- Step dependencies
- Step ordering
- Capability identification
- Plan revision
- Planning-related metadata
- Planning events

AI-05 does NOT own:

- LLM inference
- Conversation lifecycle
- Context construction
- Memory storage
- Memory intelligence
- Tool execution
- Task execution state
- Filesystem operations
- Terminal execution
- Process management
- Application control
- Permission decisions
- Notifications
- Workspace management
- OpenCode
- MCP development infrastructure

PLANNING MODEL:

Conceptual flow:

User goal
→ AI-02 Conversation
→ AI-03 Context Engine
→ AI-05 Planner
→ structured plan
→ AI-07 Task Manager
→ AI-06 Tool Orchestrator
→ relevant AT capability
→ AI-08 Verification
→ plan continuation/revision

AI-05 produces the plan.

It does not perform the operations in the plan.

GOAL INTERPRETATION:

AI-05 should identify:

- Desired outcome
- Constraints
- Available context
- Required capabilities
- Dependencies
- Potential risks
- Missing information

If the goal is already simple and atomic, AI-05 should not create unnecessary
planning overhead.

PLAN GENERATION:

Plans should be:

- Structured
- Ordered
- Explicit
- Verifiable
- Adaptable
- Appropriate to the complexity of the goal

Do not require every user request to become a large multi-step plan.

STEP MODEL:

A conceptual plan step may contain:

- Step identity
- Description
- Required capability
- Inputs
- Dependencies
- Expected outcome
- Verification requirement
- Risk classification
- State

Do not define the final database or API schema.

DEPENDENCIES:

Steps may depend on previous steps.

Example:

Step 1:
Inspect project

Step 2:
Modify configuration
depends on Step 1

Step 3:
Run tests
depends on Step 2

Step 4:
Verify result
depends on Step 3

The Planner should identify dependencies explicitly when they matter.

ORDERING:

The plan should establish a safe and logical execution order.

Independent operations may be represented as independent steps where
parallelism is supported later.

Do not assume all steps should execute sequentially.

CAPABILITY SELECTION:

AI-05 identifies which ATLAS capability is required.

Examples:

Need to inspect files
→ AT-02 Filesystem

Need to run a command
→ AT-04 Terminal

Need to control an application
→ AT-05 Application Control

Need to schedule something
→ AT-11 Automation

Need visual input
→ AT-15 Vision

Need user approval
→ AT-16 Permissions

AI-05 only proposes the capability.

AI-06 decides how execution is orchestrated.

PERMISSIONS:

AI-05 must never grant permission.

If a plan contains sensitive or destructive actions:

AI-05
→ identify risk
→ AI-06
→ AT-16 Permissions
→ authorization
→ execution

A plan is not authorization.

The fact that the user asked for a high-level goal does not automatically
authorize every possible action required to accomplish it.

RISK AWARENESS:

Plans should identify potentially risky steps.

Examples:

- Deleting files
- Overwriting files
- Running destructive commands
- Changing system settings
- Accessing sensitive information
- Controlling applications
- Creating recurring automation

AI-05 should make risk visible to the execution layer.

It must not bypass Guardian or Permissions.

CONTEXT:

AI-03 Context Engine owns context construction.

AI-05 consumes the context required to create an appropriate plan.

Do not independently load the entire workspace, memory, or conversation.

TASK INTEGRATION:

AI-07 Task Manager owns task lifecycle.

Conceptual flow:

AI-05
→ plan
→ AI-07
→ task execution

AI-05 may revise a plan based on task results.

Do not move execution-state management into AI-05.

TOOL ORCHESTRATION:

AI-06 owns execution.

Conceptual flow:

AI-05
→ step/capability requirement
→ AI-06
→ AT module
→ result
→ AI-05

AI-05 should not call AT modules directly.

VERIFICATION:

AI-08 Reasoning & Verification evaluates whether a step/result is correct.

AI-05 may define what should be verified.

Example:

Plan step:
"Modify configuration"

Expected outcome:
"Configuration contains required setting"

Verification requirement:
"Inspect configuration and confirm setting exists"

AI-05 defines the expected outcome.

AI-08 performs verification.

PLAN REVISION:

Plans must be adaptable.

If execution produces:

- Failure
- New information
- Changed state
- Unexpected output
- Missing dependency

AI-05 may revise remaining steps.

Do not blindly restart the entire plan.

Preserve completed verified work.

FAILURE HANDLING:

Cover:

- Ambiguous goal
- Missing information
- Impossible plan
- Capability unavailable
- Permission denied
- Step failure
- Verification failure
- Conflicting state
- Runtime failure
- Cancellation

A failed step must not be represented as successful.

CANCELLATION:

Users should be able to cancel a plan.

Cancellation should stop future execution through AI-07/AI-06 where supported.

Do not directly terminate processes from AI-05.

PERSISTENCE:

Plan persistence belongs primarily to AI-07 Task Manager when a plan becomes
an executable task.

AI-05 may maintain temporary planning state.

Do not create a separate Plan Database.

IPC:

React
→ IPC
→ AI runtime
→ AI-05

The renderer must not directly execute plan steps.

Only structured plans should cross the UI boundary where appropriate.

EVENTS:

Use AT-17 Event Runtime.

Conceptual events:

- Planning started
- Plan generated
- Plan revised
- Planning blocked
- Planning failed
- Plan cancelled

Do not define final event schemas.

SECURITY:

Protect against:

- Prompt injection
- Malicious instructions in files
- Unsafe plans
- Model-generated destructive actions
- Capability escalation
- Permission bypass

Planning output is untrusted until execution and permission layers validate
it.

Do not allow a model-generated plan to directly execute arbitrary commands.

PRIVACY:

Plans may contain sensitive user/project information.

Keep planning data local by default.

Do not expose unrelated memory, files, or conversations merely because the
planner is active.

PERFORMANCE:

Simple requests should not incur unnecessary planning overhead.

Complex plans may require additional model reasoning.

Planning should remain asynchronous and must not block the UI.

TESTING:

Include tests for:

- Simple atomic request
- Multi-step request
- Dependency generation
- Step ordering
- Capability identification
- Risk identification
- Permission-required step
- Missing information
- Failed step
- Verification failure
- Plan revision
- Cancellation
- Context integration
- Task integration
- Tool orchestration boundary
- Security against prompt injection

VERIFICATION:

A generated plan should be structurally validated before execution.

Validate:

- Required goal exists
- Steps are valid
- Dependencies are valid
- No circular dependencies
- Required capabilities are identifiable
- Risk metadata is valid where required

Do not execute malformed plans.

ACCEPTANCE CRITERIA:

AI-05 is complete when:

- High-level goals can be transformed into structured plans.
- Simple requests are not unnecessarily over-planned.
- Complex requests have clear steps and dependencies.
- Required capabilities are identified.
- Risky actions are identified.
- Plans do not directly execute system operations.
- AI-06 owns execution.
- AI-07 owns task lifecycle.
- AI-08 owns verification.
- AT-16 owns permissions.
- Failed execution can result in plan revision.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Planning Engine module.

Do not create a separate Plan Manager module.

Planning belongs entirely to AI-05.

Do not move task execution into AI-05.

AI-07 owns task lifecycle.

Do not move tool execution into AI-05.

AI-06 owns tool orchestration.

Do not move verification into AI-05.

AI-08 owns verification.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact planning algorithms, schemas, APIs, package versions, or
implementation details.

This document defines the module contract only.