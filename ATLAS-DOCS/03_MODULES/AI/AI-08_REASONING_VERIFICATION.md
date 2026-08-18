Write the complete module specification for `03_MODULES/AI-08_REASONING_VERIFICATION.md`.

MODULE:
AI-08 — Reasoning & Verification

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

AI-08 provides reasoning and verification capabilities for ATLAS.

It evaluates plans, tool results, task results, retrieved information, and
other evidence to determine whether an expected outcome was actually
achieved.

AI-08 is especially important for preventing ATLAS from assuming that an
operation succeeded merely because a command, tool, or model response
completed.

AI-08 may determine:

- Whether a result satisfies an expected outcome
- Whether further action is required
- Whether a plan should be revised
- Whether information conflicts
- Whether a result is incomplete
- Whether an operation should be considered failed

AI-08 does NOT execute tools.

AI-06 owns tool orchestration.

AI-07 owns task lifecycle.

AI-05 owns planning.

AI-01 owns LLM inference.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Reasoning Model
9. Evidence Model
10. Result Verification
11. Plan Verification
12. Tool Verification
13. Task Verification
14. Context Verification
15. Confidence
16. Uncertainty
17. Failure Classification
18. Recovery Recommendations
19. Plan Revision Boundary
20. Tool Boundary
21. Task Boundary
22. Conversation Integration
23. LLM Integration
24. Permission Boundary
25. IPC Boundary
26. Events
27. Error Handling
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

AI-08 owns:

- Result evaluation
- Evidence evaluation
- Expected-vs-actual comparison
- Verification decisions
- Reasoning about failures
- Uncertainty handling
- Verification confidence
- Recovery recommendations
- Verification-related events

AI-08 does NOT own:

- LLM runtime infrastructure
- Conversation state
- Context construction
- Memory
- Planning
- Tool execution
- Task lifecycle
- Filesystem operations
- Terminal execution
- Permissions
- Notifications
- Workspace management
- OpenCode
- MCP development infrastructure

REASONING MODEL:

Conceptual flow:

Expected outcome
+
Actual evidence
→ AI-08
→ compare
→ reason
→ verification result
→ AI-07 / AI-05 / AI-02

AI-08 must base conclusions on available evidence.

It must not claim success when evidence is missing or contradictory.

EVIDENCE MODEL:

Evidence may include:

- Tool output
- Filesystem state
- Command output
- Test results
- Process state
- Application state
- Search results
- Task state
- User-provided information
- Other approved runtime evidence

Evidence should retain source information where useful.

Do not treat all evidence as equally trustworthy.

RESULT VERIFICATION:

Example:

Expected:
"File contains configuration X"

Tool result:
"write completed"

AI-08:
→ inspect relevant evidence
→ verify actual file state
→ determine whether X exists
→ report verified/unverified/failed

Do not equate operation completion with goal completion.

PLAN VERIFICATION:

AI-05 may define expected outcomes for plan steps.

AI-08 evaluates whether those outcomes were met.

If verification fails:

AI-08
→ verification failure
→ AI-07
→ AI-05
→ plan revision if appropriate

TOOL VERIFICATION:

AI-06 provides execution evidence.

AI-08 evaluates whether the evidence proves the requested operation.

Examples:

Command exit code success
does not necessarily prove:
"Application behaves correctly."

File write success
does not necessarily prove:
"Correct content was written."

TASK VERIFICATION:

AI-07 asks AI-08 to determine whether the overall task objective has been
achieved.

AI-08 may evaluate multiple completed step results.

A task should only be considered verified when required outcomes are
supported by evidence.

CONTEXT VERIFICATION:

AI-03 may provide relevant context.

AI-08 should identify:

- Contradictory information
- Missing evidence
- Stale information
- Untrusted content
- Insufficient context

Do not silently resolve contradictions by guessing.

CONFIDENCE:

Verification results may include conceptual confidence:

- HIGH
- MEDIUM
- LOW
- UNKNOWN

These are conceptual only.

Confidence must reflect evidence quality.

Do not present low-confidence conclusions as facts.

UNCERTAINTY:

When evidence is insufficient, return:

- What is known
- What is uncertain
- What evidence is missing
- What action could resolve uncertainty

Do not fabricate missing evidence.

FAILURE CLASSIFICATION:

Differentiate:

- Tool failure
- Verification failure
- Expected outcome mismatch
- Missing evidence
- Invalid input
- Environmental failure
- Permission failure
- Unknown result

This helps AI-07 and AI-05 decide what to do next.

RECOVERY:

AI-08 may recommend:

- Retry
- Additional inspection
- Alternative step
- Plan revision
- User clarification
- Stop

AI-08 does not execute the recovery itself.

PLAN REVISION:

AI-05 owns plan revision.

AI-08 provides evidence and recommendations.

TOOL BOUNDARY:

AI-06 owns tool execution.

AI-08 must not directly call AT modules.

TASK BOUNDARY:

AI-07 owns task lifecycle.

AI-08 reports verification results to AI-07.

CONVERSATION:

AI-02 may present verification results to the user.

AI-08 should produce concise structured evidence that can be communicated
through the conversation layer.

LLM:

AI-01 provides model inference when reasoning requires an LLM.

AI-08 should not assume every verification requires an LLM.

Deterministic checks should be preferred when sufficient.

PERMISSIONS:

AI-08 does not grant permission.

It may identify that additional evidence requires a protected operation, but
execution must go through AI-06 and AT-16.

IPC:

The renderer must not directly instruct AI-08 to mark operations as
verified.

Verification must be performed by the runtime based on evidence.

EVENTS:

Use AT-17 Event Runtime.

Conceptual events:

- Verification started
- Evidence received
- Verification completed
- Verification failed
- Verification uncertain
- Recovery recommended

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Missing evidence
- Invalid evidence
- Contradictory evidence
- Verification runtime failure
- LLM reasoning failure
- Target unavailable
- Permission denied
- Timeout
- Incomplete result

Unknown must not become success.

SECURITY:

Protect against:

- Fake tool results
- Malicious command output
- Prompt injection
- Forged evidence
- Model-generated false verification
- Cross-task evidence leakage
- Cross-workspace evidence leakage

Evidence should be traceable to an actual runtime source where possible.

Do not allow model-generated text alone to prove that an external operation
succeeded.

PRIVACY:

Verification may involve sensitive files, command output, or system state.

Use the minimum evidence required.

Do not retain raw sensitive evidence unnecessarily.

PERFORMANCE:

Prefer deterministic verification when possible.

Avoid unnecessary LLM calls for simple checks.

Expensive reasoning should remain asynchronous.

Do not block the Electron main process.

TESTING:

Include tests for:

- Successful verification
- Failed verification
- Missing evidence
- Contradictory evidence
- Low confidence
- Tool result verification
- File-state verification
- Command-result verification
- Test-result verification
- Task verification
- Plan revision recommendation
- Fake evidence
- Prompt injection
- Cross-task isolation
- Cross-workspace isolation
- IPC boundary

VERIFICATION:

AI-08 itself must follow evidence-based verification.

For each verification:

- Identify expected outcome
- Identify actual evidence
- Compare
- Determine state
- Record reasoning/evidence summary
- Report confidence/uncertainty

Do not report verification success without sufficient evidence.

ACCEPTANCE CRITERIA:

AI-08 is complete when:

- Tool results can be evaluated against expected outcomes.
- Task completion can be independently verified.
- Missing or contradictory evidence is detected.
- Verification failures are clearly distinguished from tool failures.
- Low-confidence results are represented appropriately.
- Recovery recommendations can be produced.
- AI-07 can use verification results.
- AI-05 can use verification results for plan revision.
- AI-06 remains the execution authority.
- AT-16 remains the permission authority.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Verification Engine module.

Do not create a separate Result Checker module.

Do not create a separate Reasoning Engine module.

Reasoning and verification belong entirely to AI-08.

Do not move tool execution into AI-08.

AI-06 owns tool orchestration.

Do not move planning into AI-08.

AI-05 owns planning.

Do not move task lifecycle into AI-08.

AI-07 owns task management.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact reasoning algorithms, confidence formulas, schemas, APIs,
package versions, or implementation details.

This document defines the module contract only.