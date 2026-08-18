Write the complete module specification for `03_MODULES/AI-02_CONVERSATION.md`.

MODULE:
AI-02 — Conversation

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

AI-02 provides ATLAS conversation management.

It manages the user's conversational interaction with ATLAS, including
messages, conversation lifecycle, active conversation state, model response
association, and conversation-level interaction flow.

AI-02 coordinates with AI-03 Context Engine to construct relevant context
and AI-01 LLM Runtime to execute model requests.

AI-02 does not independently decide long-term memory relevance, execute
system tools, or perform LLM inference.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Conversation Model
9. Conversation Lifecycle
10. Message Lifecycle
11. User Messages
12. Assistant Messages
13. System Messages
14. Streaming Responses
15. Conversation History
16. Context Integration
17. Memory Integration
18. Tool Integration
19. Task Integration
20. Attachment Integration
21. Voice Integration
22. AI Runtime Integration
23. Persistence
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

AI-02 owns:

- Conversation creation
- Conversation lifecycle
- Message lifecycle
- User-message handling
- Assistant-response association
- Conversation history
- Active conversation state
- Conversation metadata
- Streaming response coordination
- Conversation-related events
- Conversation persistence where required

AI-02 does NOT own:

- LLM inference
- Context construction
- Memory intelligence
- Long-term memory storage
- Planning
- Tool execution
- Task lifecycle
- Filesystem operations
- Terminal execution
- Permissions
- Workspace management
- Search implementation
- OpenCode
- MCP development infrastructure

CONVERSATION MODEL:

Define a conceptual conversation:

Conversation
→ identity
→ metadata
→ messages
→ state
→ associated workspace/task/context where applicable
→ timestamps

Do not define the final database schema.

CONVERSATION LIFECYCLE:

Define conceptual states:

- CREATED
- ACTIVE
- PAUSED
- COMPLETED
- ARCHIVED
- ERROR

These are conceptual states only.

MESSAGE MODEL:

Messages may conceptually contain:

- Role
- Content
- Timestamp
- Attachments/references where applicable
- Tool-related information where applicable
- Response state where applicable

Do not invent the final message schema.

USER MESSAGE FLOW:

User
→ AI-02 Conversation
→ validate/record message
→ AI-03 Context Engine
→ construct relevant context
→ AI-01 LLM Runtime
→ response
→ AI-02
→ present/store response

AI-02 coordinates this lifecycle.

It does not construct the entire context itself.

ASSISTANT RESPONSE:

AI-01 returns model output.

AI-02 associates the output with the active conversation.

For streaming:

AI-01
→ response chunks
→ AI-02
→ incremental conversation state/UI updates
→ completed assistant message

Do not treat partial output as a final message.

CONTEXT:

AI-03 Context Engine owns context construction.

AI-02 supplies conversation history and relevant conversation state to AI-03.

AI-02 must not blindly send the entire conversation history if context
limits or relevance requirements make that inappropriate.

MEMORY:

AI-04 Memory Intelligence determines whether information should become
persistent memory.

AT-08 Memory stores persistent memory.

AI-02 may provide conversation information to AI-04 when appropriate.

Do not automatically convert every conversation message into memory.

TOOLS:

AI-06 Tool Orchestrator owns tool execution.

Conceptual flow:

Conversation
→ AI-03 Context
→ AI-01 LLM
→ tool request
→ AI-06
→ AT capability
→ result
→ AI-01
→ AI-02
→ conversation continues

AI-02 records relevant tool interaction state but does not execute tools.

TASKS:

AI-07 Task Manager owns task lifecycle.

AI-02 may associate a conversation with a task.

Do not move task management into AI-02.

ATTACHMENTS:

AT-13 Files & Attachments owns attachment lifecycle.

AI-02 may associate attachments with conversation messages.

Do not duplicate attachment storage inside AI-02.

VOICE:

AT-14 Voice supplies transcripts.

AI-02 treats transcripts as user input.

AI-02 may send assistant responses to AT-14 for speech output.

VISION:

AT-15 Vision supplies visual input.

AI-02 associates relevant visual input with the conversation.

AI-03 decides whether it belongs in the final context.

LLM RUNTIME:

AI-01 owns inference.

AI-02 prepares and coordinates the conversation request.

AI-01 must not become responsible for conversation state.

PERSISTENCE:

Conversation history should persist locally where required.

SQLite may be used for local persistence.

Do not invent the final database schema.

Persistence should support:

- Conversation creation
- Message storage
- Message updates where required
- Conversation retrieval
- Conversation archival/deletion where supported

PERMISSIONS:

Conversation data may contain sensitive information.

Access and deletion operations must respect the appropriate security and
permission model.

AT-16 remains the permission authority.

AI-02 must not grant access to protected resources merely because they appear
in conversation history.

IPC:

React
→ IPC
→ runtime
→ AI-02

The renderer should receive only the conversation data required for the
current UI.

Do not expose internal runtime state unnecessarily.

EVENTS:

Use AT-17 Event Runtime.

Conceptual events:

- Conversation created
- User message received
- Assistant response started
- Assistant response chunk received
- Assistant response completed
- Tool interaction occurred
- Conversation updated
- Conversation completed
- Conversation error

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Invalid message
- Conversation unavailable
- LLM failure
- Context failure
- Tool failure
- Attachment failure
- Voice failure
- Persistence failure
- Cancellation
- Streaming interruption

A failed tool or LLM operation must not be represented as a successful
assistant response.

SECURITY:

Protect against:

- Prompt injection
- Malicious attachment content
- Unauthorized conversation access
- Cross-workspace conversation leakage
- Cross-task context leakage
- Sensitive message exposure
- Model-generated instructions being treated as trusted system commands

Conversation content is untrusted data.

Do not allow user/model text to bypass AT-16.

PRIVACY:

Conversation history may contain sensitive information.

Keep it local by default.

Do not transmit conversation data externally unless explicitly required by
the configured AI architecture.

Provide appropriate deletion/retention behavior.

PERFORMANCE:

Do not load unlimited conversation history into memory.

Use appropriate retrieval/context mechanisms.

Streaming must not freeze the UI.

Large conversations should be handled incrementally.

TESTING:

Include tests for:

- Conversation creation
- Message creation
- User message flow
- Assistant response
- Streaming
- Cancellation
- Conversation persistence
- Conversation retrieval
- Context integration
- Memory integration
- Tool integration
- Attachment integration
- Voice integration
- Vision integration
- Error handling
- Cross-conversation isolation
- IPC boundary

VERIFICATION:

A completed assistant response should be verified as completed before it is
marked final.

Distinguish:

- Streaming
- Completed
- Cancelled
- Failed

Do not claim the AI answered successfully when AI-01 failed.

ACCEPTANCE CRITERIA:

AI-02 is complete when:

- Users can create and maintain conversations.
- Messages are tracked correctly.
- Assistant responses are associated with the correct conversation.
- Streaming responses work where supported.
- Conversation history persists locally where required.
- AI-03 controls context construction.
- AI-01 controls LLM execution.
- AI-04 controls memory intelligence.
- AI-06 controls tool execution.
- AT-13 controls attachments.
- AT-14 controls voice.
- AT-15 controls vision.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Chat module.

Do not create a separate Message Manager module.

Conversation capability belongs entirely to AI-02.

Do not move context construction into AI-02.

AI-03 owns context construction.

Do not move memory intelligence into AI-02.

AI-04 owns memory intelligence.

Do not move tool execution into AI-02.

AI-06 owns tool execution.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact database schemas, APIs, package versions, or
implementation details.

This document defines the module contract only.