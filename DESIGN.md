---
version: alpha
name: Pratik Portfolio
description: A thoughtful engineering portfolio with violet accents and an illustrated code workspace.
colors:
  primary: '#7050d7'
  primary-dark: '#b29af8'
  background: '#f7f7fa'
  background-dark: '#121217'
  surface: '#ffffff'
  surface-dark: '#1b1b23'
  text: '#25242c'
  text-dark: '#eeedf4'
  muted: '#6d6b79'
  muted-dark: '#aaa6b9'
  border: '#e4e3eb'
  border-dark: '#30303c'
  success: '#368362'
  success-dark: '#80caa3'
typography:
  display:
    fontFamily: Space Grotesk Variable, sans-serif
  sans:
    fontFamily: DM Sans Variable, sans-serif
  mono:
    fontFamily: IBM Plex Mono, monospace
rounded:
  DEFAULT: 12px
  sm: 8px
  md: 12px
  lg: 20px
spacing:
  section-gap: 104px
  page-max: 1160px
components:
  button: {}
  card: {}
  dialog: {}
---

# Pratik Portfolio Design System

## Overview

### Creative North Star

A software engineer's personal workbench: calm space, exact typography, and a code editor that turns an introduction into a visual artifact. The signature is an original, tilted editor on a faint engineering grid, paired with code-drawn project previews. It communicates breadth without a dense technology logo wall.

### Product context and register

- Audience: engineering teams, recruiters, collaborators, and potential clients discovering the owner's work and contact information.
- Register: English-language personal showcase, with frontend-only project filtering and project detail dialogs. No backend or contact submission service.
- Market: global; the sample profile uses Nepal as its location. No market inferred from that sample.
- References: Brittany Chiang for clear engineering storytelling; Rauno Freiberg for restraint and interaction craft; Bruno Simon for a personal, interactive signature. No copied source or branding.
- Runtime ownership: `src/styles/tokens.css` is canonical. This document mirrors accepted shared values. `src/styles/global.css` and all React components consume semantic CSS variables. Artwork has its own fixed preview palettes so preview images remain consistent across themes.
- Restraint: violet is reserved for meaningful emphasis, calls to action, identity, and selected states. No scroll hijacking, heavy 3D runtime, or decorative metrics.

## Colors

Light mode pairs cool white with ink and violet. Dark mode remaps the same semantic tokens to deep neutral surfaces and lavender. Both use a green status dot plus text. Muted text is reserved for supporting information. Button foregrounds follow `--primary-text` in both themes. Focus uses `--focus`.

The remaining implementation tokens, including scrollbar normal, hover, and active colors, live in the canonical stylesheet. The contact surface is a quiet violet tint. All themes inherit the same component rules.

## Typography

Space Grotesk owns titles and identity. DM Sans owns prose and controls. IBM Plex Mono owns technical captions, dates, and the editor. All three are locally bundled from fontsource packages. Display headings use tight tracking with a mobile correction. Prose uses 1.65–1.95 line height and a restrained measure. Body content is supplied by the typed mock response.

## Layout

The desktop content width is 1160px, with 48px outer gutters. The hero pairs a left thesis with an illustrated workspace. Projects use two equal columns, becoming one at 540px. About and experience use balanced split layouts; expertise moves from four to two columns. The hero stacks at 800px. Section spacing steps from 104px to 72px to 56px. Headers remain sticky with matching anchor offsets.

Images reserve their aspect ratio. Fonts are self-hosted. The body scrolls naturally; only the modal scrolls internally when open. Stable scrollbar gutters prevent opening a modal from shifting page geometry.

## Elevation & Depth

Hairline borders establish the main page hierarchy. Shadows appear on the editor, preview canvases, and dialogs. The header uses a translucent theme surface with backdrop blur. The page does not use floating panels for ordinary prose.

## Shapes

Controls use 8px radii, cards 12px, the contact panel 20px, and availability/interest badges full pills. Icon strokes come from Lucide at 1.5–2px visual weight. Technical artwork intentionally uses tighter miniature geometry.

## Components

### Foundational visual states

Links and buttons have hover, pressed, and visible keyboard focus treatments. Selected filters expose `aria-pressed`. The initial load uses a centered spinner; failures have an actionable retry. Empty project collections have an inline message. Reduced motion disables animations and smooth scrolling. Forced colors retain outlines and native scrollbar behavior.

### Buttons and actions

Primary buttons use violet fill with theme-specific contrast. Secondary buttons use surface fill and a border. Actions retain visible labels. Theme switching is a labelled icon button. The CV action downloads a searchable A4 PDF generated from the current profile data, with page numbers and clickable links. PDF support loads on demand. During generation its dimensions remain stable, duplicate clicks are blocked, and errors have inline retry guidance. A configured file URL continues to use a direct download link.

### Navigation and data display

Anchor navigation targets Work, About, Experience, and Contact. Mobile navigation expands as a non-modal disclosure, closes after selection, and supports Escape with focus restoration. Project categories derive from data and filter locally; Professional separates employment contributions from Personal projects. The section contains real work only. Project covers use original SVG illustrations or supplied images; missing images fall back to the project's own name, category, and technology tags. Tags remain informational. Null external links are hidden.

Projects reveal in batches controlled by the mock response (two initially, then two per See more). Changing a category resets the visible batch. The same control becomes See less after all results are visible, preserving keyboard focus. A live count announces how many filtered projects are displayed. Private personal projects have no source or live links and state that demos are available upon request. The CV always contains the complete project list.

Education is a compact optional list beneath the About identity card. It shares the card radius, border, and semantic theme tokens, with a graduation-cap icon and a clear hierarchy for qualification, institution, location, and optional study period. The PDF includes the same entries after experience. Dates are displayed only when supplied in the mock response.

### Forms and overlays

Contact uses a direct mail link and a copy email action with live feedback. There is no simulated message delivery. Native modal `dialog` provides focus trapping, inert background, Escape closing, and an explicit close button; the wrapper restores trigger focus and page position. Long details scroll within the viewport.

### Iconography

Lucide icons accompany visible labels. Icon-only actions have accessible names and browser title hints where appropriate. Artwork is decorative and hidden from assistive technology.

### Motion

180ms transitions provide control feedback. Project artwork gently settles on hover without hiding actions. No ambient animation. Reduced motion turns off transitions, spinner rotation, and smooth scrolling.

### Content and data visualization

Use concrete descriptions of the work and plain action labels. Sample content must be documented clearly in the README. Miniature charts and interfaces are original illustrations, not live product data or claimed results.

## Do's and Don'ts

- Do keep profile, project, skill, experience, and contact content in the mock response.
- Do update CSS tokens and this document together for durable theme changes.
- Don't add an invented backend or a contact form that claims to send messages.
- Don't turn the portfolio into a dashboard or scatter unrelated visual effects.
