# Opening team still - v7 owner-specified pose, gaze and spacing correction

Initiative: `mission-control-opening-team-image`; workshop `mission-control`; module `copilot-value-lab`.

## Approved correction contract

This packet transcribes the owner's approved correction, not a new design or learning-content contract. Authority is recorded once in [I20](../../../../production/decision-log.md#mc-i20-v7-owner-correction). The owner's two subjects are Agent Mergewell and Riley Relay.

- Both heads upright, chins raised enough for direct eye-level camera contact, eyes on the viewer, especially Mergewell. Not an upward/skyward stare.
- Both arms relaxed vertically at their sides like Chief Charter, rather than spread outward with palms up.
- Bring Mergewell and Riley closer horizontally to Chief into one cohesive group.
- Preserve Chief Charter and Purrmission identity, appearance and pose. Preserve every character's identity, costume and anatomy, including Riley's BOTH mechanical forearms and hands as specified by the owner from v6.
- Preserve illustration style, colors, background, framing, full bodies and all other details. No redesign.

The pure submitted prompt is `content/modules/01-copilot-value-lab/media/prompts/images/mission-control-opening-team-v7.txt`; it contains only edit instructions and preservation constraints, without review headers.

## Exact input and action

- Sole repository-relative input reference: `generated/candidates/mission-control/copilot-value-lab/2026-09-14-opening-team-v6/images/mission-control-opening-team-v6-fe1517a802ec.png`.
- Reference SHA256: `fa010787c3284df26eed2a38d7da100b7e28dc4602d414495d72c589c11359eb`.
- Provider/deployment: `mai-image-2.5` / `MAI-Image-2.5`.
- Endpoint: `https://ghcp-v5-mai-resource.services.ai.azure.com/`.
- Requested output: 1248x832 PNG. Reference-edit dimensions are provider-selected; verify actual returned raster dimensions.
- Cycle: `2026-09-14-opening-team-v7`; asset: `mission-control-opening-team-v7`.
- Envelope: `content/production/opening-team-v7-work-envelope.json`.
- Exactly one provider call, one candidate, zero retries and no fallback. The parent executes the guarded CLI action; coordinator preparation makes no paid call.

## Acceptance evidence and boundaries

First uncertainty: whether one reference edit can achieve level gaze, vertical relaxed arms and tighter grouping without identity/anatomy drift or hiding Riley's mechanical forearms.

The representative result is the sole candidate. After return, verify receipt, hashes and actual dimensions, then request the owner's visual assessment of each changed feature and preservation requirement. A technical success is not a visual success or candidate acceptance. The prior parent visual-inspection claim is unreliable because the tool returned image-limit text; this packet relies on the owner's attached-v6 feedback, not that claim.

Still image is the owner-selected medium; no motion study or video action is requested. This image supports the unchanged S01 team introduction, not new learning claims. Candidate acceptance, publication, placeholder replacement, integration, module/deck acceptance, release and each push remain separate and unapproved. Stop after any result, failure or uncertain submission; no additional spend is inferred.
