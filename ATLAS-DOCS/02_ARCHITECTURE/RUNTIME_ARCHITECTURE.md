Write the complete content for `02_ARCHITECTURE/RUNTIME_ARCHITECTURE.md`.

This document defines how the ATLAS application actually runs on the local
computer.

Use the locked architecture:

- Electron desktop application
- React renderer
- Node.js main/runtime
- SQLite local persistence
- Ollama local LLM runtime
- Local operating-system capabilities
- IPC between renderer and main/runtime

ATLAS is local-first.

Define the runtime responsibilities of:

1. Electron main process
2. React renderer
3. IPC layer
4. ATLAS runtime services
5. AI layer
6. AT layer
7. SQLite
8. Ollama
9. Operating-system interfaces

Use a structure similar to:

User
↓
React Renderer
↓
Controlled IPC
↓
Electron Main / ATLAS Runtime
├── AI
├── AT
├── Persistence
├── System Integration
└── Event Runtime

The renderer must never directly perform privileged system operations.

Explain the lifecycle:

1. Application startup
2. Runtime initialization
3. Database initialization
4. Ollama availability detection
5. Module initialization
6. IPC initialization
7. UI readiness
8. Runtime operation
9. Application shutdown

Define startup failure behavior for important dependencies.

For example:
- SQLite initialization failure
- Ollama unavailable
- IPC initialization failure
- Runtime module initialization failure

The document should explain graceful degradation where appropriate.

Define the runtime task lifecycle:

Request
→ Context
→ Plan
→ Permission
→ Execution
→ Result
→ Verification
→ Response

Explain how background tasks and automation fit into the runtime.

Explain how runtime events are communicated without allowing uncontrolled
cross-module state mutation.

Define basic lifecycle states such as:

- STARTING
- READY
- BUSY
- WAITING
- ERROR
- SHUTTING_DOWN
- STOPPED

Explain how the UI can observe runtime state without directly owning it.

Define the relationship between runtime state and UX-03 State Visualization.

Explain how AT-17 Event Runtime coordinates internal events.

Explain how AT-16 Permissions remains a security boundary.

Explain how AI-06 Tool Orchestrator invokes AT capabilities through controlled
interfaces.

Explain how AI-08 Reasoning & Verification receives relevant operation
results.

Include shutdown behavior:

- Stop active work where safely possible
- Persist required state
- Close database connections
- Stop runtime resources
- Close IPC
- Exit cleanly

Important constraints:

- Do not add new ATLAS modules.
- Do not introduce microservices.
- Do not make OpenCode part of the runtime.
- Do not make MCP part of the ATLAS runtime architecture.
- Do not assume cloud services.
- Do not invent exact implementation details that have not been decided.
- Keep the document focused on runtime behavior and lifecycle.

The final document must provide a clear implementation-level understanding of
how the ATLAS desktop application starts, operates, communicates internally,
handles tasks, and shuts down.