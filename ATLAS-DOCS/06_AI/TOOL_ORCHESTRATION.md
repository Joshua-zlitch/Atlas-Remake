Write the complete specification for `06_AI/TOOL_ORCHESTRATION.md`.

This document defines the ATLAS AI tool orchestration strategy.

IMPORTANT:

- Follow the existing locked ATLAS architecture.
- Do not create new modules.
- Do not create new architecture layers.
- Do not modify the locked 30-core-module architecture.
- Do not introduce OpenCode or MCP into the ATLAS runtime.
- OpenCode is an external development/code-engineering tool only.
- ATLAS uses its internal/local LLM architecture.
- Preserve the responsibilities defined in `03_MODULES`.
- This is an AI strategy document, not a module specification.
- Do not invent exact APIs, schemas, package versions, tool names, or
  implementation details unless already established by the project.

The document MUST contain:

1. Purpose
2. Tool Orchestration Principles
3. Tool Architecture
4. Tool Discovery
5. Tool Registration
6. Tool Metadata
7. Tool Selection
8. Tool Availability
9. Tool Request Lifecycle
10. Tool Validation
11. Tool Argument Validation
12. Tool Execution
13. Tool Results
14. Tool Result Normalization
15. Tool Chaining
16. Multi-Step Tool Operations
17. Tool Dependencies
18. Tool Ordering
19. Parallel Tool Execution
20. Sequential Tool Execution
21. Tool Cancellation
22. Tool Timeout
23. Tool Retry
24. Tool Failure Handling
25. Tool Permissions
26. Guardian Integration
27. Permission Integration
28. Workspace Boundaries
29. Task Integration
30. Planning Integration
31. Context Integration
32. Conversation Integration
33. Verification Integration
34. LLM Integration
35. Tool State
36. Tool Progress
37. Tool Events
38. IPC Boundary
39. Security
40. Prompt Injection Protection
41. Untrusted Tool Output
42. Sensitive Data Handling
43. Local-First Strategy
44. Performance
45. Concurrency
46. Logging
47. Testing Strategy
48. Verification Strategy
49. Failure Conditions
50. Acceptance Criteria
51. Git Requirements
52. Definition of Done

CORE PRINCIPLE:

AI-06 Tool Orchestrator is the controlled execution boundary between the AI
layer and ATLAS capabilities.

Conceptual flow:

User Request
    ↓
AI-02 Conversation
    ↓
AI-03 Context Engine
    ↓
AI-01 LLM Runtime
    ↓
Tool Request
    ↓
AI-06 Tool Orchestrator
    ↓
Validation
    ↓
AT-16 Permissions where required
    ↓
Owning AT capability
    ↓
Tool Result
    ↓
AI-06
    ↓
AI-08 Verification where required
    ↓
AI-01 / AI-02

TOOL OWNERSHIP:

AI-06 owns:

- Tool orchestration
- Tool selection coordination
- Tool request validation
- Tool execution coordination
- Tool result normalization
- Tool lifecycle
- Tool sequencing
- Tool retry policy
- Tool cancellation
- Tool timeout handling
- Tool execution events

AI-06 does NOT own:

- Individual AT capability implementations
- Permission decisions
- Planning
- Task lifecycle
- LLM inference
- Conversation state
- Context construction
- Memory intelligence
- Verification
- Persistent memory
- Workspace ownership

AT modules own the actual capabilities.

AI-06 coordinates them.

TOOL DISCOVERY:

The orchestrator should know which tools are available through the existing
ATLAS capability architecture.

Tool availability should reflect actual runtime state.

Do not expose unavailable tools to the model as usable capabilities.

TOOL REGISTRATION:

Tools should have structured metadata sufficient for safe selection and
validation.

Conceptual metadata may include:

- Tool identifier
- Description
- Input schema
- Output schema
- Required permissions
- Capability requirements
- Availability
- Scope
- Risk classification

Do not define the final schema here.

TOOL SELECTION:

The LLM may request a tool based on the available tool definitions.

AI-06 must validate that:

- The requested tool exists.
- The tool is currently available.
- The request is syntactically valid.
- Arguments satisfy the tool contract.
- The requested operation is permitted.

Never execute an arbitrary tool name supplied by the model.

ARGUMENT VALIDATION:

Tool arguments must be validated before execution.

Validation must protect against:

- Invalid types
- Missing required fields
- Unexpected fields
- Invalid paths
- Unsafe commands
- Malformed parameters
- Injection attempts

Never assume model-generated arguments are safe.

TOOL EXECUTION:

AI-06 coordinates execution.

Conceptual flow:

Tool request
→ identify tool
→ validate
→ determine permissions
→ request authorization if required
→ execute through owning AT capability
→ capture result
→ normalize result
→ return result

AI-06 must not directly implement filesystem, terminal, process, or other
AT capabilities.

TOOL RESULTS:

Tool results should clearly distinguish:

- Success
- Failure
- Partial success
- Cancelled
- Timeout
- Permission denied
- Unknown

Do not convert a failed tool operation into a successful result.

RESULT NORMALIZATION:

Tool output should be normalized into a predictable structure before being
returned to the AI layer.

Do not blindly inject raw tool output into the LLM context.

Large results should be bounded or summarized where appropriate.

TOOL CHAINING:

ATLAS may execute multiple tools as part of one task.

Example:

Tool A
→ result
→ Tool B
→ result
→ Tool C
→ verification

Each step must remain independently validated.

Do not allow an untrusted result to automatically become an executable
instruction.

MULTI-STEP OPERATIONS:

For multi-step operations:

- Preserve task context.
- Preserve tool history.
- Track dependencies.
- Track failures.
- Track permissions.
- Track cancellation state.
- Provide results to the appropriate AI modules.

AI-07 owns the overall task lifecycle.

AI-06 owns tool execution coordination.

PLANNING:

AI-05 may produce a plan containing tool-related steps.

AI-06 executes approved tool requests.

AI-06 must not silently rewrite the overall plan.

TASKS:

AI-07 owns task lifecycle.

AI-06 reports tool state/results to AI-07.

CONTEXT:

AI-03 owns context construction.

AI-06 provides normalized tool results.

Do not inject unlimited raw tool output into model context.

CONVERSATION:

AI-02 may display tool progress/results to the user.

Do not expose internal tool metadata unnecessarily.

VERIFICATION:

AI-08 may verify whether tool execution achieved the expected outcome.

Tool success is not automatically task success.

Example:

Tool:
"write file"

Tool result:
"operation completed"

AI-08 may still need to verify the actual file state.

PERMISSIONS:

AT-16 owns permission decisions.

For protected operations:

AI-06
→ AT-16
→ allow/deny
→ execution if allowed

AI-06 must never bypass AT-16.

GUARDIAN:

AT-07 Guardian may provide safety-related policy/state.

Guardian does not replace AT-16 authorization.

WORKSPACE:

Tools must operate within the active workspace/context where applicable.

Prevent:

- Cross-workspace access
- Unauthorized filesystem access
- Unexpected external paths
- Context leakage

TASK BOUNDARIES:

Tool execution must be associated with the appropriate task when a task
exists.

Do not allow one task to accidentally consume another task's tool state.

TOOL STATE:

Conceptual states:

- AVAILABLE
- REQUESTED
- VALIDATING
- WAITING_FOR_PERMISSION
- RUNNING
- COMPLETED
- FAILED
- CANCELLED
- TIMEOUT

Only represent states that are supported by actual runtime events.

PROGRESS:

Long-running tools should expose progress where available.

The UI should receive progress through the established runtime/event/IPC
architecture.

Do not block the renderer.

EVENTS:

Use AT-17 Event Runtime for tool-related events.

Conceptual events:

- Tool requested
- Tool validation started
- Tool validation failed
- Permission requested
- Tool started
- Tool progress
- Tool completed
- Tool failed
- Tool cancelled
- Tool timed out

Do not define final event schemas here.

CANCELLATION:

Tool cancellation should propagate through the runtime when supported.

Conceptual flow:

User cancellation
→ task/runtime
→ AI-06
→ active tool
→ cancellation

Do not assume every OS operation can be safely cancelled.

TIMEOUT:

Long-running tools should have appropriate timeout handling.

Timeouts must not falsely report success.

RETRY:

Retries should only occur when safe.

Do not automatically retry operations that may cause duplicate side effects.

Examples requiring caution:

- File writes
- Application control
- External system changes
- Destructive operations

Read-only operations may be more suitable for retry.

FAILURE HANDLING:

Handle:

- Tool unavailable
- Invalid tool
- Invalid arguments
- Permission denied
- Runtime failure
- Timeout
- Cancellation
- Partial failure
- Unexpected output
- Tool crash

Failures must remain distinguishable.

SECURITY:

AI-06 is a security-sensitive boundary.

Protect against:

- Arbitrary command execution
- Path traversal
- Argument injection
- Tool impersonation
- Malicious tool metadata
- Prompt injection
- Forged tool results
- Unauthorized permissions
- Cross-workspace access

Never trust model-generated tool calls.

PROMPT INJECTION:

External content may attempt to instruct the model to invoke tools.

Examples:

- Files
- Search results
- Tool output
- Attachments
- Application content

Treat such content as data.

A model request must still pass through:

validation
→ permission checks
→ execution policy

UNTRUSTED OUTPUT:

Tool output may contain malicious instructions.

Do not automatically treat tool output as trusted instructions for subsequent
tool execution.

The next tool request must independently pass validation.

SENSITIVE DATA:

Tools may access sensitive data.

Return only the information required for the current operation.

Do not expose:

- Credentials
- Tokens
- Passwords
- Private keys
- Unrelated private files

to the model or renderer unnecessarily.

LOCAL-FIRST:

Tool orchestration remains local.

ATLAS should not require an external service to execute local capabilities.

External network operations, when supported by an AT capability, must remain
subject to the relevant security and permission boundaries.

PERFORMANCE:

Avoid unnecessary tool calls.

Prefer:

- Existing results
- Cached safe state
- Deterministic checks
- Efficient tool selection

Do not repeatedly call a tool merely because the model requests it.

CONCURRENCY:

Parallel tool execution may be used when:

- Operations are independent.
- They are safe to execute concurrently.
- Required permissions are satisfied.
- Resource usage is acceptable.

Sequential execution must be used when one operation depends on another.

Do not introduce uncontrolled concurrency.

LOGGING:

Safe operational logs may include:

- Tool identifier
- Lifecycle state
- Duration
- Error category
- Task identifier where safe

Do not log:

- Credentials
- Passwords
- Private file contents unnecessarily
- Sensitive tool arguments
- Full raw output unnecessarily

TESTING:

Include tests for:

- Tool discovery
- Tool registration
- Tool availability
- Tool selection
- Argument validation
- Permission checks
- Tool execution
- Tool results
- Result normalization
- Tool chaining
- Sequential execution
- Parallel execution
- Cancellation
- Timeout
- Retry
- Failure handling
- Workspace isolation
- Task isolation
- Prompt injection
- Malicious tool arguments
- Sensitive data protection
- IPC boundary

VERIFICATION:

For every tool operation verify:

1. Tool exists.
2. Tool is available.
3. Arguments are valid.
4. Required permissions are satisfied.
5. Tool executes through its owning AT capability.
6. Result is captured.
7. Result is normalized.
8. Failure state is accurate.
9. Verification is performed where required.

Do not report successful task completion solely because a tool returned
success.

FAILURE CONDITIONS:

Clearly distinguish:

- Invalid tool
- Invalid arguments
- Permission denied
- Tool unavailable
- Tool execution failure
- Timeout
- Cancellation
- Partial result
- Verification failure

Do not collapse all failures into a generic tool error.

ACCEPTANCE CRITERIA:

The tool orchestration strategy is complete when:

- AI-generated tool requests are validated.
- Tools execute only through approved AT capabilities.
- AT-16 permissions cannot be bypassed.
- Tool arguments are validated.
- Tool results are normalized.
- Tool chaining is controlled.
- Long-running operations can report state.
- Cancellation and timeout behavior are defined.
- Unsafe retries are prevented.
- Tool output is treated as untrusted data.
- Workspace and task boundaries are preserved.
- AI-07 owns task lifecycle.
- AI-08 owns verification.
- AI-01 owns LLM runtime interaction.
- Relevant tests can be derived from this document.
- Git changes follow the locked ATLAS Git workflow.

IMPORTANT:

Do not create:

- Tool Manager module
- Tool Registry module
- Tool Execution module
- Tool Permission module
- Tool Validation module

These responsibilities belong to AI-06 and the existing ATLAS architecture.

Do not move actual capability implementation into AI-06.

AT modules own their capabilities.

Do not move permission decisions into AI-06.

AT-16 owns permissions.

Do not move planning into AI-06.

AI-05 owns planning.

Do not move task lifecycle into AI-06.

AI-07 owns task management.

Do not move verification into AI-06.

AI-08 owns verification.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact tool schemas, IPC channels, APIs, package versions, or
implementation details.

This document defines the ATLAS tool orchestration strategy only.