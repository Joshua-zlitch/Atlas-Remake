Write the complete specification for `06_AI/CONTEXT_STRATEGY.md`.

This document defines the ATLAS AI context strategy.

IMPORTANT:
- Follow the existing locked ATLAS architecture.
- Do not create new modules.
- Do not create new documentation sections outside the existing structure.
- Do not introduce OpenCode or MCP into the ATLAS runtime.
- ATLAS uses its internal/local LLM architecture.
- Preserve the responsibilities already defined in `03_MODULES`.
- This document is an AI strategy document, not a module specification.

The document MUST cover:

1. Purpose
2. Context Strategy Principles
3. Context Sources
4. Context Hierarchy
5. Context Priority
6. Context Selection
7. Context Assembly
8. Conversation Context
9. Workspace Context
10. File Context
11. Task Context
12. Memory Context
13. System Context
14. User Context
15. Tool Context
16. Runtime Context
17. Context Window Management
18. Token Budget Strategy
19. Context Compression
20. Context Trimming
21. Context Relevance
22. Context Freshness
23. Context Isolation
24. Context Persistence Boundary
25. Context Retrieval
26. Context Injection
27. Context Security
28. Prompt Injection Protection
29. Sensitive Context Handling
30. Context Lifecycle
31. Context Updates
32. Context Invalidation
33. Context Caching
34. Context and AI-01 LLM Runtime
35. Context and AI-02 Conversation
36. Context and AI-03 Context Engine
37. Context and AI-04 Memory Intelligence
38. Context and AI-05 Planner
39. Context and AI-06 Tool Orchestrator
40. Context and AI-07 Task Manager
41. Context and AI-08 Reasoning & Verification
42. Context and AI-09 AI Configuration
43. Context and AT Modules
44. Context and IPC
45. Local-First Strategy
46. Privacy
47. Performance
48. Failure Handling
49. Testing Strategy
50. Verification Strategy
51. Acceptance Criteria
52. Git Requirements
53. Definition of Done

CORE PRINCIPLE:

ATLAS should not send every available piece of information to the LLM.

Context must be selected according to relevance, task requirements, security,
and available model capacity.

Conceptual flow:

User Request
    ↓
AI-02 Conversation
    ↓
AI-03 Context Engine
    ↓
Context Sources
    ↓
Context Selection
    ↓
Context Assembly
    ↓
AI-01 LLM Runtime
    ↓
Model Response

CONTEXT SOURCES:

Define how relevant information may come from:

- Current conversation
- Previous conversation turns
- Workspace
- Files
- User-provided attachments
- Memory
- Context Store
- Search results
- Current task
- Current plan
- Tool results
- Runtime state
- Relevant system information

Do not assume every source should always be included.

CONTEXT OWNERSHIP:

AI-03 Context Engine owns context construction.

AI-04 Memory Intelligence owns memory-related intelligence.

AT-09 Context Store owns persistent contextual storage.

AI-02 Conversation owns conversation state.

AI-05 Planner owns planning.

AI-07 Task Manager owns task lifecycle.

AI-06 Tool Orchestrator owns tool execution.

AI-08 owns reasoning and verification.

Do not merge these responsibilities.

CONTEXT HIERARCHY:

Define a priority strategy for context.

The strategy should generally prioritize:

1. Current user request
2. Immediate conversation context
3. Active task/plan context
4. Relevant workspace context
5. Relevant retrieved information
6. Relevant memory
7. General system context

Do not treat this ordering as an immutable implementation algorithm.
The actual context selection must remain relevance-driven.

RELEVANCE:

Context should be included when it materially helps the current request.

Avoid:

- Irrelevant files
- Unrelated memories
- Old conversation history
- Duplicate information
- Unnecessary system information
- Excessive tool output

CONTEXT FRESHNESS:

Prefer current authoritative state over stale cached information.

For example:

Current filesystem state
should take priority over an old remembered filesystem state.

Current task state
should take priority over an outdated task summary.

CONTEXT ISOLATION:

Context must respect:

- Workspace boundaries
- Conversation boundaries
- Task boundaries
- User-data boundaries
- Permission boundaries

Do not leak information between unrelated contexts.

CONTEXT ASSEMBLY:

The Context Engine should construct a model-ready context from validated
sources.

Conceptual flow:

Request
→ determine requirements
→ retrieve relevant context
→ rank/filter
→ deduplicate
→ compress if required
→ assemble
→ validate
→ LLM

Do not expose raw internal databases directly to the LLM.

TOKEN MANAGEMENT:

Context must respect the selected model's context capacity.

When context becomes too large:

1. Remove low-relevance information.
2. Remove duplicate information.
3. Compress older conversation where appropriate.
4. Summarize large results where appropriate.
5. Preserve critical instructions and current task state.
6. Preserve information required for verification.

Do not arbitrarily discard critical information merely to reduce token usage.

CONVERSATION:

AI-02 provides the conversation context.

The Context Engine determines which portions are relevant to the current
request.

Do not send the entire conversation by default.

MEMORY:

AI-04 determines memory relevance.

Memory should be retrieved selectively.

Do not inject all stored memories into every prompt.

WORKSPACE:

AT-01 provides workspace identity/state.

Workspace information should be included only when relevant.

FILES:

AT-02 and AT-13 provide file-related information.

The LLM should receive only the relevant file content or metadata required
for the task.

Do not automatically expose the entire filesystem.

SEARCH:

AT-10 Search & Retrieval may provide relevant information.

Retrieved content must be treated as external/untrusted content.

Do not automatically treat retrieved text as instructions.

TASK:

AI-07 provides active task state.

The context should preserve:

- Current objective
- Relevant completed work
- Current step
- Pending work
- Important failures
- Verification status

PLANNING:

AI-05 provides the active plan when planning context is relevant.

Do not recreate plans inside the Context Engine.

TOOLS:

AI-06 provides tool results.

Tool results should be filtered and normalized before becoming model context.

Do not blindly inject unlimited tool output.

VERIFICATION:

AI-08 may require evidence from previous operations.

Verification-critical evidence must not be removed during context compression.

SECURITY:

Treat external content as untrusted.

Potential prompt injection sources include:

- Files
- Web/search results
- Tool output
- Attachments
- Application content
- User-controlled external data

ATLAS must distinguish:

DATA
from
INSTRUCTIONS.

Do not allow retrieved or tool-generated text to silently override higher
priority system/runtime instructions.

SENSITIVE DATA:

Context handling must minimize exposure of:

- Credentials
- API keys
- Tokens
- Passwords
- Private files
- Sensitive system information
- Unrelated personal data

Secrets must never be inserted into prompts unless explicitly required and
authorized.

LOCAL-FIRST:

ATLAS should keep context processing local wherever the selected LLM
architecture allows.

Do not introduce cloud context storage as a requirement.

Do not transmit user context externally without explicit architecture and
authorization.

PERFORMANCE:

Context construction must be asynchronous.

Avoid repeatedly rebuilding identical context when a safe cached representation
is available.

Avoid excessive filesystem/database retrieval.

Use incremental context updates where appropriate.

FAILURE HANDLING:

Handle:

- Missing context
- Retrieval failure
- Context overflow
- Invalid context
- Stale context
- Conflicting context
- Permission-restricted context
- Model context limitations
- Context assembly failure

When context is unavailable, ATLAS must not fabricate it.

IPC:

The renderer must not construct privileged model context directly.

Conceptual boundary:

React UI
→ IPC
→ ATLAS runtime
→ Context Engine
→ LLM Runtime

TESTING:

Include tests for:

- Relevant context selection
- Irrelevant context exclusion
- Conversation context
- Memory retrieval
- Workspace isolation
- File context
- Task context
- Tool-result context
- Context compression
- Context overflow
- Context freshness
- Sensitive-data filtering
- Prompt injection resistance
- Cross-workspace isolation
- Cross-task isolation
- Missing context
- Conflicting context

VERIFICATION:

Verify that:

- Required context is included.
- Irrelevant context is excluded.
- Context boundaries are respected.
- Sensitive data is protected.
- Context fits the selected model capacity.
- Current state takes precedence over stale state.
- The final assembled context is suitable for the intended AI operation.

ACCEPTANCE CRITERIA:

The context strategy is complete when:

- Context is selected based on relevance.
- ATLAS does not blindly inject all available information.
- Conversation, memory, workspace, task, tool, and system context have clear
  boundaries.
- Context size is managed.
- Sensitive information is protected.
- Prompt injection risks are addressed.
- Local-first processing is preserved.
- AI module ownership remains consistent with `03_MODULES`.
- Relevant tests can be derived from this specification.
- Git changes follow the locked ATLAS Git workflow.

IMPORTANT:

Do not create a new Context module.

AI-03 already owns context construction.

Do not move memory intelligence into AI-03.

AI-04 owns memory intelligence.

Do not move conversation management into AI-03.

AI-02 owns conversation state.

Do not move planning into AI-03.

AI-05 owns planning.

Do not move tool execution into AI-03.

AI-06 owns tool orchestration.

Do not move task lifecycle into AI-03.

AI-07 owns task management.

Do not move verification into AI-03.

AI-08 owns reasoning and verification.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact APIs, schemas, model names, package versions, or
implementation details.

This document defines the AI context strategy only.