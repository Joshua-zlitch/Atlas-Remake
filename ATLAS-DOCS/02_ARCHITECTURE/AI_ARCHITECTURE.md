Write the complete content for `02_ARCHITECTURE/AI_ARCHITECTURE.md`.

This document defines the technical architecture of the ATLAS AI layer.

LOCKED AI MODULES:

- AI-01 LLM Runtime
- AI-02 Conversation
- AI-03 Context Engine
- AI-04 Memory Intelligence
- AI-05 Planner
- AI-06 Tool Orchestrator
- AI-07 Task Manager
- AI-08 Reasoning & Verification
- AI-09 AI Configuration

The AI layer contains exactly 9 modules.

ATLAS is local-first.

The initial local LLM runtime is Ollama.

OpenCode is NOT part of the ATLAS runtime and must not appear as an AI
runtime dependency.

Define the responsibility of every AI module.

## AI-01 — LLM Runtime

Responsible for:

- Communication with Ollama
- Model availability
- Model selection
- Prompt execution
- Response handling
- Streaming where supported
- Runtime-level model configuration

It must not own conversation history, memory intelligence, task planning, or
computer tool execution.

## AI-02 — Conversation

Responsible for:

- User conversation
- Conversation state
- Response generation flow
- Conversation history handling
- User-facing AI interaction

It should coordinate with the Context Engine rather than independently
constructing complex context.

## AI-03 — Context Engine

Responsible for constructing relevant AI context from available sources.

Potential sources include:

- Current conversation
- Active workspace
- Task state
- Memory
- Relevant files
- Tool results
- Runtime state

The Context Engine must not automatically inject all available data into
every LLM request.

## AI-04 — Memory Intelligence

Responsible for determining how persistent memory should be used by the AI.

It works with:

- AT-08 Memory
- AI-03 Context Engine
- AI-02 Conversation

It must distinguish between:
- information worth remembering
- information worth retrieving
- information that should remain temporary

## AI-05 — Planner

Responsible for converting complex user objectives into actionable plans.

A plan may contain:

- Objectives
- Steps
- Dependencies
- Required capabilities
- Verification requirements
- Expected outcomes

Simple requests do not need unnecessary planning.

## AI-06 — Tool Orchestrator

Responsible for selecting and invoking AT capabilities.

General flow:

AI-05 Planner
→ AI-06 Tool Orchestrator
→ AT-16 Permissions
→ AT Capability
→ Result

The Tool Orchestrator must not bypass AT-16 Permissions.

It must process tool results and return structured information to the AI
pipeline.

## AI-07 — Task Manager

Responsible for multi-step task state.

Define states such as:

- CREATED
- PLANNED
- RUNNING
- WAITING
- VERIFYING
- COMPLETED
- FAILED
- CANCELLED

The exact implementation can be decided later.

Task Manager should coordinate task state without becoming the owner of
individual AT capabilities.

## AI-08 — Reasoning & Verification

Responsible for evaluating results.

It should determine whether:

- an operation succeeded
- the result matches expectations
- additional actions are required
- the task can be considered complete
- an error needs recovery

The AI must not claim successful completion based only on an unverified tool
response when verification is practical.

## AI-09 — AI Configuration

Responsible for:

- Model configuration
- AI preferences
- Model parameters
- System-level AI settings
- Context limits
- Runtime configuration

AI-09 must not become the owner of unrelated application configuration.

---

# AI REQUEST PIPELINE

Define the general pipeline:

User
→ AI-02 Conversation
→ AI-03 Context Engine
→ AI-05 Planner when required
→ AI-06 Tool Orchestrator when action is required
→ AT-16 Permissions
→ AT Capability
→ Result
→ AI-08 Reasoning & Verification
→ AI-02 Conversation
→ User

Explain that the pipeline is adaptive.

A simple conversational request may be:

User
→ Conversation
→ Context
→ LLM
→ Response

A computer task may use the complete planning and tool pipeline.

---

# LOCAL LLM PIPELINE

Define:

ATLAS
→ AI-01 LLM Runtime
→ Ollama
→ Local Model
→ Response
→ AI pipeline

Explain model lifecycle:

1. Detect Ollama availability.
2. Determine available models.
3. Select configured model.
4. Construct request.
5. Send request.
6. Receive response.
7. Process response.
8. Return result to the appropriate AI module.

Define behavior when Ollama is unavailable.

ATLAS should provide a clear failure state rather than pretending the AI
runtime is operational.

---

# CONTEXT PIPELINE

Define:

User Request
+
Conversation
+
Relevant Memory
+
Workspace
+
Task State
+
Relevant Tool Results
+
Relevant Runtime Context
→ AI-03 Context Engine
→ LLM Context

Explain context prioritization and relevance.

Do not assume every source is included in every request.

---

# MEMORY PIPELINE

Define:

Conversation / Task
→ AI-04 Memory Intelligence
→ AT-08 Memory
→ Persistent Local Storage

And retrieval:

User Request
→ AI-04 Memory Intelligence
→ AT-08 Memory
→ Relevant Memories
→ AI-03 Context Engine

---

# TOOL EXECUTION PIPELINE

Define:

User Intent
→ AI-05 Planner
→ AI-06 Tool Orchestrator
→ AT-16 Permissions
→ AT Capability
→ Result
→ AI-08 Verification

Explain that tool calls must have enough information to identify:

- Required capability
- Required inputs
- Expected result
- Verification requirement

Do not invent a final tool-call JSON schema yet.

---

# TASK PIPELINE

Define how AI-07 Task Manager coordinates multi-step tasks.

Example:

Task Created
→ Planned
→ Step Execution
→ Result
→ Verification
→ Next Step
→ Completion

If a step fails:

Step Failure
→ AI-08 Analysis
→ Retry / Recovery / User Notification
→ Continue or Fail

Do not prescribe automatic retries for every failure.

---

# AI ERROR HANDLING

Cover:

- Ollama unavailable
- Model unavailable
- Invalid model response
- Context construction failure
- Tool selection failure
- Permission denial
- Tool execution failure
- Verification failure
- Task timeout
- Task cancellation

The AI must distinguish between:

- failure
- denial
- cancellation
- unavailable dependency
- incomplete verification

Never convert an error into a successful response.

---

# AI SECURITY

Define boundaries:

- AI cannot bypass AT-16 Permissions.
- AI cannot directly access privileged OS operations.
- AI should receive only context relevant to the task.
- Sensitive information should not be unnecessarily included in prompts.
- Tool results should be handled as potentially untrusted data.
- AI-generated instructions must not automatically override system rules.
- User permissions remain authoritative.

---

# AI MODULE DEPENDENCY RULES

Use these relationships:

AI-01
→ provides LLM capability

AI-02
→ conversation

AI-03
→ context

AI-04
→ memory intelligence

AI-05
→ planning

AI-06
→ tool orchestration

AI-07
→ task state

AI-08
→ reasoning and verification

AI-09
→ AI configuration

Important relationships:

AI-03 ↔ AI-04
AI-03 → AI-02
AI-05 → AI-06
AI-06 → AT-16
AI-06 → AT capabilities
AI-08 ← tool/task results
AI-09 → AI-01 configuration

Avoid circular dependencies.

Do not allow AI modules to directly modify another module's internal state.

Use explicit interfaces.

---

# AI AND UX

The AI layer provides state and results to the UX layer.

The AI must not directly manipulate React UI components.

General relationship:

AI
→ Runtime Interface
→ UX
→ User

UX-03 State Visualization may display AI states such as:

- Listening
- Thinking
- Planning
- Executing
- Verifying
- Completed
- Failed

The exact visual implementation belongs to the UX documentation.

---

# AI AND AT

The AI layer requests capabilities from the AT layer through defined
interfaces.

The AI must not own AT functionality.

For example:

AI requests filesystem operation
→ AT-02 performs filesystem operation

AI requests terminal execution
→ AT-04 performs terminal operation

AI requests system information
→ AT-06 provides system information

AI requests memory
→ AT-08 provides memory capability

AI requests automation
→ AT-11 manages automation

---

# NON-GOALS

Do not:

- Add AI modules.
- Create an additional autonomous-agent module.
- Create a separate reasoning module outside AI-08.
- Create a separate orchestration module outside AI-06.
- Make OpenCode an AI runtime dependency.
- Require cloud AI.
- Define exact model names before model strategy is documented.
- Define final prompt schemas before the engineering protocol is documented.

The AI architecture must remain within the locked 9-module AI layer.

---

# FINAL AI ARCHITECTURE

AI-01 LLM Runtime
        ↓
AI-02 Conversation
        ↕
AI-03 Context Engine
        ↕
AI-04 Memory Intelligence
        ↓
AI-05 Planner
        ↓
AI-06 Tool Orchestrator
        ↓
AT-16 Permissions
        ↓
AT Capability
        ↓
AI-08 Reasoning & Verification

AI-07 Task Manager coordinates multi-step work.

AI-09 AI Configuration configures the AI system.

The AI layer is local-first and initially powered through Ollama.