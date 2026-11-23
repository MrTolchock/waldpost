# Background generation with the current style

Use the [canonical watercolour/pencil style](../illustrations/STYLE.md) and the complete `den`, `puzzle-clearing` or `background` request from `node tools/illustrations/style.cjs --request <id>`. The fixed animal/object references define technique; the current painting supplies composition only. Historical concept prompts are archived and are not current recipes.

The [complete generator-input index](GENERATOR-INPUTS.md) links every painting and records full portable requests, actual reference paths/hashes, dimensions, proposed exports and available original sources in [generator-inputs.json](generator-inputs.json). It also covers the older Lake Zürich scene and explicitly missing historical requests.

## Den

Current painting: [den-v2.webp](../../assets/forest-friends/den-v2.webp), 1448 × 1086, opaque. The live fox, its shadow and sleep pose are rendered separately by `js/friends/painted.js`; keep the room empty of generated characters.

| Layout constraint | Value |
| --- | --- |
| Source canvas | 1448 × 1086, 4:3 |
| Camera | 30° FOV, y=12, tilt −17° |
| Standing / bed anchors | `(300,440)` / `(80,405)` on a 1024 × 768 reference |
| Door hotspot | `(859,346)` on that reference |
| Mail flap overlay | Source rectangle `(1180,280,106,34)`, centre x=1233 |
| Required crop region | `scenes.den.need=[.03,.2,.97,.92]`, with live cover/view-offset logic |

Preserve bed, floor perspective, door/slot, shelf, basket and drawing table. Reuse the current painting when the task does not request a change. If an edit moves composition, update its matching coordinates and test standing, delivery, walking and sleep at phone/tablet sizes.

## Host habitats · 9.4.33

Every Rätsel uses its host's home as an opaque 1536 × 1024 painted backdrop. The same scene surrounds child play, gallery rounds, individual reviews and celebrations. Both word puzzles with the mouse use its stump scene. `data-host` on the screen selects the image through `css/puzzle-rounds.css`; set it on entry so even a blocked or immediately completed round has the correct scenery.

| Host | Place | Request / preparation |
| --- | --- | --- |
| Reh | Blumenwiese | [`puzzle-meadow`](puzzle-meadow.json) |
| Steinbock | Berg und Felsvorsprung | [`puzzle-mountain`](puzzle-mountain.json) |
| Frosch | Sumpf mit Steg | [`puzzle-swamp`](puzzle-swamp.json) |
| Eichhörnchen | Nadelwald | [`puzzle-conifers`](puzzle-conifers.json) |
| Blaumeise | Birkenhain | [`puzzle-birches`](puzzle-birches.json) |
| Waldkauz | Alter Buchenwald mit Baumhöhle | [`puzzle-old-forest`](puzzle-old-forest.json) |
| Biber | Teich mit Damm und Biberburg | [`puzzle-beaver-pond`](puzzle-beaver-pond.json) |
| Maus | Baumstrunk im Haselgebüsch | [`puzzle-stump`](puzzle-stump.json) |
| Igel | Laub und Unterholz | [`puzzle-undergrowth`](puzzle-undergrowth.json) |
| Fisch | Wasserfallbecken | [`puzzle-waterfall-pool`](puzzle-waterfall-pool.json) |
| Eisvogel | Bach mit Sitzast | [`puzzle-brook`](puzzle-brook.json) |
| Dachs | Erdbau unter der Eiche | [`puzzle-badger-sett`](puzzle-badger-sett.json) |

On 23 November 2026 (9.4.33) the owner supplied twelve finished paintings that replace the watercolour scenes. They keep the same compositions, rendered in the soft storybook style of the den and the walking world. The supplied PNGs are the editable sources under `design/artwork/sources/`. Each `generation-records/puzzle-*.json` is a `waldpost-supplied-image-record`: it names the owner and the original filename, hashes the source and states that no generator, prompt or reference images are known. The WebP exports come from the unchanged conversion manifests (`prepare-image.cjs`, quality 82, opaque). The 22 November watercolour scenes, with their sources, manifests and actual generation records, are archived in [legacy/design-history/2026-11-23-watercolour-habitats](../../legacy/design-history/2026-11-23-watercolour-habitats/README.md). They are history, not inputs. The registered `puzzle-*` prompts still describe each host's composition and layout. An edit or replacement must match the current supplied painting's rendering, so agree the style with the owner before you generate one. The centre stays pale behind the real cream task panel; habitat details sit at the perimeter. The scene continues behind the panel without a painted interface, text or animals. Use centre/cover without stretching, and check phone/tablet crops with `node tests/habitat-backgrounds-browser.cjs`.

The review builder hashes the selected host scene, so changing a painting reopens only that host's puzzles. The owner-requested 9.4.26 compatibility bridge preserves approvals from the last shared-clearing release (`61ef045`) across these exact background-only presentation pairs. The owner-requested 9.4.33 bridge does the same for the supplied paintings and that release's layout-only corrections, starting from release `9efa9dd`. Questions, answers, task pictures, rules, difficulty and interactions are identical. It creates no decisions, preserves later restrictions and does not exempt future artwork changes from review.

## Shared menu clearing

[puzzle-clearing.webp](../../assets/forest-friends/puzzle-clearing.webp) remains the opaque 1536 × 1024 painting behind the adult gallery/review overviews, menus and Settings, and the fallback for a screen without a host. CSS supplies different crops and washes. Keep the central area pale and quiet; detailed trees/canopy, ferns, leaves and mushrooms stay mostly at the perimeter. Panels, buttons, labels and portraits remain separate layers.

For a new edit, the current painting defines this framing and the canonical references define the drawing technique. Do not paint interface controls or characters into the background. Check portrait/landscape `cover` crops; changing this shared scene changes puzzle presentation and requires normal review again.

## Conversion and records

Retain the new editable PNG, complete style-composed request, references and conversion manifest. `prepare-image.cjs` with `transparent:false` produces an opaque scene; use the intended ratio/dimensions and an explicit fit choice. Avoid stretching a room to fit a generator's default canvas.

The final historical den edit and original clearing request were not retained in full. Their history, recoverable original PNG commits, earlier concept prompts and former reconstruction recipes are preserved in the [archived background record](../../legacy/design-history/2026-11-16-before-style-contract/design/artwork/BACKGROUNDS.md). Those original records are not forward instructions.
