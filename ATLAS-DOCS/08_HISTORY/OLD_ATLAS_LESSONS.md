Write the complete specification for `08_HISTORY/OLD_ATLAS_LESSONS.md`.

This document records lessons learned from previous ATLAS development,
experiments, prototypes, architectural iterations, and implementation
attempts.

IMPORTANT:

- This is a historical lessons document.
- Do not create new modules.
- Do not create new architecture layers.
- Do not modify the locked 30-core-module architecture.
- Do not introduce OpenCode or MCP into the ATLAS runtime.
- OpenCode remains external development/code-engineering tooling only.
- Do not invent historical events, failures, decisions, or lessons.
- Only record lessons supported by actual ATLAS history, project evidence,
  previous documentation, or verified development experience.
- Current locked documentation remains authoritative over historical lessons.

The document MUST cover:

1. Purpose
2. Historical Lesson Principles
3. Source of Lessons
4. Lesson Record Format
5. Architecture Lessons
6. Module Design Lessons
7. UI/UX Lessons
8. Lovable Prototype Lessons
9. AI Lessons
10. Local LLM Lessons
11. Tool Orchestration Lessons
12. IPC Lessons
13. Electron Lessons
14. Storage Lessons
15. Security Lessons
16. Git Lessons
17. Testing Lessons
18. Build Lessons
19. Release Lessons
20. Common Failure Patterns
21. Repeated Mistakes to Avoid
22. Practices That Worked
23. Practices That Failed
24. Lessons Applied to Current ATLAS
25. Historical vs Current Authority
26. Acceptance Criteria
27. Definition of Done

PURPOSE:

Capture useful lessons from previous ATLAS development so that future
implementation does not repeat known mistakes.

A lesson should explain:

- What happened.
- What was learned.
- Why it matters.
- How the lesson affects future work.

Do not turn every historical event into an architectural requirement.

LESSON RECORD FORMAT:

For each lesson use:

Lesson ID:
Title:
Area:
Historical Context:
What Happened:
Lesson Learned:
Impact:
Current Application:
Evidence:
Status:

STATUS VALUES:

Use appropriate statuses such as:

- RECORDED
- APPLIED
- PARTIALLY_APPLIED
- SUPERSEDED

Do not mark a lesson as applied without evidence.

ARCHITECTURE LESSONS:

Record lessons concerning:

- Uncontrolled architecture expansion
- Duplicate responsibilities
- Unnecessary modules
- Unclear ownership
- Mixing UI, AI, AT, and runtime responsibilities

The current locked architecture must remain authoritative.

MODULE LESSONS:

Record lessons about:

- Keeping module responsibilities clear.
- Avoiding duplicate modules.
- Avoiding unnecessary abstraction.
- Preventing module-count expansion.
- Maintaining clear ownership boundaries.

Do not create new modules based on lessons.

UI/UX LESSONS:

Record lessons from previous ATLAS UI development and prototype work.

Where supported by actual history, document lessons concerning:

- Prototype reuse
- UI consistency
- Component reuse
- Avoiding unnecessary UI rewrites
- Preserving approved design decisions

The current Lovable prototype integration strategy remains authoritative.

Do not treat old UI experiments as current requirements.

AI LESSONS:

Record actual lessons concerning:

- Local LLM usage
- Context management
- Memory
- Model selection
- Tool orchestration
- Planning
- Verification
- AI/runtime boundaries

Do not use historical lessons to introduce OpenCode or MCP into ATLAS.

LOCAL LLM LESSONS:

Record verified lessons about:

- Local runtime availability
- Model availability
- Hardware/resource constraints
- Context limitations
- Runtime failures
- Model failures

Do not invent specific hardware or model requirements.

TOOL ORCHESTRATION LESSONS:

Record lessons concerning:

- Tool validation
- Permission boundaries
- Untrusted model output
- Tool failures
- Verification
- Safe retries
- Tool chaining

Do not move tool ownership outside the existing AI-06 architecture.

IPC LESSONS:

Record verified lessons concerning:

- Renderer/runtime separation
- Preload boundaries
- IPC validation
- Privileged operations
- Security boundaries

Do not invent IPC channels.

ELECTRON LESSONS:

Record lessons concerning:

- Main process
- Renderer process
- Preload
- Native capabilities
- Production behavior
- Windows-specific behavior

Only record lessons supported by actual development evidence.

STORAGE LESSONS:

Record lessons concerning:

- SQLite/local persistence
- User-data separation
- Development vs production data
- Migration
- Data preservation
- Context and memory storage

Do not invent schemas.

SECURITY LESSONS:

Record verified lessons concerning:

- Permission boundaries
- Filesystem access
- Process execution
- Terminal access
- IPC security
- Prompt injection
- Sensitive data
- Tool execution

Security lessons must not weaken the existing locked security architecture.

GIT LESSONS:

Record lessons concerning:

- Branching
- Commits
- Working-tree management
- Change tracking
- Recovery
- Avoiding accidental loss
- Keeping documentation synchronized with implementation

Do not invent Git history.

TESTING LESSONS:

Record lessons concerning:

- Testing before declaring completion
- Build verification
- Runtime verification
- UI testing
- AI testing
- IPC testing
- Security testing
- Windows testing

Do not claim a test was performed without evidence.

BUILD LESSONS:

Record lessons concerning:

- Development vs production differences
- Dependency issues
- Native modules
- Electron packaging
- Asset handling
- Production configuration

Do not invent build failures.

RELEASE LESSONS:

Record verified lessons concerning:

- EXE packaging
- MSI packaging
- Installation
- Upgrades
- Uninstallation
- User-data preservation
- Windows compatibility

Do not claim an artifact existed or was tested unless evidence supports it.

COMMON FAILURE PATTERNS:

Only record failure patterns that actually occurred during ATLAS development.

For each pattern explain:

- What happened.
- Why it happened.
- How it should be prevented.

Do not manufacture failures merely to fill this section.

REPEATED MISTAKES:

Document recurring mistakes only when they are supported by actual history.

Examples may include:

- Architecture expansion
- Duplicate documentation
- Unverified assumptions
- Invented APIs
- Unnecessary rewrites
- Skipping verification

Only include examples that actually occurred.

PRACTICES THAT WORKED:

Record approaches that produced useful results.

Examples may include:

- Reusing existing working code.
- Keeping architecture documentation locked.
- Validating actual project configuration.
- Testing before claiming completion.
- Using Git to preserve recoverability.

Only include practices supported by actual ATLAS experience.

PRACTICES THAT FAILED:

Record approaches that caused problems.

For each:

- Identify the approach.
- Explain the observed problem.
- Record the lesson.
- Identify the current replacement where one exists.

Do not exaggerate historical failures.

LESSONS APPLIED TO CURRENT ATLAS:

Connect historical lessons to the current locked architecture only when the
connection is supported.

Examples:

Historical lesson
→ current architectural safeguard

Historical failure
→ current engineering rule

Historical UI problem
→ current UI constraint

Historical release problem
→ current release checklist

Do not silently convert historical lessons into new requirements.

HISTORICAL VS CURRENT AUTHORITY:

This document is informational.

The authority order is:

Current locked documentation
>
Current implementation
>
Historical migration/decision records
>
Historical lessons

If this document conflicts with current ATLAS documentation, the current
documentation wins.

Do not revive deprecated architecture because an old lesson describes it.

DO NOT INVENT HISTORY:

Never fabricate:

- Dates
- People
- Commits
- Branches
- Bugs
- Features
- Architecture decisions
- Tool usage
- Migration events
- Testing results
- Release artifacts

When evidence is unavailable, state that the historical record does not
establish the fact.

GIT:

Where lessons can be tied to actual Git history, preserve that traceability.

Do not invent commit hashes or Git events.

Do not rewrite Git history.

ACCEPTANCE CRITERIA:

The document is complete when:

- Historical lessons are clearly separated from current requirements.
- Lessons are evidence-based.
- Useful failure patterns are recorded.
- Successful practices are recorded.
- Lessons from UI, AI, AT, Electron, IPC, Git, testing, and release work are
  captured where evidence exists.
- Historical information cannot override current architecture.
- No new modules are introduced.
- No new architecture is introduced.
- Unsupported historical claims are not invented.

This document is a historical lessons record only.