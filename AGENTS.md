# Minimal Catppuccin

CSS-only Obsidian plugin. It updates Minimal Theme's built-in **Catppuccin** color scheme to the official Catppuccin Latte (light) and Mocha (dark) colors.

## How it works

- `styles.css` holds all styling. Obsidian loads it while the plugin is enabled and removes it when the plugin is disabled.
- `main.js` is hand-written and only exports an empty `Plugin` class. There is no build step, no `package.json`, and no dependencies. Keep it that way unless a feature truly needs code.
- Rules only apply when Minimal Theme Settings adds its classes to `body`: `minimal-theme`, `minimal-catppuccin-light`, `minimal-catppuccin-dark`, and background classes such as `minimal-light-contrast`, `minimal-light-tonal`, `minimal-light-white`, `minimal-dark-black`, and `minimal-status-off`.

## styles.css layout

- **Latte section:** scoped to `body.minimal-theme.theme-light.minimal-catppuccin-light`.
- **Mocha section:** scoped to `body.minimal-theme.theme-dark.minimal-catppuccin-dark`. It also covers the dark areas of Latte **High contrast** (`.theme-dark`, `.titlebar`, `.workspace-drawer.mod-primary`, and similar). In High contrast, Minimal Theme Settings adds `theme-dark` to the left sidebar and ribbon, so Mocha must keep styling those areas.
- Each section starts with its MIT license header. Keep both headers.
- Set Minimal's variables (`--base-h/s/l`, `--accent-h/s/l`, `--bg1`, `--tx1`, `--ax1`, `--hl1`, `--hl2`, `--icon-hex`, and others) and Obsidian's `--color-*` variables. Do not hard-code colors on elements when a variable exists.
- Do not change Minimal's other color schemes.

## Color rules

- Use official Catppuccin hex values only.
- Accent is Lavender.
- Code colors follow Catppuccin Neovim's default Treesitter mappings.
- Other UI colors follow the Catppuccin style guide.
- Document any intentional exception in `README.md` under **Readability notes**. For example, Latte uses Mocha Base text on Lavender controls for contrast.

## Testing

There are no automated tests. Test by hand in Obsidian:

1. Copy `main.js`, `manifest.json`, and `styles.css` to `<Vault>/.obsidian/plugins/minimal-catppuccin/`.
2. Install Minimal Theme and Minimal Theme Settings. Select **Catppuccin** for both light and dark color schemes.
3. Check Editing and Reading views with each background option:
   - Latte: **Default**, **Low contrast**, **All white**, **High contrast**.
   - Mocha: **Default**, **Low contrast**, **True black**.
4. Also check the status bar turned off, the command palette, Graph view, and the mobile layout (`app.emulateMobile(true)` in the developer console; set it back to `false` afterward).
5. Text should reach 4.5:1 contrast where the official palette allows it. If a value changes, update the numbers in `README.md`.

## Releases

- Bump `version` in `manifest.json` (SemVer) and add the version → `minAppVersion` entry to `versions.json`.
- Push a tag that exactly matches the version, with no leading `v`. `.github/workflows/release.yml` checks this and attaches `main.js`, `manifest.json`, and `styles.css` to the release.
- Never change the plugin `id` (`minimal-catppuccin`).

## Rules

- Keep the plugin offline. Do not add network calls, telemetry, or settings that send data.
- Update `README.md` when behavior, supported options, or measured contrast changes.
