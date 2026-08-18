Write the complete module specification for `03_MODULES/AT-03_PROCESS.md`.

MODULE:
AT-03 — Process

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

AT-03 provides controlled local process-management capabilities to ATLAS.

It allows ATLAS to inspect and manage operating-system processes when
authorized and supported.

AT-03 must operate behind the AT-16 Permissions boundary for protected
operations.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Process Discovery
9. Process Inspection
10. Process Lifecycle Operations
11. Process Termination
12. Process Monitoring
13. Permission Boundary
14. AI Integration
15. Workspace Relationship
16. IPC Boundary
17. Events
18. Error Handling
19. Security
20. Performance
21. Testing Requirements
22. Verification Requirements
23. Acceptance Criteria
24. Failure Conditions
25. Git Requirements
26. Implementation Notes
27. Definition of Done

RESPONSIBILITIES:

AT-03 owns:

- Process discovery
- Process listing
- Process inspection
- Process metadata retrieval
- Process state inspection
- Supported process lifecycle operations
- Process termination where authorized
- Process-related monitoring
- Process operation results
- Process-related errors

AT-03 does NOT own:

- Terminal command execution
- Application launching as a product capability
- Application UI control
- System-wide health analysis
- Permissions policy
- AI reasoning
- Planning
- Task management
- Filesystem operations
- Workspace ownership
- Database ownership
- OpenCode
- MCP development infrastructure

PROCESS DISCOVERY:

Define conceptual capabilities for:

- Listing processes
- Finding a process
- Inspecting process metadata
- Inspecting process state
- Identifying process relationships where supported

Do not assume that every process can be fully inspected on every Windows
system.

The module must report unavailable information accurately.

PROCESS LIFECYCLE:

Where supported, AT-03 may provide controlled operations such as:

- Start/launch through an explicitly supported process interface
- Request termination
- Force termination where explicitly authorized and supported
- Observe process state

Do not turn AT-03 into a general application-control system.

AT-05 Application Control owns application-level control.

TERMINATION:

Process termination is potentially destructive.

Use:

AI-06 Tool Orchestrator
→ AT-16 Permissions
→ AT-03 Process
→ termination operation
→ verification

AT-03 must not silently force-kill processes.

Where possible, distinguish:

- Graceful termination
- Forced termination
- Permission denied
- Process already exited
- Process not found
- Termination failed

VERIFICATION:

For process lifecycle operations, verify the resulting state where practical.

Example:

Terminate request
→ permission check
→ termination
→ inspect process
→ verify expected state
→ report result

Do not claim that a process was terminated without evidence that the
operation succeeded.

AI INTEGRATION:

AI-06 Tool Orchestrator is the approved AI-facing execution boundary.

AI-03 Context Engine may consume relevant process information when required
for a task.

AI-08 Reasoning & Verification may evaluate process operation results.

AI must not directly access operating-system process APIs.

PERMISSIONS:

Potentially protected operations include:

- Terminating processes
- Force termination
- Starting processes
- Operating on processes outside an authorized task context

AT-16 remains the authorization authority.

A process being visible does not automatically grant permission to control
it.

IPC:

The React renderer must not directly access process APIs.

Use:

React
→ IPC
→ Electron/Node runtime
→ AT-03

Validate all renderer-originated requests.

EVENTS:

Conceptual events may include:

- Process discovered
- Process state changed
- Process started
- Process exited
- Process termination requested
- Process terminated
- Process operation failed

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Process not found
- Access denied
- Process already exited
- Operation unsupported
- Invalid process identifier
- Termination failure
- Permission denial
- Process becoming unavailable during operation
- Insufficient privileges
- System API failure

Never convert a failed process operation into a success response.

SECURITY:

Protect against:

- Unauthorized process control
- Malicious process identifiers
- Privilege escalation
- Unintended termination
- Renderer-originated privileged operations
- AI-generated destructive process actions

Do not provide unrestricted process control to the AI.

PERFORMANCE:

Process enumeration can be expensive.

Avoid unnecessary repeated full-process scans.

Use targeted inspection when possible.

Do not continuously poll at high frequency unless the task actually
requires monitoring.

TESTING:

Include tests for:

- Process discovery
- Process inspection
- Process state
- Process identification
- Authorized termination
- Permission denial
- Process-not-found behavior
- Already-exited process
- Termination failure
- Verification
- Renderer/IPC boundary
- Windows-specific behavior where applicable

ACCEPTANCE CRITERIA:

AT-03 is complete when:

- Processes can be inspected reliably.
- Supported process operations work when authorized.
- Protected operations respect AT-16.
- Process termination results are verified where practical.
- Failures are accurately reported.
- Renderer cannot directly control processes.
- AT-03 does not absorb AT-05 Application Control responsibilities.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Process Monitor module.

Do not create a separate Process Manager module.

Process capability belongs to AT-03.

Do not move permission logic into AT-03.

AT-16 remains the permission authority.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact APIs, package versions, schemas, or implementation
details.

This document defines the module contract only.