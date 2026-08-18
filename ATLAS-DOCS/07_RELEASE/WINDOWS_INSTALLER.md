Write the complete specification for `07_RELEASE/WINDOWS_INSTALLER.md`.

This document defines the Windows installer and distributable packaging
strategy for ATLAS.

IMPORTANT:

- Follow the existing locked ATLAS architecture and documentation.
- Do not create new modules.
- Do not create new release files.
- Do not modify the locked 30-core-module architecture.
- REL-01 is the only release/packaging module.
- This document defines installer and packaging behavior within REL-01.
- Do not introduce OpenCode or MCP into the ATLAS runtime.
- OpenCode is external development/code-engineering tooling only.
- ATLAS is a local-first Electron + React desktop application.
- Use the actual project's configured packaging technology when implementation
  begins.
- Do not invent package versions, installer frameworks, commands, registry
  behavior, or implementation details not established by the project.

The document MUST cover:

1. Purpose
2. Windows Packaging Principles
3. Packaging Inputs
4. Production Build Requirements
5. Application Metadata
6. Application Identity
7. Version Information
8. Installer Strategy
9. EXE Packaging
10. MSI Packaging
11. Installation Location
12. Per-User Installation
13. Per-Machine Installation
14. Installation Permissions
15. Application Files
16. User Data Separation
17. Configuration Separation
18. Local LLM Runtime Boundary
19. Database Boundary
20. Native Dependencies
21. Shortcuts
22. Start Menu Integration
23. Desktop Shortcut
24. Application Launch
25. Uninstallation
26. Upgrade Installation
27. Downgrade Handling
28. Existing Installation Detection
29. User Data Preservation
30. Installer Security
31. Code Signing
32. Certificate Handling
33. UAC Behavior
34. Windows Compatibility
35. Firewall/Network Considerations
36. File Associations where applicable
37. Startup Behavior where applicable
38. Logging
39. Installer Failure Handling
40. Rollback
41. EXE Validation
42. MSI Validation
43. Clean Installation Test
44. Upgrade Test
45. Uninstallation Test
46. Smoke Testing
47. Release Artifact Naming
48. Artifact Integrity
49. Git Requirements
50. Acceptance Criteria
51. Definition of Done

CORE PRINCIPLE:

ATLAS must produce distributable Windows artifacts from the validated
production build.

The release process must support:

- `.exe` distribution
- `.msi` distribution

where supported by the actual packaging configuration.

The installer must install the ATLAS application without mixing application
resources with user data.

CONCEPTUAL PIPELINE:

Source
→ production build
→ artifact validation
→ Windows packaging
→ EXE artifact
→ MSI artifact where configured
→ installer validation
→ installation test
→ upgrade test
→ uninstallation test
→ release approval

Do not package directly from development source.

PRODUCTION BUILD:

The installer must consume the validated production build defined by:

`07_RELEASE/BUILD_PIPELINE.md`

Do not package:

- Development source
- Test artifacts
- Debug output
- Temporary files
- Development databases
- User data
- Credentials
- API keys
- OpenCode development infrastructure
- MCP development infrastructure

APPLICATION IDENTITY:

The installer must use the project's actual application identity.

Do not invent a second application name or identifier.

Application identity should remain consistent across:

- Electron configuration
- EXE
- MSI
- Installation directory
- Start Menu entries
- Uninstaller
- Windows metadata

VERSION:

Use the project's established application/package version.

Do not create a second versioning mechanism.

The version represented by the installer must correspond to the source/build
version being released.

INSTALLER STRATEGY:

The exact installer technology must be determined from the actual ATLAS
project configuration.

Do not replace an existing configured packaging system merely because another
installer framework is preferred.

If the project already supports EXE and MSI generation, preserve that
configuration.

If one artifact is not yet supported, document the missing implementation
without pretending it exists.

EXE:

The EXE release artifact must:

- Install or launch ATLAS according to the configured distribution model.
- Use the correct application identity.
- Preserve version information.
- Include required production resources.
- Exclude development resources.
- Preserve user data boundaries.
- Handle installation errors safely.

Do not claim the EXE works without testing the actual generated artifact.

MSI:

The MSI artifact must:

- Install the production ATLAS application.
- Use valid Windows Installer metadata.
- Preserve application identity.
- Preserve version information.
- Respect installation permissions.
- Support appropriate upgrade behavior.
- Support clean uninstallation.
- Avoid deleting unrelated user data.

Do not claim an MSI exists unless the packaging process actually generates
one.

INSTALLATION LOCATION:

Use the packaging configuration defined by the actual project.

Do not hard-code a machine-specific installation path.

Application resources and user data must remain separate.

USER DATA:

The installer must not overwrite or delete normal user data during:

- Installation
- Upgrade
- Repair
- Uninstallation

User data may include:

- Conversations
- Memory
- Tasks
- Settings
- Context
- Workspace references
- Application state

The exact data locations must come from the actual implementation.

CONFIGURATION:

Application configuration must remain separate from immutable application
resources where required.

Do not package developer-specific configuration.

LOCAL LLM:

ATLAS communicates with its configured local LLM runtime.

The installer must not assume that the LLM runtime itself is automatically
bundled with ATLAS unless the actual project explicitly requires this.

The installer should preserve the configuration necessary for ATLAS to
detect and communicate with the local runtime.

Do not package OpenCode.

Do not package the ATLAS MCP development server.

Do not make either a runtime dependency of the installed application.

DATABASE:

Do not package development or test databases.

The installed application must initialize or access its production user-data
storage according to the existing data architecture.

Do not delete user databases during normal uninstall unless the user
explicitly chooses an appropriate data-removal option supported by the
implementation.

NATIVE DEPENDENCIES:

Verify that all required Electron/native dependencies are included in the
packaged application.

Do not assume dependencies that work in development will automatically work
after installation.

SHORTCUTS:

Where configured, validate:

- Start Menu shortcut
- Desktop shortcut

Shortcut targets must point to the installed ATLAS application.

Do not create shortcuts that point to development directories.

APPLICATION LAUNCH:

After installation verify:

- ATLAS launches.
- Main window opens.
- Renderer loads.
- Assets resolve.
- IPC initializes.
- Local LLM connection can be established where available.
- User data location is correct.

UNINSTALLATION:

The uninstaller must remove application resources without unintentionally
deleting user data.

Verify:

- Application files are removed.
- Shortcuts are removed.
- Uninstaller completes successfully.
- User data is preserved according to the project's data policy.

UPGRADE:

Upgrades must preserve:

- User data
- Configuration where compatible
- Memory
- Conversations
- Tasks where supported

The installer must not blindly overwrite or corrupt persistent user data.

DOWNGRADE:

Downgrades must be treated cautiously.

If a downgrade can cause:

- Database incompatibility
- Configuration incompatibility
- Migration problems
- Data loss

the installer/release process must prevent or clearly handle the operation.

Do not silently downgrade persistent data.

EXISTING INSTALLATION:

The installer must correctly detect an existing installation according to
the configured packaging system.

Verify:

- Same-version installation behavior
- Upgrade behavior
- Repair behavior where supported
- Uninstallation behavior

Do not invent unsupported installer modes.

USER DATA PRESERVATION:

The installer must clearly separate:

Application installation
from
User data.

An application update must not reset the user's:

- Conversations
- Memory
- Settings
- Tasks
- Other persistent ATLAS data

unless an explicit migration requires it and the release process handles
that migration safely.

SECURITY:

Protect against:

- Installer tampering
- Malicious packaged files
- Path traversal
- Unauthorized privilege escalation
- Untrusted installer resources
- Secret inclusion
- Development configuration leakage

UAC:

Installer privilege behavior must follow the actual Windows packaging
configuration.

Do not request administrator privileges unnecessarily.

If elevated privileges are required, they must be clearly justified by the
installation model.

CODE SIGNING:

If code signing is configured, the release process should sign the relevant
Windows artifacts.

Signing must use the project's authorized certificate process.

Never:

- Hard-code certificate passwords
- Commit certificates/private keys
- Embed signing secrets in source code
- expose private signing material in logs

If signing is not yet configured, document the requirement rather than
pretending artifacts are signed.

WINDOWS COMPATIBILITY:

Validate the installer and installed application on the supported Windows
environment defined by the project.

Verify:

- Installation
- Launch
- File access
- Database access
- IPC
- Native dependencies
- Uninstallation
- Upgrade behavior

Do not claim compatibility with Windows versions that have not been tested
or established by the project.

FIREWALL / NETWORK:

ATLAS is local-first.

The installer must not introduce unnecessary firewall rules or network
services.

If network access is required for an explicitly supported feature, it must
follow the existing architecture and security model.

Do not create hidden network listeners.

FILE ASSOCIATIONS:

Only configure file associations if they are explicitly required by the
existing ATLAS product specification.

Do not invent file associations.

STARTUP:

Do not configure Windows startup behavior unless it is explicitly defined
by the locked product architecture.

Do not add background startup services merely for convenience.

LOGGING:

Installer logs must contain enough information to diagnose:

- Installation failure
- Upgrade failure
- Uninstallation failure
- Permission failure
- Missing resource
- Native dependency failure

Do not log:

- Passwords
- Signing credentials
- API keys
- User data
- Private file contents

FAILURE HANDLING:

Installer failures must clearly distinguish:

- Invalid package
- Missing resource
- Permission failure
- Existing installation conflict
- Upgrade failure
- Native dependency failure
- Signing failure
- Installation failure
- Uninstallation failure

Do not report successful installation when verification fails.

ROLLBACK:

Where supported by the packaging system, failed upgrades should leave the
application in a recoverable state.

Do not delete user data as a rollback strategy.

EXE VALIDATION:

For every release EXE:

1. Verify artifact exists.
2. Verify version.
3. Verify application identity.
4. Verify file integrity.
5. Test installation/launch behavior.
6. Verify renderer.
7. Verify IPC.
8. Verify required assets.
9. Verify uninstall behavior.

MSI VALIDATION:

For every release MSI:

1. Verify artifact exists.
2. Verify Windows Installer metadata.
3. Verify version.
4. Verify application identity.
5. Test clean installation.
6. Test application launch.
7. Test upgrade where supported.
8. Test uninstallation.
9. Verify user-data preservation.

CLEAN INSTALLATION TEST:

Test on a clean Windows environment where practical.

Verify:

- Installer starts.
- Installation completes.
- Application launches.
- Shortcuts work where configured.
- User data initializes correctly.
- Application can communicate with the local LLM runtime.
- Uninstallation completes.

UPGRADE TEST:

Install the previous supported release.

Then install the new release.

Verify:

- Existing user data remains.
- Application version updates.
- Application launches.
- Existing configuration remains compatible.
- Database migrations work where applicable.

UNINSTALLATION TEST:

Verify:

- Application files are removed.
- Shortcuts are removed.
- User data is preserved according to policy.
- No unexpected processes remain running.
- Uninstaller exits successfully.

SMOKE TEST:

At minimum verify:

- ATLAS launches.
- Main UI loads.
- `orb.png` loads.
- Navigation works.
- Conversation UI works.
- Local LLM runtime can be detected.
- A basic AI interaction works when the runtime/model is available.
- IPC works.
- Application closes cleanly.

Only test features that actually exist in the release.

ARTIFACT NAMING:

Use the project's established naming convention.

Artifact names should make it possible to identify:

- Application
- Version
- Windows artifact type

Do not invent a conflicting naming convention if one already exists.

ARTIFACT INTEGRITY:

Release artifacts should be validated before distribution.

Where the release process supports it, record appropriate integrity
information such as:

- File size
- Hash/checksum
- Version
- Source commit

Do not publish artifacts whose integrity has not been verified.

GIT REQUIREMENTS:

Before packaging:

- Review Git status.
- Review Git diff.
- Confirm release source commit.
- Confirm no secrets.
- Confirm no development artifacts.
- Confirm required release documentation is tracked.

Do not rewrite Git history.

Do not force-push.

Do not automatically create or delete tags unless explicitly required by
the locked Git workflow.

ACCEPTANCE CRITERIA:

The Windows installer specification is complete when:

- Production build artifacts are validated before packaging.
- EXE packaging behavior is defined.
- MSI packaging behavior is defined where supported.
- Application and user data are separated.
- Installation behavior is defined.
- Upgrade behavior is defined.
- Uninstallation behavior is defined.
- User data preservation is defined.
- Windows compatibility validation is defined.
- Security requirements are defined.
- Code-signing requirements are defined.
- Clean-install testing is defined.
- Upgrade testing is defined.
- Uninstallation testing is defined.
- Artifact integrity is defined.
- OpenCode/MCP development infrastructure is excluded.
- The resulting package remains consistent with REL-01.
- Git requirements are preserved.

IMPORTANT:

Do not create:

- Installer module
- Windows module
- EXE module
- MSI module
- Signing module
- Update module

All release responsibilities belong to REL-01.

Do not create new architecture.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact installer frameworks, commands, package versions,
registry keys, installation paths, or signing providers.

Use the actual ATLAS project configuration when implementation begins.

This document defines the ATLAS Windows installer and packaging strategy only.