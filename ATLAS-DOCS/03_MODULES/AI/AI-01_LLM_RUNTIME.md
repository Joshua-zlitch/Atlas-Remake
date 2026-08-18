Write the complete module specification for `03_MODULES/AI-01_LLM_RUNTIME.md`.

MODULE:
AI-01 — LLM Runtime

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

AI-01 provides the local LLM execution/runtime layer for ATLAS.

ATLAS is local-first. The LLM runtime must support locally configured
language models and the configured model providers defined by AI-09.

AI-01 is responsible for communicating with the selected LLM runtime,
sending structured requests, receiving model responses, handling streaming
where supported, and reporting model/runtime state.

AI-01 does NOT own:

- Conversation behavior
- Context construction
- Memory intelligence
- Planning
- Tool orchestration
- Task management
- Reasoning policy
- AI configuration

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. LLM Runtime Model
9. Provider/Model Selection Boundary
10. Request Lifecycle
11. Response Lifecycle
12. Streaming
13. Cancellation
14. Runtime Health
15. Error Handling
16. Context Boundary
17. Tool Boundary
18. Local-First Architecture
19. AI Configuration Integration
20. Conversation Integration
21. Event Runtime Integration
22. Permission Boundary
23. IPC Boundary
24. Security
25. Privacy
26. Performance
27. Testing Requirements
28. Verification Requirements
29. Acceptance Criteria
30. Failure Conditions
31. Git Requirements
32. Implementation Notes
33. Definition of Done

RESPONSIBILITIES:

AI-01 owns:

- LLM runtime communication
- Model request execution
- Model response handling
- Streaming response handling where supported
- Runtime connection state
- Model availability checks
- Request cancellation where supported
- Runtime errors
- Response metadata
- LLM-related events

AI-01 does NOT own:

- Conversation history
- Context selection
- Memory
- Planning
- Tool execution
- Task lifecycle
- Permission decisions
- UI rendering
- Filesystem operations
- Terminal execution
- OpenCode
- MCP development infrastructure

LLM RUNTIME MODEL:

Conceptual flow:

AI-02 Conversation
→ AI-03 Context Engine
→ AI-01 LLM Runtime
→ configured local LLM
→ response
→ AI-01
→ AI-02

AI-01 is the execution layer.

It should not independently decide what the user means or what action should
be taken.

LOCAL-FIRST:

The default architecture is local processing.

ATLAS should be capable of using a locally configured LLM runtime without
requiring cloud infrastructure.

Ollama or another compatible local runtime may be used if selected by the
implementation/configuration.

Do not hard-code a specific model provider in this document.

AI-09 AI Configuration owns provider/model configuration.

MODEL SELECTION:

AI-09 provides the selected:

- Provider/runtime
- Model
- Runtime configuration
- Relevant generation settings

AI-01 executes using that configuration.

AI-01 must not silently substitute a different model.

REQUEST LIFECYCLE:

Conceptual flow:

Request received
→ validate request
→ resolve configured runtime
→ verify availability
→ send request
→ receive response
→ validate response
→ return result

Do not report success if the model request failed.

STREAMING:

Where supported, AI-01 should provide incremental model output.

Streaming must:

- Preserve ordering
- Support cancellation where possible
- Report connection failures
- Avoid blocking the UI
- Correctly distinguish partial output from completed output

Do not assume every provider supports streaming.

CANCELLATION:

Long-running generation should be cancellable where supported.

Cancellation must be reported separately from model failure.

Do not report a cancelled request as successfully completed.

RUNTIME HEALTH:

AI-01 may expose conceptual runtime states:

- AVAILABLE
- INITIALIZING
- BUSY
- UNAVAILABLE
- ERROR
- STOPPED

Do not invent final enums.

Health information must reflect actual runtime state.

ERROR HANDLING:

Cover:

- Runtime unavailable
- Model unavailable
- Invalid request
- Connection failure
- Timeout
- Cancellation
- Model error
- Malformed response
- Streaming interruption
- Configuration mismatch
- Resource exhaustion

Do not fabricate model responses when execution fails.

CONTEXT BOUNDARY:

AI-03 Context Engine constructs the context supplied to AI-01.

AI-01 should receive an already-constructed request/context representation.

AI-01 must not independently load:

- All memory
- All workspace files
- All conversation history
- All search results

TOOL BOUNDARY:

AI-01 executes model inference.

AI-06 Tool Orchestrator owns actual tool execution.

If the model requests a tool, AI-01 should return the structured tool request
to the appropriate orchestration layer rather than executing the tool itself.

Conceptual flow:

AI-01
→ model requests tool
→ AI-06 Tool Orchestrator
→ approved AT capability
→ result
→ AI-01
→ model continues

PERMISSIONS:

AI-01 does not grant permissions.

Model output must never be treated as authorization.

AI-16 does not exist.

AT-16 Permissions remains the authorization authority for system actions.

IPC:

The React renderer must not directly communicate with the LLM provider.

Use:

React
→ IPC
→ runtime
→ AI modules
→ AI-01
→ local LLM runtime

Do not expose model credentials or runtime internals to the renderer.

AI-02 CONVERSATION:

AI-02 owns conversational state and behavior.

AI-02 supplies requests to AI-01.

AI-01 returns model results.

Do not move conversation management into AI-01.

AI-09 CONFIGURATION:

AI-09 owns configuration.

AI-01 consumes configuration.

Do not duplicate configuration management inside AI-01.

EVENTS:

Use AT-17 Event Runtime for relevant events.

Conceptual events:

- LLM request started
- LLM response started
- LLM response chunk received
- LLM response completed
- LLM request cancelled
- LLM runtime unavailable
- LLM request failed

Do not define final event schemas.

SECURITY:

Protect against:

- Unauthorized model configuration changes
- Prompt injection affecting system-level execution
- Sensitive context leakage
- Model output being treated as trusted instructions
- Exposing runtime credentials
- Untrusted external provider responses

Model output is untrusted data.

The AI runtime must not bypass AT-16 through model-generated instructions.

PRIVACY:

Keep prompts, context, and model responses local where the selected runtime
supports local processing.

Do not transmit user data to external services unless explicitly configured
and authorized.

Do not persist complete prompts/responses unnecessarily.

PERFORMANCE:

LLM inference can be expensive.

Do not block the Electron main process.

Support asynchronous generation.

Streaming should be used where supported and beneficial.

Avoid unnecessary duplication of large context payloads.

TESTING:

Include tests for:

- Runtime availability
- Model availability
- Request creation
- Response handling
- Streaming
- Cancellation
- Timeout
- Runtime failure
- Malformed response
- Configuration integration
- Tool-request handoff
- IPC boundary
- Privacy behavior
- Local-runtime behavior

VERIFICATION:

A completed generation should be verified as an actual completed response.

Distinguish:

- Successful completion
- Partial/streaming response
- Cancellation
- Runtime failure
- Model failure

ACCEPTANCE CRITERIA:

AI-01 is complete when:

- ATLAS can communicate with the configured LLM runtime.
- Local LLM execution works through the configured runtime.
- Model responses are returned accurately.
- Streaming works where supported.
- Cancellation works where supported.
- Runtime/model failures are accurately reported.
- AI-01 does not own conversation, planning, memory, or tool execution.
- AI-09 remains the configuration authority.
- AI-06 remains the tool-execution authority.
- AT-16 remains the permission authority.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate LLM Provider module.

Do not create a separate Model Runtime module.

LLM execution belongs entirely to AI-01.

Do not move conversation management into AI-01.

AI-02 owns conversation.

Do not move context construction into AI-01.

AI-03 owns context construction.

Do not introduce OpenCode or MCP into the ATLAS runtime.

OpenCode is the external Code Engineer integration, not the internal ATLAS
LLM runtime.

Do not invent exact model APIs, providers, package versions, schemas, or
implementation details.

This document defines the module contract only.