Write the complete specification for `06_AI/MODEL_STRATEGY.md`.

This document defines the ATLAS AI model strategy.

IMPORTANT:

- Follow the existing locked ATLAS architecture.
- Do not create new modules.
- Do not create new architecture layers.
- Do not modify the locked 30-core-module architecture.
- Do not introduce OpenCode or MCP into the ATLAS runtime.
- ATLAS uses its internal/local LLM architecture.
- Preserve the responsibilities defined in `03_MODULES`.
- This is an AI strategy document, not a module specification.
- Do not invent model names, versions, hardware requirements, APIs, or
  provider-specific implementation details unless already established by
  the project documentation.

The document MUST contain:

1. Purpose
2. Model Strategy Principles
3. Model Selection Philosophy
4. Local-First Model Strategy
5. Model Categories
6. General Conversation Model
7. Reasoning Model
8. Planning Model
9. Tool-Calling Model
10. Verification Model
11. Vision Model
12. Embedding Model
13. Model Capability Detection
14. Model Compatibility
15. Model Configuration
16. Model Availability
17. Model Discovery
18. Model Switching
19. Model Fallback
20. Model Failure Handling
21. Model Context Capacity
22. Model Performance
23. CPU/GPU Considerations
24. RAM/VRAM Considerations
25. Model Loading
26. Model Lifecycle
27. Concurrent Model Usage
28. Model Routing
29. Task-Based Model Selection
30. Context-Based Model Selection
31. Model and AI-01
32. Model and AI-02
33. Model and AI-03
34. Model and AI-04
35. Model and AI-05
36. Model and AI-06
37. Model and AI-07
38. Model and AI-08
39. Model and AI-09
40. Model and AT Modules
41. Model Security
42. Model Trust Boundary
43. Privacy
44. Local Storage
45. Model Metadata
46. Model Updates
47. Model Testing
48. Model Verification
49. Failure Conditions
50. Acceptance Criteria
51. Git Requirements
52. Definition of Done

CORE PRINCIPLE:

ATLAS should select models based on the requirements of the current
operation rather than assuming one model is optimal for every task.

However, model specialization must not introduce unnecessary complexity.

The strategy should support:

- One primary local model
- Optional specialized models
- Capability-aware selection
- Safe fallback
- User-controlled configuration
- Local-first execution

Do not require multiple models if one configured model can perform the
required operation adequately.

MODEL STRATEGY:

The conceptual architecture is:

                    AI Request
                       │
                       ▼
                 Model Strategy
                       │
              ┌────────┼────────┐
              ▼        ▼        ▼
           General  Reasoning  Vision
             Model    Model     Model
              │        │        │
              └────────┼────────┘
                       ▼
                  AI-01 Runtime
                       │
                       ▼
               Local LLM Runtime

AI-01 remains responsible for communicating with the selected runtime.

The model strategy determines which model should be used.

MODEL SELECTION:

Model selection should consider:

- Task type
- Required capabilities
- Context requirements
- Tool-calling capability
- Vision capability
- Reasoning requirements
- Available system resources
- User configuration
- Model availability
- Performance requirements

Do not select a model merely because it has the largest parameter count.

MODEL CATEGORIES:

Define conceptual categories rather than hard-coding specific models:

1. General conversation
2. Reasoning
3. Planning
4. Tool calling
5. Verification
6. Vision
7. Embeddings/retrieval

A single model may satisfy multiple categories.

Do not require separate models for every category.

GENERAL CONVERSATION:

The general model handles ordinary interaction such as:

- Questions
- Explanations
- Writing
- Basic assistance
- Normal conversational requests

The selected model must be capable of handling the required context.

REASONING:

A reasoning-capable model may be selected for operations requiring more
complex analysis.

Examples:

- Complex problem solving
- Ambiguous decisions
- Multi-step analysis
- Difficult verification

Do not expose private chain-of-thought to the user.

PLANNING:

AI-05 owns planning.

A suitable model may assist AI-05 with:

- Goal decomposition
- Step generation
- Dependency analysis
- Plan revision

The model does not own the task lifecycle.

TOOL CALLING:

AI-06 owns tool orchestration.

A model used for tool calling must support the structured tool interaction
required by ATLAS.

Never execute raw model output as a tool command.

Tool requests must pass through:

AI-01
→ AI-06
→ permission/runtime checks
→ AT capability

VERIFICATION:

AI-08 owns verification.

A suitable reasoning-capable model may assist verification, but verification
must remain evidence-based.

Model output alone must not prove that an operation succeeded.

VISION:

AT-15 owns vision.

A vision-capable model may be used where required.

Do not require a vision model for ordinary text operations.

EMBEDDINGS:

If semantic retrieval requires embeddings, the embedding model should remain
separate from the conversational generation model conceptually.

AT-10 owns Search & Retrieval infrastructure.

Do not create an Embedding module.

MODEL CAPABILITY DETECTION:

ATLAS should determine, where supported:

- Context capacity
- Tool-calling support
- Vision support
- Streaming support
- Embedding capability
- Other required capabilities

Do not assume every model supports every capability.

MODEL COMPATIBILITY:

Before selecting a model for an operation, verify that it supports the
required capability.

Example:

Vision task
→ requires vision-capable model

Tool task
→ requires appropriate tool-calling support

Embedding task
→ requires embedding capability

If the configured model cannot perform the operation, return a meaningful
failure or use an explicitly configured fallback.

Do not silently substitute an unrelated model.

MODEL CONFIGURATION:

AI-09 owns model configuration.

Configuration may include:

- Default model
- Specialized models
- Model parameters
- Runtime settings
- Fallback preferences

Do not duplicate configuration ownership inside AI-05, AI-06, or AI-08.

MODEL AVAILABILITY:

Distinguish:

- Configured
- Installed
- Available
- Loaded
- Busy
- Failed

Do not report a model as usable merely because it is configured.

MODEL DISCOVERY:

The local runtime may expose available models.

ATLAS may use that information to help configuration and model selection.

Do not automatically download models without explicit architecture and user
authorization.

MODEL SWITCHING:

Model switching should be controlled.

When switching models during an operation:

- Preserve task context
- Preserve required context
- Verify compatibility
- Avoid unnecessary context loss
- Report relevant state to the user where appropriate

Do not switch models silently when it could materially affect the operation.

FALLBACK:

Fallback should be explicit and predictable.

Possible fallback hierarchy:

Preferred model
→ compatible configured fallback
→ safe failure

Do not fall back to a model that lacks the capability required for the task.

Do not silently route sensitive tasks to an unexpected provider.

MODEL FAILURE:

Handle:

- Model unavailable
- Model loading failure
- Runtime failure
- Unsupported capability
- Context overflow
- Resource exhaustion
- Timeout
- Generation failure
- Malformed output

A model failure must not be presented as a successful operation.

CONTEXT CAPACITY:

Model selection must account for context requirements.

AI-03 owns context construction and compression.

AI-01 owns runtime communication.

The model strategy determines whether a selected model is suitable for the
required context.

PERFORMANCE:

Model selection should consider:

- Response latency
- Throughput
- RAM usage
- VRAM usage
- CPU usage
- GPU usage
- Context length
- Concurrent workload

Do not assume maximum model size equals maximum usefulness.

HARDWARE:

ATLAS must not assume a specific:

- GPU
- CPU
- RAM capacity
- VRAM capacity
- Operating system configuration

Model strategy should adapt to available local resources.

MODEL LOADING:

Avoid repeatedly loading and unloading models unnecessarily.

Where practical, reuse loaded models.

Resource pressure must still be respected.

MODEL LIFECYCLE:

Conceptual lifecycle:

Configured
→ Available
→ Selected
→ Loaded
→ Active
→ Idle
→ Unloaded

Exact lifecycle implementation is determined later by AI-01 and the selected
local runtime.

CONCURRENT MODELS:

Multiple models may consume substantial system resources.

ATLAS should avoid uncontrolled concurrent model loading or inference.

Model scheduling must remain compatible with:

- Active conversations
- Tasks
- Tool loops
- Verification
- Vision operations

MODEL ROUTING:

Model routing should remain centralized enough to avoid different AI modules
independently selecting conflicting models.

AI-01 provides the runtime boundary.

AI-09 provides configuration.

The model strategy determines appropriate selection behavior.

TASK-BASED SELECTION:

Examples:

Simple conversation
→ general model

Complex reasoning
→ reasoning-capable model

Tool-heavy task
→ tool-capable model

Image analysis
→ vision-capable model

Semantic retrieval
→ embedding model

These are conceptual examples, not mandatory fixed routing rules.

CONTEXT-BASED SELECTION:

Model selection may consider:

- Context size
- Number of files
- Tool results
- Conversation length
- Task complexity

Do not select a larger model solely because more context exists if context
compression can safely solve the problem.

AI-01:

AI-01 owns communication with the local LLM runtime.

Model Strategy determines what should be used.

AI-02:

AI-02 owns conversation state.

Model selection may use conversation requirements.

AI-03:

AI-03 owns context construction.

Model selection may use context requirements.

AI-04:

AI-04 owns memory intelligence.

Memory-related operations may use appropriate model capabilities.

AI-05:

AI-05 owns planning.

Model Strategy may provide a suitable model for planning.

AI-06:

AI-06 owns tool orchestration.

Model selection may consider tool-calling capability.

AI-07:

AI-07 owns task lifecycle.

Model selection may vary according to task requirements.

AI-08:

AI-08 owns reasoning and verification.

Model Strategy may select a reasoning-capable model where required.

AI-09:

AI-09 owns AI configuration.

Model Strategy consumes validated configuration from AI-09.

AT MODULES:

AT modules provide capabilities and evidence.

They do not select AI models.

Model selection remains inside the AI layer.

SECURITY:

Protect against:

- Unauthorized model changes
- Malicious runtime endpoints
- Model configuration injection
- Tool-call manipulation
- Prompt injection
- Sensitive data exposure

Do not allow model output to bypass:

- AI-06
- AT-16
- AI-08

TRUST BOUNDARY:

A model is an AI component, not an authority.

Model output is untrusted until processed by the appropriate ATLAS component.

Examples:

Model says:
"Permission granted."

This does not grant permission.

Model says:
"File was successfully modified."

This does not prove the file was modified.

Model says:
"Task is complete."

This does not complete the task.

The actual system state and verification evidence remain authoritative.

PRIVACY:

Model selection must respect local-first behavior.

Do not automatically route data to external models.

If external models are ever supported:

- They must be explicitly configured.
- Data boundaries must be clear.
- User authorization must be respected.
- Sensitive data must be handled appropriately.

LOCAL STORAGE:

Model configuration should remain locally stored through the existing
configuration architecture.

Do not store model credentials in source code.

MODEL METADATA:

Useful metadata may include:

- Model identifier
- Provider/runtime
- Capabilities
- Context capacity
- Availability
- Performance information where available

Do not assume all metadata is available from every runtime.

MODEL UPDATES:

Do not automatically replace a user's selected model.

If a newer model is detected:

- Preserve current configuration.
- Allow controlled migration/update.
- Verify compatibility before changing.

MODEL TESTING:

Include tests for:

- Model discovery
- Capability detection
- Model selection
- Unsupported capability
- Model unavailable
- Fallback
- Context capacity
- Tool capability
- Vision capability
- Concurrent model requests
- Resource limitations
- Configuration changes
- Model switching
- Runtime failure

VERIFICATION:

Before a selected model is used:

1. Verify configuration.
2. Verify runtime availability.
3. Verify model availability.
4. Verify required capabilities.
5. Verify context compatibility.
6. Start inference through AI-01.

Do not skip capability validation.

FAILURE CONDITIONS:

The system must clearly distinguish:

- No runtime
- No model
- Invalid model
- Unsupported capability
- Resource exhaustion
- Context overflow
- Runtime failure
- Model failure
- Configuration failure

Do not collapse all failures into a generic AI error.

ACCEPTANCE CRITERIA:

The model strategy is complete when:

- ATLAS has a clear model selection strategy.
- A single general local model can remain the baseline configuration.
- Specialized models can be supported without requiring them.
- Model capabilities are considered before use.
- AI-01 remains the LLM runtime authority.
- AI-09 remains the configuration authority.
- AI modules do not independently create conflicting model-selection systems.
- Tool calls remain controlled by AI-06.
- Verification remains controlled by AI-08.
- Permissions remain controlled by AT-16.
- Local-first behavior is preserved.
- Model failures are handled safely.
- Relevant tests can be derived from this document.
- Git changes follow the locked ATLAS Git workflow.

IMPORTANT:

Do not create:

- Model Manager module
- Model Router module
- Model Registry module
- Model Download module
- Model Selection module

These are strategy/implementation responsibilities within the existing AI
architecture.

Do not create a new AI module.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact models, model versions, APIs, package versions, hardware
requirements, or provider implementations.

This document defines the ATLAS model strategy only.