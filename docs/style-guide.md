# Style Guide

A comprehensive brand and design reference.

---

## Brand Overview

The brand emphasizes simplicity, developer-first design, and a clean monochromatic aesthetic with a distinctive pixel/block-based logo.

**Tagline**: "The open source AI coding agent"

---

## Logo

The logo uses a distinctive pixel/block-based typography with a unique visual treatment:
- First portion appears in a muted gray tone
- Second portion appears in a darker/lighter contrasting tone depending on theme

### Logo Variants

| Variant | Use Case |
|---------|----------|
| Full Logo (Light) | Light backgrounds |
| Full Logo (Dark) | Dark backgrounds |
| Wordmark (Light) | Horizontal light layouts |
| Wordmark (Dark) | Horizontal dark layouts |
| Simple Wordmark (Light) | Minimal light contexts |
| Simple Wordmark (Dark) | Minimal dark contexts |

### Logo Colors (from SVG source)

#### Light Mode Logo
```
Primary Text: #211E1E (near black)
Secondary Text: #656363 (medium gray)
Inner Accent: #CFCECD (light gray)
```

#### Dark Mode Logo
```
Primary Text: #F1ECEC (off-white)
Secondary Text: #B7B1B1 (light gray)
Inner Accent: #4B4646 (dark gray)
```

### Logo Usage Guidelines
- Maintain adequate spacing around the logo
- Do not distort or stretch the logo
- Use appropriate color variant for background contrast

---

## Color Palette

### Core Brand Colors

#### Neutrals (Primary Palette)

| Name | Light Mode | Dark Mode | Usage |
|------|------------|-----------|-------|
| Primary Text | `#211E1E` | `#F1ECEC` | Main text, headings |
| Secondary Text | `#656363` | `#B7B1B1` | Supporting text |
| Muted | `#CFCECD` | `#4B4646` | Borders, dividers |
| Background | `#FFFFFF` | `#0D0D0D` | Page background |

### Theme Color Definitions (Default Theme)

Based on the Nord-inspired default theme structure:

```json
{
  "primary": { "dark": "#88C0D0", "light": "#5E81AC" },
  "secondary": { "dark": "#81A1C1", "light": "#81A1C1" },
  "accent": { "dark": "#8FBCBB", "light": "#8FBCBB" },
  "error": { "dark": "#BF616A", "light": "#BF616A" },
  "warning": { "dark": "#D08770", "light": "#D08770" },
  "success": { "dark": "#A3BE8C", "light": "#A3BE8C" },
  "info": { "dark": "#88C0D0", "light": "#5E81AC" }
}
```

### Semantic Colors

| Purpose | Light | Dark | Hex (Dark) |
|---------|-------|------|------------|
| Primary Action | Blue | Cyan | `#88C0D0` |
| Success | Green | Green | `#A3BE8C` |
| Warning | Orange | Orange | `#D08770` |
| Error | Red | Red | `#BF616A` |
| Info | Blue | Cyan | `#88C0D0` |

### Diff/Code Colors

| Element | Light | Dark |
|---------|-------|------|
| Added | `#A3BE8C` | `#A3BE8C` |
| Removed | `#BF616A` | `#BF616A` |
| Context | `#4C566A` | `#4C566A` |

---

## Typography

### Font Families

#### Primary (UI/Body)
```css
font-family: "Inter", "Inter Fallback", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

**Inter** is used for all UI text, headings, and body content. It's a variable font supporting weights 100-900.

#### Monospace (Code)
```css
font-family: "IBM Plex Mono", "IBM Plex Mono Fallback", "Courier New", monospace;
```

**IBM Plex Mono** is the primary code font, available in:
- Regular (400)
- Medium (500)
- Bold (700)

#### Terminal Nerd Fonts
For terminal display, multiple Nerd Font variants are supported:
- JetBrains Mono Nerd Font
- Fira Code Nerd Font
- Cascadia Code Nerd Font
- Hack Nerd Font
- Source Code Pro Nerd Font
- Inconsolata Nerd Font
- Roboto Mono Nerd Font
- Ubuntu Mono Nerd Font
- Intel One Mono Nerd Font
- Meslo LGS Nerd Font

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, paragraphs |
| Medium | 500 | Emphasis, labels |
| Bold | 700 | Headings, strong emphasis |

### Font Sizes (Suggested Scale)

```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

---

## Spacing System

Based on a 4px/8px grid system:

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

---

## Components

### Buttons

#### Primary Button
```css
background: var(--primary);
color: var(--background);
border-radius: 6px;
padding: 0.5rem 1rem;
font-weight: 500;
```

#### Secondary Button
```css
background: transparent;
color: var(--text);
border: 1px solid var(--border);
border-radius: 6px;
padding: 0.5rem 1rem;
```

### Code Blocks

```css
background: var(--backgroundPanel);
border: 1px solid var(--border);
border-radius: 8px;
padding: 1rem;
font-family: "IBM Plex Mono", monospace;
font-size: 0.875rem;
```

### Cards/Panels

```css
background: var(--backgroundPanel);
border: 1px solid var(--border);
border-radius: 8px;
padding: 1.5rem;
```

### Navigation Header

- Height: 80px minimum
- Uses flex alignment (center)
- Logo on left, navigation links on right
- Sticky positioning on scroll

---

## Syntax Highlighting

Based on the theme system, syntax colors follow this mapping:

| Element | Color Reference |
|---------|-----------------|
| Comment | `syntaxComment` (muted) |
| Keyword | `syntaxKeyword` (blue) |
| Function | `syntaxFunction` (cyan) |
| Variable | `syntaxVariable` (teal) |
| String | `syntaxString` (green) |
| Number | `syntaxNumber` (purple) |
| Type | `syntaxType` (teal) |
| Operator | `syntaxOperator` (blue) |
| Punctuation | `syntaxPunctuation` (text) |

### Markdown Rendering

| Element | Color Reference |
|---------|-----------------|
| Heading | `markdownHeading` |
| Link | `markdownLink` |
| Link Text | `markdownLinkText` |
| Code | `markdownCode` |
| Block Quote | `markdownBlockQuote` |
| Emphasis | `markdownEmph` |
| Strong | `markdownStrong` |
| List Item | `markdownListItem` |
| Image | `markdownImage` |

---

## Dark/Light Mode

Both dark and light modes are supported, with dark being the default preference for developer tools.

### Implementation

The theme system uses a dual-color definition for each semantic color:

```json
{
  "primary": {
    "dark": "#88C0D0",
    "light": "#5E81AC"
  }
}
```

Special value `"none"` can be used to inherit terminal defaults, useful for the `system` theme that adapts to terminal colors.

### System Theme

The `system` theme automatically:
1. Generates grayscale based on terminal background
2. Uses ANSI colors (0-15) for syntax highlighting
3. Preserves terminal defaults using `none` values

---

## Motion & Animation

Keep animations subtle and purposeful:

- **Duration**: 150-300ms for micro-interactions
- **Easing**: `ease-in-out` or `cubic-bezier(0.4, 0, 0.2, 1)`
- **Reduce motion**: Respect `prefers-reduced-motion` media query

---

## Iconography

- Use simple, monochrome icons
- Maintain consistent stroke width
- Icons should be optically balanced with text
- Nerd Font icons are used extensively in terminal UI

---

## Accessibility

- Ensure WCAG 2.1 AA contrast ratios (4.5:1 for text)
- Support keyboard navigation
- Provide meaningful alt text for images
- Use semantic HTML elements
- Respect `prefers-reduced-motion` and `prefers-color-scheme`

---

## File Naming

- Use kebab-case for all filenames
- Logo files: `logo-{variant}.{ext}`
- Theme files: `{theme-name}.json`

---

## Theme Configuration Example

To create a custom theme, create a JSON file:

```json
{
  "defs": {
    "brand-dark": "#211E1E",
    "brand-light": "#F1ECEC",
    "brand-gray": "#656363",
    "brand-muted": "#CFCECD"
  },
  "theme": {
    "primary": { "dark": "#88C0D0", "light": "#5E81AC" },
    "text": { "dark": "brand-light", "light": "brand-dark" },
    "textMuted": { "dark": "brand-gray", "light": "brand-gray" },
    "background": { "dark": "#0D0D0D", "light": "#FFFFFF" },
    "backgroundPanel": { "dark": "#1A1A1A", "light": "#F5F5F5" },
    "border": { "dark": "#333333", "light": "#E0E0E0" }
  }
}
```

Place theme files in:
- User: `~/.config/themes/`
- Project: `.themes/`

---

*Last updated: January 2026*
