Write the complete content for `02_ARCHITECTURE/SYSTEM_ARCHITECTURE.md`.

This document defines the high-level technical architecture of the new ATLAS rebuild.

Use only the already locked architecture.

ATLAS CORE:
- UX = 4 modules
- AT = 17 modules
- AI = 9 modules
- Core = 30 modules

RELEASE:
- REL-01 Packaging & Release
- Total including release = 31 modules

CURRENT ARCHITECTURAL DIRECTION:

Frontend:
- React
- Existing Lovable React prototype reused as the UI foundation

Desktop/runtime:
- Electron
- Node.js runtime

AI:
- Local-first
- Ollama as the initial local LLM runtime

Persistence:
- SQLite as the local database

Development:
- Git
- ChatGPT as Planner/Reviewer
- OpenCode as external Code Engineer through the dedicated MCP bridge

IMPORTANT:
OpenCode is NOT part of the ATLAS runtime.

Describe the architecture using the following major boundaries:

1. ATLAS application boundary
2. React renderer/UI boundary
3. Electron main/runtime boundary
4. IPC boundary
5. UX layer
6. AT layer
7. AI layer
8. Local persistence layer
9. Local LLM layer
10. Operating-system integration boundary
11. Security/permission boundary
12. Release boundary

Include a high-level architecture diagram showing:

User
→ React UI
→ Electron IPC
→ ATLAS Main Runtime
→ AI / AT / Storage / System capabilities

Show the relationship between:

UX
AT
AI
SQLite
Ollama
Operating System

Clearly define responsibilities of the renderer and main process.

The renderer must not directly perform privileged filesystem, process,
terminal, database, or operating-system operations.

The main/runtime side owns privileged operations and exposes controlled
interfaces to the renderer.

Explain the general request flow:

User
→ UX
→ AI
→ Context
→ Planner
→ Tool Orchestrator
→ Permissions
→ AT capability
→ Result
→ Verification
→ UX

Explain that not every request requires every layer.

Include architectural boundaries for:

- UI state
- AI state
- application state
- persistent data
- system operations
- permissions
- events

Explain how AT-17 Event Runtime fits into the architecture without turning it
into an uncontrolled global state system.

Explain how AI modules interact with AT modules.

Use these important relationships:

AI-05 Planner
→ AI-06 Tool Orchestrator
→ AT-16 Permissions
→ AT capability

AI-08 Reasoning & Verification
→ verifies relevant results

AT-08 Memory
↔ AI-04 Memory Intelligence
↔ AI-03 Context Engine

AT-06 System Information
→ AT-07 Guardian

AT-11 Automation
→ AT-12 Notifications where appropriate

AT-14 Voice and AT-15 Vision provide input/output capabilities to the AI
system but do not own the core reasoning layer.

Include the principle that module boundaries are logical architectural
boundaries. Internal services, repositories, utilities, adapters, classes,
and functions do not automatically become new ATLAS modules.

Do not add new modules.

Do not create microservices.

Do not introduce cloud infrastructure.

Do not include OpenCode as a runtime dependency.

Do not change the locked module architecture.

Do not invent exact package versions unless they are explicitly known from
the actual project.

Keep this document at system-architecture level. Detailed implementation
contracts belong in `03_MODULES/`.