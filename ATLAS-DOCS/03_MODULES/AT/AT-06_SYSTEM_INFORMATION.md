Write the complete module specification for `03_MODULES/AT-06_SYSTEM_INFORMATION.md`.

MODULE:
AT-06 — System Information

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

AT-06 provides controlled access to local computer and operating-system
information.

It gathers factual system information for ATLAS and approved consumers.

AT-06 provides information.

AT-07 Guardian evaluates relevant system conditions and warnings.

AT-06 must not become the system-health analysis module.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Information Categories
6. Inputs
7. Outputs
8. Dependencies
9. System Identity
10. Hardware Information
11. Operating-System Information
12. Resource Information
13. Runtime Information
14. Network Information Boundary
15. Process Information Boundary
16. AI Integration
17. Guardian Integration
18. Permission Boundary
19. IPC Boundary
20. Events
21. Error Handling
22. Security
23. Privacy
24. Performance
25. Testing Requirements
26. Verification Requirements
27. Acceptance Criteria
28. Failure Conditions
29. Git Requirements
30. Implementation Notes
31. Definition of Done

RESPONSIBILITIES:

AT-06 owns access to factual system information such as:

- Operating-system information
- System version information
- Hardware information where available
- CPU information
- Memory information
- Storage information where supported
- Runtime/environment information
- Relevant system configuration information
- Resource usage information
- Basic network/system information where required and available

The exact information exposed should be determined by supported local
platform APIs.

AT-06 does NOT own:

- System-health analysis
- Security policy
- Process management
- Terminal execution
- Application control
- Filesystem operations
- Workspace management
- AI reasoning
- Memory
- Database ownership
- Notifications
- OpenCode
- MCP development infrastructure

INFORMATION MODEL:

Separate:

Raw system facts
→ AT-06

Interpretation/health analysis
→ AT-07 Guardian or relevant AI processing

Example:

AT-06:
"Memory utilization is X."

AT-07:
"Memory utilization may require attention."

Do not put health diagnosis logic into AT-06.

SYSTEM INFORMATION:

Define conceptual categories:

- OS
- CPU
- Memory
- Storage
- Display/system environment where relevant
- Runtime
- Hardware
- Network availability/information where appropriate

Do not invent exact fields or platform APIs.

RESOURCE INFORMATION:

AT-06 may provide current resource measurements where supported.

Measurements should include appropriate timestamps or freshness information
when necessary.

Do not claim real-time information if it is only a cached measurement.

PROCESS BOUNDARY:

AT-03 owns process management.

AT-06 may provide system-level process/resource information where required,
but must not become the process-control module.

GUARDIAN:

Use:

AT-06
→ factual system information
→ AT-07 Guardian
→ evaluation/warning
→ UX

AT-07 may request information from AT-06.

AT-06 must remain focused on information acquisition.

AI INTEGRATION:

AI-03 Context Engine may request system information when relevant.

AI-06 Tool Orchestrator may invoke AT-06 for a user-requested system
information task.

AI-08 Reasoning & Verification may use returned information when evaluating
a system operation.

AI must not directly access operating-system information APIs.

PERMISSIONS:

Most basic system information may be low-risk, but potentially sensitive
information should still respect the security and permission model.

AT-16 remains the permission authority where access requires authorization.

IPC:

Renderer
→ IPC
→ runtime
→ AT-06

The renderer must not directly access operating-system APIs.

Validate renderer requests.

EVENTS:

Conceptual events may include:

- System information updated
- Resource measurement available
- Hardware information changed
- System availability changed
- Information collection failed

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Unsupported information
- Permission denied
- Platform API unavailable
- Hardware information unavailable
- Resource query failure
- Stale data
- System API failure

AT-06 must clearly identify unavailable information.

Never fabricate missing system information.

SECURITY:

Protect sensitive system details from unnecessary disclosure.

Avoid exposing:

- Credentials
- Authentication data
- Secrets
- Unnecessary private network details
- Sensitive system paths

Only return information relevant to the requesting operation.

PRIVACY:

System information can still be sensitive.

Use:

Request
→ determine relevant information
→ collect minimum necessary data
→ return result

Do not collect or persist system information unnecessarily.

PERFORMANCE:

System queries should not excessively poll hardware or operating-system
APIs.

Resource monitoring should use sensible intervals when used by Guardian.

Do not create a high-frequency global polling loop.

TESTING:

Include tests for:

- OS information
- CPU information
- Memory information
- Storage information
- Runtime information
- Unsupported information
- Permission denial
- Platform API failure
- Stale data handling
- IPC boundary
- Guardian integration
- Performance of repeated queries

ACCEPTANCE CRITERIA:

AT-06 is complete when:

- Supported system information can be retrieved reliably.
- Unsupported information is reported honestly.
- Sensitive information is appropriately controlled.
- Renderer cannot directly access system APIs.
- Guardian can consume relevant system facts.
- AI can request relevant system information through approved interfaces.
- AT-06 does not contain Guardian health-analysis logic.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create separate CPU, Memory Monitor, Hardware Info, or Network Info
modules.

System information belongs to AT-06.

Do not move health analysis into AT-06.

AT-07 owns Guardian evaluation.

Do not move process control into AT-06.

AT-03 owns process management.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact APIs, package versions, schemas, or implementation
details.

This document defines the module contract only.