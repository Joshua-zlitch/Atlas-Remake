Write the complete module specification for `03_MODULES/REL-01_PACKAGING_RELEASE.md`.

MODULE:
REL-01 — Packaging & Release

This is the release module of the locked ATLAS architecture.

Do not create, rename, split, merge, or introduce any additional ATLAS module.

LOCKED ARCHITECTURE:

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

RELEASE:
- REL-01 Packaging & Release

CORE = 30
TOTAL INCLUDING RELEASE = 31

PURPOSE:

REL-01 is responsible for preparing ATLAS for distribution as a desktop
application.

It owns the final build, packaging, installer generation, executable
distribution artifacts, release validation, and release metadata.

The module must support the final ATLAS distribution as appropriate for the
target Windows environment, including:

- Development build
- Production build
- Portable executable where supported
- Installer package
- MSI package where supported
- EXE installer/package where supported
- Release artifacts
- Version metadata
- Packaging validation

REL-01 does NOT own application development itself.

It packages the completed ATLAS application produced by the other modules.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Build Pipeline
9. Production Build
10. Application Packaging
11. EXE Packaging
12. MSI Packaging
13. Installer Configuration
14. Application Metadata
15. Assets
16. Native Dependencies
17. Configuration Handling
18. Local LLM Runtime Considerations
19. Database Handling
20. File/Directory Layout
21. Signing Boundary
22. Versioning
23. Release Artifacts
24. Installation Validation
25. Uninstallation Validation
26. Upgrade Validation
27. Build Verification
28. Security
29. Privacy
30. Performance
31. Testing Requirements
32. Verification Requirements
33. Acceptance Criteria
34. Failure Conditions
35. Git Requirements
36. CI/CD Considerations
37. Implementation Notes
38. Definition of Done

RESPONSIBILITIES:

REL-01 owns:

- Production builds
- Packaging
- Installer generation
- EXE artifact generation
- MSI artifact generation where supported
- Installer configuration
- Application metadata
- Release versioning
- Release artifact validation
- Installation testing
- Uninstallation testing
- Upgrade testing
- Release checks
- Packaging-related documentation

REL-01 does NOT own:

- React UI development
- Electron application logic
- AI runtime
- LLM configuration
- Workspace management
- Filesystem operations
- Terminal execution
- Permissions
- Memory
- Conversation
- Planning
- Tool orchestration
- Task management
- OpenCode
- MCP development infrastructure

BUILD PIPELINE:

Conceptual flow:

Source
→ dependency validation
→ type/build validation
→ frontend production build
→ Electron/runtime build
→ package application
→ generate release artifacts
→ validate artifacts
→ installation test
→ release

Do not package code that has known build/test failures unless explicitly
authorized as a development artifact.

PRODUCTION BUILD:

The production build must:

- Build the React renderer
- Build the Electron/main process
- Include required runtime assets
- Include required native dependencies
- Exclude development-only artifacts
- Produce a reproducible release structure where practical

Do not hard-code exact build commands unless implementation requirements
define them.

EXE PACKAGING:

Provide an EXE-based distributable where supported by the chosen Electron
packaging technology.

The EXE artifact must be tested after generation.

Verify:

- Application launches
- Renderer loads
- Main process initializes
- Local data paths work
- AI runtime configuration loads
- Core ATLAS functionality remains available

MSI PACKAGING:

Provide an MSI installer package for Windows where supported.

The MSI package must be treated as a first-class release artifact.

Validate:

- MSI builds successfully
- Installation succeeds
- Application launches after installation
- Required files are present
- Shortcuts/registration behave as intended
- Uninstallation works
- Upgrade behavior works where supported

Do not assume MSI generation is identical to EXE generation.

Keep installer-specific configuration isolated within REL-01.

INSTALLER:

The installer should support, where appropriate:

- Installation directory selection
- Start Menu integration
- Desktop shortcut where configured
- Uninstallation
- Upgrade behavior
- Version information
- Application identity

Do not introduce unnecessary installer features.

APPLICATION METADATA:

Release metadata may include:

- Product name
- Application name
- Version
- Publisher
- Description
- Application icon
- Package identifier

Use the project-defined ATLAS branding and metadata.

Do not invent final branding values in this document.

ASSETS:

Ensure required release assets are included:

- Application icon
- Installer resources
- Renderer assets
- Electron resources
- Required native/runtime files

Do not include development-only files unnecessarily.

NATIVE DEPENDENCIES:

Identify and package native dependencies required by ATLAS.

Particular attention should be given to:

- SQLite/native database dependencies
- Electron native modules
- System integrations
- Local AI runtime connectivity requirements
- Windows-specific dependencies

Do not bundle an external runtime unless the final architecture explicitly
requires it.

CONFIGURATION:

User configuration must survive normal application upgrades where
appropriate.

Do not package secrets into the application.

Do not hard-code machine-specific paths into the release.

LOCAL LLM RUNTIME:

ATLAS is local-first.

REL-01 must package ATLAS so that its AI configuration can connect to the
configured local LLM runtime.

Do not assume the LLM itself must be bundled into the installer.

The distinction is:

ATLAS
→ local LLM runtime

The selected LLM runtime may be installed/configured separately unless a
future release requirement explicitly bundles it.

DATABASE:

ATLAS local data must use appropriate user-data directories.

Do not store mutable user data inside the application's installation
directory.

User data may include:

- Conversations
- Memory
- Tasks
- Context
- Settings

Do not delete user data merely because the application is upgraded.

FILE/DIRECTORY LAYOUT:

The packaged application should separate:

- Application binaries
- Static resources
- User data
- Logs
- Configuration
- Temporary data

Do not place user-generated data inside immutable application resources.

SIGNING:

Code signing may be supported.

Signing configuration must never require committing private certificates or
credentials to Git.

Use secure signing credentials outside the repository.

If signing is not configured, clearly identify the artifact as unsigned.

VERSIONING:

Release versions must be consistent across relevant:

- Application metadata
- EXE
- MSI
- Installer
- Release artifacts

Do not manually maintain conflicting version numbers.

Use the project's chosen version source as the authority.

RELEASE ARTIFACTS:

A release may contain:

- EXE
- MSI
- Installer artifacts
- Checksums
- Release metadata
- Release notes
- Build information

Do not include temporary build/debug artifacts.

INSTALLATION VALIDATION:

Test a clean installation.

Verify:

- Installer starts
- Installation completes
- Application launches
- UI loads
- Local storage initializes
- AI configuration loads
- Core modules initialize
- No missing-resource errors occur

UNINSTALLATION:

Verify:

- Application is removed
- Installer-created files are removed
- User data is handled according to the defined retention policy
- Uninstall does not unexpectedly destroy user data

Do not silently delete user-generated data unless explicitly required.

UPGRADE:

Test upgrading from a previous release where possible.

Verify:

- Existing user data remains accessible
- Configuration remains valid
- Database migrations work
- Application launches
- Existing conversations/tasks/memory remain intact where expected

BUILD VERIFICATION:

Before release:

1. Clean build
2. Type checking
3. Relevant tests
4. Production build
5. Package generation
6. EXE validation
7. MSI validation
8. Installation test
9. Launch test
10. Core functionality smoke test
11. Git status/diff review

Do not claim a release is valid based solely on successful compilation.

SECURITY:

Protect against:

- Malicious packaged files
- Dependency tampering
- Installer modification
- Unsigned/untrusted artifacts
- Secret leakage
- Insecure installer scripts
- Path traversal during installation

Never package:

- API keys
- Passwords
- Private certificates
- Development secrets
- Machine-specific credentials

PRIVACY:

Release packages must not contain:

- User conversations
- User memory
- Personal files
- Local database contents
- Development logs containing private data
- Machine-specific configuration

PERFORMANCE:

Production builds should:

- Exclude unnecessary development dependencies
- Avoid oversized resources
- Load efficiently
- Keep installer size reasonable
- Avoid packaging duplicate assets

Do not sacrifice correctness merely to reduce package size.

TESTING:

Include:

- Production build test
- EXE packaging test
- MSI packaging test
- Clean installation test
- Launch test
- Uninstallation test
- Upgrade test
- Database initialization test
- Configuration test
- Local AI connection test
- Renderer/main-process integration test
- Native dependency test
- Resource-path test

VERIFICATION:

A release artifact is valid only after:

Build
→ package
→ inspect artifact
→ install
→ launch
→ smoke test
→ verify critical functionality

Do not report packaging success merely because the packaging command exited
successfully.

ACCEPTANCE CRITERIA:

REL-01 is complete when:

- ATLAS can produce a production build.
- A working EXE release artifact can be generated.
- A working MSI installer can be generated where supported.
- The application installs correctly.
- The application launches correctly after installation.
- User data is stored outside the installation directory.
- Existing user data survives upgrades where required.
- Uninstallation behaves correctly.
- Required runtime/native dependencies are packaged.
- No secrets are included in release artifacts.
- Release artifacts are validated after generation.
- Git state is clean/reviewed before release.
- Relevant tests pass.

IMPORTANT:

Do not create separate modules for:

- EXE Packaging
- MSI Packaging
- Installer
- Release Validation
- Build System
- Deployment

All release and packaging responsibilities belong to REL-01.

Do not create a separate CI/CD module.

CI/CD may invoke REL-01's defined build/release process.

Do not move application development responsibilities into REL-01.

Do not introduce OpenCode or MCP into the ATLAS runtime.

OpenCode remains the external Code Engineer used during development, not a
component that must be packaged as part of ATLAS.

Do not invent exact packaging frameworks, installer tools, package versions,
signing providers, or build commands.

Use the project's actual Electron build/packaging stack when implementation
begins.

This document defines the release module contract only.