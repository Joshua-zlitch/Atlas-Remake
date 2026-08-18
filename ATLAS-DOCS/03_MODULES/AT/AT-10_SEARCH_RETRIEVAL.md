Write the complete module specification for `03_MODULES/AT-10_SEARCH_RETRIEVAL.md`.

MODULE:
AT-10 — Search & Retrieval

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

AT-10 provides local search and retrieval capabilities across approved
ATLAS data sources.

It allows ATLAS to locate relevant information without requiring every source
to be loaded into memory or injected into an AI request.

AT-10 owns search/retrieval mechanisms.

It does NOT own:

- Memory data
- Context construction
- Filesystem operations
- Workspace identity
- AI reasoning
- LLM execution
- Permission policy

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Search Sources
9. Search Model
10. Query Processing
11. Result Ranking
12. Result Relevance
13. Filesystem Search Boundary
14. Memory Search Boundary
15. Workspace Search Boundary
16. Context Integration
17. AI Integration
18. Indexing
19. Index Lifecycle
20. Permission Boundary
21. IPC Boundary
22. Events
23. Error Handling
24. Security
25. Privacy
26. Performance
27. Testing Requirements
28. Verification Requirements
29. Acceptance Criteria
30. Failure Conditions
31. Git Requirements
32. Implementation Notes
33. Definition of Done

RESPONSIBILITIES:

AT-10 owns:

- Search queries
- Search execution
- Result retrieval
- Result ranking
- Search metadata
- Search/index lifecycle
- Relevant local indexing where required
- Search result filtering
- Search result freshness handling
- Retrieval of approved local information

AT-10 does NOT own:

- Memory persistence
- Memory intelligence
- Context construction
- Workspace management
- Filesystem mutation
- Terminal execution
- Process management
- Permissions policy
- LLM execution
- Planning
- Tool orchestration
- Task management
- OpenCode
- MCP development infrastructure

SEARCH SOURCES:

Potential approved sources include:

- Workspace/project files
- Memory
- Relevant application data
- Other explicitly indexed local sources

Search must respect source ownership.

Example:

AT-08 owns memory data.
AT-10 provides search/retrieval access to memory when authorized.

AT-01 owns workspace identity.
AT-10 may search within the active workspace.

AT-02 owns filesystem operations.
AT-10 may read/search filesystem content through approved interfaces.

Do not transfer ownership of source data into AT-10.

QUERY PROCESSING:

Define a conceptual flow:

User/AI query
→ normalize/interpret query
→ determine approved search scope
→ execute search
→ rank/filter results
→ return structured results

Do not invent the final query schema.

RESULT RANKING:

Results should be ordered according to relevance.

Potential signals may include:

- Query relevance
- Source relevance
- Recency where appropriate
- Workspace relevance
- Exact-match strength
- Semantic relevance where supported

Do not mandate a specific search algorithm unless explicitly decided later.

RESULT FRESHNESS:

Search results should identify stale or unavailable information where relevant.

Do not present cached information as current when freshness matters.

FILESYSTEM SEARCH:

AT-10 may search files and directories.

AT-02 remains responsible for actual filesystem access.

AT-10 must not become a replacement filesystem API.

WORKSPACE:

AT-01 provides active workspace context.

AT-10 may restrict search to that workspace.

A workspace boundary must not automatically authorize access to unrelated
locations.

MEMORY:

AT-08 owns memory.

AT-10 may provide retrieval/search capability over memory.

AI-04 Memory Intelligence decides how retrieved memory should be interpreted
and used.

CONTEXT:

AI-03 Context Engine may request search results.

Use:

AI-03
→ AT-10
→ relevant results
→ AI-03
→ final AI context

Do not automatically inject all search results into the LLM.

AI INTEGRATION:

AI-05 Planner may request search when planning requires information.

AI-06 Tool Orchestrator may invoke search as an AT capability.

AI-08 Reasoning & Verification may use retrieved evidence.

PERMISSIONS:

Search may expose sensitive information.

Use:

Request
→ determine scope
→ AT-16 Permissions where required
→ search
→ filtered results

Do not create a separate search permission system.

IPC:

Renderer
→ IPC
→ runtime
→ AT-10

The renderer must not directly access indexes or databases.

EVENTS:

Conceptual events:

- Search started
- Search completed
- Results available
- Index updated
- Indexing failed
- Search failed
- Source unavailable

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Invalid query
- Empty query
- Source unavailable
- Index unavailable
- Index corruption
- Search timeout
- Permission denied
- Stale source
- Search failure

Do not return fabricated results when a source is unavailable.

SECURITY:

Protect against:

- Unauthorized data discovery
- Cross-workspace leakage
- Sensitive-data exposure
- Malicious search queries
- Untrusted indexed content
- Prompt injection contained in indexed documents

Search results are data.

They must not automatically become executable instructions.

PRIVACY:

Search should access only the minimum required scope.

Do not index sensitive data unnecessarily.

Do not silently send local search data to external services.

The default architecture is local-first.

PERFORMANCE:

Avoid rebuilding indexes unnecessarily.

Support incremental updates where practical.

Do not scan the entire filesystem for every query.

Large result sets should be limited/paginated or otherwise controlled.

TESTING:

Include tests for:

- Exact search
- Broad search
- Workspace-scoped search
- Memory search
- Missing source
- Empty query
- Ranking
- Filtering
- Index creation
- Index update
- Index corruption
- Permission denial
- Cross-workspace isolation
- Large result sets
- Performance
- IPC boundary

VERIFICATION:

Search results should include enough source information for the caller to
understand where they came from when appropriate.

Do not claim a result is authoritative merely because it ranked highly.

ACCEPTANCE CRITERIA:

AT-10 is complete when:

- Relevant local information can be searched.
- Results are reasonably ranked.
- Search respects source ownership.
- Workspace boundaries are respected.
- Memory remains owned by AT-08.
- Context construction remains owned by AI-03.
- Search does not automatically execute indexed content.
- Search failures are reported accurately.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create separate File Search, Memory Search, or Semantic Search
modules.

All search/retrieval capability belongs to AT-10.

Do not create a separate Index Manager module.

Index management is an internal implementation responsibility of AT-10.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent exact search engines, vector databases, schemas, APIs, package
versions, or implementation details.

This document defines the module contract only.