Write the complete content for `01_PRODUCT/USER_FLOWS.md`.

This document defines the major user-facing workflows of the new ATLAS system.

Use the locked architecture:

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

Document the major user flows, including:

1. Application startup
2. Starting a conversation
3. Simple conversational request
4. Context-aware request
5. Memory creation
6. Memory retrieval
7. Workspace interaction
8. File reading
9. File creation/modification
10. Terminal command execution
11. Application control
12. Multi-step task execution
13. Permission-required operation
14. Permission-denied operation
15. Task failure and recovery
16. Task verification
17. Automation creation
18. Automation execution
19. Notification delivery
20. Voice interaction
21. Vision/image input
22. Guardian/system-status request
23. File attachment workflow
24. Search and retrieval workflow
25. Application shutdown
26. Final production packaging workflow

For each workflow, describe:

- User intent
- Initial UI interaction
- Relevant AI processing
- Relevant AT capabilities
- Permission checks where applicable
- Execution
- Verification
- Result presented to the user
- Failure behavior where applicable

Use a consistent format such as:

User
→ UX
→ AI
→ Context
→ Planning
→ Tool Orchestration
→ Permission
→ AT Capability
→ Result
→ Verification
→ UX Result

Do not force every workflow through every module. Simple requests should
remain simple. Only use modules that are actually required by the workflow.

Important rules:

- ATLAS is local-first.
- The initial LLM runtime is Ollama.
- OpenCode is NOT involved in runtime user flows.
- OpenCode is development infrastructure only.
- AI must not bypass AT-16 Permissions.
- Important actions should be verified where applicable.
- Failed operations must be reported honestly.
- User control must be preserved.
- Do not invent additional modules or services.

Keep this document focused on user experience and system-level flow.
Detailed implementation contracts belong in `03_MODULES/`.
Detailed technical architecture belongs in `02_ARCHITECTURE/`.
