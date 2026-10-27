# Beat Comic story craft

What made Homepage B land ("it is hilarious", "it really has a personality", Matt, 2026-09-26), so the next one starts there.

## The story

- **One story, told in chapters.** Homepage B: cover ("Pull up a chair." / "This one is true."), Origin story, The front line, The moves, Receipts, The big-firm way, The turn, The decoding, The team, The craft, The offer, Field of dreams, Your turn, close. Each chapter moves the story on; none is a list of labels.
- **Campfire narration.** Short, plain, a little esoteric: "Then the machines learned to read." "Most people met them as a chat box." "Matt gave them a brief that stays current." Say the thing, then stop (`mtw-articulation`).
- **Numbers as punchlines.** A pixel-type panel carries the number (`6,000.`, `95%`, `2 WEEKS.`); the caption says what it means; a second caption (`cap2`) lands the punchline later ("Done in two."). Only attested numbers, worded as the published copy words them.
- **The big-firm way** (the homepage only, beats 64-80): a wide panel "A big firm staffs your project like this." / ONE PROJECT., then ACCOUNT MANAGER., DELIVERY MANAGER., RESOURCE MANAGER., PROJECT MANAGER. landing one per beat, OVERHEAD! "You pay for every one." on the accent, then MATT. "One senior person who plans it, and keeps the big firm honest." with the punchline "The budget goes to the work." Every comic carries a version of this chapter, fitted to its story; get to Matt's answer within about six beats of the chapter card (Matt: "move to matt solution ... faster").
- **Trust needs its own chapter.** Awards, credentials, "One senior person, start to finish", "Ask around." (proof is references).
- **The dream beat.** Matt asked for "if you can dream it, we can build it" (Field of Dreams): the grid grows into a field and paper planes fly ("Let your ideas fly."). Matt's explicit "we" there is his team with Claude and Codex; elsewhere the offer names Matt.
- **Close on the page's own words**, then the freeze-frame gag on the song's final silence.
- A Journal entry's comic retells that entry: its opening situation, the turn, the evidence, what the reader can do. Draw only from the entry and its approved sources.

## The comic grammar (flat, brand, pixel)

- **No empty panels.** Every panel carries art: an image, pixel type (`pix`), a chart, a chat window (`chat`) or the mark. A caption alone reads as an empty box (Matt, 2026-09-26, on two such panels); the story checker fails it.
- Panels: `#112126` fill, a brand-teal border inked by the pen, a flat 7 px teal offset shadow (ink shadow on the teal band). Gutters come from CSS.
- Narration: teal-light box, ink uppercase Barlow Condensed 700, 2 px ink border, 4 px ink shadow. Punchline caption: paper box, tilted -2°.
- SFX: a pixel sprite: jagged slab (long edges only, never a starburst), teal-light face, ink rim and offset, paper poster type with an ink outline and shadow, slanted paper speed lines behind; it pops in, boils on twos (12 fps) and re-pixelates the page's panels as it hits. Words: BAM!, POW!, WHAM!, BOOM!, KAPOW!, ZAP!, SHIP IT!, WHOOSH!, CLICK., START HERE., TO BE CONTINUED. Pair a word with a claim ("BAM! Two awards.").
- Chapter card: the teal banner strip with ink borders, flat paper type with an ink outline and flat shadow, an outlined echo that slides off; one-beat flash. Not pixelated.
- Imagery: the services' overview-card photos (`card('<service>')`, `cover`), the starting-point photos (`photo`, `cover`) and, only in a box with no caption or name bar, the service heroes (holograms, `hero`, `contain`: letterboxed small, a label hides them; Matt, 2026-09-28), pixelated and posterized with auto-levels and a square Bayer dither. Letterbox is filled black so it maps to the panel colour. No new artwork is needed for a comic; do not generate images for one without Matt's direction.
- **One image kind per scene** (Matt, 2026-09-28: "if the basic is a cinematic image then all boxes should use that"): a page's image panels are all photos or all holograms, following the scene's dominant kind; a set of four questions uses four different photos, each once. The engine animates both kinds alike (a pixel shimmer with a one-step sparkle; the picture stays still); a story adds nothing for it.
- **A picture that asks a question links to the answer.** The "Your turn." images each carry `href`: where the site already answers that question (a service page, or the contact form with its service preselected).
- The MTW mark as pixel art on the cover, and in a corner box numbered by chapter ("No. 3"), like an old comic's publisher box.
- Page cuts: the page transition's square tiles sweeping in straight lines (left, right, up, down, diagonal).
- Campfire: the Grid Background glows up from the bottom rows and embers rise; stronger in a reflective chapter (`ember: 1.8`).

## Timing rules of thumb (100 BPM, 0.6 s a beat)

- Panel landing: pop 0.1 s, frame inked in 0.3 s, art resolves in eight 0.04 s pixel steps, caption types at about 95 characters a second.
- Allow about two and a half beats between captions a reader must read; the offer grid can land a cell every two-thirds of a beat because it is read as a whole.
- A freeze is only as long as the music's stop. The chapter card or the last panel holds; embers and the camera stop.
- SFX default 2.6 beats on screen, then a 0.62 s pixel explosion; a freeze-frame slab (`still`) holds to the loop end.
- Because a slab holds 2.6 beats, place it where nothing still unread sits beneath it: a gutter, a panel already read, or a panel that lands after the slab explodes. Check the frame at the slab's beat and 2 beats later.
- Pixel type wraps to two lines by itself when that makes it clearly bigger (narrow panels); give a panel a portrait rectangle (`rp`) when neither its layout nor the page's transposition reads on a phone.

## A service page's comic (Agentic Systems, 2026-09-26)

- **Homage, then swagger, then the cycle.** Open on what came before, played straight and respected (the old ways built the world); let the new thing arrive with the song's drop and brag; then turn it round so the brag becomes the lesson (the agent writes the deterministic tool). Sarcastic and serious in turns, with one chapter that is only serious, on the song's dead stop.
- **The page's own claims only.** The serious lines come from the page's lede and its services (someone responsible for results; cost per accepted result; quotas by role; Claude and Codex under tests and review).
- **The close is the page's hero:** its heading, its lede and its hero image, so the fold lands on the same words.
