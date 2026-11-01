// Most styling lives in styles.css, which Obsidian loads while the plugin is enabled.
// This file only gives Mermaid diagrams Catppuccin colors, which CSS cannot do alone.
const { MarkdownView, Plugin, loadMermaid } = require("obsidian");

// Same order as the official Catppuccin Obsidian theme's mindmap colors.
const ACCENTS = ["orange", "yellow", "green", "red", "blue", "purple", "pink", "cyan"];
const BODY_CLASS = "ctp-mermaid";
const MERMAID_BLOCK = /(```|~~~)\s*mermaid/;

module.exports = class MinimalCatppuccinPlugin extends Plugin {
	onload() {
		this.app.workspace.onLayoutReady(async () => {
			const mermaid = await loadMermaid();
			// The plugin may have been disabled while Mermaid was loading.
			if (this.unloaded) return;
			this.mermaid = mermaid;
			// Passing the default `layout: "dagre"` back in would force mindmaps into a wide tree
			// instead of their own radial layout, so leave it out.
			const { themeVariables, layout, ...siteConfig } = this.mermaid.mermaidAPI.getSiteConfig();
			this.siteConfig = siteConfig;
			this.defaultTheme = { theme: siteConfig.theme, themeVariables: { fontFamily: themeVariables.fontFamily } };
			this.applyMermaidColors();
			this.registerEvent(this.app.workspace.on("css-change", () => this.applyMermaidColors()));
			// Obsidian adds this plugin's styles.css after onload() and fires no event for it, and
			// Minimal Theme Settings changes the color scheme by swapping body classes without css-change.
			const observer = new MutationObserver(() => this.applyMermaidColors());
			observer.observe(document.head, { childList: true });
			observer.observe(document.body, { attributeFilter: ["class"] });
			this.register(() => observer.disconnect());
		});
	}

	onunload() {
		this.unloaded = true;
		document.body.removeClass(BODY_CLASS);
		if (!this.mermaid || !this.current) return;
		this.mermaid.initialize({ ...this.siteConfig, ...this.defaultTheme });
		this.redrawDiagrams();
	}

	applyMermaidColors() {
		const theme = isCatppuccinActive() ? catppuccinTheme(this.defaultTheme.themeVariables.fontFamily) : null;
		const key = JSON.stringify(theme);
		if (key === this.current) return;
		this.current = key;

		document.body.toggleClass(BODY_CLASS, theme !== null);
		this.mermaid.initialize({ ...this.siteConfig, ...(theme ?? this.defaultTheme) });
		this.redrawDiagrams();
	}

	// Obsidian reuses a drawn diagram while its source is unchanged, so a normal
	// re-render keeps the old colors. These calls draw every diagram again. Check the source,
	// and the DOM: scrolled-out diagrams are only in the source, embedded ones only in the DOM.
	redrawDiagrams() {
		this.app.workspace.iterateAllLeaves((leaf) => {
			const view = leaf.view;
			if (!(view instanceof MarkdownView) || !hasMermaid(view)) return;
			if (view.getMode() === "preview") view.previewMode.rerender(true);
			else leaf.rebuildView();
		});
	}
};

function hasMermaid(view) {
	return MERMAID_BLOCK.test(view.getViewData()) || view.containerEl.querySelector(".mermaid") !== null;
}

function isCatppuccinActive() {
	const body = document.body;
	if (!body.hasClass("minimal-theme")) return false;
	return body.hasClass("theme-dark")
		? body.hasClass("minimal-catppuccin-dark")
		: body.hasClass("minimal-catppuccin-light");
}

// Mermaid's "base" theme is the only one that accepts custom colors. It reads hex
// values only and works out every other diagram color from the ones set here.
function catppuccinTheme(fontFamily) {
	const c = readColors();
	const accent = (i) => c[ACCENTS[i % ACCENTS.length]];
	const v = {
		fontFamily,
		darkMode: document.body.hasClass("theme-dark"),
		background: c.base,
		primaryColor: c.surface0,
		primaryTextColor: c.text,
		primaryBorderColor: c.surface2,
		secondaryColor: c.mantle,
		tertiaryColor: c.mantle,
		lineColor: c.overlay,
		textColor: c.text,
		titleColor: c.text,
		clusterBkg: c.mantle,
		clusterBorder: c.surface2,
		edgeLabelBackground: c.base,
		noteBkgColor: mix(c.yellow, c.base, 0.15),
		noteTextColor: c.text,
		noteBorderColor: c.yellow,
		actorLineColor: c.surface2,
		signalColor: c.overlay,
		signalTextColor: c.text,
		labelBoxBkgColor: c.surface0,
		labelBoxBorderColor: c.surface2,
		labelTextColor: c.text,
		loopTextColor: c.text,
		activationBkgColor: c.surface1,
		activationBorderColor: c.surface2,
		sequenceNumberColor: c.onAccent,
		// Mindmap root and git main branch.
		git0: c.lavender,
		gitBranchLabel0: c.onAccent,
		pieTitleTextColor: c.text,
		pieSectionTextColor: c.onAccent,
		pieLegendTextColor: c.text,
		pieStrokeColor: c.base,
		pieOuterStrokeColor: c.surface2,
	};
	// Mindmap section N uses cScale(N + 1); cScaleInv colors the underline.
	for (let i = 0; i < 12; i++) {
		const color = accent(i + ACCENTS.length - 1);
		v[`cScale${i}`] = color;
		v[`cScaleInv${i}`] = color;
		v[`cScaleLabel${i}`] = c.onAccent;
		v[`pie${i + 1}`] = accent(i);
	}
	for (let i = 0; i < 8; i++) v[`fillType${i}`] = accent(i);
	for (let i = 1; i < 8; i++) {
		v[`git${i}`] = accent(i - 1);
		v[`gitBranchLabel${i}`] = c.onAccent;
	}
	return { theme: "base", themeVariables: v };
}

function readColors() {
	const vars = {
		base: "--background-primary",
		mantle: "--background-secondary",
		surface0: "--ui1",
		surface1: "--ui2",
		surface2: "--ui3",
		overlay: "--tx3",
		text: "--text-normal",
		onAccent: "--text-on-accent",
		lavender: "--text-accent",
	};
	for (const name of ACCENTS) vars[name] = `--color-${name}`;

	// Resolve through a real element so hsl(), calc(), and var() all become rgb().
	const probe = document.body.createDiv();
	const colors = {};
	for (const [name, prop] of Object.entries(vars)) {
		probe.style.color = `var(${prop})`;
		colors[name] = toHex(getComputedStyle(probe).color);
	}
	probe.remove();
	return colors;
}

function toHex(rgb) {
	const [r, g, b] = rgb.match(/[\d.]+/g).map(Number);
	return "#" + [r, g, b].map((n) => Math.round(n).toString(16).padStart(2, "0")).join("");
}

function mix(hex, baseHex, amount) {
	const parse = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
	const a = parse(hex);
	const b = parse(baseHex);
	return toHex(`rgb(${a.map((x, i) => x * amount + b[i] * (1 - amount)).join(",")})`);
}
