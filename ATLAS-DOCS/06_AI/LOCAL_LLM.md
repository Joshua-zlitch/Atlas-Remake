Write the complete specification for `06_AI/LOCAL_LLM.md`.

This document defines the local LLM architecture and operational strategy for
ATLAS.

IMPORTANT:

- Follow the existing locked ATLAS architecture.
- Do not create new modules.
- Do not create new architecture layers.
- Do not modify the locked 30-core-module architecture.
- Do not introduce OpenCode or MCP into the ATLAS runtime.
- OpenCode is an external development/code-engineering tool only.
- ATLAS uses its own internal/local LLM runtime.
- Preserve the responsibilities defined in `03_MODULES`.
- This is an AI strategy document, not a module specification.

The document MUST contain:

1. Purpose
2. Local-First Principles
3. LLM Runtime Architecture
4. Local LLM Runtime Role
5. Model Provider Strategy
6. Model Selection Strategy
7. Ollama Integration Strategy
8. Runtime Discovery
9. Runtime Availability
10. Model Availability
11. Model Loading
12. Model Lifecycle
13. Model Configuration
14. Request Lifecycle
15. Response Lifecycle
16. Streaming
17. Context Integration
18. Conversation Integration
19. Tool Calling
20. Planning Integration
21. Task Integration
22. Verification Integration
23. Memory Integration
24. Configuration Integration
25. Error Handling
26. Timeout Handling
27. Cancellation
28. Runtime Recovery
29. Offline Behavior
30. Resource Management
31. CPU/GPU Considerations
32. Memory Management
33. Context Window Management
34. Concurrent Requests
35. Security
36. Privacy
37. Credential Handling
38. Model Trust Boundaries
39. IPC Boundary
40. Electron Integration
41. Database Boundary
42. Logging
43. Observability
44. Performance
45. Testing Strategy
46. Verification Strategy
47. Failure Conditions
48. Acceptance Criteria
49. Git Requirements
50. Definition of Done

LOCAL-FIRST PRINCIPLE:

ATLAS is designed to process AI interactions locally wherever practical.

Conceptual architecture:

ATLAS
    ↓
AI-01 LLM Runtime
    ↓
Local LLM Runtime
    ↓
Selected Local Model

The local model performs inference on the user's machine.

Do not make a cloud LLM provider a required dependency for ATLAS.

OLLAMA:

The existing ATLAS architecture identifies Ollama as the local LLM runtime
used for the initial implementation.

Treat Ollama as the current local runtime integration.

However:

- Keep the AI architecture abstract enough to support another compatible
  local runtime later.
- Do not hard-code Ollama throughout unrelated modules.
- AI-01 should provide the runtime boundary.
- AI-09 should provide configuration.
- Other AI modules should communicate through the established AI interfaces.

Do not create an additional "Ollama module".

RUNTIME ROLE:

The local LLM runtime is responsible for:

- Model loading/inference
- Generation
- Streaming
- Model availability
- Runtime communication

ATLAS remains responsible for:

- Context construction
- Conversation state
- Planning
- Tool orchestration
- Task management
- Verification
- Permissions
- Memory

Do not move ATLAS business logic into the LLM runtime.

MODEL SELECTION:

Model selection is controlled through AI-09 AI Configuration.

Conceptual flow:

User configuration
→ AI-09
→ selected runtime/model
→ AI-01
→ local LLM runtime

Do not allow arbitrary model selection from untrusted renderer input without
validation.

RUNTIME DISCOVERY:

ATLAS should be able to determine whether the configured local runtime is
available.

Conceptual states:

- AVAILABLE
- UNAVAILABLE
- STARTING
- ERROR
- UNKNOWN

Do not claim the runtime is available without an actual runtime check.

MODEL AVAILABILITY:

ATLAS should distinguish:

Runtime available
from
Model available.

Example:

Ollama running
does not necessarily mean
the configured model is installed.

MODEL LIFECYCLE:

Define the conceptual lifecycle:

Configuration
→ runtime discovery
→ model availability
→ request
→ inference
→ response
→ cleanup/reuse

Do not assume every request requires model reloading.

REQUEST LIFECYCLE:

Conceptual flow:

User request
→ AI-02 Conversation
→ AI-03 Context Engine
→ AI-01 LLM Runtime
→ local runtime
→ selected model
→ response
→ AI-02

For tool-enabled requests:

User request
→ AI-02
→ AI-03
→ AI-01
→ model
→ structured tool request
→ AI-06
→ AT capability
→ result
→ AI-01
→ final response

AI-01 must not directly execute AT modules.

STREAMING:

Support streaming responses where the selected runtime supports it.

Streaming must:

- Remain asynchronous
- Update the UI through the established runtime/IPC path
- Support cancellation
- Handle partial output safely
- Handle runtime interruption

Do not treat partial streamed output as a completed response.

CONTEXT:

AI-03 Context Engine owns context construction.

AI-01 receives the prepared context.

AI-01 must not independently retrieve the entire filesystem, memory,
conversation, or workspace.

The context strategy is defined in:

`06_AI/CONTEXT_STRATEGY.md`

CONVERSATION:

AI-02 owns conversation state.

AI-01 provides inference.

Do not persist conversation history inside the LLM runtime.

TOOL CALLING:

AI-01 may produce structured tool requests supported by the selected model.

Execution must follow:

AI-01
→ AI-06 Tool Orchestrator
→ AT capability
→ result
→ AI-01

The model must never bypass AI-06.

PLANNING:

AI-05 owns planning.

The LLM may provide reasoning/inference required by the Planner, but the
planning lifecycle remains owned by AI-05.

TASKS:

AI-07 owns task management.

AI-01 must not maintain task lifecycle state.

VERIFICATION:

AI-08 owns reasoning and verification.

AI-01 may provide model inference for verification where required.

AI-01 does not decide whether a task is verified.

MEMORY:

AI-04 owns memory intelligence.

AT-08 owns memory storage.

AI-01 may be used to process memory-related inference, but must not become
the memory store.

CONFIGURATION:

AI-09 owns AI configuration.

AI-01 consumes validated configuration.

Configuration may include:

- Runtime endpoint
- Selected model
- Generation parameters
- Streaming settings
- Runtime-specific options

Do not invent fixed values unless they already exist in the project.

ERROR HANDLING:

Handle:

- Runtime unavailable
- Model unavailable
- Invalid model
- Connection failure
- Request failure
- Generation failure
- Malformed response
- Context overflow
- Timeout
- Cancellation
- Runtime crash
- Resource exhaustion

Errors must be represented accurately.

Do not convert runtime failure into a fabricated AI response.

TIMEOUTS:

Long-running model requests must have appropriate timeout/cancellation
behavior.

Do not assume one universal timeout works for every model.

CANCELLATION:

The user must be able to cancel active generation where technically
supported.

Cancellation must propagate through:

UI
→ IPC
→ AI runtime
→ local LLM runtime

Do not leave orphaned generation requests running unnecessarily.

OFFLINE BEHAVIOR:

ATLAS should continue to function locally without internet access where the
required local runtime and model are available.

If the local LLM runtime is unavailable:

- Clearly report the unavailable state.
- Do not fabricate a response.
- Preserve relevant user/task state where possible.
- Allow recovery after the runtime becomes available.

RESOURCE MANAGEMENT:

Local inference can consume significant:

- RAM
- VRAM
- CPU
- GPU
- Disk space

ATLAS should avoid unnecessary simultaneous model requests.

Do not assume a specific GPU or hardware configuration.

CPU/GPU:

The runtime should use whatever hardware acceleration the configured local
LLM runtime supports.

ATLAS should not hard-code a specific GPU vendor.

MEMORY:

Avoid loading unnecessarily large data into the renderer.

Large model responses and tool results should be handled through appropriate
runtime boundaries.

CONTEXT WINDOW:

Respect the selected model's context capacity.

AI-03 is responsible for context selection/compression.

AI-01 should detect and report context-capacity failures accurately.

CONCURRENT REQUESTS:

Concurrency must be controlled.

Consider:

- Model resource usage
- Multiple conversations
- Active tasks
- Tool loops
- Verification requests

Do not allow uncontrolled concurrent inference to exhaust system resources.

SECURITY:

Protect against:

- Malicious model endpoints
- Untrusted runtime configuration
- Prompt injection
- Tool-call injection
- Unauthorized model changes
- Sensitive context exposure
- Arbitrary runtime access

The local runtime must not receive secrets or unrelated sensitive context
unless explicitly required.

PRIVACY:

ATLAS should keep:

- Conversation context
- Memory
- Workspace data
- Tool results
- Task information

local wherever practical.

Do not introduce mandatory telemetry.

Do not transmit model prompts or user data to external services as part of
the local LLM architecture.

CREDENTIALS:

If a runtime requires credentials:

- Do not hard-code them.
- Do not store them in source control.
- Do not expose them to the renderer.
- Do not include them in prompts.
- Use appropriate secure local configuration.

MODEL TRUST:

A local model is still an untrusted AI component.

Never treat model output as:

- Permission
- Authorization
- Verified fact
- Executable code
- Trusted tool arguments

Model output must pass through the appropriate ATLAS boundaries.

IPC:

The renderer communicates with AI through the established IPC architecture.

Conceptual flow:

React
→ IPC
→ AI runtime
→ AI-01
→ local LLM runtime

The renderer must not directly connect to the local LLM runtime unless the
locked IPC architecture explicitly requires it.

ELECTRON:

The LLM runtime should execute outside the React renderer.

The Electron main/runtime layer should manage privileged communication.

Do not block the Electron main process during model inference.

DATABASE:

AI-01 does not own persistent conversation, memory, task, or context storage.

Those responsibilities remain with their owning modules.

LOGGING:

Logs may record safe operational information such as:

- Runtime availability
- Request lifecycle
- Model identifier where safe
- Duration
- Error category
- Cancellation

Do not log:

- Full prompts containing sensitive data
- API keys
- Passwords
- Private files
- Full private model output unnecessarily

OBSERVABILITY:

The UI may display safe runtime information such as:

- LLM status
- Model name
- Generation state
- Runtime availability
- Error state

Do not expose internal implementation details unnecessarily.

PERFORMANCE:

Optimize for:

- Low latency
- Streaming responsiveness
- Controlled memory usage
- Efficient context transfer
- Minimal IPC overhead
- Appropriate concurrency

Do not optimize by weakening security or context isolation.

TESTING:

Include tests for:

- Runtime discovery
- Runtime unavailable
- Model discovery
- Model unavailable
- Successful inference
- Streaming
- Cancellation
- Timeout
- Context overflow
- Malformed runtime response
- Runtime crash
- Concurrent requests
- Configuration changes
- IPC communication
- Tool-call routing
- Sensitive-data protection
- Offline behavior

VERIFICATION:

Before reporting successful inference:

- Runtime must be reachable.
- Model must be available.
- Request must be accepted.
- Response must be received or streaming must complete.
- Errors must be handled accurately.

For tool calls:

- Validate the structured request.
- Route through AI-06.
- Never execute model output directly.

ACCEPTANCE CRITERIA:

The local LLM strategy is complete when:

- ATLAS can communicate with the configured local LLM runtime.
- Ollama is supported as the initial local runtime.
- Model selection is controlled by AI-09.
- AI-01 owns LLM runtime interaction.
- AI-03 owns context construction.
- AI-02 owns conversation state.
- AI-06 owns tool orchestration.
- AI-07 owns task management.
- AI-08 owns verification.
- Local-first behavior is preserved.
- Internet access is not required for normal local inference.
- Runtime/model failures are accurately reported.
- Streaming and cancellation are supported where available.
- Sensitive data is protected.
- Relevant tests can be derived from this document.
- Git changes follow the locked ATLAS Git workflow.

IMPORTANT:

Do not create a new LLM module.

AI-01 already owns the LLM Runtime.

Do not create a separate Ollama module.

Do not move model configuration into AI-01.

AI-09 owns AI configuration.

Do not move context construction into AI-01.

AI-03 owns context construction.

Do not move conversation persistence into AI-01.

AI-02 owns conversation.

Do not move tool execution into AI-01.

AI-06 owns tool orchestration.

Do not move task lifecycle into AI-01.

AI-07 owns task management.

Do not move verification into AI-01.

AI-08 owns reasoning and verification.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact model names, package versions, APIs, hardware
requirements, or implementation details.

This document defines the local LLM strategy only.