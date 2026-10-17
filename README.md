# Minimal Catppuccin

An Obsidian plugin that updates [Minimal Theme](https://github.com/kepano/obsidian-minimal)'s built-in **Catppuccin** color scheme to the current official [Catppuccin](https://github.com/catppuccin/catppuccin) Latte (light) and Mocha (dark) colors, with Lavender accents. It follows Minimal's [custom color scheme workflow](https://minimal.guide/features/color-schemes#Custom+color+schemes).

The plugin contains only CSS. It has no settings, commands, or network access.

## Requirements

- [Minimal Theme](https://github.com/kepano/obsidian-minimal)
- [Minimal Theme Settings](https://github.com/kepano/obsidian-minimal-settings), with **Catppuccin** selected as the light or dark color scheme

## Install

### With BRAT

1. Install the [BRAT](https://github.com/TfTHacker/obsidian42-brat) community plugin.
2. In **Settings → BRAT**, select **Add beta plugin** and enter this repository's URL.
3. Enable **Minimal Catppuccin** in **Settings → Community plugins**.

### Manually

Copy `main.js`, `manifest.json`, and `styles.css` from the latest release to `<Vault>/.obsidian/plugins/minimal-catppuccin/`, then enable **Minimal Catppuccin** in **Settings → Community plugins**.

## Colors

Code follows [Catppuccin Neovim's default mappings](https://github.com/catppuccin/nvim/blob/edefef779ab08ce1a4a404713e3012b0d202bd35/lua/catppuccin/groups/treesitter.lua). Everything else follows the [Catppuccin style guide](https://github.com/catppuccin/catppuccin/blob/d09787dd98ca6fba08af5ef2ae94a7e09f17daca/docs/style-guide.md).

## Troubleshooting

- If colors do not match, reset color overrides in Style Settings or turn off other color snippets.
- If you used the earlier `catppuccin-latte.css` and `catppuccin-mocha.css` snippets, turn them off.
- Turn off this plugin when you switch away from Minimal Theme.

## Known limits

- Some official Latte colors are hard to read on the light background: blue links, code colors, callout titles, and **Colorful headings**. The plugin keeps the official colors.
- **Colorful frame** shows no color in Latte. In Mocha it is a bright blue that is not a Catppuccin color.

## Release

1. Update `version` in `manifest.json` and add it to `versions.json`.
2. Commit, then push a tag that exactly matches the version, without a leading `v` (for example `1.0.1`).
3. The release workflow attaches `main.js`, `manifest.json`, and `styles.css` to the GitHub release.
