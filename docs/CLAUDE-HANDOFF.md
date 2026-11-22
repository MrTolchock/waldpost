# Taking over Waldpost

The `MrTolchock/waldpost` repository contains Waldpost, a static, offline-capable woodland learning game for first graders in Zürich. At the 9.4.19 handoff, twelve friends each host two Rätsel. The parent sets a letter limit, Fuchs gets a pictured invitation at the den, visits its sender, completes five distinct Aufgaben, receives the next letter from Hase and eventually returns home to sleep. Swiss Standard German is the child-facing language. Start with the [working agreement](../CLAUDE.md), [letter session rules](LETTER-SESSIONS.md) and [generated catalogue of every question and answer](PUZZLE-CATALOGUE.md).

Serve the repository root with `python3 -m http.server 8000 --bind 127.0.0.1` and open `http://127.0.0.1:8000`. The page loads scripts directly. Use a disposable browser profile for experiments. The historical `?dev=1` route isolates development saves and reviews and suppresses logging. The Settings developer switch pauses logging. See [development and deployment](DEVELOPMENT.md).

## Find the owner of a change

| If the request concerns | Start here |
| --- | --- |
| World traversal, den, letter delivery, terrain, character models | [Game modules](../js/friends/), [world implementation guide](FOREST-FRIENDS.md), [character preparation](../tools/characters/) |
| Adding or correcting an Aufgabe | [Finite content catalogue](../js/friends/puzzle-catalogue.js), [library](../js/friends/library.js), [shared puzzle screen](../js/screens/puzzle.js), [puzzle blueprint](../design/PUZZLE-BLUEPRINT.md) |
| Child access, adult sign-off, rejection comments or lost reviews | [Review rules](PUZZLE-REVIEW.md), [GitHub storage, offline recovery and conflict handling](REVIEW-STORAGE.md) |
| Device-local progress or parent JSON export | [Play log](PLAY-LOG.md), [saved journey state](../js/friends/state.js), [storage](../js/core/store.js) |
| Drawing, colouring, picture book or saved-picture gallery from the old app | [Retired drawing screens](../legacy/retired-drawing/), [drawing engine, stamps, templates, assets and tests](../legacy/retired-runtime/), [archive manifest with original paths and hashes](../legacy/manifest.json) |

The table and pictures in the den are painted scenery. Current handwriting practice has a live [trace screen](../js/screens/trace.js). The adult Rätsel gallery launches learning activities. Existing device drawings, template IDs, historical storage keys and installation identity must survive updates.

## Find a picture or reproduce a generator request

1. Search the [picture library](https://mrtolchock.github.io/waldpost/assets/waldatelier/) by subject or inspect the [machine-readable catalogue](../assets/waldatelier/library.json). It lists puzzle usage, and the browser can copy an ID or export its transparent PNG. Display the existing cell with `FK.visual.art(id)`. At handoff the library contains 691 pictures on 50 atlases.
2. For an edit, find the **shipped filename** in the [generator-input index](../design/artwork/GENERATOR-INPUTS.md). Its [portable JSON](../design/artwork/generator-inputs.json) connects assets to full prompts, ordered reference files and hashes, dimensions, and available sources and export records. Use the sheet-specific request to recover the actual subjects and order. Historical gaps are explicitly recorded. For example, only part of the original den and clearing prompt history survives.
3. Read the [canonical style](../design/illustrations/STYLE.md). The fixed references are `animals.png` followed by `objects.png` under `design/illustrations/references/watercolour-pencil-v1/`. They establish light watercolour, visible coloured pencil, irregular sepia contours and a matte finish. A current edit target or a role-specific reference follows the pair. Preserve exact colours, counts, species markings and action differences when the child needs them to answer.
4. From the repository root, prepare the appropriate request, for example `node tools/illustrations/style.cjs --request puzzle-vocabulary`. Send the **complete prompt**, the **actual pixels** at each returned reference path in order, and the returned **transparent_background** flag to an image-capable service. On another machine, resolve the paths in that checkout or upload the files in order. The command prepares JSON. Generation requires an available image service. The repository supplies neither model weights nor a deterministic seed.
5. Edit registered briefs in the relevant design directory. Regenerate derived prompt text with `node tools/illustrations/style.cjs`. Keep the actual request, generator/date, ordered references and hashes, editable source and preparation manifest. A manifest's `generationRecord` describes the existing pixels. Its `forwardPrompt` specifies a new request. See the [illustration workflow](../design/illustrations/README.md) and [recorded generations](../design/artwork/generation-records/).

### Take a subject sheet into the game

For a worked example, use `--request forest-actions` and inspect its [packing manifest](../design/illustrations/forest-actions.json). To preview the export from the retained source, run:

```sh
node tools/illustrations/pack-atlas.cjs design/illustrations/forest-actions.json --output /tmp/forest-actions.webp
```

Packing needs ImageMagick 7 with WebP support and an sRGB ICC profile. Override discovery with `WALDPOST_MAGICK` and `WALDPOST_SRGB_PROFILE` if needed. Current subject sheets generally use 320 px square output cells with the longest visible side fitted to 256 px. Keep transparent gutters, complete silhouettes, stable IDs, existing cell order and accessible labels. Use manifest `sourceRects` when intact drawings cross source grid boundaries. For a single-cell correction, preserve the surrounding visible pixels and positions. The workflow documents exact-size `preservePixels` composites and their export through `prepare-image.cjs`. Compare the result against adjacent answers on cream and dark backgrounds, then at phone and tablet size. A correct crop can still show the wrong answer.

Register a new sheet and its ordered IDs in [waldatelier.js](../js/ui/waldatelier.js), put the exported WebP in [assets/waldatelier](../assets/waldatelier/), and include runtime dependencies in [sw.js](../sw.js). Regenerate the library and generator handoff after authoring changes. Compare image use, framing and review impact before release. The [picture workflow](../design/illustrations/README.md) covers the repair and transparency cases.

### Backgrounds, overlays and pictures with other jobs

| Asset / request | What must line up in the app |
| --- | --- |
| Den, `den` | Opaque 1448 × 1086 painting. Keep the room empty for the live fox, shadow and sleeping pose. On the 1024 × 768 reference, standing and bed anchors are (300, 440) and (80, 405), with the door at (859, 346). The animated mail flap uses a source-pixel rectangle. Moving the door, bed or mail slot requires matching scene changes and walking, delivery and sleep checks. [Camera, crop and mail anchors](../design/artwork/BACKGROUNDS.md) · [runtime composition](../js/friends/painted.js) |
| Shared woodland, `puzzle-clearing` | One opaque 1536 × 1024 image serves puzzles, adult review/gallery, menus and Settings through different CSS crops and washes. Keep the centre quiet and pale and the visual detail at the perimeter. Leave labels, controls and friends to their own layers. Check landscape and portrait crops across consumers. [Background guide](../design/artwork/BACKGROUNDS.md) |
| Painted map, `world-map` | The adopted v2 painting is strictly top-down. Keep water, routes and landmarks aligned to calibrated world positions. Pins and the player marker are interactive overlays. Preserve 64 px named targets, pan gestures and outside-tap/Escape dismissal. Run `node tools/map/layout.cjs --check` and exercise actual routes after edits. [Calibration](../design/artwork/world-map-layout.json) · [map tools](../tools/map/README.md) |
| Portraits and letter paper | `friend-portraits` supplies the shared painted cast for letters, menus, map pins, companions and celebrations. `fox-sleep-portrait` covers the sleep pose. Keep the sender area free on `letter-paper` and compose with `FK.friendsArt.letterPortrait`. The live world and den fox use models. [Cast, order and packing](../design/artwork/LETTER-FRIENDS.md) |
| Controls, landmarks and branding | Use `navigation-symbols`, `navigation-back` and `exit-symbol` for simple outlined symbols readable at 32 px. The map home uses the painted `den-marker`. Puzzle utility controls use the shared SVG family, while exact geometry and handwriting use authored paths. Use `app-icon` for install art. [Role guide and export recipes](../design/artwork/README.md) |

For a standalone painting or stationery export, inspect the manifest's aspect ratio, explicit contain/cover fit, output dimensions and alpha. Paper and isolated props need transparent edges. Scenes are opaque. Preview with e.g. `node tools/illustrations/prepare-image.cjs design/artwork/letter-paper.json --output /tmp/letter-paper.webp`. The [asset inventory](../design/artwork/assets.json) also identifies model, texture and retained artwork pipelines.

## Sound and narration

| What you hear | Where and how to change it |
| --- | --- |
| Button ticks, answer/retry feedback and celebrations | [Core effects](../js/core/sound.js) synthesizes tones and noise through Web Audio. [Puzzle handlers](../js/screens/puzzle.js) call the effects. [App startup](../js/app.js) unlocks the context on a gesture. The master gain follows the sound setting, tab visibility and speech ducking. Preserve answer advancement when Web Audio fails. |
| Which animal calls, footsteps or weather sounds occur | The [sound director](../js/friends/soundscape.js) schedules levels and events from terrain, speed, weather, time and indoor/sleep state. Species weights, pauses and simultaneous singers are controlled here. Change this layer for frequency or habitat. Its seeded tests can exercise long walks without playing audio. |
| Timbre, position and recorded ambience | The [world audio player](../js/friends/audio.js) decodes local MP3s, mixes loops, pans events, filters outdoor sounds inside the den and synthesizes footsteps, cues and fallback voices. Nine bird MP3s each contain two equal-duration phrase slots that alternate. Preserve that layout when replacing a recording. Leaves, brook and rain use looped beds. Rain fades with snowfall and can play a synthesized wash while the recording decodes. [Shipped audio files](../assets/audio/) |
| Spoken puzzle explanations and letters | [clips.js](../assets/audio/narration/clips.js) maps the exact German transcript to an MP3 basename. [Speech playback](../js/core/speech.js) trims the request and tries the local clip first. Changed wording or punctuation can switch playback to device speech. Recorded Rätsel explanations use Piper German MLS medium, speaker 2037. Earlier letter recordings use Piper Kerstin low. [Voice models, sources and credits](../index.html) |

**Changing one spoken line.** Locate the displayed instruction and its exact key in the clip map. Prepare matching audio, put it in `assets/audio/narration/`, update the transcript mapping, and check the service worker includes the asset. Exercise the actual speaker button twice to check play/stop. Try offline, a missing clip, mute, a hidden tab and a second request during playback. Explicitly requested explanations may play with general sound muted. Native fallback ranks available German voices, prefers local voices offline and chunks long text. The device determines which voices are installed.

**Changing a field recording.** Trace its basename from the mixer to the MP3 and its offline-cache entry. For a bed, listen through the loop boundary and the transition from its procedural fallback. For a bird, check both phrase slots. Record the source, creator, licence and edits in the `audio-credits-content` template in [index.html](../index.html). Settings → Tonaufnahmen und Lizenzen displays that template. The [old credits URL](../assets/audio/credits.html) redirects there. For example, the rain-on-leaves recording credits Gravity Sound under CC BY 4.0. Bird licences vary by recording.

**Diagnosing silence.** Test after a real gesture with the tab visible. Check the separate ambience and sound settings, the active speech state, context suspension and whether the clip decoded. The world player's diagnostics expose recorded bird count, context state, recoveries, speech ducking and output RMS. For a device-specific issue, test leaving/resuming Safari or the installed iPad app and tapping again. Automated checks exercise stalled contexts and fallback paths. Physical playback is still the way to judge loudness and speech comfort.

## Verify and publish changes

From the repository root, install the locked tooling with `npm ci --prefix tools`. After changing artwork inputs, regenerate in order with `node tools/illustrations/style.cjs`, `node tools/illustrations/library.cjs` and `node tools/illustrations/handoff.cjs`. Regenerate `node tools/puzzle-catalogue.cjs` for runtime/presentation changes. Useful checks include:

```sh
node tools/illustrations/style.cjs --check
node tools/illustrations/library.cjs --check
node tools/illustrations/handoff.cjs --check
node tools/map/layout.cjs --check
node tools/puzzle-catalogue.cjs --check
node tools/check-design.cjs
node --test tests/*.test.cjs
```

For image work run `tests/artwork-browser.cjs`, `tests/gallery-images-browser.cjs` and `tests/ipad-puzzle-layout-browser.cjs` with Node. For map changes add `tests/drawn-map-browser.cjs`. For sound run `node --test tests/soundscape.test.cjs tests/speech.test.cjs`, then `node tests/audio-browser.cjs` and `node tests/puzzle-sound-browser.cjs`. The latter exercises puzzle progression across audio failures. Browser suites need Playwright and Chromium. Commands, environment overrides and deployment verification are in [Development](DEVELOPMENT.md).

GitHub Pages serves main. Cached runtime changes require matching app and worker cache version updates, a complete offline asset list and an installed-app update check. Keep per-iteration approvals for unchanged content and presentation. A changed question, answer, interaction, difficulty or rendered picture needs the relevant human review. Evaluate the full set of uses for shared imagery. The separate puzzle-review-data branch holds editorial decisions. A code release must preserve it. [Review storage](REVIEW-STORAGE.md) · [update and recovery procedure](DEVELOPMENT.md)
