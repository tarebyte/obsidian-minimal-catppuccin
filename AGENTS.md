# AGENTS.md

CSS-only Obsidian plugin that recolors Minimal Theme's built-in **Catppuccin** scheme with official Catppuccin Latte and Mocha colors. See `README.md` for user-facing behavior, color sources, and measured contrast.

## Commands

There is no build, package manager, or test suite. Run these before every commit:

```sh
# Validate JSON
jq empty manifest.json versions.json

# The manifest version must be listed in versions.json
jq -e --arg v "$(jq -r .version manifest.json)" 'has($v)' versions.json

# Install into a test vault for manual checks
cp main.js manifest.json styles.css "<Vault>/.obsidian/plugins/minimal-catppuccin/"
```

## Project layout

- `styles.css`: all styling. Latte section first, then Mocha. Keep the MIT license header on each section.
- `main.js`: hand-written empty `Plugin` class. Do not add a build step or dependencies unless a feature needs code.
- `main.js`, `manifest.json`, and `styles.css` must stay at the repository root. The release workflow and BRAT expect them there.

## Things that are not obvious

- Rules only match when Minimal Theme Settings adds its `body` classes: `minimal-theme`, `minimal-catppuccin-light`, `minimal-catppuccin-dark`, and background classes such as `minimal-light-contrast` and `minimal-dark-black`. Without that plugin, `styles.css` does nothing.
- In Latte **High contrast**, Minimal Theme Settings adds `theme-dark` to the left sidebar and ribbon. The Mocha section must keep its `.minimal-light-contrast :is(...)` selectors, or those dark areas lose their colors.
- In **True black**, Minimal draws black through `--background-primary`, not `--bg1`. `--bg1` staying at Mocha Base is expected.
- When testing, change Minimal options through the Minimal Theme Settings plugin (its settings plus `refresh()`), not by editing `body` classes. Editing classes directly gives wrong results.

## Manual checks

Check the background options and views listed under **Readability notes** in `README.md`. If a contrast value changes, update the number in `README.md`. Set `app.emulateMobile(false)` after any mobile test, because Obsidian keeps that setting.

## Commits and releases

- Use short imperative commit subjects, for example `Fix Latte callout title contrast`.
- Update `README.md` in the same commit when behavior or measured contrast changes.
- To release, bump `version` in `manifest.json`, add it to `versions.json`, commit, and push a tag that exactly matches the version with no leading `v`.
- Never change the plugin `id` (`minimal-catppuccin`).
- Keep the plugin offline: no network calls or telemetry.
