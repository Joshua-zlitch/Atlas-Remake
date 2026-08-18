Write the complete content for `02_ARCHITECTURE/MODULE_ARCHITECTURE.md`.

This document defines the architectural organization and dependency
relationships of the locked ATLAS module system.

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

Core = 30
Total including release = 31

For every module document its:

- Purpose
- Primary responsibility
- Non-responsibilities
- Inputs
- Outputs
- Dependencies
- Consumers
- Major interfaces
- Important events
- Data ownership where applicable
- Permission requirements where applicable

Define the architectural layers:

UX
→ presentation and user interaction

AI
→ intelligence, planning, context, orchestration, and verification

AT
→ local computer capabilities

RELEASE
→ final production packaging and installation verification

Define the allowed high-level dependency direction:

UX
→ AI / approved runtime interfaces

AI
→ AT / approved runtime interfaces

AT
→ operating system, storage, runtime services, and approved internal
interfaces

AI must not directly bypass AT-16 Permissions for protected actions.

UX must not directly access privileged operating-system capabilities.

REL-01 is a release-stage module and is not part of the runtime dependency
graph.

OpenCode is not a module and must not appear in the ATLAS runtime dependency
graph.

Explain the major relationships:

AI-05 Planner
→ AI-06 Tool Orchestrator
→ AT-16 Permissions
→ appropriate AT module

AT-08 Memory
↔ AI-04 Memory Intelligence
↔ AI-03 Context Engine

AT-06 System Information
→ AT-07 Guardian

AT-11 Automation
→ AT-12 Notifications where required

AT-14 Voice
→ AI interaction pipeline

AT-15 Vision
→ AI context pipeline

AT-17 Event Runtime
→ internal event coordination

Explain module ownership rules:

- Each capability has one primary owning module.
- A module may depend on another module through a defined interface.
- Modules must not directly manipulate another module's internal state.
- Shared data must have explicit ownership.
- Internal classes, services, repositories, utilities, adapters, and
  components are implementation details and do not create additional
  ATLAS modules.
- New modules cannot be created to avoid defining a proper interface.

Include a dependency diagram and a module responsibility matrix.

Include rules for preventing circular dependencies.

Include rules for module communication through:

- Typed interfaces
- IPC where crossing renderer/main boundaries
- Runtime events where appropriate
- Explicit service boundaries

Do not invent exact APIs, class names, package names, or implementation
details.

Do not add modules.

Do not merge modules.

Do not split modules.

Do not change module ownership.

Keep this document focused on the architecture and relationships between
modules. Detailed implementation belongs in the individual module
specifications under `03_MODULES/`.