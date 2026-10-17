# AGENTS.md

## Commands

There is no build, package manager, or test suite. Run these before every commit:

```sh
# Validate JSON
jq empty manifest.json versions.json

# The manifest version must be listed in versions.json
jq -e --arg v "$(jq -r .version manifest.json)" 'has($v)' versions.json
```

Install into a test vault for manual checks, then enable **Minimal Catppuccin** in **Settings → Community plugins**:

```sh
mkdir -p "<Vault>/.obsidian/plugins/minimal-catppuccin"
cp main.js manifest.json styles.css "<Vault>/.obsidian/plugins/minimal-catppuccin/"
```

See `README.md` for user-facing behavior and color sources.

## Project layout

- `styles.css`: all styling. Latte section first, then Mocha. Keep the MIT license header on each section.
- `main.js`: hand-written empty `Plugin` class. Do not add a build step or dependencies unless a feature needs code.
- `main.js`, `manifest.json`, and `styles.css` must stay at the repository root. The release workflow and BRAT expect them there.

## Things that are not obvious

- Rules only match when Minimal Theme Settings adds its `body` classes: `minimal-theme`, `minimal-catppuccin-light`, `minimal-catppuccin-dark`, and background classes such as `minimal-light-contrast` and `minimal-dark-black`. Without that plugin, `styles.css` does nothing.
- In Latte **High contrast**, Minimal Theme Settings adds `theme-dark` to the left sidebar and ribbon. The Mocha section must keep its `.minimal-light-contrast :is(...)` selectors, or those dark areas lose their colors. Also keep the "Resolve semantic colors locally" block: custom properties inherited from `body` are already resolved against Latte, so overriding palette variables alone leaves Latte colors in the dark areas.
- In **True black**, Minimal draws black through `--background-primary`, not `--bg1`. `--bg1` staying at Mocha Base is expected.
- Two deliberate exceptions to the official palette keep text at 4.5:1 or more: Latte buttons and toggles use Mocha Base text on Lavender, and status bar text uses Subtext1 (Latte) or Overlay2 (Mocha) instead of Minimal's faint Overlay1. Keep them.
- When testing, change Minimal options through the Minimal Theme Settings plugin (its settings plus `refresh()`), not by editing `body` classes. Editing classes directly gives wrong results.

## Manual checks

Check Editing and Reading views with every background option (Latte: Default, Low contrast, All white, High contrast; Mocha: Default, Low contrast, True black), with the status bar on and off, with the three Colorful options on, and in the command palette, Graph view, and mobile layout. Text should reach 4.5:1 except for the limits listed under **Known limits** in `README.md`. Set `app.emulateMobile(false)` after any mobile test, because Obsidian keeps that setting.

## Commits and releases

- Update `README.md` in the same commit when behavior or a known limit changes.
- For releases, follow **Release** in `README.md`.
- Never change the plugin `id` (`minimal-catppuccin`).
- Keep the plugin offline: no network calls or telemetry.
