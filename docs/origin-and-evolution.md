# Origin and evolution

Marinka emerged from a practical question:

> If voice is the easiest way to control a complex home system, why not build a personal assistant instead of adapting the house around a generic one?

The project evolved from a voice surface into a portable assistant runtime.

The key architectural decision was to keep the assistant separate from the environment authority.

```text
Marinka
  -> conversation / personality / providers / sessions
  -> requests environment capability

The Nest
  -> identity / policy / state / execution / evidence
```

That separation means Marinka can move between machines and environments without carrying the authority model with her.

## Engineering role

The human technical owner:
- defined the assistant/environment split;
- selected and compared provider approaches;
- designed experiments around latency/reliability/quality;
- integrated voice and hardware paths;
- changed test methodology when the evaluator itself was wrong;
- owns acceptance and release decisions.

The implementation is AI-assisted, but the architecture and verification strategy are human-owned.
