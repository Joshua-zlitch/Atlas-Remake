Write the complete module specification for `03_MODULES/AI-09_AI_CONFIGURATION.md`.

MODULE:
AI-09 — AI Configuration

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

AI-09 owns the configuration of ATLAS AI behavior and LLM runtime settings.

It manages configuration such as:

- Selected LLM runtime/provider
- Selected model
- Model parameters
- AI behavior settings
- Context-related model configuration
- Generation settings
- AI feature configuration
- Runtime connection configuration where required

AI-09 is the configuration authority for the AI layer.

AI-01 LLM Runtime consumes this configuration.

AI-02 Conversation, AI-03 Context Engine, AI-05 Planner, AI-06 Tool
Orchestrator, AI-07 Task Manager, and AI-08 Reasoning & Verification may
consume relevant configuration.

AI-09 does not execute AI requests and does not perform model inference.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Configuration Model
9. Provider Configuration
10. Model Configuration
11. Generation Configuration
12. Runtime Configuration
13. AI Behavior Configuration
14. Configuration Validation
15. Configuration Persistence
16. Configuration Updates
17. Configuration Defaults
18. Configuration Scope
19. Configuration Security
20. Secret/Credential Boundary
21. Runtime Integration
22. Conversation Integration
23. Context Integration
24. Planner Integration
25. Tool Integration
26. Verification Integration
27. IPC Boundary
28. Events
29. Error Handling
30. Security
31. Privacy
32. Performance
33. Testing Requirements
34. Verification Requirements
35. Acceptance Criteria
36. Failure Conditions
37. Git Requirements
38. Implementation Notes
39. Definition of Done

RESPONSIBILITIES:

AI-09 owns:

- AI configuration
- LLM provider/runtime configuration
- Model selection
- Model parameter configuration
- AI feature configuration
- Configuration validation
- Configuration persistence
- Configuration updates
- Configuration defaults
- Configuration migration where required
- Configuration-related events

AI-09 does NOT own:

- LLM inference
- Conversation lifecycle
- Context construction
- Memory intelligence
- Planning
- Tool execution
- Task execution
- Verification
- Filesystem operations
- Terminal execution
- Permissions
- Workspace management
- Notifications
- OpenCode
- MCP development infrastructure

CONFIGURATION MODEL:

Conceptually divide configuration into:

1. Runtime configuration
2. Model configuration
3. Generation configuration
4. AI behavior configuration

The final schema is implementation-defined.

Do not invent a fixed configuration schema unless required by the
implementation.

PROVIDER CONFIGURATION:

ATLAS is local-first.

AI-09 must support configuration of the selected local LLM runtime.

Examples may include a local runtime such as Ollama or another compatible
runtime.

Do not hard-code Ollama as the only supported provider.

If external providers are supported later, their configuration must remain
explicit.

AI-09 must not silently switch providers.

MODEL CONFIGURATION:

Configuration may include:

- Model identifier
- Model availability
- Model-specific settings
- Context capability information where available

AI-01 uses the selected model.

AI-09 does not execute the model.

GENERATION CONFIGURATION:

Possible settings include:

- Temperature
- Maximum output
- Sampling parameters
- Streaming preference
- Other provider-supported generation settings

Do not assume every model supports every setting.

Unsupported configuration should be validated and handled safely.

RUNTIME CONFIGURATION:

May include:

- Runtime endpoint
- Runtime connection settings
- Local runtime availability
- Timeout configuration
- Other implementation-specific runtime settings

Do not expose internal runtime details unnecessarily to the renderer.

AI BEHAVIOR:

AI-09 may configure high-level AI behavior such as:

- Default interaction behavior
- Planning behavior
- Verification behavior
- Context behavior
- Tool-use behavior

These settings must not bypass module boundaries.

Configuration controls behavior.

It does not replace the responsibility of the owning module.

VALIDATION:

Before configuration is applied:

Configuration
→ validate
→ normalize
→ verify compatibility
→ persist/apply

Reject invalid configuration.

Do not silently modify user configuration without reporting the change.

PERSISTENCE:

Configuration should persist locally.

A local configuration store may be used.

Do not create a separate Configuration module.

AI-09 owns AI configuration persistence.

Secrets should not be stored in plain text when the platform provides a
secure credential mechanism.

Do not define the final storage technology unless implementation requirements
specify it.

UPDATES:

Configuration updates should:

- Validate the new value
- Preserve unrelated configuration
- Apply safely
- Persist where required
- Report success/failure

If changing configuration requires restarting or reinitializing a runtime,
report that requirement accurately.

DEFAULTS:

Provide sensible defaults for required settings.

Defaults must not silently enable dangerous behavior.

Do not invent exact default values unless implementation requirements
specify them.

SCOPE:

Configuration may have different scopes where appropriate:

- Global
- Workspace
- Conversation
- Task

The final scope model must be explicit.

A workspace-specific configuration must not unintentionally overwrite global
configuration.

SECURITY:

AI configuration is security-sensitive because it can influence how AI
operates.

Protect against:

- Unauthorized configuration changes
- Malicious model/provider changes
- Endpoint manipulation
- Unsafe AI behavior configuration
- Credential exposure
- Configuration injection

Renderer-originated configuration changes must be validated by the runtime.

SECRET/CREDENTIAL BOUNDARY:

API keys, tokens, passwords, or other credentials must not be exposed to:

- React renderer
- Conversation messages
- LLM prompts
- Logs
- Event payloads

Use secure local storage mechanisms where available.

Do not print secrets during debugging or testing.

RUNTIME INTEGRATION:

AI-01 consumes the configuration.

Conceptual flow:

User/configuration change
→ AI-09
→ validate/persist
→ AI-01
→ runtime/model

AI-01 must not maintain a second conflicting source of configuration.

CONVERSATION:

AI-02 may consume relevant AI behavior settings.

Do not place conversation state inside AI-09.

CONTEXT:

AI-03 may use model/context capability information from AI-09.

AI-09 provides configuration.

AI-03 remains responsible for context construction.

PLANNER:

AI-05 may use planner-related configuration.

AI-09 does not perform planning.

TOOL ORCHESTRATOR:

AI-06 may use configuration describing enabled/disabled AI capabilities
where appropriate.

Configuration must never bypass AT-16.

VERIFICATION:

AI-08 may use verification-related configuration.

AI-09 does not perform verification.

IPC:

React
→ IPC
→ AI-09

The renderer may:

- Read allowed configuration
- Request configuration changes
- Display runtime/model information

The renderer must not receive secrets.

Configuration writes must be validated in the runtime.

EVENTS:

Use AT-17 Event Runtime.

Conceptual events:

- Configuration loaded
- Configuration updated
- Configuration validation failed
- Model changed
- Runtime configuration changed
- Configuration reset
- Configuration migration completed

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Invalid configuration
- Unsupported model
- Runtime unavailable
- Provider unavailable
- Invalid endpoint
- Persistence failure
- Migration failure
- Permission failure
- Credential failure

Do not report configuration as active when it was not successfully applied.

SECURITY:

Configuration changes must not automatically grant system permissions.

For example:

Enabling tool usage
does not grant permission to execute arbitrary tools.

AT-16 remains the authorization authority.

PRIVACY:

Configuration may reveal:

- Local runtime details
- Model choices
- Workspace preferences
- Credentials/configuration metadata

Keep sensitive configuration local where possible.

Do not include secrets in logs or telemetry.

PERFORMANCE:

Configuration access should be inexpensive.

Avoid repeatedly reading configuration from disk for every AI operation.

Cache validated configuration where appropriate while ensuring updates
propagate correctly.

TESTING:

Include tests for:

- Configuration load
- Default configuration
- Validation
- Model selection
- Runtime configuration
- Generation settings
- Configuration persistence
- Configuration updates
- Invalid configuration
- Unsupported settings
- Secret protection
- Configuration migration
- Workspace/global scope
- IPC boundary
- Runtime integration

VERIFICATION:

After configuration changes:

- Validate configuration
- Persist configuration where required
- Apply configuration
- Verify active runtime state where possible
- Report actual result

Do not claim a model/provider is active merely because the setting was
saved.

ACCEPTANCE CRITERIA:

AI-09 is complete when:

- AI configuration can be loaded and persisted locally.
- Models and runtimes can be configured.
- Invalid configuration is rejected safely.
- Configuration updates are applied correctly.
- AI-01 receives the active configuration.
- Secrets are protected.
- Configuration scopes behave correctly.
- Configuration changes do not bypass permissions.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate AI Settings module.

Do not create a separate Model Configuration module.

Do not create a separate Provider Manager module.

AI configuration belongs entirely to AI-09.

Do not move LLM execution into AI-09.

AI-01 owns LLM execution.

Do not move permissions into AI-09.

AT-16 owns permissions.

Do not introduce OpenCode or MCP into the ATLAS runtime.

OpenCode is the external Code Engineer integration and is not the internal
LLM runtime of ATLAS.

Do not invent exact APIs, package versions, provider schemas, database
schemas, or implementation details.

This document defines the module contract only.