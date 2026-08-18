# ATLAS Desktop v0.1.0

## Overview

ATLAS Desktop 0.1.0 is the first production release of the ATLAS desktop runtime.

## Included

### AI Runtime

- AI-01 through AI-09 foundation
- Local LLM runtime abstraction
- Conversation and context handling
- Memory intelligence
- Planning
- Tool orchestration
- Task management
- Empirical verification
- AI configuration

### AT Runtime

- AT-01 through AT-17 runtime foundation
- Workspace management
- Filesystem operations
- Process management
- Terminal execution
- Application control
- System information
- Guardian monitoring
- Memory
- Context
- Search
- Automation
- Notifications
- Attachments
- Permissions
- Event runtime

### Security

- Electron sandboxing
- Context isolation
- Restricted IPC
- Workspace boundary enforcement
- Permission authority
- Terminal execution limits
- Error sanitization
- Prompt-injection boundary handling

### Persistence

Local persistent storage for:

- Conversations
- Memory
- Context
- Settings
- Tasks
- Workspace

Includes corruption recovery through backup restoration.

### Windows

- Windows x64
- NSIS installer
- Start Menu integration
- Desktop shortcut
- Clean install/uninstall support

## Checksum

- **Installer:** `ATLAS Desktop Setup 0.1.0.exe`
- **SHA-256:** `1BFD3A8D929D0EAFB823D1140F8BFC673DC8F279CDB3E39BF2CFECB087D3DC65`

## Validation

- 15 test files
- 80 tests
- 80 passed
- 0 failed
- TypeScript type-check passed
- Production build passed
- Windows validation passed

## Known Limitations

- AI-14 Voice remains dependent on a future local voice engine binding.
- AI-15 Vision remains dependent on a future local vision engine binding.
- Local LLM availability depends on the configured local provider.

## System Requirements

Windows x64.

ATLAS is an Electron desktop application and requires the normal runtime resources associated with standalone Electron applications.
