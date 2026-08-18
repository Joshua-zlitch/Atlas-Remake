Write the complete specification for `07_RELEASE/RELEASE_CHECKLIST.md`.

This document defines the final ATLAS release-readiness checklist.

IMPORTANT:

- Follow the existing locked ATLAS architecture and documentation.
- Do not create new modules.
- Do not create new release files.
- Do not modify the locked 30-core-module architecture.
- REL-01 is the only release/packaging module.
- Do not introduce OpenCode or MCP into the ATLAS runtime.
- OpenCode is external development tooling only.
- ATLAS is a local-first Electron + React desktop application.
- Do not invent package versions, commands, tools, or implementation details.
- Use the actual project configuration when implementation begins.

PURPOSE:

Define the mandatory checklist that must be completed before an ATLAS build
is considered ready for packaging and release.

The checklist must cover:

1. Documentation
2. Git
3. Source Code
4. Dependencies
5. Architecture
6. Modules
7. UI/UX
8. AI
9. IPC
10. Security
11. Data
12. Local LLM
13. Testing
14. Build
15. Assets
16. Windows Compatibility
17. Packaging Readiness
18. Installer Readiness
19. Smoke Testing
20. Release Decision
21. Rollback/Failure Handling
22. Acceptance Criteria
23. Definition of Done

RELEASE PRINCIPLE:

A release is approved only when all mandatory checks pass.

Conceptual flow:

Development Complete
→ Documentation Check
→ Git Check
→ Architecture Check
→ Module Check
→ UI Check
→ AI Check
→ Security Check
→ Data Check
→ Test Check
→ Build Check
→ Windows Check
→ Packaging Check
→ Smoke Test
→ Release Approval

DOCUMENTATION CHECK:

Verify that the locked ATLAS documentation is present and consistent.

Required sections:

- `00_MASTER`
- `01_PRODUCT`
- `02_ARCHITECTURE`
- `03_MODULES`
- `04_UI`
- `05_ENGINEERING`
- `06_AI`
- `07_RELEASE`
- `08_HISTORY`

Verify that no unauthorized architecture or module additions were introduced.

GIT CHECK:

Verify:

- Correct repository
- Correct release branch/state
- Working tree reviewed
- Intended changes only
- No accidental files
- No secrets
- No credentials
- No user data
- Required changes committed when appropriate
- Release source commit identified

Do not rewrite Git history as part of release validation.

ARCHITECTURE CHECK:

Verify implementation against the locked architecture.

Confirm:

- Renderer/runtime boundaries are preserved.
- Electron boundaries are preserved.
- IPC boundaries are preserved.
- AI responsibilities remain in the AI layer.
- AT responsibilities remain in the AT layer.
- Security boundaries remain intact.
- No new architectural layer was introduced.

MODULE CHECK:

Verify the locked module architecture.

The architecture remains:

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

UX:
- UX-01 App Shell
- UX-02 Interaction System
- UX-03 State Visualization
- UX-04 Context & Presentation

RELEASE:
- REL-01 Packaging & Release

Confirm:

- No unauthorized modules were added.
- No locked module was removed.
- No module was silently split.
- No module was silently merged.
- Module responsibilities remain consistent with `03_MODULES`.

UI/UX CHECK:

Verify:

- Lovable prototype integration is consistent with the locked UI strategy.
- Existing approved UI is preserved where required.
- Navigation works.
- Main application shell works.
- Conversation interface works.
- Context presentation works.
- Relevant states are displayed correctly.
- Loading states work.
- Error states work.
- Empty states work.
- Notifications work.
- Permissions are represented correctly.
- Responsive behavior is acceptable for supported window sizes.
- Accessibility requirements are satisfied.

Verify the authoritative ATLAS orb:

`orb.png`

Confirm it is present and correctly referenced.

Do not replace the orb.

AI CHECK:

Verify:

- Local LLM runtime communication works.
- Configured model is available.
- AI configuration works.
- Conversation works.
- Context handling works.
- Memory integration works.
- Planning works.
- Tool orchestration works.
- Task lifecycle works.
- Verification works.

Verify that:

- OpenCode is not part of the ATLAS runtime.
- MCP development infrastructure is not packaged into ATLAS.
- Local-first AI behavior remains intact.

IPC CHECK:

Verify:

- Renderer-to-runtime communication works.
- Preload APIs are limited to approved capabilities.
- IPC requests are validated.
- Privileged operations do not bypass IPC.
- Unauthorized renderer access is blocked.
- IPC failures are handled safely.

SECURITY CHECK:

Verify protection against:

- Arbitrary command execution
- Unauthorized filesystem access
- Path traversal
- Process abuse
- Permission bypass
- IPC abuse
- Sensitive-data exposure
- Credential exposure
- Prompt injection
- Malicious tool arguments
- Untrusted tool output

Confirm that:

- AT-16 remains the permission authority.
- AT-07 remains the Guardian authority.
- Model output cannot directly authorize privileged actions.

DATA CHECK:

Verify:

- User data is stored outside application resources.
- Development databases are not packaged.
- Test data is not packaged.
- User conversations are not packaged.
- Memory data is not packaged.
- Credentials are not packaged.
- Private files are not packaged.

LOCAL LLM CHECK:

Verify:

- Required local runtime configuration is valid.
- The configured local model is available.
- ATLAS can communicate with the local runtime.
- Runtime failures are handled.
- Internet access is not required for normal local inference.

Do not require the LLM model itself to be bundled into the application unless
the actual project architecture explicitly requires it.

TEST CHECK:

Required testing must be completed according to the existing testing
strategy.

Verify relevant:

- Unit tests
- Integration tests
- Runtime tests
- UI tests
- IPC tests
- AI tests
- Security tests
- Smoke tests

Do not mark a test as passed without actual evidence.

BUILD CHECK:

Verify:

- Dependencies install correctly.
- Type checking passes.
- Linting passes where configured.
- Tests pass.
- Renderer builds.
- Electron main process builds.
- Preload builds.
- Required assets are included.
- Production configuration is applied.
- Build output is clean.

Follow `BUILD_PIPELINE.md`.

ASSET CHECK:

Verify all required production assets.

Especially:

`orb.png`

Confirm:

- Asset exists.
- Correct asset is used.
- Production path resolves.
- No placeholder replaces it.

WINDOWS CHECK:

Because ATLAS is a Windows desktop application, verify:

- Application launches on the supported Windows environment.
- Electron starts correctly.
- Renderer loads.
- IPC works.
- Filesystem operations work.
- Process/terminal capabilities behave correctly where implemented.
- SQLite/database operations work.
- Local LLM connection works.
- Notifications work where supported.
- Window behavior works.
- Application shutdown works correctly.

Do not assume development behavior equals packaged Windows behavior.

PACKAGING READINESS:

Before packaging, verify:

- Production build passed.
- Artifact validation passed.
- Required metadata exists.
- Required assets exist.
- Native dependencies are present.
- User data is excluded.
- Development files are excluded.
- Secrets are excluded.
- OpenCode/MCP development infrastructure is excluded.

Installer creation remains part of REL-01 and the existing
`WINDOWS_INSTALLER.md` specification.

SMOKE TEST:

Launch the production build and verify at minimum:

1. Application starts.
2. Main window loads.
3. UI renders correctly.
4. ATLAS orb loads.
5. Navigation works.
6. Conversation interface loads.
7. Local LLM connection can be established.
8. A basic AI interaction works.
9. IPC works.
10. A representative AT capability works.
11. Error handling works.
12. Application closes cleanly.

Only test capabilities that are actually implemented.

Do not claim unimplemented capabilities pass.

RELEASE DECISION:

Classify the release as:

READY
BLOCKED
CONDITIONAL

READY:
All mandatory release checks pass.

BLOCKED:
One or more mandatory checks fail.

CONDITIONAL:
A known non-critical issue exists and has been explicitly accepted according
to the project's release process.

Do not classify a release as READY when a mandatory security, build, test, or
runtime check has failed.

FAILURE HANDLING:

If a release check fails:

- Record the failure.
- Identify the affected area.
- Preserve evidence.
- Do not silently ignore the failure.
- Return to the appropriate engineering phase.
- Re-run affected checks after the fix.

Do not modify unrelated areas merely to make the checklist pass.

RELEASE EVIDENCE:

The release process should preserve enough evidence to identify:

- Source commit
- Application version
- Build result
- Test result
- Packaging result
- Installer result
- Known issues
- Release decision

Do not store sensitive information in release evidence.

GIT REQUIREMENTS:

Before final release:

- Review Git status.
- Review Git diff.
- Confirm intended changes.
- Confirm no secrets.
- Confirm no generated junk.
- Confirm documentation changes.
- Confirm release source commit.

Follow the locked `GIT_WORKFLOW.md`.

Do not rewrite history.

Do not force-push.

Do not automatically delete branches or tags.

ACCEPTANCE CRITERIA:

The release checklist is complete when:

- All mandatory documentation checks pass.
- Git state is known and clean enough for release.
- Locked architecture is preserved.
- Locked module count is preserved.
- UI/UX validation passes.
- AI validation passes.
- IPC validation passes.
- Security validation passes.
- Data validation passes.
- Local LLM validation passes.
- Required tests pass.
- Production build passes.
- Required assets pass validation.
- Windows smoke testing passes.
- Packaging prerequisites pass.
- Installer prerequisites pass.
- Release evidence is recorded.
- A clear READY/BLOCKED/CONDITIONAL decision can be made.

IMPORTANT:

Do not create:

- New release modules
- New testing modules
- New security modules
- New packaging modules
- New installer modules
- New architecture layers

Do not expand the ATLAS architecture.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact commands, package versions, installer frameworks, or
hardware requirements.

This document defines the final ATLAS release-readiness checklist only.