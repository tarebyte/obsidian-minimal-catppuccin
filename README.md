# Minimal Catppuccin

An Obsidian plugin that updates [Minimal Theme](https://github.com/kepano/obsidian-minimal)'s built-in **Catppuccin** color scheme to the current official [Catppuccin](https://github.com/catppuccin/catppuccin) Latte (light) and Mocha (dark) colors, with Lavender accents. It follows Minimal's [custom color scheme workflow](https://minimal.guide/features/color-schemes#Custom+color+schemes).

The plugin contains only CSS. It has no settings, commands, or network access.

## Requirements

- [Minimal Theme](https://github.com/kepano/obsidian-minimal)
- [Minimal Theme Settings](https://github.com/kepano/obsidian-minimal-settings)

## Install

### With BRAT

1. Install the [BRAT](https://github.com/TfTHacker/obsidian42-brat) community plugin.
2. In **Settings → BRAT**, select **Add beta plugin** and enter this repository's URL.
3. Enable **Minimal Catppuccin** in **Settings → Community plugins**.

### Manually

Copy `main.js`, `manifest.json`, and `styles.css` from the latest release to `<Vault>/.obsidian/plugins/minimal-catppuccin/`, then enable **Minimal Catppuccin** in **Settings → Community plugins**.

## Use

1. In **Settings → Appearance**, select Minimal Theme.
2. In **Settings → Minimal Theme Settings**, select **Catppuccin** for **Light mode color scheme**, **Dark mode color scheme**, or both.

Mocha supports **Default**, **Low contrast**, and **True black** backgrounds. Latte supports **Default**, **Low contrast**, **All white**, and **High contrast**. In Latte **High contrast**, the light areas use Latte and the dark sidebars use Mocha. Other Minimal color schemes are not changed.

If you used the earlier `catppuccin-latte.css` and `catppuccin-mocha.css` snippets, turn them off in **Settings → Appearance → CSS snippets**.

Code follows [Catppuccin Neovim's default mappings](https://github.com/catppuccin/nvim/blob/edefef779ab08ce1a4a404713e3012b0d202bd35/lua/catppuccin/groups/treesitter.lua): purple keywords, green strings, blue functions, peach values, gray comments, lavender properties, blue tags, and pink important/regex tokens. Editing and Reading views may classify code differently, so their highlighting can differ.

Outside code, colors follow the [Catppuccin style guide](https://github.com/catppuccin/catppuccin/blob/d09787dd98ca6fba08af5ef2ae94a7e09f17daca/docs/style-guide.md): blue links and tags, sky hover colors, a Rosewater caret, and Overlay2 selection at 25% opacity. Highlighted text uses a 20% yellow tint for readability (30% in **True black**, to match the default look). Visited external links use lavender when the browser reports them as visited; the plugin does not track link history itself.

If colors do not match, reset conflicting color overrides in Style Settings or turn off other color snippets. Turn off this plugin to restore Minimal's built-in Catppuccin scheme. Also turn it off when you switch away from Minimal Theme, because Minimal Theme Settings can keep its color scheme classes active.

## Readability notes

- Latte uses dark Mocha Base text on Lavender controls instead of light Latte Base text. This intentional exception gives approximately 5.15:1 contrast on Lavender; light Latte Base text would give only 2.81:1. Minimal draws Latte buttons and toggles in a lighter Lavender, where the measured contrast is approximately 6.8:1.
- Some official Latte colors have lower text contrast on Latte Base: Blue links are approximately 4.34:1 and Overlay2 code comments are 3.49:1. Inside Latte code blocks, syntax colors measure approximately 2.0:1 (Pink) to 4.1:1 (Mauve), and colored callout titles can be as low as 2.1:1. Keeping the source mappings does not guarantee normal-text accessibility in every case.
- Latte's highlighted text has approximately 6.00:1 contrast on Base and 6.67:1 on white. **All white**, **True black**, and the light/dark combination in **High contrast** deliberately preserve Minimal's background options rather than forcing every surface to Base.
- Checked in Obsidian 1.14.4 in Editing and Reading views with every Latte and Mocha background option, with the status bar turned off, in the command palette, in Graph view, and with mobile layout emulated on desktop. Body text, highlights, links, and callouts were readable. All Mocha text and all text in the High contrast dark sidebar and mobile drawer measured at least 4.5:1. In Editing view, `true`, `null`, and the `greet` function declaration still use normal text color because the editor does not give them a syntax color; Reading view colors them.

## Release

1. Update `version` in `manifest.json` and add it to `versions.json`.
2. Commit, then push a tag that exactly matches the version, without a leading `v` (for example `1.0.1`).
3. The release workflow attaches `main.js`, `manifest.json`, and `styles.css` to the GitHub release.
