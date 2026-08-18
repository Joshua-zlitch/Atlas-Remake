Write the complete module specification for `03_MODULES/AT-14_VOICE.md`.

MODULE:
AT-14 — Voice

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

AT-14 provides voice input and output capabilities for ATLAS.

It acts as the bridge between human speech/audio and the ATLAS AI
interaction pipeline.

AT-14 owns voice capture, speech-to-text, text-to-speech, audio lifecycle,
and voice state.

AI-02 Conversation owns conversational intelligence.

AI-01 LLM Runtime owns LLM execution.

AT-14 must not become an AI reasoning module.

The document MUST contain:

1. Module Identity
2. Purpose
3. Responsibilities
4. Non-Responsibilities
5. Inputs
6. Outputs
7. Dependencies
8. Voice Pipeline
9. Audio Input
10. Speech Recognition
11. Transcript Handling
12. Text-to-Speech
13. Audio Output
14. Voice Lifecycle
15. Conversation Integration
16. AI Integration
17. Context Integration
18. Permission Boundary
19. IPC Boundary
20. Events
21. Error Handling
22. Security
23. Privacy
24. Performance
25. Accessibility
26. Testing Requirements
27. Verification Requirements
28. Acceptance Criteria
29. Failure Conditions
30. Git Requirements
31. Implementation Notes
32. Definition of Done

RESPONSIBILITIES:

AT-14 owns:

- Microphone access
- Audio capture
- Audio input lifecycle
- Speech-to-text capability
- Transcript production
- Text-to-speech capability
- Audio output lifecycle
- Voice state
- Voice-related errors
- Voice-related events

AT-14 does NOT own:

- Conversation intelligence
- LLM execution
- Planning
- Tool orchestration
- Memory
- Context construction
- Filesystem
- Terminal
- Process management
- Application control
- Permissions policy
- Notifications
- Vision
- OpenCode
- MCP development infrastructure

VOICE INPUT PIPELINE:

Define:

Microphone
→ AT-14 Voice
→ speech recognition
→ transcript
→ AI-02 Conversation
→ AI pipeline

The transcript should be treated as user input.

Do not automatically execute actions merely because speech recognition
produced text.

VOICE OUTPUT PIPELINE:

Define:

AI response
→ AT-14 Voice
→ text-to-speech
→ audio output
→ user

AT-14 does not generate the response content.

AI-02 Conversation provides the response.

VOICE LIFECYCLE:

Define conceptual states:

- IDLE
- LISTENING
- PROCESSING
- TRANSCRIBING
- SPEAKING
- STOPPED
- ERROR

These are conceptual states only.

A microphone should not remain active indefinitely without an intentional
user/runtime state permitting it.

TRANSCRIPT HANDLING:

Transcripts may contain sensitive information.

AT-14 should pass only the required transcript to the AI pipeline.

Do not persist transcripts automatically unless the conversation/data
architecture requires it.

AI INTEGRATION:

AI-02 Conversation consumes transcripts.

AI-03 Context Engine may include relevant voice-derived context.

AI-01 LLM Runtime remains responsible for LLM communication.

AI-14 does not exist.

Do not invent a new voice-AI module.

PERMISSIONS:

Microphone access may require user permission.

Use:

Voice request
→ permission check
→ AT-16 where applicable
→ AT-14
→ microphone access

AT-14 must not silently bypass operating-system or ATLAS permission
requirements.

Voice output may have different permission requirements depending on the
platform.

IPC:

Renderer
→ IPC
→ runtime
→ AT-14

Do not expose unrestricted microphone/system audio APIs to the renderer.

Validate voice requests.

EVENTS:

Conceptual events:

- Voice started
- Listening started
- Audio captured
- Transcript available
- Speaking started
- Speaking completed
- Voice stopped
- Voice error

Do not define final event schemas.

ERROR HANDLING:

Cover:

- Microphone unavailable
- Microphone permission denied
- Speech recognition failure
- Unsupported language
- Empty/invalid transcript
- Text-to-speech failure
- Audio output unavailable
- User cancellation
- Device disconnected

Never fabricate a transcript when recognition failed.

SECURITY:

Protect against:

- Unauthorized microphone access
- Accidental continuous recording
- Sensitive transcript leakage
- Malicious voice-derived commands
- Untrusted transcription

Speech-recognition output is user input, not trusted system instruction.

PRIVACY:

Voice data should remain local by default where the selected voice
implementation supports local processing.

Do not retain raw audio unnecessarily.

Do not send audio externally unless the product architecture explicitly
allows and authorizes it.

Do not expose voice recordings to unrelated modules.

PERFORMANCE:

Voice capture and processing must not block the UI.

Streaming audio may be used where appropriate.

Avoid unnecessary retention of raw audio.

ACCESSIBILITY:

Voice must complement, not replace, keyboard/mouse interaction.

Provide clear visual indication when:

- Listening
- Processing
- Speaking
- Stopped
- Failed

Users must be able to stop voice interaction.

TESTING:

Include tests for:

- Microphone permission
- Voice start/stop
- Speech recognition
- Transcript delivery
- Empty transcript
- Text-to-speech
- Audio output
- Cancellation
- Device unavailable
- IPC boundary
- Privacy behavior
- State transitions

ACCEPTANCE CRITERIA:

AT-14 is complete when:

- Supported microphone input works.
- Speech can be converted into usable transcript data.
- Transcript data reaches the AI conversation pipeline.
- AI responses can be converted into speech where supported.
- Voice lifecycle is visible and controllable.
- Microphone permissions are respected.
- Raw audio is not unnecessarily retained.
- Voice failures are accurately reported.
- Relevant tests pass.
- Git diff is reviewed.
- Implementation is committed according to the ATLAS Git workflow.

IMPORTANT:

Do not create a separate Speech-to-Text module.

Do not create a separate Text-to-Speech module.

Do not create a separate Audio Manager module.

All voice capability belongs to AT-14.

Do not move conversational intelligence into AT-14.

AI-02 owns conversation.

Do not introduce OpenCode or MCP into the ATLAS runtime.

Do not invent specific speech engines, APIs, package versions, or
implementation details.

This document defines the module contract only.