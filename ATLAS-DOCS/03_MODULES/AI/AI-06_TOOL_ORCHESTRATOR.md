Write the complete module specification for `03_MODULES/AI-06_TOOL_ORCHESTRATOR.md`.

MODULE:
AI-06 — Tool Orchestrator

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

AI-06 is the central execution orchestration layer between ATLAS AI
reasoning/planning and the actual AT capabilities.

It receives structured tool/capability requests from the AI layer, validates
them, resolves the appropriate AT capability, checks the permission boundary,
executes the approved operation through the correct module, captures the
result, and returns structured execution evidence.

AI-06 is the bridge between:

AI reasoning
→ tool request
→ permission
→ AT capability
→ result
→ AI reasoning

AI-06 does NOT itself become a filesystem, terminal, process, application
control, or system-management module.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Tool Model
9. Tool Registration
10. Tool Discovery
11. Tool Request Validation
12. Tool Resolution
13. Permission Boundary
14. Tool Execution
15. Execution Results
16. Verification Boundary
17. Failure Handling
18. Cancellation
19. Sequential Execution
20. Parallel Execution
21. Tool Lifecycle
22. Context Integration
23. Planner Integration
24. Task Integration
25. LLM Integration
26. Workspace Boundary
27. IPC Boundary
28. Event Runtime Integration
29. Security
30. Privacy
31. Performance
32. Testing Requirements
33. Verification Requirements
34. Acceptance Criteria
35. Failure Conditions
36. Git Requirements
37. Implementation Notes
38. Definition of Done

RESPONSIBILITIES:

AI-06 owns:

- Tool request validation
- Tool/capability resolution
- Tool execution coordination
- Permission coordination
- Execution lifecycle
- Execution result normalization
- Tool failure handling
- Tool cancellation
- Tool execution events
- Tool-to-AT routing
- Execution evidence collection

AI-06 does NOT own:

- LLM inference
- Conversation management
- Context construction
- Planning
- Task lifecycle
- Actual filesystem operations
- Actual terminal execution
- Actual process management
- Actual application control
- Permission policy
- Memory
- Search
- Notifications
- Workspace ownership
- Guardian evaluation
- OpenCode
- MCP development infrastructure

TOOL MODEL:

A conceptual tool request should contain:

- Tool/capability identity
- Operation
- Arguments
- Target
- Workspace/task context where applicable
- Risk information where applicable
- Correlation identifier
- Expected result where applicable

Do not define the final API schema.

TOOL REGISTRATION:

ATLAS capabilities should expose approved operations through controlled
interfaces.

Examples:

AI-06
→ AT-02 Filesystem

AI-06
→ AT-04 Terminal

AI-06
→ AT-05 Application Control

AI-06
→ AT-06 System Information

AI-06
→ AT-10 Search & Retrieval

AI-06
→ AT-11 Automation

AI-06
→ AT-13 Files & Attachments

AI-06
→ AT-14 Voice

AI-06
→ AT-15 Vision

AI-06 must not duplicate the underlying capability implementation.

TOOL DISCOVERY:

The AI layer may require knowledge of which capabilities are available.

AI-06 may expose a controlled description of available tools/capabilities.

Tool descriptions should include only information required for correct
execution.

Do not expose internal implementation details unnecessarily.

REQUEST VALIDATION:

Before execution:

Tool request
→ validate tool
→ validate operation
→ validate arguments
→ validate target
→ validate context
→ permission evaluation
→ execute

Reject malformed or unknown requests.

Never execute arbitrary method names supplied by model output.

TOOL RESOLUTION:

Resolve a request to a known ATLAS capability.

Example:

"read_file"
→ AT-02 Filesystem

"run_command"
→ AT-04 Terminal

"get_system_info"
→ AT-06 System Information

"schedule_automation"
→ AT-11 Automation

The exact final tool names are implementation-defined.

PERMISSIONS:

AT-16 is the central authorization authority.

Required flow:

AI-generated request
→ AI-06 validation
→ AT-16 permission check
→ approved AT capability
→ execution

AI-06 must never treat model output as authorization.

AI-06 must not create a second permission system.

If permission is denied:

- Do not execute
- Return structured denial
- Preserve the reason/state where appropriate

If approval is required:

- Request approval through the approved permission/UX flow
- Continue only after authorization

TOOL EXECUTION:

AI-06 coordinates execution.

The actual operation belongs to the relevant AT module.

Example:

AI-06
→ AT-04 Terminal
→ command execution
→ result
→ AI-06
→ AI-08 / AI-02

Do not implement terminal execution inside AI-06.

EXECUTION RESULTS:

Normalize results into a structured representation containing, conceptually:

- Success/failure state
- Tool identity
- Operation
- Output
- Error information
- Execution metadata
- Verification information where available
- Correlation information

Do not invent the final response schema.

Never report success merely because the AT module accepted the request.

VERIFICATION:

AI-08 Reasoning & Verification owns semantic verification.

AI-06 should capture sufficient evidence for AI-08 to evaluate the result.

Example:

AI-06
→ AT-02 write file
→ filesystem result
→ AI-06
→ evidence
→ AI-08

AI-06 does not decide whether the result fully satisfies the user's goal.

FAILURE HANDLING:

Cover:

- Unknown tool
- Unknown operation
- Invalid arguments
- Permission denied
- Permission timeout
- Target unavailable
- Capability unavailable
- Execution failure
- Timeout
- Cancellation
- Runtime failure
- Malformed tool result

Do not convert failures into successful results.

CANCELLATION:

Long-running tool operations should support cancellation where the underlying
AT capability supports it.

Cancellation must propagate through the appropriate layers.

Do not blindly terminate processes from AI-06 unless the target AT capability
explicitly owns that operation.

SEQUENTIAL EXECUTION:

Support dependent execution:

Tool A
→ result
→ Tool B
→ result

AI-07 Task Manager may coordinate task-level sequencing.

AI-06 remains responsible for individual tool execution orchestration.

PARALLEL EXECUTION:

Independent operations may be executed concurrently where safe.

Before parallel execution, consider:

- Shared resources
- File conflicts
- Process conflicts
- Permission scope
- Workspace boundaries
- Dependency requirements

Do not parallelize operations merely for speed if it creates unsafe state.

TOOL LIFECYCLE:

Define conceptual states:

- REQUESTED
- VALIDATING
- WAITING_PERMISSION
- APPROVED
- RUNNING
- COMPLETED
- FAILED
- CANCELLED

These are conceptual states only.

CONTEXT:

AI-03 Context Engine provides relevant context.

AI-06 must receive enough context to execute safely.

Do not independently retrieve the entire workspace or conversation.

PLANNER:

AI-05 Planner proposes what needs to happen.

AI-06 executes approved tool operations required by the plan.

Planner output is untrusted until validated.

TASK MANAGER:

AI-07 owns overall task lifecycle.

AI-06 reports execution results to AI-07.

Do not move task state management into AI-06.

LLM:

AI-01 LLM Runtime executes model inference.

AI-01 may return structured tool requests.

AI-06 is responsible for executing those requests.

Do not allow AI-01 to bypass AI-06 and directly invoke AT modules.

WORKSPACE:

Tool execution must respect the current AT-01 Workspace context where
applicable.

A workspace-bound operation must not silently operate outside its scope.

PERMISSIONS:

AT-16 remains authoritative.

AT-07 Guardian may identify risky conditions.

AI-06 must respect both safety/risk information and authorization rules.

IPC:

Renderer
→ IPC
→ runtime
→ AI-06

The renderer must not directly execute privileged AT operations.

User actions from the UI should be translated into validated runtime
requests.

EVENTS:

Use AT-17 Event Runtime.

Conceptual events:

- Tool requested
- Tool validation started
- Permission required
- Permission granted
- Tool execution started
- Tool execution completed
- Tool execution failed
- Tool execution cancelled

Do not define final event schemas.

SECURITY:

AI-06 is a major security boundary.

Protect against:

- Arbitrary command execution
- Tool spoofing
- Argument injection
- Path traversal
- Permission bypass
- Model-generated privilege escalation
- Cross-workspace execution
- Malicious tool output
- Tool-chain abuse

Never dynamically execute arbitrary code based solely on model-generated
tool names or arguments.

Only registered capabilities may be executed.

Treat tool results as untrusted data.

PRIVACY:

Tool operations may access sensitive user information.

Only pass the minimum required context and arguments.

Do not expose sensitive tool output to unrelated AI contexts.

Avoid unnecessary persistence of raw tool output.

PERFORMANCE:

Tool orchestration must remain asynchronous.

Do not block the Electron main process.

Avoid unnecessary serialization/copying of large tool outputs.

Long-running operations should provide appropriate state updates.

TESTING:

Include tests for:

- Tool registration
- Tool discovery
- Valid request
- Invalid request
- Unknown tool
- Invalid arguments
- Permission allow
- Permission deny
- Permission approval
- Execution success
- Execution failure
- Timeout
- Cancellation
- Sequential execution
- Safe parallel execution
- Workspace isolation
- Cross-task isolation
- Malicious tool arguments
- Tool output handling
- IPC boundary
- Event integration

VERIFICATION:

Before execution:

- Tool exists
- Operation exists
- Arguments are valid
- Target is valid
- Permission is valid
- Workspace scope is valid

After execution:

- Capture actual result
- Capture errors
- Preserve execution evidence
- Return structured state

Do not claim execution succeeded without evidence.

ACCEPTANCE CRITERIA:

AI-06 is complete when:

- AI-generated tool requests can be safely validated.
- Only registered capabilities can execute.
- AT-16 controls authorization.
- Correct AT modules perform actual operations.
- Execution results are structured.
- Failures and cancellations are represented accurately.
- Tool execution evidence can reach AI-08.
- Workspace and task boundaries are respected.
- The renderer cannot bypass the execution boundary.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Tool Manager module.

Do not create a separate Tool Execution module.

Do not create a separate Capability Router module.

Tool orchestration belongs entirely to AI-06.

Do not move actual tool implementations into AI-06.

AT modules own their respective capabilities.

Do not move permission policy into AI-06.

AT-16 remains the permission authority.

Do not move semantic verification into AI-06.

AI-08 owns verification.

Do not introduce OpenCode or MCP into the ATLAS runtime.

OpenCode is the external Code Engineer integration and must remain outside
the internal ATLAS AI tool architecture.

Do not invent exact tool schemas, APIs, package versions, or implementation
details.

This document defines the module contract only.