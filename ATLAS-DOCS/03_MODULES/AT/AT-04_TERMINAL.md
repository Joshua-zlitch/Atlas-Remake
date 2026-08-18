Write the complete module specification for `03_MODULES/AT-04_TERMINAL.md`.

MODULE:
AT-04 — Terminal

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

AT-04 provides controlled terminal and command-execution capabilities to
ATLAS.

This module is one of the highest-risk AT capabilities because commands can
modify the user's system.

Every protected command execution must pass through AT-16 Permissions.

AT-04 must never become an unrestricted shell exposed directly to the AI or
renderer.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Command Execution Model
9. Shell Environment
10. Working Directory
11. Environment Variables
12. Standard Input
13. Standard Output
14. Standard Error
15. Exit Codes
16. Process Lifecycle
17. Permission Boundary
18. AI Integration
19. Workspace Relationship
20. IPC Boundary
21. Cancellation
22. Timeout Handling
23. Events
24. Error Handling
25. Security
26. Performance
27. Testing Requirements
28. Verification Requirements
29. Acceptance Criteria
30. Failure Conditions
31. Git Requirements
32. Implementation Notes
33. Definition of Done

RESPONSIBILITIES:

AT-04 owns:

- Controlled command execution
- Shell/process execution environment
- Working-directory handling
- Environment handling
- Standard output capture
- Standard error capture
- Exit-code capture
- Command execution lifecycle
- Command cancellation where supported
- Command timeout handling
- Terminal operation results

AT-04 does NOT own:

- General process management
- Filesystem capability
- Workspace ownership
- Permission policy
- AI planning
- Tool orchestration
- Task management
- Application UI control
- System health analysis
- Database management
- OpenCode
- MCP development infrastructure

COMMAND EXECUTION:

Define a conceptual command request containing:

- Command/program
- Arguments
- Working directory
- Environment requirements
- Timeout where applicable
- Expected behavior where available
- Permission context

Do not define the final TypeScript request schema yet.

WORKING DIRECTORY:

The working directory may come from:

- Active workspace
- Explicitly authorized path
- Other approved runtime context

Paths must be validated.

A user workspace does not automatically authorize arbitrary commands against
the entire operating system.

SHELL MODEL:

Define the distinction between:

- Direct executable invocation
- Shell command execution

Prefer explicit executable/argument handling when possible.

If shell execution is required, it must remain subject to the permission and
security model.

Do not design an unrestricted AI shell.

OUTPUT:

Capture where supported:

- stdout
- stderr
- exit code
- process state
- execution duration
- failure information

Do not expose unnecessary environment variables or sensitive command data.

PERMISSIONS:

Use:

AI-06 Tool Orchestrator
→ AT-16 Permissions
→ AT-04 Terminal
→ command execution

Potentially sensitive operations include:

- File deletion
- Package installation
- Registry changes
- System configuration
- Network operations
- Privileged commands
- Destructive commands
- Commands outside the active workspace

AT-16 decides whether authorization is required.

AT-04 enforces the resulting permission boundary.

Do not create an independent permission system inside AT-04.

AI INTEGRATION:

AI-05 Planner may determine that a terminal operation is required.

AI-06 Tool Orchestrator invokes AT-04.

AI-08 Reasoning & Verification evaluates the result.

AI must not directly execute shell commands.

WORKSPACE:

AT-01 provides workspace context.

AT-04 may execute commands relative to the active workspace when authorized.

Workspace context is not equivalent to unlimited command permission.

IPC:

Renderer
→ IPC
→ runtime
→ AT-04

The renderer must never receive unrestricted shell access.

Validate all renderer-originated terminal requests.

CANCELLATION:

Supported long-running commands should be cancellable where technically
possible.

Cancellation should:

- Stop accepting additional input when appropriate
- Attempt safe process termination
- Report cancellation separately from failure
- Avoid pretending the command completed successfully

Do not forcibly terminate unrelated processes.

TIMEOUT:

Commands may exceed expected execution time.

Define conceptual timeout behavior:

Command running
→ timeout reached
→ cancellation/termination attempt
→ verify resulting state
→ report timeout

Do not claim successful completion after a timeout.

EVENTS:

Conceptual events:

- Command started
- Command output received
- Command completed
- Command failed
- Command cancelled
- Command timed out

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Command not found
- Invalid command
- Permission denied
- Working directory unavailable
- Process creation failure
- Non-zero exit code
- Timeout
- Cancellation
- Shell failure
- Environment failure
- Output capture failure

A non-zero exit code should normally be represented as an execution failure,
not silently treated as success.

SECURITY:

Protect against:

- Command injection
- Argument injection
- Path traversal
- Shell metacharacter abuse
- Privilege escalation
- Untrusted AI-generated commands
- Untrusted renderer input
- Accidental destructive commands
- Credential exposure through environment variables
- Secrets appearing in command output

Treat AI-generated commands as untrusted proposals.

AT-16 must remain the authorization boundary.

Do not log sensitive command contents unnecessarily.

PERFORMANCE:

Support long-running commands without blocking the Electron main event loop.

Capture output incrementally where appropriate.

Avoid unlimited in-memory output buffering for commands producing massive
output.

Do not silently truncate critical error information.

TESTING:

Include tests for:

- Simple command execution
- Arguments
- Working directory
- stdout
- stderr
- exit code
- command-not-found
- non-zero exit code
- timeout
- cancellation
- permission denial
- workspace boundary
- malicious command input
- environment handling
- large output
- IPC boundary
- verification

ACCEPTANCE CRITERIA:

AT-04 is complete when:

- Authorized commands execute reliably.
- Command output and exit status are accurately reported.
- Protected commands respect AT-16.
- Renderer cannot directly execute shell commands.
- Timeouts and cancellations are handled correctly.
- Malicious/untrusted command input is handled safely.
- Long-running commands do not freeze the application.
- Important command results can be verified.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Shell module.

Do not create a separate Command Runner module.

Terminal/command execution belongs to AT-04.

Do not move general process management into AT-04.

AT-03 owns process management.

Do not move permission policy into AT-04.

AT-16 remains the permission authority.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact APIs, package versions, command schemas, or implementation
details.

This document defines the module contract only.