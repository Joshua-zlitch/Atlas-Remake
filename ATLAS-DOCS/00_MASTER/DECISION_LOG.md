Write the complete content for `00_MASTER/DECISION_LOG.md`.

This document records the major decisions made for the new ATLAS rebuild.

Use only the following established decisions:

1. ATLAS is being completely rebuilt from scratch.
2. The previous ATLAS implementation is not the implementation foundation.
3. The old ATLAS documentation is historical reference material only.
4. The old 113-module architecture will not be recreated.
5. The new core architecture contains exactly:
   - UX: 4 modules
   - AT: 17 modules
   - AI: 9 modules
   - Core total: 30 modules
6. The only additional module is:
   - REL-01 Packaging & Release
7. Total modules including release = 31.
8. The existing Lovable React prototype is the UI foundation and will be reused.
9. ATLAS is local-first.
10. The initial local LLM runtime is Ollama.
11. OpenCode is external development infrastructure only and is NOT part of the ATLAS runtime.
12. ChatGPT acts as Planner/Reviewer during development.
13. OpenCode acts as Code Engineer during development.
14. ChatGPT and OpenCode communicate through the dedicated MCP development bridge.
15. Git is mandatory for ATLAS development.
16. Development uses the ATLAS structured meta-prompt, JSON task packet, and JSON engineering report workflow.
17. Verification is required before implementation can be reported as complete.
18. REL-01 must produce Windows EXE and MSI packaging artifacts and verify installation.
19. The documentation structure is locked to:
   - 00_MASTER
   - 01_PRODUCT
   - 02_ARCHITECTURE
   - 03_MODULES
   - 04_UI
   - 05_ENGINEERING
   - 06_AI
   - 07_RELEASE
   - 08_HISTORY
20. No new modules, documentation categories, architectural layers, or structural changes may be introduced without explicit authorization from the project owner.

Use a clear decision-record format.

Each decision should contain:

- Decision ID
- Date
- Title
- Status
- Decision
- Reason
- Alternatives Considered
- Consequences
- Related Documents

Clearly mark architectural decisions that are LOCKED.

Include a section explaining the difference between:
- LOCKED decisions
- ACCEPTED decisions
- SUPERSEDED decisions
- REJECTED decisions

Do not invent additional decisions, technologies, modules, or requirements.

Do not change the locked module allocation.

The document should preserve the reasoning behind the current ATLAS architecture so that future development agents cannot accidentally revive decisions from the failed implementation.