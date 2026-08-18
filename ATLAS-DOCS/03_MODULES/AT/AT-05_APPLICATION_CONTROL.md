Write the complete module specification for `03_MODULES/AT-05_APPLICATION_CONTROL.md`.

MODULE:
AT-05 — Application Control

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

AT-05 provides controlled application-level interaction capabilities for
ATLAS.

It allows ATLAS to discover, launch, focus, inspect, and control supported
desktop applications where technically possible and explicitly authorized.

AT-05 is distinct from AT-03 Process.

AT-03 owns operating-system process management.

AT-05 owns application-level operations.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Supported Application Operations
6. Inputs
7. Outputs
8. Dependencies
9. Application Discovery
10. Application Launching
11. Application Focus
12. Application State
13. Application Interaction
14. Process Boundary
15. Permission Boundary
16. AI Integration
17. IPC Boundary
18. Events
19. Error Handling
20. Security
21. Performance
22. Testing Requirements
23. Verification Requirements
24. Acceptance Criteria
25. Failure Conditions
26. Git Requirements
27. Implementation Notes
28. Definition of Done

RESPONSIBILITIES:

AT-05 owns:

- Supported application discovery
- Application identification
- Application launching where supported
- Application focusing/activation where supported
- Application state inspection where supported
- Supported application-level control
- Application operation results
- Application availability checks

AT-05 does NOT own:

- General process management
- Arbitrary process termination
- Terminal execution
- Filesystem operations
- Workspace management
- System-wide health analysis
- AI reasoning
- Planning
- Tool orchestration
- Permissions policy
- Memory
- Database management
- OpenCode
- MCP development infrastructure

PROCESS BOUNDARY:

AT-03 owns process-level operations.

AT-05 may use process information where required to identify or interact
with an application, but must not absorb AT-03's process-management
responsibility.

Example:

AT-05 Application Control
→ identifies application
→ uses approved runtime/process information
→ performs supported application operation

AT-03 remains responsible for process lifecycle operations.

SUPPORTED OPERATIONS:

Define conceptual operations such as:

- Discover application
- Identify application
- Launch application
- Focus application
- Inspect application state
- Perform supported application interaction
- Detect application availability

Do not assume universal control of every Windows application.

Application capabilities may vary by application and operating-system
support.

AI INTEGRATION:

Use:

AI-05 Planner
→ determines application action when required
→ AI-06 Tool Orchestrator
→ AT-16 Permissions
→ AT-05 Application Control
→ result
→ AI-08 Reasoning & Verification

AI must not directly access application-control APIs.

PERMISSIONS:

Potentially protected operations include:

- Launching applications
- Controlling applications
- Sending input
- Manipulating privileged applications
- Interacting with applications outside the active task context

AT-16 remains the authorization authority.

Application visibility does not automatically grant permission to control
the application.

Do not create a separate permission system inside AT-05.

IPC:

The renderer must not directly access operating-system application-control
APIs.

Use:

React
→ IPC
→ Electron/Node runtime
→ AT-05

Validate renderer-originated requests.

APPLICATION DISCOVERY:

The module may identify supported applications through approved local
mechanisms.

Do not assume every installed application is controllable.

If application capabilities cannot be determined, report that limitation.

LAUNCHING:

Where supported:

Request
→ permission check
→ application launch
→ verify application availability/state
→ report result

Do not report a successful launch merely because a launch command was issued.

FOCUS:

Where supported:

Request
→ identify application
→ permission check where required
→ focus/activate
→ verify resulting state where practical

APPLICATION INTERACTION:

Only implement explicitly supported interaction mechanisms.

Do not create an unrestricted desktop-control system.

Do not assume arbitrary mouse/keyboard automation is automatically safe or
available.

ERROR HANDLING:

Cover:

- Application not found
- Application unavailable
- Launch failure
- Access denied
- Unsupported interaction
- Application closed unexpectedly
- Application not responding
- Invalid application identifier
- Permission denied
- Verification failure

Never convert unsupported behavior into a successful response.

VERIFICATION:

Important operations should be verified where practical.

Examples:

Launch
→ launch
→ check application availability/state
→ report result

Focus
→ request focus
→ inspect resulting state where possible
→ report result

Interaction
→ perform interaction
→ inspect resulting state where possible
→ report result

SECURITY:

Protect against:

- Unauthorized application control
- Malicious application identifiers
- Untrusted AI-generated targets
- Privilege escalation
- Control of security-sensitive applications
- Accidental interaction with the wrong application
- Renderer-originated privileged operations

AI-generated application targets are untrusted input.

AT-16 remains the authorization boundary.

Do not automatically execute arbitrary applications simply because the AI
requested them.

PERFORMANCE:

Avoid repeated full application discovery when unnecessary.

Use targeted lookup where practical.

Do not block the Electron main process with long-running application
operations.

TESTING:

Include tests for:

- Application discovery
- Application identification
- Launch
- Focus
- Supported interaction
- Application unavailable
- Application not found
- Permission denial
- Launch failure
- Verification
- Renderer/IPC boundary
- Windows-specific behavior where applicable

ACCEPTANCE CRITERIA:

AT-05 is complete when:

- Supported applications can be identified.
- Supported applications can be launched when authorized.
- Supported application-level operations work reliably.
- Permission boundaries are respected.
- Application operations report accurate results.
- Important operations can be verified.
- Renderer cannot directly control applications.
- AT-05 does not absorb AT-03 Process responsibilities.
- Unsupported application interactions fail clearly.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Application Manager module.

Do not create a separate Desktop Control module.

Application control belongs to AT-05.

Do not move general process management into AT-05.

AT-03 owns process management.

Do not move permission policy into AT-05.

AT-16 remains the permission authority.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact APIs, package versions, schemas, or implementation
details.

This document defines the module contract only.