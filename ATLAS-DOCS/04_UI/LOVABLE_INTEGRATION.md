Write the complete UI integration specification for
`04_UI/LOVABLE_INTEGRATION.md`.

IMPORTANT:

ATLAS is already a React/Electron project.

The existing Lovable React prototype will be reused as the primary UI
foundation.

The goal is NOT to rebuild the ATLAS UI from scratch.

The goal is to integrate the existing Lovable prototype into the existing
ATLAS renderer while preserving the locked ATLAS architecture and runtime.

Do NOT create new modules, architecture layers, or folders.

The document MUST contain:

1. Purpose
2. Integration Strategy
3. Source-of-Truth Rules
4. Prototype Inspection
5. React Compatibility
6. Dependency Compatibility
7. Component Reuse
8. Page/Layout Reuse
9. Routing Integration
10. Styling Integration
11. Tailwind Integration
12. shadcn/Radix Integration
13. Asset Integration
14. ATLAS Orb Integration
15. State Integration
16. IPC Integration
17. Runtime Integration
18. AI Integration
19. AT Integration
20. Error-State Integration
21. Loading-State Integration
22. Notification Integration
23. Guardian-State Integration
24. Task/Automation-State Integration
25. Authentication/Identity Boundary if present
26. Data Binding
27. Component Mapping
28. Conflict Resolution
29. Duplicate Component Prevention
30. Electron Renderer Considerations
31. Performance
32. Accessibility
33. Testing
34. Verification
35. Acceptance Criteria
36. Git Workflow
37. Definition of Done

SOURCE OF TRUTH:

The existing Lovable prototype is the primary visual source.

The existing ATLAS architecture is the primary behavioral/runtime source.

Therefore:

Lovable
→ visual/UI foundation

ATLAS
→ runtime/business logic

Neither should silently replace the responsibility of the other.

INTEGRATION PRINCIPLE:

Use:

Lovable UI
+
ATLAS runtime
=
final renderer

Do NOT:

Lovable UI
→ replace ATLAS architecture

Do NOT:

ATLAS backend logic
→ get rewritten inside React

COMPONENT REUSE:

Before creating any new UI component:

1. Inspect the Lovable prototype.
2. Determine whether an equivalent component already exists.
3. Reuse it where appropriate.
4. Adapt it only when required.
5. Create a new component only when no suitable component exists.

Avoid duplicate components with slightly different styling.

ROUTING:

Inspect the existing Lovable routing implementation.

Map it to the existing ATLAS application navigation.

Do not introduce a second independent routing system unless technically
necessary.

STYLING:

Preserve the Lovable prototype's established styling system where it is
compatible with the ATLAS design direction.

Inspect:

- Tailwind configuration
- CSS variables
- Theme definitions
- Component styles
- Typography
- Spacing
- Responsive behavior
- Animations

Do not blindly copy generated styles that conflict with the existing ATLAS
architecture.

SHADCN/RADIX:

If the Lovable prototype already uses shadcn/Radix components:

- Reuse them
- Preserve their accessibility behavior
- Avoid installing duplicate alternatives
- Avoid rewriting equivalent components

DEPENDENCIES:

Before integration:

- Inspect package.json
- Inspect React version
- Inspect Vite version
- Inspect Electron version
- Inspect Tailwind version
- Inspect shadcn/Radix dependencies
- Identify dependency conflicts

Do not upgrade major dependencies merely for convenience.

Do not downgrade existing dependencies without justification.

ASSETS:

Reuse the existing prototype assets where appropriate.

ATLAS ORB:

The supplied `orb.png` is the authoritative ATLAS orb asset.

Use `orb.png` in the final UI.

Do NOT:

- Generate a replacement orb
- Recreate the orb using CSS
- Substitute a generic icon
- Use a placeholder sphere
- Create a second orb design

The actual file location should be determined from the project assets during
implementation.

ATLAS RUNTIME BOUNDARY:

The renderer communicates with ATLAS through the established IPC/runtime
boundary.

Conceptual architecture:

Lovable React UI
        ↓
React state/hooks
        ↓
IPC
        ↓
Electron Main
        ↓
ATLAS Runtime
        ↓
AT / AI capabilities

The React layer must not directly access privileged Node/Electron APIs unless
they are explicitly exposed through the approved IPC boundary.

AI INTEGRATION:

The UI must consume AI state through ATLAS runtime interfaces.

Examples:

- Conversation state
- LLM generation state
- Tool execution state
- Task state
- Verification state
- Error state

Do not implement AI reasoning inside the renderer.

AT INTEGRATION:

AT modules expose capabilities through the runtime.

The UI displays their state and requests actions through IPC.

Examples:

UI
→ request workspace information
→ IPC
→ AT-01

UI
→ request file operation
→ IPC
→ runtime
→ appropriate AT capability

UI must not directly manipulate the filesystem.

STATE:

Define a clear distinction between:

- UI-local state
- Runtime state
- Persistent application state

Do not duplicate authoritative runtime state unnecessarily inside React.

LOADING STATES:

Every asynchronous runtime operation that can take noticeable time should
have an appropriate UI state.

Examples:

- LLM generating
- File operation running
- Task running
- Search running
- Memory operation running
- Automation running

ERROR STATES:

Runtime errors must be represented accurately.

Do not show "success" merely because an IPC request was sent.

Notifications:

AT-12 owns notification behavior.

The UI renders notification state supplied through the runtime.

Guardian:

AT-07 owns Guardian logic.

The UI displays Guardian state.

The UI must not make Guardian decisions.

TASKS/AUTOMATION:

AI-07 owns task lifecycle.

AT-11 owns automation.

The UI displays their state and provides controls through IPC.

CONFLICT RESOLUTION:

If the Lovable prototype conflicts with the locked ATLAS architecture:

- Preserve ATLAS runtime boundaries.
- Preserve the locked module architecture.
- Preserve the useful visual design.
- Adapt the UI rather than rewriting the runtime architecture.

If the prototype contains functionality that does not exist in the locked
ATLAS architecture, do not create a new ATLAS module just to reproduce it.

DUPLICATE PREVENTION:

Do not create:

- Duplicate sidebar systems
- Duplicate navigation systems
- Duplicate state stores
- Duplicate IPC layers
- Duplicate notification systems
- Duplicate AI interfaces
- Duplicate authentication systems
- Duplicate design systems

Reuse existing ATLAS infrastructure wherever possible.

ELECTRON:

The final UI must work correctly inside Electron.

Verify:

- Asset paths
- Routing
- IPC
- Production build
- Development build
- Window behavior
- Security configuration
- Renderer loading

Do not assume browser-only behavior will work unchanged inside Electron.

PERFORMANCE:

Avoid:

- Unnecessary re-renders
- Large global React state
- Repeated IPC polling
- Duplicate data fetching
- Blocking renderer operations
- Heavy animation during AI/tool execution

Use event-driven updates where appropriate.

TESTING:

Test:

- Prototype components render correctly
- Navigation works
- IPC calls work
- AI state renders correctly
- AT state renders correctly
- Loading states work
- Error states work
- Notifications work
- Guardian state works
- Task state works
- Orb asset loads correctly
- Production Electron build works

VERIFICATION:

After integration:

1. Run the application.
2. Verify every major existing UI surface.
3. Verify navigation.
4. Verify IPC.
5. Verify runtime state.
6. Verify AI interaction.
7. Verify AT interaction.
8. Verify orb.png.
9. Verify responsive behavior.
10. Verify production build.

Do not declare integration complete based solely on successful compilation.

ACCEPTANCE CRITERIA:

The Lovable integration is complete when:

- The existing prototype UI is reused.
- ATLAS runtime architecture remains unchanged.
- Existing reusable components are preserved.
- Duplicate UI systems are avoided.
- IPC boundaries remain intact.
- AI and AT modules remain outside the renderer's business logic.
- orb.png is used as the ATLAS orb.
- The UI works inside Electron.
- Development and production builds work.
- Relevant tests pass.
- Git diff is reviewed.
- Integration changes are committed according to the ATLAS Git workflow.

IMPORTANT:

Do not rebuild the UI from scratch.

Do not create new ATLAS modules.

Do not alter the locked architecture.

Do not move backend/runtime logic into React.

Do not introduce OpenCode or MCP into the ATLAS runtime.

OpenCode remains the external Code Engineer used during development.

Do not invent dependency versions, component names, routing structures, or
implementation details before inspecting the actual Lovable and ATLAS
projects.

This document defines the Lovable-to-ATLAS UI integration contract only.