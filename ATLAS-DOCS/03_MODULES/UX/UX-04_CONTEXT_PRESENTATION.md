Write the complete module specification for `03_MODULES/UX-04_CONTEXT_PRESENTATION.md`.

MODULE:
UX-04 — Context & Presentation

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

PRODUCT/UI CONTEXT:

The existing Lovable React prototype is the official UI foundation.

UX-04 is responsible for presenting contextual information, AI responses,
operation results, relevant system information, task information, and other
user-facing content in a coherent way.

UX-04 does not generate the underlying intelligence or own the source data.

Define UX-04 in detail.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Consumers
9. Presentation Model
10. AI Response Presentation
11. Context Presentation
12. Memory Presentation
13. Workspace Presentation
14. Task/Operation Result Presentation
15. File/Attachment Presentation
16. Guardian Information Presentation
17. Notification Presentation Boundary
18. Error Presentation
19. Permission Context Presentation
20. IPC/Event Boundary
21. Accessibility
22. Security
23. Performance
24. Events
25. Interfaces
26. Testing Requirements
27. Verification Requirements
28. Acceptance Criteria
29. Failure Conditions
30. Git Requirements
31. Implementation Notes
32. Definition of Done

RESPONSIBILITIES:

UX-04 owns:

- Presentation of AI responses
- Presentation of relevant contextual information
- Conversation result formatting
- Task result presentation
- Tool result presentation
- Relevant workspace information presentation
- Memory/context presentation
- File and attachment result presentation
- Guardian information presentation
- User-facing error presentation
- User-facing permission context
- Presentation-level formatting
- Result summaries
- Appropriate disclosure of operation details

UX-04 does NOT own:

- AI reasoning
- LLM execution
- Context construction
- Memory intelligence
- Memory storage
- Planning
- Tool orchestration
- Task management
- Verification logic
- Permission decisions
- Filesystem operations
- Terminal execution
- Process management
- System monitoring
- Database ownership
- OpenCode
- MCP development infrastructure

PRESENTATION PRINCIPLE:

Use:

Source Module
→ structured result
→ UX-04
→ user-facing presentation

UX-04 must not become the source of truth for the data it presents.

AI RESPONSE:

AI-02 Conversation provides the response.

UX-04 presents it.

If a response includes:

- Text
- Structured results
- Task information
- Operation information
- Warnings
- Errors
- References to files

UX-04 should present them according to the appropriate UI pattern.

Do not invent final response schemas.

CONTEXT:

Relevant context may originate from:

- AI-03 Context Engine
- AT-08 Memory
- AT-01 Workspace
- AT-09 Context Store
- AT-10 Search & Retrieval
- AT-13 Files & Attachments

UX-04 presents relevant context without becoming the owner of context
selection.

The UI should not dump all available context onto the user.

Present information according to relevance.

MEMORY:

When memory is relevant, UX-04 may present:

- Stored information
- Memory source/context
- Relevant remembered information
- Memory-related actions

AT-08 owns memory.

AI-04 owns memory intelligence.

UX-04 only presents the resulting information.

WORKSPACE:

Workspace information originates from AT-01 Workspace.

UX-04 may present:

- Current workspace
- Project information
- Relevant files
- Task context

UX-04 must not directly manipulate workspace state.

TASK RESULTS:

AI-07 Task Manager and AI-08 Reasoning & Verification provide task/verification
information.

UX-04 presents:

- Current task
- Completed steps
- Failed steps
- Verification result
- Remaining work
- Final outcome

Do not claim completion unless the runtime reports completion.

FILE/ATTACHMENT PRESENTATION:

AT-13 Files & Attachments owns attachment handling.

UX-04 may present:

- Attachment information
- File metadata
- Processing status
- Relevant results

UX-04 must not execute or parse privileged files directly.

GUARDIAN:

AT-07 Guardian provides system health/warning information.

UX-04 presents relevant warnings and information.

UX-04 does not diagnose or decide the underlying system state.

PERMISSIONS:

AT-16 Permissions owns permission decisions.

UX-04 may explain the context of a permission request.

UX-02 owns the interaction required to respond to the request.

UX-04 must not grant or deny permissions.

ERROR PRESENTATION:

Differentiate:

- Runtime failure
- Tool failure
- Permission denial
- Cancellation
- Timeout
- Verification failure
- Dependency unavailable

Do not hide meaningful failure information.

Do not expose unnecessary internal stack traces or sensitive data.

NOTIFICATIONS:

AT-12 Notifications owns notification capability/state.

UX-04 may provide presentation surfaces for notifications where appropriate.

UX-04 does not own notification scheduling or delivery.

ACCESSIBILITY:

Include:

- Semantic content structure
- Accessible headings
- Screen-reader compatibility
- Keyboard navigation
- Clear error messages
- Accessible result summaries
- Proper handling of dynamic content
- Appropriate focus management

SECURITY:

UX-04 must not display:

- API keys
- Credentials
- Tokens
- Sensitive internal logs
- Unnecessary private file contents
- Hidden permission configuration
- Unfiltered tool parameters

Presentation should follow the principle of minimum necessary disclosure.

PERFORMANCE:

Avoid rendering unnecessary historical/context data.

Large results should use appropriate presentation strategies.

Long-running operations should not block the renderer.

EVENTS:

UX-04 may consume conceptual events such as:

- AI response received
- Context updated
- Task result received
- Tool result received
- Guardian warning
- Notification received
- Permission context available
- Error received

Do not define final event schemas.

TESTING:

Include tests for:

- AI response presentation
- Context presentation
- Task result presentation
- Error presentation
- Permission context
- Guardian warning
- File/attachment result presentation
- Notification presentation boundary
- Accessibility
- Large-result handling
- Missing/partial result handling

ACCEPTANCE CRITERIA:

UX-04 is complete when:

- AI responses are presented clearly.
- Relevant context is understandable.
- Task and operation results are accurately represented.
- Errors are not hidden or misrepresented.
- Permission context is understandable without allowing UX-04 to change the
  decision.
- Guardian information is presented correctly.
- Sensitive information is not unnecessarily exposed.
- The existing Lovable UI visual language is preserved.
- UX-04 does not own AI or AT functionality.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create additional presentation or context modules.

Do not move AI-03 Context Engine, AI-04 Memory Intelligence, AI-08
Reasoning & Verification, AT-08 Memory, AT-12 Notifications, or AT-16
Permissions responsibilities into UX-04.

Do not redesign the Lovable prototype.

Do not introduce OpenCode or MCP into ATLAS runtime.

Do not invent final APIs, schemas, route names, package versions, or
implementation details.

This document defines the module contract only.