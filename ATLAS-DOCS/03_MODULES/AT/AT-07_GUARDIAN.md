Write the complete module specification for `03_MODULES/AT-07_GUARDIAN.md`.

MODULE:
AT-07 — Guardian

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

AT-07 Guardian provides ATLAS with system-awareness, safety-warning, and
protective monitoring capabilities.

Guardian consumes factual information from AT-06 System Information and
other approved runtime signals, evaluates relevant conditions, and reports
warnings or abnormal conditions.

Guardian does NOT replace AT-16 Permissions.

Guardian does NOT execute arbitrary corrective actions automatically.

Guardian does NOT own raw system information collection.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Monitoring Model
9. System Health Evaluation
10. Warning Levels
11. Safety Conditions
12. Resource Monitoring
13. Process/System Signals
14. AI Integration
15. Permission Boundary
16. IPC Boundary
17. Events
18. Error Handling
19. Security
20. Privacy
21. Performance
22. Testing Requirements
23. Verification Requirements
24. Acceptance Criteria
25. Failure Conditions
26. Git Requirements
27. Implementation Notes
28. Definition of Done

RESPONSIBILITIES:

AT-07 owns:

- System condition evaluation
- Safety warnings
- Resource-condition evaluation
- Abnormal-condition detection
- Guardian status
- Runtime safety signals
- Warning generation
- Relevant system-health summaries
- Guardian events
- Escalation of conditions to appropriate UI/runtime components

AT-07 does NOT own:

- Raw system information collection
- Filesystem operations
- Terminal execution
- Process control
- Application control
- Permissions policy
- AI reasoning
- Planning
- Tool orchestration
- Memory
- Search
- Notifications delivery
- Database ownership
- OpenCode
- MCP development infrastructure

SYSTEM INFORMATION BOUNDARY:

AT-06 owns factual system information.

Use:

AT-06 System Information
→ factual measurements
→ AT-07 Guardian
→ evaluate conditions
→ warning/status

Example:

AT-06:
"CPU utilization is high."

AT-07:
"CPU utilization has remained high and may require attention."

Do not duplicate system-information collection inside Guardian.

GUARDIAN MODEL:

Define Guardian as a monitoring/evaluation capability rather than an
autonomous administrator.

Guardian may evaluate:

- CPU conditions
- Memory conditions
- Storage conditions
- Process/system anomalies where relevant
- Application/runtime conditions
- ATLAS runtime health
- Other supported local safety signals

Do not invent exact thresholds.

Thresholds should be configurable or defined during implementation based on
the actual system requirements.

WARNING LEVELS:

Define conceptual levels such as:

- NORMAL
- INFORMATION
- WARNING
- CRITICAL
- UNKNOWN

Explain that these are conceptual states and not final implementation
enums.

Guardian must not manufacture certainty when required information is
unavailable.

Use UNKNOWN when a condition cannot be evaluated reliably.

AI INTEGRATION:

AI may request Guardian information when relevant.

Example:

AI
→ approved runtime interface
→ AT-07 Guardian
→ current condition
→ AI context

AI-03 Context Engine may include relevant Guardian information.

AI-08 Reasoning & Verification may use Guardian information when evaluating
system operations.

AI must not directly access Guardian internals.

AUTOMATIC ACTIONS:

Guardian may identify dangerous or abnormal conditions, but it must not
silently execute destructive corrective actions.

If corrective action is required:

Condition
→ Guardian warning
→ AI/user decision where appropriate
→ AI-06 Tool Orchestrator
→ AT-16 Permissions
→ relevant AT capability

Guardian itself does not bypass permissions.

PERMISSIONS:

Guardian monitoring should generally be read-oriented.

Any action that changes the system must use the appropriate AT capability and
AT-16 Permissions.

Guardian is not an authorization authority.

IPC:

Renderer
→ IPC
→ runtime
→ Guardian state/results

The renderer must not directly access system monitoring APIs.

UX-03 State Visualization and UX-04 Context & Presentation may consume
Guardian results for presentation.

EVENTS:

Conceptual events:

- Guardian initialized
- Condition detected
- Warning generated
- Warning escalated
- Condition cleared
- Guardian unavailable
- Monitoring failure

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Missing system information
- Monitoring failure
- Unsupported metric
- Stale information
- Guardian initialization failure
- Invalid condition evaluation
- Runtime unavailable

When Guardian cannot evaluate a condition reliably, report UNKNOWN rather
than inventing a result.

SECURITY:

Guardian must not become a privileged backdoor.

Protect against:

- Unauthorized system access
- Unsafe automatic remediation
- AI-triggered privilege escalation
- Renderer-originated privileged operations
- Malicious or malformed system data

PRIVACY:

Guardian should collect only the system information required for its
monitoring responsibilities.

Do not unnecessarily persist detailed system telemetry.

Do not expose sensitive system information through warnings unless it is
relevant.

PERFORMANCE:

Guardian must avoid excessive polling.

Monitoring frequency should be appropriate to the condition being observed.

Do not create a high-frequency global monitoring loop.

Resource-heavy diagnostics should only run when necessary.

TESTING:

Include tests for:

- Normal state
- Warning condition
- Critical condition
- Unknown state
- Condition clearing
- Resource monitoring
- Missing system information
- Stale data
- Monitoring failure
- Guardian initialization
- Event generation
- IPC boundary
- Permission boundary
- Performance under repeated monitoring

ACCEPTANCE CRITERIA:

AT-07 is complete when:

- Guardian can evaluate supported system conditions.
- Warning states are generated accurately.
- Unknown conditions are not falsely represented as healthy.
- Guardian consumes system facts from AT-06.
- Guardian does not duplicate AT-06's collection responsibilities.
- Guardian does not bypass AT-16.
- Guardian does not silently perform destructive remediation.
- Relevant events are exposed through approved runtime interfaces.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Health Monitor module.

Do not create a separate Safety module.

Do not create a separate Monitoring module.

Guardian owns system-condition evaluation and warnings.

AT-06 owns system-information collection.

AT-16 owns permissions.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact thresholds, APIs, package versions, schemas, or
implementation details.

This document defines the module contract only.