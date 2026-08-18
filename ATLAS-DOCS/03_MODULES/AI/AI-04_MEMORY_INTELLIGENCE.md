Write the complete module specification for `03_MODULES/AI-04_MEMORY_INTELLIGENCE.md`.

MODULE:
AI-04 — Memory Intelligence

This is one of the 30 locked ATLAS core modules.

Do not create, rename, split, merge, or introduce any ATLAS module.

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

AI-04 provides the intelligence layer responsible for determining what
information should become persistent memory, what existing memories are
relevant, when memory should be updated, and when information should no
longer be considered useful.

AT-08 Memory owns actual persistent memory storage.

AI-04 owns semantic memory decisions.

AI-03 Context Engine owns final context construction.

AI-04 must not directly become the database or persistent storage layer.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Memory Intelligence Model
9. Memory Candidate Detection
10. Relevance Evaluation
11. Memory Creation
12. Memory Update
13. Memory Deduplication
14. Memory Retention
15. Memory Expiration
16. Memory Deletion Recommendations
17. Memory Retrieval
18. Context Integration
19. Conversation Integration
20. User Control
21. AI Integration
22. Permission Boundary
23. IPC Boundary
24. Events
25. Error Handling
26. Security
27. Privacy
28. Performance
29. Testing Requirements
30. Verification Requirements
31. Acceptance Criteria
32. Failure Conditions
33. Git Requirements
34. Implementation Notes
35. Definition of Done

RESPONSIBILITIES:

AI-04 owns:

- Memory candidate identification
- Semantic relevance evaluation
- Memory creation decisions
- Memory update decisions
- Duplicate detection
- Memory usefulness evaluation
- Retention decisions
- Memory retrieval relevance
- Memory deletion recommendations
- Memory intelligence events

AI-04 does NOT own:

- Persistent memory storage
- Database operations
- Context construction
- Conversation lifecycle
- LLM runtime
- Planning
- Tool execution
- Task lifecycle
- Search implementation
- Filesystem
- Terminal
- Permissions
- Notifications
- Workspace ownership
- OpenCode
- MCP development infrastructure

MEMORY INTELLIGENCE MODEL:

Conceptual flow:

Conversation/task information
→ AI-04
→ determine whether information has long-term value
→ candidate memory
→ evaluate relevance/privacy
→ AT-08 Memory
→ persist

Do not persist every message.

Memory should generally represent information with future usefulness.

Examples may include:

- Stable user preferences
- Long-lived project facts
- Important recurring requirements
- Explicit user-requested memories
- Other information intentionally retained by the system

Do not assume any particular personal information should be stored.

MEMORY CANDIDATE DETECTION:

AI-04 may identify candidate information based on:

- Explicit user request to remember
- Stable information
- Repeatedly relevant project information
- Long-term preferences
- Important persistent constraints

The final criteria should remain configurable/evolvable.

Do not invent a rigid scoring formula.

RELEVANCE:

Memory relevance should consider:

- Current request
- Current workspace
- Current task
- Conversation
- Memory metadata
- Recency where appropriate
- Long-term usefulness

AI-04 should not return all memories for every request.

CREATION:

Conceptual flow:

Candidate
→ validate usefulness
→ check privacy
→ check duplicates
→ create/update decision
→ AT-08

If the information is not useful for future interactions, do not persist it.

UPDATE:

When new information conflicts with existing memory:

- Identify the existing memory
- Determine whether the new information supersedes it
- Update rather than blindly duplicate where appropriate
- Preserve consistency

Do not silently overwrite important information without an appropriate
decision process.

DEDUPLICATION:

AI-04 should detect semantically equivalent or redundant memories.

Avoid storing multiple copies of the same information.

Do not assume textual equality is sufficient for semantic duplicates.

RETENTION:

Memory should not grow without bound.

AI-04 should be able to identify:

- Outdated memories
- Contradictory memories
- Redundant memories
- Low-value memories

AT-08 performs actual deletion/update operations.

EXPIRATION:

Some memories may become stale.

AI-04 may recommend expiration or removal.

Do not automatically delete user-controlled memory without an appropriate
policy.

DELETION:

Users must retain control over persistent memory.

If the user explicitly asks to forget something:

AI-04
→ identify matching memory
→ AT-08
→ delete
→ verify

Do not merely stop retrieving a memory while leaving it stored when explicit
deletion was requested.

RETRIEVAL:

AI-03 may request relevant memories.

AI-04 determines relevance and requests/retrieves appropriate memory data
through AT-08.

AT-10 may assist with retrieval/search.

AI-04 remains responsible for semantic relevance.

CONTEXT:

AI-03 owns final context construction.

AI-04 provides relevant memory candidates/results.

Do not directly inject memory into the LLM.

CONVERSATION:

AI-02 may provide conversation information to AI-04 for memory evaluation.

AI-04 should not take ownership of conversation history.

USER CONTROL:

Memory must be understandable and controllable.

Users should be able to:

- Know what is remembered where appropriate
- Delete memory
- Correct memory
- Prevent inappropriate retention where supported

Do not make memory completely autonomous and invisible.

AI INTEGRATION:

AI-04 may use AI-01 LLM Runtime for semantic evaluation where appropriate,
but the final architecture should avoid unnecessary recursive AI calls.

Do not assume AI-04 must invoke an LLM for every memory operation.

AI-03 consumes memory relevance results.

AI-02 provides conversation information.

AI-08 may verify memory-related decisions where required.

PERMISSIONS:

AI-04 does not grant permission to access memory.

AT-16 remains the permission authority.

Sensitive memory access must follow the appropriate authorization boundary.

IPC:

Renderer
→ IPC
→ runtime
→ approved memory interface

The renderer must not directly modify memory intelligence state.

User memory-management actions must go through approved runtime interfaces.

EVENTS:

Use AT-17 Event Runtime.

Conceptual events:

- Memory candidate detected
- Memory relevance evaluated
- Memory created
- Memory updated
- Memory marked stale
- Memory deletion requested
- Memory deletion completed
- Memory intelligence failure

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Ambiguous memory
- Conflicting information
- Memory unavailable
- Storage failure
- Relevance evaluation failure
- Duplicate detection failure
- Permission denial
- LLM/semantic evaluation failure

When intelligence is uncertain, do not confidently create harmful or
unwanted persistent memory.

SECURITY:

Protect against:

- Prompt injection causing unwanted memory creation
- Malicious instructions stored as memory
- Sensitive information retention
- Unauthorized memory access
- Memory poisoning
- Cross-workspace memory contamination

User-provided content must not automatically become trusted persistent
memory.

PRIVACY:

Memory is potentially sensitive.

Use:

Identify candidate
→ minimize information
→ assess usefulness
→ assess sensitivity
→ persist only when appropriate

Do not store credentials, secrets, or unnecessary private information as
ordinary memory.

PERFORMANCE:

Memory intelligence must not cause excessive latency for normal conversation.

Do not run expensive semantic evaluation on every message unless necessary.

Use appropriate heuristics, batching, or deferred evaluation where practical.

TESTING:

Include tests for:

- Explicit remember request
- Non-memory conversation
- Stable preference
- Project information
- Duplicate detection
- Conflicting memory
- Memory update
- Memory retrieval relevance
- Stale memory
- User deletion
- Permission denial
- Prompt injection
- Sensitive information
- Cross-workspace isolation
- Storage failure
- AI evaluation failure

VERIFICATION:

Important memory mutations should be verified:

Decision
→ AT-08 operation
→ verify persistent state
→ report result

Do not claim memory was stored when AT-08 failed.

Do not claim memory was deleted when it remains present.

ACCEPTANCE CRITERIA:

AI-04 is complete when:

- Candidate memories can be identified appropriately.
- Irrelevant conversation content is not automatically persisted.
- Relevant memories can be retrieved.
- Duplicate memories are controlled.
- Conflicting information is handled safely.
- Users can control/delete memory.
- AT-08 remains the persistence authority.
- AI-03 remains the context-construction authority.
- Memory decisions respect privacy and security boundaries.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Memory Manager module.

Do not create a separate Memory Scoring module.

Do not create a separate Semantic Memory module.

Memory intelligence belongs entirely to AI-04.

AT-08 owns persistent memory.

AI-03 owns context construction.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact scoring algorithms, model requirements, schemas, APIs,
package versions, or implementation details.

This document defines the module contract only.