ATLAS IMPLEMENTATION ROADMAP
============================

STATUS:
Documentation Stage = COMPLETE
Implementation Stage = NEXT

CORE RULE:
The ATLAS documentation is now LOCKED.

Implementation must follow the existing documentation.
Do not expand the architecture.
Do not create new modules.
Do not rename modules.
Do not split modules.
Do not merge modules.
Do not invent additional documentation stages.

If implementation reveals a genuine contradiction in the locked documents:
1. Stop the affected implementation.
2. Identify the contradiction.
3. Record the issue/decision.
4. Resolve it deliberately.
5. Update the authoritative documentation only when explicitly approved.

============================================================
PHASE 0 — REPOSITORY BASELINE
============================================================

Goal:
Establish a clean, recoverable Git baseline before implementation.

Tasks:
- Verify the ATLAS repository.
- Verify Git configuration.
- Verify working tree.
- Create/confirm the development branch strategy.
- Confirm .gitignore.
- Confirm no secrets are tracked.
- Confirm no generated junk is tracked.
- Create the initial implementation baseline commit where appropriate.

Rules:
- Do not rewrite Git history.
- Do not force-push.
- Do not delete existing work.
- Every meaningful implementation stage must remain recoverable through Git.

Output:
- Clean repository baseline.
- Known Git state.
- Recoverable implementation history.


============================================================
PHASE 1 — ENGINEERING FOUNDATION
============================================================

Goal:
Create the actual runtime foundation required by ATLAS.

Build only what is already defined by the locked architecture.

Tasks:

1. Project Structure
   - Establish the production source structure.
   - Separate renderer, main/runtime, preload, shared types,
     tests, assets, and configuration according to the locked
     engineering architecture.

2. Electron
   - Establish Electron main process.
   - Establish application lifecycle.
   - Establish window lifecycle.
   - Establish production/development separation.

3. React Renderer
   - Establish the production React renderer.
   - Preserve the approved Lovable UI foundation.
   - Do not rebuild the UI unnecessarily.

4. TypeScript
   - Establish strict project typing according to the existing
     engineering specification.

5. Vite
   - Establish the Electron-compatible renderer build.
   - Remove prototype-only SSR requirements where required.
   - Preserve the usable React/Tailwind/TanStack Router foundation.

6. Preload
   - Establish the secure preload boundary.
   - Expose only approved APIs.

7. IPC
   - Establish the renderer ↔ runtime communication boundary.
   - Define the implementation according to the locked IPC architecture.
   - Do not allow the renderer to directly access privileged Node APIs.

8. Testing Foundation
   - Establish the project's configured test infrastructure.
   - Create the foundation for unit/integration/runtime testing.

9. Development Tooling
   - Establish linting/formatting/type-checking using the existing
     engineering specification.
   - Do not introduce unnecessary tooling.

Output:
- ATLAS launches as a basic Electron application.
- React renderer loads.
- Preload works.
- IPC boundary works.
- Type checking works.
- Basic build works.
- Tests can execute.
- Git baseline is recoverable.


============================================================
PHASE 2 — LOVABLE UI MIGRATION
============================================================

Goal:
Convert the approved Lovable prototype into the ATLAS renderer without
unnecessary visual rewrites.

IMPORTANT:
The Lovable prototype is the UI foundation.
Its prototype logic is NOT the final ATLAS runtime.

Preserve where compatible:
- Design system
- Layout
- Components
- Styling
- Routing
- Animations
- Orb
- Approved visual behavior

Replace where required:
- Static prototype data
- Simulated setTimeout behavior
- Prototype-only AI behavior
- Prototype-only Guardian data
- Prototype-only automation
- Prototype-only persistence
- Prototype-only voice behavior
- Prototype-only attachment behavior

The existing audit specifically established that the UI foundation is
reusable while the prototype logic/data layer requires replacement.
Source evidence: the audit described the UI as production-ready/reusable
and identified the prototype logic as simulated. :contentReference[oaicite:0]{index=0}

Migration direction:

Lovable Prototype
        ↓
Electron React Renderer
        ↓
ATLAS UX Layer
        ↓
IPC
        ↓
ATLAS Runtime

Do not create additional UX modules.

Output:
- Real ATLAS renderer foundation.
- Approved UI preserved.
- Prototype-only runtime behavior identified/replaced.


============================================================
PHASE 3 — CORE RUNTIME / AT FOUNDATION
============================================================

Goal:
Implement the runtime capabilities that the AI and UI will depend upon.

Implement according to the locked AT modules.

Recommended dependency-aware order:

1. AT-01 Workspace
2. AT-02 Filesystem
3. AT-16 Permissions
4. AT-17 Event Runtime
5. AT-09 Context Store
6. AT-08 Memory
7. AT-06 System Information
8. AT-03 Process
9. AT-04 Terminal
10. AT-05 Application Control
11. AT-07 Guardian
12. AT-10 Search & Retrieval
13. AT-11 Automation
14. AT-12 Notifications
15. AT-13 Files & Attachments
16. AT-14 Voice
17. AT-15 Vision

IMPORTANT:
This is implementation order, NOT a change to module numbering or
architecture.

Do not create:
- New filesystem module
- New permission module
- New memory module
- New process module
- New automation module
- New notification module
- New tool module

Use the locked modules only.

Output:
- Real local AT capabilities.
- Permission boundary.
- Event boundary.
- Persistent local state foundation.
- Native/runtime capability foundation.


============================================================
PHASE 4 — DATA + PERSISTENCE
============================================================

Goal:
Replace prototype-only state with real local persistence.

Implement according to the locked data architecture.

Areas:
- Application state
- Settings
- Conversations
- Memory
- Tasks
- Context
- Workspace state
- Relevant runtime state

Rules:
- Local-first.
- No unnecessary cloud dependency.
- User data remains outside immutable application resources.
- Do not invent schemas outside the locked architecture.
- Do not store credentials as ordinary memory.
- Preserve user-data boundaries.

Validate:
- Create
- Read
- Update
- Delete
- Persistence
- Recovery
- Migration behavior where applicable
- Data isolation

Output:
- Persistent local ATLAS state.


============================================================
PHASE 5 — AI FOUNDATION
============================================================

Goal:
Implement the locked AI architecture on top of the runtime foundation.

AI modules:

AI-01 LLM Runtime
AI-02 Conversation
AI-03 Context Engine
AI-04 Memory Intelligence
AI-05 Planner
AI-06 Tool Orchestrator
AI-07 Task Manager
AI-08 Reasoning & Verification
AI-09 AI Configuration

Implementation dependency order:

1. AI-09 AI Configuration
2. AI-01 LLM Runtime
3. AI-02 Conversation
4. AI-03 Context Engine
5. AI-04 Memory Intelligence
6. AI-05 Planner
7. AI-06 Tool Orchestrator
8. AI-07 Task Manager
9. AI-08 Reasoning & Verification

This is an implementation order only.

The module architecture remains locked.

LOCAL LLM:

ATLAS uses its local LLM architecture.

Do not introduce OpenCode into the ATLAS runtime.

Do not introduce the ChatGPT-OpenCode MCP bridge into the ATLAS runtime.

OpenCode remains external development tooling.

Output:
- Real local AI interaction.
- Real context handling.
- Real memory integration.
- Real planning.
- Real tool orchestration.
- Real task lifecycle.
- Real verification.


============================================================
PHASE 6 — AI ↔ AT INTEGRATION
============================================================

Goal:
Connect AI reasoning/orchestration to real ATLAS capabilities.

Core flow:

User Request
    ↓
AI-02 Conversation
    ↓
AI-03 Context Engine
    ↓
AI-01 LLM Runtime
    ↓
AI-05 Planner where required
    ↓
AI-06 Tool Orchestrator
    ↓
AT capability
    ↓
AT-16 Permissions where required
    ↓
AT-17 Events
    ↓
AI-08 Verification where required
    ↓
AI-02 / UI

Rules:

- Model output is untrusted.
- Tool requests are validated.
- Permissions cannot be bypassed.
- Tool results do not automatically become trusted instructions.
- Tool success does not automatically equal task success.
- Verification remains evidence-based.

Output:
- AI can safely operate ATLAS capabilities.


============================================================
PHASE 7 — UX ↔ RUNTIME INTEGRATION
============================================================

Goal:
Connect the approved UI to the real ATLAS runtime.

Replace prototype data sources with real runtime data.

Connect:

UX-01 App Shell
UX-02 Interaction System
UX-03 State Visualization
UX-04 Context & Presentation

to:

IPC
 ↓
AT modules
 ↓
AI modules
 ↓
Local persistence / local LLM

Validate:
- Navigation
- Conversations
- Projects/workspaces
- Memory
- Guardian
- Automation
- Settings
- Notifications
- Attachments
- Voice where implemented
- Vision where implemented
- Loading states
- Empty states
- Error states
- Permission states
- Runtime states

Do not redesign the approved UI unless required by an actual architectural
or functional issue.

Output:
- Fully connected ATLAS application UI.


============================================================
PHASE 8 — SECURITY HARDENING
============================================================

Goal:
Validate the complete trust boundaries before declaring ATLAS functional.

Test:

- IPC security
- Preload exposure
- Filesystem permissions
- Process permissions
- Terminal permissions
- Application control permissions
- Workspace isolation
- User-data isolation
- Memory isolation
- Tool argument validation
- Prompt injection
- Malicious tool output
- Sensitive-data handling
- Credential protection
- Local runtime boundaries

Core rule:

Model output NEVER becomes authority.

Model output
→ validation
→ permission
→ execution
→ verification

Output:
- Hardened runtime boundaries.


============================================================
PHASE 9 — INTEGRATION TESTING
============================================================

Goal:
Verify the complete system rather than isolated components.

Testing layers:

1. Unit Tests
2. Integration Tests
3. IPC Tests
4. Runtime Tests
5. AI Tests
6. Data/Persistence Tests
7. Security Tests
8. UI Tests
9. End-to-End Tests

Test representative flows:

FLOW A — Conversation
User
→ UI
→ IPC
→ AI
→ local LLM
→ response
→ UI

FLOW B — Tool Operation
User
→ AI
→ AI-06
→ AT-16
→ AT capability
→ result
→ AI-08
→ UI

FLOW C — Memory
Conversation
→ AI-04
→ AT-08
→ persistent memory
→ future retrieval
→ AI-03
→ model

FLOW D — Task
User goal
→ AI-05
→ AI-07
→ AI-06
→ AT capability
→ AI-08
→ task completion

FLOW E — Workspace
User
→ UX
→ IPC
→ AT-01
→ AT-02
→ workspace/filesystem
→ UI

Output:
- Evidence-backed functional system.


============================================================
PHASE 10 — PRODUCTION BUILD
============================================================

Goal:
Create the validated production build.

Pipeline:

Git State
 ↓
Dependency Validation
 ↓
Environment Validation
 ↓
Type Check
 ↓
Lint
 ↓
Tests
 ↓
Renderer Build
 ↓
Electron Build
 ↓
Preload Build
 ↓
Asset Validation
 ↓
Production Artifact
 ↓
Artifact Verification
 ↓
Smoke Test

Validate:
- No development data
- No secrets
- No debug artifacts
- No unnecessary prototype infrastructure
- Correct assets
- Correct `orb.png`
- Correct production configuration
- Correct Electron runtime
- Correct IPC
- Correct local LLM boundary

Output:
- Verified production build.


============================================================
PHASE 11 — WINDOWS PACKAGING
============================================================

Goal:
Produce the final Windows distributables.

Required release artifacts:

- EXE
- MSI

Use the actual configured packaging system.

Do not invent or switch installer technology without a real project reason.

Validate:

EXE:
- Exists
- Correct version
- Correct identity
- Installs/launches correctly
- Application works
- Uninstall works

MSI:
- Exists where configured
- Correct Windows Installer metadata
- Correct version
- Clean install works
- Upgrade works
- Uninstall works

Preserve user data.

Do not package:
- Development database
- Test data
- Secrets
- OpenCode runtime
- MCP development server
- Developer-specific configuration

Output:
- Validated EXE.
- Validated MSI.


============================================================
PHASE 12 — FINAL WINDOWS VALIDATION
============================================================

Goal:
Verify ATLAS as a real installed Windows application.

Test:

1. Clean installation
2. First launch
3. UI rendering
4. Orb
5. Navigation
6. Conversation
7. Local LLM
8. IPC
9. Workspace
10. Filesystem
11. Permissions
12. Memory
13. Tasks
14. Tool execution
15. Verification
16. Notifications
17. Settings
18. Application shutdown
19. Upgrade
20. Uninstallation

Verify user data survives supported upgrades/uninstall behavior.

Output:
- Windows release validation evidence.


============================================================
PHASE 13 — RELEASE APPROVAL
============================================================

Use:

07_RELEASE/RELEASE_CHECKLIST.md

Final status must be one of:

READY
BLOCKED
CONDITIONAL

READY:
All mandatory checks pass.

BLOCKED:
One or more mandatory checks fail.

CONDITIONAL:
A non-critical known issue is explicitly accepted.

Never mark ATLAS READY based solely on:
- Successful compilation
- A working development server
- A successful UI preview
- A successful AI response

Release readiness requires actual evidence.


============================================================
PHASE 14 — GIT RELEASE
============================================================

Before final release:

- Review Git status.
- Review Git diff.
- Verify intended changes.
- Verify no secrets.
- Verify no generated junk.
- Verify documentation state.
- Verify tests.
- Verify production build.
- Verify EXE/MSI artifacts.
- Record source commit/version.
- Commit the approved release state according to GIT_WORKFLOW.md.

Do not:
- Rewrite history.
- Force-push.
- Delete history.
- Automatically alter unrelated files.


============================================================
IMPLEMENTATION ORDER SUMMARY
============================================================

PHASE 0   Repository Baseline
   ↓
PHASE 1   Engineering Foundation
   ↓
PHASE 2   Lovable UI Migration
   ↓
PHASE 3   AT Runtime Foundation
   ↓
PHASE 4   Data + Persistence
   ↓
PHASE 5   AI Foundation
   ↓
PHASE 6   AI ↔ AT Integration
   ↓
PHASE 7   UX ↔ Runtime Integration
   ↓
PHASE 8   Security Hardening
   ↓
PHASE 9   Integration Testing
   ↓
PHASE 10  Production Build
   ↓
PHASE 11  Windows Packaging
   ↓
PHASE 12  Windows Validation
   ↓
PHASE 13  Release Approval
   ↓
PHASE 14  Git Release


============================================================
NON-NEGOTIABLE ATLAS RULES
============================================================

1. Documentation is LOCKED.

2. Do not expand the module architecture.

3. Do not create modules outside the existing architecture.

4. Do not split existing modules.

5. Do not merge existing modules.

6. Do not create duplicate responsibility modules.

7. Do not introduce OpenCode into ATLAS runtime.

8. Do not introduce MCP into ATLAS runtime.

9. OpenCode/MCP may remain external development tooling only.

10. Preserve the approved Lovable UI foundation.

11. Replace prototype logic with real ATLAS runtime behavior.

12. Keep renderer and privileged runtime separated.

13. Use IPC for privileged renderer/runtime communication.

14. Keep AT modules responsible for their capabilities.

15. Keep AI modules responsible for AI behavior.

16. Keep UX modules responsible for presentation/interaction.

17. Keep REL-01 responsible for packaging/release.

18. Keep permissions under AT-16.

19. Keep verification under AI-08.

20. Keep task lifecycle under AI-07.

21. Keep tool orchestration under AI-06.

22. Keep context construction under AI-03.

23. Keep memory intelligence under AI-04.

24. Keep LLM runtime under AI-01.

25. Keep AI configuration under AI-09.

26. Never treat model output as authority.

27. Never treat tool success as automatic task success.

28. Never package user data.

29. Never package secrets.

30. Never claim a feature/test/build/release is complete without evidence.

31. Every meaningful implementation stage must be recoverable through Git.

32. If something is unclear, inspect the existing project and locked
    documentation before inventing an answer.

33. If the implementation contradicts the locked architecture, STOP and
    resolve the contradiction instead of silently changing the architecture.

FINAL IMPLEMENTATION PRINCIPLE:

BUILD WHAT IS LOCKED.

DO NOT EXPAND WHAT IS LOCKED.

IMPLEMENT → TEST → VERIFY → COMMIT.

Only after the implementation is genuinely complete:
BUILD → PACKAGE → VALIDATE → RELEASE.