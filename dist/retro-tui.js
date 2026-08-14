import { css as h, LitElement as u, html as l, unsafeCSS as y, nothing as ze } from "lit";
const ot = '.theme-terminal-classic,:root{--color-primary: #00ffff;--color-primary-bg: #002b36;--color-primary-fg: #00ffff;--color-secondary: #00ff00;--color-secondary-bg: #003300;--color-secondary-fg: #00ff00;--color-error: #ff5555;--color-error-bg: #330000;--color-error-fg: #ff5555;--color-warning: #e8691e;--color-warning-bg: #331500;--color-warning-fg: #e8691e;--color-success: #50fa7b;--color-success-bg: #003300;--color-success-fg: #50fa7b;--color-info: #8be9fd;--color-info-bg: #002233;--color-info-fg: #8be9fd;--surface-base: #0a0a0a;--surface-elevated: #1a1a1a;--surface-overlay: #2a2a2a;--text-primary: #e0e0e0;--text-muted: #666666;--border-default: #333333;--border-width: 1px;--border-radius: 0px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}.theme-vibrant-scifi{--color-primary: #ff00ff;--color-primary-bg: #ff00ff;--color-primary-fg: #000000;--color-secondary: #00ffcc;--color-secondary-bg: #00ffcc;--color-secondary-fg: #000000;--color-error: #ff3366;--color-error-bg: #ff3366;--color-error-fg: #ffffff;--color-warning: #ff6622;--color-warning-bg: #ff6622;--color-warning-fg: #000000;--color-success: #00ff66;--color-success-bg: #00ff66;--color-success-fg: #000000;--color-info: #6666ff;--color-info-bg: #6666ff;--color-info-fg: #ffffff;--surface-base: #0d0d1a;--surface-elevated: #1a1a2e;--surface-overlay: #2a2a4a;--text-primary: #ffffff;--text-muted: #8888aa;--border-default: #4a4a6a;--border-width: 2px;--border-radius: 2px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}html,body{background:var(--surface-base);color:var(--text-primary);font-family:var(--font-mono);color-scheme:dark}.theme-home-security-interface{--color-primary: #3fb950;--color-primary-bg: #002b36;--color-primary-fg: #3fb950;--color-secondary: #00ff00;--color-secondary-bg: #003300;--color-secondary-fg: #00ff00;--color-error: #ff5555;--color-error-bg: #330000;--color-error-fg: #ff5555;--color-warning: #e8691e;--color-warning-bg: #331500;--color-warning-fg: #e8691e;--color-success: #3fb950;--color-success-bg: #003300;--color-success-fg: #3fb950;--color-info: #8be9fd;--color-info-bg: #002233;--color-info-fg: #8be9fd;--surface-base: #111;--surface-elevated: #1a1a1a;--surface-overlay: #2a2a2a;--text-primary: #e0e0e0;--text-muted: #666666;--border-default: #3fb950;--border-width: 3px;--border-radius: 0px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}', Fe = "__retro_tui_tokens__";
if (typeof document < "u" && !document[Fe]) {
  const t = document.createElement("style");
  t.textContent = ot, (document.head || document.documentElement).appendChild(t);
  const e = document.documentElement;
  e.style.setProperty("color", "var(--text-primary)"), e.style.setProperty("background", "var(--surface-base)"), e.style.setProperty("font-family", "var(--font-mono)"), e.style.setProperty("color-scheme", "dark"), document[Fe] = !0;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const f = (t) => (e, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ee = globalThis, Le = Ee.ShadowRoot && (Ee.ShadyCSS === void 0 || Ee.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rt = Symbol(), Ve = /* @__PURE__ */ new WeakMap();
let st = class {
  constructor(e, r, s) {
    if (this._$cssResult$ = !0, s !== rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (Le && e === void 0) {
      const s = r !== void 0 && r.length === 1;
      s && (e = Ve.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Ve.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const it = (t) => new st(typeof t == "string" ? t : t + "", void 0, rt), at = (t, e) => {
  if (Le) t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of e) {
    const s = document.createElement("style"), o = Ee.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = r.cssText, t.appendChild(s);
  }
}, Ke = Le ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const s of e.cssRules) r += s.cssText;
  return it(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: nt, defineProperty: lt, getOwnPropertyDescriptor: ct, getOwnPropertyNames: dt, getOwnPropertySymbols: pt, getPrototypeOf: ht } = Object, T = globalThis, Ge = T.trustedTypes, ut = Ge ? Ge.emptyScript : "", je = T.reactiveElementPolyfillSupport, de = (t, e) => t, Se = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ut : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let r = t;
  switch (e) {
    case Boolean:
      r = t !== null;
      break;
    case Number:
      r = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(t);
      } catch {
        r = null;
      }
  }
  return r;
} }, Be = (t, e) => !nt(t, e), Ze = { attribute: !0, type: String, converter: Se, reflect: !1, useDefault: !1, hasChanged: Be };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), T.litPropertyMetadata ?? (T.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class ce extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, r = Ze) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(e, r), !r.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, r);
      o !== void 0 && lt(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, r, s) {
    const { get: o, set: i } = ct(this.prototype, e) ?? { get() {
      return this[r];
    }, set(a) {
      this[r] = a;
    } };
    return { get: o, set(a) {
      const c = o == null ? void 0 : o.call(this);
      i == null || i.call(this, a), this.requestUpdate(e, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ze;
  }
  static _$Ei() {
    if (this.hasOwnProperty(de("elementProperties"))) return;
    const e = ht(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(de("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(de("properties"))) {
      const r = this.properties, s = [...dt(r), ...pt(r)];
      for (const o of s) this.createProperty(o, r[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const r = litPropertyMetadata.get(e);
      if (r !== void 0) for (const [s, o] of r) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, s] of this.elementProperties) {
      const o = this._$Eu(r, s);
      o !== void 0 && this._$Eh.set(o, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const o of s) r.unshift(Ke(o));
    } else e !== void 0 && r.push(Ke(e));
    return r;
  }
  static _$Eu(e, r) {
    const s = r.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((r) => r(this));
  }
  addController(e) {
    var r;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((r = e.hostConnected) == null || r.call(e));
  }
  removeController(e) {
    var r;
    (r = this._$EO) == null || r.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const s of r.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return at(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((r) => {
      var s;
      return (s = r.hostConnected) == null ? void 0 : s.call(r);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((r) => {
      var s;
      return (s = r.hostDisconnected) == null ? void 0 : s.call(r);
    });
  }
  attributeChangedCallback(e, r, s) {
    this._$AK(e, s);
  }
  _$ET(e, r) {
    var i;
    const s = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, s);
    if (o !== void 0 && s.reflect === !0) {
      const a = (((i = s.converter) == null ? void 0 : i.toAttribute) !== void 0 ? s.converter : Se).toAttribute(r, s.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, r) {
    var i, a;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const c = s.getPropertyOptions(o), d = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((i = c.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? c.converter : Se;
      this._$Em = o;
      const p = d.fromAttribute(r, c.type);
      this[o] = p ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(e, r, s, o = !1, i) {
    var a;
    if (e !== void 0) {
      const c = this.constructor;
      if (o === !1 && (i = this[e]), s ?? (s = c.getPropertyOptions(e)), !((s.hasChanged ?? Be)(i, r) || s.useDefault && s.reflect && i === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(c._$Eu(e, s)))) return;
      this.C(e, r, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, r, { useDefault: s, reflect: o, wrapped: i }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? r ?? this[e]), i !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (r = void 0), this._$AL.set(e, r)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [i, a] of this._$Ep) this[i] = a;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [i, a] of o) {
        const { wrapped: c } = a, d = this[i];
        c !== !0 || this._$AL.has(i) || d === void 0 || this.C(i, void 0, a, d);
      }
    }
    let e = !1;
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), (s = this._$EO) == null || s.forEach((o) => {
        var i;
        return (i = o.hostUpdate) == null ? void 0 : i.call(o);
      }), this.update(r)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(r);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var r;
    (r = this._$EO) == null || r.forEach((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((r) => this._$ET(r, this[r]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
ce.elementStyles = [], ce.shadowRootOptions = { mode: "open" }, ce[de("elementProperties")] = /* @__PURE__ */ new Map(), ce[de("finalized")] = /* @__PURE__ */ new Map(), je == null || je({ ReactiveElement: ce }), (T.reactiveElementVersions ?? (T.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = { attribute: !0, type: String, converter: Se, reflect: !1, hasChanged: Be }, bt = (t = ft, e, r) => {
  const { kind: s, metadata: o } = r;
  let i = globalThis.litPropertyMetadata.get(o);
  if (i === void 0 && globalThis.litPropertyMetadata.set(o, i = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), i.set(r.name, t), s === "accessor") {
    const { name: a } = r;
    return { set(c) {
      const d = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(a, d, t, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, t, c), c;
    } };
  }
  if (s === "setter") {
    const { name: a } = r;
    return function(c) {
      const d = this[a];
      e.call(this, c), this.requestUpdate(a, d, t, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function n(t) {
  return (e, r) => typeof r == "object" ? bt(t, e, r) : ((s, o, i) => {
    const a = o.hasOwnProperty(i);
    return o.constructor.createProperty(i, s), a ? Object.getOwnPropertyDescriptor(o, i) : void 0;
  })(t, e, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _(t) {
  return n({ ...t, state: !0, attribute: !1 });
}
const b = h`
  :host {
    display: block;
    font-family: var(--font-mono, 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace);
    font-size: var(--font-size-body, 0.85rem);
  }

  /* ANSI color classes */
  .ansi-black { color: #484848; }
  .ansi-red { color: var(--color-error); }
  .ansi-green { color: var(--color-secondary); }
  .ansi-yellow { color: var(--color-secondary); }
  .ansi-blue { color: var(--color-primary); }
  .ansi-magenta { color: var(--color-primary); }
  .ansi-cyan { color: #56d4dd; }
  .ansi-white { color: var(--text-primary); }
  .ansi-bold { font-weight: bold; }
  .ansi-dim { opacity: 0.7; }
  .ansi-italic { font-style: italic; }
  .ansi-underline { text-decoration: underline; }
  .ansi-reverse {
    background: var(--text-primary);
    color: var(--surface-base);
  }
  .ansi-strikethrough { text-decoration: line-through; }
  .ansi-hidden { visibility: hidden; }

  /* Background colors */
  .ansi-bg-black { background-color: #484848; }
  .ansi-bg-red { background-color: var(--color-error); }
  .ansi-bg-green { background-color: var(--color-secondary); }
  .ansi-bg-yellow { background-color: #d29922; }
  .ansi-bg-blue { background-color: var(--color-primary); }
  .ansi-bg-magenta { background-color: #bc8cff; }
  .ansi-bg-cyan { background-color: #56d4dd; }
  .ansi-bg-white { background-color: var(--text-primary); }

  /* ═══ Text Attribute Utilities ═══
     Declarative terminal text styling.
     Usage: class="tui-bold tui-reverse"
     Maps 1:1 to ncurses A_* attributes. */
  .tui-bold { font-weight: bold; }
  .tui-dim { opacity: 0.6; }
  .tui-italic { font-style: italic; }
  .tui-underline { text-decoration: underline; }
  .tui-reverse {
    background: var(--text-primary);
    color: var(--surface-base);
  }
  .tui-strikethrough { text-decoration: line-through; }
  .tui-blink {
    animation: tui-blink 1s step-end infinite;
  }

  @keyframes tui-blink {
    50% { opacity: 0; }
  }
`;
var mt = Object.defineProperty, vt = Object.getOwnPropertyDescriptor, q = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? vt(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && mt(e, r, o), o;
};
let E = class extends u {
  constructor() {
    super(...arguments), this.title = "TUI", this.subtitle = "", this.compact = !1, this.decorations = "full", this._focusContext = "workspace", this._menuOpen = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("mousedown", () => this.classList.add("using-mouse")), this.addEventListener("keydown", (t) => {
      t.key === "Tab" && this.classList.remove("using-mouse"), this._handleGlobalKeydown(t);
    });
  }
  _handleGlobalKeydown(t) {
    if (t.key === "Escape") {
      this._menuOpen && (this._menuOpen = !1, t.preventDefault());
      return;
    }
    t.key === "Tab" && !t.ctrlKey && t.altKey;
  }
  render() {
    const t = this.subtitle ? l`░░ ${this.title} <span>[ ${this.subtitle} ]</span> ░░` : l`░░ ${this.title} ░░`;
    return l`
      <header class="header">
        <div class="header__top">
          <h1 class="header__title">
            <slot name="header">${t}</slot>
          </h1>
          <div class="header__right">
            <slot name="header-right"></slot>
          </div>
        </div>
        <nav class="header__menu">
          <slot name="menu"></slot>
        </nav>
      </header>

      <div class="container">
        <div class="workspace-area" data-focus-context="workspace">
          <slot name="main"></slot>
        </div>
      </div>

      <footer class="status-bar">
        <slot name="status"></slot>
      </footer>
    `;
  }
};
E.styles = [
  b,
  h`
      :host {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
        background: var(--surface-base);
        color: var(--text-primary);
      }

      /* ═══════════════════════════════════════════════════════════════════
         HEADER - Unified terminal aesthetic
         ═══════════════════════════════════════════════════════════════════ */
      
      .header {
        border: var(--border-width) solid var(--color-primary);
        border-top: none;
        padding: var(--spacing-sm) var(--spacing-md);
        position: relative;
        flex-shrink: 0;
        margin: 0 var(--spacing-md);
        background: var(--surface-base);
      }

      /* Box-draw corner decorations */
      :host::before {
        content: '╔';
        position: absolute;
        top: -1px;
        left: -1px;
        color: var(--color-primary);
        line-height: 1;
      }

      :host::after {
        content: '╗';
        position: absolute;
        top: -1px;
        right: -1px;
        color: var(--color-primary);
        line-height: 1;
      }

      .header__top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-md);
      }

      .header__title {
        color: var(--color-primary);
        font-size: var(--spacing-md);
        font-weight: normal;
        margin: 0;
      }

      .header__title span {
        color: var(--color-secondary);
      }

      .header__right {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
      }

      .header__menu {
        display: flex;
        gap: var(--spacing-xs);
      }

      /* ═══════════════════════════════════════════════════════════════════
         MAIN CONTAINER
         ═══════════════════════════════════════════════════════════════════ */

      .container {
        display: flex;
        flex: 1;
        padding: 0.75rem var(--spacing-md);
        min-height: 0;
        gap: 0;
      }

      /* Workspace slot - grows to fill all available space */
      .workspace-area {
        flex: 1;
        min-width: 0;
        min-height: 0;
        display: flex;
      }

      .workspace-area ::slotted(*) {
        flex: 1;
        min-height: 0;
        min-width: 0;
        width: 100%;
      }

      /* ═══════════════════════════════════════════════════════════════════
         STATUS BAR - Unified terminal aesthetic
         ═══════════════════════════════════════════════════════════════════ */

      .status-bar {
        background: var(--surface-elevated);
        border: var(--border-width) solid var(--color-primary);
        border-bottom: none;
        padding: 0;
        display: flex;
        align-items: stretch;
        font-size: 0.8rem;
        flex-shrink: 0;
        margin: 0 var(--spacing-md);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .status-bar:empty {
        display: none;
      }

      /* Box-draw corner decorations */
      .status-bar::before {
        content: '╚';
        position: absolute;
        bottom: -1px;
        left: -1px;
        color: var(--color-primary);
        line-height: 1;
      }

      .status-bar::after {
        content: '╝';
        position: absolute;
        bottom: -1px;
        right: -1px;
        color: var(--color-primary);
        line-height: 1;
      }

      .status-wrapper {
        position: relative;
        margin: 0 var(--spacing-md);
      }

      /* ═══════════════════════════════════════════════════════════════════
         FOCUS CONTEXT INDICATORS
         ═══════════════════════════════════════════════════════════════════ */

      .workspace-area:focus-within {
        outline: 1px dashed var(--color-primary);
        outline-offset: 2px;
      }

      /* Hide focus outline when using mouse */
      :host(.using-mouse) .workspace-area:focus-within {
        outline: none;
      }

      /* ═══════════════════════════════════════════════════════════════════
         COMPACT MODE - Minimal header height
         ═══════════════════════════════════════════════════════════════════ */

      :host([compact]) .header {
        padding: var(--spacing-xs) var(--spacing-md);
      }

      :host([compact]) .header__title {
        font-size: 0.9rem;
      }

      :host([compact]) .container {
        padding-top: var(--spacing-xs);
      }

      /* ═══════════════════════════════════════════════════════════════════
         DECORATION CONTROL
         ═══════════════════════════════════════════════════════════════════ */

      /* Decoration control — header corners (on :host) */
      :host([decorations="none"])::before,
      :host([decorations="none"])::after,
      :host([decorations="status"])::before,
      :host([decorations="status"])::after {
        content: none;
      }

      /* Decoration control — status bar corners */
      :host([decorations="none"]) .status-bar::before,
      :host([decorations="none"]) .status-bar::after,
      :host([decorations="header"]) .status-bar::before,
      :host([decorations="header"]) .status-bar::after {
        content: none;
      }
    `
];
q([
  n({ type: String, reflect: !0 })
], E.prototype, "title", 2);
q([
  n({ type: String, reflect: !0 })
], E.prototype, "subtitle", 2);
q([
  n({ type: Boolean, reflect: !0 })
], E.prototype, "compact", 2);
q([
  n({ type: String, reflect: !0 })
], E.prototype, "decorations", 2);
q([
  _()
], E.prototype, "_focusContext", 2);
q([
  _()
], E.prototype, "_menuOpen", 2);
E = q([
  f("tui-app")
], E);
var gt = Object.defineProperty, yt = Object.getOwnPropertyDescriptor, We = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? yt(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && gt(e, r, o), o;
};
let z = class extends u {
  constructor() {
    super(...arguments), this._bounds = new DOMRect(), this._snapPreview = null, this._resizeObserver = null, this._handlePanelMove = (t) => {
      const e = t.target;
      if (!e.hasAttribute("floating")) return;
      const { x: r, y: s } = t.detail, o = e.panelWidth ?? e.offsetWidth ?? 100, i = e.panelHeight ?? e.offsetHeight ?? 100, a = this._detectSnapEdge(r, s, o, i);
      if (this._snapPreview = a, this._bounds.width > 0 && this._bounds.height > 0) {
        const c = this._bounds.width - o, d = this._bounds.height - i;
        if (c > 0 && d > 0) {
          const p = Math.max(0, Math.min(r, c)), m = Math.max(0, Math.min(s, d));
          (p !== r || m !== s) && (e.positionX = p, e.positionY = m);
        }
      }
    }, this._handlePanelDragEnd = (t) => {
      const e = t.target;
      if (e) {
        if (this._snapPreview) {
          const r = this._snapPreview, s = e.panelWidth ?? e.offsetWidth ?? 100;
          switch (e.panelHeight ?? e.offsetHeight, r) {
            case "left":
              e.positionX = 0;
              break;
            case "right":
              e.positionX = this._bounds.width - s;
              break;
            case "top":
              e.positionY = 0;
              break;
          }
          e.snapEdge = r;
        } else
          e.snapEdge = "";
        this._snapPreview = null, this._emitLayoutChange();
      }
    }, this._handlePanelResize = (t) => {
      const e = t.target;
      if (!e.hasAttribute("resizable")) return;
      const { width: r, height: s } = t.detail, o = e.positionX ?? 0, i = e.positionY ?? 0, a = this._bounds.width - o, c = this._bounds.height - i, d = Math.min(r, a), p = Math.min(s, c);
      d !== r && (e.panelWidth = d), p !== s && (e.panelHeight = p), this._emitLayoutChange();
    }, this._handlePanelDismiss = (t) => {
      this._emitLayoutChange();
    }, this._handlePanelMinimize = (t) => {
      requestAnimationFrame(() => {
        this._reflowMinimizedTabs();
      });
    }, this._handlePanelRestore = (t) => {
      requestAnimationFrame(() => {
        this._reflowMinimizedTabs();
      });
    };
  }
  get bounds() {
    return this._bounds;
  }
  /**
   * Get state of all floating panels in the workspace
   */
  getPanelStates() {
    const t = [], e = this._getFloatingPanels();
    for (const r of e)
      t.push({
        id: r.id || r.title,
        title: r.title || r.id,
        snapEdge: r.snapEdge || void 0,
        x: r.positionX ?? 0,
        y: r.positionY ?? 0,
        width: r.panelWidth ?? r.offsetWidth,
        height: r.panelHeight ?? r.offsetHeight,
        collapsed: r.collapsed ?? !1,
        visible: !r.hidden
      });
    return t;
  }
  connectedCallback() {
    super.connectedCallback(), typeof ResizeObserver < "u" ? (this._resizeObserver = new ResizeObserver((t) => {
      for (const e of t)
        this._bounds = e.contentRect, this.dispatchEvent(new CustomEvent("bounds-change", {
          detail: { bounds: this._bounds },
          bubbles: !0,
          composed: !0
        }));
    }), this._resizeObserver.observe(this)) : this._bounds = new DOMRect(0, 0, this.offsetWidth || 800, this.offsetHeight || 600), this.addEventListener("panel-move", this._handlePanelMove), this.addEventListener("panel-resize", this._handlePanelResize), this.addEventListener("panel-dismiss", this._handlePanelDismiss), this.addEventListener("panel-drag-end", this._handlePanelDragEnd), this.addEventListener("panel-minimize", this._handlePanelMinimize), this.addEventListener("panel-restore", this._handlePanelRestore);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._resizeObserver) == null || t.disconnect(), this.removeEventListener("panel-move", this._handlePanelMove), this.removeEventListener("panel-resize", this._handlePanelResize), this.removeEventListener("panel-dismiss", this._handlePanelDismiss), this.removeEventListener("panel-drag-end", this._handlePanelDragEnd), this.removeEventListener("panel-minimize", this._handlePanelMinimize), this.removeEventListener("panel-restore", this._handlePanelRestore);
  }
  _detectSnapEdge(t, e, r, s) {
    const o = this._bounds;
    return t <= z.SNAP_ZONE ? "left" : t + r >= o.width - z.SNAP_ZONE ? "right" : e <= z.SNAP_ZONE ? "top" : null;
  }
  /**
   * Stack minimized tabs vertically on each edge
   */
  _reflowMinimizedTabs() {
    const t = this._getFloatingPanels(), e = 4, r = [], s = [];
    for (const i of t) {
      if (!i.minimized) continue;
      (i.snapEdge || "left") === "right" ? s.push(i) : r.push(i);
    }
    let o = e;
    for (const i of r) {
      i.positionY = o;
      const a = i.offsetHeight || 80;
      o += a + e;
    }
    o = e;
    for (const i of s) {
      i.positionY = o;
      const a = i.offsetHeight || 80;
      o += a + e;
    }
  }
  _emitLayoutChange() {
    const e = this._getFloatingPanels().map((r) => ({
      id: r.id || r.title,
      x: r.positionX,
      y: r.positionY,
      width: r.panelWidth ?? r.offsetWidth,
      height: r.panelHeight ?? r.offsetHeight
    }));
    this.dispatchEvent(new CustomEvent("layout-change", {
      detail: { panels: e, bounds: this._bounds },
      bubbles: !0,
      composed: !0
    }));
  }
  _getFloatingPanels() {
    var e;
    const t = (e = this.shadowRoot) == null ? void 0 : e.querySelector('slot[name="floating"]');
    return t ? t.assignedElements() : [];
  }
  _constrainAllPanels() {
    if (this._bounds.width <= 0 || this._bounds.height <= 0) return;
    const t = this._getFloatingPanels();
    for (const e of t) {
      if (!e.hasAttribute("floating")) continue;
      const r = e.positionX ?? 0, s = e.positionY ?? 0, o = e.panelWidth ?? e.offsetWidth ?? 100, i = e.panelHeight ?? e.offsetHeight ?? 100, a = this._bounds.width - o, c = this._bounds.height - i;
      if (a < 0 || c < 0) continue;
      const d = Math.max(0, Math.min(r, a)), p = Math.max(0, Math.min(s, c));
      d !== r && (e.positionX = d), p !== s && (e.positionY = p);
    }
  }
  _onFloatingSlotChange() {
    requestAnimationFrame(() => {
      this._constrainAllPanels(), this._reflowMinimizedTabs();
    });
  }
  render() {
    return l`
      <div class="workspace">
        <div class="main-area">
          <slot name="main"></slot>
        </div>
        <div class="floating-layer">
          <slot name="floating" @slotchange=${this._onFloatingSlotChange}></slot>
        </div>
        ${this._snapPreview ? l`
          <div class="snap-preview ${this._snapPreview}"></div>
        ` : ""}
      </div>
    `;
  }
};
z.SNAP_ZONE = 20;
z.styles = [
  b,
  h`
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .workspace {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .main-area {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Floating layer covers entire workspace */
      .floating-layer {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 100;
      }

      .floating-layer ::slotted(*) {
        pointer-events: auto;
      }

      /* Snap preview overlay */
      .snap-preview {
        position: absolute;
        background: var(--color-info, #8be9fd);
        opacity: 0.15;
        pointer-events: none;
        z-index: 99;
        transition: opacity 0.1s;
      }

      .snap-preview.left {
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
      }

      .snap-preview.right {
        right: 0;
        top: 0;
        bottom: 0;
        width: 4px;
      }

      .snap-preview.top {
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
      }
    `
];
We([
  _()
], z.prototype, "_bounds", 2);
We([
  _()
], z.prototype, "_snapPreview", 2);
z = We([
  f("tui-workspace")
], z);
var _t = Object.defineProperty, xt = Object.getOwnPropertyDescriptor, De = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? xt(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && _t(e, r, o), o;
};
let G = class extends u {
  constructor() {
    super(...arguments), this.side = "left", this.size = 200, this._dropIndex = null;
  }
  /**
   * Get all panel elements in this sidebar
   */
  _getPanels() {
    var e;
    const t = (e = this.shadowRoot) == null ? void 0 : e.querySelector("slot");
    return t ? t.assignedElements().filter((r) => r.tagName.toLowerCase() === "tui-panel") : [];
  }
  /**
   * Calculate drop index based on cursor Y position
   */
  calculateDropIndex(t) {
    const e = this._getPanels();
    for (let r = 0; r < e.length; r++) {
      const s = e[r].getBoundingClientRect(), o = s.top + s.height / 2;
      if (t < o)
        return r;
    }
    return e.length;
  }
  /**
   * Show drop indicator at specified index
   */
  showDropIndicator(t) {
    this._dropIndex = t;
  }
  /**
   * Hide drop indicator
   */
  hideDropIndicator() {
    this._dropIndex = null;
  }
  /**
   * Insert panel at specified index in the sidebar
   */
  insertPanelAt(t, e) {
    const s = this._getPanels().indexOf(t);
    let o = e;
    s !== -1 && s < e && (o = e - 1), s !== -1 && t.remove();
    const i = this._getPanels();
    t.setAttribute("docked", this.side), o >= i.length ? this.appendChild(t) : this.insertBefore(t, i[o]), this.hideDropIndicator();
  }
  /**
   * Get the top position for the drop indicator
   */
  _getDropIndicatorTop() {
    var s, o, i, a;
    const t = this._getPanels();
    if (this._dropIndex === null || this._dropIndex === 0)
      return 0;
    if (this._dropIndex >= t.length) {
      const c = t[t.length - 1];
      if (c) {
        const d = (o = (s = this.shadowRoot) == null ? void 0 : s.querySelector(".content")) == null ? void 0 : o.getBoundingClientRect(), p = c.getBoundingClientRect();
        if (d)
          return p.bottom - d.top;
      }
      return 0;
    }
    const e = t[this._dropIndex], r = (a = (i = this.shadowRoot) == null ? void 0 : i.querySelector(".content")) == null ? void 0 : a.getBoundingClientRect();
    return e && r ? e.getBoundingClientRect().top - r.top - 2 : 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.side === "left" || this.side === "right" ? this.style.width = `${this.size}px` : this.style.height = `${this.size}px`;
  }
  updated(t) {
    t.has("size") && (this.side === "left" || this.side === "right" ? this.style.width = `${this.size}px` : this.style.height = `${this.size}px`);
  }
  render() {
    return l`
      <div class="content">
        <slot></slot>
        ${this._dropIndex !== null ? l`
          <div class="drop-indicator" style="top: ${this._getDropIndicatorTop()}px"></div>
        ` : ""}
      </div>
    `;
  }
};
G.styles = [
  b,
  h`
      :host {
        display: block;
        position: relative;
        box-sizing: border-box;
      }

      /* Orientation based on side */
      :host([side="left"]),
      :host([side="right"]) {
        height: 100%;
      }

      :host([side="top"]),
      :host([side="bottom"]) {
        width: 100%;
      }

      .content {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: auto;
        gap: 1px;
        min-height: 0;
        position: relative;
      }

      :host([side="top"]) .content,
      :host([side="bottom"]) .content {
        flex-direction: row;
      }

      .drop-indicator {
        position: absolute;
        left: 4px;
        right: 4px;
        height: 3px;
        background: var(--color-primary, #bd93f9);
        border-radius: 2px;
        pointer-events: none;
        z-index: 10;
      }
    `
];
De([
  n({ type: String, reflect: !0 })
], G.prototype, "side", 2);
De([
  n({ type: Number })
], G.prototype, "size", 2);
De([
  _()
], G.prototype, "_dropIndex", 2);
G = De([
  f("tui-sidebar")
], G);
const Te = {
  single: { tl: "┌", tr: "┐", bl: "└", br: "┘", h: "─", v: "│" },
  heavy: { tl: "┏", tr: "┓", bl: "┗", br: "┛", h: "━", v: "┃" },
  double: { tl: "╔", tr: "╗", bl: "╚", br: "╝", h: "═", v: "║" },
  rounded: { tl: "╭", tr: "╮", bl: "╰", br: "╯", h: "─", v: "│" }
};
function wt(t) {
  return t === "none" ? null : Te[t];
}
function Ce(t) {
  const e = wt(t);
  return e ? {
    before: `${e.tl}${e.h} `,
    after: ` ${e.h}${e.tr}`
  } : { before: "", after: "" };
}
const Sr = {
  neutral: "single",
  hover: "heavy",
  selected: "double"
};
var $t = Object.defineProperty, zt = Object.getOwnPropertyDescriptor, g = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? zt(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && $t(e, r, o), o;
};
let v = class extends u {
  constructor() {
    super(...arguments), this.title = "", this.color = "", this.border = "single", this.variant = "bright", this.selectionStyle = "", this.collapsible = !1, this.collapsed = !1, this.selected = !1, this.active = !1, this.persistId = "", this.dismissable = !1, this.full = !1, this.floating = !1, this.snapEdge = "", this.positionX = 0, this.positionY = 0, this.resizable = !1, this.minimized = !1, this.panelWidth = null, this.panelHeight = null, this.maxWidth = null, this.maxHeight = null, this.minWidth = 150, this.minHeight = 100, this.docked = "", this._isDragging = !1, this._dragStartX = 0, this._dragStartY = 0, this._dragOffsetX = 0, this._dragOffsetY = 0, this._isResizing = !1, this._resizeStartX = 0, this._resizeStartY = 0, this._resizeStartWidth = 0, this._resizeStartHeight = 0, this._preMinimizeX = 0, this._preMinimizeY = 0, this._preMinimizeWidth = null, this._preMinimizeHeight = null, this._handleClick = () => {
      this.dispatchEvent(new CustomEvent("focus-request", {
        bubbles: !0,
        composed: !0,
        detail: { panel: this }
      }));
    }, this._onEdgeTabClick = () => {
      this.restore();
    }, this._onDragStart = (t) => {
      if (!this.floating && !this.docked) return;
      const e = t.target;
      e.closest(".collapse-btn") || e.closest(".dismiss-btn") || (t.preventDefault(), this._isDragging = !0, this._dragStartX = t.clientX, this._dragStartY = t.clientY, this._dragOffsetX = this.positionX, this._dragOffsetY = this.positionY, document.addEventListener("pointermove", this._onDragMove), document.addEventListener("pointerup", this._onDragEnd));
    }, this._onDragMove = (t) => {
      if (!this._isDragging) return;
      const e = t.clientX - this._dragStartX, r = t.clientY - this._dragStartY;
      this.positionX = this._dragOffsetX + e, this.positionY = this._dragOffsetY + r, this.dispatchEvent(new CustomEvent("panel-move", {
        detail: {
          panelId: this.id || this.title,
          x: this.positionX,
          y: this.positionY,
          cursorY: t.clientY
          // For drop index calculation
        },
        bubbles: !0,
        composed: !0
      }));
    }, this._onDragEnd = () => {
      this._isDragging = !1, document.removeEventListener("pointermove", this._onDragMove), document.removeEventListener("pointerup", this._onDragEnd), this.dispatchEvent(new CustomEvent("panel-drag-end", {
        detail: {
          panelId: this.id || this.title,
          x: this.positionX,
          y: this.positionY
        },
        bubbles: !0,
        composed: !0
      }));
    }, this._onResizeStart = (t) => {
      this.resizable && (t.preventDefault(), t.stopPropagation(), this._isResizing = !0, this._resizeStartX = t.clientX, this._resizeStartY = t.clientY, this._resizeStartWidth = this.panelWidth ?? this.offsetWidth, this._resizeStartHeight = this.panelHeight ?? this.offsetHeight, document.addEventListener("pointermove", this._onResizeMove), document.addEventListener("pointerup", this._onResizeEnd));
    }, this._onResizeMove = (t) => {
      if (!this._isResizing) return;
      const e = t.clientX - this._resizeStartX, r = t.clientY - this._resizeStartY;
      let s = this._resizeStartWidth + e, o = this._resizeStartHeight + r;
      s = Math.max(this.minWidth, s), o = Math.max(this.minHeight, o), this.maxWidth !== null && (s = Math.min(this.maxWidth, s)), this.maxHeight !== null && (o = Math.min(this.maxHeight, o)), this.panelWidth = s, this.panelHeight = o, this.dispatchEvent(new CustomEvent("panel-resize", {
        detail: {
          panelId: this.id || this.title,
          width: this.panelWidth,
          height: this.panelHeight
        },
        bubbles: !0,
        composed: !0
      }));
    }, this._onResizeEnd = () => {
      this._isResizing = !1, document.removeEventListener("pointermove", this._onResizeMove), document.removeEventListener("pointerup", this._onResizeEnd);
    }, this._onCollapseClick = (t) => {
      t.stopPropagation(), this.toggle();
    }, this._onDismissClick = (t) => {
      t.stopPropagation(), this.dismiss();
    };
  }
  connectedCallback() {
    if (super.connectedCallback(), this.persistId) {
      const t = localStorage.getItem(`tui-panel-${this.persistId}`);
      t !== null && (this.collapsed = t === "true");
    }
    this.addEventListener("click", this._handleClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", this._handleClick), document.removeEventListener("pointermove", this._onDragMove), document.removeEventListener("pointerup", this._onDragEnd), document.removeEventListener("pointermove", this._onResizeMove), document.removeEventListener("pointerup", this._onResizeEnd);
  }
  toggle() {
    this.collapsible && (this.collapsed = !this.collapsed, this.persistId && localStorage.setItem(`tui-panel-${this.persistId}`, String(this.collapsed)), this.dispatchEvent(new CustomEvent("toggle", {
      detail: { collapsed: this.collapsed },
      bubbles: !0,
      composed: !0
    })));
  }
  dismiss() {
    if (this.floating && this.dismissable) {
      this.minimize();
      return;
    }
    if (this.persistId) {
      const r = {
        x: this.positionX,
        y: this.positionY,
        width: this.panelWidth,
        height: this.panelHeight,
        collapsed: this.collapsed,
        snapEdge: this.snapEdge
      };
      localStorage.setItem(`tui-panel-memory-${this.persistId}`, JSON.stringify(r));
    }
    const t = new CustomEvent("panel-dismiss", {
      detail: { panelId: this.id || this.title },
      bubbles: !0,
      composed: !0,
      cancelable: !0
    });
    this.dispatchEvent(t) && (this.hidden = !0);
  }
  /**
   * Minimize panel to edge tab
   */
  minimize() {
    if (!this.minimized) {
      if (this._preMinimizeX = this.positionX, this._preMinimizeY = this.positionY, this._preMinimizeWidth = this.panelWidth, this._preMinimizeHeight = this.panelHeight, this.snapEdge || (this.snapEdge = "left"), this.minimized = !0, this.persistId) {
        const t = {
          minimized: !0,
          preMinimize: {
            x: this._preMinimizeX,
            y: this._preMinimizeY,
            width: this._preMinimizeWidth,
            height: this._preMinimizeHeight
          },
          snapEdge: this.snapEdge
        };
        localStorage.setItem(`tui-panel-memory-${this.persistId}`, JSON.stringify(t));
      }
      this.dispatchEvent(new CustomEvent("panel-minimize", {
        detail: { panelId: this.id || this.title },
        bubbles: !0,
        composed: !0
      }));
    }
  }
  /**
   * Restore panel from minimized state
   */
  restore() {
    if (this.minimized) {
      if (this.positionX = this._preMinimizeX, this.positionY = this._preMinimizeY, this._preMinimizeWidth !== null && (this.panelWidth = this._preMinimizeWidth), this._preMinimizeHeight !== null && (this.panelHeight = this._preMinimizeHeight), this.minimized = !1, this.persistId) {
        const t = {
          minimized: !1,
          x: this.positionX,
          y: this.positionY,
          width: this.panelWidth,
          height: this.panelHeight,
          collapsed: this.collapsed,
          snapEdge: this.snapEdge
        };
        localStorage.setItem(`tui-panel-memory-${this.persistId}`, JSON.stringify(t));
      }
      this.dispatchEvent(new CustomEvent("panel-restore", {
        detail: { panelId: this.id || this.title },
        bubbles: !0,
        composed: !0
      }));
    }
  }
  /**
   * Restore panel position/state from localStorage
   * @returns true if restored, false if no stored state
   */
  restorePosition() {
    var e, r, s, o;
    if (!this.persistId) return !1;
    const t = localStorage.getItem(`tui-panel-memory-${this.persistId}`);
    if (!t) return !1;
    try {
      const i = JSON.parse(t);
      return i.minimized ? (this._preMinimizeX = ((e = i.preMinimize) == null ? void 0 : e.x) ?? 0, this._preMinimizeY = ((r = i.preMinimize) == null ? void 0 : r.y) ?? 0, this._preMinimizeWidth = ((s = i.preMinimize) == null ? void 0 : s.width) ?? null, this._preMinimizeHeight = ((o = i.preMinimize) == null ? void 0 : o.height) ?? null, this.snapEdge = i.snapEdge || "left", this.minimized = !0, !0) : (i.x !== void 0 && (this.positionX = i.x), i.y !== void 0 && (this.positionY = i.y), i.width !== void 0 && (this.panelWidth = i.width), i.height !== void 0 && (this.panelHeight = i.height), i.collapsed !== void 0 && (this.collapsed = i.collapsed), i.snapEdge !== void 0 && (this.snapEdge = i.snapEdge), !0);
    } catch (i) {
      return console.warn(`[tui-panel] Failed to restore position for ${this.persistId}:`, i), !1;
    }
  }
  firstUpdated() {
    this.minimized && this.floating && (this._preMinimizeX = this.positionX, this._preMinimizeY = this.positionY, this.snapEdge || (this.snapEdge = "left")), this.floating && !this.minimized && (this.style.left = `${this.positionX}px`, this.style.top = `${this.positionY}px`);
  }
  willUpdate(t) {
    this.full && this.floating && (this.floating = !1);
  }
  updated(t) {
    if (this.minimized) {
      this.snapEdge === "right" ? (this.style.left = "auto", this.style.right = "0") : (this.style.left = "0", this.style.right = "auto"), this.style.top = `${this.positionY}px`, this.style.width = "", this.style.height = "", this.style.minWidth = "", this.style.minHeight = "";
      return;
    }
    this.floating && (t.has("positionX") || t.has("positionY") || t.has("floating") || t.has("minimized")) && (this.style.left = `${this.positionX}px`, this.style.top = `${this.positionY}px`, this.style.right = "auto"), t.has("panelWidth") && this.panelWidth !== null && (this.style.width = `${this.panelWidth}px`), (t.has("panelHeight") || t.has("collapsed")) && (this.collapsed ? this.style.height = "" : this.panelHeight !== null && (this.style.height = `${this.panelHeight}px`)), t.has("maxWidth") && this.maxWidth !== null && (this.style.maxWidth = `${this.maxWidth}px`), t.has("maxHeight") && this.maxHeight !== null && (this.style.maxHeight = `${this.maxHeight}px`), t.has("minWidth") && (this.style.minWidth = `${this.minWidth}px`), t.has("minHeight") && !this.collapsed ? this.style.minHeight = `${this.minHeight}px` : this.collapsed && t.has("collapsed") && (this.style.minHeight = "");
  }
  render() {
    return this.minimized ? l`
        <div class="edge-tab" @click=${this._onEdgeTabClick} title="Click to restore ${this.title}">
          ${this.title}
        </div>
      ` : l`
      <div class="panel ${this.collapsed ? "collapsed" : ""}">
        <div
          class="header ${(this.floating || this.docked) && !this.full ? "draggable" : ""}"
          @pointerdown=${(this.floating || this.docked) && !this.full ? this._onDragStart : void 0}
        >
          <span class="title"><span class="title-decor">${Ce(this.border).before}</span>${this.title}<span class="title-decor">${Ce(this.border).after}</span></span>
          <div class="header-controls">
            ${this.collapsible ? l`
              <button class="collapse-btn" aria-label="Toggle panel" @click=${this._onCollapseClick}>
                ${this.collapsed ? "▸" : "▾"}
              </button>
            ` : ""}
            ${this.dismissable ? l`
              <button class="dismiss-btn" aria-label="Minimize panel" @click=${this._onDismissClick}>−</button>
            ` : ""}
          </div>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        ${this.resizable && this.floating && !this.full ? l`
          <div class="resize-handle" @pointerdown=${this._onResizeStart}></div>
        ` : ""}
      </div>
    `;
  }
};
v.styles = [
  b,
  h`
      :host {
        /* Default: neutral border color */
        --panel-color: var(--color-info);
        --panel-color-bg: var(--surface-elevated);
        --panel-color-fg: var(--text-primary);
        
        /* Pass selection-style to children (inheritable) */
        --selection-style: var(--parent-selection-style, invert);
        
        display: block;
      }

      /* Hidden panels (dismissed) */
      :host([hidden]) {
        display: none !important;
      }
      
      /* When selection-style attribute is set, override and pass to children */
      :host([selection-style="invert"]) {
        --selection-style: invert;
      }
      
      :host([selection-style="border"]) {
        --selection-style: border;
      }

      /* ═══════════════════════════════════════════════════════════════════
         SEMANTIC COLORS (new)
         Each sets the triplet: --panel-color, --panel-color-bg, --panel-color-fg
         ═══════════════════════════════════════════════════════════════════ */

      :host([color="primary"]) {
        --panel-color: var(--color-primary);
        --panel-color-bg: var(--color-primary-bg);
        --panel-color-fg: var(--color-primary-fg);
      }

      :host([color="secondary"]) {
        --panel-color: var(--color-secondary);
        --panel-color-bg: var(--color-secondary-bg);
        --panel-color-fg: var(--color-secondary-fg);
      }

      :host([color="error"]) {
        --panel-color: var(--color-error);
        --panel-color-bg: var(--color-error-bg);
        --panel-color-fg: var(--color-error-fg);
      }

      :host([color="success"]) {
        --panel-color: var(--color-success);
        --panel-color-bg: var(--color-success-bg);
        --panel-color-fg: var(--color-success-fg);
      }

      :host([color="info"]) {
        --panel-color: var(--color-info);
        --panel-color-bg: var(--color-info-bg);
        --panel-color-fg: var(--color-info-fg);
      }

      /* ═══════════════════════════════════════════════════════════════════
         LEGACY COLORS (backwards compatibility)
         Maps old names to semantic tokens
         ═══════════════════════════════════════════════════════════════════ */

      :host([color="cyan"]) {
        --panel-color: var(--color-primary);
        --panel-color-bg: var(--color-primary-bg);
        --panel-color-fg: var(--color-primary-fg);
      }

      :host([color="green"]) {
        --panel-color: var(--color-secondary);
        --panel-color-bg: var(--color-secondary-bg);
        --panel-color-fg: var(--color-secondary-fg);
      }

      :host([color="magenta"]) {
        --panel-color: var(--color-primary);
        --panel-color-bg: var(--color-primary-bg);
        --panel-color-fg: var(--color-primary-fg);
      }

      :host([color="yellow"]) {
        --panel-color: var(--color-info);
        --panel-color-bg: var(--color-info-bg);
        --panel-color-fg: var(--color-info-fg);
      }

      :host([color="red"]) {
        --panel-color: var(--color-error);
        --panel-color-bg: var(--color-error-bg);
        --panel-color-fg: var(--color-error-fg);
      }

      /* ═══════════════════════════════════════════════════════════════════
         PANEL BASE
         ═══════════════════════════════════════════════════════════════════ */

      .panel {
        position: relative;
        background: var(--surface-elevated);
        border: var(--border-width, 1px) solid var(--panel-color);
        border-radius: var(--border-radius, 0);
        display: flex;
        flex-direction: column;
        min-height: 0;
        height: auto;
        min-height: 100%;
        transition: border-width 0.1s, box-shadow 0.1s;
      }

      /* Collapsed: shrink to header only */
      .collapsed {
        min-height: 0;
        height: auto;
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: BRIGHT (default)
         Header highlights when active, bold borders for emphasis
         ═══════════════════════════════════════════════════════════════════ */

      /* Selected state: bold border */
      :host(:not([variant="classic"]))[selected] .panel,
      :host([variant="bright"][selected]) .panel {
        border-width: 2px;
        box-shadow: 3px 3px 0 rgba(255,255,255,0.05);
      }

      /* Active state: bold border + header highlight + heavy shadow */
      :host(:not([variant="classic"]))[active] .panel,
      :host([variant="bright"][active]) .panel {
        border-width: 2px;
        box-shadow: 4px 4px 0 rgba(255,255,255,0.08);
      }

      :host(:not([variant="classic"]))[active] .header,
      :host([variant="bright"][active]) .header {
        background: var(--panel-color-bg);
        color: var(--panel-color-fg);
      }

      :host(:not([variant="classic"]))[active] .title-decor,
      :host([variant="bright"][active]) .title-decor {
        opacity: 1;
      }

      :host(:not([variant="classic"]))[active] .toggle,
      :host([variant="bright"][active]) .toggle {
        color: var(--panel-color-fg);
        opacity: 1;
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: CLASSIC
         Box-draw aesthetic with shadow levels, no header highlighting
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="classic"]) .panel {
        box-shadow: 3px 3px 0 rgba(255,255,255,0.04);
      }

      /* Selected state: medium shadow */
      :host([variant="classic"][selected]) .panel {
        box-shadow: 5px 5px 0 rgba(255,255,255,0.07);
        border-color: var(--panel-color);
      }

      :host([variant="classic"][selected]) .title-decor {
        opacity: 1;
      }

      /* Active state: heavy shadow + colored title */
      :host([variant="classic"][active]) .panel {
        box-shadow: 6px 6px 0 rgba(255,255,255,0.12);
      }

      :host([variant="classic"][active]) .header {
        background: transparent;
        color: var(--panel-color);
      }

      :host([variant="classic"][active]) .title {
        text-shadow: 0 0 8px var(--panel-color);
      }

      :host([variant="classic"][active]) .title-decor {
        opacity: 1;
        color: var(--panel-color);
      }

      /* ═══════════════════════════════════════════════════════════════════
         HEADER
         ═══════════════════════════════════════════════════════════════════ */

      .header {
        padding: var(--spacing-sm) var(--spacing-md);
        border-bottom: var(--border-width, 1px) solid var(--panel-color);
        color: var(--panel-color);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        user-select: none;
        font-size: 0.85rem;
        transition: background 0.1s, color 0.1s;
      }

      .header.clickable {
        cursor: pointer;
      }

      .header.clickable:hover {
        background: rgba(255, 255, 255, 0.03);
      }

      :host([active]) .header.clickable:hover {
        filter: brightness(1.1);
      }

      .toggle {
        background: none;
        border: none;
        color: inherit;
        font-family: inherit;
        font-size: 0.75rem;
        cursor: pointer;
        padding: 0;
        opacity: 0.7;
      }

      .toggle:hover {
        opacity: 1;
      }

      .header-controls {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs, 4px);
        margin-left: auto;
      }

      .dismiss-btn {
        background: none;
        border: none;
        color: inherit;
        font-family: inherit;
        font-size: 0.85rem;
        cursor: pointer;
        padding: 0 2px;
        opacity: 0.6;
        line-height: 1;
      }

      .dismiss-btn:hover {
        opacity: 1;
        color: var(--color-error, #ff5555);
      }

      .collapse-btn {
        background: none;
        border: none;
        color: inherit;
        font-family: inherit;
        font-size: 0.75rem;
        cursor: pointer;
        padding: 0 2px;
        opacity: 0.7;
        line-height: 1;
      }

      .collapse-btn:hover {
        opacity: 1;
      }

      .title {
        display: flex;
        align-items: center;
      }

      .title-decor {
        opacity: 0.7;
      }

      :host([active]) .title-decor,
      :host([selected]) .title-decor {
        opacity: 1;
      }

      /* ═══════════════════════════════════════════════════════════════════
         CONTENT
         ═══════════════════════════════════════════════════════════════════ */

      .content {
        flex: 1;
        overflow: auto;
        padding: var(--spacing-sm);
        min-height: 0;
        /* Smooth collapse animation */
        max-height: 1000px;
        transition: max-height 0.2s ease-out, padding 0.2s ease-out, opacity 0.15s ease-out;
        opacity: 1;
      }

      .collapsed .content {
        max-height: 0;
        padding-top: 0;
        padding-bottom: 0;
        opacity: 0;
        overflow: hidden;
      }

      .collapsed .header {
        border-bottom: none;
      }

      /* Collapsed panels: lighter appearance */
      .collapsed {
        box-shadow: 2px 2px 0 rgba(255,255,255,0.03);
      }

      /* ═══════════════════════════════════════════════════════════════════
         FLOATING POSITIONING
         ═══════════════════════════════════════════════════════════════════ */

      :host([floating]) {
        position: absolute;
        z-index: 100;
      }

      /* Floating panel shadow */
      :host([floating]) .panel {
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3), 
                    6px 6px 0 rgba(255, 255, 255, 0.05);
      }

      .header.floating {
        cursor: grab;
      }

      .header.floating:active {
        cursor: grabbing;
      }

      .header.draggable {
        cursor: grab;
      }

      .header.draggable:active {
        cursor: grabbing;
      }

      /* ═══════════════════════════════════════════════════════════════════
         RESIZE HANDLE
         ═══════════════════════════════════════════════════════════════════ */

      .resize-handle {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 12px;
        height: 12px;
        cursor: se-resize;
        opacity: 0.5;
      }

      .resize-handle::before {
        content: '◢';
        position: absolute;
        right: 2px;
        bottom: 0;
        font-size: 10px;
        color: var(--panel-color);
      }

      .resize-handle:hover {
        opacity: 1;
      }

      /* ═══════════════════════════════════════════════════════════════════
         FULL STATE
         ═══════════════════════════════════════════════════════════════════ */

      :host([full]) {
        flex: 1;
        min-height: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      :host([full]) .panel {
        flex: 1;
        min-height: 0;
      }

      :host([full]) .content {
        flex: 1;
        min-height: 0;
        overflow: auto;
      }

      /* ═══════════════════════════════════════════════════════════════════
         DOCKED STATE
         ═══════════════════════════════════════════════════════════════════ */

      :host([docked]) {
        position: relative !important;
        left: auto !important;
        top: auto !important;
        z-index: auto;
      }

      :host([docked]) .panel {
        box-shadow: none;
      }

      :host([docked="left"]),
      :host([docked="right"]) {
        width: 100% !important;
        height: auto;
      }

      :host([docked="top"]),
      :host([docked="bottom"]) {
        width: 100% !important;
        height: auto;
      }

      /* Collapsed docked panels shrink to header only */
      :host([docked][collapsed]) {
        height: auto !important;
        min-height: 0 !important;
      }

      :host([docked][collapsed]) .panel {
        height: auto;
        min-height: 0;
      }

      /* Collapsed floating panels also shrink to header only */
      :host([floating][collapsed]) {
        height: auto !important;
        min-height: 0 !important;
      }

      :host([floating][collapsed]) .panel {
        height: auto;
        min-height: 0;
      }

      /* ═══════════════════════════════════════════════════════════════════
         MINIMIZED STATE (edge tab)
         ═══════════════════════════════════════════════════════════════════ */

      :host([minimized]) {
        width: auto !important;
        height: auto !important;
        min-width: 0 !important;
        min-height: 0 !important;
      }

      :host([minimized]) .panel {
        display: none;
      }

      .edge-tab {
        display: none;
      }

      :host([minimized]) .edge-tab {
        display: flex;
        align-items: center;
        justify-content: center;
        writing-mode: vertical-rl;
        text-orientation: mixed;
        padding: 12px 6px;
        background: var(--surface-elevated, #1a1a2e);
        border: 1px solid var(--panel-color);
        color: var(--panel-color);
        font-size: 0.75rem;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        transition: background 0.15s, color 0.15s;
      }

      /* Left edge tab styling */
      :host([minimized][snap-edge="left"]) .edge-tab {
        border-left: none;
        border-radius: 0 4px 4px 0;
      }

      /* Right edge tab styling */
      :host([minimized][snap-edge="right"]) .edge-tab {
        writing-mode: vertical-lr;
        border-right: none;
        border-radius: 4px 0 0 4px;
      }

      :host([minimized]) .edge-tab:hover {
        background: var(--panel-color-bg);
        color: var(--panel-color-fg);
      }

      /* Matrix-style collapse animation */
      @keyframes matrix-collapse {
        0% { opacity: 1; transform: scaleX(1); }
        50% { opacity: 0.6; transform: scaleX(0.3); filter: blur(2px); }
        100% { opacity: 0; transform: scaleX(0); }
      }

      @keyframes matrix-expand {
        0% { opacity: 0; transform: scaleX(0); }
        50% { opacity: 0.6; transform: scaleX(0.3); filter: blur(2px); }
        100% { opacity: 1; transform: scaleX(1); }
      }

      :host([minimized]) .edge-tab {
        animation: matrix-expand 0.25s ease-out;
      }
    `
];
g([
  n({ type: String })
], v.prototype, "title", 2);
g([
  n({ type: String })
], v.prototype, "color", 2);
g([
  n({ type: String, reflect: !0 })
], v.prototype, "border", 2);
g([
  n({ type: String, reflect: !0 })
], v.prototype, "variant", 2);
g([
  n({ type: String, attribute: "selection-style", reflect: !0 })
], v.prototype, "selectionStyle", 2);
g([
  n({ type: Boolean })
], v.prototype, "collapsible", 2);
g([
  n({ type: Boolean, reflect: !0 })
], v.prototype, "collapsed", 2);
g([
  n({ type: Boolean, reflect: !0 })
], v.prototype, "selected", 2);
g([
  n({ type: Boolean, reflect: !0 })
], v.prototype, "active", 2);
g([
  n({ type: String, attribute: "persist-id" })
], v.prototype, "persistId", 2);
g([
  n({ type: Boolean, reflect: !0 })
], v.prototype, "dismissable", 2);
g([
  n({ type: Boolean, reflect: !0 })
], v.prototype, "full", 2);
g([
  n({ type: Boolean, reflect: !0 })
], v.prototype, "floating", 2);
g([
  n({ type: String, attribute: "snap-edge", reflect: !0 })
], v.prototype, "snapEdge", 2);
g([
  n({ type: Number, attribute: "position-x" })
], v.prototype, "positionX", 2);
g([
  n({ type: Number, attribute: "position-y" })
], v.prototype, "positionY", 2);
g([
  n({ type: Boolean, reflect: !0 })
], v.prototype, "resizable", 2);
g([
  n({ type: Boolean, reflect: !0 })
], v.prototype, "minimized", 2);
g([
  n({ type: Number, attribute: "panel-width" })
], v.prototype, "panelWidth", 2);
g([
  n({ type: Number, attribute: "panel-height" })
], v.prototype, "panelHeight", 2);
g([
  n({ type: Number, attribute: "max-width" })
], v.prototype, "maxWidth", 2);
g([
  n({ type: Number, attribute: "max-height" })
], v.prototype, "maxHeight", 2);
g([
  n({ type: Number, attribute: "min-width" })
], v.prototype, "minWidth", 2);
g([
  n({ type: Number, attribute: "min-height" })
], v.prototype, "minHeight", 2);
g([
  n({
    type: String,
    reflect: !0,
    converter: {
      fromAttribute: (t) => t || "",
      toAttribute: (t) => t || null
      // Don't reflect empty string
    }
  })
], v.prototype, "docked", 2);
v = g([
  f("tui-panel")
], v);
const Je = {
  30: "black",
  31: "red",
  32: "green",
  33: "yellow",
  34: "blue",
  35: "magenta",
  36: "cyan",
  37: "white",
  90: "black",
  91: "red",
  92: "green",
  93: "yellow",
  94: "blue",
  95: "magenta",
  96: "cyan",
  97: "white"
}, Qe = {
  40: "black",
  41: "red",
  42: "green",
  43: "yellow",
  44: "blue",
  45: "magenta",
  46: "cyan",
  47: "white",
  100: "black",
  101: "red",
  102: "green",
  103: "yellow",
  104: "blue",
  105: "magenta",
  106: "cyan",
  107: "white"
}, et = {
  1: "bold",
  2: "dim",
  3: "italic",
  4: "underline",
  7: "reverse",
  9: "strikethrough"
};
function tt(t) {
  const e = ["#000000", "#aa0000", "#00aa00", "#aa5500", "#0000aa", "#aa00aa", "#00aaaa", "#aaaaaa"], r = ["#555555", "#ff5555", "#55ff55", "#ffff55", "#5555ff", "#ff55ff", "#55ffff", "#ffffff"];
  if (t < 8) return e[t];
  if (t < 16) return r[t - 8];
  if (t < 232) {
    const i = t - 16, a = Math.floor(i / 36), c = Math.floor(i % 36 / 6), d = i % 6, p = (m) => (m === 0 ? 0 : 55 + m * 40).toString(16).padStart(2, "0");
    return `#${p(a)}${p(c)}${p(d)}`;
  }
  const o = (8 + (t - 232) * 10).toString(16).padStart(2, "0");
  return `#${o}${o}${o}`;
}
function Ye(t) {
  if (!t) return "";
  let e = t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const r = /\x1b\[([0-9;]+)m/g;
  let s = "", o = 0, i = [], a;
  for (; (a = r.exec(e)) !== null; ) {
    s += e.slice(o, a.index), o = a.index + a[0].length;
    const c = a[1].split(";").map(Number);
    for (let d = 0; d < c.length; d++) {
      const p = c[d];
      if (p === 0)
        s += i.map(() => "</span>").join(""), i = [];
      else if (p === 38 && c[d + 1] === 5 && c[d + 2] !== void 0) {
        const m = tt(c[d + 2]);
        s += `<span style="color: ${m}">`, i.push("256fg"), d += 2;
      } else if (p === 48 && c[d + 1] === 5 && c[d + 2] !== void 0) {
        const m = tt(c[d + 2]);
        s += `<span style="background-color: ${m}">`, i.push("256bg"), d += 2;
      } else if (p === 38 && c[d + 1] === 2 && c.length > d + 4) {
        const m = c[d + 2], K = c[d + 3], He = c[d + 4];
        s += `<span style="color: rgb(${m},${K},${He})">`, i.push("tcfg"), d += 4;
      } else if (p === 48 && c[d + 1] === 2 && c.length > d + 4) {
        const m = c[d + 2], K = c[d + 3], He = c[d + 4];
        s += `<span style="background-color: rgb(${m},${K},${He})">`, i.push("tcbg"), d += 4;
      } else if (Je[p]) {
        const m = `ansi-${Je[p]}`;
        s += `<span class="${m}">`, i.push(m);
      } else if (Qe[p]) {
        const m = `ansi-bg-${Qe[p]}`;
        s += `<span class="${m}">`, i.push(m);
      } else if (et[p]) {
        const m = `ansi-${et[p]}`;
        s += `<span class="${m}">`, i.push(m);
      }
    }
  }
  return s += e.slice(o), s += i.map(() => "</span>").join(""), s;
}
var Et = Object.defineProperty, St = Object.getOwnPropertyDescriptor, se = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? St(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Et(e, r, o), o;
};
let A = class extends u {
  constructor() {
    super(...arguments), this.maxLines = 500, this.autoscroll = !0, this.timestamps = !1, this.attr = "", this._lines = [];
  }
  /**
   * Append a line of text (supports ANSI codes)
   * @param text - Text to append
   */
  append(t) {
    const e = this.timestamps ? (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: !1 }) : null, r = t.split(`
`).map((s) => ({
      id: Date.now() + Math.random(),
      text: s,
      html: Ye(s),
      timestamp: e
    }));
    this._lines = [...this._lines, ...r].slice(-this.maxLines), this.autoscroll && this._isNearBottom() && this.updateComplete.then(() => this.scrollToBottom());
  }
  /**
   * Clear all output
   */
  clear() {
    this._lines = [];
  }
  /** Accept a protocol event */
  handleEvent(t) {
    if (t.type === "clear") {
      this.clear();
      return;
    }
    const e = t.data;
    e.message != null && this.append(e.message);
  }
  /** Check if the user is scrolled near the bottom (within 1 line height) */
  _isNearBottom() {
    var r;
    const t = (r = this.shadowRoot) == null ? void 0 : r.querySelector(".output");
    return t ? t.scrollHeight - t.scrollTop - t.clientHeight < 30 : !0;
  }
  scrollToBottom() {
    var e;
    const t = (e = this.shadowRoot) == null ? void 0 : e.querySelector(".output");
    t && (t.scrollTop = t.scrollHeight);
  }
  get _attrClasses() {
    return this.attr.split(/\s+/).filter(Boolean).map((t) => `tui-${t}`).join(" ");
  }
  render() {
    return l`
      <div class="output ${this._attrClasses}">
        ${this._lines.length === 0 ? l`<div class="empty">Waiting for output...</div>` : this._lines.map((t) => l`
              <div class="line">
                ${t.timestamp ? l`<span class="timestamp">[${t.timestamp}]</span>` : ""}
                <span .innerHTML=${t.html}></span>
              </div>
            `)}
      </div>
    `;
  }
};
A.styles = [
  b,
  h`
      :host {
        display: block;
        height: 100%;
        overflow: hidden;
      }

      .output {
        height: 100%;
        overflow-y: auto;
        background: var(--surface-base);
        padding: 4px var(--spacing-sm);
        font-size: var(--font-size-xs, 0.6rem);
        line-height: 1.3;
      }

      .line {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--text-primary);
        padding: 1px 0;
      }

      .timestamp {
        color: var(--text-muted);
        margin-right: 0.4em;
      }

      .empty {
        color: var(--text-muted);
        font-style: italic;
      }

      /* Scrollbar styling */
      .output::-webkit-scrollbar {
        width: 8px;
      }

      .output::-webkit-scrollbar-track {
        background: var(--surface-base);
      }

      .output::-webkit-scrollbar-thumb {
        background: var(--border-default);
        border-radius: 4px;
      }

      .output::-webkit-scrollbar-thumb:hover {
        background: var(--text-muted);
      }
    `
];
se([
  n({ type: Number, attribute: "max-lines" })
], A.prototype, "maxLines", 2);
se([
  n({ type: Boolean })
], A.prototype, "autoscroll", 2);
se([
  n({ type: Boolean })
], A.prototype, "timestamps", 2);
se([
  n({ type: String })
], A.prototype, "attr", 2);
se([
  _()
], A.prototype, "_lines", 2);
A = se([
  f("tui-output")
], A);
var Ct = Object.defineProperty, kt = Object.getOwnPropertyDescriptor, Ae = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? kt(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Ct(e, r, o), o;
};
let Z = class extends u {
  constructor() {
    super(...arguments), this.border = "single", this._columns = [], this._rows = [];
  }
  /**
   * Set table data
   * @param columns - Column headers
   * @param rows - Row data
   */
  setData(t, e) {
    this._columns = t, this._rows = e;
  }
  /**
   * Add or update a row by key
   * @param key - Row identifier (first column value)
   * @param data - Row data
   */
  upsertRow(t, e) {
    const r = this._rows.findIndex((s) => s[this._columns[0]] === t);
    r >= 0 ? this._rows = [
      ...this._rows.slice(0, r),
      e,
      ...this._rows.slice(r + 1)
    ] : this._rows = [...this._rows, e];
  }
  /** Accept a protocol event */
  handleEvent(t) {
    if (t.type === "clear") {
      this._columns = [], this._rows = [];
      return;
    }
    const e = t.data;
    if ("columns" in e && "rows" in e) {
      const r = e;
      this.setData(r.columns, r.rows);
    } else if ("key" in e && "row" in e) {
      const r = e;
      this.upsertRow(r.key, r.row);
    }
  }
  getCellClass(t) {
    return typeof t == "number" ? "number" : t === "✓" || t === "OK" || t === "online" ? "status-ok" : t === "⚠" || t === "WARN" || t === "degraded" ? "status-warn" : t === "✗" || t === "ERROR" || t === "offline" ? "status-error" : "";
  }
  render() {
    return this._columns.length === 0 ? l`<div class="empty">No data</div>` : l`
      <div class="table">
        <div class="row header">
          ${this._columns.map((t) => l`<div class="cell">${t}</div>`)}
        </div>
        ${this._rows.map((t) => l`
          <div class="row">
            ${this._columns.map((e) => l`
              <div class="cell ${this.getCellClass(t[e])}">${t[e] ?? ""}</div>
            `)}
          </div>
        `)}
      </div>
    `;
  }
};
Z.styles = [
  b,
  h`
      :host {
        display: block;
      }

      .table {
        width: 100%;
        font-size: 0.8rem;
      }

      .row {
        display: flex;
        border-bottom: var(--border-width) solid var(--border-default);
      }

      .row:last-child {
        border-bottom: none;
      }

      .cell {
        flex: 1;
        padding: 0.4rem 0.6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .header {
        background: var(--surface-base);
        border-bottom: var(--border-width) solid var(--text-muted);
      }

      .header .cell {
        color: var(--color-primary);
        font-weight: normal;
      }

      .empty {
        color: var(--text-muted);
        font-style: italic;
        padding: var(--spacing-sm);
      }

      /* Value styling */
      .cell.status-ok { color: var(--color-secondary); }
      .cell.status-warn { color: var(--color-secondary); }
      .cell.status-error { color: var(--color-error); }
      .cell.number { 
        font-variant-numeric: tabular-nums;
        text-align: right;
      }
    `
];
Ae([
  n({ type: String })
], Z.prototype, "border", 2);
Ae([
  _()
], Z.prototype, "_columns", 2);
Ae([
  _()
], Z.prototype, "_rows", 2);
Z = Ae([
  f("tui-table")
], Z);
var Pt = Object.defineProperty, Ot = Object.getOwnPropertyDescriptor, F = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Ot(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Pt(e, r, o), o;
};
let S = class extends u {
  constructor() {
    super(...arguments), this.prompt = "❯ ", this.promptAttr = "", this.historySize = 100, this._lines = [], this._inputValue = "", this._historyIndex = -1, this._history = [];
  }
  /**
   * Print output to console
   * @param text - Text to print (supports ANSI codes)
   */
  print(t) {
    const e = t.split(`
`).map((r) => ({
      id: Date.now() + Math.random(),
      text: r,
      html: Ye(r),
      type: "output"
    }));
    this._lines = [...this._lines, ...e], this.updateComplete.then(() => this.scrollToBottom());
  }
  /**
   * Clear console output
   */
  clear() {
    this._lines = [];
  }
  /** Accept a protocol event */
  handleEvent(t) {
    if (t.type === "clear") {
      this.clear();
      return;
    }
    const e = t.data;
    e.message != null && this.print(e.message);
  }
  scrollToBottom() {
    var e;
    const t = (e = this.shadowRoot) == null ? void 0 : e.querySelector(".output");
    t && (t.scrollTop = t.scrollHeight);
  }
  focusInput() {
    var e;
    const t = (e = this.shadowRoot) == null ? void 0 : e.querySelector("input");
    t == null || t.focus();
  }
  handleKeydown(t) {
    switch (t.key) {
      case "Enter":
        this.submitCommand();
        break;
      case "ArrowUp":
        t.preventDefault(), this.navigateHistory(1);
        break;
      case "ArrowDown":
        t.preventDefault(), this.navigateHistory(-1);
        break;
      case "l":
        t.ctrlKey && (t.preventDefault(), this.clear());
        break;
      case "c":
        t.ctrlKey && (t.preventDefault(), this._inputValue = "", this.print("^C"));
        break;
    }
  }
  submitCommand() {
    const t = this._inputValue.trim();
    t && (this._lines = [...this._lines, {
      id: Date.now(),
      text: t,
      html: t,
      type: "command",
      prompt: this.prompt
    }], this._history = [...this._history.slice(-this.historySize + 1), t], this._historyIndex = -1, this._inputValue = "", this.dispatchEvent(new CustomEvent("command", {
      detail: t,
      bubbles: !0,
      composed: !0
    })), this.updateComplete.then(() => this.scrollToBottom()));
  }
  navigateHistory(t) {
    const e = this._historyIndex + t;
    e < 0 ? (this._historyIndex = -1, this._inputValue = "") : e < this._history.length && (this._historyIndex = e, this._inputValue = this._history[this._history.length - 1 - e]);
  }
  handleInput(t) {
    this._inputValue = t.target.value;
  }
  get _promptClasses() {
    return ["prompt", ...this.promptAttr.split(/\s+/).filter(Boolean).map((t) => `tui-${t}`)].join(" ");
  }
  render() {
    return l`
      <div class="console" @click=${this.focusInput}>
        <div class="output">
          ${this._lines.map((t) => l`
            <div class="line ${t.type}" data-prompt=${t.prompt || ""}>
              <span .innerHTML=${t.html}></span>
            </div>
          `)}
        </div>
        <div class="input-line">
          <span class="${this._promptClasses}">${this.prompt}</span>
          <input
            type="text"
            .value=${this._inputValue}
            @input=${this.handleInput}
            @keydown=${this.handleKeydown}
            autocomplete="off"
            spellcheck="false"
          />
        </div>
      </div>
    `;
  }
};
S.styles = [
  b,
  h`
      :host {
        display: block;
        height: 200px;
      }

      .console {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: var(--surface-base);
        font-size: 0.8rem;
      }

      .output {
        flex: 1;
        overflow-y: auto;
        padding: var(--spacing-sm);
        line-height: 1.4;
      }

      .line {
        white-space: pre-wrap;
        word-break: break-all;
      }

      .line.command {
        color: var(--color-primary);
      }

      .line.command::before {
        content: attr(data-prompt);
        color: var(--color-secondary);
      }

      .input-line {
        display: flex;
        align-items: center;
        padding: var(--spacing-sm);
        border-top: 1px solid var(--border-default);
        background: var(--surface-elevated);
      }

      .prompt {
        color: var(--color-secondary);
        margin-right: var(--spacing-xs);
        flex-shrink: 0;
      }

      input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-family: inherit;
        font-size: inherit;
        outline: none;
        caret-color: var(--color-primary);
      }

      /* Scrollbar */
      .output::-webkit-scrollbar {
        width: 8px;
      }
      .output::-webkit-scrollbar-track {
        background: var(--surface-base);
      }
      .output::-webkit-scrollbar-thumb {
        background: var(--border-default);
        border-radius: 4px;
      }
    `
];
F([
  n({ type: String })
], S.prototype, "prompt", 2);
F([
  n({ type: String, attribute: "prompt-attr" })
], S.prototype, "promptAttr", 2);
F([
  n({ type: Number, attribute: "history-size" })
], S.prototype, "historySize", 2);
F([
  _()
], S.prototype, "_lines", 2);
F([
  _()
], S.prototype, "_inputValue", 2);
F([
  _()
], S.prototype, "_historyIndex", 2);
S = F([
  f("tui-console")
], S);
var Dt = Object.defineProperty, Tt = Object.getOwnPropertyDescriptor, Ie = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Tt(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Dt(e, r, o), o;
};
let J = class extends u {
  constructor() {
    super(...arguments), this.content = "", this.attr = "", this.variant = "";
  }
  render() {
    const t = this.attr.split(/\s+/).filter(Boolean).map((r) => `tui-${r}`).join(" "), e = Ye(this.content || this.textContent || "");
    return l`<pre class="${t}" .innerHTML=${e}></pre>`;
  }
};
J.styles = [
  b,
  h`
      :host {
        display: block;
      }

      pre {
        margin: 0;
        font-family: inherit;
        font-size: 0.85rem;
        line-height: 1.4;
        white-space: pre-wrap;
        word-break: break-all;
      }

      :host([variant="caption"]) pre {
        font-size: var(--font-size-caption, 0.6rem);
        color: var(--text-muted);
      }

      :host([variant="subtitle"]) pre {
        font-size: var(--font-size-sm, 0.75rem);
        color: var(--text-muted);
      }

      :host([variant="label"]) pre {
        font-size: var(--font-size-label, 0.75rem);
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      :host([variant="body"]) pre {
        font-size: var(--font-size-body, 0.85rem);
        color: var(--text-primary);
      }
    `
];
Ie([
  n({ type: String })
], J.prototype, "content", 2);
Ie([
  n({ type: String })
], J.prototype, "attr", 2);
Ie([
  n({ type: String, reflect: !0 })
], J.prototype, "variant", 2);
J = Ie([
  f("tui-text")
], J);
var At = Object.defineProperty, It = Object.getOwnPropertyDescriptor, H = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? It(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && At(e, r, o), o;
};
let w = class extends u {
  constructor() {
    super(...arguments), this.variant = "default", this.size = "md", this.selected = !1, this.disabled = !1, this.block = !1;
  }
  render() {
    return l`
      <button ?disabled=${this.disabled} part="button">
        <slot></slot>
      </button>
    `;
  }
};
w.shadowRootOptions = {
  ...u.shadowRootOptions,
  delegatesFocus: !0
};
w.styles = [
  b,
  h`
      /* ═══════════════════════════════════════════════════════════════════
         HOST & THEMING HOOKS
         ═══════════════════════════════════════════════════════════════════ */

      :host {
        /* Inherit selection style from parent or default to invert */
        --_selection-style: var(--selection-style, invert);

        /* Themeable properties with fallbacks */
        --_btn-bg: var(--tui-button-bg, var(--surface-base));
        --_btn-color: var(--tui-button-color, var(--text-primary));
        --_btn-border-color: var(--tui-button-border-color, var(--border-default));
        --_btn-border-width: var(--border-width, 1px);

        /* Hover overrides - default to standard behavior if not set */
        --_btn-hover-bg: var(--tui-button-hover-bg, var(--border-default));
        --_btn-hover-color: var(--tui-button-hover-color, var(--_btn-color));
        --_btn-hover-border-color: var(--tui-button-hover-border-color, var(--text-muted));

        /* Size tokens */
        --_btn-padding-x: var(--spacing-md);
        --_btn-padding-y: var(--spacing-sm);
        --_btn-font-size: 0.85rem;
        --_btn-icon-size: 36px;

        display: inline-block;
      }

      :host([block]) {
        display: block;
      }

      /* ═══════════════════════════════════════════════════════════════════
         BASE BUTTON
         ═══════════════════════════════════════════════════════════════════ */

      button {
        font-family: var(--font-mono, inherit);
        font-size: var(--_btn-font-size);
        padding: var(--_btn-padding-y) var(--_btn-padding-x);
        background: var(--_btn-bg);
        border: var(--_btn-border-width) solid var(--_btn-border-color);
        border-radius: var(--border-radius, 0);
        color: var(--_btn-color);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-xs);
        text-transform: uppercase;
        letter-spacing: 0.03em;
        width: 100%;
        transition:
          background 0.1s ease-out,
          border-color 0.1s ease-out,
          color 0.1s ease-out,
          box-shadow 0.1s ease-out,
          filter 0.1s ease-out;

        &:hover:not(:disabled) {
          background: var(--_btn-hover-bg);
          color: var(--_btn-hover-color);
          border-color: var(--_btn-hover-border-color);
        }

        &:focus {
          outline: 1px solid var(--color-primary);
          outline-offset: 1px;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      /* ═══════════════════════════════════════════════════════════════════
         SIZES
         ═══════════════════════════════════════════════════════════════════ */

      :host([size="sm"]) {
        --_btn-padding-x: var(--spacing-sm);
        --_btn-padding-y: var(--spacing-xs);
        --_btn-font-size: 0.75rem;
        --_btn-icon-size: 28px;
      }

      :host([size="lg"]) {
        --_btn-padding-x: var(--spacing-lg);
        --_btn-padding-y: var(--spacing-md);
        --_btn-font-size: 1rem;
        --_btn-icon-size: 44px;
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: PRIMARY
         Filled with primary color
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="primary"]) {
        --_btn-bg: var(--color-primary);
        --_btn-color: var(--surface-base);
        --_btn-border-color: var(--color-primary);

        & button:hover:not(:disabled) {
          filter: brightness(1.15);
          background: var(--color-primary);
          border-color: var(--color-primary);
        }
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: DANGER
         Outlined with error color, fills on hover
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="danger"]) {
        --_btn-bg: transparent;
        --_btn-color: var(--color-error);
        --_btn-border-color: var(--color-error);

        & button:hover:not(:disabled) {
          background: var(--color-error);
          color: var(--surface-base);
          border-color: var(--color-error);
        }
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: GHOST
         No border until hover
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="ghost"]) {
        --_btn-bg: transparent;
        --_btn-color: var(--text-muted);
        --_btn-border-color: transparent;

        & button:hover:not(:disabled) {
          background: transparent;
          border-color: var(--border-default);
          color: var(--text-primary);
        }
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: OUTLINE
         Single border outline, text colored, transparent background
         Border matches variant color. Fills on hover.
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="outline"]) {
        --_btn-bg: transparent;
        --_btn-color: var(--color-primary);
        --_btn-border-color: var(--color-primary);

        & button:hover:not(:disabled) {
          background: var(--color-primary);
          color: var(--surface-base);
          border-color: var(--color-primary);
        }
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: ICON
         Square button for toolbars
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="icon"]) {
        --_btn-bg: var(--surface-base);
        --_btn-color: var(--text-primary);
        --_btn-border-color: var(--border-default);

        & button {
          width: var(--_btn-icon-size);
          height: var(--_btn-icon-size);
          padding: 0;
          font-size: var(--spacing-md);
        }
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: MENU
         Transparent trigger for menu bars
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="menu"]) {
        --_btn-bg: transparent;
        --_btn-color: var(--text-primary);
        --_btn-border-color: transparent;

        & button {
          text-transform: none;
          letter-spacing: normal;
          padding: var(--spacing-xs) var(--spacing-sm);

          &:hover:not(:disabled) {
            background: var(--text-primary);
            color: var(--surface-base);
            border-color: transparent;
          }
        }
      }

      /* ═══════════════════════════════════════════════════════════════════
         SELECTED STATE: INVERT STYLE (default)
         Color swap on selected
         ═══════════════════════════════════════════════════════════════════ */

      :host([selected]) button {
        background: var(--text-primary);
        color: var(--surface-base);
        border-color: var(--text-primary);
      }

      :host([selected]) button:hover:not(:disabled) {
        filter: brightness(1.1);
      }

      /* Icon variant with invert selection */
      :host([variant="icon"][selected]) button {
        background: var(--color-primary);
        color: var(--surface-base);
        border-color: var(--color-primary);
      }

      /* ═══════════════════════════════════════════════════════════════════
         SELECTED STATE: BORDER STYLE
         Progressive border weight: single → heavy → double
         Uses box-shadow to avoid layout shifts (no border-width changes)
         ═══════════════════════════════════════════════════════════════════ */

      /* Border style: hover shows heavy border via box-shadow */
      :host([selection-style="border"]) button:hover:not(:disabled) {
        background: var(--_btn-bg);
        border-color: var(--text-primary);
        box-shadow: 0 0 0 1px var(--text-primary);
      }

      /* Border style: selected shows double line with visible gap
         Structure: border (outer) → gap (bg color) → inner line */
      :host([selection-style="border"][selected]) button {
        background: var(--_btn-bg);
        color: var(--_btn-color);
        border-color: var(--text-primary);
        box-shadow: 
          inset 0 0 0 2px var(--_btn-bg),
          inset 0 0 0 3px var(--text-primary);
      }

      :host([selection-style="border"][selected]) button:hover:not(:disabled) {
        filter: none;
        background: var(--surface-elevated);
      }

      /* Border style for icon variant */
      :host([selection-style="border"][variant="icon"]) button:hover:not(:disabled) {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 1px var(--color-primary);
      }

      :host([selection-style="border"][variant="icon"][selected]) button {
        border-color: var(--color-primary);
        box-shadow: 
          inset 0 0 0 2px var(--_btn-bg),
          inset 0 0 0 3px var(--color-primary);
      }
    `
];
H([
  n({ reflect: !0 })
], w.prototype, "variant", 2);
H([
  n({ reflect: !0 })
], w.prototype, "size", 2);
H([
  n({ attribute: "selection-style" })
], w.prototype, "selectionStyle", 2);
H([
  n({ attribute: "tool-id" })
], w.prototype, "toolId", 2);
H([
  n({ type: Boolean, reflect: !0 })
], w.prototype, "selected", 2);
H([
  n({ type: Boolean, reflect: !0 })
], w.prototype, "disabled", 2);
H([
  n({ type: Boolean, reflect: !0 })
], w.prototype, "block", 2);
w = H([
  f("tui-button")
], w);
var Mt = Object.defineProperty, Rt = Object.getOwnPropertyDescriptor, $ = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Rt(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Mt(e, r, o), o;
};
let ke = class extends u {
  constructor() {
    super(...arguments), this._openMenu = null;
  }
  render() {
    return l`<slot></slot>`;
  }
};
ke.styles = [
  b,
  h`
      :host {
        display: flex;
        gap: var(--spacing-xs);
      }
    `
];
$([
  _()
], ke.prototype, "_openMenu", 2);
ke = $([
  f("tui-menu")
], ke);
let Q = class extends u {
  constructor() {
    super(...arguments), this.label = "", this.hotkey = "", this._open = !1, this._outsideClickHandler = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._outsideClickHandler = (t) => {
      this._open && !this.contains(t.target) && this._close();
    }, document.addEventListener("click", this._outsideClickHandler), this.addEventListener("keydown", this._handleKeydown.bind(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._outsideClickHandler && document.removeEventListener("click", this._outsideClickHandler);
  }
  _toggle() {
    this._open = !this._open, this.classList.toggle("open", this._open);
  }
  _close() {
    this._open = !1, this.classList.remove("open");
  }
  _handleKeydown(t) {
    t.key === "Escape" && (this._close(), t.preventDefault()), (t.key === "Enter" || t.key === " " || t.key === "ArrowDown") && (this._open || (this._toggle(), t.preventDefault()));
  }
  render() {
    let t = this.label;
    if (this.hotkey && this.label.toLowerCase().includes(this.hotkey.toLowerCase())) {
      const e = this.label.toLowerCase().indexOf(this.hotkey.toLowerCase()), r = this.label.slice(0, e), s = this.label.slice(e, e + 1), o = this.label.slice(e + 1);
      t = l`${r}<span class="hotkey">${s}</span>${o}`;
    }
    return l`
      <tui-button
        variant="menu"
        ?selected=${this._open}
        @click=${this._toggle}
      >
        ${t}
      </tui-button>
      <div class="dropdown">
        <slot @click=${this._close}></slot>
      </div>
    `;
  }
};
Q.styles = [
  b,
  h`
      :host {
        position: relative;
      }

      /* Hotkey styling within the button */
      .hotkey {
        color: var(--color-secondary);
        text-decoration: underline;
      }

      /* When trigger is hovered/open, hotkey inherits inverted color */
      :host(.open) .hotkey,
      tui-button:hover .hotkey {
        color: inherit;
      }

      .dropdown {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 200px;
        background: var(--surface-elevated);
        border: var(--border-width) solid var(--text-primary);
        box-shadow: 4px 4px 0 rgba(0,0,0,0.5);
        z-index: 1000;
      }

      :host(.open) .dropdown {
        display: block;
      }
    `
];
$([
  n({ type: String })
], Q.prototype, "label", 2);
$([
  n({ type: String })
], Q.prototype, "hotkey", 2);
$([
  _()
], Q.prototype, "_open", 2);
Q = $([
  f("tui-menu-item")
], Q);
let ee = class extends u {
  constructor() {
    super(...arguments), this.label = "", this.shortcut = "", this.danger = !1;
  }
  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("action", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return l`
      <button @click=${this._handleClick}>
        <span>${this.label}</span>
        ${this.shortcut ? l`<span class="shortcut">${this.shortcut}</span>` : ""}
      </button>
    `;
  }
};
ee.styles = [
  b,
  h`
      :host {
        display: block;
      }

      button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0.4rem 0.75rem;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-family: inherit;
        font-size: 0.85rem;
        cursor: pointer;
        text-align: left;
      }

      button:hover {
        background: var(--text-primary);
        color: var(--surface-base);
      }

      :host([danger]) button {
        color: var(--color-error);
      }

      :host([danger]) button:hover {
        background: var(--color-error);
        color: var(--surface-base);
      }

      .shortcut {
        color: var(--text-muted);
        font-size: 0.75rem;
      }

      button:hover .shortcut {
        color: var(--surface-base);
        opacity: 0.7;
      }
    `
];
$([
  n({ type: String })
], ee.prototype, "label", 2);
$([
  n({ type: String })
], ee.prototype, "shortcut", 2);
$([
  n({ type: Boolean, reflect: !0 })
], ee.prototype, "danger", 2);
ee = $([
  f("tui-menu-action")
], ee);
let Ne = class extends u {
  render() {
    return l``;
  }
};
Ne.styles = h`
    :host {
      display: block;
      height: 1px;
      background: var(--border-default);
      margin: var(--spacing-xs) 0;
    }
  `;
Ne = $([
  f("tui-menu-divider")
], Ne);
var Ht = Object.defineProperty, jt = Object.getOwnPropertyDescriptor, ie = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? jt(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Ht(e, r, o), o;
};
let Pe = class extends u {
  constructor() {
    super(...arguments), this.color = "magenta";
  }
  render() {
    return l`<slot></slot>`;
  }
};
Pe.styles = [
  b,
  h`
      :host {
        --bar-color: var(--color-primary);
        display: flex;
        align-items: stretch;
        font-size: 0.8rem;
        background: var(--surface-elevated);
        border: var(--border-width) solid var(--bar-color);
        border-bottom: none;
        flex-shrink: 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      :host([color="cyan"]) { --bar-color: var(--color-primary); border-color: var(--color-primary); }
      :host([color="green"]) { --bar-color: var(--color-secondary); border-color: var(--color-secondary); }
      :host([color="yellow"]) { --bar-color: var(--color-secondary); border-color: var(--color-secondary); }

      /* Style slotted status-items with dividers */
      ::slotted(tui-status-item) {
        border-right: 1px solid var(--bar-color);
      }

      ::slotted(tui-status-item:last-child) {
        border-right: none;
      }
    `
];
ie([
  n({ type: String, reflect: !0 })
], Pe.prototype, "color", 2);
Pe = ie([
  f("tui-statusbar")
], Pe);
let te = class extends u {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.highlight = !1;
  }
  render() {
    return l`
      <span class="label">${this.label}</span>
      <span class="value">${this.value}</span>
    `;
  }
};
te.styles = [
  b,
  h`
      :host {
        display: flex;
        align-items: center;
        padding: 0.4rem 0.75rem;
        color: var(--text-primary);
      }

      .label {
        color: var(--color-primary);
        margin-right: var(--spacing-sm);
        font-weight: normal;
      }

      .value {
        color: var(--color-secondary);
        font-weight: normal;
      }

      :host([highlight]) .value {
        color: var(--color-secondary);
      }
    `
];
ie([
  n({ type: String })
], te.prototype, "label", 2);
ie([
  n({ type: String })
], te.prototype, "value", 2);
ie([
  n({ type: Boolean, reflect: !0 })
], te.prototype, "highlight", 2);
te = ie([
  f("tui-status-item")
], te);
var Nt = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, be = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Lt(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Nt(e, r, o), o;
};
let j = class extends u {
  constructor() {
    super(...arguments), this.title = "", this.border = "double", this.open = !1, this.closable = !0, this._boundKeyHandler = this._handleKeydown.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("keydown", this._boundKeyHandler);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("keydown", this._boundKeyHandler);
  }
  _handleKeydown(t) {
    this.open && t.key === "Escape" && this.closable && (this.close(), t.preventDefault(), t.stopPropagation());
  }
  _handleOverlayClick(t) {
    t.target === t.currentTarget && this.closable && this.close();
  }
  /**
   * Open the modal
   */
  show() {
    this.open = !0, this.dispatchEvent(new CustomEvent("open", { bubbles: !0, composed: !0 }));
  }
  /**
   * Close the modal
   */
  close() {
    this.open = !1, this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  render() {
    return l`
      <div class="overlay" @click=${this._handleOverlayClick}>
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="header">
            <span class="title" id="modal-title"><span class="title-decor">${Ce(this.border).before}</span>${this.title}<span class="title-decor">${Ce(this.border).after}</span></span>
            ${this.closable ? l`
              <button class="close" @click=${this.close} aria-label="Close">✕</button>
            ` : ""}
          </div>
          <div class="content">
            <slot></slot>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
};
j.styles = [
  b,
  h`
      :host {
        display: none;
      }

      :host([open]) {
        display: block;
      }

      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.15s ease-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .modal {
        background: var(--surface-elevated);
        border: 2px solid var(--text-primary);
        box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.8);
        max-width: 90vw;
        max-height: 80vh;
        min-width: 300px;
        display: flex;
        flex-direction: column;
        animation: slideIn 0.15s ease-out;
      }

      @keyframes slideIn {
        from { 
          opacity: 0;
          transform: translateY(-10px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-sm) 0.75rem;
        border-bottom: var(--border-width) solid var(--border-default);
        background: var(--text-primary);
        color: var(--surface-base);
        user-select: none;
      }

      .title {
        font-size: 0.9rem;
        font-weight: normal;
      }

      .title-decor {
        opacity: 0.8;
      }

      .close {
        background: none;
        border: none;
        color: var(--surface-base);
        font-family: inherit;
        font-size: var(--spacing-md);
        cursor: pointer;
        padding: 0 var(--spacing-xs);
        line-height: 1;
      }

      .close:hover {
        color: var(--color-error);
      }

      .content {
        padding: var(--spacing-md);
        overflow: auto;
        flex: 1;
      }

      .footer {
        padding: 0.75rem var(--spacing-md);
        border-top: 1px solid var(--border-default);
        display: flex;
        justify-content: flex-end;
        gap: var(--spacing-sm);
      }

      .footer:empty {
        display: none;
      }

      /* Content styling helpers */
      ::slotted(h3) {
        color: var(--color-primary);
        font-size: 0.85rem;
        font-weight: normal;
        margin: 0 0 var(--spacing-sm) 0;
      }

      ::slotted(h3:not(:first-child)) {
        margin-top: var(--spacing-md);
      }

      ::slotted(p) {
        margin: 0 0 var(--spacing-sm) 0;
        font-size: 0.85rem;
        color: var(--text-muted);
      }

      ::slotted(kbd) {
        background: var(--border-default);
        padding: 0.var(--spacing-md) 0.3rem;
        border-radius: 2px;
        font-size: 0.75rem;
        font-family: inherit;
      }
    `
];
be([
  n({ type: String, reflect: !0 })
], j.prototype, "title", 2);
be([
  n({ type: String, reflect: !0 })
], j.prototype, "border", 2);
be([
  n({ type: Boolean, reflect: !0 })
], j.prototype, "open", 2);
be([
  n({ type: Boolean })
], j.prototype, "closable", 2);
j = be([
  f("tui-modal")
], j);
var Bt = Object.defineProperty, Wt = Object.getOwnPropertyDescriptor, x = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Wt(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Bt(e, r, o), o;
};
let C = class extends u {
  constructor() {
    super(...arguments), this.orientation = "vertical", this.selected = "", this.size = "md", this.selectionStyle = "", this.tools = [], this.showHotkeys = !0;
  }
  updated(t) {
    t.has("selectionStyle") && this.selectionStyle && this.style.setProperty("--toolbar-selection-style", this.selectionStyle);
  }
  _handleClick(t) {
    this.selected = t, this.dispatchEvent(
      new CustomEvent("tool-select", {
        bubbles: !0,
        composed: !0,
        detail: { tool: t }
      })
    );
  }
  render() {
    return this.tools && this.tools.length > 0 ? l`
        <div class="toolbar">
          ${this.tools.map((t) => t.divider ? l`<div class="divider"></div>` : l`
              <div class="tool-item">
                ${this.showHotkeys && t.key ? l`<span class="hotkey">${t.key}</span>` : ""}
                <tui-button
                  variant="icon"
                  size=${this.size}
                  tool-id=${t.id}
                  ?selected=${this.selected === t.id}
                  selection-style=${this.selectionStyle || "invert"}
                  title="${t.name || t.id}${t.key ? ` (${t.key})` : ""}"
                  @click=${() => this._handleClick(t.id)}
                >
                  ${t.icon || t.id.charAt(0).toUpperCase()}
                </tui-button>
              </div>
            `)}
        </div>
      ` : l`
      <div class="toolbar">
        <slot></slot>
      </div>
    `;
  }
};
C.styles = [
  b,
  h`
      :host {
        display: block;
        /* Pass selection-style to children */
        --selection-style: var(--toolbar-selection-style, invert);
      }

      .toolbar {
        display: flex;
        gap: var(--spacing-xs);
      }

      :host([orientation="vertical"]) .toolbar,
      :host(:not([orientation])) .toolbar {
        flex-direction: column;
      }

      :host([orientation="horizontal"]) .toolbar {
        flex-direction: row;
        flex-wrap: wrap;
      }

      /* ═══════════════════════════════════════════════════════════════════
         TOOL WITH HOTKEY
         ═══════════════════════════════════════════════════════════════════ */

      .tool-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
      }

      .hotkey {
        font-size: 0.65rem;
        color: var(--text-muted, #888);
        font-family: var(--font-mono);
        text-transform: uppercase;
        min-width: 1ch;
        text-align: center;
      }

      /* Vertical: hotkey to the left */
      :host([orientation="vertical"]) .tool-item,
      :host(:not([orientation])) .tool-item {
        flex-direction: row;
      }

      /* Horizontal: hotkey above */
      :host([orientation="horizontal"]) .tool-item {
        flex-direction: column;
      }

      :host([orientation="horizontal"]) .hotkey {
        font-size: 0.6rem;
        line-height: 1;
      }

      /* ═══════════════════════════════════════════════════════════════════
         DIVIDER
         ═══════════════════════════════════════════════════════════════════ */

      .divider {
        background: var(--border-default);
      }

      :host([orientation="vertical"]) .divider,
      :host(:not([orientation])) .divider {
        height: 1px;
        width: 100%;
        margin: var(--spacing-xs) 0;
      }

      :host([orientation="horizontal"]) .divider {
        width: 1px;
        height: 24px;
        margin: 6px var(--spacing-xs);
      }
    `
];
x([
  n({ reflect: !0 })
], C.prototype, "orientation", 2);
x([
  n()
], C.prototype, "selected", 2);
x([
  n({ reflect: !0 })
], C.prototype, "size", 2);
x([
  n({ attribute: "selection-style" })
], C.prototype, "selectionStyle", 2);
x([
  n({ type: Array })
], C.prototype, "tools", 2);
x([
  n({ type: Boolean, attribute: "show-hotkeys" })
], C.prototype, "showHotkeys", 2);
C = x([
  f("tui-toolbar")
], C);
let N = class extends u {
  constructor() {
    super(...arguments), this.toolId = "", this.icon = "", this.active = !1, this.size = "md";
  }
  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("tool-select", {
        bubbles: !0,
        composed: !0,
        detail: { tool: this.toolId }
      })
    );
  }
  render() {
    return l`
      <tui-button
        variant="icon"
        size=${this.size}
        ?selected=${this.active}
        @click=${this._handleClick}
      >
        <slot>${this.icon}</slot>
      </tui-button>
    `;
  }
};
N.styles = h`
    :host {
      display: contents;
    }
  `;
x([
  n({ attribute: "tool-id" })
], N.prototype, "toolId", 2);
x([
  n()
], N.prototype, "icon", 2);
x([
  n({ type: Boolean, reflect: !0 })
], N.prototype, "active", 2);
x([
  n()
], N.prototype, "size", 2);
N = x([
  f("tui-tool")
], N);
var Yt = Object.defineProperty, Ut = Object.getOwnPropertyDescriptor, me = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Ut(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Yt(e, r, o), o;
};
let L = class extends u {
  constructor() {
    super(...arguments), this.position = "bottom", this._queue = [], this._current = null, this._visible = !1;
  }
  /**
   * Show a toast message
   * @param message - The message to display
   * @param options - Toast options
   */
  show(t, e = {}) {
    const r = {
      message: t,
      type: e.type || null,
      title: e.title || this._getDefaultTitle(e.type),
      duration: e.duration || 2500,
      simple: !e.type && !e.title
    };
    this._queue = [...this._queue, r], this._current || this._showNext();
  }
  _getDefaultTitle(t) {
    switch (t) {
      case "success":
        return "Success";
      case "error":
        return "Error";
      case "warning":
        return "Warning";
      case "info":
        return "Info";
      default:
        return "";
    }
  }
  async _showNext() {
    if (this._queue.length === 0) {
      this._current = null;
      return;
    }
    const [t, ...e] = this._queue;
    this._queue = e, this._current = t, this._visible = !1, await this.updateComplete, requestAnimationFrame(() => {
      this._visible = !0;
    }), await new Promise((r) => setTimeout(r, this._current.duration)), this._visible = !1, await new Promise((r) => setTimeout(r, 200)), this._showNext();
  }
  render() {
    if (!this._current)
      return l``;
    const { message: t, type: e, title: r, simple: s } = this._current, o = [
      "toast",
      this._visible ? "visible" : "",
      e ? `type-${e}` : "",
      s ? "simple" : ""
    ].filter(Boolean).join(" ");
    return l`
      <div class="${o}">
        <div class="toast-header">${r}</div>
        <div class="toast-body">${t}</div>
      </div>
    `;
  }
};
L.styles = [
  b,
  h`
      :host {
        position: fixed;
        z-index: 3000;
        pointer-events: none;
      }

      :host([position="bottom"]),
      :host(:not([position])) {
        bottom: var(--spacing-lg);
        left: 50%;
        transform: translateX(-50%);
      }

      :host([position="top"]) {
        top: var(--spacing-lg);
        left: 50%;
        transform: translateX(-50%);
      }

      :host([position="bottom-right"]) {
        bottom: var(--spacing-lg);
        right: var(--spacing-lg);
      }

      .toast {
        background: var(--surface-elevated);
        border: var(--border-width) solid var(--text-primary);
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.6);
        padding: 0;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.2s, transform 0.2s;
        pointer-events: auto;
      }

      .toast.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .toast.exiting {
        opacity: 0;
        transform: translateY(-5px);
      }

      /* Toast header with box-draw */
      .toast-header {
        padding: var(--spacing-xs) var(--spacing-sm);
        background: var(--text-primary);
        color: var(--surface-base);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
      }

      .toast-header::before {
        content: '┌─';
        opacity: 0.7;
      }

      .toast-header::after {
        content: '─┐';
        opacity: 0.7;
      }

      /* Toast body */
      .toast-body {
        padding: var(--spacing-sm) 0.75rem;
        font-size: 0.85rem;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
      }

      /* Type variants */
      .toast.type-success .toast-header {
        background: var(--color-secondary);
      }

      .toast.type-success .toast-body::before {
        content: '✓';
        color: var(--color-secondary);
      }

      .toast.type-error .toast-header {
        background: var(--color-error);
      }

      .toast.type-error .toast-body::before {
        content: '✗';
        color: var(--color-error);
      }

      .toast.type-warning .toast-header {
        background: var(--color-secondary);
      }

      .toast.type-warning .toast-body::before {
        content: '⚠';
        color: var(--color-secondary);
      }

      .toast.type-info .toast-header {
        background: var(--color-primary);
      }

      .toast.type-info .toast-body::before {
        content: 'ℹ';
        color: var(--color-primary);
      }

      /* Simple toast (no header) */
      .toast.simple .toast-header {
        display: none;
      }

      .toast.simple .toast-body {
        padding: 0.4rem 0.75rem;
      }

      .toast.simple .toast-body::before {
        content: '▸';
        color: var(--color-primary);
      }
    `
];
me([
  n({ type: String, reflect: !0 })
], L.prototype, "position", 2);
me([
  _()
], L.prototype, "_queue", 2);
me([
  _()
], L.prototype, "_current", 2);
me([
  _()
], L.prototype, "_visible", 2);
L = me([
  f("tui-toast")
], L);
let $e = null;
function Cr(t, e) {
  $e || ($e = document.createElement("tui-toast"), document.body.appendChild($e)), $e.show(t, e);
}
var Xt = Object.defineProperty, qt = Object.getOwnPropertyDescriptor, V = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? qt(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Xt(e, r, o), o;
};
const P = Te.single, O = Te.heavy, D = Te.double;
let k = class extends u {
  constructor() {
    super(...arguments), this.rank = "", this.suit = "", this.faceDown = !1, this.selected = !1, this.disabled = !1, this.size = "md";
  }
  get isRed() {
    return this.suit === "♥" || this.suit === "♦";
  }
  _handleClick() {
    this.disabled || this.dispatchEvent(new CustomEvent("card-click", {
      bubbles: !0,
      composed: !0,
      detail: { rank: this.rank, suit: this.suit }
    }));
  }
  render() {
    const t = this.isRed ? "suit red" : "suit", e = `size-${this.size}`;
    return l`
      <div 
        class="card ${e} ${this.disabled ? "disabled" : ""}"
        @click=${this._handleClick}
      >
        <div class="card-back"></div>
        
        <div class="corner corner-top">
          <span class="rank">${this.rank}</span>
          <span class="${t}">${this.suit}</span>
        </div>
        
        <div class="face">
          <slot>
            <span class="${t}" style="font-size: 1.5em;">${this.suit}</span>
          </slot>
        </div>
        
        <div class="corner corner-bottom">
          <span class="rank">${this.rank}</span>
          <span class="${t}">${this.suit}</span>
        </div>
        
        <div class="card-bottom"></div>
      </div>
    `;
  }
};
k.styles = [
  b,
  h`
      :host {
        display: inline-block;
        font-family: inherit;
        user-select: none;
      }

      /* ═══════════════════════════════════════════════════════════════════
         CARD STRUCTURE
         Uses CSS pseudo-elements for box-drawing corners.
         State mapping (from borders.ts): single → neutral, heavy → hover, double → selected
         ═══════════════════════════════════════════════════════════════════ */

      .card {
        position: relative;
        background: var(--surface-base);
        cursor: pointer;
        transition: transform 0.1s, box-shadow 0.1s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      /* Size variants */
      .card.size-sm {
        width: 32px;
        height: 44px;
        font-size: 0.75rem;
      }

      .card.size-md {
        width: 48px;
        height: 66px;
        font-size: var(--spacing-md);
      }

      .card.size-lg {
        width: 64px;
        height: 88px;
        font-size: 1.25rem;
      }

      /* ═══════════════════════════════════════════════════════════════════
         NEUTRAL STATE - Single line border ${y(P.tl)}${y(P.h)}${y(P.h)}${y(P.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      .card {
        border: var(--border-width) solid var(--border-default);
      }

      .card::before {
        content: '${y(P.tl)}';
        position: absolute;
        top: -1px;
        left: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card::after {
        content: '${y(P.tr)}';
        position: absolute;
        top: -1px;
        right: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card-bottom::before {
        content: '${y(P.bl)}';
        position: absolute;
        bottom: -1px;
        left: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card-bottom::after {
        content: '${y(P.br)}';
        position: absolute;
        bottom: -1px;
        right: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      /* ═══════════════════════════════════════════════════════════════════
         HOVER STATE - Heavy line border ${y(O.tl)}${y(O.h)}${y(O.h)}${y(O.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      .card:hover:not(.disabled) {
        border-color: var(--text-primary);
        box-shadow: 2px 2px 0 rgba(255,255,255,0.08);
        transform: translateY(-2px);
      }

      .card:hover:not(.disabled)::before { content: '${y(O.tl)}'; color: var(--text-primary); }
      .card:hover:not(.disabled)::after { content: '${y(O.tr)}'; color: var(--text-primary); }
      .card:hover:not(.disabled) .card-bottom::before { content: '${y(O.bl)}'; color: var(--text-primary); }
      .card:hover:not(.disabled) .card-bottom::after { content: '${y(O.br)}'; color: var(--text-primary); }

      /* ═══════════════════════════════════════════════════════════════════
         SELECTED STATE - Double line border ${y(D.tl)}${y(D.h)}${y(D.h)}${y(D.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      :host([selected]) .card {
        border-color: var(--color-primary);
        box-shadow: 3px 3px 0 rgba(88, 166, 255, 0.2);
      }

      :host([selected]) .card::before { content: '${y(D.tl)}'; color: var(--color-primary); }
      :host([selected]) .card::after { content: '${y(D.tr)}'; color: var(--color-primary); }
      :host([selected]) .card-bottom::before { content: '${y(D.bl)}'; color: var(--color-primary); }
      :host([selected]) .card-bottom::after { content: '${y(D.br)}'; color: var(--color-primary); }

      /* Selected + hover */
      :host([selected]) .card:hover:not(.disabled) {
        box-shadow: 4px 4px 0 rgba(88, 166, 255, 0.3);
      }

      /* ═══════════════════════════════════════════════════════════════════
         CARD CONTENT
         ═══════════════════════════════════════════════════════════════════ */

      .suit {
        color: var(--text-primary);
      }

      .suit.red {
        color: var(--color-error);
      }

      .rank {
        font-weight: normal;
      }

      .face {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 0.1em;
      }

      /* Corner indicators */
      .corner {
        position: absolute;
        font-size: 0.65em;
        line-height: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .corner-top {
        top: 3px;
        left: 3px;
      }

      .corner-bottom {
        bottom: 3px;
        right: 3px;
        transform: rotate(180deg);
      }

      /* Face down (card back) */
      :host([face-down]) .face {
        display: none;
      }

      :host([face-down]) .corner {
        display: none;
      }

      .card-back {
        display: none;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
          45deg,
          var(--border-default),
          var(--border-default) 2px,
          var(--surface-elevated) 2px,
          var(--surface-elevated) 4px
        );
      }

      :host([face-down]) .card-back {
        display: block;
      }

      /* Disabled */
      :host([disabled]) .card {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .card-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
      }
    `
];
V([
  n({ type: String })
], k.prototype, "rank", 2);
V([
  n({ type: String })
], k.prototype, "suit", 2);
V([
  n({ type: Boolean, attribute: "face-down", reflect: !0 })
], k.prototype, "faceDown", 2);
V([
  n({ type: Boolean, reflect: !0 })
], k.prototype, "selected", 2);
V([
  n({ type: Boolean, reflect: !0 })
], k.prototype, "disabled", 2);
V([
  n({ type: String, reflect: !0 })
], k.prototype, "size", 2);
k = V([
  f("tui-card")
], k);
var Ft = Object.defineProperty, Vt = Object.getOwnPropertyDescriptor, ve = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Vt(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Ft(e, r, o), o;
};
let B = class extends u {
  constructor() {
    super(...arguments), this.palettes = {}, this.currentPalette = "", this.selectedChar = "", this.columns = 8;
  }
  get _chars() {
    return this.palettes[this.currentPalette] || [];
  }
  _selectPalette(t) {
    var r;
    const e = ((r = this.palettes[t]) == null ? void 0 : r[0]) || "";
    this.dispatchEvent(new CustomEvent("palette-change", {
      bubbles: !0,
      composed: !0,
      detail: { palette: t, firstChar: e }
    }));
  }
  _selectChar(t) {
    this.dispatchEvent(new CustomEvent("char-select", {
      bubbles: !0,
      composed: !0,
      detail: { char: t }
    }));
  }
  render() {
    const t = Object.keys(this.palettes);
    return l`
      <div class="tabs">
        ${t.map((e) => l`
          <button
            class="tab ${e === this.currentPalette ? "active" : ""}"
            @click=${() => this._selectPalette(e)}
          >${e}</button>
        `)}
      </div>
      <div class="grid" style="grid-template-columns: repeat(${this.columns}, 28px)">
        ${this._chars.map((e) => l`
          <button
            class="char ${e === this.selectedChar ? "selected" : ""}"
            @click=${() => this._selectChar(e)}
          >${e}</button>
        `)}
      </div>
    `;
  }
};
B.styles = [
  b,
  h`
      :host {
        display: block;
      }

      .tabs {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
        padding: var(--spacing-sm);
        border-bottom: var(--border-width) solid var(--border-default);
      }

      .tab {
        padding: 0.2rem 0.4rem;
        background: transparent;
        border: var(--border-width) solid var(--border-default);
        color: var(--text-muted);
        font-family: inherit;
        font-size: 0.7rem;
        cursor: pointer;
        transition: border 0.1s, color 0.1s;
      }

      .tab:hover {
        border-color: var(--text-muted);
      }

      /* Active tab: bold border */
      .tab.active {
        border: 2px solid var(--color-secondary);
        color: var(--color-secondary);
        padding: calc(0.2rem - 1px) calc(0.4rem - 1px);
      }

      .grid {
        display: grid;
        gap: 2px;
        padding: var(--spacing-sm);
      }

      .char {
        width: 28px;
        height: 28px;
        background: var(--surface-base);
        border: var(--border-width) solid var(--border-default);
        color: var(--text-primary);
        font-family: inherit;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        transition: border 0.1s, background 0.1s;
      }

      .char:hover {
        background: var(--border-default);
      }

      /* Selected char: bold border */
      .char.selected {
        border: 2px solid var(--color-secondary);
        color: var(--color-secondary);
      }
    `
];
ve([
  n({ type: Object })
], B.prototype, "palettes", 2);
ve([
  n({ type: String, attribute: "current-palette" })
], B.prototype, "currentPalette", 2);
ve([
  n({ type: String, attribute: "selected-char" })
], B.prototype, "selectedChar", 2);
ve([
  n({ type: Number })
], B.prototype, "columns", 2);
B = ve([
  f("tui-palette")
], B);
var Kt = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, Me = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Gt(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Kt(e, r, o), o;
};
let re = class extends u {
  constructor() {
    super(...arguments), this.href = "", this.type = "external", this._copied = !1;
  }
  _handleClick() {
    this.type === "external" && this.href ? window.open(this.href, "_blank", "noopener") : this.type === "copy" && this.href && navigator.clipboard.writeText(this.href).then(() => {
      this._copied = !0, this.dispatchEvent(new CustomEvent("copy", {
        detail: { value: this.href },
        bubbles: !0,
        composed: !0
      })), setTimeout(() => {
        this._copied = !1;
      }, 1500);
    });
  }
  render() {
    const t = this.type === "external" ? "↗" : "⧉";
    return l`
      <button class="link" @click=${this._handleClick}>
        <slot></slot><span class="icon">${t}</span>
      </button>${this._copied ? l`<span class="copied">copied</span>` : ""}
    `;
  }
};
re.styles = [
  b,
  h`
      :host {
        display: inline;
      }

      .link {
        color: var(--color-primary);
        text-decoration: underline;
        text-decoration-style: dotted;
        text-underline-offset: 2px;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        background: none;
        border: none;
        padding: 0;
      }

      .link:hover {
        text-decoration-style: solid;
      }

      .icon {
        color: var(--color-primary);
        font-size: 0.75em;
        margin-left: 0.3em;
        opacity: 0.7;
      }

      .link:hover .icon {
        opacity: 1;
      }

      .copied {
        color: var(--color-success);
        font-size: var(--font-size-caption, 0.6rem);
        margin-left: 0.5em;
        animation: fade-out 1.5s forwards;
      }

      @keyframes fade-out {
        0%, 70% { opacity: 1; }
        100% { opacity: 0; }
      }
    `
];
Me([
  n({ type: String })
], re.prototype, "href", 2);
Me([
  n({ type: String, reflect: !0 })
], re.prototype, "type", 2);
Me([
  _()
], re.prototype, "_copied", 2);
re = Me([
  f("tui-link")
], re);
var Zt = Object.defineProperty, Jt = Object.getOwnPropertyDescriptor, Ue = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Jt(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Zt(e, r, o), o;
};
let pe = class extends u {
  constructor() {
    super(...arguments), this.items = [], this.selected = "";
  }
  _handleClick(t, e) {
    this.selected === t ? (this.selected = "", this.dispatchEvent(new CustomEvent("item-deselect", {
      bubbles: !0,
      composed: !0
    }))) : (this.selected = t, this.dispatchEvent(new CustomEvent("item-select", {
      detail: { id: t, label: e },
      bubbles: !0,
      composed: !0
    })));
  }
  _colorVar(t) {
    return t ? {
      success: "var(--color-success)",
      error: "var(--color-error)",
      warning: "var(--color-warning)",
      primary: "var(--color-primary)",
      muted: "var(--text-muted)"
    }[t] ?? t : "";
  }
  _hasActions(t) {
    var r;
    const e = (r = this.shadowRoot) == null ? void 0 : r.querySelector(`slot[name="actions-${t}"]`);
    return !!e && e.assignedNodes().length > 0;
  }
  render() {
    return this.items.length === 0 ? l`<div class="empty">No items</div>` : l`${this.items.map((t) => {
      const e = this._colorVar(t.color), r = this.selected === t.id;
      return l`
        <div
          class="item ${r ? "active" : ""}"
          @click=${() => this._handleClick(t.id, t.label)}
        >
          <div style=${e && !r ? `color: ${e}` : ""}>${t.label}</div>
          ${t.sublabel ? l`<div class="sublabel">${t.sublabel}</div>` : ""}
        </div>
        ${r ? l`
          <div class="action-panel" style=${this._hasActions(t.id) ? "" : "display:none"}>
            <slot name="actions-${t.id}" @slotchange=${() => this.requestUpdate()}></slot>
          </div>
        ` : ze}
      `;
    })}`;
  }
};
pe.styles = [
  b,
  h`
      :host {
        display: flex;
        flex-direction: column;
      }

      .item {
        padding: var(--spacing-sm) var(--spacing-md);
        color: var(--text-primary);
        font-size: var(--font-size-body, 0.85rem);
        cursor: pointer;
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        transition: background 0.1s;
      }

      .item:hover {
        background: var(--surface-elevated);
      }

      .item.active,
      .item.active:hover {
        background: var(--text-primary);
        color: var(--surface-base);
      }

      .sublabel {
        font-size: var(--font-size-caption, 0.6rem);
        color: var(--text-muted);
        margin-top: 2px;
      }

      .item.active .sublabel,
      .item.active:hover .sublabel {
        color: var(--surface-elevated);
      }

      .action-panel {
        background: var(--surface-elevated);
        border: 1px solid var(--color-primary);
        padding: var(--spacing-sm) var(--spacing-md);
        animation: expand 0.15s ease-out;
      }

      @keyframes expand {
        from { opacity: 0; max-height: 0; }
        to { opacity: 1; max-height: 200px; }
      }

      .empty {
        color: var(--text-muted);
        font-style: italic;
        font-size: var(--font-size-sm, 0.75rem);
        padding: var(--spacing-md);
        opacity: 0.4;
      }
    `
];
Ue([
  n({ type: Array })
], pe.prototype, "items", 2);
Ue([
  n({ type: String, reflect: !0 })
], pe.prototype, "selected", 2);
pe = Ue([
  f("tui-action-list")
], pe);
var Qt = Object.defineProperty, er = Object.getOwnPropertyDescriptor, Re = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? er(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Qt(e, r, o), o;
};
let oe = class extends u {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.color = "";
  }
  render() {
    return l`
      <div class="label">${this.label}</div>
      <div class="value">${this.value}</div>
    `;
  }
};
oe.styles = [
  b,
  h`
      :host {
        display: block;
        text-align: right;
        font-family: var(--font-mono, monospace);
      }

      :host + :host {
        margin-top: var(--spacing-sm);
      }

      .label {
        font-size: var(--font-size-caption, 0.6rem);
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      .value {
        font-size: var(--font-size-md, 0.85rem);
        color: var(--text-primary);
        font-variant-numeric: tabular-nums;
      }

      :host([color="primary"]) .value { color: var(--color-primary); }
      :host([color="success"]) .value { color: var(--color-success); }
      :host([color="warning"]) .value { color: var(--color-warning); }
      :host([color="error"]) .value { color: var(--color-error); }
      :host([color="muted"]) .value { color: var(--text-muted); }
    `
];
Re([
  n({ type: String })
], oe.prototype, "label", 2);
Re([
  n({ type: String })
], oe.prototype, "value", 2);
Re([
  n({ type: String, reflect: !0 })
], oe.prototype, "color", 2);
oe = Re([
  f("tui-stat")
], oe);
var tr = Object.defineProperty, rr = Object.getOwnPropertyDescriptor, ge = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? rr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && tr(e, r, o), o;
};
let Oe = class extends u {
  constructor() {
    super(...arguments), this.label = "";
  }
  render() {
    return l`
      ${this.label ? l`<span class="label">${this.label}:</span>` : ""}
      <slot></slot>
    `;
  }
};
Oe.styles = [
  b,
  h`
      :host {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: var(--spacing-sm) var(--spacing-md);
        background: var(--surface-base);
        font-family: var(--font-mono, monospace);
        font-size: var(--font-size-xs, 0.6rem);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        min-height: 28px;
      }

      .label {
        color: var(--text-muted);
        letter-spacing: 0.1em;
        margin-right: var(--spacing-sm);
      }

      ::slotted(tui-strip-item) {
        display: inline-flex;
        align-items: center;
      }

      ::slotted(tui-strip-item)::before {
        content: '│';
        color: var(--border-default);
        margin: 0 var(--spacing-sm);
      }
    `
];
ge([
  n({ type: String })
], Oe.prototype, "label", 2);
Oe = ge([
  f("tui-status-strip")
], Oe);
let he = class extends u {
  constructor() {
    super(...arguments), this.color = "", this.indicator = "";
  }
  render() {
    return l`
      <span class="separator">│</span>
      <slot></slot>${this.indicator ? l` ${this.indicator}` : ""}
    `;
  }
};
he.styles = [
  b,
  h`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.3em;
        font-family: var(--font-mono, monospace);
        font-size: var(--font-size-xs, 0.6rem);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--text-muted);
      }

      :host([color="success"]) { color: var(--color-success); }
      :host([color="warning"]) { color: var(--color-warning); }
      :host([color="error"]) { color: var(--color-error); }
      :host([color="primary"]) { color: var(--color-primary); }
      :host([color="muted"]) { color: var(--text-muted); }

      .separator {
        color: var(--border-default);
        margin: 0 var(--spacing-sm);
      }
    `
];
ge([
  n({ type: String, reflect: !0 })
], he.prototype, "color", 2);
ge([
  n({ type: String })
], he.prototype, "indicator", 2);
he = ge([
  f("tui-strip-item")
], he);
var or = Object.defineProperty, sr = Object.getOwnPropertyDescriptor, Xe = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? sr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && or(e, r, o), o;
};
let ue = class extends u {
  constructor() {
    super(...arguments), this.app = "", this.section = "";
  }
  render() {
    return l`
      ${this.app ? l`
        <span class="app-name">${this.app}</span>
        <span class="divider">|</span>
      ` : ""}
      <slot></slot>
      ${this.section ? l`<span class="section">${this.section}</span>` : ""}
    `;
  }
};
ue.styles = [
  b,
  h`
      :host {
        display: flex;
        align-items: center;
        height: 32px;
        padding: 0 var(--spacing-md);
        background: var(--surface-elevated);
        border-bottom: var(--border-width, 2px) solid var(--color-primary);
        flex-shrink: 0;
        gap: var(--spacing-md);
      }

      .app-name {
        color: var(--color-primary);
        font-size: var(--font-size-sm, 0.75rem);
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }

      .divider {
        color: var(--border-default);
        font-size: var(--font-size-sm, 0.75rem);
      }

      .section {
        margin-left: auto;
        color: var(--text-muted);
        font-size: var(--font-size-xs, 0.6rem);
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
    `
];
Xe([
  n({ type: String })
], ue.prototype, "app", 2);
Xe([
  n({ type: String })
], ue.prototype, "section", 2);
ue = Xe([
  f("tui-titlebar")
], ue);
var ir = Object.defineProperty, ar = Object.getOwnPropertyDescriptor, ye = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? ar(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && ir(e, r, o), o;
};
const nr = {
  monitor: "status status | main aside-1 | main aside-2",
  viewer: "primary secondary | detail detail",
  console: "main | footer",
  "console-split": "main aside | footer footer",
  triad: "left center right"
};
function lr(t) {
  const r = t.split("|").map((p) => p.trim()).filter(Boolean).map((p) => p.split(/\s+/)), s = r.map((p) => `"${p.join(" ")}"`).join(" "), o = Math.max(...r.map((p) => p.length)), i = Array(o).fill("1fr").join(" "), a = /* @__PURE__ */ new Set(), c = [];
  for (const p of r)
    for (const m of p)
      a.has(m) || (a.add(m), c.push(m));
  const d = r.map((p, m) => {
    const K = new Set(p).size === 1;
    return K && m === 0 ? "auto" : K && m === r.length - 1 ? "120px" : "1fr";
  }).join(" ");
  return { areas: s, rows: d, cols: i, slotNames: c };
}
let W = class extends u {
  constructor() {
    super(...arguments), this.preset = "", this.areas = "", this.gap = "1px", this.labels = "";
  }
  _getGrid() {
    const t = this.preset ? nr[this.preset] : this.areas;
    return t ? lr(t) : null;
  }
  // When preset + areas are both set, treat areas as ordered display labels
  // mapped 1:1 onto the preset's slot names.
  _getDisplayLabels(t) {
    if (!this.preset || !this.areas) return {};
    const e = this.areas.split("|").flatMap((s) => s.trim().split(/\s+/)).filter(Boolean), r = {};
    return t.forEach((s, o) => {
      e[o] && (r[s] = e[o]);
    }), r;
  }
  render() {
    const t = this._getGrid();
    if (!t) return ze;
    const e = `
      grid-template-areas: ${t.areas};
      grid-template-rows: ${t.rows};
      grid-template-columns: ${t.cols};
      gap: ${this.gap};
    `, r = this._getDisplayLabels(t.slotNames);
    return l`
      <div class="grid" style=${e}>
        ${t.slotNames.map((s) => {
      const o = r[s] ?? s;
      return l`
            <div class="zone ${this.labels === "titlebar" ? "has-titlebar" : ""}" style="grid-area: ${s};">
              ${this.labels === "titlebar" ? l`<div class="zone-titlebar">${o}</div>` : ze}
              ${this.labels === "caption" ? l`<span class="zone-label">${o}</span>` : ze}
              <slot name=${s}></slot>
            </div>
          `;
    })}
      </div>
    `;
  }
};
W.styles = [
  b,
  h`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: var(--surface-base);
      }

      .grid {
        flex: 1;
        display: grid;
        background: var(--border-default);
        min-height: 0;
      }

      .zone {
        position: relative;
        background: var(--surface-base);
        min-height: 0;
        overflow: auto;
      }

      .zone-label {
        position: absolute;
        top: 2px;
        left: 4px;
        font-size: var(--font-size-caption, 0.6rem);
        color: var(--text-muted);
        opacity: 0.5;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        pointer-events: none;
        z-index: 1;
      }

      .zone-titlebar {
        display: flex;
        align-items: center;
        padding: 0 var(--spacing-sm);
        height: 1.75rem;
        min-height: 1.75rem;
        background: var(--surface-elevated);
        border-bottom: var(--border-width, 1px) solid var(--border-default);
        font-size: var(--font-size-caption, 0.6rem);
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-family: var(--font-mono);
      }

      .zone.has-titlebar {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .zone.has-titlebar slot {
        flex: 1;
        overflow: auto;
        display: block;
      }
    `
];
ye([
  n({ type: String, reflect: !0 })
], W.prototype, "preset", 2);
ye([
  n({ type: String })
], W.prototype, "areas", 2);
ye([
  n({ type: String })
], W.prototype, "gap", 2);
ye([
  n({ type: String })
], W.prototype, "labels", 2);
W = ye([
  f("tui-tiled")
], W);
var cr = Object.defineProperty, dr = Object.getOwnPropertyDescriptor, ae = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? dr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && cr(e, r, o), o;
};
let I = class extends u {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "", this.disabled = !1, this.name = "", this.label = "";
  }
  handleEvent(t) {
    if (t.type === "clear") {
      this.value = "";
      return;
    }
    const e = t.data;
    e.value != null && (this.value = String(e.value)), e.placeholder != null && (this.placeholder = String(e.placeholder)), e.disabled != null && (this.disabled = !!e.disabled), e.label != null && (this.label = String(e.label));
  }
  _onInput(t) {
    const e = t.target;
    this.value = e.value, this.dispatchEvent(new CustomEvent("tui-input", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value }
    }));
  }
  _onChange(t) {
    const e = t.target;
    this.value = e.value, this.dispatchEvent(new CustomEvent("tui-change", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value }
    }));
  }
  render() {
    return l`
      ${this.label ? l`<label>${this.label}</label>` : ""}
      <input
        .value=${this.value}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        @input=${this._onInput}
        @change=${this._onChange}
      />
    `;
  }
};
I.styles = [
  b,
  h`
      :host { display: block; }
      label {
        display: block;
        font-size: var(--font-size-label, 0.75rem);
        color: var(--text-muted);
        margin-bottom: var(--spacing-xs, 0.25rem);
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
      input {
        width: 100%;
        box-sizing: border-box;
        padding: var(--spacing-sm, 0.5rem);
        font-family: inherit;
        font-size: inherit;
        color: var(--text-primary);
        background: var(--surface-base);
        border: var(--border-width, 1px) solid var(--border-default, var(--border, #30363d));
        outline: none;
      }
      input:focus {
        border-color: var(--color-primary);
      }
      input::placeholder {
        color: var(--text-muted);
        font-size: var(--font-size-body, 0.85rem);
      }
      input:disabled {
        opacity: 0.5;
        cursor: default;
      }
    `
];
ae([
  n({ reflect: !0 })
], I.prototype, "value", 2);
ae([
  n()
], I.prototype, "placeholder", 2);
ae([
  n({ type: Boolean, reflect: !0 })
], I.prototype, "disabled", 2);
ae([
  n()
], I.prototype, "name", 2);
ae([
  n()
], I.prototype, "label", 2);
I = ae([
  f("tui-input")
], I);
var pr = Object.defineProperty, hr = Object.getOwnPropertyDescriptor, ne = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? hr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && pr(e, r, o), o;
};
let M = class extends u {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.name = "", this.value = "", this.label = "";
  }
  handleEvent(t) {
    if (t.type === "clear") {
      this.checked = !1;
      return;
    }
    const e = t.data;
    e.checked != null && (this.checked = !!e.checked), e.disabled != null && (this.disabled = !!e.disabled), e.label != null && (this.label = String(e.label));
  }
  _toggle() {
    this.disabled || (this.checked = !this.checked, this.dispatchEvent(new CustomEvent("tui-change", {
      bubbles: !0,
      composed: !0,
      detail: { checked: this.checked, value: this.value, name: this.name }
    })));
  }
  _onKeydown(t) {
    (t.key === " " || t.key === "Enter") && (t.preventDefault(), this._toggle());
  }
  render() {
    return l`
      <div class="checkbox"
           role="checkbox"
           aria-checked="${this.checked}"
           tabindex="${this.disabled ? -1 : 0}"
           @click=${this._toggle}
           @keydown=${this._onKeydown}>
        <span class="glyph">${this.checked ? "▣" : "□"}</span>
        <span class="label"><slot>${this.label}</slot></span>
      </div>
    `;
  }
};
M.styles = [
  b,
  h`
      :host { display: inline-block; }
      :host([disabled]) { pointer-events: none; }
      .checkbox {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm, 0.5rem);
        cursor: pointer;
        user-select: none;
        padding: 2px 0;
      }
      :host([disabled]) .checkbox { cursor: default; }
      .glyph {
        font-size: 1.1em;
        line-height: 1;
        color: var(--text-primary);
        transition: color 0.15s;
      }
      :host([checked]) .glyph {
        color: var(--color-primary);
      }
      :host([disabled]) .glyph {
        color: var(--text-muted);
      }
      .checkbox:hover .glyph {
        color: var(--color-primary);
      }
      :host([disabled]) .checkbox:hover .glyph {
        color: var(--text-muted);
      }
      .label {
        color: var(--text-primary);
      }
      :host([disabled]) .label {
        color: var(--text-muted);
      }
    `
];
ne([
  n({ type: Boolean, reflect: !0 })
], M.prototype, "checked", 2);
ne([
  n({ type: Boolean, reflect: !0 })
], M.prototype, "disabled", 2);
ne([
  n()
], M.prototype, "name", 2);
ne([
  n()
], M.prototype, "value", 2);
ne([
  n()
], M.prototype, "label", 2);
M = ne([
  f("tui-checkbox")
], M);
var ur = Object.defineProperty, fr = Object.getOwnPropertyDescriptor, le = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? fr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && ur(e, r, o), o;
};
let R = class extends u {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.name = "", this.value = "", this.label = "";
  }
  handleEvent(t) {
    if (t.type === "clear") {
      this.checked = !1;
      return;
    }
    const e = t.data;
    e.checked != null && (this.checked = !!e.checked), e.disabled != null && (this.disabled = !!e.disabled), e.label != null && (this.label = String(e.label));
  }
  _select() {
    this.disabled || this.checked || (this.checked = !0, this.dispatchEvent(new CustomEvent("tui-change", {
      bubbles: !0,
      composed: !0,
      detail: { checked: !0, value: this.value, name: this.name }
    })));
  }
  _onKeydown(t) {
    (t.key === " " || t.key === "Enter") && (t.preventDefault(), this._select());
  }
  render() {
    return l`
      <div class="radio"
           role="radio"
           aria-checked="${this.checked}"
           tabindex="${this.disabled ? -1 : 0}"
           @click=${this._select}
           @keydown=${this._onKeydown}>
        <span class="glyph">${this.checked ? "◉" : "◯"}</span>
        <span class="label"><slot>${this.label}</slot></span>
      </div>
    `;
  }
};
R.styles = [
  b,
  h`
      :host { display: inline-block; }
      :host([disabled]) { pointer-events: none; }
      .radio {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm, 0.5rem);
        cursor: pointer;
        user-select: none;
        padding: 2px 0;
      }
      :host([disabled]) .radio { cursor: default; }
      .glyph {
        font-size: 1.1em;
        line-height: 1;
        color: var(--text-primary);
        transition: color 0.15s;
      }
      :host([checked]) .glyph {
        color: var(--color-primary);
      }
      :host([disabled]) .glyph {
        color: var(--text-muted);
      }
      .radio:hover .glyph {
        color: var(--color-primary);
      }
      :host([disabled]) .radio:hover .glyph {
        color: var(--text-muted);
      }
      .label {
        color: var(--text-primary);
      }
      :host([disabled]) .label {
        color: var(--text-muted);
      }
    `
];
le([
  n({ type: Boolean, reflect: !0 })
], R.prototype, "checked", 2);
le([
  n({ type: Boolean, reflect: !0 })
], R.prototype, "disabled", 2);
le([
  n()
], R.prototype, "name", 2);
le([
  n()
], R.prototype, "value", 2);
le([
  n()
], R.prototype, "label", 2);
R = le([
  f("tui-radio")
], R);
var br = Object.defineProperty, mr = Object.getOwnPropertyDescriptor, _e = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? mr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && br(e, r, o), o;
};
let Y = class extends u {
  constructor() {
    super(...arguments), this.name = "", this.label = "", this.disabled = !1, this.value = [];
  }
  _getChildren() {
    var e;
    const t = (e = this.shadowRoot) == null ? void 0 : e.querySelector("slot");
    return t ? t.assignedElements().filter(
      (r) => r.tagName === "TUI-CHECKBOX"
    ) : [];
  }
  _syncChildren() {
    const t = this._getChildren();
    for (const e of t)
      this.name && (e.name = this.name), this.disabled && (e.disabled = !0);
    this._syncValueFromChildren();
  }
  _syncValueFromChildren() {
    const t = this._getChildren();
    this.value = t.filter((e) => e.checked).map((e) => e.value);
  }
  _syncChildrenFromValue() {
    const t = this._getChildren();
    for (const e of t)
      e.checked = this.value.includes(e.value);
  }
  _onSlotChange() {
    this._syncChildren();
  }
  _onChange(t) {
    t.stopPropagation(), this._syncValueFromChildren(), this.dispatchEvent(new CustomEvent("tui-change", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value, name: this.name }
    }));
  }
  handleEvent(t) {
    if (t.type === "clear") {
      this.value = [], this._syncChildrenFromValue();
      return;
    }
    const e = t.data;
    e.value != null && (this.value = e.value, this._syncChildrenFromValue()), e.disabled != null && (this.disabled = !!e.disabled, this._syncChildren());
  }
  render() {
    return l`
      ${this.label ? l`<div class="group-label">${this.label}</div>` : ""}
      <div class="group" @tui-change=${this._onChange}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
};
Y.styles = [
  b,
  h`
      :host { display: block; }
      .group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm, 0.5rem);
      }
      .group-label {
        font-size: 0.8rem;
        color: var(--text-muted);
        margin-bottom: var(--spacing-xs, 0.25rem);
      }
    `
];
_e([
  n()
], Y.prototype, "name", 2);
_e([
  n()
], Y.prototype, "label", 2);
_e([
  n({ type: Boolean, reflect: !0 })
], Y.prototype, "disabled", 2);
_e([
  n({ type: Array })
], Y.prototype, "value", 2);
Y = _e([
  f("tui-checkbox-group")
], Y);
var vr = Object.defineProperty, gr = Object.getOwnPropertyDescriptor, xe = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? gr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && vr(e, r, o), o;
};
let U = class extends u {
  constructor() {
    super(...arguments), this.name = "", this.label = "", this.disabled = !1, this.value = "";
  }
  _getChildren() {
    var e;
    const t = (e = this.shadowRoot) == null ? void 0 : e.querySelector("slot");
    return t ? t.assignedElements().filter(
      (r) => r.tagName === "TUI-RADIO"
    ) : [];
  }
  _syncChildren() {
    const t = this._getChildren();
    for (const e of t)
      this.name && (e.name = this.name), this.disabled && (e.disabled = !0), e.checked = e.value === this.value;
  }
  _onSlotChange() {
    this._syncChildren();
  }
  _onChange(t) {
    t.stopPropagation();
    const e = t.detail;
    this.value = e.value;
    for (const r of this._getChildren())
      r.checked = r.value === this.value;
    this.dispatchEvent(new CustomEvent("tui-change", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value, name: this.name }
    }));
  }
  _onKeydown(t) {
    const e = this._getChildren();
    if (e.length === 0) return;
    const r = e.findIndex((o) => o.value === this.value);
    let s;
    if (t.key === "ArrowDown" || t.key === "ArrowRight")
      t.preventDefault(), s = (r + 1) % e.length;
    else if (t.key === "ArrowUp" || t.key === "ArrowLeft")
      t.preventDefault(), s = (r - 1 + e.length) % e.length;
    else
      return;
    this.value = e[s].value;
    for (const o of e)
      o.checked = o.value === this.value;
    e[s].focus(), this.dispatchEvent(new CustomEvent("tui-change", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value, name: this.name }
    }));
  }
  handleEvent(t) {
    if (t.type === "clear") {
      this.value = "";
      for (const r of this._getChildren())
        r.checked = !1;
      return;
    }
    const e = t.data;
    e.value != null && (this.value = String(e.value), this._syncChildren()), e.disabled != null && (this.disabled = !!e.disabled, this._syncChildren());
  }
  render() {
    return l`
      ${this.label ? l`<div class="group-label">${this.label}</div>` : ""}
      <div class="group" role="radiogroup" @tui-change=${this._onChange} @keydown=${this._onKeydown}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
};
U.styles = [
  b,
  h`
      :host { display: block; }
      .group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm, 0.5rem);
      }
      .group-label {
        font-size: 0.8rem;
        color: var(--text-muted);
        margin-bottom: var(--spacing-xs, 0.25rem);
      }
    `
];
xe([
  n()
], U.prototype, "name", 2);
xe([
  n()
], U.prototype, "label", 2);
xe([
  n({ type: Boolean, reflect: !0 })
], U.prototype, "disabled", 2);
xe([
  n()
], U.prototype, "value", 2);
U = xe([
  f("tui-radio-group")
], U);
var yr = Object.defineProperty, _r = Object.getOwnPropertyDescriptor, we = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? _r(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && yr(e, r, o), o;
};
let X = class extends u {
  constructor() {
    super(...arguments), this.value = 0, this.label = "", this.total = 0, this.current = 0;
  }
  handleEvent(t) {
    if (t.type === "clear") {
      this.value = 0, this.label = "", this.total = 0, this.current = 0;
      return;
    }
    const e = t.data;
    e.value != null && (this.value = e.value), e.label != null && (this.label = e.label), e.total != null && (this.total = e.total), e.current != null && (this.current = e.current);
  }
  get _clampedValue() {
    return Math.max(0, Math.min(1, this.value));
  }
  render() {
    const t = Math.round(this._clampedValue * 100);
    return l`
      <div class="progress">
        <div class="header">
          ${this.label ? l`<span class="label">${this.label}</span>` : ""}
          <span class="stats">
            ${this.total > 0 ? l`<span class="count">${this.current}/${this.total}</span>` : ""}
            <span class="percentage">${t}%</span>
          </span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${t}%"></div>
        </div>
      </div>
    `;
  }
};
X.styles = [
  b,
  h`
      :host { display: block; }
      .progress { padding: var(--spacing-sm); font-size: 0.8rem; }
      .header { display: flex; justify-content: space-between; margin-bottom: var(--spacing-xs); color: var(--text-primary); }
      .label { color: var(--text-primary); }
      .stats { display: flex; gap: var(--spacing-sm); color: var(--text-muted); }
      .bar-track { height: 12px; background: var(--surface-base); border: var(--border-width) solid var(--border-default); overflow: hidden; }
      .bar-fill { height: 100%; background: var(--color-primary); transition: width 0.2s ease; }
    `
];
we([
  n({ type: Number })
], X.prototype, "value", 2);
we([
  n({ type: String })
], X.prototype, "label", 2);
we([
  n({ type: Number })
], X.prototype, "total", 2);
we([
  n({ type: Number })
], X.prototype, "current", 2);
X = we([
  f("tui-progress")
], X);
var xr = Object.defineProperty, wr = Object.getOwnPropertyDescriptor, qe = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? wr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && xr(e, r, o), o;
};
const $r = {
  success: "✓",
  error: "✗",
  warn: "⚠",
  info: "ℹ",
  pending: "…"
};
let fe = class extends u {
  constructor() {
    super(...arguments), this.state = "", this.message = "";
  }
  handleEvent(t) {
    if (t.type === "clear") {
      this.state = "", this.message = "";
      return;
    }
    const e = t.data;
    e.state != null && (this.state = e.state), e.message != null && (this.message = e.message);
  }
  render() {
    return this.state ? l`
      <div class="badge ${this.state}">
        <span class="indicator">${$r[this.state] ?? ""}</span>
        <span class="message">${this.message}</span>
      </div>
    ` : l`<div class="empty">No status</div>`;
  }
};
fe.styles = [
  b,
  h`
      :host { display: block; }
      .badge {
        display: flex; align-items: center; gap: var(--spacing-sm);
        padding: var(--spacing-sm); font-size: 0.8rem;
        border-left: 3px solid transparent;
      }
      .badge.success { border-left-color: var(--color-success); color: var(--color-success); }
      .badge.error { border-left-color: var(--color-error); color: var(--color-error); }
      .badge.warn { border-left-color: var(--color-info); color: var(--color-info); }
      .badge.info { border-left-color: var(--color-primary); color: var(--color-primary); }
      .badge.pending { border-left-color: var(--text-muted); color: var(--text-muted); }
      .indicator { flex-shrink: 0; }
      .message { color: var(--text-primary); }
      .empty { color: var(--text-muted); font-style: italic; padding: var(--spacing-sm); }
    `
];
qe([
  n({ type: String })
], fe.prototype, "state", 2);
qe([
  n({ type: String })
], fe.prototype, "message", 2);
fe = qe([
  f("tui-status")
], fe);
export {
  pe as ActionList,
  E as App,
  Te as BORDER_CHARS,
  w as Button,
  k as Card,
  M as Checkbox,
  Y as CheckboxGroup,
  S as Console,
  I as Input,
  re as Link,
  ke as Menu,
  ee as MenuAction,
  Ne as MenuDivider,
  Q as MenuItem,
  j as Modal,
  A as Output,
  B as Palette,
  v as Panel,
  X as Progress,
  R as Radio,
  U as RadioGroup,
  Sr as STATE_BORDERS,
  G as Sidebar,
  oe as Stat,
  fe as Status,
  te as StatusItem,
  Oe as StatusStrip,
  Pe as Statusbar,
  he as StripItem,
  Z as Table,
  J as Text,
  W as Tiled,
  ue as Titlebar,
  L as Toast,
  N as Tool,
  C as Toolbar,
  z as Workspace,
  Ye as ansiToHtml,
  wt as getBorderChars,
  lr as parseAreas,
  b as sharedStyles,
  Ce as titleDecoration,
  Cr as tuiToast
};
