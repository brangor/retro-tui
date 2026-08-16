# Events

Every event retro-tui dispatches is prefixed `tui-`. There are no exceptions, and
`tests/event-naming.test.ts` fails if one is introduced. The same test asserts that
the dispatched names and the `@fires` tags are the same set, so this page can be
derived from the source rather than kept in step with it by hand.

All events are `bubbles: true, composed: true`, so they cross shadow boundaries and
reach `document`. That is what makes the prefix load-bearing rather than cosmetic:
before 5.0.0, `tui-panel` dispatched `toggle`, `tui-modal` dispatched `close` and
`tui-link` dispatched `copy` — all three are real DOM events, so a document-level
listener could not tell a retro-tui event from the browser's own.

(For the push-server message format — a different protocol that also calls its
payloads events — see `event-protocol.md`.)

## The naming rule

**`tui-<subject>-<verb>`.** The subject names the emitting component, the verb names
what happened. Read that rule in reverse and you can derive a name instead of looking
it up: `tui-panel` collapsing fires `tui-panel-toggle`; `tui-modal` closing fires
`tui-modal-close`.

The subject is the tag minus its `tui-` prefix. Exactly two names depart from that:

| Emitting element | Subject | Why |
|---|---|---|
| `tui-action-list` | `list-item` | The verb acts on an item, not on the list |
| `tui-toolbar` | `tool` | Matches `tui-tool` — see [shared protocols](#shared-protocols) |

Every other name is mechanical: `tui-workspace` fires `tui-workspace-bounds-change`,
`tui-menu-action` fires `tui-menu-action-select`.

## Component events

| Event | Fired by | `detail` | Fired when |
|---|---|---|---|
| `tui-change` | `tui-input` | `{ value, name }` | Value is committed (native `change`) |
| `tui-change` | `tui-checkbox` | `{ checked, value, name }` | Checked state toggles |
| `tui-change` | `tui-radio` | `{ checked, value, name }` | This radio becomes selected (`checked` is always `true`) |
| `tui-change` | `tui-checkbox-group` | `{ value: string[], name }` | Any child checkbox changes |
| `tui-change` | `tui-radio-group` | `{ value, name }` | Selection changes, by click or arrow key |
| `tui-input` | `tui-input` | `{ value, name }` | Every keystroke |
| `tui-panel-toggle` | `tui-panel` | `{ collapsed }` | Panel collapses or expands |
| `tui-panel-focus-request` | `tui-panel` | `{ panel }` — the element itself | Panel is clicked and wants to be raised |
| `tui-panel-dismiss` | `tui-panel` | `{ panelId }` | Panel is dismissed. **Cancelable** — see below |
| `tui-panel-minimize` | `tui-panel` | `{ panelId }` | Panel minimises to an edge tab |
| `tui-panel-restore` | `tui-panel` | `{ panelId }` | Panel restores from minimised |
| `tui-panel-move` | `tui-panel` | `{ panelId, x, y, cursorY }` | Each pointer move during a drag |
| `tui-panel-drag-end` | `tui-panel` | `{ panelId, x, y }` | Drag finishes |
| `tui-panel-resize` | `tui-panel` | `{ panelId, width, height }` | Each pointer move during a resize |
| `tui-workspace-bounds-change` | `tui-workspace` | `{ bounds }` — a `DOMRect` | Workspace is resized (`ResizeObserver`) |
| `tui-workspace-layout-change` | `tui-workspace` | `{ panels, bounds }` | Floating panel layout settles |
| `tui-modal-open` | `tui-modal` | none | `show()` is called |
| `tui-modal-close` | `tui-modal` | none | `close()` is called |
| `tui-console-command` | `tui-console` | `{ command }` | A command line is submitted |
| `tui-menu-action-select` | `tui-menu-action` | `{ label }` | The action is activated |
| `tui-tool-select` | `tui-toolbar`, `tui-tool` | `{ tool }` — the tool id | A tool is chosen |
| `tui-list-item-select` | `tui-action-list` | `{ id, label }` | An item is clicked open |
| `tui-list-item-deselect` | `tui-action-list` | `{ id, label }` | The open item is clicked shut |
| `tui-card-click` | `tui-card` | `{ rank, suit }` | Card is clicked and not `disabled` |
| `tui-link-copy` | `tui-link` | `{ value }` — the `href` | A `type="copy"` link copies to the clipboard |
| `tui-palette-change` | `tui-palette` | `{ palette, firstChar }` | A palette tab is clicked |
| `tui-palette-char-select` | `tui-palette` | `{ char }` | A character is clicked |

`panelId` is the panel's `id`, falling back to its `title` when no `id` is set.

`panels` in `tui-workspace-layout-change` is
`Array<{ id, x, y, width, height }>`, one entry per floating panel.

### Cancelable events

`tui-panel-dismiss` is the only cancelable event. Calling `preventDefault()` keeps
the panel visible, which is the hook for a confirmation step:

```js
panel.addEventListener('tui-panel-dismiss', (e) => {
  if (hasUnsavedWork) e.preventDefault();
});
```

Every other event is informational; `preventDefault()` on one does nothing.

## Shared protocols

Two names are emitted by more than one element. Both are deliberate: several
components emit one name so a container can listen once instead of per child.

### Form values — `tui-change`, `tui-input`

All five form components (`tui-input`, `tui-checkbox`, `tui-radio`,
`tui-checkbox-group`, `tui-radio-group`) share these two names. The `detail` varies
by component (see the table above), but `name` and `value` are always present where
they are meaningful, so one listener can serve a whole form:

```js
form.addEventListener('tui-change', (e) => {
  console.log(e.detail.name, e.detail.value);
});
```

Both groups call `stopPropagation()` on the child's event and re-emit their own, so a
listener above a `tui-checkbox-group` or `tui-radio-group` sees exactly one
`tui-change` per interaction, carrying the group's value — never the child's as well.

### `tui-tool-select`

`tui-toolbar` and `tui-tool` both emit this, with the same `{ tool }` payload. That
is not a rule violation: `tui-toolbar` can be authored two ways — data-driven, by
passing a `tools` array, or by slotting `<tui-tool>` children — and a consumer should
not have to know which was used. `src/components/tui-toolbar.ts` defines both
elements for that reason. The name is correctly qualified for `tui-tool`; the toolbar
adopts it so the listener is the same either way.

## Migration from 4.x

Every name below changed in 5.0.0. Renaming your listeners is the whole migration,
**except** for the four payload changes flagged underneath — one of which
(`tui-console-command`) breaks silently.

| 4.x | 5.0.0 |
|---|---|
| `toggle` | `tui-panel-toggle` |
| `focus-request` | `tui-panel-focus-request` |
| `panel-dismiss` | `tui-panel-dismiss` |
| `panel-minimize` | `tui-panel-minimize` |
| `panel-restore` | `tui-panel-restore` |
| `panel-move` | `tui-panel-move` |
| `panel-drag-end` | `tui-panel-drag-end` |
| `panel-resize` | `tui-panel-resize` |
| `bounds-change` | `tui-workspace-bounds-change` |
| `layout-change` | `tui-workspace-layout-change` |
| `open` | `tui-modal-open` |
| `close` | `tui-modal-close` |
| `command` | `tui-console-command` |
| `action` | `tui-menu-action-select` |
| `copy` | `tui-link-copy` |
| `card-click` | `tui-card-click` |
| `tool-select` | `tui-tool-select` |
| `item-select` | `tui-list-item-select` |
| `item-deselect` | `tui-list-item-deselect` |
| `palette-change` | `tui-palette-change` |
| `char-select` | `tui-palette-char-select` |
| `tui-change`, `tui-input` | unchanged — already prefixed in 4.x |

### Payload changes

Four payloads changed as well. A consumer who renames listeners without touching
`e.detail` will break silently on the first of these.

| Event | 4.x `detail` | 5.0.0 `detail` |
|---|---|---|
| `tui-console-command` | the command string itself | `{ command }` |
| `tui-list-item-deselect` | none | `{ id, label }`, matching `tui-list-item-select` |
| `tui-menu-action-select` | none | `{ label }` |
| `tui-change` / `tui-input` from `tui-input` | `{ value }` | `{ value, name }` |

The last three are additive — a 4.x handler reading nothing off the added key keeps
working. The first two remove a reach into `e.target` to learn what happened; the
`tui-input` one closes a gap that made the documented form pattern misbehave, since
it was the only one of the five form components omitting `name`.

```js
// 4.x
console.addEventListener('command', (e) => run(e.detail));
// 5.0.0
console.addEventListener('tui-console-command', (e) => run(e.detail.command));
```

`e.detail.command` on the 4.x event returned `undefined`, which is why the shape was
corrected rather than kept.
