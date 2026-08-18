Write the complete content for `01_PRODUCT/PRODUCT_VISION.md`.

This document defines the product vision for the new ATLAS rebuild.

ATLAS is a local-first desktop AI system designed to let the user interact with their computer through natural language while maintaining local data ownership, user control, permissions, and verifiable execution.

Describe the product without going into unnecessary low-level implementation details.

Cover:

1. Vision
2. Product goal
3. Product philosophy
4. Local-first principles
5. User control
6. Intelligence and action
7. Transparency
8. Core product experience
9. Core capability groups
10. AI interaction model
11. Computer interaction
12. Memory
13. Context
14. Planning
15. Tool execution
16. Verification
17. Automation
18. Guardian
19. Voice
20. Vision
21. Permissions and safety
22. User relationship with ATLAS
23. Product boundaries
24. Interface vision
25. Example user scenarios
26. Product success criteria
27. Product quality principles
28. Long-term direction
29. Product completion criteria

Use the locked architecture as context:

- UX = 4 modules
- AT = 17 modules
- AI = 9 modules
- Core = 30 modules
- REL-01 = Packaging & Release
- Total = 31 modules

Use these exact conceptual relationships:

User
→ ATLAS UI
→ AI understanding/context/planning
→ Tool Orchestrator
→ Permissions
→ AT capability
→ Result
→ Verification
→ User

Explain that ATLAS is not simply a chatbot. Its purpose is to connect natural-language intent with controlled, verifiable interaction with the user's local computer.

The product should prioritize:

- Local operation
- User control
- Privacy through local ownership
- Reliable execution
- Verification
- Clear communication
- Maintainability
- Useful automation
- Persistent memory
- Practical computer interaction

The existing Lovable React prototype is the UI foundation and should be reused rather than recreated from scratch.

OpenCode and the ChatGPT development workflow are development infrastructure and are not part of the finished ATLAS product.

Do not introduce additional product modules, cloud-first architecture, new services, or capabilities that have not been established.

Do not describe speculative future features as current ATLAS capabilities.

Keep the document focused on what ATLAS is intended to be and what a successful ATLAS product should accomplish.