Write the complete content for `02_ARCHITECTURE/SECURITY_ARCHITECTURE.md`.

This document defines the security boundaries and safety architecture of the
new ATLAS rebuild.

Use only the established ATLAS architecture.

LOCKED CONTEXT:

- ATLAS is a local-first desktop application.
- Electron is the desktop runtime.
- React is the renderer/UI.
- Node.js is used by the main/runtime side.
- IPC is the controlled renderer-to-runtime boundary.
- SQLite is the local persistence layer.
- Ollama is the initial local LLM runtime.
- AT-16 Permissions is the primary ATLAS permission boundary.
- AT-07 Guardian is responsible for system health and warning capabilities.
- AI-06 Tool Orchestrator coordinates AI-initiated tool execution.
- AI-08 Reasoning & Verification evaluates relevant results.
- OpenCode is development infrastructure only.
- OpenCode is NOT part of the ATLAS runtime.
- MCP is NOT part of the ATLAS runtime architecture.
- No additional ATLAS security module may be created.

Define the security model across these boundaries:

1. Renderer security
2. Electron/main-process security
3. IPC security
4. AI security
5. Tool execution security
6. Permission security
7. Filesystem security
8. Terminal security
9. Process security
10. Application-control security
11. Database security
12. Memory security
13. Attachment security
14. Voice/vision input security
15. Automation security
16. Guardian/security monitoring relationship
17. Logging security
18. Sensitive-data handling
19. Git/development security
20. Release/install security

Explain the renderer security model.

The renderer must not receive unrestricted access to:

- Node.js
- Filesystem
- Shell
- Process management
- SQLite
- Operating-system APIs

Use the principle:

Renderer
→ restricted preload/API
→ controlled IPC
→ main/runtime
→ approved capability

Explain that context isolation and a minimal exposed API surface should be
used.

---

# PERMISSIONS

Define AT-16 Permissions as the authorization boundary for protected
operations.

Use this general flow:

User/AI Request
→ Capability Request
→ AT-16 Permissions
→ Allow / Deny / Require Approval
→ Operation

Explain that AI-generated instructions do not automatically grant
permission.

The AI must not bypass AT-16.

The renderer must not bypass AT-16.

Internal modules must respect permission decisions.

Define permission considerations for:

- Filesystem writes/deletes
- Terminal commands
- Process control
- Application control
- Automation
- Sensitive data access
- Other potentially destructive operations

Do not invent a final permission policy matrix yet.

---

# AI SECURITY

Define security boundaries around the LLM.

The LLM should be treated as an intelligence component, not as a trusted
authority.

Important principles:

- AI output is not automatically trusted.
- AI cannot directly execute arbitrary OS operations.
- AI tool requests must pass through controlled interfaces.
- Sensitive context should not be unnecessarily included in prompts.
- Tool results should be treated as data, not executable instructions.
- User permissions remain authoritative.
- System rules cannot be overridden by AI-generated text.

Use:

AI-05 Planner
→ AI-06 Tool Orchestrator
→ AT-16 Permissions
→ AT Capability

---

# TOOL EXECUTION SECURITY

Define safe handling of:

- Files
- Terminal commands
- Processes
- Applications

For terminal execution, explain that commands must be subject to the
permission and execution policy.

Do not design an unrestricted shell interface for the AI.

For filesystem operations:

- Validate paths.
- Respect workspace boundaries where applicable.
- Prevent unintended traversal outside authorized locations.
- Confirm destructive operations when required.

For process/application control:

- Validate target processes/applications.
- Restrict dangerous operations.
- Report failures honestly.

Do not invent a final sandbox implementation.

---

# DATA SECURITY

ATLAS is local-first, but local does not automatically mean secure.

Define protections for:

- SQLite data
- Memory
- Conversations
- Attachments
- Configuration
- Permission state
- AI context
- Logs

Follow:

- Minimum necessary storage
- Explicit ownership
- Controlled access
- Avoid unnecessary duplication
- Avoid sensitive information in logs
- Do not expose private data to unrelated modules

Explain that AI context should contain only relevant information.

---

# IPC SECURITY

Use the architecture from:

`02_ARCHITECTURE/IPC_ARCHITECTURE.md`

Security principles:

- Validate all renderer input.
- Do not trust renderer requests.
- Expose only approved APIs.
- Do not expose arbitrary Node.js capabilities.
- Do not expose unrestricted shell access.
- Do not expose unrestricted filesystem access.
- Validate IPC request types.
- Return structured errors.
- Preserve permission boundaries.

---

# ATTACHMENT SECURITY

AT-13 Files & Attachments must treat user-provided files as untrusted input.

Define general requirements:

- Validate file metadata.
- Avoid executing attachments automatically.
- Restrict access to the relevant task/context.
- Prevent unnecessary duplication.
- Handle malformed files safely.
- Do not assume file contents are trustworthy instructions.

---

# VOICE AND VISION SECURITY

Voice and vision inputs may contain sensitive information.

Define principles:

- Process locally where supported.
- Do not retain inputs unnecessarily.
- Do not expose visual/audio data to unrelated components.
- Pass only relevant information into AI context.
- Respect user permissions and data ownership.

Do not invent specific biometric or surveillance functionality.

---

# AUTOMATION SECURITY

AT-11 Automation can cause actions without immediate user interaction.

Define requirements:

- Automation definitions must be explicit.
- Automated actions remain subject to applicable permissions.
- Destructive operations should not silently gain unlimited authority merely
  because they were scheduled.
- Automation failures must be reported.
- Users should be able to inspect and control automation state.

Do not invent a final approval mechanism beyond the established permission
architecture.

---

# GUARDIAN

Explain the relationship between AT-07 Guardian and security.

Guardian primarily monitors system health and provides warnings.

Guardian does not replace:

- AT-16 Permissions
- IPC security
- AI safety boundaries
- Application security

Guardian may surface relevant runtime/security warnings where appropriate.

---

# LOGGING

Define secure logging principles:

- Do not log secrets unnecessarily.
- Do not log complete sensitive conversations by default.
- Avoid storing sensitive command output unnecessarily.
- Avoid logging credentials, tokens, or private file contents.
- Logs should provide useful diagnostics without becoming a data leak.

---

# DEVELOPMENT SECURITY

Git is mandatory.

Development agents must:

- Inspect repository state.
- Preserve unrelated changes.
- Avoid destructive Git operations without authorization.
- Review diffs.
- Commit verified changes.
- Report commit hashes.

OpenCode is external development infrastructure.

It must not be trusted as an ATLAS runtime security component.

---

# RELEASE SECURITY

REL-01 Packaging & Release must produce verified Windows EXE and MSI
artifacts.

The release process should verify:

- Build integrity
- Artifact existence
- Installer correctness
- Installation behavior
- Uninstallation behavior
- Application startup after installation

Do not invent code-signing infrastructure unless explicitly authorized.

---

# THREAT MODEL

Describe the primary threat categories at a high level:

- Malicious or malformed user input
- Malicious files
- Prompt injection through external content
- Unauthorized tool execution
- Path traversal
- Destructive commands
- Compromised or incorrect AI output
- Renderer compromise
- IPC misuse
- Local data exposure
- Unsafe automation
- Malicious dependencies
- Tampered release artifacts

For each category, explain the architectural boundary that reduces risk.

Do not claim that ATLAS is perfectly secure.

---

# SECURITY PRINCIPLES

The security architecture must follow:

1. Least privilege
2. Explicit permissions
3. Defense in depth
4. Local data ownership
5. Minimal exposed interfaces
6. Input validation
7. AI output distrust
8. Verification
9. Clear failure states
10. User control

Do not add new modules.

Do not create a separate security service.

Do not make OpenCode or MCP part of the runtime.

Keep this document architectural rather than implementation-specific.