# October 2026 R&D snapshot

The public beta remains a small, reproducible assistant-runtime reference. Current private R&D is farther ahead and is summarized here without publishing private audio, credentials, household bindings, or raw telemetry.

## Current architecture direction

The embedded device is being simplified into an edge audio endpoint:

```text
ESP32-S3 endpoint
  <-> streamed audio + control + telemetry
Linux server
  -> wake / VAD
  -> STT
  -> conversation / tools
  -> TTS
  -> streamed playback
```

The ESP32 owns device I/O. The server owns the expensive and fast-changing speech/AI pipeline.

## Recent engineering work

### Remote observability and control

Private dashboard work includes remote record/stop/listen/speak controls plus telemetry for the audio/network path. The goal is to make reconnects, latency, jitter, signal level, clipping, and missing-audio conditions measurable before debugging.

### OTA recovery path

A current firmware lane implements an A/B OTA design with:

- signed ES256 firmware metadata;
- TLS-only transport;
- inactive-slot writes;
- boot confirmation before the new image is trusted;
- fail-closed trust handling;
- recovery behavior after interrupted update/boot.

This is private R&D today; the public beta does not claim that the embedded OTA path is reproduced here.

### Wake-word / acoustic evaluation

Recent testing focuses on quiet-room false wakes using longer real-room captures, VAD / energy gating, server-side wake processing, and repeatable positive/negative datasets instead of relying on one benchmark score.

### Hardware/software boundary

The endpoint uses an ESP32-S3 audio board with external ADC/DAC/amplifier components. Practical work spans firmware, audio transport, Linux services, networking, telemetry, test fixtures, and physical acoustic behavior.

## What this demonstrates

For integration, robotics, or embedded roles, the useful signal is the boundary work:

- device/server partitioning;
- observability and fault classification;
- safe update/recovery design;
- hardware/software debugging;
- controlled experiments against real physical conditions;
- explicit separation between implemented private R&D and what the public repository proves.
