# Before 10.0.0

Working material from the road to Waldpost 10.0.0, the first complete children's release. Moved here on 2026-11-26 with unchanged bytes; each file's original path and SHA-256 hash are in the [legacy manifest](../manifest.json) (`"moved": "2026-11-26"`). Relative links inside these files may still point to their original locations.

| Location | Contents |
| --- | --- |
| [docs/reviews](docs/reviews/) | Release reviews of 9.4.32 – 9.4.48 |
| [docs](docs/) | Dated Rätsel and puzzle feedback rounds (15–25 November), review recovery and iteration notes |
| [design-evidence](design-evidence/) | Dated screenshots and comparison sheets supporting the consistency audit and generation records |
| [design-proposals](design-proposals/) | Heute/Vorschlag proposals for the unified Rätsel and success layout, adopted before 10.0.0 |
| [tests](tests/) | Test files that only forwarded to current browser tests |

None of this is loaded by the game, the offline cache or CI. The current rules are in the [current design](../../design/README.md) and [documentation](../../docs/README.md); historical generation records resolve moved files through `tools/legacy-paths.cjs`.
