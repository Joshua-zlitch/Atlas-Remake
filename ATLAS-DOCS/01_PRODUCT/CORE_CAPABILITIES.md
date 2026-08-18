Write the complete content for `01_PRODUCT/CORE_CAPABILITIES.md`.

This document defines the concrete capabilities ATLAS is intended to provide.

Use the locked ATLAS architecture as the source of truth:

CORE:
- UX = 4 modules
- AT = 17 modules
- AI = 9 modules
- Core total = 30 modules

RELEASE:
- REL-01 Packaging & Release
- Total including release = 31 modules

The capabilities should be organized into clear functional groups.

Cover the following capability areas:

1. Conversational AI
2. Local LLM execution
3. Context management
4. Persistent memory
5. Workspace management
6. Filesystem operations
7. Process management
8. Terminal execution
9. Application control
10. System information
11. Guardian/system monitoring
12. Search and retrieval
13. Automation
14. Notifications
15. Files and attachments
16. Voice
17. Vision
18. Permissions and authorization
19. Event/runtime coordination
20. Task planning
21. Tool orchestration
22. Task management
23. Reasoning and verification
24. AI configuration
25. UI state and interaction
26. EXE packaging
27. MSI packaging

For each capability, explain:

- What the capability does
- Why ATLAS needs it
- Which ATLAS module owns the capability
- What the capability can interact with
- Important boundaries or restrictions

Use the exact module ownership:

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

Release:
- REL-01 Packaging & Release

Clearly distinguish between:
- AI capabilities
- Computer capabilities
- UI capabilities
- Release capabilities

Important boundaries:

- ATLAS is local-first.
- Local AI initially uses Ollama.
- OpenCode is not an ATLAS capability and must not appear as a runtime capability.
- OpenCode is development infrastructure only.
- AI does not directly bypass AT modules.
- Sensitive computer actions pass through AT-16 Permissions.
- Important actions should be verified through AI-08 Reasoning & Verification where applicable.
- REL-01 is a post-development release capability and does not become part of the runtime's core 30 modules.

Do not invent new ATLAS modules.

Do not introduce cloud services or capabilities that have not been established.

Do not turn implementation details into new product capabilities.

The document should describe what ATLAS can do from a product perspective, while leaving detailed technical implementation to the architecture and module documents.
