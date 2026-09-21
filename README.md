# Marinka

**A portable personal AI assistant runtime.**

Marinka is the assistant, not the house.

She owns conversation/session behavior, assistant-side model routing, interpretation and presentation. The environment she is connected to owns identity, policy, resource truth and final execution authority.

That separation makes Marinka portable: move the runtime to another machine or connect it to another environment and it remains Marinka.

> **Marinka asks. The Nest decides.**

## v0.1 candidate

The default provider is deterministic and keyless.

```
text input
 -> fixture interpretation
 -> assistant runtime
 -> optional Nest request
 -> outcome-aware response
```

No paid API, microphone or hardware is required.

```sh
npm test
npm run demo
```

## Important boundary

If Marinka proposes an action while no Nest client is connected, she does not invent success.

If The Nest returns `DENIED`, `FAILED` or `UNCERTAIN`, Marinka presents that result instead of replacing it with optimistic prose.

The shared interface is in `contracts/nest-assistant-v1.json`.

## Future surfaces

Live providers, streaming voice, ESP32 endpoints and richer personality/session persistence are optional layers. They are intentionally not required for this first candidate.

## Status

Candidate, not yet a public release. Private conversations, recordings, family memory and provider credentials are excluded.
