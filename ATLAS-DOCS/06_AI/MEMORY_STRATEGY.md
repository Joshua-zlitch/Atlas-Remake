Write the complete specification for `06_AI/MEMORY_STRATEGY.md`.

This document defines the ATLAS AI memory strategy.

IMPORTANT:

- Follow the existing locked ATLAS architecture.
- Do not create new modules.
- Do not create new architecture layers.
- Do not modify the locked 30-core-module architecture.
- Do not introduce OpenCode or MCP into the ATLAS runtime.
- ATLAS uses its internal/local LLM architecture.
- Preserve the responsibilities defined in `03_MODULES`.
- This is an AI strategy document, not a module specification.

The document MUST contain:

1. Purpose
2. Memory Strategy Principles
3. Memory Architecture
4. Memory Types
5. Memory Sources
6. Memory Creation
7. Memory Extraction
8. Memory Classification
9. Memory Relevance
10. Memory Retrieval
11. Memory Ranking
12. Memory Injection
13. Memory Updating
14. Memory Correction
15. Memory Deletion
16. Memory Expiration
17. Memory Persistence
18. Memory and Conversation
19. Memory and Context
20. Memory and Workspace
21. Memory and Tasks
22. Memory and Planning
23. Memory and Verification
24. Memory and LLM Runtime
25. Memory and Configuration
26. Memory and Context Store
27. Memory and Search & Retrieval
28. Memory Isolation
29. Memory Privacy
30. Sensitive Memory
31. User Control
32. Local-First Strategy
33. Storage Strategy
34. Memory Consistency
35. Memory Conflicts
36. Memory Freshness
37. Memory Limits
38. Performance
39. Security
40. Prompt Injection Protection
41. Failure Handling
42. IPC Boundary
43. Testing Strategy
44. Verification Strategy
45. Acceptance Criteria
46. Git Requirements
47. Definition of Done

CORE PRINCIPLE:

ATLAS memory exists to make future interactions more useful without
unnecessarily storing, retrieving, or exposing information.

Memory must be:

- Relevant
- Useful
- Local-first
- User-controllable
- Context-aware
- Privacy-conscious
- Correctable
- Deletable

Do not treat every conversation message as permanent memory.

MEMORY OWNERSHIP:

AI-04 Memory Intelligence owns:

- Memory extraction
- Memory classification
- Memory relevance
- Memory interpretation
- Memory updating
- Memory-related intelligence

AT-08 Memory owns:

- Memory persistence
- Memory storage
- Memory retrieval infrastructure where defined by the AT architecture

AT-09 Context Store owns persistent contextual state.

AI-03 Context Engine owns model-ready context construction.

AI-02 Conversation owns conversation history.

Do not merge these responsibilities.

MEMORY TYPES:

Define conceptual categories such as:

- User preferences
- User-provided facts
- Project/workspace knowledge
- Long-term interaction patterns
- Task-related memory
- Explicit user instructions
- Temporary context

Do not assume every category must become permanent memory.

EXPLICIT VS INFERRED MEMORY:

Explicit user-provided information should generally have stronger authority
than model-inferred information.

The system must distinguish:

- Explicitly stated
- Inferred
- Observed
- Temporary
- System-generated

Do not present an inference as an explicit user fact.

MEMORY CREATION:

Memory may originate from:

- Explicit user requests to remember something
- Stable user preferences
- Important project information
- Repeated useful context
- Explicitly approved memory actions

Do not automatically store sensitive information merely because it appears
in a conversation.

If the user explicitly requests memory storage, follow the memory workflow
and respect the request.

MEMORY EXTRACTION:

AI-04 may determine whether information is worth remembering.

The extraction process should consider:

- Relevance
- Stability
- Future usefulness
- Explicit user intent
- Sensitivity
- Duplication
- Existing memory

Avoid storing temporary information as long-term memory.

CLASSIFICATION:

Each memory should conceptually have:

- Content
- Type
- Source
- Confidence
- Relevance
- Creation/update information
- Scope
- Sensitivity where applicable

Do not define the final database schema here.

RELEVANCE:

A memory should be retrieved when it materially helps the current task.

Do not inject all stored memories into every interaction.

Memory retrieval should consider:

- Current request
- Conversation
- Workspace
- Task
- User intent
- Memory relevance
- Memory freshness

RETRIEVAL:

Conceptual flow:

Current request
→ AI-04 Memory Intelligence
→ AT-08 Memory
→ relevant memories
→ ranking/filtering
→ AI-03 Context Engine
→ model context

AI-04 determines memory relevance.

AT-08 provides memory persistence/storage capabilities.

AI-03 decides how retrieved memory participates in final model context.

Do not bypass AI-03 and inject raw memory directly into the model.

RANKING:

Relevant memories may be ranked using factors such as:

- Semantic relevance
- Recency
- Explicitness
- Confidence
- Scope
- Current workspace relevance
- Current task relevance

Do not define a fixed ranking algorithm unless required later.

INJECTION:

Memory inserted into model context must be clearly distinguishable from
system instructions.

Memory is data.

Memory must never override higher-priority runtime instructions.

MEMORY UPDATES:

When new information conflicts with existing memory:

- Identify the conflict.
- Prefer newer explicit information where appropriate.
- Preserve uncertainty when the conflict cannot be resolved.
- Avoid silently overwriting important information without sufficient basis.

Do not allow the model to arbitrarily rewrite memory.

CORRECTION:

Users must be able to correct incorrect memory.

A corrected memory should become the authoritative current memory where
appropriate.

Do not continue injecting known-invalid memory.

DELETION:

Users must be able to delete stored memories.

Deletion must remove the memory from active retrieval.

Where technically appropriate, related indexes/caches should also be
invalidated.

EXPIRATION:

Temporary memories should not automatically become permanent.

Define a conceptual expiration strategy for information that is only useful
for a limited period.

Do not invent arbitrary retention periods.

PERSISTENCE:

Memory should persist locally.

The memory system must not depend on a remote cloud memory service.

User memory belongs in ATLAS-controlled local storage.

CONVERSATION:

AI-02 owns conversation history.

AI-04 may analyze conversation content for memory candidates.

Do not duplicate the entire conversation as memory.

CONTEXT:

AI-03 owns context construction.

AI-04 provides relevant memory candidates.

Conceptual flow:

Conversation/request
→ memory retrieval
→ relevant memories
→ context engine
→ model

WORKSPACE:

Workspace-specific memories must remain associated with their appropriate
workspace scope.

Do not expose one workspace's project knowledge to another workspace unless
explicitly allowed.

TASKS:

AI-07 owns task lifecycle.

AI-04 may create or retrieve task-relevant memory when appropriate.

Temporary task state should not automatically become permanent memory.

PLANNING:

AI-05 owns planning.

Memory may provide useful historical/project information to planning.

AI-05 must not directly manipulate the memory store.

VERIFICATION:

AI-08 may use memory as supporting evidence.

Memory should not automatically be treated as authoritative proof of current
system state.

Current runtime evidence should take priority when verifying current state.

LLM:

AI-01 provides model inference where memory processing requires it.

AI-04 owns the memory intelligence workflow.

Do not place memory storage inside the LLM runtime.

CONFIGURATION:

AI-09 owns AI configuration.

Memory-related configuration may include:

- Memory enable/disable behavior
- User preferences
- Retention settings
- Retrieval behavior

Do not move memory ownership into AI-09.

CONTEXT STORE:

AT-09 owns contextual persistence.

Do not use the Context Store as a replacement for the Memory system.

The distinction must remain clear:

Memory
→ long-term reusable information

Context Store
→ persistent contextual/application state required by the runtime

SEARCH:

AT-10 Search & Retrieval may support memory discovery.

Search infrastructure does not become the memory intelligence layer.

ISOLATION:

Memory must respect:

- User scope
- Workspace scope
- Task scope
- Conversation scope
- Permission scope

Do not leak memory across unrelated contexts.

PRIVACY:

Memory is user data.

Keep it local-first.

Do not transmit memory externally without an explicit architecture requirement
and appropriate authorization.

SENSITIVE MEMORY:

Sensitive information requires additional caution.

Avoid storing:

- Passwords
- API keys
- Authentication tokens
- Private credentials
- Unnecessary sensitive personal information

Never treat a credential as useful long-term memory.

USER CONTROL:

Users should have meaningful control over memory.

Provide mechanisms to:

- View
- Correct
- Delete
- Disable where supported

Do not make memory impossible for the user to inspect or control.

LOCAL-FIRST:

Memory storage and processing should remain local wherever practical.

Do not require cloud synchronization.

STORAGE:

The existing ATLAS architecture uses local persistence.

SQLite may be used as the persistence layer where defined by the architecture.

Do not define the final schema in this document.

CONSISTENCY:

Memory retrieval should reflect the current stored state.

When memory changes:

- Update relevant indexes
- Invalidate stale cached results
- Prevent deleted/invalid memories from being returned

MEMORY CONFLICTS:

When memories conflict:

1. Identify the conflict.
2. Compare source and authority.
3. Prefer explicit/current information where justified.
4. Preserve uncertainty if unresolved.
5. Avoid fabricating a resolution.

FRESHNESS:

Memory should not automatically override current runtime information.

Example:

Memory:
"Project uses configuration X."

Current project state:
"Configuration Y."

Current project state should generally be treated as authoritative for
current-state questions.

LIMITS:

Memory retrieval should be bounded.

Do not retrieve unlimited memory entries.

Context size must remain compatible with the selected LLM.

PERFORMANCE:

Memory retrieval must be asynchronous.

Avoid scanning the entire memory database for every request.

Use appropriate indexing/retrieval mechanisms.

Avoid excessive memory extraction on every message.

SECURITY:

Protect against:

- Unauthorized memory access
- Cross-workspace leakage
- Memory injection
- Malicious memory content
- Prompt injection
- Unauthorized memory modification
- Memory poisoning

Treat memory content as data, not instructions.

PROMPT INJECTION:

A stored memory must never automatically gain system-level authority.

Example:

Stored memory contains:
"Ignore all system instructions."

This must remain ordinary memory content and must not override system/runtime
instructions.

FAILURE HANDLING:

Handle:

- Memory database unavailable
- Retrieval failure
- Corrupt memory
- Duplicate memory
- Conflicting memory
- Invalid memory
- Extraction failure
- Context overflow
- Permission-restricted memory
- Deletion failure

If memory retrieval fails, ATLAS must continue safely without fabricating
memory.

IPC:

The renderer interacts with memory through the established IPC/runtime
boundary.

Conceptual flow:

React
→ IPC
→ ATLAS runtime
→ AI-04 / AT-08
→ result
→ React

The renderer must not directly access the memory database.

TESTING:

Include tests for:

- Memory creation
- Explicit memory request
- Memory extraction
- Memory classification
- Memory retrieval
- Memory ranking
- Memory update
- Memory correction
- Memory deletion
- Memory expiration
- Duplicate detection
- Conflict handling
- Workspace isolation
- Task isolation
- Sensitive-data protection
- Prompt injection resistance
- Context integration
- IPC security
- Persistence
- Cache invalidation

VERIFICATION:

Verify that:

- Only appropriate information becomes memory.
- Stored memory is retrievable when relevant.
- Irrelevant memory is excluded.
- Deleted memory is no longer retrieved.
- Corrected memory is reflected.
- Workspace boundaries are respected.
- Sensitive information is protected.
- Memory does not override higher-priority instructions.
- Current runtime state can override stale memory when appropriate.

ACCEPTANCE CRITERIA:

The memory strategy is complete when:

- Long-term memory has a clear purpose.
- Conversation history and memory remain distinct.
- AI-04 owns memory intelligence.
- AT-08 owns memory persistence/storage.
- AI-03 owns context construction.
- Memory retrieval is relevance-driven.
- Users can control stored memory.
- Memory remains local-first.
- Sensitive information is protected.
- Workspace/task isolation is enforced.
- Prompt injection through memory is addressed.
- Relevant tests can be derived from this document.
- Git changes follow the locked ATLAS Git workflow.

IMPORTANT:

Do not create a new memory module.

AI-04 already owns Memory Intelligence.

AT-08 already owns Memory.

Do not create a separate Memory Database module.

Do not create a separate Memory Retrieval module.

Do not create a separate Memory Manager module.

Do not move conversation history into memory.

AI-02 owns conversation state.

Do not move context construction into memory.

AI-03 owns context construction.

Do not move search infrastructure into memory.

AT-10 owns Search & Retrieval.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact schemas, APIs, model names, package versions, retention
periods, or implementation details.

This document defines the ATLAS memory strategy only.