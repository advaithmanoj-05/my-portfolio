---
name: Apex Velocity
colors:
  surface: '#121317'
  surface-dim: '#121317'
  surface-bright: '#38393d'
  surface-container-lowest: '#0d0e12'
  surface-container-low: '#1a1b20'
  surface-container: '#1f1f24'
  surface-container-high: '#292a2e'
  surface-container-highest: '#343439'
  on-surface: '#e3e2e7'
  on-surface-variant: '#e0c0af'
  inverse-surface: '#e3e2e7'
  inverse-on-surface: '#2f3035'
  outline: '#a78b7c'
  outline-variant: '#584235'
  surface-tint: '#ffb68b'
  primary: '#ffb68b'
  on-primary: '#522300'
  primary-container: '#ff7a00'
  on-primary-container: '#5c2800'
  inverse-primary: '#994700'
  secondary: '#bdf4ff'
  on-secondary: '#00363d'
  secondary-container: '#00e3fd'
  on-secondary-container: '#00616d'
  tertiary: '#b2d413'
  on-tertiary: '#2a3400'
  tertiary-container: '#8fac00'
  on-tertiary-container: '#313c00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbc8'
  primary-fixed-dim: '#ffb68b'
  on-primary-fixed: '#321200'
  on-primary-fixed-variant: '#753400'
  secondary-fixed: '#9cf0ff'
  secondary-fixed-dim: '#00daf3'
  on-secondary-fixed: '#001f24'
  on-secondary-fixed-variant: '#004f58'
  tertiary-fixed: '#cef139'
  tertiary-fixed-dim: '#b2d413'
  on-tertiary-fixed: '#171e00'
  on-tertiary-fixed-variant: '#3e4c00'
  background: '#121317'
  on-background: '#e3e2e7'
  surface-variant: '#343439'
typography:
  display-hero:
    fontFamily: Barlow Condensed
    fontSize: 80px
    fontWeight: '800'
    lineHeight: 84px
    letterSpacing: 0.02em
  display-hero-mobile:
    fontFamily: Barlow Condensed
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Barlow Condensed
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: 0.01em
  headline-lg-mobile:
    fontFamily: Barlow Condensed
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Barlow Condensed
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: Barlow Condensed
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-telemetry:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 3rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system targets elite performance enthusiasts, high-output creators, and modern motorsport audiences who value speed, telemetry precision, and kinetic energy. The emotional core balances raw adrenaline with engineering composure: surgical, focused, hyper-contemporary, and confident.

The aesthetic fuses **Modern High-Contrast Precision** with **Minimalist Technical Futurism**. Surfaces feel stripped of decorative fat—relying on high-tension negative space, sharp structural layout lines, precise carbon-tier dark backdrops, and high-luminance papaya accents. Motion metaphors derive from track telemetry: sudden acceleration, calibrated transitions, directional angular motifs (such as aerodynamic 45° chamfers on micro-accents), and zero-clutter information architecture.

## Colors

- **Primary (`#FF7A00`)**: Pure kinetic papaya. Reserved for hero moments, active drive states, dynamic lap delta indicators, critical CTA actions, and focus states.
- **Secondary (`#00E5FF`)**: Aerodynamic cyan. Operates as an electronic telemetry highlight, sector speed delta, and precision auxiliary indicator.
- **Tertiary (`#D8FC44`)**: Fluorescent electric yellow. Deployed sparingly for absolute alerts, records, active live race telemetry, or system pulses.
- **Neutral (`#0D0E12`)**: Deep technical obsidian with a cool slate undertone. Provides deep contrast without the dead weight of absolute pitch black.

### Surface System
- **Base / Canvas**: `#08090C`
- **Surface Container Lowest**: `#0D0E12`
- **Surface Container (Card Base)**: `#14161D`
- **Surface Container High (Elevation/Overlays)**: `#1C1F28`
- **Surface Stroke / Border**: `#2A2E3B` (low-opacity structural alignment)
- **Text Primary**: `#F5F7FA`
- **Text Secondary / Telemetry Muted**: `#8D93A5`
- **Text Inverted (on Primary)**: `#08090C`

### Light Mode Mapping
- **Canvas**: `#F5F6F9`
- **Surface Container**: `#FFFFFF`
- **Surface Container High**: `#EBEFF5`
- **Surface Stroke**: `#D7DCE5`
- **Text Primary**: `#0B0D11`
- **Text Secondary**: `#545B6B`

## Typography

The typography architecture uses a three-tier setup to convey speed, human clarity, and instrumentation:

1. **Barlow Condensed (Display & Headlines)**: High-velocity condensed impact. All uppercase for high-impact stats, section headers, and callouts, mimicking pit-lane monitors, cockpit steering HUDs, and racing liveries.
2. **Geist (Body & Descriptive Content)**: Hyper-clean, neutral, and devoid of eccentricities. Ensures effortless scannability and prevents visual exhaustion across high-density layouts.
3. **JetBrains Mono (Telemetry, Metadata & Labels)**: Monospaced numerical precision. Used for times, sector speeds, ranks, status chips, code markers, and micro-navigation.

## Layout & Spacing

The layout is built on a 12-column modular grid (4 columns on mobile, 8 on tablet) using an 8-point vertical cadence (with a 4-point micro step). 

### Layout Behavior
- **Edge Anchors**: High-contrast full-bleed sections bookended by razor-thin, low-contrast 1px grid guides (`#2A2E3B`).
- **Telemetry Rails**: Asymmetrical left/right utility columns (64px to 80px) house vertical status badges, scroll positions, or breadcrumbs.
- **Responsive Adaptations**:
  - **Desktop (>=1280px)**: 12 columns, 48px margins, generous interior negative space to let bold typography breathe.
  - **Tablet (768px - 1279px)**: 8 columns, 32px margins, condensed data cards stack into 2-column matrices.
  - **Mobile (<768px)**: 4 columns, 16px margins, compact gutters, horizontal carousel snaps for tabular telemetry.

## Elevation & Depth

Visual depth avoids soft, blurry organic drop shadows. Depth is achieved strictly through **Tonal Stacking** and **Subtle Edge Occlusion**:

- **Layer 0 (Canvas)**: Deepest tone (`#08090C`).
- **Layer 1 (Card/Container)**: `#14161D` with an explicit 1px rim outline (`#2A2E3B`).
- **Layer 2 (Floating Modals & Telemetry Overlays)**: `#1C1F28` framed with a high-precision hairline stroke and an ambient dark spread (`0px 12px 32px rgba(0, 0, 0, 0.65)`).
- **Kinetic Accent Depth**: Active or selected cards drop a sharp 1px glow or 2px inset track using the Primary Papaya accent (`#FF7A00`) at 15% opacity, evoking backlit performance instrumentation.

## Shapes

The shape system is crisp, mechanical, and aerodynamic (`roundedness: 1`):
- Default corner radius: `4px` (`0.25rem`).
- Large containers / Cards: `8px` (`0.5rem`).
- Micro elements (Tags, Indicators): `2px` to `4px`.
- **Directional Chamfers**: Key interactive triggers feature an optional 45-degree angled cutoff (4px to 6px) on the top-right or bottom-left corner via CSS `clip-path`, reinforcing race-grade aerodynamic profiling without descending into retro-sci-fi cliches.

## Components

### Buttons
- **Primary**: Solid Papaya (`#FF7A00`) background, deep neutral text (`#08090C`), Barlow Condensed uppercase bold text, 4px corner radius. On hover: shifts to `#FF9029` with a subtle translate of -1px on the Y-axis.
- **Secondary (Telemetry Ghost)**: Border 1px `#2A2E3B`, transparent background, text `#F5F7FA`. On hover: border-color transitions to `#00E5FF`, text gains a faint `#00E5FF` glow.
- **Micro/Action**: Monospaced labels, 28px height, padded with `0.75rem` inline.

### Chips & Badges
- Strict technical pill: JetBrains Mono text, uppercase, `font-size: 11px`.
- Background: `#1C1F28` with a 1px solid border. Active status indicated by a 6px circular neon dot (`#00E5FF` or `#D8FC44`) or a left 2px solid Papaya stripe.

### Cards & Data Panels
- Surface: `#14161D` with a uniform 1px border (`#2A2E3B`).
- Header bar: Features an integrated micro-label for data status (e.g., `SEC // 01`) in muted JetBrains Mono.
- No rounded inner containers; maintain parallel 4px internal radius alignments.

### Inputs & Controls
- **Fields**: Obsidian base (`#0D0E12`), 1px structural border (`#2A2E3B`), text `#F5F7FA`. Focused state replaces border with a razor `#FF7A00` outline and zero blur radius.
- **Checkboxes & Radios**: 16px square/circle, `#14161D` base, 1px border. Checked state renders a solid `#FF7A00` core with `#08090C` tick mark.

### Telemetry / Metric Indicators
- Number values presented in Barlow Condensed (`display-hero` or `headline-lg`) paired directly above a JetBrains Mono secondary label. Delta metrics (`+0.241s`) use Secondary Cyan or Tertiary Yellow with positive/negative directional carets.