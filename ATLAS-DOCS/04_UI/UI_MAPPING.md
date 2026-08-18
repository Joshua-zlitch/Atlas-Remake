Write the complete UI-to-ATLAS mapping specification for
`04_UI/UI_MAPPING.md`.

IMPORTANT:

This document defines how the existing Lovable React prototype UI maps to the
locked ATLAS runtime and module architecture.

Do NOT create, rename, split, merge, or introduce any ATLAS modules.

Do NOT create new UI modules.

The 30-core-module architecture and REL-01 release module are already locked.

The Lovable prototype is the primary visual/UI foundation.

ATLAS runtime architecture remains the source of truth for behavior.

The document MUST contain:

1. Purpose
2. UI Mapping Principles
3. Locked ATLAS Architecture Reference
4. Application Shell Mapping
5. Navigation Mapping
6. Home Mapping
7. Conversation Mapping
8. Memory Mapping
9. Guardian Mapping
10. Automation Mapping
11. Settings Mapping
12. About Mapping
13. Context Panel Mapping
14. Status Indicator Mapping
15. Recent Activity Mapping
16. AI State Mapping
17. Task State Mapping
18. Notification Mapping
19. Permission Mapping
20. File/Attachment Mapping
21. Voice Mapping
22. Vision Mapping
23. Workspace Mapping
24. Error Mapping
25. Loading Mapping
26. Empty-State Mapping
27. Orb Mapping
28. IPC Mapping
29. Runtime-State Mapping
30. Component Ownership
31. State Ownership
32. Data Ownership
33. UI Action Flow
34. Security Boundaries
35. Accessibility
36. Testing
37. Verification
38. Acceptance Criteria
39. Git Requirements
40. Definition of Done

SOURCE-OF-TRUTH RULE:

Use the actual Lovable prototype to determine:

- Existing screens
- Existing layouts
- Existing components
- Existing navigation
- Existing visual hierarchy
- Existing interaction patterns
- Existing component names where useful

Use the locked ATLAS architecture to determine:

- Runtime ownership
- Business logic ownership
- Data ownership
- Permission boundaries
- IPC boundaries
- AI responsibilities
- AT responsibilities

Do not invent prototype functionality that does not exist.

Do not remove ATLAS functionality merely because the prototype does not
currently display it.

MAPPING PRINCIPLE:

The UI represents ATLAS capabilities.

It does not redefine them.

Conceptual structure:

Lovable Component
→ React state/event
→ IPC boundary
→ ATLAS runtime
→ owning module

The UI must never bypass the owning module.

APPLICATION SHELL:

Map the prototype's main shell to:

- UX-01 App Shell
- UX-02 Interaction System
- UX-03 State Visualization
- UX-04 Context & Presentation

The shell owns presentation and navigation.

It does not own AI, AT, storage, or system logic.

NAVIGATION:

Map the prototype's navigation items to their corresponding UI surfaces.

Examples may include:

- Home
- Memory
- Guardian
- Automation
- Settings
- About

Do not assume every navigation item represents a separate ATLAS module.

Some navigation surfaces may aggregate multiple modules.

HOME:

The Home surface should act as the primary ATLAS interaction surface.

Map relevant elements such as:

- ATLAS orb
- Conversation input
- Context panel
- Status indicators
- Recent activity
- Quick actions

to the appropriate runtime state.

Do not implement runtime logic directly inside the Home component.

CONVERSATION:

Conversation UI maps primarily to:

AI-02 Conversation

with supporting modules:

AI-01 LLM Runtime
AI-03 Context Engine
AI-04 Memory Intelligence
AI-05 Planner
AI-06 Tool Orchestrator
AI-07 Task Manager
AI-08 Reasoning & Verification

The UI should display these states without owning their internal logic.

MEMORY:

Memory UI maps to:

AT-08 Memory
AI-04 Memory Intelligence

AT-09 Context Store may support contextual state where required.

Do not combine memory storage and memory intelligence into the renderer.

GUARDIAN:

Guardian UI maps to:

AT-07 Guardian

Permission decisions map to:

AT-16 Permissions

The UI may display:

- Guardian status
- Warnings
- Blocked operations
- Permission requests

The UI must not independently decide whether an operation is safe or
authorized.

AUTOMATION:

Automation UI maps to:

AT-11 Automation

Task execution may involve:

AI-07 Task Manager

The UI displays automation/task state and sends user actions through IPC.

SETTINGS:

Settings UI maps to configuration owned by the appropriate runtime modules.

AI configuration:

AI-09 AI Configuration

Other system/application configuration should remain with its owning
runtime component.

Do not put all application configuration into AI-09 merely because it appears
on the Settings screen.

ABOUT:

About is primarily a presentation surface.

It should display application information supplied by the application
configuration/build metadata.

It does not require a new ATLAS module.

CONTEXT PANEL:

Context-related UI maps primarily to:

AI-03 Context Engine
AT-09 Context Store
AT-01 Workspace
AT-10 Search & Retrieval

The UI should display relevant context without becoming the context engine.

STATUS INDICATORS:

Status indicators may represent:

- LLM/runtime state
- System state
- Guardian state
- Task state
- Connection state
- Processing state

The UI must display actual runtime state.

Do not use decorative status indicators that imply a system state that is not
actually known.

RECENT ACTIVITY:

Recent activity may aggregate events from:

AT-17 Event Runtime

and relevant modules such as:

- Memory
- Guardian
- Tasks
- Automation
- AI operations

The UI must not become the authoritative event store.

AI STATE:

Map conceptual AI states such as:

- Idle
- Thinking
- Generating
- Using tools
- Waiting for permission
- Verifying
- Completed
- Failed

to the appropriate runtime state.

Do not expose hidden model reasoning or private chain-of-thought.

The UI may display user-safe progress/status information.

TASK STATE:

AI-07 owns task lifecycle.

The UI may display:

- Queued
- Running
- Waiting
- Paused
- Verifying
- Completed
- Failed
- Cancelled

The UI must not directly mutate task state.

NOTIFICATIONS:

AT-12 owns notifications.

The UI renders notification state.

Notification generation and delivery remain outside the React component.

PERMISSIONS:

AT-16 owns permissions.

Conceptual flow:

UI action
→ runtime
→ permission evaluation
→ approval/denial
→ execution

The UI must never interpret a button click as authorization by itself.

FILES / ATTACHMENTS:

AT-13 owns files and attachments.

AT-02 owns filesystem operations.

The UI may:

- Select files
- Display attachments
- Display upload state
- Display results

Actual file access remains in the runtime.

VOICE:

AT-14 owns voice functionality.

The UI may expose:

- Microphone control
- Recording state
- Processing state
- Transcription/result state

Do not implement voice processing inside React.

VISION:

AT-15 owns vision functionality.

The UI may display:

- Image input
- Processing state
- Vision results

Actual image processing remains outside the renderer.

WORKSPACE:

AT-01 owns workspace state.

The UI may display:

- Current workspace
- Workspace name
- Workspace status
- Workspace-related activity

Workspace operations must go through the runtime.

ERROR MAPPING:

Map runtime errors to user-readable UI states.

Do not expose raw internal stack traces by default.

Differentiate between:

- Validation error
- Permission denial
- Tool failure
- Runtime failure
- Network/runtime availability issue
- Verification failure
- User cancellation

Do not display "Something went wrong" when a more meaningful safe message can
be provided.

LOADING MAPPING:

Every asynchronous operation should have an appropriate visual state.

Examples:

LLM:
→ generating indicator

File operation:
→ operation progress

Task:
→ task progress

Search:
→ search loading state

Memory:
→ memory operation state

Avoid indefinite loading indicators without timeout/error handling.

EMPTY STATES:

Empty states should communicate what is actually empty.

Examples:

- No conversations
- No memory items
- No active tasks
- No recent activity
- No search results

Do not confuse "empty" with "failed."

ORB:

The provided `orb.png` is the authoritative ATLAS orb.

The UI mapping must explicitly use:

`orb.png`

for the ATLAS orb visual.

Do NOT:

- Generate a replacement orb
- Use a CSS sphere
- Substitute an icon
- Create a placeholder
- Redesign the orb

The orb's visual state may change through approved UI effects according to
runtime state.

The underlying asset remains `orb.png`.

IPC:

All privileged operations must follow the existing IPC architecture.

Conceptual flow:

React
→ IPC
→ Electron Main/runtime
→ owning module

Never:

React
→ direct filesystem access

React
→ direct terminal access

React
→ direct process control

React
→ direct database access

React
→ direct permission bypass

RUNTIME STATE:

React should consume authoritative runtime state.

Avoid maintaining a second competing source of truth.

Where state must be mirrored locally for presentation, clearly distinguish
UI state from runtime state.

COMPONENT OWNERSHIP:

UI components own:

- Rendering
- Interaction presentation
- Local visual state
- Accessibility
- Layout

Runtime modules own:

- Business logic
- Data
- System operations
- AI operations
- Permissions
- Persistence
- Task lifecycle

STATE OWNERSHIP:

Examples:

Conversation:
AI-02

LLM runtime:
AI-01

Context:
AI-03

Memory intelligence:
AI-04

Plan:
AI-05

Tool execution:
AI-06

Task:
AI-07

Verification:
AI-08

AI configuration:
AI-09

Workspace:
AT-01

Filesystem:
AT-02

Guardian:
AT-07

Memory:
AT-08

Context store:
AT-09

Search:
AT-10

Automation:
AT-11

Notifications:
AT-12

Files/attachments:
AT-13

Voice:
AT-14

Vision:
AT-15

Permissions:
AT-16

Events:
AT-17

Do not duplicate ownership inside the renderer.

UI ACTION FLOW:

For user actions, use:

User interaction
→ UI event
→ validated IPC request
→ owning runtime module
→ result/event
→ UI state update

The UI must not skip the runtime boundary.

SECURITY:

The UI must be treated as an untrusted presentation layer for privileged
operations.

Protect against:

- Malicious renderer input
- IPC argument manipulation
- Unauthorized operations
- Permission bypass
- Cross-workspace access
- Sensitive information exposure

All privileged requests must be validated by the runtime.

ACCESSIBILITY:

Every mapped UI surface must support:

- Keyboard navigation
- Focus management
- Appropriate semantic roles
- Accessible labels
- Error communication
- Reduced-motion preferences where relevant

TESTING:

Test each major UI mapping:

- Navigation
- Conversation
- Memory
- Guardian
- Automation
- Settings
- Context
- Notifications
- Permissions
- Files
- Voice
- Vision
- Workspace
- Task state
- AI state
- Error state
- Loading state
- Orb rendering

Also verify that UI actions reach the correct runtime owner.

VERIFICATION:

For every major UI interaction verify:

1. Correct component receives the action.
2. Correct IPC channel/request is used.
3. Correct runtime module receives it.
4. Correct result/event is returned.
5. UI reflects the actual result.
6. Failure states are represented accurately.

ACCEPTANCE CRITERIA:

The mapping is complete when:

- Every major Lovable UI surface has an identified ATLAS ownership boundary.
- No UI component owns backend/business logic.
- Every privileged action has an IPC/runtime path.
- AI responsibilities map to the correct AI modules.
- AT responsibilities map to the correct AT modules.
- Permission handling remains owned by AT-16.
- Events remain owned by AT-17.
- Task state remains owned by AI-07.
- Verification remains owned by AI-08.
- The ATLAS orb uses `orb.png`.
- No new ATLAS modules are required to support the prototype UI.
- The mapping is compatible with Electron.
- Relevant UI and integration tests can be derived from this document.
- Git changes follow the locked ATLAS Git workflow.

IMPORTANT:

Do not create new modules to match UI screens.

A UI screen is not automatically a module.

Do not move runtime logic into React.

Do not duplicate runtime state in the UI unnecessarily.

Do not replace the locked ATLAS architecture with the structure of the
Lovable prototype.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact component names, IPC channel names, APIs, package
versions, or implementation details before inspecting the actual projects.

This document defines the UI-to-runtime mapping contract only.