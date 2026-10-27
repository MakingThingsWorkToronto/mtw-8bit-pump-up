# Shared player transport, progress and sound feedback

Matt, 2026-10-09: while an illustrated comic is playing, its Back, Pause/Play and Next control that comic; rename Issues to Comics; add the normal teal Let's talk button. Both illustrated and 8-bit comics need a draggable progress playhead implemented as a shared component suitable for later Diagram Tour and Task Field adapters. Future adoption is not part of the comic repair.

This contract supersedes the older instruction that Comic B's Previous/Next need no player callbacks. Beat Comic playlist links and cross-page DJ mixing retain their existing meaning; choose the transport mode explicitly rather than inferring it from a page URL or replacing every link globally.

## Shared ownership and adapter contract

Use the existing MotionToolbar for transport and one shared progress/playhead component for both consumers. Keep pointer capture, keyboard handling, focus, value formatting and progress styling in that component. Players supply a bounded absolute position, duration, seek callback and play/pause state. A future discrete tour adapter may map the same bounded value to stops without copying the input implementation. Read the actual current API before wiring; this reference does not promise an unimplemented API name.

The illustrated adapter owns Back/Next callbacks that go to its authored comic stops. The playlist remains the destination selector. Register callbacks against the current player instance; cleanup must unregister only that instance so an outgoing player cannot clear the next one's registration. The current BaseLayout uses native navigation. A cold load must expose working transport, progress, names and focus behaviour. When Astro ClientRouter is adopted, re-entry must expose the same behaviour. Prevent old document references, listeners, media routing and animation loops from surviving a swap.

Use the existing normal teal contact-button treatment for illustrated Let's talk and the existing pixel treatment for the 8-bit player. Keep the shared logic and provide the explicit visual variant; do not duplicate toolbar markup. Rename visible/accessible Issues menu names to Comics, while preserving issue numbers, destinations and current-reading identity. Keep menu focus trapping and return focus intact.

## One clock and a bounded seek

Progress reports absolute story time, not the music element's wrapped currentTime. Seek clamps to zero through the story's actual endpoint. Commit the same destination to render, captions, active stop, progress, audio score/room and the music position calculated from the authored loop. Reset loop-history and monotonic-clock guards for a deliberate backwards seek; otherwise a guard that prevents spontaneous media regression can undo the user's drag on the next frame.

During a drag, remember whether the player was running. Suspend natural advancement while the pointer owns the playhead, preview the bounded position, then restore that prior running/paused state after release or cancellation. A paused scrub remains paused. Seeking alone must not bypass the visitor's mute or an audible-autoplay block. Avoid replaying skipped effects or queuing old cues for later unmute; reuse Comic B's focus-only seek cue policy. Scrubbing should not create repeated immediate effects on every pointermove.

Pointerdown, move and release on the progress control must not also advance a panel, fold the 8-bit intro, scroll into the page or follow a playlist link. Retain pointer ownership with native range behaviour or pointer capture so a release outside the rail terminates the interaction. Support a clean phone tap, a small wobble, a drag, release outside the rail and pointercancel. Keyboard focus exposes a named slider with its bounded current/minimum/maximum values and readable elapsed/total value text; Left/Right and Home/End seek without also reaching the stage's story-key handler. Preserve the user's existing pause state.

At the final hold, drag backwards and resume from the new destination. The old endpoint flag, NEXT screen or ended media must not strand playback or jump it straight back to the hold. Check replay from zero too. Freeze/reduced-motion behaviour still follows the player's existing contract; an absent/suppressed experience cannot leave an active control bound to a stale instance.

## Equalizer and current music credit

Drive the illustrated equalizer from the audible mixed output that includes scored music, synthesized effects and room tone, after score/master attenuation. Use the actual audio graph's analyser where available, with bounded visual smoothing; avoid decorative perpetual bars that imply sound during silence. Do not route the same media source twice or create a fresh MediaElementAudioSourceNode for an already-routed element. Mute, pause, hidden/suspended contexts and blocked autoplay settle the bars; a score-zero scene with an actual effect can still show that event.

Credit the current track from the same music data that supplies playback, with its exact title/artist and approved source link when known. Keep the credit reachable and legible alongside mute and transport on a narrow screen; the equalizer alone is not attribution. Follow the retained soundtrack source exceptions instead of inventing a track URL. Changing the playing track updates the credit. A score-zero scene should retain source attribution without implying that its silent music is audible.

Reduced motion can use a quiet static sound state instead of bar motion. Audio-route/level assertions and a changing bar sample prove controller behaviour; listening and native visual inspection remain separate evidence.

## Escape check in the existing review

Extend the existing player/control check rather than adding another browser or repeating full-story artwork reviews. Capture the actual served runtime and story hashes, inspect desktop and phone toolbar/playhead frames, and retain failures beside the repaired evidence. A fill percentage or successful seek method alone does not establish a usable draggable control.

| Property | Required observation |
|---|---|
| Comic transport | Back and Next change the current comic's authored stop without changing URL; Pause/Play freezes and resumes story, score and media together; accessible names describe the next action |
| Existing 8-bit transport | Playlist destinations, dialog, fold/pinning and DJ handoff retain their existing behaviour; progress gestures do not trigger them |
| Playing scrub | Drag forward/back, release outside the rail and pointercancel leave one bounded destination and restore prior running state |
| Paused scrub | Seek by rail click, mouse/touch drag and keyboard; position/scene change, sound remains paused, Play resumes there |
| Loop history | Cross at least one actual authored music loop, seek backwards before it, run through the boundary again; story/progress remain monotonic after the deliberate reset and music stays mapped to the story |
| Endpoints | Home/End reach the bounds; from the final hold seek backwards and replay from zero without a stale held/ended state |
| Input isolation | Pointer/touch/keyboard seek does not advance a second panel, fold the intro or activate unrelated navigation; slider stays named, focused and operable |
| Cold autoplay and mute | A cold/blocked visit and muted visit permit seeking without surprise sound; an explicit Play/unmute gesture still unlocks both players consistently |
| Equalizer | Music, a synthesized effect in a score-zero scene and room tone produce observed bar samples; intentional silence, mute and pause settle them; reduced motion is inspected separately |
| Attribution | Exact current music credit/source is reachable on desktop and phone alongside mute and transport; track change updates it; Comics names and normal teal illustrated contact button are visible |
| Navigation lifecycle | With current native navigation, check cold registrations on comic to 8-bit, 8-bit to comic, away and back. If ClientRouter is adopted, check the same swaps: one current registration, no stale progress callback, double activation, analyser reroute or duplicate animation loop |

Use the existing audio regression and audio-motion fixture for score, cue, lifecycle and seek assertions; add coverage for loop history and the shared progress adapter when those change. Keep existing Beat Comic dock/pause/autoplay/mixtape checks appropriate to the repair. Register screenshots through the maintained image-library process under the root's coordinated catalog slot. Native phone emulation is not a real-device pass; a policy-rejected file review stays unperformed.

## Defect record and next output

The original report names inert/misdirected illustrated transport, missing sound-responsive feedback/current attribution and a fill-only progress rail. Source inspection confirmed Comic B registered only timing/pause, rendered progress aria-hidden without a playhead, and inherited toolbar playlist Previous/Next. The lowest shared cause is the toolbar/player adapter contract plus missing seek/control coverage; audio meter routing remains an implementation hypothesis until measured.

Retain before/repaired/next observations separately for transport, loop-safe seeking, meter response and attribution. Use the same failed/eligible denominator per case; do not invent numeric counts from the user's report. Check the first different comic or 8-bit consumer through the changed shared dependency and record its exact revision and results. Until that run exists, recurrence is awaiting-next-output. Passing the repaired illustrated comic alone does not establish prevention or Matt's approval.

### Quiet progress seeks and native restoration

Progress seeks suppress immediate panel-effect replay for pointer and keyboard input while still updating score, room, media and absolute story position. An intentional panel click keeps its replay semantics; natural delayed cues still fire once when crossed after the destination. Check repeated keyboard seeks inside one effect panel through the actual progress adapter, not only the score method.

A persisted native pagehide keeps the score context and meter available for back/forward-cache restoration. Only a nonpersisted leave tears them down; native Back restoration remains a separate browser observation. If a paused Beat Comic seeks to its held endpoint, base its held-animation timestamp on the pause start so the existing resume delta lands at the actual resume time.

Focused escape checks: comic-story-audio-regression.mjs (persisted/nonpersisted context and meter), comic-story-audio-motion-regression.mjs (quiet progress adapter versus deliberate panel replay and natural delayed cues), and comic-story-held-seek-regression.mjs (actual Beat seek/pause helpers and held-end resume baseline). Record their actual results; a staged fixture is not a performed check.
A pointer scrub has one owning pointer. Ignore secondary touches and finish only on that owner's release/cancellation; blur may cancel it. Destroying the adapter removes listeners without resuming an abandoned player. Scrub completion preserves a browser-blocked sound state; only an explicit sound/Play action unlocks it. The shared progress unit fixture checks ownership, cancellation and disposal; native cold scrubbing checks the sound boundary.

### Phone credit visibility in the shared tag

Check actual visible credit glyph fragments in the existing native phone review, including the illustrated reader's normal state and the shared tag's open and hover/focus states where applicable. Measure the text fragments against the tag, strip and viewport and inspect the screenshot: nonempty textContent, a matching credit string or an existing link does not prove that the visitor can read title and artist. Preserve the 8-bit tag's intentional fold-to-mute behaviour and verify that its credit remains discoverable when opened or focused.

A reader-specific credit layout must keep precedence over later generic responsive tag rules. The October 9 phone review found the generic max-width rule clamping the illustrated tag to 36px, leaving a 2px credit column whose wrapped glyphs escaped its reserved line. Repair the owning shared CSS selector and extend the existing credit bounds/width check; retain the failed stills and compare the next different consumer through that same check. This does not require another artwork review or imply listening quality or approval.
### Native file image canvases

Local file images can draw successfully while native canvas policy rejects getImageData with SecurityError. In the image-panel readback path, catch that named error only and retain the low-resolution drawImage with the existing CSS pixelated scaling. Mark the panel read-blocked, skip later readbacks and glimmer, and never reuse earlier cached ImageData after the failed read. Re-throw other errors. Do not use browser security flags or permissions as a preview repair. HTTP origin-clean images retain the existing palette posterization and pixel shimmer.

Run the focused beat-comic-file-canvas-regression.mjs against the actual drawPanel/posterize helpers: first blocked read, repeated redraw, resize, previously readable cache becoming blocked, unchanged readable palette/glimmer, unrelated error propagation and an image still loading. Continue the coordinated native file review on the repaired player and a different consumer. File preview pixelation without palette readback/glimmer is an explicit limitation; fixture success is not a visual pass or artwork approval.

### Native file illustrated raster URLs

Resolve authored root-based comic art against the comic runtime's public script base only in native file previews; preserve HTTP root URLs and responsive variant naming. Use the actual artRoot, artUrl and artSrcset helpers in comic-story-art-url-regression.mjs for HTTP and local root/key cases, drive/space paths, and escaped missing/wrong-directory bases. This narrow mapping does not bypass native file SVG-fetch restrictions on the retained demo.

Keep image evidence separate from player evidence. A completed loader or panel loaded flag can follow a failed image path. The existing native review must reject is-art-missing, absent/zero-sized raster crops, empty painted backgrounds, and painted URLs that fail actual image decoding or have zero natural dimensions. Inspect Home and a different illustrated issue on desktop and phone through both HTTP and file previews; retain blank stills and repaired captures. Decoded images and passing control assertions do not approve the artwork, composition or story.
### Viewport bounds and transformed parents

The shared native control-fit assertion checks all four viewport edges of both playhead and dock: nonnegative left/top, right and bottom inside the viewport. Document overflow and a passing right edge alone do not prove left-edge visibility. Retain scroll position plus computed transform, overflow and rectangles for the player stage and relevant ancestor layers in the existing report. The earlier local desktop Agentic Beat capture placed the playhead at x=-15.333 while its right/bottom-only predicate passed. Inspect the final settled capture and repair the responsible parent geometry if the condition recurs; do not clamp the child or widen the predicate to hide it. Keep dated failed evidence distinct from later passed frames.
### Desktop credit beside compact transport

Matt, October 9: on illustrated comic pages the credit tag sits to the left of the transport buttons, vertically centred on their row; the desktop player becomes shorter. Above 700px the tag participates in the dock's flex row, ordered before the buttons, and the dock and tag can shrink with min-width: 0. Give the tag the remaining row width instead of a desktop absolute bottom row or a 640px cap; hide the desktop hint that would consume that width. Keep the buttons at their intended size. Share the 64px desktop strip reservation with the artwork view and safe-area inset. At 700px and below preserve the separate 44px credit row and 104px strip reservation, with the controls above it.

The existing shared-player-review.mjs must measure the credit tag, every visible transport button, strip reservation and credit styles. On desktop reject a tag placed after or below the buttons, a vertical midpoint difference greater than 1px, wrapping credit, or a reservation that remains taller than 64px plus the bottom inset. Exercise long credit through the actual rendered CSS: retain nowrap and hidden ellipsis, usable credit width and fixed-size transport without increasing strip height. Restore the exact authored credit after that probe. On phones reject overlap between the button row and credit row, or credit glyphs outside the tag/strip/viewport. The browser-free strip mutation check covers the 64px/104px shared reservation; it does not prove rendered placement or readable attribution. Keep existing normal/hover/focus glyph checks and inspect the actual desktop/phone stills. Record Home and the first different illustrated issue with identical tolerances as separate repaired/next observations; the user's wrapping report has no invented numeric denominator.

## Clicked panel starts and sound synchronization

Matt's October 9 panel-click correction: clicking or tapping a box starts that selected box at its authored `(scene.b + panel.at) * B` time. Permit only a tiny positive rounding tolerance so the sound focus has reached the selected panel; do not subtract time or push the destination to a phone-sheet entrance/reveal offset. Render, music loop position, ambience focus and immediate current-panel cue receive the same absolute destination through the existing seek hook. Preserve paused/muted/blocked sound state; a deliberate audible panel replay can replay its own immediate cue, while delayed cues retain their authored beat and skipped boxes produce no backlog.

The existing audio-motion regression extracts the actual `jumpToBox`, `seekTo`, stage click listener, scene/sheet resolver and score controller into the existing policy fixture. Its clicked-panel cases use a nonzero scene and beat duration, media offset/loop, forward/back/replay, delayed cues, a later phone sheet and pause/mute. Keep the pre-repair failure and repaired receipt with runtime hashes. These tests prove destination/focus synchronization only; panel fade appearance, actual click/touch routing and audible synchronization still require the existing coordinated desktop/phone browser review.

A selected-panel click must still seek while its first sound gesture is unlocking media. Keep the first-gesture no-advance guard for background clicks only. The independent timing cases assert the authored destination, rendered scene/sheet, looped media position, selected immediate/delayed cues and paused/muted policy without depending on additional score fields.
