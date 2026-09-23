# Engineering discipline

This document describes the engineering principles behind Marinka and the wider
private R&D program it belongs to. It is written to be useful to anyone building
an assistant that is allowed to *ask* but not allowed to *decide*.

The short version: most of the interesting engineering is not in making the model
talk. It is in making sure the system never converts confident language into
false execution truth.

## 1. Authority is separated from language

A language model is good at producing meaning and proposals. It is not a source
of permission, state or physical truth.

```text
utterance
 -> interpretation (meaning / proposal)
 -> deterministic resolver (proposal -> capability)
 -> environment authority (identity, policy, consent)
 -> execution + read-back evidence
 -> outcome
```

The assistant owns conversation, personality, provider routing and presentation.
The connected environment owns identity, policy, resource truth and final
execution authority. A model may never grant authority or certify that a physical
action succeeded.

## 2. Routing is deterministic

Natural language is ambiguous; execution is not. The system converts free text
into a meaning/proposal, then uses a deterministic resolver to map that meaning to
a capability or behavior.

Consequences:

- benchmark or evaluation fixtures are **never** used as runtime phrase routing;
- the same meaning maps to the same capability every time;
- routing is testable without a live model.

Evaluation corpora exist to measure quality, not to become the product's control
flow.

## 3. Fail closed

When the system cannot establish authority, intent or truth, it says so. It does
not guess and it does not claim success.

Outcomes are explicit and typed, for example: `SUCCESS`, `CONFIRMATION_REQUIRED`,
`CLARIFICATION_REQUIRED`, `DENIED`, `FAILED`, `UNCERTAIN`, `UNSUPPORTED`.

A missing answer is a valid answer. An invented `Done` is a defect.

## 4. Telemetry must be honest

Observed during this program: an unmeasured value silently becoming a numeric
zero. In JavaScript, `Number(null) === 0`, so a naive cost calculation can report
`$0.0000` for a stage that was never measured.

Rules that came out of that:

- absent means absent: `null`/`undefined`/`''` are *unmeasured*, not zero;
- a real `0` is a valid measurement and must stay `0`;
- provider-reported values win over anything derived;
- a derived estimate is allowed only with a documented, attributable rate and is
  labelled as derived, separately from measured values;
- partial totals carry an explicit completeness flag so a sum of what exists can
  never be presented as a full bill;
- a UI that cannot show a value shows *unavailable*, not a plausible number.

## 5. Fallbacks are explicit

Provider reliability work is part of the product, not an afterthought.

- provider timeout and failure are first-class outcomes, with their own tests;
- fallback is visible; there is no hidden provider substitution;
- a fallback result is still bound to the same authority and evidence rules;
- cost, latency and failure classification are treated as measured facts.

## 6. One source of truth per concern

Duplicated state is where correctness goes to die. The system deliberately keeps:

- one settings store (with an explicit "current value / source / editable /
  applies to" provenance view);
- one telemetry source;
- one navigation manifest;
- architecture documents as the architecture authority;
- a short bootstrap guide that points at them instead of copying them.

When two pieces of code both claim to own the same truth, one of them is wrong.

## 7. Verification philosophy

A passing test is necessary but not sufficient. The practices that actually
caught problems:

- **Calibrate the evaluator before trusting it.** One evaluation passed the wrong
  data type into the production parser and made every row look schema-invalid.
  The fix was to validate the harness against known-valid and known-invalid
  controls, and to separate transport success, parse success, schema validity and
  semantic quality. (See the [Production Zoo case
  study](https://github.com/EvgenVLG/production-zoo/blob/main/docs/case-studies/evaluator-contract-bug.md).)
- **Deterministic checks first.** Build, unit and contract tests run before any
  human or AI review.
- **Freeze before review.** Independent review happens against a frozen revision,
  with a bounded evidence packet; later material source changes invalidate it.
- **Independent review is not self-review.** The reviewer is a separate pass with
  a different perspective.
- **Do not trust a summary.** A change is inspected in the real diff and the real
  test output, never accepted on the strength of a claim.
- **Isolate tests from production state.** Tests must not read or write the real
  persisted runtime state.

## 8. Liveness and honesty about the deployed system

The deployed source is the source of truth for behaviour, and it must be verifiable.

- candidate changes are compared against the live served revision;
- "deployed" is a verified fact, not an intention;
- a rollback point is recorded before deploying;
- simulator and fixture evidence is clearly labelled and never presented as
  physical, real-world capability.

## 9. Human ownership

The human owner defines the boundary, the experiments, what each benchmark is
supposed to measure, acceptance criteria, when simulation is insufficient, and
release decisions. AI accelerates implementation and research; it does not own
product direction or release authority.

That is not a limitation of the tooling. It is the architecture.
