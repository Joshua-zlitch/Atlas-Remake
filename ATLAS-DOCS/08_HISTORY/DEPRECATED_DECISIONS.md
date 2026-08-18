Write the complete specification for `08_HISTORY/DEPRECATED_DECISIONS.md`.

This document records ATLAS architectural, product, engineering, AI, UI, and
implementation decisions that were previously considered, used, or planned
but are no longer authoritative.

IMPORTANT:

- This is a historical record.
- Do not use this document to create new architecture.
- Do not revive deprecated modules, systems, workflows, or decisions.
- The current locked documentation is always authoritative over this history.
- Do not create new modules.
- Do not modify the locked 30-core-module architecture.
- Do not introduce OpenCode or MCP into the ATLAS runtime.
- OpenCode remains external development/code-engineering tooling only.

The document MUST cover:

1. Purpose
2. Historical Decision Recording Principles
3. Authority Rules
4. Deprecated Architecture Decisions
5. Deprecated Module Decisions
6. Deprecated UI/UX Decisions
7. Deprecated AI Decisions
8. Deprecated Runtime Decisions
9. Deprecated Technology Decisions
10. Deprecated Integration Decisions
11. Deprecated Tooling Decisions
12. Deprecated Workflow Decisions
13. Deprecated Release Decisions
14. Reasons for Deprecation
15. Replacement Decision
16. Migration Status
17. Historical Context
18. Lessons from Deprecated Decisions
19. Git Traceability
20. Decision Record Format
21. Acceptance Criteria
22. Definition of Done

AUTHORITY RULE:

Historical decisions must never override:

- `00_MASTER`
- `01_PRODUCT`
- `02_ARCHITECTURE`
- `03_MODULES`
- `04_UI`
- `05_ENGINEERING`
- `06_AI`
- `07_RELEASE`

If a historical decision conflicts with a current locked document, the current
locked document wins.

PURPOSE:

The purpose of this document is to prevent old decisions from being
mistakenly reintroduced during future development.

Each deprecated decision should explain:

- What the previous decision was.
- Why it existed.
- Why it was deprecated.
- What replaced it.
- Whether migration was completed.
- Where the authoritative replacement is documented.

DO NOT:

- Invent historical decisions.
- Invent reasons for decisions.
- Claim that a migration occurred without evidence.
- Rewrite history to make previous decisions appear incorrect.
- Treat deprecated decisions as current requirements.

DECISION RECORD FORMAT:

For each deprecated decision use:

Decision ID:
Title:
Previous Decision:
Status:
Reason for Deprecation:
Replacement:
Current Authority:
Migration Status:
Historical Notes:

STATUS VALUES:

Use only appropriate statuses such as:

- DEPRECATED
- REPLACED
- MIGRATED
- PARTIALLY_MIGRATED
- RETAINED_FOR_HISTORY

Do not mark something migrated without evidence.

CURRENT ARCHITECTURE:

The current ATLAS architecture remains locked at:

- 30 core modules
- REL-01 Packaging & Release

Do not revive previous module structures.

HISTORICAL AI DECISIONS:

Historical AI approaches must not override the current local-first AI
architecture.

Do not reintroduce deprecated external AI runtime decisions.

OpenCode must remain documented as external development tooling rather than
an ATLAS runtime component.

HISTORICAL UI DECISIONS:

Historical UI approaches must not override the current Lovable-based UI
integration strategy.

Do not revive abandoned UI structures merely because they appear in older
planning.

GIT:

Historical decisions should remain traceable through Git where evidence
exists.

Do not rewrite Git history.

Do not invent commit hashes.

Do not claim a commit introduced a decision unless the repository provides
evidence.

ACCEPTANCE CRITERIA:

The document is complete when:

- Historical decisions are clearly separated from current decisions.
- Deprecated architecture cannot be mistaken for active architecture.
- Replacement decisions are identifiable.
- Migration status is explicit.
- Unsupported historical claims are not invented.
- Git traceability is preserved where available.
- Current locked documents remain authoritative.

This document is a historical record only.