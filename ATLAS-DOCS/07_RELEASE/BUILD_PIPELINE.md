# Build Pipeline

This document is ready for ATLAS content.

Write the complete specification for `07_RELEASE/BUILD_PIPELINE.md`.

This document defines the ATLAS production build pipeline.

IMPORTANT:

- Follow the existing locked ATLAS architecture and documentation.
- Do not create new modules.
- Do not create new release files.
- Do not modify the locked 30-core-module architecture.
- REL-01 is the only release/packaging module.
- Do not introduce OpenCode or MCP into the ATLAS runtime.
- OpenCode is an external development/code-engineering tool only.
- ATLAS is a local-first Electron + React desktop application.
- Use the actual project's existing technology versions and configuration.
- Do not invent package versions, commands, tools, or implementation details.

The document MUST cover:

1. Purpose
2. Build Pipeline Principles
3. Source Validation
4. Git State Validation
5. Dependency Validation
6. Environment Validation
7. Version Validation
8. Type Checking
9. Linting
10. Unit Testing
11. Integration Testing
12. Renderer Build
13. Electron Build
14. Preload Build
15. Asset Processing
16. Production Configuration
17. Build Output
18. Build Verification
19. Artifact Validation
20. Local LLM Runtime Boundary
21. Database Boundary
22. Native Dependencies
23. Security
24. Privacy
25. Failure Handling
26. Logging
27. Reproducibility
28. Git Requirements
29. Acceptance Criteria
30. Definition of Done

CORE PIPELINE:

The production build follows this conceptual sequence:

Git state
→ dependency validation
→ environment validation
→ type checking
→ linting
→ tests
→ renderer build
→ Electron/main build
→ preload build
→ asset validation
→ production artifact
→ artifact verification
→ launch smoke test
→ handoff to release packaging

Do not treat successful compilation as proof that ATLAS is release-ready.

SOURCE VALIDATION:

Before starting the production build:

- Confirm the intended project directory.
- Confirm the intended Git branch/state.
- Confirm required source files exist.
- Confirm required configuration files exist.
- Confirm required assets exist.
- Confirm the project is in a buildable state.

Do not automatically modify, reset, clean, stash, or delete files.

GIT VALIDATION:

Inspect:

- Current branch
- Git status
- Current commit
- Modified files
- Untracked files
- Ignored files

The build should be traceable to a known Git state.

Do not rewrite Git history.

Do not automatically commit or push.

DEPENDENCY VALIDATION:

Use the project's actual:

- package.json
- lockfile
- package manager
- Node.js requirements
- Electron dependencies
- React dependencies
- native dependencies

Do not automatically upgrade or downgrade dependencies during the build.

ENVIRONMENT:

The build environment must be reproducible where practical.

Do not hard-code:

- User-specific paths
- Machine-specific paths
- Developer credentials
- Local secrets
- Personal configuration

Do not include secrets in production artifacts.

VERSION:

The build must use the project's established version source.

Do not invent a second versioning system.

Relevant application/package metadata must remain consistent.

TYPE CHECKING:

Run the project's configured TypeScript/type-checking process.

A type-checking failure should prevent a release build unless explicitly
authorized.

LINTING:

Run the existing project linting process where configured.

Do not introduce a new linting system solely for this pipeline.

TESTING:

Run the tests required by the existing project:

- Unit tests
- Integration tests
- Runtime tests
- UI tests where applicable

Use the project's actual configured commands.

Never claim tests passed without actually running them.

RENDERER BUILD:

Build the React renderer using the project's existing production
configuration.

Verify:

- Renderer compilation succeeds.
- Required assets are generated.
- Routes are correctly included.
- Production configuration is applied.
- Development-only code is excluded where appropriate.

ELECTRON BUILD:

Build the Electron main process using the existing project configuration.

Verify:

- Main process builds.
- Required Electron resources exist.
- IPC remains available.
- Production security settings are applied.
- Runtime initialization works.

PRELOAD:

Verify that the preload layer:

- Builds successfully.
- Exposes only approved APIs.
- Preserves the IPC security boundary.
- Does not expose unnecessary Node.js capabilities to the renderer.

ASSETS:

Validate all required production assets.

The ATLAS orb is a required asset:

`orb.png`

The provided `orb.png` is the authoritative ATLAS orb.

Do not replace it with:

- CSS-generated artwork
- A placeholder
- A generic icon
- A newly generated orb
- Another unrelated orb asset

The production build must contain the correct orb asset and the UI must be
able to resolve it correctly.

PRODUCTION CONFIGURATION:

The production build must:

- Disable development-only behavior.
- Avoid development servers.
- Avoid debug configuration where inappropriate.
- Avoid machine-specific paths.
- Avoid exposing secrets.
- Preserve local-first behavior.
- Use production-safe Electron configuration.

LOCAL LLM:

ATLAS uses a local LLM runtime.

The build must package ATLAS so that the application can communicate with the
configured local LLM runtime.

Do not assume the LLM itself must be bundled into ATLAS.

Do not package OpenCode as part of ATLAS.

Do not package the ATLAS development MCP as part of the application.

DATABASE:

User data must remain outside immutable application resources.

Examples:

- Conversations
- Memory
- Tasks
- Settings
- Context
- Application data

The production build must not contain development databases or personal user
data.

NATIVE DEPENDENCIES:

Verify that required native dependencies are correctly included for the
target Electron environment.

Pay particular attention to:

- SQLite/native database dependencies
- Electron native modules
- Windows-specific dependencies
- Required runtime resources

Do not assume a dependency that works in development will automatically work
in the packaged application.

BUILD OUTPUT:

Separate production build output from:

- Source code
- Temporary files
- Debug artifacts
- Test output
- Development logs
- User data

Do not include unnecessary development files.

BUILD VERIFICATION:

After the build:

1. Confirm expected output exists.
2. Confirm required runtime files exist.
3. Confirm renderer assets exist.
4. Confirm `orb.png` exists.
5. Confirm development-only files are excluded where appropriate.
6. Launch the production application.
7. Verify the renderer loads.
8. Verify the Electron main process starts.
9. Verify IPC initialization.
10. Perform a basic ATLAS smoke test.

Do not declare the build successful merely because the build command returned
exit code 0.

ARTIFACT VALIDATION:

Validate the production output before passing it to the packaging stage.

Check:

- File existence
- Asset paths
- Runtime resources
- Application metadata
- Native dependencies
- Renderer loading
- Main-process startup
- IPC availability

LOCAL-FIRST BOUNDARY:

The production build must preserve ATLAS's local-first architecture.

The build must not introduce an external cloud AI dependency.

The configured local LLM runtime remains outside the renderer.

SECURITY:

The build pipeline must prevent:

- Secret inclusion
- Credential leakage
- Development configuration leakage
- Malicious dependency inclusion
- Unsafe native dependencies
- User-data inclusion
- Machine-specific configuration leakage

Never package:

- API keys
- Passwords
- Tokens
- Private certificates
- User databases
- Private conversations
- Personal files

PRIVACY:

Production artifacts must contain only application resources required to run
ATLAS.

Do not include development data or user-specific data.

FAILURE HANDLING:

Clearly distinguish:

- Dependency failure
- Environment failure
- Type-check failure
- Lint failure
- Test failure
- Renderer build failure
- Electron build failure
- Preload failure
- Asset failure
- Native dependency failure
- Runtime startup failure
- IPC failure
- Artifact validation failure

A failed stage must not silently produce a release-ready status.

LOGGING:

Build logs may contain:

- Build stage
- Duration
- Version
- Commit identifier
- Error category
- Build result

Do not log:

- Secrets
- Credentials
- User data
- Private file contents
- Sensitive configuration

REPRODUCIBILITY:

The pipeline should make it possible to determine:

- Which Git commit produced the build.
- Which dependency lock state was used.
- Which application version was built.
- Which build configuration was used.

Do not require machine-specific paths for reproducibility.

GIT REQUIREMENTS:

Before handing the build to packaging:

- Review Git status.
- Review Git diff.
- Confirm intended changes.
- Confirm no secrets.
- Confirm required documentation/code is tracked.
- Record the source commit/version.

Do not automatically commit or push.

REL-01 BOUNDARY:

BUILD_PIPELINE.md defines the production build process.

The actual installer and distributable generation remains part of REL-01 and
must follow the existing release documentation.

Do not create another build module.

Do not create another packaging module.

Do not create another installer module.

ACCEPTANCE CRITERIA:

The build pipeline is complete when:

- The source state is known.
- Dependencies are validated.
- Environment requirements are validated.
- Type checking passes.
- Required tests pass.
- Renderer builds successfully.
- Electron main process builds successfully.
- Preload builds successfully.
- Required assets are present.
- `orb.png` is present and preserved.
- Production configuration is correct.
- User data is excluded from the build.
- OpenCode and MCP development infrastructure are excluded.
- The production application launches.
- IPC initializes correctly.
- A basic smoke test passes.
- Production output is verified.
- Git state is reviewed.
- The output is ready for the existing REL-01 packaging process.

IMPORTANT:

Do not create new release files.

Do not create new modules.

Do not create a separate build system.

Do not create a separate CI/CD module.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact commands, package versions, build tools, installer
frameworks, or implementation details.

Use the actual ATLAS project configuration when implementation begins.

This document defines the ATLAS production build pipeline only.