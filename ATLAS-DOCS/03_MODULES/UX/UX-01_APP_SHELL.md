Write the complete module specification for `03_MODULES/UX-01_APP_SHELL.md`.

MODULE:
UX-01 — App Shell

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

The existing Lovable React prototype is the official UI foundation for
ATLAS.

The purpose of UX-01 is NOT to recreate the Lovable UI from scratch.

UX-01 owns the application-level shell and layout structure that hosts the
existing prototype UI and connects it to the ATLAS runtime through approved
interfaces.

Define UX-01 in detail.

The document MUST contain these sections:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Consumers
9. Internal Components
10. Runtime Behavior
11. Application Lifecycle
12. UI Structure
13. Navigation
14. Window/Application State
15. Responsive Behavior
16. IPC Boundary
17. Error States
18. Loading States
19. Accessibility
20. Security Considerations
21. Performance Considerations
22. Events
23. Interfaces
24. Testing Requirements
25. Verification Requirements
26. Acceptance Criteria
27. Failure Conditions
28. Git Requirements
29. Implementation Notes
30. Definition of Done

RESPONSIBILITIES:

UX-01 should own:

- Application shell
- Global layout
- Primary application structure
- Main navigation container
- Window-level UI state
- Global shell-level loading/error states
- Placement of major ATLAS UI surfaces
- Integration of the existing Lovable prototype into the ATLAS application
- Application-level routing/layout integration where applicable
- Shell-level lifecycle behavior

UX-01 must NOT own:

- AI reasoning
- Conversation logic
- LLM execution
- Memory
- Filesystem operations
- Terminal execution
- Process management
- Permissions
- Database operations
- Tool orchestration
- Task execution
- System monitoring
- OpenCode
- MCP development infrastructure

Explain the boundary between UX-01 and the other UX modules:

UX-01 App Shell
→ application structure

UX-02 Interaction System
→ user interaction behavior

UX-03 State Visualization
→ visual representation of runtime/task states

UX-04 Context & Presentation
→ presentation of contextual information and results

Do not move responsibilities between these modules.

LOVABLE INTEGRATION:

Document how the existing Lovable React prototype is incorporated.

The integration should preserve the prototype's established visual identity
where practical.

Do not instruct the implementation agent to redesign the UI.

The implementation should adapt the prototype to the ATLAS runtime rather
than rebuilding an unrelated interface.

RUNTIME BOUNDARY:

Use:

React Renderer
→ approved frontend interfaces
→ IPC / runtime boundary
→ Electron Main / ATLAS Runtime

The renderer must not directly access:

- Node.js privileged APIs
- Filesystem
- Terminal
- Processes
- SQLite
- OS-level privileged operations

UX-01 should consume runtime state rather than owning privileged runtime
operations.

NAVIGATION:

Define navigation conceptually.

Do not invent final route names unless they already exist in the Lovable
prototype.

The implementation must inspect the actual prototype before changing
routing.

APPLICATION LIFECYCLE:

Describe:

- Startup
- Loading
- Ready
- Active
- Error
- Shutdown

UX-01 should reflect runtime state but must not become the owner of runtime
state.

EVENTS:

Document the types of events UX-01 may consume or emit at a conceptual
level.

Examples:

- Application ready
- Application error
- Navigation change
- Window state change
- Runtime unavailable
- Shutdown requested

Do not invent a final event schema.

SECURITY:

UX-01 must follow the IPC and security architecture.

Never expose unrestricted system APIs through the UI.

PERFORMANCE:

Avoid unnecessary application-wide rerenders.

The shell should remain stable while individual UI surfaces update.

TESTING:

Include tests for:

- Application startup
- Shell rendering
- Navigation
- Loading states
- Error states
- Runtime unavailable state
- Shutdown behavior
- IPC integration boundary
- Lovable prototype integration

ACCEPTANCE CRITERIA:

UX-01 is complete when:

- The ATLAS application shell renders correctly.
- The Lovable prototype is integrated.
- Major navigation/layout structure works.
- Runtime state can be represented at shell level.
- The renderer does not bypass IPC/security boundaries.
- No AT/AI responsibilities are implemented inside UX-01.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create additional modules.

Do not redesign the Lovable prototype.

Do not introduce OpenCode into ATLAS.

Do not introduce MCP into the ATLAS runtime.

Do not invent package versions, APIs, route names, database schemas, or
components that are not established by the actual project.

This document is a module contract, not implementation code.