# Marinka architecture

Marinka is a portable assistant runtime.

```
Text / later voice
      |
Assistant provider / interpretation
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

Personality, conversation behavior and provider routing belong to Marinka.

Identity, permissions, resource truth and execution authority belong to the connected environment.

This keeps Marinka portable between machines and Nest installations.
