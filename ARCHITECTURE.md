# Marinka architecture

Marinka is a portable assistant runtime.

```text
Text / later voice
      |
Provider / interpretation
      |
Conversation runtime
      |
Optional environment request
      |
The Nest outcome
      |
Outcome-aware response
```

## Portability boundary

Personality, conversation behavior, provider routing and user interaction belong to Marinka.

Identity, permissions, resource truth and execution authority belong to the connected environment.

This keeps Marinka portable between machines and Nest installations.

## R&D loop

Provider/framework choices are treated as experiments.

Each experiment should state the property it is trying to improve - latency, quality, cost, reliability, portability or failure behavior - and use a test that actually measures that property.

A benchmark harness is itself part of the verification system and must be calibrated before its results are trusted.

## Human ownership

The human owner defines experiments, acceptance criteria, architectural boundaries and integration decisions. AI tooling accelerates implementation and research, but does not own product direction or release authority.

## Public beta boundary

The public v0.1 path uses a deterministic fixture provider and optional Nest client so the runtime boundary can be reproduced without external credentials. Live provider and hardware work remain separately evidenced private R&D.
