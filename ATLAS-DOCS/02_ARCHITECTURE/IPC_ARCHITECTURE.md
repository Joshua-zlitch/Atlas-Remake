Write the complete content for `02_ARCHITECTURE/IPC_ARCHITECTURE.md`.

This document defines the communication boundary between the React renderer
and the Electron/Node.js ATLAS runtime.

LOCKED CONTEXT:

- ATLAS is an Electron desktop application.
- React is used for the renderer/UI.
- Node.js is used by the Electron main/runtime side.
- The existing Lovable React prototype is reused as the UI foundation.
- The renderer must not directly perform privileged system operations.
- IPC is the controlled communication boundary.
- ATLAS is local-first.
- OpenCode is NOT part of the runtime.
- MCP is NOT an ATLAS runtime communication layer.
- The 30-module core architecture must remain unchanged.

Define:

1. Purpose of IPC
2. Renderer responsibilities
3. Main/runtime responsibilities
4. IPC security boundary
5. Request/response communication
6. Event communication
7. Streaming communication where required
8. Error propagation
9. Permission-related communication
10. AI interaction communication
11. Task progress communication
12. Runtime-state communication
13. Shutdown behavior

Use the high-level architecture:

React Renderer
    |
    | Controlled IPC
    v
Electron Main / ATLAS Runtime
    |
    +--> AI
    +--> AT
    +--> SQLite
    +--> OS capabilities

Explain that the renderer should request capabilities rather than directly
accessing:

- Filesystem
- Terminal
- Processes
- SQLite
- OS APIs
- Protected system operations

Define the conceptual IPC request lifecycle:

Renderer
→ IPC Request
→ Validation
→ Runtime Handler
→ Module Interface
→ Operation
→ Result
→ IPC Response
→ Renderer

Define the conceptual IPC event lifecycle:

Runtime Event
→ IPC Event
→ Renderer
→ UX state update

Examples:

- AI state changed
- Task progress changed
- Notification received
- Guardian warning
- Automation triggered
- Operation completed
- Operation failed

Define IPC validation requirements:

- Validate input shape.
- Reject malformed requests.
- Validate capability identifiers.
- Avoid trusting renderer input.
- Do not expose unrestricted Node.js APIs.
- Do not expose unrestricted filesystem access.
- Do not expose unrestricted shell access.

Define error handling.

Errors should be represented in a structured way that allows the renderer to
distinguish:

- Validation error
- Permission denied
- Runtime error
- Capability unavailable
- Operation failure
- Cancellation
- Timeout

Do not invent the final TypeScript interfaces or channel names yet.

Define IPC security principles:

- Minimal exposed surface
- Explicit capability interfaces
- No unrestricted `eval`
- No unrestricted shell execution from renderer
- No direct Node.js access from renderer
- Context isolation should be enabled
- Preload should expose only approved APIs
- Sensitive operations remain in the main/runtime process

Explain the relationship with AT-16 Permissions.

Example:

Renderer
→ requests sensitive operation
→ runtime validates request
→ AT-16 evaluates permission
→ operation allowed/denied
→ result returned to renderer

Explain AI communication:

Renderer
→ AI request
→ runtime
→ AI layer
→ optional AT operations
→ AI result
→ renderer

The renderer should not directly communicate with Ollama.

AI-01 LLM Runtime owns communication with Ollama.

Explain task streaming:

For long-running tasks, the renderer may receive progress events such as:

- Task started
- Planning
- Waiting for permission
- Executing
- Verifying
- Completed
- Failed

The actual event schema should be defined later during implementation.

Define cancellation behavior.

A user should be able to request cancellation of supported operations.

Cancellation must be handled by the owning runtime/task component rather than
being treated as a forced process termination.

Define IPC lifecycle:

Startup:
Runtime initializes
→ IPC initializes
→ approved renderer APIs become available

Shutdown:
Stop accepting new requests
→ notify renderer
→ safely finish/cancel supported operations
→ close resources
→ close IPC

Define testing requirements for IPC:

- Valid requests
- Invalid requests
- Unauthorized requests
- Permission denial
- Runtime failures
- Renderer isolation
- Event delivery
- Cancellation
- Shutdown behavior

Do not create an IPC module.

IPC is an architectural communication mechanism, not an additional ATLAS
module.

Do not add modules.

Do not introduce a network server or microservice architecture for internal
renderer/main communication.

Do not involve OpenCode or MCP in ATLAS runtime IPC.

Keep this document focused on the communication contract and security
boundary. Exact channel names and implementation APIs belong to the
implementation stage.