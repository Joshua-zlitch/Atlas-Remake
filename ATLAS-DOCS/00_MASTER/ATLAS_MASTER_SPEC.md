Write the complete content for `00_MASTER/ATLAS_MASTER_SPEC.md`.

This is the primary high-level specification for the new ATLAS rebuild.

Use the locked architecture as the source of truth:

- ATLAS is a local-first desktop AI system.
- ATLAS is rebuilt completely from scratch.
- Core architecture contains exactly 30 modules:
  - 4 UX
  - 17 AT
  - 9 AI
- One additional post-development module exists:
  - REL-01 Packaging & Release
- Total project modules including release = 31.
- The existing Lovable React prototype is reused as the UI foundation.
- The local AI runtime is initially based on Ollama.
- OpenCode is external development infrastructure and is not part of the ATLAS runtime.
- Git is mandatory.
- ChatGPT acts as Planner/Reviewer.
- OpenCode acts as Code Engineer.
- Development uses a structured ATLAS task/report protocol.
- Windows EXE and MSI packaging are required at release.

Describe ATLAS at the system level, including:

1. Project definition
2. Product goal
3. Core principles
4. High-level architecture
5. UX layer
6. AT layer
7. AI layer
8. AI execution flow
9. Memory flow
10. Tool execution flow
11. Guardian
12. Automation
13. Voice
14. Vision
15. Permissions and safety
16. Event runtime
17. Local data architecture
18. Local AI architecture
19. Lovable UI integration
20. Development architecture
21. ChatGPT → MCP → OpenCode development workflow
22. Git workflow at a high level
23. Testing philosophy
24. Release architecture
25. Non-goals
26. Definition of Done
27. Final architecture summary

Use these exact module allocations:

UX:
UX-01 App Shell
UX-02 Interaction System
UX-03 State Visualization
UX-04 Context & Presentation

AT:
AT-01 Workspace
AT-02 Filesystem
AT-03 Process
AT-04 Terminal
AT-05 Application Control
AT-06 System Information
AT-07 Guardian
AT-08 Memory
AT-09 Context Store
AT-10 Search & Retrieval
AT-11 Automation
AT-12 Notifications
AT-13 Files & Attachments
AT-14 Voice
AT-15 Vision
AT-16 Permissions
AT-17 Event Runtime

AI:
AI-01 LLM Runtime
AI-02 Conversation
AI-03 Context Engine
AI-04 Memory Intelligence
AI-05 Planner
AI-06 Tool Orchestrator
AI-07 Task Manager
AI-08 Reasoning & Verification
AI-09 AI Configuration

Release:
REL-01 Packaging & Release

Clearly separate:
- ATLAS runtime architecture
- Development architecture
- OpenCode's role
- UI prototype reuse
- Local AI
- Release packaging

Do not introduce additional modules, services, layers, cloud infrastructure, or architectural concepts that have not been authorized.

Do not recreate the previous ATLAS architecture.

The document must serve as the high-level source of truth from which the later product, architecture, engineering, AI, UI, module, and release documentation will be derived.