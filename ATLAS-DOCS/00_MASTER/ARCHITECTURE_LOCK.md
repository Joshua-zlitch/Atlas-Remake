Write the complete content for `00_MASTER/ARCHITECTURE_LOCK.md`.

This is the LOCKED architectural constraint document for the new ATLAS rebuild.

Use the following decisions as authoritative:

- ATLAS is being rebuilt completely from scratch.
- The old ATLAS architecture is historical reference only.
- Core ATLAS contains exactly 30 modules:
  - UX: 4
  - AT: 17
  - AI: 9
- The 4 UX modules are:
  - UX-01 App Shell
  - UX-02 Interaction System
  - UX-03 State Visualization
  - UX-04 Context & Presentation
- The 17 AT modules are:
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
- The 9 AI modules are:
  - AI-01 LLM Runtime
  - AI-02 Conversation
  - AI-03 Context Engine
  - AI-04 Memory Intelligence
  - AI-05 Planner
  - AI-06 Tool Orchestrator
  - AI-07 Task Manager
  - AI-08 Reasoning & Verification
  - AI-09 AI Configuration
- There is exactly one post-development release module:
  - REL-01 Packaging & Release
- Core = 30 modules.
- Total including release = 31 modules.
- REL-01 is responsible for Windows EXE and MSI packaging and final installation verification.
- The existing Lovable React prototype is the official UI foundation and should be reused rather than recreating the UI from scratch.
- ATLAS is local-first.
- The ATLAS runtime uses a local LLM architecture, initially based on Ollama.
- OpenCode is external development infrastructure only. It is NOT part of the ATLAS runtime.
- ChatGPT is the Planner/Reviewer and OpenCode is the Code Engineer during development.
- Git is mandatory for development and implementation evidence.
- ATLAS uses a structured engineering prompt/report protocol.
- No new ATLAS modules may be invented.
- No module may be split, merged, renamed, removed, or added without explicit authorization from the project owner.
- No additional documentation categories or architectural layers may be introduced without explicit authorization.
- Old ATLAS architecture and documentation must not override the new locked architecture.
- If implementation conflicts with this document, the conflict must be reported rather than silently changing the architecture.

The document must clearly distinguish:
1. Locked architecture.
2. Locked module allocation.
3. Runtime boundaries.
4. Development-tool boundaries.
5. UI foundation.
6. Git and development constraints.
7. Change-control rules.

Do not invent additional modules, categories, technologies, or architectural decisions.

Keep this document authoritative, concise, and suitable as a permanent guardrail for ChatGPT, GitHub Copilot, and OpenCode.