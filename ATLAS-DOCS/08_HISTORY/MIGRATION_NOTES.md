Write the complete historical migration record for `08_HISTORY/MIGRATION_NOTES.md`.

IMPORTANT:

This document records the actual migration path of ATLAS from the previous
prototype/planning state toward the current locked ATLAS architecture.

Do NOT invent migrations, dates, commits, branches, implementation results,
or completed work.

Use the existing ATLAS documentation and available project evidence as the
source of truth.

The current locked documentation always overrides historical notes.

This is a HISTORY document, not an implementation plan.

DO NOT:

- Create new modules.
- Create new architecture layers.
- Expand the locked module structure.
- Redefine the current architecture.
- Introduce OpenCode or MCP into the ATLAS runtime.
- Treat historical architecture as current architecture.
- Claim migrations are completed without evidence.
- Invent database schemas, IPC channels, APIs, package versions, or commands.

CURRENT ARCHITECTURE AUTHORITY:

The current ATLAS architecture consists of:

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

The architecture remains locked.

DOCUMENT PURPOSE:

Record meaningful migrations from previous ATLAS states into the current
architecture.

Each migration should explain:

- Previous state
- Target state
- Reason for migration
- What is being preserved
- What is being replaced
- What is being removed
- What is being adapted
- Migration status
- Validation evidence
- Current authoritative documentation

MIGRATION RECORD FORMAT:

For each migration use:

Migration ID:
Title:
Area:
Previous State:
Target State:
Reason:
Preserved:
Replaced:
Removed:
Adapted:
Status:
Evidence:
Current Authority:
Notes:

STATUS VALUES:

Use only appropriate statuses:

- PLANNED
- IN_PROGRESS
- COMPLETED
- PARTIALLY_COMPLETED
- BLOCKED
- ABANDONED

Do not mark a migration COMPLETED unless actual evidence confirms it.

MIGRATION 01 — LOVABLE UI PROTOTYPE → ATLAS UI FOUNDATION

Record the verified migration direction from the Lovable prototype toward the
ATLAS desktop application.

The existing prototype audit established that:

- The prototype is React 19 + TypeScript.
- It uses Vite.
- It uses Tailwind v4.
- It uses Radix/shadcn-style components.
- It uses TanStack Router.
- It contains a three-panel desktop layout.
- It contains a reusable ATLAS-specific Orb.
- It contains substantial reusable UI components.
- The visual/UI foundation is considered reusable.

The migration direction is:

Lovable Prototype UI
→ ATLAS React/Electron Renderer

The UI should be reused where compatible rather than rebuilt unnecessarily.

The migration must preserve the approved visual foundation while replacing
prototype-only runtime/data behavior.

MIGRATION 02 — PROTOTYPE DATA/LOGIC → ATLAS RUNTIME

Record the verified prototype limitations:

- Prototype data is static.
- Prototype logic uses simulated behavior.
- Chat/AI behavior is not a real local LLM implementation.
- Voice is placeholder functionality.
- File attachments are placeholder functionality.
- Guardian metrics are simulated/static.
- Automation controls are UI-level prototype behavior.
- Settings persistence is not a real persistent runtime implementation.

The migration direction is:

Prototype simulation
→ real ATLAS runtime capabilities

The actual implementation ownership must follow the locked AI and AT
modules.

Do not treat the prototype's simulated behavior as production functionality.

MIGRATION 03 — TANSTACK START / SSR → ELECTRON CLIENT RENDERER

Record the verified compatibility finding that the Lovable prototype contains
TanStack Start/SSR-related infrastructure that is unnecessary for the
Electron renderer.

The migration direction is:

TanStack Start / SSR
→ client-only React renderer

The audit identified:

- Nitro/SSR infrastructure as unnecessary for Electron.
- SSR entry points as unnecessary.
- Sitemap/SEO behavior as unnecessary for a local desktop application.
- Lovable-specific Vite configuration as requiring adaptation/ejection.

Do not claim this migration is completed unless the actual project confirms
it.

MIGRATION 04 — LOVABLE VITE WRAPPER → STANDARD ELECTRON-COMPATIBLE VITE

Record the identified migration requirement:

Lovable-specific Vite configuration
→ standard Electron-compatible Vite configuration

The prototype audit identified that the Lovable Vite wrapper introduces
development/SSR-related behavior that is not appropriate as the final
Electron renderer configuration.

The target architecture should use the project's validated React/Vite
configuration while preserving:

- React
- TypeScript
- Tailwind
- TanStack Router
- Existing UI components

Do not invent the final configuration until the actual project is inspected.

MIGRATION 05 — REMOTE WEB ASSUMPTIONS → LOCAL-FIRST DESKTOP

Record the transition from a web-prototype mindset toward the ATLAS
local-first desktop architecture.

The target architecture is:

Electron Main
→ local runtime services
→ IPC
→ React Renderer

The renderer remains responsible for presentation.

Privileged operations remain outside the renderer.

MIGRATION 06 — SIMULATED AI → LOCAL LLM

Record the migration direction from prototype/simulated AI behavior toward
the ATLAS local LLM architecture.

Previous state:

- Simulated responses.
- Prototype-only AI interaction.

Target state:

- AI-01 LLM Runtime
- Local LLM runtime
- AI-02 Conversation
- AI-03 Context Engine
- AI-04 Memory Intelligence
- AI-05 Planner
- AI-06 Tool Orchestrator
- AI-07 Task Manager
- AI-08 Reasoning & Verification
- AI-09 AI Configuration

The local LLM runtime is the ATLAS AI runtime.

Do NOT introduce OpenCode or MCP as part of this migration.

OpenCode remains external development/code-engineering tooling.

MIGRATION 07 — IN-MEMORY STATE → PERSISTENT LOCAL STATE

Record the identified migration from prototype-only in-memory state toward
ATLAS local persistence.

Affected areas may include:

- Conversations
- Memory
- Settings
- Tasks
- Context
- Application state

The target architecture uses the existing ATLAS data architecture.

Do not invent final database schemas.

Do not claim migration completion without implementation evidence.

MIGRATION 08 — DIRECT/WEB-STYLE CAPABILITIES → IPC-BASED NATIVE CAPABILITIES

Record the transition toward:

React Renderer
→ IPC
→ Electron Main/runtime
→ owning AT module

Native/system capabilities include areas such as:

- Filesystem
- Processes
- Terminal
- System information
- Application control
- Notifications
- Local AI runtime
- Automation
- Database access

The renderer must not directly own privileged system operations.

MIGRATION 09 — PROTOTYPE GUARDIAN → REAL GUARDIAN

Record the migration from static/simulated Guardian UI toward:

AT-07 Guardian

with permission authority remaining:

AT-16 Permissions

The prototype's displayed metrics or controls must not be treated as actual
system enforcement.

MIGRATION 10 — PROTOTYPE AUTOMATION → ATLAS AUTOMATION

Record the migration from UI-only workflow toggles toward:

AT-11 Automation

with task lifecycle integration through:

AI-07 Task Manager

The final automation implementation must execute through the runtime rather
than relying on UI state alone.

MIGRATION 11 — PROTOTYPE SETTINGS → PERSISTENT CONFIGURATION

Record the migration from local React state toward the appropriate ATLAS
configuration architecture.

AI configuration belongs to:

AI-09 AI Configuration

Other application/system configuration must remain with its appropriate
owner.

Do not place all configuration into one module simply because it appears on
the Settings screen.

MIGRATION 12 — PROTOTYPE VOICE → AT-14 VOICE

Record the transition from placeholder voice behavior toward:

AT-14 Voice

The actual implementation may use an appropriate local/native mechanism
defined later by the project.

Do not claim a specific implementation unless verified.

MIGRATION 13 — PROTOTYPE FILE ATTACHMENTS → AT-13

Record the transition from placeholder attachment behavior toward:

AT-13 Files & Attachments

with filesystem ownership remaining with:

AT-02 Filesystem

Do not move filesystem operations into the renderer.

MIGRATION 14 — PROTOTYPE NOTIFICATIONS → AT-12

Record the transition from renderer-only notification behavior toward:

AT-12 Notifications

The existing prototype notification UI may be preserved where compatible,
while notification ownership moves to the runtime architecture.

MIGRATION 15 — PROTOTYPE ORB → AUTHORITATIVE ATLAS ORB

Record the migration decision concerning the ATLAS Orb.

The provided:

`orb.png`

is the authoritative ATLAS orb asset.

Do not replace it with a newly generated asset.

Do not document a replacement as an improvement.

If the prototype contains another Orb implementation, record it as a
historical/prototype implementation and preserve the current authoritative
asset requirement.

MIGRATION 16 — PROTOTYPE-ONLY DEPENDENCIES → PRODUCTION DEPENDENCIES

Record the identified need to remove or adapt dependencies that exist only
because of the Lovable/SSR prototype environment.

Examples identified during the audit include:

- TanStack Start/SSR infrastructure
- Nitro
- Lovable-specific Vite configuration
- Development-only Lovable tooling
- SEO/sitemap infrastructure

Do not automatically remove dependencies merely because they appear
suspicious.

Record actual migration status based on project evidence.

MIGRATION 17 — REMOTE FONT DEPENDENCY → LOCAL FONT ASSETS

The prototype audit identified Google Fonts CDN usage as incompatible with
the strict local/offline-first direction.

Record the migration direction:

Remote font loading
→ locally packaged font assets

Do not claim completion unless the actual project confirms local font
packaging.

MIGRATION 18 — PROTOTYPE UI → LOCKED ATLAS UX ARCHITECTURE

Record the transition from prototype component organization toward the
locked UX architecture:

- UX-01 App Shell
- UX-02 Interaction System
- UX-03 State Visualization
- UX-04 Context & Presentation

Do not create additional UX modules.

A prototype screen or component is not automatically a new ATLAS module.

MIGRATION 19 — PROTOTYPE COMPONENTS → REUSE / ADAPT / REPLACE

Use the existing prototype audit's classification principle:

KEEP
→ reusable without architectural conflict

MODIFY
→ reusable with adaptation

REPLACE
→ prototype behavior must be replaced by real ATLAS runtime behavior

REMOVE
→ prototype-only infrastructure has no role in Electron

The existing audit specifically identified reusable UI foundations such as:

- React UI
- Tailwind
- Radix/shadcn
- Lucide
- Sonner
- CSS animations
- TanStack Router

and identified prototype-only infrastructure requiring removal or
adaptation.

Do not generalize this classification beyond verified project evidence.

MIGRATION VALIDATION:

Every completed migration must be validated through appropriate evidence.

Possible evidence:

- Source inspection
- Git history
- Build output
- Unit tests
- Integration tests
- Runtime tests
- UI verification
- Windows packaging tests
- Database validation

Documentation alone is not proof of implementation.

ROLLBACK:

For migrations affecting:

- Persistent data
- Database structure
- Runtime configuration
- IPC
- Production builds

record rollback considerations where applicable.

Do not claim rollback capability if the actual implementation does not
support it.

GIT TRACEABILITY:

Where a migration corresponds to actual Git changes:

- Preserve the relevant commit/reference.
- Record only verified identifiers.
- Do not invent commit hashes.
- Do not rewrite Git history.

CURRENT AUTHORITY:

Migration history is informational.

The current authoritative documents are:

00_MASTER
01_PRODUCT
02_ARCHITECTURE
03_MODULES
04_UI
05_ENGINEERING
06_AI
07_RELEASE

If a migration note conflicts with current documentation, the current
documentation wins.

FINAL ACCEPTANCE CRITERIA:

The migration notes are complete when:

- Actual prototype-to-ATLAS migrations are documented.
- Previous and target states are clearly separated.
- Lovable UI reuse is accurately represented.
- Prototype-only behavior is distinguished from production behavior.
- Electron migration requirements are recorded.
- Local-first AI migration is recorded.
- IPC/runtime migration is recorded.
- Persistence migration is recorded.
- Windows/release migration considerations are recorded where applicable.
- Migration status is explicit.
- Evidence is identified.
- Unsupported historical claims are not invented.
- Current locked architecture remains authoritative.
- No new modules or architecture are introduced.

This document is a historical migration record only.