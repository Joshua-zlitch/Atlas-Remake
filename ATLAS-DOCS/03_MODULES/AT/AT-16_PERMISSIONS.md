Write the complete module specification for `03_MODULES/AT-16_PERMISSIONS.md`.

MODULE:
AT-16 — Permissions

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

AT-16 is the central authorization and permission boundary for ATLAS.

It determines whether an operation is allowed, denied, requires user
approval, or requires additional authorization.

AT-16 is critical because ATLAS can interact with the user's local computer.

Every privileged or potentially destructive AT capability must respect this
boundary.

AT-16 does NOT execute the operation.

The relevant AT module executes the operation after authorization.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Permission Model
9. Permission Levels
10. Permission Requests
11. Permission Decisions
12. User Approval
13. Persistent Permissions
14. Temporary Permissions
15. Scope
16. Revocation
17. Dangerous Operations
18. AI Integration
19. Automation Integration
20. Guardian Integration
21. IPC Boundary
22. Events
23. Error Handling
24. Security
25. Privacy
26. Performance
27. Testing Requirements
28. Verification Requirements
29. Acceptance Criteria
30. Failure Conditions
31. Git Requirements
32. Implementation Notes
33. Definition of Done

RESPONSIBILITIES:

AT-16 owns:

- Permission policy
- Authorization decisions
- Permission requests
- Permission scopes
- User approval flow coordination
- Permission persistence where appropriate
- Temporary permissions
- Permission revocation
- Permission-related events
- Permission audit information where required

AT-16 does NOT own:

- Actual filesystem operations
- Terminal execution
- Process control
- Application control
- Workspace operations
- AI reasoning
- Planning
- Tool orchestration
- Memory
- Search
- Notifications delivery
- System information collection
- Guardian evaluation
- Voice processing
- Vision processing
- OpenCode
- MCP development infrastructure

PERMISSION MODEL:

Define conceptual decisions:

- ALLOW
- DENY
- ASK
- UNAVAILABLE

These are conceptual states only.

The final implementation may use equivalent representations.

Permission decisions should consider:

- Operation
- Target
- Scope
- Source
- User intent
- Current context
- Existing authorization
- Risk level

Do not grant broad authorization merely because an operation originated
from the AI.

PERMISSION LEVELS:

Define conceptual risk categories:

- SAFE
- SENSITIVE
- DESTRUCTIVE
- PRIVILEGED

Examples:

SAFE:
- Reading basic system information

SENSITIVE:
- Accessing sensitive files

DESTRUCTIVE:
- Deleting files
- Killing processes

PRIVILEGED:
- System-level changes

Do not hard-code these classifications as the final implementation unless
later requirements explicitly define them.

PERMISSION REQUEST:

Conceptual flow:

AI/user request
→ identify operation
→ determine risk/scope
→ AT-16
→ existing permission?
   → yes: allow/deny
   → no: ask or deny
→ approved AT capability
→ execute
→ verify

AT-16 must receive enough information to make a meaningful decision.

PERMISSION DECISION:

A permission decision must be explicit.

Do not treat:

- Missing permission
- Timeout
- Runtime failure
- Unknown state

as automatic approval.

Fail safely.

USER APPROVAL:

When user approval is required:

Request
→ UX notification/prompt
→ user decision
→ AT-16
→ approved/denied

AT-12 Notifications may communicate that approval is required.

UX-02 Interaction System may provide the approval interaction.

AT-16 remains responsible for the authorization decision.

PERSISTENT PERMISSIONS:

Some permissions may be remembered.

Persistent permissions must have clear scope.

Examples:

- Specific operation
- Specific workspace
- Specific application
- Specific capability

Do not create a permanent unrestricted "AI can do anything" permission.

TEMPORARY PERMISSIONS:

Support temporary authorization for a specific:

- Operation
- Task
- Session
- Context
- Time window

Temporary permissions should expire appropriately.

REVOCATION:

Users must be able to revoke persistent permissions.

Revocation should take effect for future operations.

Do not silently continue using revoked authorization.

SCOPE:

Permissions should be as narrow as practical.

Example:

Allow:
"Read files inside this workspace"

is safer than:

"Read any file on the computer."

DANGEROUS OPERATIONS:

Give special treatment to:

- File deletion
- File overwriting
- Process termination
- Privileged commands
- System configuration
- Application control
- Screen capture
- Camera access
- External data transmission
- Destructive automation

The exact classification must remain implementation/configuration-driven.

AI INTEGRATION:

AI-06 Tool Orchestrator is the primary AI-facing execution boundary.

Use:

AI request
→ AI-06
→ AT-16
→ approved AT capability

AI-05 Planner may propose actions.

Planner does not grant permission.

AI-08 Reasoning & Verification may evaluate whether an operation succeeded.

It does not grant permission.

AUTOMATION:

AT-11 Automation must not bypass AT-16.

Scheduled execution must have a defined permission context.

Do not assume that because a user approved an operation once, every future
automated execution is permanently authorized.

GUARDIAN:

AT-07 Guardian can report dangerous conditions.

Guardian does not grant permission.

AT-16 remains the authorization authority.

IPC:

Renderer
→ IPC
→ runtime
→ AT-16

The renderer must not directly approve privileged operations.

Approval requests must be validated by the runtime.

EVENTS:

Conceptual events:

- Permission requested
- Permission approved
- Permission denied
- Permission expired
- Permission revoked
- Permission unavailable

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Permission unavailable
- Invalid request
- Unknown operation
- Unknown scope
- User denial
- Approval timeout
- Permission store failure
- Revocation failure
- Runtime failure

Unknown or failed authorization must fail closed.

SECURITY:

AT-16 is a security boundary.

Protect against:

- Privilege escalation
- Permission spoofing
- AI-generated authorization abuse
- Renderer-originated approval spoofing
- Permission scope expansion
- Stale permissions
- Cross-workspace permission leakage
- Unauthorized automation

Never trust a permission claim supplied by the AI or renderer.

Verify authorization internally.

PRIVACY:

Permission decisions may reveal sensitive information.

Store only the information necessary to enforce permissions and provide
appropriate user visibility.

Do not expose internal permission data unnecessarily.

PERFORMANCE:

Permission checks must be fast enough for normal interactive operations.

Avoid expensive global policy evaluation for every low-risk operation when
unnecessary.

Do not cache permissions beyond their intended scope.

TESTING:

Include tests for:

- Allow
- Deny
- Ask
- Unknown/unavailable
- User approval
- User denial
- Temporary permission
- Persistent permission
- Revocation
- Expiration
- Workspace-scoped permission
- Destructive operation
- Privileged operation
- Automation
- AI-originated request
- Renderer-originated request
- Permission spoofing
- Cross-scope isolation

VERIFICATION:

Before an authorized operation proceeds:

- Validate operation
- Validate target
- Validate scope
- Validate authorization
- Pass authorization result to the relevant AT capability

After execution, the result must be reported independently from the
permission decision.

Permission granted does not mean operation succeeded.

ACCEPTANCE CRITERIA:

AT-16 is complete when:

- Privileged operations have a central authorization boundary.
- Permission decisions are explicit.
- User approval works where required.
- Temporary and persistent scopes are supported where required.
- Revocation works.
- Unknown authorization fails safely.
- AI cannot grant itself permissions.
- Renderer cannot spoof approval.
- Automation cannot bypass authorization.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Authorization module.

Do not create a separate Security Permission module.

All ATLAS permission authority belongs to AT-16.

Do not move operation execution into AT-16.

The appropriate AT module remains responsible for execution.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact permission schemas, APIs, package versions, or
implementation details.

This document defines the module contract only.