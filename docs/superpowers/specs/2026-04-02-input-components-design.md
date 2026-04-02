# Input Components Design Spec

Lightweight terminal-styled input components using unicode glyphs. Five flat components, no shared base class.

## Components

| Component | File | Tag | Purpose |
|---|---|---|---|
| Text input | `tui-input.ts` | `<tui-input>` | Single-line text field |
| Checkbox | `tui-checkbox.ts` | `<tui-checkbox>` | Toggle with □/▣ glyphs |
| Radio | `tui-radio.ts` | `<tui-radio>` | Selection with ◯/◉ glyphs |
| Checkbox group | `tui-checkbox-group.ts` | `<tui-checkbox-group>` | Multi-select coordinator |
| Radio group | `tui-radio-group.ts` | `<tui-radio-group>` | Single-select coordinator |

All follow existing project patterns: TypeScript, `@customElement` decorator, `sharedStyles` import, shadow DOM, `HTMLElementTagNameMap` augmentation. The existing `tui-checkbox.js` stub is replaced.

## Design Decisions

- **Flat architecture:** No shared base class. Duplication is minimal (~10-15 lines of shared logic). Extract a base later if more input types warrant it.
- **Geometric glyphs:** Checkbox uses □/▣, radio uses ◯/◉. Clean, consistent, good cross-platform rendering.
- **Native input for text field:** `tui-input` wraps a native `<input>` element — monospace styling and terminal-themed border, but standard browser behavior for selection, copy-paste, etc.
- **Pure unicode for checkbox/radio:** No native `<input>` elements. Glyphs rendered as text, interaction via click and keyboard handlers.
- **Push protocol support:** All components implement `handleEvent()` for receiving state updates via WebSocket, matching the pattern in `tui-progress`.
- **Scope limited to plain text input:** Password masking, prompt prefix, and textarea variants are future work. The `type` property is reserved but not implemented.

## tui-input

### Properties

| Property | Type | Default | Reflected | Description |
|---|---|---|---|---|
| `value` | `string` | `''` | yes | Current input value |
| `placeholder` | `string` | `''` | no | Placeholder text |
| `disabled` | `boolean` | `false` | yes | Disabled state |
| `name` | `string` | `''` | no | Form identifier |
| `label` | `string` | `''` | no | Label rendered above input |

### Rendering

A `<label>` element (if `label` is set) above a native `<input>` element. Styled with:
- `var(--border-default)` border
- `var(--color-primary)` border on focus
- Monospace font from shared styles
- `var(--surface-base)` background

### Events

| Event | Detail | When |
|---|---|---|
| `tui-input` | `{ value: string }` | Each keystroke |
| `tui-change` | `{ value: string }` | On blur or Enter |

### Push Protocol

`handleEvent(event)` accepts:
- `{ value, placeholder, disabled, label }` — sets corresponding properties
- `type: 'clear'` — resets value to empty string

### Future

- `type` property (`'text'` | `'password'`) — reserved, not implemented
- `prefix` property (e.g. `'> '`, `'$ '`) — reserved, not implemented

## tui-checkbox

### Properties

| Property | Type | Default | Reflected | Description |
|---|---|---|---|---|
| `checked` | `boolean` | `false` | yes | Checked state |
| `disabled` | `boolean` | `false` | yes | Disabled state |
| `name` | `string` | `''` | no | Identifier |
| `value` | `string` | `''` | no | Value when checked (for group use) |
| `label` | `string` | `''` | no | Text label (alternative to slot) |

### Rendering

```
□ Label text     (unchecked)
▣ Label text     (checked)
```

Structure: focusable container (`tabindex="0"`, `role="checkbox"`) containing a glyph `<span>` and a `<slot>` (falls back to `label` property).

### Interaction

- Click or Space/Enter toggles `checked`
- `aria-checked` reflects state

### Styling

- Glyph: `var(--text-primary)` default, `var(--color-primary)` when checked
- Disabled: `var(--text-muted)`, no pointer events
- Hover: glyph highlight

### Events

| Event | Detail | When |
|---|---|---|
| `tui-change` | `{ checked: boolean, value: string, name: string }` | On toggle |

### Push Protocol

`handleEvent(event)` accepts:
- `{ checked, disabled, label }` — sets corresponding properties
- `type: 'clear'` — resets to unchecked

## tui-radio

Identical API to `tui-checkbox` with these differences:

- **Glyphs:** ◯ unselected, ◉ selected
- **Role:** `role="radio"` with `aria-checked`
- **No toggle off:** Click only selects; does not deselect. Group manages exclusivity.
- **Events:** Same shape: `tui-change` with `{ checked, value, name }`
- **Push protocol:** Same shape: `{ checked, disabled, label }` and `type: 'clear'`

## tui-checkbox-group

### Properties

| Property | Type | Default | Reflected | Description |
|---|---|---|---|---|
| `name` | `string` | `''` | no | Group name, passed to children |
| `label` | `string` | `''` | no | Group label rendered above |
| `disabled` | `boolean` | `false` | yes | Disables all children |
| `value` | `string[]` | `[]` | no | Array of checked values |

### Rendering

Optional label, then a `<slot>` for `<tui-checkbox>` children. Vertical flex layout with gap.

### Behavior

- Discovers children via `slotchange` event on the default slot
- Listens for `tui-change` events bubbling from children
- Updates `value` array (adds/removes based on child `checked` state)
- Re-emits `tui-change` with `detail: { value: string[], name: string }`
- Propagates `disabled` and `name` to children on connect and `slotchange`

### Push Protocol

`handleEvent(event)` accepts:
- `{ value: string[], disabled }` — sets selection state, propagates to children
- `type: 'clear'` — unchecks all children

## tui-radio-group

### Properties

| Property | Type | Default | Reflected | Description |
|---|---|---|---|---|
| `name` | `string` | `''` | no | Group name, passed to children |
| `label` | `string` | `''` | no | Group label rendered above |
| `disabled` | `boolean` | `false` | yes | Disables all children |
| `value` | `string` | `''` | no | Currently selected value |

### Rendering

Optional label, then a `<slot>` for `<tui-radio>` children. Vertical flex layout with gap. `role="radiogroup"`.

### Behavior

- Discovers children via `slotchange` event on the default slot
- Listens for `tui-change` events from children
- On selection: unchecks all siblings, checks the selected radio
- Updates `value` to the selected radio's value
- Re-emits `tui-change` with `detail: { value: string, name: string }`
- Arrow key navigation: Up/Left = previous, Down/Right = next (wraps)
- Propagates `disabled` and `name` to children on connect and `slotchange`

### Push Protocol

`handleEvent(event)` accepts:
- `{ value: string, disabled }` — sets selection, propagates to children
- `type: 'clear'` — deselects all children

## Integration

### Library Entry Point

Add to `src/index.js` under a new **Form** section:
- `tui-input`
- `tui-checkbox`
- `tui-radio`
- `tui-checkbox-group`
- `tui-radio-group`

### Usage Examples

```html
<!-- Standalone input -->
<tui-input label="Username" placeholder="enter name..." name="username"></tui-input>

<!-- Checkbox group in a panel -->
<tui-panel heading="Settings">
  <tui-checkbox-group name="options" label="Preferences">
    <tui-checkbox value="notifications" label="Enable notifications" checked></tui-checkbox>
    <tui-checkbox value="autosave" label="Auto-save"></tui-checkbox>
    <tui-checkbox value="darkmode" label="Dark mode" checked></tui-checkbox>
  </tui-checkbox-group>
</tui-panel>

<!-- Radio group -->
<tui-radio-group name="theme" label="Theme" value="terminal">
  <tui-radio value="terminal" label="Terminal"></tui-radio>
  <tui-radio value="cyberpunk" label="Cyberpunk"></tui-radio>
  <tui-radio value="amber" label="Amber"></tui-radio>
</tui-radio-group>
```

### Push Protocol Usage

```bash
# Set input value
curl -X POST http://localhost:3001/push \
  -H "Content-Type: application/json" \
  -d '{"channel":"settings","type":"input","data":{"value":"admin"}}'

# Check a checkbox
curl -X POST http://localhost:3001/push \
  -H "Content-Type: application/json" \
  -d '{"channel":"settings","type":"checkbox","data":{"checked":true}}'

# Set radio group selection
curl -X POST http://localhost:3001/push \
  -H "Content-Type: application/json" \
  -d '{"channel":"settings","type":"radio","data":{"value":"cyberpunk"}}'
```
