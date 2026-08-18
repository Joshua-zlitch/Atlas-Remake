Write the complete UI design-system specification for `04_UI/DESIGN_SYSTEM.md`.

IMPORTANT:
This document belongs to the already-locked ATLAS documentation structure.

Do NOT create new modules, new architecture layers, new folders, or new UI modules.

ATLAS UI ARCHITECTURE IS LOCKED.

The ATLAS interface will use the existing Lovable React prototype as the
primary UI foundation rather than rebuilding the UI from scratch.

The purpose of this document is to define how the existing prototype becomes
the final ATLAS UI system.

The document MUST cover:

1. UI Design System Identity
2. Design Principles
3. Visual Language
4. Color System
5. Typography
6. Spacing System
7. Border Radius
8. Borders
9. Shadows
10. Elevation
11. Icons
12. Buttons
13. Inputs
14. Cards
15. Panels
16. Navigation
17. Sidebar
18. Header
19. Chat/Conversation Interface
20. Status Indicators
21. Notifications
22. Dialogs
23. Dropdowns
24. Tooltips
25. Loading States
26. Empty States
27. Error States
28. Success States
29. AI State Visualization
30. Guardian State Visualization
31. Task/Automation Visualization
32. Responsive Behavior
33. Accessibility
34. Dark/Light Theme Strategy if supported by the existing prototype
35. Animation and Transition Rules
36. Electron/Desktop Considerations
37. Component Ownership
38. UI-to-Module Boundary
39. Performance Requirements
40. Testing Requirements
41. Acceptance Criteria
42. Definition of Done

SOURCE OF TRUTH:

The Lovable prototype is the primary visual reference.

When the actual Lovable project is integrated, inspect its existing:

- React components
- Tailwind configuration
- CSS variables
- Design tokens
- shadcn/Radix components
- Typography
- Layout system
- Icons
- Animations
- Responsive behavior

Reuse existing implementation wherever practical.

Do NOT recreate equivalent components unnecessarily.

ATLAS ORB:

ATLAS uses the provided `orb.png` as the actual ATLAS orb visual.

The orb must NOT be replaced with a generated CSS approximation,
placeholder sphere, unrelated icon, or newly designed orb.

When implementing the UI:

- Use the provided `orb.png`
- Preserve its visual identity
- Integrate it into the existing design system
- Do not generate a replacement orb
- Do not create another orb asset unless explicitly required later

The exact asset path will be determined by the implementation project.

VISUAL PRINCIPLE:

The final ATLAS UI should feel like one coherent application.

Do not combine the Lovable prototype with a separate unrelated visual system.

The goal is:

Existing Lovable UI
+
ATLAS functionality
=
Final ATLAS interface

COMPONENT PRINCIPLE:

Prefer reusable components.

Avoid creating multiple visually identical implementations of the same UI
element.

Examples:

One button system.

One input system.

One card system.

One dialog system.

One notification system.

One status-indicator system.

One navigation system.

Do not create separate UI systems for individual AT modules.

MODULE BOUNDARY:

UI components display and interact with module state.

They do NOT own module business logic.

Conceptual boundary:

React UI
→ IPC
→ ATLAS runtime
→ module

Do not place:

- Filesystem logic
- Terminal execution
- AI reasoning
- Permission decisions
- Memory logic
- Task execution
- LLM calls

inside React components.

ACCESSIBILITY:

Define requirements for:

- Keyboard navigation
- Focus states
- Screen-reader semantics
- Contrast
- Reduced motion
- Interactive element states
- Error messaging

Do not sacrifice accessibility for visual effects.

ANIMATION:

Animations should communicate state or interaction.

Avoid unnecessary animation that interferes with:

- Chat
- Tool execution
- Task monitoring
- Navigation
- Accessibility

The ATLAS orb may have dynamic states, but those states must correspond to
actual runtime state rather than decorative randomness.

PERFORMANCE:

The UI must remain responsive during:

- LLM generation
- Tool execution
- File operations
- Task execution
- Search
- Memory operations
- Automation
- System monitoring

Long-running operations must not block the renderer.

ACCEPTANCE CRITERIA:

The design system is complete when:

- The Lovable prototype can be used as the visual foundation.
- ATLAS visual identity remains consistent.
- The orb.png asset is explicitly treated as the ATLAS orb.
- Components are reusable.
- UI does not contain backend/business logic.
- Runtime state can be represented visually.
- Accessibility requirements are defined.
- Responsive behavior is defined.
- Animation rules are defined.
- The system can support the locked ATLAS modules without creating new UI
  modules.

IMPORTANT:

Do not redesign the entire ATLAS interface in this document.

Do not create new UI modules.

Do not invent a second design language.

Do not replace the Lovable prototype.

Do not replace orb.png.

Do not introduce implementation-specific package versions unless they already
exist in the project.

This document defines the UI design-system contract.