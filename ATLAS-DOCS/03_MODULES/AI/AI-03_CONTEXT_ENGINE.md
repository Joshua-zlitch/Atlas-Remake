Write the complete module specification for `03_MODULES/AI-03_CONTEXT_ENGINE.md`.

MODULE:
AI-03 — Context Engine

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

AI-03 is responsible for constructing the context supplied to the LLM.

It determines what currently available information is relevant to a specific
AI operation and assembles that information into an appropriate context.

AI-03 is the central context-selection and context-construction layer.

AI-03 may use:

- AI-02 Conversation
- AT-08 Memory
- AT-09 Context Store
- AT-10 Search & Retrieval
- AT-13 Files & Attachments
- AT-15 Vision
- AT-01 Workspace
- AT-06 System Information
- AT-07 Guardian
- AI-05 Planner
- AI-07 Task Manager
- AI-08 Reasoning & Verification

AI-03 does NOT execute tools, perform LLM inference, own persistent memory,
or own conversation state.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Context Model
9. Context Sources
10. Context Selection
11. Context Prioritization
12. Context Assembly
13. Context Limits
14. Conversation Context
15. Memory Context
16. Workspace Context
17. Task Context
18. Tool Context
19. Attachment Context
20. System Context
21. AI Integration
22. Context Isolation
23. Permission Boundary
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

AI-03 owns:

- Context selection
- Context prioritization
- Context assembly
- Context normalization
- Context budgeting
- Context relevance evaluation
- Context preparation for AI-01
- Context lifecycle coordination
- Context-related diagnostics
- Context-related events

AI-03 does NOT own:

- LLM execution
- Conversation storage
- Persistent memory
- Memory intelligence
- Tool execution
- Task lifecycle
- Workspace management
- Filesystem operations
- Search implementation
- Permissions
- Notifications
- Voice processing
- Vision acquisition
- OpenCode
- MCP development infrastructure

CONTEXT MODEL:

Define context conceptually as information selected for a specific AI
operation.

Possible context categories:

- System context
- Conversation context
- Task context
- Workspace context
- Memory context
- Search results
- Attachment references/content
- Tool results
- Guardian/system-state information
- User-provided temporary information

Do not automatically include every category.

CONTEXT SOURCES:

AI-03 should obtain information through the owning modules.

Examples:

Conversation
→ AI-02

Persistent memory
→ AT-08

Active context
→ AT-09

Search
→ AT-10

Attachments
→ AT-13

Workspace
→ AT-01

System information
→ AT-06

Guardian state
→ AT-07

Do not duplicate source ownership inside AI-03.

CONTEXT SELECTION:

Conceptual flow:

AI operation
→ identify requirements
→ identify available sources
→ retrieve relevant information
→ rank/prioritize
→ construct context
→ validate
→ AI-01

AI-03 should prefer relevant information over indiscriminate inclusion.

Do not blindly include:

- Entire conversation history
- Entire memory database
- Entire workspace
- Entire filesystem
- All search results
- All system information

CONTEXT PRIORITIZATION:

Context should be prioritized according to relevance to the current
operation.

Potential categories:

- Required system instructions
- Current user request
- Immediate task state
- Relevant conversation history
- Relevant workspace information
- Relevant memory
- Relevant tool results
- Supporting evidence

Do not hard-code a final ranking algorithm.

CONTEXT ASSEMBLY:

AI-03 should produce a structured context representation appropriate for
AI-01.

The final representation must remain implementation-defined.

AI-03 should preserve source identity where useful so the AI system can
distinguish:

- User input
- Retrieved information
- Tool output
- Memory
- Workspace data
- System information

CONTEXT LIMITS:

AI-03 must account for model context limitations.

When context is too large:

- Prioritize relevant information
- Reduce redundant information
- Summarize where appropriate
- Retrieve selectively
- Preserve critical information
- Avoid arbitrary truncation of important instructions

Do not invent a fixed token limit.

AI-09 may provide model-specific configuration where required.

CONVERSATION CONTEXT:

AI-02 provides conversation history/state.

AI-03 determines which portions are relevant.

Do not require the entire conversation to be included in every request.

MEMORY CONTEXT:

AI-04 determines memory relevance.

AT-08 provides persistent memory.

Conceptual flow:

AI-03
→ request relevant memory
→ AI-04 / AT-08
→ selected memory
→ context

Do not independently invent semantic memory relevance inside AI-03.

WORKSPACE CONTEXT:

AT-01 provides workspace identity/state.

AT-10 may retrieve relevant workspace information.

AI-03 decides whether workspace information belongs in the context.

TASK CONTEXT:

AI-07 owns task lifecycle.

AI-03 may include relevant task state.

Do not move task ownership into AI-03.

TOOL CONTEXT:

AI-06 Tool Orchestrator owns tool execution.

Tool results may be returned to AI-03 for incorporation into subsequent
model context.

Treat tool output as data.

Do not blindly trust tool output as system instructions.

ATTACHMENTS:

AT-13 owns attachment lifecycle.

AI-03 determines whether attachment information/content is relevant.

Large attachments should be represented efficiently.

Do not automatically inject every attachment into the context.

SYSTEM/GUARDIAN CONTEXT:

AT-06 and AT-07 provide system/Guardian information.

AI-03 may include such information when it materially affects the current
operation.

Do not expose unnecessary system details.

AI INTEGRATION:

AI-01 receives the final context.

AI-02 supplies conversation information.

AI-04 supplies memory intelligence.

AI-05 may request planning-specific context.

AI-06 may provide tool results.

AI-08 may request evidence/context for verification.

AI-03 remains the context-construction authority.

CONTEXT ISOLATION:

Context must remain isolated between:

- Conversations
- Tasks
- Workspaces
- Users where applicable
- Permission scopes

Do not allow unrelated context to leak into an AI request.

PERMISSIONS:

AI-03 does not grant access to information.

If retrieving protected information requires authorization:

request
→ AT-16 Permissions
→ approved source
→ AI-03

AI-03 must not bypass AT-16.

IPC:

React renderer
→ IPC
→ AI runtime

The renderer must not directly construct privileged system context.

AI-03 should receive structured runtime information through approved
interfaces.

EVENTS:

Use AT-17 Event Runtime.

Conceptual events:

- Context construction started
- Context source retrieved
- Context updated
- Context finalized
- Context truncated/reduced
- Context construction failed

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Source unavailable
- Context too large
- Invalid source data
- Permission denial
- Missing context
- Retrieval failure
- Conflicting context
- Context construction failure

Do not fabricate missing context.

If a required source is unavailable, clearly represent that state.

SECURITY:

Protect against:

- Prompt injection
- Malicious retrieved documents
- Untrusted tool output
- Malicious attachment content
- Context leakage
- Unauthorized information retrieval
- Cross-workspace contamination

Retrieved content must not automatically override system-level policy.

Treat external/local data as data unless explicitly classified otherwise.

PRIVACY:

Context should contain only information required for the current operation.

Avoid unnecessary inclusion of:

- Personal information
- Sensitive memory
- Private files
- Credentials
- System details
- Unrelated conversations

Local-first processing is the default.

PERFORMANCE:

Context construction must be efficient enough for interactive AI use.

Avoid repeatedly retrieving identical large datasets.

Use caching/references where appropriate without allowing stale information
to override current state.

Do not block the Electron main process.

TESTING:

Include tests for:

- Context creation
- Conversation selection
- Memory selection
- Workspace context
- Task context
- Search integration
- Attachment integration
- Tool-result integration
- Context limits
- Context reduction
- Missing source
- Permission denial
- Cross-workspace isolation
- Cross-task isolation
- Prompt-injection handling
- IPC boundary

VERIFICATION:

Before sending context to AI-01:

- Validate required components
- Validate source boundaries
- Validate context size
- Validate context structure
- Confirm protected data was authorized
- Confirm unrelated data was excluded

Do not report context as valid if required construction failed.

ACCEPTANCE CRITERIA:

AI-03 is complete when:

- Relevant context can be constructed for AI operations.
- Context sources remain owned by their respective modules.
- Conversation history is selected intelligently.
- Persistent memory is selected appropriately.
- Active context is incorporated correctly.
- Search results can be incorporated when relevant.
- Attachments can be incorporated safely.
- Context remains within model limits.
- Unrelated information does not leak into requests.
- Prompt injection is treated as untrusted data.
- AI-01 receives a valid structured context.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Context Manager module.

Do not create a separate Prompt Builder module.

Do not create a separate Context Optimizer module.

All context construction belongs to AI-03.

Do not move persistent memory into AI-03.

AT-08 owns persistent memory.

Do not move memory intelligence into AI-03.

AI-04 owns memory intelligence.

Do not move LLM execution into AI-03.

AI-01 owns LLM execution.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact token limits, schemas, APIs, package versions, or
implementation details.

This document defines the module contract only.