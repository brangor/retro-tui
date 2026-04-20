import { css as u, LitElement as f, html as c, unsafeCSS as y, svg as te, nothing as Tt } from "lit";
const ue = '.theme-terminal-classic,:root{--color-primary: #00ffff;--color-primary-bg: #002b36;--color-primary-fg: #00ffff;--color-secondary: #00ff00;--color-secondary-bg: #003300;--color-secondary-fg: #00ff00;--color-error: #ff5555;--color-error-bg: #330000;--color-error-fg: #ff5555;--color-warning: #e8691e;--color-warning-bg: #331500;--color-warning-fg: #e8691e;--color-success: #50fa7b;--color-success-bg: #003300;--color-success-fg: #50fa7b;--color-info: #8be9fd;--color-info-bg: #002233;--color-info-fg: #8be9fd;--surface-base: #0a0a0a;--surface-elevated: #1a1a1a;--surface-overlay: #2a2a2a;--text-primary: #e0e0e0;--text-muted: #666666;--border-default: #333333;--border-width: 1px;--border-radius: 0px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}.theme-vibrant-scifi{--color-primary: #ff00ff;--color-primary-bg: #ff00ff;--color-primary-fg: #000000;--color-secondary: #00ffcc;--color-secondary-bg: #00ffcc;--color-secondary-fg: #000000;--color-error: #ff3366;--color-error-bg: #ff3366;--color-error-fg: #ffffff;--color-warning: #ff6622;--color-warning-bg: #ff6622;--color-warning-fg: #000000;--color-success: #00ff66;--color-success-bg: #00ff66;--color-success-fg: #000000;--color-info: #6666ff;--color-info-bg: #6666ff;--color-info-fg: #ffffff;--surface-base: #0d0d1a;--surface-elevated: #1a1a2e;--surface-overlay: #2a2a4a;--text-primary: #ffffff;--text-muted: #8888aa;--border-default: #4a4a6a;--border-width: 2px;--border-radius: 2px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}html,body{background:var(--surface-base);color:var(--text-primary);font-family:var(--font-mono);color-scheme:dark}.theme-home-security-interface{--color-primary: #3fb950;--color-primary-bg: #002b36;--color-primary-fg: #3fb950;--color-secondary: #00ff00;--color-secondary-bg: #003300;--color-secondary-fg: #00ff00;--color-error: #ff5555;--color-error-bg: #330000;--color-error-fg: #ff5555;--color-warning: #e8691e;--color-warning-bg: #331500;--color-warning-fg: #e8691e;--color-success: #3fb950;--color-success-bg: #003300;--color-success-fg: #3fb950;--color-info: #8be9fd;--color-info-bg: #002233;--color-info-fg: #8be9fd;--surface-base: #111;--surface-elevated: #1a1a1a;--surface-overlay: #2a2a2a;--text-primary: #e0e0e0;--text-muted: #666666;--border-default: #3fb950;--border-width: 3px;--border-radius: 0px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}', ee = "__retro_tui_tokens__";
if (typeof document < "u" && !document[ee]) {
  const e = document.createElement("style");
  e.textContent = ue, (document.head || document.documentElement).appendChild(e);
  const t = document.documentElement;
  t.style.setProperty("color", "var(--text-primary)"), t.style.setProperty("background", "var(--surface-base)"), t.style.setProperty("font-family", "var(--font-mono)"), t.style.setProperty("color-scheme", "dark"), document[ee] = !0;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const g = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mt = globalThis, Gt = Mt.ShadowRoot && (Mt.ShadyCSS === void 0 || Mt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pe = Symbol(), re = /* @__PURE__ */ new WeakMap();
let fe = class {
  constructor(t, r, s) {
    if (this._$cssResult$ = !0, s !== pe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Gt && t === void 0) {
      const s = r !== void 0 && r.length === 1;
      s && (t = re.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && re.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ge = (e) => new fe(typeof e == "string" ? e : e + "", void 0, pe), ve = (e, t) => {
  if (Gt) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const s = document.createElement("style"), o = Mt.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = r.cssText, e.appendChild(s);
  }
}, oe = Gt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const s of t.cssRules) r += s.cssText;
  return ge(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: be, defineProperty: me, getOwnPropertyDescriptor: ye, getOwnPropertyNames: _e, getOwnPropertySymbols: xe, getPrototypeOf: we } = Object, X = globalThis, se = X.trustedTypes, $e = se ? se.emptyScript : "", Ut = X.reactiveElementPolyfillSupport, mt = (e, t) => e, Ht = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? $e : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, Vt = (e, t) => !be(e, t), ie = { attribute: !0, type: String, converter: Ht, reflect: !1, useDefault: !1, hasChanged: Vt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), X.litPropertyMetadata ?? (X.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class bt extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = ie) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, r);
      o !== void 0 && me(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, r, s) {
    const { get: o, set: i } = ye(this.prototype, t) ?? { get() {
      return this[r];
    }, set(a) {
      this[r] = a;
    } };
    return { get: o, set(a) {
      const l = o == null ? void 0 : o.call(this);
      i == null || i.call(this, a), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ie;
  }
  static _$Ei() {
    if (this.hasOwnProperty(mt("elementProperties"))) return;
    const t = we(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(mt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(mt("properties"))) {
      const r = this.properties, s = [..._e(r), ...xe(r)];
      for (const o of s) this.createProperty(o, r[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [s, o] of r) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, s] of this.elementProperties) {
      const o = this._$Eu(r, s);
      o !== void 0 && this._$Eh.set(o, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const o of s) r.unshift(oe(o));
    } else t !== void 0 && r.push(oe(t));
    return r;
  }
  static _$Eu(t, r) {
    const s = r.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((r) => r(this));
  }
  addController(t) {
    var r;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((r = t.hostConnected) == null || r.call(t));
  }
  removeController(t) {
    var r;
    (r = this._$EO) == null || r.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const s of r.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ve(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((r) => {
      var s;
      return (s = r.hostConnected) == null ? void 0 : s.call(r);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var s;
      return (s = r.hostDisconnected) == null ? void 0 : s.call(r);
    });
  }
  attributeChangedCallback(t, r, s) {
    this._$AK(t, s);
  }
  _$ET(t, r) {
    var i;
    const s = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const a = (((i = s.converter) == null ? void 0 : i.toAttribute) !== void 0 ? s.converter : Ht).toAttribute(r, s.type);
      this._$Em = t, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var i, a;
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const l = s.getPropertyOptions(o), h = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((i = l.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? l.converter : Ht;
      this._$Em = o;
      const d = h.fromAttribute(r, l.type);
      this[o] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, r, s, o = !1, i) {
    var a;
    if (t !== void 0) {
      const l = this.constructor;
      if (o === !1 && (i = this[t]), s ?? (s = l.getPropertyOptions(t)), !((s.hasChanged ?? Vt)(i, r) || s.useDefault && s.reflect && i === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(l._$Eu(t, s)))) return;
      this.C(t, r, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: s, reflect: o, wrapped: i }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? r ?? this[t]), i !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (r = void 0), this._$AL.set(t, r)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
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
        const { wrapped: l } = a, h = this[i];
        l !== !0 || this._$AL.has(i) || h === void 0 || this.C(i, void 0, a, h);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), (s = this._$EO) == null || s.forEach((o) => {
        var i;
        return (i = o.hostUpdate) == null ? void 0 : i.call(o);
      }), this.update(r)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var r;
    (r = this._$EO) == null || r.forEach((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((r) => this._$ET(r, this[r]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
bt.elementStyles = [], bt.shadowRootOptions = { mode: "open" }, bt[mt("elementProperties")] = /* @__PURE__ */ new Map(), bt[mt("finalized")] = /* @__PURE__ */ new Map(), Ut == null || Ut({ ReactiveElement: bt }), (X.reactiveElementVersions ?? (X.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ze = { attribute: !0, type: String, converter: Ht, reflect: !1, hasChanged: Vt }, Se = (e = ze, t, r) => {
  const { kind: s, metadata: o } = r;
  let i = globalThis.litPropertyMetadata.get(o);
  if (i === void 0 && globalThis.litPropertyMetadata.set(o, i = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), i.set(r.name, e), s === "accessor") {
    const { name: a } = r;
    return { set(l) {
      const h = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(a, h, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(a, void 0, e, l), l;
    } };
  }
  if (s === "setter") {
    const { name: a } = r;
    return function(l) {
      const h = this[a];
      t.call(this, l), this.requestUpdate(a, h, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function n(e) {
  return (t, r) => typeof r == "object" ? Se(e, t, r) : ((s, o, i) => {
    const a = o.hasOwnProperty(i);
    return o.constructor.createProperty(i, s), a ? Object.getOwnPropertyDescriptor(o, i) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _(e) {
  return n({ ...e, state: !0, attribute: !1 });
}
const v = u`
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
var Ee = Object.defineProperty, Ce = Object.getOwnPropertyDescriptor, tt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Ce(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Ee(t, r, o), o;
};
let T = class extends f {
  constructor() {
    super(...arguments), this.title = "TUI", this.subtitle = "", this.compact = !1, this.decorations = "full", this._focusContext = "workspace", this._menuOpen = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("mousedown", () => this.classList.add("using-mouse")), this.addEventListener("keydown", (e) => {
      e.key === "Tab" && this.classList.remove("using-mouse"), this._handleGlobalKeydown(e);
    });
  }
  _handleGlobalKeydown(e) {
    if (e.key === "Escape") {
      this._menuOpen && (this._menuOpen = !1, e.preventDefault());
      return;
    }
    e.key === "Tab" && !e.ctrlKey && e.altKey;
  }
  render() {
    const e = this.subtitle ? c`░░ ${this.title} <span>[ ${this.subtitle} ]</span> ░░` : c`░░ ${this.title} ░░`;
    return c`
      <header class="header">
        <div class="header__top">
          <h1 class="header__title">
            <slot name="header">${e}</slot>
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
T.styles = [
  v,
  u`
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
tt([
  n({ type: String, reflect: !0 })
], T.prototype, "title", 2);
tt([
  n({ type: String, reflect: !0 })
], T.prototype, "subtitle", 2);
tt([
  n({ type: Boolean, reflect: !0 })
], T.prototype, "compact", 2);
tt([
  n({ type: String, reflect: !0 })
], T.prototype, "decorations", 2);
tt([
  _()
], T.prototype, "_focusContext", 2);
tt([
  _()
], T.prototype, "_menuOpen", 2);
T = tt([
  g("tui-app")
], T);
var Pe = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, Ft = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? ke(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Pe(t, r, o), o;
};
let D = class extends f {
  constructor() {
    super(...arguments), this._bounds = new DOMRect(), this._snapPreview = null, this._resizeObserver = null, this._handlePanelMove = (e) => {
      const t = e.target;
      if (!t.hasAttribute("floating")) return;
      const { x: r, y: s } = e.detail, o = t.panelWidth ?? t.offsetWidth ?? 100, i = t.panelHeight ?? t.offsetHeight ?? 100, a = this._detectSnapEdge(r, s, o, i);
      if (this._snapPreview = a, this._bounds.width > 0 && this._bounds.height > 0) {
        const l = this._bounds.width - o, h = this._bounds.height - i;
        if (l > 0 && h > 0) {
          const d = Math.max(0, Math.min(r, l)), p = Math.max(0, Math.min(s, h));
          (d !== r || p !== s) && (t.positionX = d, t.positionY = p);
        }
      }
    }, this._handlePanelDragEnd = (e) => {
      const t = e.target;
      if (t) {
        if (this._snapPreview) {
          const r = this._snapPreview, s = t.panelWidth ?? t.offsetWidth ?? 100;
          switch (t.panelHeight ?? t.offsetHeight, r) {
            case "left":
              t.positionX = 0;
              break;
            case "right":
              t.positionX = this._bounds.width - s;
              break;
            case "top":
              t.positionY = 0;
              break;
          }
          t.snapEdge = r;
        } else
          t.snapEdge = "";
        this._snapPreview = null, this._emitLayoutChange();
      }
    }, this._handlePanelResize = (e) => {
      const t = e.target;
      if (!t.hasAttribute("resizable")) return;
      const { width: r, height: s } = e.detail, o = t.positionX ?? 0, i = t.positionY ?? 0, a = this._bounds.width - o, l = this._bounds.height - i, h = Math.min(r, a), d = Math.min(s, l);
      h !== r && (t.panelWidth = h), d !== s && (t.panelHeight = d), this._emitLayoutChange();
    }, this._handlePanelDismiss = (e) => {
      this._emitLayoutChange();
    }, this._handlePanelMinimize = (e) => {
      requestAnimationFrame(() => {
        this._reflowMinimizedTabs();
      });
    }, this._handlePanelRestore = (e) => {
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
    const e = [], t = this._getFloatingPanels();
    for (const r of t)
      e.push({
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
    return e;
  }
  connectedCallback() {
    super.connectedCallback(), typeof ResizeObserver < "u" ? (this._resizeObserver = new ResizeObserver((e) => {
      for (const t of e)
        this._bounds = t.contentRect, this.dispatchEvent(new CustomEvent("bounds-change", {
          detail: { bounds: this._bounds },
          bubbles: !0,
          composed: !0
        }));
    }), this._resizeObserver.observe(this)) : this._bounds = new DOMRect(0, 0, this.offsetWidth || 800, this.offsetHeight || 600), this.addEventListener("panel-move", this._handlePanelMove), this.addEventListener("panel-resize", this._handlePanelResize), this.addEventListener("panel-dismiss", this._handlePanelDismiss), this.addEventListener("panel-drag-end", this._handlePanelDragEnd), this.addEventListener("panel-minimize", this._handlePanelMinimize), this.addEventListener("panel-restore", this._handlePanelRestore);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._resizeObserver) == null || e.disconnect(), this.removeEventListener("panel-move", this._handlePanelMove), this.removeEventListener("panel-resize", this._handlePanelResize), this.removeEventListener("panel-dismiss", this._handlePanelDismiss), this.removeEventListener("panel-drag-end", this._handlePanelDragEnd), this.removeEventListener("panel-minimize", this._handlePanelMinimize), this.removeEventListener("panel-restore", this._handlePanelRestore);
  }
  _detectSnapEdge(e, t, r, s) {
    const o = this._bounds;
    return e <= D.SNAP_ZONE ? "left" : e + r >= o.width - D.SNAP_ZONE ? "right" : t <= D.SNAP_ZONE ? "top" : null;
  }
  /**
   * Stack minimized tabs vertically on each edge
   */
  _reflowMinimizedTabs() {
    const e = this._getFloatingPanels(), t = 4, r = [], s = [];
    for (const i of e) {
      if (!i.minimized) continue;
      (i.snapEdge || "left") === "right" ? s.push(i) : r.push(i);
    }
    let o = t;
    for (const i of r) {
      i.positionY = o;
      const a = i.offsetHeight || 80;
      o += a + t;
    }
    o = t;
    for (const i of s) {
      i.positionY = o;
      const a = i.offsetHeight || 80;
      o += a + t;
    }
  }
  _emitLayoutChange() {
    const t = this._getFloatingPanels().map((r) => ({
      id: r.id || r.title,
      x: r.positionX,
      y: r.positionY,
      width: r.panelWidth ?? r.offsetWidth,
      height: r.panelHeight ?? r.offsetHeight
    }));
    this.dispatchEvent(new CustomEvent("layout-change", {
      detail: { panels: t, bounds: this._bounds },
      bubbles: !0,
      composed: !0
    }));
  }
  _getFloatingPanels() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector('slot[name="floating"]');
    return e ? e.assignedElements() : [];
  }
  _constrainAllPanels() {
    if (this._bounds.width <= 0 || this._bounds.height <= 0) return;
    const e = this._getFloatingPanels();
    for (const t of e) {
      if (!t.hasAttribute("floating")) continue;
      const r = t.positionX ?? 0, s = t.positionY ?? 0, o = t.panelWidth ?? t.offsetWidth ?? 100, i = t.panelHeight ?? t.offsetHeight ?? 100, a = this._bounds.width - o, l = this._bounds.height - i;
      if (a < 0 || l < 0) continue;
      const h = Math.max(0, Math.min(r, a)), d = Math.max(0, Math.min(s, l));
      h !== r && (t.positionX = h), d !== s && (t.positionY = d);
    }
  }
  _onFloatingSlotChange() {
    requestAnimationFrame(() => {
      this._constrainAllPanels(), this._reflowMinimizedTabs();
    });
  }
  render() {
    return c`
      <div class="workspace">
        <div class="main-area">
          <slot name="main"></slot>
        </div>
        <div class="floating-layer">
          <slot name="floating" @slotchange=${this._onFloatingSlotChange}></slot>
        </div>
        ${this._snapPreview ? c`
          <div class="snap-preview ${this._snapPreview}"></div>
        ` : ""}
      </div>
    `;
  }
};
D.SNAP_ZONE = 20;
D.styles = [
  v,
  u`
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
Ft([
  _()
], D.prototype, "_bounds", 2);
Ft([
  _()
], D.prototype, "_snapPreview", 2);
D = Ft([
  g("tui-workspace")
], D);
var Oe = Object.defineProperty, De = Object.getOwnPropertyDescriptor, Lt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? De(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Oe(t, r, o), o;
};
let ot = class extends f {
  constructor() {
    super(...arguments), this.side = "left", this.size = 200, this._dropIndex = null;
  }
  /**
   * Get all panel elements in this sidebar
   */
  _getPanels() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("slot");
    return e ? e.assignedElements().filter((r) => r.tagName.toLowerCase() === "tui-panel") : [];
  }
  /**
   * Calculate drop index based on cursor Y position
   */
  calculateDropIndex(e) {
    const t = this._getPanels();
    for (let r = 0; r < t.length; r++) {
      const s = t[r].getBoundingClientRect(), o = s.top + s.height / 2;
      if (e < o)
        return r;
    }
    return t.length;
  }
  /**
   * Show drop indicator at specified index
   */
  showDropIndicator(e) {
    this._dropIndex = e;
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
  insertPanelAt(e, t) {
    const s = this._getPanels().indexOf(e);
    let o = t;
    s !== -1 && s < t && (o = t - 1), s !== -1 && e.remove();
    const i = this._getPanels();
    e.setAttribute("docked", this.side), o >= i.length ? this.appendChild(e) : this.insertBefore(e, i[o]), this.hideDropIndicator();
  }
  /**
   * Get the top position for the drop indicator
   */
  _getDropIndicatorTop() {
    var s, o, i, a;
    const e = this._getPanels();
    if (this._dropIndex === null || this._dropIndex === 0)
      return 0;
    if (this._dropIndex >= e.length) {
      const l = e[e.length - 1];
      if (l) {
        const h = (o = (s = this.shadowRoot) == null ? void 0 : s.querySelector(".content")) == null ? void 0 : o.getBoundingClientRect(), d = l.getBoundingClientRect();
        if (h)
          return d.bottom - h.top;
      }
      return 0;
    }
    const t = e[this._dropIndex], r = (a = (i = this.shadowRoot) == null ? void 0 : i.querySelector(".content")) == null ? void 0 : a.getBoundingClientRect();
    return t && r ? t.getBoundingClientRect().top - r.top - 2 : 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.side === "left" || this.side === "right" ? this.style.width = `${this.size}px` : this.style.height = `${this.size}px`;
  }
  updated(e) {
    e.has("size") && (this.side === "left" || this.side === "right" ? this.style.width = `${this.size}px` : this.style.height = `${this.size}px`);
  }
  render() {
    return c`
      <div class="content">
        <slot></slot>
        ${this._dropIndex !== null ? c`
          <div class="drop-indicator" style="top: ${this._getDropIndicatorTop()}px"></div>
        ` : ""}
      </div>
    `;
  }
};
ot.styles = [
  v,
  u`
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
Lt([
  n({ type: String, reflect: !0 })
], ot.prototype, "side", 2);
Lt([
  n({ type: Number })
], ot.prototype, "size", 2);
Lt([
  _()
], ot.prototype, "_dropIndex", 2);
ot = Lt([
  g("tui-sidebar")
], ot);
const Xt = {
  single: { tl: "┌", tr: "┐", bl: "└", br: "┘", h: "─", v: "│" },
  heavy: { tl: "┏", tr: "┓", bl: "┗", br: "┛", h: "━", v: "┃" },
  double: { tl: "╔", tr: "╗", bl: "╚", br: "╝", h: "═", v: "║" },
  rounded: { tl: "╭", tr: "╮", bl: "╰", br: "╯", h: "─", v: "│" }
};
function Te(e) {
  return e === "none" ? null : Xt[e];
}
function Rt(e) {
  const t = Te(e);
  return t ? {
    before: `${t.tl}${t.h} `,
    after: ` ${t.h}${t.tr}`
  } : { before: "", after: "" };
}
const Kr = {
  neutral: "single",
  hover: "heavy",
  selected: "double"
};
var Me = Object.defineProperty, He = Object.getOwnPropertyDescriptor, m = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? He(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Me(t, r, o), o;
};
let b = class extends f {
  constructor() {
    super(...arguments), this.title = "", this.color = "", this.border = "single", this.variant = "bright", this.selectionStyle = "", this.collapsible = !1, this.collapsed = !1, this.selected = !1, this.active = !1, this.persistId = "", this.dismissable = !1, this.full = !1, this.floating = !1, this.snapEdge = "", this.positionX = 0, this.positionY = 0, this.resizable = !1, this.minimized = !1, this.panelWidth = null, this.panelHeight = null, this.maxWidth = null, this.maxHeight = null, this.minWidth = 150, this.minHeight = 100, this.docked = "", this._isDragging = !1, this._dragStartX = 0, this._dragStartY = 0, this._dragOffsetX = 0, this._dragOffsetY = 0, this._isResizing = !1, this._resizeStartX = 0, this._resizeStartY = 0, this._resizeStartWidth = 0, this._resizeStartHeight = 0, this._preMinimizeX = 0, this._preMinimizeY = 0, this._preMinimizeWidth = null, this._preMinimizeHeight = null, this._handleClick = () => {
      this.dispatchEvent(new CustomEvent("focus-request", {
        bubbles: !0,
        composed: !0,
        detail: { panel: this }
      }));
    }, this._onEdgeTabClick = () => {
      this.restore();
    }, this._onDragStart = (e) => {
      if (!this.floating) return;
      const t = e.target;
      t.closest(".collapse-btn") || t.closest(".dismiss-btn") || (e.preventDefault(), this._isDragging = !0, this._dragStartX = e.clientX, this._dragStartY = e.clientY, this._dragOffsetX = this.positionX, this._dragOffsetY = this.positionY, document.addEventListener("pointermove", this._onDragMove), document.addEventListener("pointerup", this._onDragEnd));
    }, this._onDragMove = (e) => {
      if (!this._isDragging) return;
      const t = e.clientX - this._dragStartX, r = e.clientY - this._dragStartY;
      this.positionX = this._dragOffsetX + t, this.positionY = this._dragOffsetY + r, this.dispatchEvent(new CustomEvent("panel-move", {
        detail: {
          panelId: this.id || this.title,
          x: this.positionX,
          y: this.positionY,
          cursorY: e.clientY
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
    }, this._onResizeStart = (e) => {
      this.resizable && (e.preventDefault(), e.stopPropagation(), this._isResizing = !0, this._resizeStartX = e.clientX, this._resizeStartY = e.clientY, this._resizeStartWidth = this.panelWidth ?? this.offsetWidth, this._resizeStartHeight = this.panelHeight ?? this.offsetHeight, document.addEventListener("pointermove", this._onResizeMove), document.addEventListener("pointerup", this._onResizeEnd));
    }, this._onResizeMove = (e) => {
      if (!this._isResizing) return;
      const t = e.clientX - this._resizeStartX, r = e.clientY - this._resizeStartY;
      let s = this._resizeStartWidth + t, o = this._resizeStartHeight + r;
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
    }, this._onCollapseClick = (e) => {
      e.stopPropagation(), this.toggle();
    }, this._onDismissClick = (e) => {
      e.stopPropagation(), this.dismiss();
    };
  }
  connectedCallback() {
    if (super.connectedCallback(), this.persistId) {
      const e = localStorage.getItem(`tui-panel-${this.persistId}`);
      e !== null && (this.collapsed = e === "true");
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
    const e = new CustomEvent("panel-dismiss", {
      detail: { panelId: this.id || this.title },
      bubbles: !0,
      composed: !0,
      cancelable: !0
    });
    this.dispatchEvent(e) && (this.hidden = !0);
  }
  /**
   * Minimize panel to edge tab
   */
  minimize() {
    if (!this.minimized) {
      if (this._preMinimizeX = this.positionX, this._preMinimizeY = this.positionY, this._preMinimizeWidth = this.panelWidth, this._preMinimizeHeight = this.panelHeight, this.snapEdge || (this.snapEdge = "left"), this.minimized = !0, this.persistId) {
        const e = {
          minimized: !0,
          preMinimize: {
            x: this._preMinimizeX,
            y: this._preMinimizeY,
            width: this._preMinimizeWidth,
            height: this._preMinimizeHeight
          },
          snapEdge: this.snapEdge
        };
        localStorage.setItem(`tui-panel-memory-${this.persistId}`, JSON.stringify(e));
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
        const e = {
          minimized: !1,
          x: this.positionX,
          y: this.positionY,
          width: this.panelWidth,
          height: this.panelHeight,
          collapsed: this.collapsed,
          snapEdge: this.snapEdge
        };
        localStorage.setItem(`tui-panel-memory-${this.persistId}`, JSON.stringify(e));
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
    var t, r, s, o;
    if (!this.persistId) return !1;
    const e = localStorage.getItem(`tui-panel-memory-${this.persistId}`);
    if (!e) return !1;
    try {
      const i = JSON.parse(e);
      return i.minimized ? (this._preMinimizeX = ((t = i.preMinimize) == null ? void 0 : t.x) ?? 0, this._preMinimizeY = ((r = i.preMinimize) == null ? void 0 : r.y) ?? 0, this._preMinimizeWidth = ((s = i.preMinimize) == null ? void 0 : s.width) ?? null, this._preMinimizeHeight = ((o = i.preMinimize) == null ? void 0 : o.height) ?? null, this.snapEdge = i.snapEdge || "left", this.minimized = !0, !0) : (i.x !== void 0 && (this.positionX = i.x), i.y !== void 0 && (this.positionY = i.y), i.width !== void 0 && (this.panelWidth = i.width), i.height !== void 0 && (this.panelHeight = i.height), i.collapsed !== void 0 && (this.collapsed = i.collapsed), i.snapEdge !== void 0 && (this.snapEdge = i.snapEdge), !0);
    } catch (i) {
      return console.warn(`[tui-panel] Failed to restore position for ${this.persistId}:`, i), !1;
    }
  }
  firstUpdated() {
    this.minimized && this.floating && (this._preMinimizeX = this.positionX, this._preMinimizeY = this.positionY, this.snapEdge || (this.snapEdge = "left")), this.floating && !this.minimized && (this.style.left = `${this.positionX}px`, this.style.top = `${this.positionY}px`);
  }
  willUpdate(e) {
    this.full && this.floating && (this.floating = !1);
  }
  updated(e) {
    if (this.minimized) {
      this.snapEdge === "right" ? (this.style.left = "auto", this.style.right = "0") : (this.style.left = "0", this.style.right = "auto"), this.style.top = `${this.positionY}px`, this.style.width = "", this.style.height = "", this.style.minWidth = "", this.style.minHeight = "";
      return;
    }
    this.floating && (e.has("positionX") || e.has("positionY") || e.has("floating") || e.has("minimized")) && (this.style.left = `${this.positionX}px`, this.style.top = `${this.positionY}px`, this.style.right = "auto"), e.has("panelWidth") && this.panelWidth !== null && (this.style.width = `${this.panelWidth}px`), (e.has("panelHeight") || e.has("collapsed")) && (this.collapsed ? this.style.height = "" : this.panelHeight !== null && (this.style.height = `${this.panelHeight}px`)), e.has("maxWidth") && this.maxWidth !== null && (this.style.maxWidth = `${this.maxWidth}px`), e.has("maxHeight") && this.maxHeight !== null && (this.style.maxHeight = `${this.maxHeight}px`), e.has("minWidth") && (this.style.minWidth = `${this.minWidth}px`), e.has("minHeight") && !this.collapsed ? this.style.minHeight = `${this.minHeight}px` : this.collapsed && e.has("collapsed") && (this.style.minHeight = "");
  }
  render() {
    return this.minimized ? c`
        <div class="edge-tab" @click=${this._onEdgeTabClick} title="Click to restore ${this.title}">
          ${this.title}
        </div>
      ` : c`
      <div class="panel ${this.collapsed ? "collapsed" : ""}">
        <div
          class="header ${this.floating && !this.full ? "draggable" : ""}"
          @pointerdown=${this.floating && !this.full ? this._onDragStart : void 0}
        >
          <span class="title"><span class="title-decor">${Rt(this.border).before}</span>${this.title}<span class="title-decor">${Rt(this.border).after}</span></span>
          <div class="header-controls">
            ${this.collapsible ? c`
              <button class="collapse-btn" aria-label="Toggle panel" @click=${this._onCollapseClick}>
                ${this.collapsed ? "▸" : "▾"}
              </button>
            ` : ""}
            ${this.dismissable ? c`
              <button class="dismiss-btn" aria-label="Minimize panel" @click=${this._onDismissClick}>−</button>
            ` : ""}
          </div>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        ${this.resizable && this.floating && !this.full ? c`
          <div class="resize-handle" @pointerdown=${this._onResizeStart}></div>
        ` : ""}
      </div>
    `;
  }
};
b.styles = [
  v,
  u`
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
m([
  n({ type: String })
], b.prototype, "title", 2);
m([
  n({ type: String })
], b.prototype, "color", 2);
m([
  n({ type: String, reflect: !0 })
], b.prototype, "border", 2);
m([
  n({ type: String, reflect: !0 })
], b.prototype, "variant", 2);
m([
  n({ type: String, attribute: "selection-style", reflect: !0 })
], b.prototype, "selectionStyle", 2);
m([
  n({ type: Boolean })
], b.prototype, "collapsible", 2);
m([
  n({ type: Boolean, reflect: !0 })
], b.prototype, "collapsed", 2);
m([
  n({ type: Boolean, reflect: !0 })
], b.prototype, "selected", 2);
m([
  n({ type: Boolean, reflect: !0 })
], b.prototype, "active", 2);
m([
  n({ type: String, attribute: "persist-id" })
], b.prototype, "persistId", 2);
m([
  n({ type: Boolean, reflect: !0 })
], b.prototype, "dismissable", 2);
m([
  n({ type: Boolean, reflect: !0 })
], b.prototype, "full", 2);
m([
  n({ type: Boolean, reflect: !0 })
], b.prototype, "floating", 2);
m([
  n({ type: String, attribute: "snap-edge", reflect: !0 })
], b.prototype, "snapEdge", 2);
m([
  n({ type: Number, attribute: "position-x" })
], b.prototype, "positionX", 2);
m([
  n({ type: Number, attribute: "position-y" })
], b.prototype, "positionY", 2);
m([
  n({ type: Boolean, reflect: !0 })
], b.prototype, "resizable", 2);
m([
  n({ type: Boolean, reflect: !0 })
], b.prototype, "minimized", 2);
m([
  n({ type: Number, attribute: "panel-width" })
], b.prototype, "panelWidth", 2);
m([
  n({ type: Number, attribute: "panel-height" })
], b.prototype, "panelHeight", 2);
m([
  n({ type: Number, attribute: "max-width" })
], b.prototype, "maxWidth", 2);
m([
  n({ type: Number, attribute: "max-height" })
], b.prototype, "maxHeight", 2);
m([
  n({ type: Number, attribute: "min-width" })
], b.prototype, "minWidth", 2);
m([
  n({ type: Number, attribute: "min-height" })
], b.prototype, "minHeight", 2);
m([
  n({
    type: String,
    reflect: !0,
    converter: {
      fromAttribute: (e) => e || "",
      toAttribute: (e) => e || null
      // Don't reflect empty string
    }
  })
], b.prototype, "docked", 2);
b = m([
  g("tui-panel")
], b);
const ae = {
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
}, ne = {
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
}, le = {
  1: "bold",
  2: "dim",
  3: "italic",
  4: "underline",
  7: "reverse",
  9: "strikethrough"
};
function ce(e) {
  const t = ["#000000", "#aa0000", "#00aa00", "#aa5500", "#0000aa", "#aa00aa", "#00aaaa", "#aaaaaa"], r = ["#555555", "#ff5555", "#55ff55", "#ffff55", "#5555ff", "#ff55ff", "#55ffff", "#ffffff"];
  if (e < 8) return t[e];
  if (e < 16) return r[e - 8];
  if (e < 232) {
    const i = e - 16, a = Math.floor(i / 36), l = Math.floor(i % 36 / 6), h = i % 6, d = (p) => (p === 0 ? 0 : 55 + p * 40).toString(16).padStart(2, "0");
    return `#${d(a)}${d(l)}${d(h)}`;
  }
  const o = (8 + (e - 232) * 10).toString(16).padStart(2, "0");
  return `#${o}${o}${o}`;
}
function Kt(e) {
  if (!e) return "";
  let t = e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const r = /\x1b\[([0-9;]+)m/g;
  let s = "", o = 0, i = [], a;
  for (; (a = r.exec(t)) !== null; ) {
    s += t.slice(o, a.index), o = a.index + a[0].length;
    const l = a[1].split(";").map(Number);
    for (let h = 0; h < l.length; h++) {
      const d = l[h];
      if (d === 0)
        s += i.map(() => "</span>").join(""), i = [];
      else if (d === 38 && l[h + 1] === 5 && l[h + 2] !== void 0) {
        const p = ce(l[h + 2]);
        s += `<span style="color: ${p}">`, i.push("256fg"), h += 2;
      } else if (d === 48 && l[h + 1] === 5 && l[h + 2] !== void 0) {
        const p = ce(l[h + 2]);
        s += `<span style="background-color: ${p}">`, i.push("256bg"), h += 2;
      } else if (d === 38 && l[h + 1] === 2 && l.length > h + 4) {
        const p = l[h + 2], x = l[h + 3], w = l[h + 4];
        s += `<span style="color: rgb(${p},${x},${w})">`, i.push("tcfg"), h += 4;
      } else if (d === 48 && l[h + 1] === 2 && l.length > h + 4) {
        const p = l[h + 2], x = l[h + 3], w = l[h + 4];
        s += `<span style="background-color: rgb(${p},${x},${w})">`, i.push("tcbg"), h += 4;
      } else if (ae[d]) {
        const p = `ansi-${ae[d]}`;
        s += `<span class="${p}">`, i.push(p);
      } else if (ne[d]) {
        const p = `ansi-bg-${ne[d]}`;
        s += `<span class="${p}">`, i.push(p);
      } else if (le[d]) {
        const p = `ansi-${le[d]}`;
        s += `<span class="${p}">`, i.push(p);
      }
    }
  }
  return s += t.slice(o), s += i.map(() => "</span>").join(""), s;
}
var Re = Object.defineProperty, Ie = Object.getOwnPropertyDescriptor, dt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Ie(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Re(t, r, o), o;
};
let Y = class extends f {
  constructor() {
    super(...arguments), this.maxLines = 500, this.autoscroll = !0, this.timestamps = !1, this.attr = "", this._lines = [];
  }
  /**
   * Append a line of text (supports ANSI codes)
   * @param text - Text to append
   */
  append(e) {
    const t = this.timestamps ? (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: !1 }) : null, r = e.split(`
`).map((s) => ({
      id: Date.now() + Math.random(),
      text: s,
      html: Kt(s),
      timestamp: t
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
  handleEvent(e) {
    if (e.type === "clear") {
      this.clear();
      return;
    }
    const t = e.data;
    t.message != null && this.append(t.message);
  }
  /** Check if the user is scrolled near the bottom (within 1 line height) */
  _isNearBottom() {
    var r;
    const e = (r = this.shadowRoot) == null ? void 0 : r.querySelector(".output");
    return e ? e.scrollHeight - e.scrollTop - e.clientHeight < 30 : !0;
  }
  scrollToBottom() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".output");
    e && (e.scrollTop = e.scrollHeight);
  }
  get _attrClasses() {
    return this.attr.split(/\s+/).filter(Boolean).map((e) => `tui-${e}`).join(" ");
  }
  render() {
    return c`
      <div class="output ${this._attrClasses}">
        ${this._lines.length === 0 ? c`<div class="empty">Waiting for output...</div>` : this._lines.map((e) => c`
              <div class="line">
                ${e.timestamp ? c`<span class="timestamp">[${e.timestamp}]</span>` : ""}
                <span .innerHTML=${e.html}></span>
              </div>
            `)}
      </div>
    `;
  }
};
Y.styles = [
  v,
  u`
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
dt([
  n({ type: Number, attribute: "max-lines" })
], Y.prototype, "maxLines", 2);
dt([
  n({ type: Boolean })
], Y.prototype, "autoscroll", 2);
dt([
  n({ type: Boolean })
], Y.prototype, "timestamps", 2);
dt([
  n({ type: String })
], Y.prototype, "attr", 2);
dt([
  _()
], Y.prototype, "_lines", 2);
Y = dt([
  g("tui-output")
], Y);
var je = Object.defineProperty, Ae = Object.getOwnPropertyDescriptor, Yt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Ae(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && je(t, r, o), o;
};
let st = class extends f {
  constructor() {
    super(...arguments), this.border = "single", this._columns = [], this._rows = [];
  }
  /**
   * Set table data
   * @param columns - Column headers
   * @param rows - Row data
   */
  setData(e, t) {
    this._columns = e, this._rows = t;
  }
  /**
   * Add or update a row by key
   * @param key - Row identifier (first column value)
   * @param data - Row data
   */
  upsertRow(e, t) {
    const r = this._rows.findIndex((s) => s[this._columns[0]] === e);
    r >= 0 ? this._rows = [
      ...this._rows.slice(0, r),
      t,
      ...this._rows.slice(r + 1)
    ] : this._rows = [...this._rows, t];
  }
  /** Accept a protocol event */
  handleEvent(e) {
    if (e.type === "clear") {
      this._columns = [], this._rows = [];
      return;
    }
    const t = e.data;
    if ("columns" in t && "rows" in t) {
      const r = t;
      this.setData(r.columns, r.rows);
    } else if ("key" in t && "row" in t) {
      const r = t;
      this.upsertRow(r.key, r.row);
    }
  }
  getCellClass(e) {
    return typeof e == "number" ? "number" : e === "✓" || e === "OK" || e === "online" ? "status-ok" : e === "⚠" || e === "WARN" || e === "degraded" ? "status-warn" : e === "✗" || e === "ERROR" || e === "offline" ? "status-error" : "";
  }
  render() {
    return this._columns.length === 0 ? c`<div class="empty">No data</div>` : c`
      <div class="table">
        <div class="row header">
          ${this._columns.map((e) => c`<div class="cell">${e}</div>`)}
        </div>
        ${this._rows.map((e) => c`
          <div class="row">
            ${this._columns.map((t) => c`
              <div class="cell ${this.getCellClass(e[t])}">${e[t] ?? ""}</div>
            `)}
          </div>
        `)}
      </div>
    `;
  }
};
st.styles = [
  v,
  u`
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
Yt([
  n({ type: String })
], st.prototype, "border", 2);
Yt([
  _()
], st.prototype, "_columns", 2);
Yt([
  _()
], st.prototype, "_rows", 2);
st = Yt([
  g("tui-table")
], st);
var Le = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, et = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Xe(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Le(t, r, o), o;
};
let M = class extends f {
  constructor() {
    super(...arguments), this.prompt = "❯ ", this.promptAttr = "", this.historySize = 100, this._lines = [], this._inputValue = "", this._historyIndex = -1, this._history = [];
  }
  /**
   * Print output to console
   * @param text - Text to print (supports ANSI codes)
   */
  print(e) {
    const t = e.split(`
`).map((r) => ({
      id: Date.now() + Math.random(),
      text: r,
      html: Kt(r),
      type: "output"
    }));
    this._lines = [...this._lines, ...t], this.updateComplete.then(() => this.scrollToBottom());
  }
  /**
   * Clear console output
   */
  clear() {
    this._lines = [];
  }
  /** Accept a protocol event */
  handleEvent(e) {
    if (e.type === "clear") {
      this.clear();
      return;
    }
    const t = e.data;
    t.message != null && this.print(t.message);
  }
  scrollToBottom() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".output");
    e && (e.scrollTop = e.scrollHeight);
  }
  focusInput() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("input");
    e == null || e.focus();
  }
  handleKeydown(e) {
    switch (e.key) {
      case "Enter":
        this.submitCommand();
        break;
      case "ArrowUp":
        e.preventDefault(), this.navigateHistory(1);
        break;
      case "ArrowDown":
        e.preventDefault(), this.navigateHistory(-1);
        break;
      case "l":
        e.ctrlKey && (e.preventDefault(), this.clear());
        break;
      case "c":
        e.ctrlKey && (e.preventDefault(), this._inputValue = "", this.print("^C"));
        break;
    }
  }
  submitCommand() {
    const e = this._inputValue.trim();
    e && (this._lines = [...this._lines, {
      id: Date.now(),
      text: e,
      html: e,
      type: "command",
      prompt: this.prompt
    }], this._history = [...this._history.slice(-this.historySize + 1), e], this._historyIndex = -1, this._inputValue = "", this.dispatchEvent(new CustomEvent("command", {
      detail: e,
      bubbles: !0,
      composed: !0
    })), this.updateComplete.then(() => this.scrollToBottom()));
  }
  navigateHistory(e) {
    const t = this._historyIndex + e;
    t < 0 ? (this._historyIndex = -1, this._inputValue = "") : t < this._history.length && (this._historyIndex = t, this._inputValue = this._history[this._history.length - 1 - t]);
  }
  handleInput(e) {
    this._inputValue = e.target.value;
  }
  get _promptClasses() {
    return ["prompt", ...this.promptAttr.split(/\s+/).filter(Boolean).map((e) => `tui-${e}`)].join(" ");
  }
  render() {
    return c`
      <div class="console" @click=${this.focusInput}>
        <div class="output">
          ${this._lines.map((e) => c`
            <div class="line ${e.type}" data-prompt=${e.prompt || ""}>
              <span .innerHTML=${e.html}></span>
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
M.styles = [
  v,
  u`
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
et([
  n({ type: String })
], M.prototype, "prompt", 2);
et([
  n({ type: String, attribute: "prompt-attr" })
], M.prototype, "promptAttr", 2);
et([
  n({ type: Number, attribute: "history-size" })
], M.prototype, "historySize", 2);
et([
  _()
], M.prototype, "_lines", 2);
et([
  _()
], M.prototype, "_inputValue", 2);
et([
  _()
], M.prototype, "_historyIndex", 2);
M = et([
  g("tui-console")
], M);
var Ye = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, Nt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Ne(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Ye(t, r, o), o;
};
let it = class extends f {
  constructor() {
    super(...arguments), this.content = "", this.attr = "", this.variant = "";
  }
  render() {
    const e = this.attr.split(/\s+/).filter(Boolean).map((r) => `tui-${r}`).join(" "), t = Kt(this.content || this.textContent || "");
    return c`<pre class="${e}" .innerHTML=${t}></pre>`;
  }
};
it.styles = [
  v,
  u`
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
Nt([
  n({ type: String })
], it.prototype, "content", 2);
Nt([
  n({ type: String })
], it.prototype, "attr", 2);
Nt([
  n({ type: String, reflect: !0 })
], it.prototype, "variant", 2);
it = Nt([
  g("tui-text")
], it);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Be = class extends Event {
  constructor(t, r, s, o) {
    super("context-request", { bubbles: !0, composed: !0 }), this.context = t, this.contextTarget = r, this.callback = s, this.subscribe = o ?? !1;
  }
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class he {
  constructor(t, r, s, o) {
    if (this.subscribe = !1, this.provided = !1, this.value = void 0, this.t = (i, a) => {
      this.unsubscribe && (this.unsubscribe !== a && (this.provided = !1, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = i, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = !0, this.callback && this.callback(i, a)), this.unsubscribe = a;
    }, this.host = t, r.context !== void 0) {
      const i = r;
      this.context = i.context, this.callback = i.callback, this.subscribe = i.subscribe ?? !1;
    } else this.context = r, this.callback = s, this.subscribe = o ?? !1;
    this.host.addController(this);
  }
  hostConnected() {
    this.dispatchRequest();
  }
  hostDisconnected() {
    this.unsubscribe && (this.unsubscribe(), this.unsubscribe = void 0);
  }
  dispatchRequest() {
    this.host.dispatchEvent(new Be(this.context, this.host, this.t, this.subscribe));
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function We({ context: e, subscribe: t }) {
  return (r, s) => {
    typeof s == "object" ? s.addInitializer(function() {
      new he(this, { context: e, callback: (o) => {
        r.set.call(this, o);
      }, subscribe: t });
    }) : r.constructor.addInitializer((o) => {
      new he(o, { context: e, callback: (i) => {
        o[s] = i;
      }, subscribe: t });
    });
  };
}
class Jr {
  constructor(t) {
    this.activeTool = null, this.activeTools = [], this.palette = {
      currentColor: "#000000",
      colors: []
    }, this.groups = t.groups, this.tools = t.tools;
  }
  selectTool(t) {
    const r = this.tools.find((o) => o.id === t);
    if (!r) return this;
    const s = this.groups[r.group];
    return s ? (s.exclusive ? this.activeTool = t : this.activeTools.includes(t) || (this.activeTools = [...this.activeTools, t]), this) : this;
  }
  toggleTool(t) {
    const r = this.tools.find((i) => i.id === t);
    if (!r) return this;
    const s = this.groups[r.group];
    if (!s) return this;
    if (s.exclusive)
      return this.selectTool(t);
    const o = this.activeTools.includes(t);
    return this.activeTools = o ? this.activeTools.filter((i) => i !== t) : [...this.activeTools, t], this;
  }
  isActive(t) {
    return this.activeTool === t || this.activeTools.includes(t);
  }
  setColor(t) {
    return this.palette = { ...this.palette, currentColor: t }, this;
  }
}
const Ue = "tool-state";
var qe = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, I = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Ge(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && qe(t, r, o), o;
};
let z = class extends f {
  constructor() {
    super(...arguments), this.variant = "default", this.size = "md", this.selected = !1, this.disabled = !1, this.block = !1;
  }
  updated(e) {
    super.updated(e), this.toolId && this.toolState && (this.selected = this.toolState.isActive(this.toolId));
  }
  render() {
    return c`
      <button ?disabled=${this.disabled} part="button">
        <slot></slot>
      </button>
    `;
  }
};
z.shadowRootOptions = {
  ...f.shadowRootOptions,
  delegatesFocus: !0
};
z.styles = [
  v,
  u`
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
I([
  n({ reflect: !0 })
], z.prototype, "variant", 2);
I([
  n({ reflect: !0 })
], z.prototype, "size", 2);
I([
  n({ attribute: "selection-style" })
], z.prototype, "selectionStyle", 2);
I([
  n({ attribute: "tool-id" })
], z.prototype, "toolId", 2);
I([
  We({ context: Ue, subscribe: !0 })
], z.prototype, "toolState", 2);
I([
  n({ type: Boolean, reflect: !0 })
], z.prototype, "selected", 2);
I([
  n({ type: Boolean, reflect: !0 })
], z.prototype, "disabled", 2);
I([
  n({ type: Boolean, reflect: !0 })
], z.prototype, "block", 2);
z = I([
  g("tui-button")
], z);
var Ve = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, P = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Fe(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Ve(t, r, o), o;
};
let It = class extends f {
  constructor() {
    super(...arguments), this._openMenu = null;
  }
  render() {
    return c`<slot></slot>`;
  }
};
It.styles = [
  v,
  u`
      :host {
        display: flex;
        gap: var(--spacing-xs);
      }
    `
];
P([
  _()
], It.prototype, "_openMenu", 2);
It = P([
  g("tui-menu")
], It);
let at = class extends f {
  constructor() {
    super(...arguments), this.label = "", this.hotkey = "", this._open = !1, this._outsideClickHandler = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._outsideClickHandler = (e) => {
      this._open && !this.contains(e.target) && this._close();
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
  _handleKeydown(e) {
    e.key === "Escape" && (this._close(), e.preventDefault()), (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") && (this._open || (this._toggle(), e.preventDefault()));
  }
  render() {
    let e = this.label;
    if (this.hotkey && this.label.toLowerCase().includes(this.hotkey.toLowerCase())) {
      const t = this.label.toLowerCase().indexOf(this.hotkey.toLowerCase()), r = this.label.slice(0, t), s = this.label.slice(t, t + 1), o = this.label.slice(t + 1);
      e = c`${r}<span class="hotkey">${s}</span>${o}`;
    }
    return c`
      <tui-button
        variant="menu"
        ?selected=${this._open}
        @click=${this._toggle}
      >
        ${e}
      </tui-button>
      <div class="dropdown">
        <slot @click=${this._close}></slot>
      </div>
    `;
  }
};
at.styles = [
  v,
  u`
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
P([
  n({ type: String })
], at.prototype, "label", 2);
P([
  n({ type: String })
], at.prototype, "hotkey", 2);
P([
  _()
], at.prototype, "_open", 2);
at = P([
  g("tui-menu-item")
], at);
let nt = class extends f {
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
    return c`
      <button @click=${this._handleClick}>
        <span>${this.label}</span>
        ${this.shortcut ? c`<span class="shortcut">${this.shortcut}</span>` : ""}
      </button>
    `;
  }
};
nt.styles = [
  v,
  u`
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
P([
  n({ type: String })
], nt.prototype, "label", 2);
P([
  n({ type: String })
], nt.prototype, "shortcut", 2);
P([
  n({ type: Boolean, reflect: !0 })
], nt.prototype, "danger", 2);
nt = P([
  g("tui-menu-action")
], nt);
let qt = class extends f {
  render() {
    return c``;
  }
};
qt.styles = u`
    :host {
      display: block;
      height: 1px;
      background: var(--border-default);
      margin: var(--spacing-xs) 0;
    }
  `;
qt = P([
  g("tui-menu-divider")
], qt);
var Ke = Object.defineProperty, Ze = Object.getOwnPropertyDescriptor, pt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Ze(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Ke(t, r, o), o;
};
let jt = class extends f {
  constructor() {
    super(...arguments), this.color = "magenta";
  }
  render() {
    return c`<slot></slot>`;
  }
};
jt.styles = [
  v,
  u`
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
pt([
  n({ type: String, reflect: !0 })
], jt.prototype, "color", 2);
jt = pt([
  g("tui-statusbar")
], jt);
let lt = class extends f {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.highlight = !1;
  }
  render() {
    return c`
      <span class="label">${this.label}</span>
      <span class="value">${this.value}</span>
    `;
  }
};
lt.styles = [
  v,
  u`
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
pt([
  n({ type: String })
], lt.prototype, "label", 2);
pt([
  n({ type: String })
], lt.prototype, "value", 2);
pt([
  n({ type: Boolean, reflect: !0 })
], lt.prototype, "highlight", 2);
lt = pt([
  g("tui-status-item")
], lt);
var Je = Object.defineProperty, Qe = Object.getOwnPropertyDescriptor, $t = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Qe(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Je(t, r, o), o;
};
let q = class extends f {
  constructor() {
    super(...arguments), this.title = "", this.border = "double", this.open = !1, this.closable = !0, this._boundKeyHandler = this._handleKeydown.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("keydown", this._boundKeyHandler);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("keydown", this._boundKeyHandler);
  }
  _handleKeydown(e) {
    this.open && e.key === "Escape" && this.closable && (this.close(), e.preventDefault(), e.stopPropagation());
  }
  _handleOverlayClick(e) {
    e.target === e.currentTarget && this.closable && this.close();
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
    return c`
      <div class="overlay" @click=${this._handleOverlayClick}>
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="header">
            <span class="title" id="modal-title"><span class="title-decor">${Rt(this.border).before}</span>${this.title}<span class="title-decor">${Rt(this.border).after}</span></span>
            ${this.closable ? c`
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
q.styles = [
  v,
  u`
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
$t([
  n({ type: String, reflect: !0 })
], q.prototype, "title", 2);
$t([
  n({ type: String, reflect: !0 })
], q.prototype, "border", 2);
$t([
  n({ type: Boolean, reflect: !0 })
], q.prototype, "open", 2);
$t([
  n({ type: Boolean })
], q.prototype, "closable", 2);
q = $t([
  g("tui-modal")
], q);
var tr = Object.defineProperty, er = Object.getOwnPropertyDescriptor, E = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? er(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && tr(t, r, o), o;
};
let H = class extends f {
  constructor() {
    super(...arguments), this.orientation = "vertical", this.selected = "", this.size = "md", this.selectionStyle = "", this.tools = [], this.showHotkeys = !0;
  }
  updated(e) {
    e.has("selectionStyle") && this.selectionStyle && this.style.setProperty("--toolbar-selection-style", this.selectionStyle);
  }
  _handleClick(e) {
    this.selected = e, this.dispatchEvent(
      new CustomEvent("tool-select", {
        bubbles: !0,
        composed: !0,
        detail: { tool: e }
      })
    );
  }
  render() {
    return this.tools && this.tools.length > 0 ? c`
        <div class="toolbar">
          ${this.tools.map((e) => e.divider ? c`<div class="divider"></div>` : c`
              <div class="tool-item">
                ${this.showHotkeys && e.key ? c`<span class="hotkey">${e.key}</span>` : ""}
                <tui-button
                  variant="icon"
                  size=${this.size}
                  tool-id=${e.id}
                  ?selected=${this.selected === e.id}
                  selection-style=${this.selectionStyle || "invert"}
                  title="${e.name || e.id}${e.key ? ` (${e.key})` : ""}"
                  @click=${() => this._handleClick(e.id)}
                >
                  ${e.icon || e.id.charAt(0).toUpperCase()}
                </tui-button>
              </div>
            `)}
        </div>
      ` : c`
      <div class="toolbar">
        <slot></slot>
      </div>
    `;
  }
};
H.styles = [
  v,
  u`
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
E([
  n({ reflect: !0 })
], H.prototype, "orientation", 2);
E([
  n()
], H.prototype, "selected", 2);
E([
  n({ reflect: !0 })
], H.prototype, "size", 2);
E([
  n({ attribute: "selection-style" })
], H.prototype, "selectionStyle", 2);
E([
  n({ type: Array })
], H.prototype, "tools", 2);
E([
  n({ type: Boolean, attribute: "show-hotkeys" })
], H.prototype, "showHotkeys", 2);
H = E([
  g("tui-toolbar")
], H);
let G = class extends f {
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
    return c`
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
G.styles = u`
    :host {
      display: contents;
    }
  `;
E([
  n({ attribute: "tool-id" })
], G.prototype, "toolId", 2);
E([
  n()
], G.prototype, "icon", 2);
E([
  n({ type: Boolean, reflect: !0 })
], G.prototype, "active", 2);
E([
  n()
], G.prototype, "size", 2);
G = E([
  g("tui-tool")
], G);
var rr = Object.defineProperty, or = Object.getOwnPropertyDescriptor, zt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? or(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && rr(t, r, o), o;
};
let V = class extends f {
  constructor() {
    super(...arguments), this.position = "bottom", this._queue = [], this._current = null, this._visible = !1;
  }
  /**
   * Show a toast message
   * @param message - The message to display
   * @param options - Toast options
   */
  show(e, t = {}) {
    const r = {
      message: e,
      type: t.type || null,
      title: t.title || this._getDefaultTitle(t.type),
      duration: t.duration || 2500,
      simple: !t.type && !t.title
    };
    this._queue = [...this._queue, r], this._current || this._showNext();
  }
  _getDefaultTitle(e) {
    switch (e) {
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
    const [e, ...t] = this._queue;
    this._queue = t, this._current = e, this._visible = !1, await this.updateComplete, requestAnimationFrame(() => {
      this._visible = !0;
    }), await new Promise((r) => setTimeout(r, this._current.duration)), this._visible = !1, await new Promise((r) => setTimeout(r, 200)), this._showNext();
  }
  render() {
    if (!this._current)
      return c``;
    const { message: e, type: t, title: r, simple: s } = this._current, o = [
      "toast",
      this._visible ? "visible" : "",
      t ? `type-${t}` : "",
      s ? "simple" : ""
    ].filter(Boolean).join(" ");
    return c`
      <div class="${o}">
        <div class="toast-header">${r}</div>
        <div class="toast-body">${e}</div>
      </div>
    `;
  }
};
V.styles = [
  v,
  u`
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
zt([
  n({ type: String, reflect: !0 })
], V.prototype, "position", 2);
zt([
  _()
], V.prototype, "_queue", 2);
zt([
  _()
], V.prototype, "_current", 2);
zt([
  _()
], V.prototype, "_visible", 2);
V = zt([
  g("tui-toast")
], V);
let Dt = null;
function Qr(e, t) {
  Dt || (Dt = document.createElement("tui-toast"), document.body.appendChild(Dt)), Dt.show(e, t);
}
var sr = Object.defineProperty, ir = Object.getOwnPropertyDescriptor, rt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? ir(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && sr(t, r, o), o;
};
const j = Xt.single, A = Xt.heavy, L = Xt.double;
let R = class extends f {
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
    const e = this.isRed ? "suit red" : "suit", t = `size-${this.size}`;
    return c`
      <div 
        class="card ${t} ${this.disabled ? "disabled" : ""}"
        @click=${this._handleClick}
      >
        <div class="card-back"></div>
        
        <div class="corner corner-top">
          <span class="rank">${this.rank}</span>
          <span class="${e}">${this.suit}</span>
        </div>
        
        <div class="face">
          <slot>
            <span class="${e}" style="font-size: 1.5em;">${this.suit}</span>
          </slot>
        </div>
        
        <div class="corner corner-bottom">
          <span class="rank">${this.rank}</span>
          <span class="${e}">${this.suit}</span>
        </div>
        
        <div class="card-bottom"></div>
      </div>
    `;
  }
};
R.styles = [
  v,
  u`
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
         NEUTRAL STATE - Single line border ${y(j.tl)}${y(j.h)}${y(j.h)}${y(j.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      .card {
        border: var(--border-width) solid var(--border-default);
      }

      .card::before {
        content: '${y(j.tl)}';
        position: absolute;
        top: -1px;
        left: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card::after {
        content: '${y(j.tr)}';
        position: absolute;
        top: -1px;
        right: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card-bottom::before {
        content: '${y(j.bl)}';
        position: absolute;
        bottom: -1px;
        left: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card-bottom::after {
        content: '${y(j.br)}';
        position: absolute;
        bottom: -1px;
        right: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      /* ═══════════════════════════════════════════════════════════════════
         HOVER STATE - Heavy line border ${y(A.tl)}${y(A.h)}${y(A.h)}${y(A.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      .card:hover:not(.disabled) {
        border-color: var(--text-primary);
        box-shadow: 2px 2px 0 rgba(255,255,255,0.08);
        transform: translateY(-2px);
      }

      .card:hover:not(.disabled)::before { content: '${y(A.tl)}'; color: var(--text-primary); }
      .card:hover:not(.disabled)::after { content: '${y(A.tr)}'; color: var(--text-primary); }
      .card:hover:not(.disabled) .card-bottom::before { content: '${y(A.bl)}'; color: var(--text-primary); }
      .card:hover:not(.disabled) .card-bottom::after { content: '${y(A.br)}'; color: var(--text-primary); }

      /* ═══════════════════════════════════════════════════════════════════
         SELECTED STATE - Double line border ${y(L.tl)}${y(L.h)}${y(L.h)}${y(L.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      :host([selected]) .card {
        border-color: var(--color-primary);
        box-shadow: 3px 3px 0 rgba(88, 166, 255, 0.2);
      }

      :host([selected]) .card::before { content: '${y(L.tl)}'; color: var(--color-primary); }
      :host([selected]) .card::after { content: '${y(L.tr)}'; color: var(--color-primary); }
      :host([selected]) .card-bottom::before { content: '${y(L.bl)}'; color: var(--color-primary); }
      :host([selected]) .card-bottom::after { content: '${y(L.br)}'; color: var(--color-primary); }

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
rt([
  n({ type: String })
], R.prototype, "rank", 2);
rt([
  n({ type: String })
], R.prototype, "suit", 2);
rt([
  n({ type: Boolean, attribute: "face-down", reflect: !0 })
], R.prototype, "faceDown", 2);
rt([
  n({ type: Boolean, reflect: !0 })
], R.prototype, "selected", 2);
rt([
  n({ type: Boolean, reflect: !0 })
], R.prototype, "disabled", 2);
rt([
  n({ type: String, reflect: !0 })
], R.prototype, "size", 2);
R = rt([
  g("tui-card")
], R);
var ar = Object.defineProperty, nr = Object.getOwnPropertyDescriptor, St = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? nr(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && ar(t, r, o), o;
};
let F = class extends f {
  constructor() {
    super(...arguments), this.palettes = {}, this.currentPalette = "", this.selectedChar = "", this.columns = 8;
  }
  get _chars() {
    return this.palettes[this.currentPalette] || [];
  }
  _selectPalette(e) {
    var r;
    const t = ((r = this.palettes[e]) == null ? void 0 : r[0]) || "";
    this.dispatchEvent(new CustomEvent("palette-change", {
      bubbles: !0,
      composed: !0,
      detail: { palette: e, firstChar: t }
    }));
  }
  _selectChar(e) {
    this.dispatchEvent(new CustomEvent("char-select", {
      bubbles: !0,
      composed: !0,
      detail: { char: e }
    }));
  }
  render() {
    const e = Object.keys(this.palettes);
    return c`
      <div class="tabs">
        ${e.map((t) => c`
          <button
            class="tab ${t === this.currentPalette ? "active" : ""}"
            @click=${() => this._selectPalette(t)}
          >${t}</button>
        `)}
      </div>
      <div class="grid" style="grid-template-columns: repeat(${this.columns}, 28px)">
        ${this._chars.map((t) => c`
          <button
            class="char ${t === this.selectedChar ? "selected" : ""}"
            @click=${() => this._selectChar(t)}
          >${t}</button>
        `)}
      </div>
    `;
  }
};
F.styles = [
  v,
  u`
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
St([
  n({ type: Object })
], F.prototype, "palettes", 2);
St([
  n({ type: String, attribute: "current-palette" })
], F.prototype, "currentPalette", 2);
St([
  n({ type: String, attribute: "selected-char" })
], F.prototype, "selectedChar", 2);
St([
  n({ type: Number })
], F.prototype, "columns", 2);
F = St([
  g("tui-palette")
], F);
class lr {
  constructor(t) {
    this.cellSize = t, this._gridWidth = 0, this._gridHeight = 0;
  }
  screenToGrid(t, r, s) {
    const o = Math.floor(t / this.cellSize), i = Math.floor(r / this.cellSize), a = Math.floor(s.width / this.cellSize), l = Math.floor(s.height / this.cellSize);
    return o < 0 || o >= a || i < 0 || i >= l ? null : { x: o, y: i };
  }
  gridToScreen(t, r, s) {
    return {
      x: (t + 0.5) * this.cellSize,
      y: (r + 0.5) * this.cellSize
    };
  }
  getCellPath(t, r) {
    const s = t * this.cellSize, o = r * this.cellSize, i = this.cellSize;
    return `M ${s},${o} L ${s + i},${o} L ${s + i},${o + i} L ${s},${o + i} Z`;
  }
  getBoundsPath() {
    const t = this._gridWidth * this.cellSize, r = this._gridHeight * this.cellSize;
    return `M 0,0 L ${t},0 L ${t},${r} L 0,${r} Z`;
  }
  getDimensions(t, r) {
    return this._gridWidth = t, this._gridHeight = r, {
      width: t * this.cellSize,
      height: r * this.cellSize
    };
  }
}
class cr {
  constructor(t) {
    this.cellSize = t, this._gridWidth = 0, this._gridHeight = 0;
  }
  get tileWidth() {
    return this.cellSize;
  }
  get tileHeight() {
    return this.cellSize / 2;
  }
  getOriginX(t) {
    return t * (this.tileWidth / 2);
  }
  screenToGrid(t, r, s) {
    const o = this.tileWidth, i = this.tileHeight, a = this.getOriginX(this._gridHeight), l = t - a, h = r, d = Math.floor((l / (o / 2) + h / (i / 2)) / 2), p = Math.floor((h / (i / 2) - l / (o / 2)) / 2);
    return d < 0 || p < 0 || d >= this._gridWidth || p >= this._gridHeight ? null : { x: d, y: p };
  }
  gridToScreen(t, r, s) {
    const o = this.tileWidth, i = this.tileHeight;
    return {
      x: this.getOriginX(this._gridHeight) + (t - r) * (o / 2),
      y: (t + r) * (i / 2) + i / 2
    };
  }
  getCellPath(t, r) {
    const s = this.tileWidth, o = this.tileHeight, a = this.getOriginX(this._gridHeight) + (t - r) * (s / 2), l = (t + r) * (o / 2) + o / 2;
    return `M ${a},${l - o / 2} L ${a + s / 2},${l} L ${a},${l + o / 2} L ${a - s / 2},${l} Z`;
  }
  getBoundsPath() {
    const t = this.tileWidth, r = this.tileHeight, s = this._gridWidth, o = this._gridHeight, i = this.getOriginX(o), a = i, l = 0, h = i + s * (t / 2), d = s * (r / 2), p = i + (s - o) * (t / 2), x = (s + o) * (r / 2), w = i - o * (t / 2), C = o * (r / 2);
    return `M ${a},${l} L ${h},${d} L ${p},${x} L ${w},${C} Z`;
  }
  getDimensions(t, r) {
    const s = this.tileWidth, o = this.tileHeight;
    return this._gridWidth = t, this._gridHeight = r, {
      width: (t + r) * (s / 2),
      height: (t + r) * (o / 2) + o
    };
  }
}
class hr {
  constructor(t) {
    this.cellSize = t, this._gridWidth = 0, this._gridHeight = 0;
  }
  screenToGrid(t, r, s) {
    const o = Math.floor(t / this.cellSize), i = Math.floor(r / this.cellSize), a = Math.floor(s.width / this.cellSize), l = Math.floor(s.height / this.cellSize);
    if (o < 0 || o >= a || i < 0 || i >= l)
      return null;
    const h = t % this.cellSize / this.cellSize, d = r % this.cellSize / this.cellSize;
    let p;
    return d < h ? p = d < 1 - h ? "top" : "right" : p = d < 1 - h ? "left" : "bottom", { x: o, y: i, region: p };
  }
  gridToScreen(t, r, s, o) {
    const i = (t + 0.5) * this.cellSize, a = (r + 0.5) * this.cellSize;
    if (!o)
      return { x: i, y: a };
    const l = this.cellSize / 6, d = {
      top: { x: 0, y: -l },
      right: { x: l, y: 0 },
      bottom: { x: 0, y: l },
      left: { x: -l, y: 0 }
    }[o] || { x: 0, y: 0 };
    return { x: i + d.x, y: a + d.y };
  }
  getCellPath(t, r, s) {
    const o = t * this.cellSize, i = r * this.cellSize, a = this.cellSize;
    if (!s)
      return `M ${o},${i} L ${o + a},${i} L ${o + a},${i + a} L ${o},${i + a} Z`;
    const l = o + a / 2, h = i + a / 2;
    return {
      top: `M ${o},${i} L ${o + a},${i} L ${l},${h} Z`,
      right: `M ${o + a},${i} L ${o + a},${i + a} L ${l},${h} Z`,
      bottom: `M ${o + a},${i + a} L ${o},${i + a} L ${l},${h} Z`,
      left: `M ${o},${i + a} L ${o},${i} L ${l},${h} Z`
    }[s] || "";
  }
  getBoundsPath() {
    const t = this._gridWidth * this.cellSize, r = this._gridHeight * this.cellSize;
    return `M 0,0 L ${t},0 L ${t},${r} L 0,${r} Z`;
  }
  getDimensions(t, r) {
    return this._gridWidth = t, this._gridHeight = r, {
      width: t * this.cellSize,
      height: r * this.cellSize
    };
  }
}
function U(e, t) {
  switch (e) {
    case "rectangular":
      return new lr(t);
    case "isometric":
      return new cr(t);
    case "triangular":
      return new hr(t);
    default:
      throw new Error(`Unknown projection type: ${e}`);
  }
}
var dr = Object.defineProperty, pr = Object.getOwnPropertyDescriptor, k = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? pr(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && dr(t, r, o), o;
};
let $ = class extends f {
  constructor() {
    super(...arguments), this.width = 16, this.height = 16, this.cellSize = 20, this.readonly = !1, this.showGrid = !0, this.continuous = !1, this.projection = "rectangular", this.hoverX = -1, this.hoverY = -1, this.projectionEngine = null, this.isDrawing = !1, this.startX = -1, this.startY = -1, this.lastX = -1, this.lastY = -1, this.lastPointerCoords = null, this.currentPointerId = null, this.handlePointerDown = (e) => {
      if (this.readonly || e.button !== 0) return;
      const t = this.screenToGrid(e.clientX, e.clientY);
      t && (e.target.setPointerCapture(e.pointerId), e.preventDefault(), this.isDrawing = !0, this.currentPointerId = e.pointerId, this.startX = t.x, this.startY = t.y, this.lastX = t.x, this.lastY = t.y, this.lastPointerCoords = { x: e.clientX, y: e.clientY }, this.dispatchEvent(
        new CustomEvent("canvas-drag-start", {
          detail: { x: t.x, y: t.y, region: t.region, pointerType: e.pointerType },
          bubbles: !0,
          composed: !0
        })
      ), this.dispatchEvent(
        new CustomEvent("canvas-draw", {
          detail: { x: t.x, y: t.y, region: t.region, pointerType: e.pointerType },
          bubbles: !0,
          composed: !0
        })
      ));
    }, this.handlePointerMove = (e) => {
      const t = this.screenToGrid(e.clientX, e.clientY);
      if (t ? (t.x !== this.hoverX || t.y !== this.hoverY) && (this.hoverX = t.x, this.hoverY = t.y, this.dispatchEvent(
        new CustomEvent("canvas-hover", {
          detail: { x: t.x, y: t.y, region: t.region },
          bubbles: !0,
          composed: !0
        })
      )) : this.hoverX !== -1 && (this.hoverX = -1, this.hoverY = -1), !(!this.isDrawing || this.readonly) && e.pointerId === this.currentPointerId) {
        if (e.preventDefault(), this.lastPointerCoords) {
          const r = this.interpolatePoints(
            this.lastPointerCoords.x,
            this.lastPointerCoords.y,
            e.clientX,
            e.clientY
          );
          for (const s of r)
            (s.x !== this.lastX || s.y !== this.lastY || this.continuous) && (this.dispatchEvent(
              new CustomEvent("canvas-draw", {
                detail: { x: s.x, y: s.y, region: s.region, pointerType: e.pointerType },
                bubbles: !0,
                composed: !0
              })
            ), this.dispatchEvent(
              new CustomEvent("canvas-drag", {
                detail: {
                  x: s.x,
                  y: s.y,
                  region: s.region,
                  startX: this.startX,
                  startY: this.startY,
                  pointerType: e.pointerType
                },
                bubbles: !0,
                composed: !0
              })
            ), this.lastX = s.x, this.lastY = s.y);
        }
        this.lastPointerCoords = { x: e.clientX, y: e.clientY };
      }
    }, this.handlePointerUp = (e) => {
      var r, s;
      if (!this.isDrawing || e.pointerId !== this.currentPointerId) return;
      (s = (r = e.target).hasPointerCapture) != null && s.call(r, e.pointerId) && e.target.releasePointerCapture(e.pointerId);
      const t = this.screenToGrid(e.clientX, e.clientY);
      this.dispatchEvent(
        new CustomEvent("canvas-drag-end", {
          detail: {
            x: (t == null ? void 0 : t.x) ?? this.lastX,
            y: (t == null ? void 0 : t.y) ?? this.lastY,
            region: t == null ? void 0 : t.region,
            startX: this.startX,
            startY: this.startY,
            pointerType: e.pointerType
          },
          bubbles: !0,
          composed: !0
        })
      ), this.isDrawing = !1, this.currentPointerId = null, this.lastPointerCoords = null;
    }, this.handlePointerLeave = (e) => {
      var t, r;
      (r = (t = e.target).hasPointerCapture) != null && r.call(t, e.pointerId) || (this.hoverX = -1, this.hoverY = -1, this.dispatchEvent(
        new CustomEvent("canvas-leave", {
          bubbles: !0,
          composed: !0
        })
      ));
    }, this.handleContextMenu = (e) => {
      e.preventDefault();
    };
  }
  // ─────────────────────────────────────────────────────────────────────────────
  // LIFECYCLE
  // ─────────────────────────────────────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback(), this.projectionEngine = U(this.projection, this.cellSize);
  }
  updated(e) {
    super.updated(e), (e.has("projection") || e.has("cellSize") || e.has("width") || e.has("height")) && (this.projectionEngine = U(this.projection, this.cellSize), this.hoverX = -1, this.hoverY = -1, this.dispatchEvent(new CustomEvent("canvas-ready", {
      bubbles: !0,
      composed: !0,
      detail: { width: this.canvasWidth, height: this.canvasHeight, viewBox: this.viewBox }
    })));
  }
  // ─────────────────────────────────────────────────────────────────────────────
  // COORDINATE CONVERSION
  // ─────────────────────────────────────────────────────────────────────────────
  /**
   * Convert screen coordinates to grid cell coordinates
   */
  screenToGrid(e, t) {
    var h;
    const r = (h = this.shadowRoot) == null ? void 0 : h.querySelector(".canvas-container");
    if (!r || !this.projectionEngine) return null;
    const s = r.getBoundingClientRect(), o = e - s.left, i = t - s.top, { width: a, height: l } = this.projectionEngine.getDimensions(this.width, this.height);
    return this.projectionEngine.screenToGrid(o, i, { width: a, height: l });
  }
  /**
   * Interpolate points between two screen coordinates (Bresenham-style)
   * to ensure continuous drawing even with fast pointer movement
   */
  interpolatePoints(e, t, r, s) {
    const o = [], i = r - e, a = s - t, l = Math.sqrt(i * i + a * a), h = Math.max(1, Math.ceil(l / (this.cellSize / 2)));
    for (let d = 0; d <= h; d++) {
      const p = d / h, x = e + i * p, w = t + a * p, C = this.screenToGrid(x, w);
      if (C) {
        const vt = o[o.length - 1];
        (!vt || vt.x !== C.x || vt.y !== C.y) && o.push(C);
      }
    }
    return o;
  }
  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER HELPERS
  // ─────────────────────────────────────────────────────────────────────────────
  renderGrid() {
    if (!this.showGrid) return null;
    const e = this.projectionEngine || U("rectangular", this.cellSize), { width: t, height: r } = e.getDimensions(this.width, this.height), s = [];
    for (let i = 0; i < this.height; i++)
      for (let a = 0; a < this.width; a++)
        s.push(`<path d="${e.getCellPath(a, i)}" fill="none"/>`);
    const o = e.getBoundsPath();
    return c`
      <div class="grid-layer">
        <svg viewBox="0 0 ${t} ${r}">
          <path d="${o}" fill="var(--_canvas-grid-fill)" stroke="var(--_canvas-grid-color)" stroke-width="1"/>
          <g stroke="var(--_canvas-grid-color)" stroke-width="0.5" opacity="0.5">
            ${s.map((i) => c`${this.unsafeSVG(i)}`)}
          </g>
        </svg>
      </div>
    `;
  }
  // Helper to render raw SVG strings
  unsafeSVG(e) {
    const t = document.createElement("template");
    return t.innerHTML = e, t.content.firstChild;
  }
  renderHover() {
    if (this.hoverX < 0 || this.hoverY < 0) return null;
    const e = this.projectionEngine || U("rectangular", this.cellSize), { width: t, height: r } = e.getDimensions(this.width, this.height), s = e.getCellPath(this.hoverX, this.hoverY);
    return c`
      <div class="hover-layer">
        <svg viewBox="0 0 ${t} ${r}" style="width:100%;height:100%;">
          <path d="${s}" fill="var(--_canvas-hover-color)" />
        </svg>
      </div>
    `;
  }
  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  render() {
    const e = this.projectionEngine || U("rectangular", this.cellSize), { width: t, height: r } = e.getDimensions(this.width, this.height), s = `
      width: ${t}px;
      height: ${r}px;
    `;
    return c`
      <div
        class="canvas-container"
        style=${s}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @pointercancel=${this.handlePointerUp}
        @pointerleave=${this.handlePointerLeave}
        @contextmenu=${this.handleContextMenu}
      >
        ${this.renderGrid()}
        ${this.renderHover()}
        <div class="content-layer">
          <slot></slot>
        </div>
      </div>
    `;
  }
  // ─────────────────────────────────────────────────────────────────────────────
  // PUBLIC API
  // ─────────────────────────────────────────────────────────────────────────────
  /**
   * Get the current canvas dimensions
   */
  getDimensions() {
    return {
      width: this.width,
      height: this.height,
      cellSize: this.cellSize
    };
  }
  /**
   * Total pixel width of the canvas (from projection)
   */
  get canvasWidth() {
    return (this.projectionEngine || U("rectangular", this.cellSize)).getDimensions(this.width, this.height).width;
  }
  /**
   * Total pixel height of the canvas (from projection)
   */
  get canvasHeight() {
    return (this.projectionEngine || U("rectangular", this.cellSize)).getDimensions(this.width, this.height).height;
  }
  /**
   * SVG viewBox string matching canvas dimensions: "0 0 width height"
   */
  get viewBox() {
    return `0 0 ${this.canvasWidth} ${this.canvasHeight}`;
  }
  /**
   * Convert grid coordinates to screen coordinates (center of cell)
   */
  gridToScreen(e, t) {
    var l;
    const r = (l = this.shadowRoot) == null ? void 0 : l.querySelector(".canvas-container");
    if (!r || !this.projectionEngine) return null;
    const s = r.getBoundingClientRect(), { width: o, height: i } = this.projectionEngine.getDimensions(this.width, this.height), a = this.projectionEngine.gridToScreen(e, t, { width: o, height: i });
    return {
      x: s.left + a.x,
      y: s.top + a.y
    };
  }
  /**
   * Programmatically set hover position (useful for keyboard navigation)
   */
  setHover(e, t) {
    e >= 0 && e < this.width && t >= 0 && t < this.height ? (this.hoverX = e, this.hoverY = t) : (this.hoverX = -1, this.hoverY = -1);
  }
};
$.styles = [
  v,
  u`
      :host {
        --_canvas-bg: var(--tui-canvas-bg, var(--surface-base));
        --_canvas-grid-color: var(--tui-canvas-grid-color, var(--border-default));
        --_canvas-grid-fill: var(--tui-canvas-grid-fill, var(--surface-elevated, rgba(255, 255, 255, 0.03)));
        --_canvas-hover-color: var(--tui-canvas-hover-color, rgba(255, 255, 255, 0.1));

        display: block;
        position: relative;
        touch-action: none; /* Critical: allows pointer events to work */
        user-select: none;
      }

      .canvas-container {
        position: relative;
        background: var(--_canvas-bg);
        overflow: hidden;
      }

      .grid-layer {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }

      .grid-layer svg {
        width: 100%;
        height: 100%;
      }

      .hover-layer {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }

      .hover-cell {
        position: absolute;
        background: var(--_canvas-hover-color);
        pointer-events: none;
      }

      .content-layer {
        position: relative;
        width: 100%;
        height: 100%;
      }

      /* Slot content positioned above grid */
      ::slotted(*) {
        position: absolute;
        inset: 0;
      }
    `
];
k([
  n({ type: Number })
], $.prototype, "width", 2);
k([
  n({ type: Number })
], $.prototype, "height", 2);
k([
  n({ type: Number, attribute: "cell-size" })
], $.prototype, "cellSize", 2);
k([
  n({ type: Boolean, reflect: !0 })
], $.prototype, "readonly", 2);
k([
  n({ type: Boolean, attribute: "show-grid" })
], $.prototype, "showGrid", 2);
k([
  n({ type: Boolean })
], $.prototype, "continuous", 2);
k([
  n({ type: String })
], $.prototype, "projection", 2);
k([
  _()
], $.prototype, "hoverX", 2);
k([
  _()
], $.prototype, "hoverY", 2);
k([
  _()
], $.prototype, "projectionEngine", 2);
$ = k([
  g("tui-canvas")
], $);
var ur = Object.defineProperty, fr = Object.getOwnPropertyDescriptor, O = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? fr(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && ur(t, r, o), o;
};
let S = class extends f {
  constructor() {
    super(...arguments), this.cols = 16, this.rows = 16, this.cellWidth = 10, this.cellHeight = 18, this.color = "var(--text, #2ecc71)", this.readonly = !1, this._grid = [], this._hoverX = -1, this._hoverY = -1, this._isDrawing = !1, this._handlePointerDown = (e) => {
      if (this.readonly || e.button !== 0) return;
      e.target.setPointerCapture(e.pointerId), e.preventDefault(), this._isDrawing = !0;
      const t = this._screenToGrid(e);
      t && this.dispatchEvent(new CustomEvent("grid-draw", {
        detail: t,
        bubbles: !0,
        composed: !0
      }));
    }, this._handlePointerMove = (e) => {
      const t = this._screenToGrid(e);
      t && (t.x !== this._hoverX || t.y !== this._hoverY) ? (this._hoverX = t.x, this._hoverY = t.y, this.dispatchEvent(new CustomEvent("grid-hover", {
        detail: t,
        bubbles: !0,
        composed: !0
      })), this._isDrawing && !this.readonly && this.dispatchEvent(new CustomEvent("grid-draw", {
        detail: t,
        bubbles: !0,
        composed: !0
      }))) : !t && this._hoverX !== -1 && (this._hoverX = -1, this._hoverY = -1);
    }, this._handlePointerUp = (e) => {
      var t, r;
      this._isDrawing && ((r = (t = e.target).hasPointerCapture) != null && r.call(t, e.pointerId) && e.target.releasePointerCapture(e.pointerId), this._isDrawing = !1);
    }, this._handlePointerLeave = (e) => {
      var t, r;
      (r = (t = e.target).hasPointerCapture) != null && r.call(t, e.pointerId) || (this._hoverX = -1, this._hoverY = -1, this.dispatchEvent(new CustomEvent("grid-leave", {
        bubbles: !0,
        composed: !0
      })));
    };
  }
  /** Set the full grid contents. Triggers re-render. */
  setGrid(e) {
    this._grid = e, this.requestUpdate();
  }
  /** Set a single cell value. */
  setCell(e, t, r) {
    this._grid[t] && (this._grid[t][e] = r, this.requestUpdate());
  }
  get _totalWidth() {
    return this.cols * this.cellWidth;
  }
  get _totalHeight() {
    return this.rows * this.cellHeight;
  }
  _screenToGrid(e) {
    var i;
    const t = (i = this.shadowRoot) == null ? void 0 : i.querySelector("svg");
    if (!t) return null;
    const r = t.getBoundingClientRect(), s = Math.floor((e.clientX - r.left) / (r.width / this.cols)), o = Math.floor((e.clientY - r.top) / (r.height / this.rows));
    return s < 0 || s >= this.cols || o < 0 || o >= this.rows ? null : { x: s, y: o };
  }
  render() {
    const e = this.cellWidth, t = this.cellHeight, r = t * 0.85;
    return c`
      <svg
        viewBox="0 0 ${this._totalWidth} ${this._totalHeight}"
        width="${this._totalWidth}"
        height="${this._totalHeight}"
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerUp}
        @pointerleave=${this._handlePointerLeave}
        @contextmenu=${(s) => s.preventDefault()}
      >
        ${this._hoverX >= 0 && !this.readonly ? te`
          <rect class="hover-cell"
            x="${this._hoverX * e}" y="${this._hoverY * t}"
            width="${e}" height="${t}" />
        ` : null}
        ${this._grid.map(
      (s, o) => s.map(
        (i, a) => i != null ? te`
              <text
                x="${a * e + e / 2}"
                y="${o * t + t / 2}"
                text-anchor="middle"
                dominant-baseline="central"
                fill="${this.color}"
                font-family="monospace"
                font-size="${r}px"
              >${i}</text>
            ` : null
      )
    )}
      </svg>
    `;
  }
};
S.styles = [
  v,
  u`
      :host {
        display: inline-block;
        touch-action: none;
        user-select: none;
      }
      svg {
        display: block;
      }
      .hover-cell {
        fill: rgba(255, 255, 255, 0.08);
      }
    `
];
O([
  n({ type: Number })
], S.prototype, "cols", 2);
O([
  n({ type: Number })
], S.prototype, "rows", 2);
O([
  n({ type: Number, attribute: "cell-width" })
], S.prototype, "cellWidth", 2);
O([
  n({ type: Number, attribute: "cell-height" })
], S.prototype, "cellHeight", 2);
O([
  n({ type: String })
], S.prototype, "color", 2);
O([
  n({ type: Boolean, reflect: !0 })
], S.prototype, "readonly", 2);
O([
  _()
], S.prototype, "_grid", 2);
O([
  _()
], S.prototype, "_hoverX", 2);
O([
  _()
], S.prototype, "_hoverY", 2);
S = O([
  g("tui-grid")
], S);
var gr = Object.defineProperty, vr = Object.getOwnPropertyDescriptor, Bt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? vr(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && gr(t, r, o), o;
};
let ct = class extends f {
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
    const e = this.type === "external" ? "↗" : "⧉";
    return c`
      <button class="link" @click=${this._handleClick}>
        <slot></slot><span class="icon">${e}</span>
      </button>${this._copied ? c`<span class="copied">copied</span>` : ""}
    `;
  }
};
ct.styles = [
  v,
  u`
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
Bt([
  n({ type: String })
], ct.prototype, "href", 2);
Bt([
  n({ type: String, reflect: !0 })
], ct.prototype, "type", 2);
Bt([
  _()
], ct.prototype, "_copied", 2);
ct = Bt([
  g("tui-link")
], ct);
var br = Object.defineProperty, mr = Object.getOwnPropertyDescriptor, Zt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? mr(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && br(t, r, o), o;
};
let yt = class extends f {
  constructor() {
    super(...arguments), this.items = [], this.selected = "";
  }
  _handleClick(e, t) {
    this.selected === e ? (this.selected = "", this.dispatchEvent(new CustomEvent("item-deselect", {
      bubbles: !0,
      composed: !0
    }))) : (this.selected = e, this.dispatchEvent(new CustomEvent("item-select", {
      detail: { id: e, label: t },
      bubbles: !0,
      composed: !0
    })));
  }
  _colorVar(e) {
    return e ? {
      success: "var(--color-success)",
      error: "var(--color-error)",
      warning: "var(--color-warning)",
      primary: "var(--color-primary)",
      muted: "var(--text-muted)"
    }[e] ?? e : "";
  }
  _hasActions(e) {
    var r;
    const t = (r = this.shadowRoot) == null ? void 0 : r.querySelector(`slot[name="actions-${e}"]`);
    return !!t && t.assignedNodes().length > 0;
  }
  render() {
    return this.items.length === 0 ? c`<div class="empty">No items</div>` : c`${this.items.map((e) => {
      const t = this._colorVar(e.color), r = this.selected === e.id;
      return c`
        <div
          class="item ${r ? "active" : ""}"
          @click=${() => this._handleClick(e.id, e.label)}
        >
          <div style=${t && !r ? `color: ${t}` : ""}>${e.label}</div>
          ${e.sublabel ? c`<div class="sublabel">${e.sublabel}</div>` : ""}
        </div>
        ${r ? c`
          <div class="action-panel" style=${this._hasActions(e.id) ? "" : "display:none"}>
            <slot name="actions-${e.id}" @slotchange=${() => this.requestUpdate()}></slot>
          </div>
        ` : Tt}
      `;
    })}`;
  }
};
yt.styles = [
  v,
  u`
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
Zt([
  n({ type: Array })
], yt.prototype, "items", 2);
Zt([
  n({ type: String, reflect: !0 })
], yt.prototype, "selected", 2);
yt = Zt([
  g("tui-action-list")
], yt);
var yr = Object.defineProperty, _r = Object.getOwnPropertyDescriptor, Wt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? _r(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && yr(t, r, o), o;
};
let ht = class extends f {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.color = "";
  }
  render() {
    return c`
      <div class="label">${this.label}</div>
      <div class="value">${this.value}</div>
    `;
  }
};
ht.styles = [
  v,
  u`
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
Wt([
  n({ type: String })
], ht.prototype, "label", 2);
Wt([
  n({ type: String })
], ht.prototype, "value", 2);
Wt([
  n({ type: String, reflect: !0 })
], ht.prototype, "color", 2);
ht = Wt([
  g("tui-stat")
], ht);
var xr = Object.defineProperty, wr = Object.getOwnPropertyDescriptor, Et = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? wr(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && xr(t, r, o), o;
};
let At = class extends f {
  constructor() {
    super(...arguments), this.label = "";
  }
  render() {
    return c`
      ${this.label ? c`<span class="label">${this.label}:</span>` : ""}
      <slot></slot>
    `;
  }
};
At.styles = [
  v,
  u`
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
Et([
  n({ type: String })
], At.prototype, "label", 2);
At = Et([
  g("tui-status-strip")
], At);
let _t = class extends f {
  constructor() {
    super(...arguments), this.color = "", this.indicator = "";
  }
  render() {
    return c`
      <span class="separator">│</span>
      <slot></slot>${this.indicator ? c` ${this.indicator}` : ""}
    `;
  }
};
_t.styles = [
  v,
  u`
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
Et([
  n({ type: String, reflect: !0 })
], _t.prototype, "color", 2);
Et([
  n({ type: String })
], _t.prototype, "indicator", 2);
_t = Et([
  g("tui-strip-item")
], _t);
var $r = Object.defineProperty, zr = Object.getOwnPropertyDescriptor, Jt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? zr(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && $r(t, r, o), o;
};
let xt = class extends f {
  constructor() {
    super(...arguments), this.app = "", this.section = "";
  }
  render() {
    return c`
      ${this.app ? c`
        <span class="app-name">${this.app}</span>
        <span class="divider">|</span>
      ` : ""}
      <slot></slot>
      ${this.section ? c`<span class="section">${this.section}</span>` : ""}
    `;
  }
};
xt.styles = [
  v,
  u`
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
Jt([
  n({ type: String })
], xt.prototype, "app", 2);
Jt([
  n({ type: String })
], xt.prototype, "section", 2);
xt = Jt([
  g("tui-titlebar")
], xt);
var Sr = Object.defineProperty, Er = Object.getOwnPropertyDescriptor, Ct = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Er(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Sr(t, r, o), o;
};
const Cr = {
  monitor: "status status | main aside-1 | main aside-2",
  viewer: "primary secondary | detail detail",
  console: "main | footer",
  "console-split": "main aside | footer footer",
  triad: "left center right"
};
function Pr(e) {
  const r = e.split("|").map((d) => d.trim()).filter(Boolean).map((d) => d.split(/\s+/)), s = r.map((d) => `"${d.join(" ")}"`).join(" "), o = Math.max(...r.map((d) => d.length)), i = Array(o).fill("1fr").join(" "), a = /* @__PURE__ */ new Set(), l = [];
  for (const d of r)
    for (const p of d)
      a.has(p) || (a.add(p), l.push(p));
  const h = r.map((d, p) => {
    const x = new Set(d).size === 1;
    return x && p === 0 ? "auto" : x && p === r.length - 1 ? "120px" : "1fr";
  }).join(" ");
  return { areas: s, rows: h, cols: i, slotNames: l };
}
let K = class extends f {
  constructor() {
    super(...arguments), this.preset = "", this.areas = "", this.gap = "1px", this.labels = "";
  }
  _getGrid() {
    const e = this.preset ? Cr[this.preset] : this.areas;
    return e ? Pr(e) : null;
  }
  // When preset + areas are both set, treat areas as ordered display labels
  // mapped 1:1 onto the preset's slot names.
  _getDisplayLabels(e) {
    if (!this.preset || !this.areas) return {};
    const t = this.areas.split("|").flatMap((s) => s.trim().split(/\s+/)).filter(Boolean), r = {};
    return e.forEach((s, o) => {
      t[o] && (r[s] = t[o]);
    }), r;
  }
  render() {
    const e = this._getGrid();
    if (!e) return Tt;
    const t = `
      grid-template-areas: ${e.areas};
      grid-template-rows: ${e.rows};
      grid-template-columns: ${e.cols};
      gap: ${this.gap};
    `, r = this._getDisplayLabels(e.slotNames);
    return c`
      <div class="grid" style=${t}>
        ${e.slotNames.map((s) => {
      const o = r[s] ?? s;
      return c`
            <div class="zone ${this.labels === "titlebar" ? "has-titlebar" : ""}" style="grid-area: ${s};">
              ${this.labels === "titlebar" ? c`<div class="zone-titlebar">${o}</div>` : Tt}
              ${this.labels === "caption" ? c`<span class="zone-label">${o}</span>` : Tt}
              <slot name=${s}></slot>
            </div>
          `;
    })}
      </div>
    `;
  }
};
K.styles = [
  v,
  u`
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
Ct([
  n({ type: String, reflect: !0 })
], K.prototype, "preset", 2);
Ct([
  n({ type: String })
], K.prototype, "areas", 2);
Ct([
  n({ type: String })
], K.prototype, "gap", 2);
Ct([
  n({ type: String })
], K.prototype, "labels", 2);
K = Ct([
  g("tui-tiled")
], K);
var kr = Object.defineProperty, Or = Object.getOwnPropertyDescriptor, ut = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Or(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && kr(t, r, o), o;
};
let N = class extends f {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "", this.disabled = !1, this.name = "", this.label = "";
  }
  handleEvent(e) {
    if (e.type === "clear") {
      this.value = "";
      return;
    }
    const t = e.data;
    t.value != null && (this.value = String(t.value)), t.placeholder != null && (this.placeholder = String(t.placeholder)), t.disabled != null && (this.disabled = !!t.disabled), t.label != null && (this.label = String(t.label));
  }
  _onInput(e) {
    const t = e.target;
    this.value = t.value, this.dispatchEvent(new CustomEvent("tui-input", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value }
    }));
  }
  _onChange(e) {
    const t = e.target;
    this.value = t.value, this.dispatchEvent(new CustomEvent("tui-change", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value }
    }));
  }
  render() {
    return c`
      ${this.label ? c`<label>${this.label}</label>` : ""}
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
N.styles = [
  v,
  u`
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
ut([
  n({ reflect: !0 })
], N.prototype, "value", 2);
ut([
  n()
], N.prototype, "placeholder", 2);
ut([
  n({ type: Boolean, reflect: !0 })
], N.prototype, "disabled", 2);
ut([
  n()
], N.prototype, "name", 2);
ut([
  n()
], N.prototype, "label", 2);
N = ut([
  g("tui-input")
], N);
var Dr = Object.defineProperty, Tr = Object.getOwnPropertyDescriptor, ft = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Tr(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Dr(t, r, o), o;
};
let B = class extends f {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.name = "", this.value = "", this.label = "";
  }
  handleEvent(e) {
    if (e.type === "clear") {
      this.checked = !1;
      return;
    }
    const t = e.data;
    t.checked != null && (this.checked = !!t.checked), t.disabled != null && (this.disabled = !!t.disabled), t.label != null && (this.label = String(t.label));
  }
  _toggle() {
    this.disabled || (this.checked = !this.checked, this.dispatchEvent(new CustomEvent("tui-change", {
      bubbles: !0,
      composed: !0,
      detail: { checked: this.checked, value: this.value, name: this.name }
    })));
  }
  _onKeydown(e) {
    (e.key === " " || e.key === "Enter") && (e.preventDefault(), this._toggle());
  }
  render() {
    return c`
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
B.styles = [
  v,
  u`
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
ft([
  n({ type: Boolean, reflect: !0 })
], B.prototype, "checked", 2);
ft([
  n({ type: Boolean, reflect: !0 })
], B.prototype, "disabled", 2);
ft([
  n()
], B.prototype, "name", 2);
ft([
  n()
], B.prototype, "value", 2);
ft([
  n()
], B.prototype, "label", 2);
B = ft([
  g("tui-checkbox")
], B);
var Mr = Object.defineProperty, Hr = Object.getOwnPropertyDescriptor, gt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Hr(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Mr(t, r, o), o;
};
let W = class extends f {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.name = "", this.value = "", this.label = "";
  }
  handleEvent(e) {
    if (e.type === "clear") {
      this.checked = !1;
      return;
    }
    const t = e.data;
    t.checked != null && (this.checked = !!t.checked), t.disabled != null && (this.disabled = !!t.disabled), t.label != null && (this.label = String(t.label));
  }
  _select() {
    this.disabled || this.checked || (this.checked = !0, this.dispatchEvent(new CustomEvent("tui-change", {
      bubbles: !0,
      composed: !0,
      detail: { checked: !0, value: this.value, name: this.name }
    })));
  }
  _onKeydown(e) {
    (e.key === " " || e.key === "Enter") && (e.preventDefault(), this._select());
  }
  render() {
    return c`
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
W.styles = [
  v,
  u`
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
gt([
  n({ type: Boolean, reflect: !0 })
], W.prototype, "checked", 2);
gt([
  n({ type: Boolean, reflect: !0 })
], W.prototype, "disabled", 2);
gt([
  n()
], W.prototype, "name", 2);
gt([
  n()
], W.prototype, "value", 2);
gt([
  n()
], W.prototype, "label", 2);
W = gt([
  g("tui-radio")
], W);
var Rr = Object.defineProperty, Ir = Object.getOwnPropertyDescriptor, Pt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Ir(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Rr(t, r, o), o;
};
let Z = class extends f {
  constructor() {
    super(...arguments), this.name = "", this.label = "", this.disabled = !1, this.value = [];
  }
  _getChildren() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("slot");
    return e ? e.assignedElements().filter(
      (r) => r.tagName === "TUI-CHECKBOX"
    ) : [];
  }
  _syncChildren() {
    const e = this._getChildren();
    for (const t of e)
      this.name && (t.name = this.name), this.disabled && (t.disabled = !0);
    this._syncValueFromChildren();
  }
  _syncValueFromChildren() {
    const e = this._getChildren();
    this.value = e.filter((t) => t.checked).map((t) => t.value);
  }
  _syncChildrenFromValue() {
    const e = this._getChildren();
    for (const t of e)
      t.checked = this.value.includes(t.value);
  }
  _onSlotChange() {
    this._syncChildren();
  }
  _onChange(e) {
    e.stopPropagation(), this._syncValueFromChildren(), this.dispatchEvent(new CustomEvent("tui-change", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value, name: this.name }
    }));
  }
  handleEvent(e) {
    if (e.type === "clear") {
      this.value = [], this._syncChildrenFromValue();
      return;
    }
    const t = e.data;
    t.value != null && (this.value = t.value, this._syncChildrenFromValue()), t.disabled != null && (this.disabled = !!t.disabled, this._syncChildren());
  }
  render() {
    return c`
      ${this.label ? c`<div class="group-label">${this.label}</div>` : ""}
      <div class="group" @tui-change=${this._onChange}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
};
Z.styles = [
  v,
  u`
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
Pt([
  n()
], Z.prototype, "name", 2);
Pt([
  n()
], Z.prototype, "label", 2);
Pt([
  n({ type: Boolean, reflect: !0 })
], Z.prototype, "disabled", 2);
Pt([
  n({ type: Array })
], Z.prototype, "value", 2);
Z = Pt([
  g("tui-checkbox-group")
], Z);
var jr = Object.defineProperty, Ar = Object.getOwnPropertyDescriptor, kt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Ar(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && jr(t, r, o), o;
};
let J = class extends f {
  constructor() {
    super(...arguments), this.name = "", this.label = "", this.disabled = !1, this.value = "";
  }
  _getChildren() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("slot");
    return e ? e.assignedElements().filter(
      (r) => r.tagName === "TUI-RADIO"
    ) : [];
  }
  _syncChildren() {
    const e = this._getChildren();
    for (const t of e)
      this.name && (t.name = this.name), this.disabled && (t.disabled = !0), t.checked = t.value === this.value;
  }
  _onSlotChange() {
    this._syncChildren();
  }
  _onChange(e) {
    e.stopPropagation();
    const t = e.detail;
    this.value = t.value;
    for (const r of this._getChildren())
      r.checked = r.value === this.value;
    this.dispatchEvent(new CustomEvent("tui-change", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value, name: this.name }
    }));
  }
  _onKeydown(e) {
    const t = this._getChildren();
    if (t.length === 0) return;
    const r = t.findIndex((o) => o.value === this.value);
    let s;
    if (e.key === "ArrowDown" || e.key === "ArrowRight")
      e.preventDefault(), s = (r + 1) % t.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
      e.preventDefault(), s = (r - 1 + t.length) % t.length;
    else
      return;
    this.value = t[s].value;
    for (const o of t)
      o.checked = o.value === this.value;
    t[s].focus(), this.dispatchEvent(new CustomEvent("tui-change", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value, name: this.name }
    }));
  }
  handleEvent(e) {
    if (e.type === "clear") {
      this.value = "";
      for (const r of this._getChildren())
        r.checked = !1;
      return;
    }
    const t = e.data;
    t.value != null && (this.value = String(t.value), this._syncChildren()), t.disabled != null && (this.disabled = !!t.disabled, this._syncChildren());
  }
  render() {
    return c`
      ${this.label ? c`<div class="group-label">${this.label}</div>` : ""}
      <div class="group" role="radiogroup" @tui-change=${this._onChange} @keydown=${this._onKeydown}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
};
J.styles = [
  v,
  u`
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
kt([
  n()
], J.prototype, "name", 2);
kt([
  n()
], J.prototype, "label", 2);
kt([
  n({ type: Boolean, reflect: !0 })
], J.prototype, "disabled", 2);
kt([
  n()
], J.prototype, "value", 2);
J = kt([
  g("tui-radio-group")
], J);
class to {
  constructor(t = "ws://localhost:3001") {
    this.url = t, this.ws = null, this.handlers = /* @__PURE__ */ new Map(), this.reconnectDelay = 1e3, this.maxReconnectDelay = 3e4, this.shouldReconnect = !0;
  }
  /**
   * Connect to the push server
   */
  connect() {
    try {
      this.ws = new WebSocket(this.url), this.ws.onopen = () => {
        console.log("[RetroPush] Connected to", this.url), this.reconnectDelay = 1e3, this.emit("_connected", {});
      }, this.ws.onmessage = (t) => {
        try {
          const r = JSON.parse(t.data), { channel: s, type: o, data: i } = r;
          this.emit(s, { type: o, data: i }), this.emit("*", { channel: s, type: o, data: i });
        } catch (r) {
          console.error("[RetroPush] Invalid message:", r);
        }
      }, this.ws.onclose = () => {
        console.log("[RetroPush] Disconnected"), this.emit("_disconnected", {}), this.shouldReconnect && (setTimeout(() => this.connect(), this.reconnectDelay), this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxReconnectDelay));
      }, this.ws.onerror = (t) => {
        console.error("[RetroPush] Error:", t);
      };
    } catch (t) {
      console.error("[RetroPush] Connection failed:", t), this.shouldReconnect && setTimeout(() => this.connect(), this.reconnectDelay);
    }
  }
  /**
   * Disconnect from the push server
   */
  disconnect() {
    this.shouldReconnect = !1, this.ws && (this.ws.close(), this.ws = null);
  }
  /**
   * Subscribe to a channel
   * @param {string} channel - Channel name (or '*' for all)
   * @param {function} handler - Handler function({ type, data })
   * @returns {function} Unsubscribe function
   */
  on(t, r) {
    return this.handlers.has(t) || this.handlers.set(t, /* @__PURE__ */ new Set()), this.handlers.get(t).add(r), () => {
      var s;
      (s = this.handlers.get(t)) == null || s.delete(r);
    };
  }
  /**
   * Emit to handlers
   */
  emit(t, r) {
    const s = this.handlers.get(t);
    if (s)
      for (const o of s)
        try {
          o(r);
        } catch (i) {
          console.error("[RetroPush] Handler error:", i);
        }
  }
}
function eo({ grid: e, projection: t, cellRenderer: r, regions: s, sortOrder: o }) {
  const i = e.length, a = i > 0 ? e[0].length : 0;
  t.getDimensions && t.getDimensions(a, i);
  const l = o ? o(a, i) : Lr(a, i);
  let h = "";
  for (const { x: d, y: p } of l) {
    const x = e[p][d];
    if (x)
      if (s)
        for (const w of s) {
          const C = r(d, p, x, w);
          if (!C) continue;
          const vt = t.getCellPath(d, p, w);
          h += de(vt, C);
        }
      else {
        const w = r(d, p, x);
        if (!w) continue;
        const C = t.getCellPath(d, p);
        h += de(C, w);
      }
  }
  return h;
}
function ro(e, t) {
  const r = [];
  for (let s = 0; s < e + t - 1; s++)
    for (let o = 0; o <= s; o++) {
      const i = s - o;
      i >= 0 && i < e && o >= 0 && o < t && r.push({ x: i, y: o });
    }
  return r;
}
function Lr(e, t) {
  const r = [];
  for (let s = 0; s < t; s++)
    for (let o = 0; o < e; o++)
      r.push({ x: o, y: s });
  return r;
}
function de(e, { fill: t, stroke: r = "none", strokeWidth: s = 0, opacity: o = 1 }) {
  let i = `d="${e}" fill="${t}"`;
  return r !== "none" && (i += ` stroke="${r}" stroke-width="${s}"`), o < 1 && (i += ` opacity="${o}"`), `<path ${i}/>`;
}
function Xr(e, t) {
  return Array.from({ length: t }, () => Array(e).fill(null));
}
function Yr(e, t) {
  var a;
  const r = e.map((l) => [...l]), { location: s, size: o, data: i } = t;
  for (let l = 0; l < o.height; l++)
    for (let h = 0; h < o.width; h++) {
      const d = (a = i[l]) == null ? void 0 : a[h];
      if (d == null) continue;
      const p = s.x + h, x = s.y + l;
      x < r.length && p < r[x].length && (r[x][p] = d);
    }
  return r;
}
function Nr(e, t, r) {
  const s = Xr(t, r);
  for (let o = 0; o < e.length && o < r; o++)
    for (let i = 0; i < e[o].length && i < t; i++) {
      const a = e[o][i];
      a !== " " && (s[o][i] = a);
    }
  return s;
}
function oo(e, t) {
  const { size: r, body: s, layers: o } = e;
  let i = Nr(s.default, r.width, r.height);
  for (const a of o) {
    const l = t[a.name], d = (a.frames[l] || a.frames[Object.keys(a.frames)[0]]).map(
      (p) => p.map((x) => x === " " ? null : x)
    );
    i = Yr(i, {
      location: a.location,
      size: a.size,
      data: d
    });
  }
  return i;
}
function so(e, t) {
  let r = t, s = 0;
  return {
    get mood() {
      return r;
    },
    setMood(o) {
      e[o] && (r = o, s = 0);
    },
    next() {
      const o = e[r], i = {};
      for (const [a, l] of Object.entries(o))
        i[a] = l[s % l.length];
      return s++, i;
    }
  };
}
function io(e) {
  return typeof e.channel == "string" && e.channel.length > 0 && typeof e.type == "string" && e.type.length > 0 && typeof e.id == "string" && e.id.length > 0 && e.data != null && typeof e.data == "object";
}
class ao {
  constructor(t) {
    this.channel = t.channel, this.url = t.url ?? "http://localhost:3001/push";
  }
  async log(t, r, s) {
    const o = { message: r };
    s && (o.level = s), await this.emit("log", t, o);
  }
  async progress(t, r, s) {
    const o = { value: r, ...s };
    await this.emit("progress", t, o);
  }
  async table(t, r) {
    await this.emit("table", t, r);
  }
  async status(t, r, s) {
    await this.emit("status", t, { state: r, message: s });
  }
  async clear(t) {
    await this.emit("clear", t, {});
  }
  async dismiss(t) {
    await this.emit("dismiss", t, {});
  }
  async emit(t, r, s) {
    const o = { channel: this.channel, type: t, id: r, data: s };
    await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(o)
    });
  }
}
class no {
  constructor(t = {}) {
    this.components = /* @__PURE__ */ new Map(), this.onCreate = t.onCreate;
  }
  register(t, r) {
    this.components.set(t, r);
  }
  unregister(t) {
    this.components.delete(t);
  }
  has(t) {
    return this.components.has(t);
  }
  route(t) {
    let r = this.components.get(t.id);
    if (!r && this.onCreate) {
      const s = this.onCreate(t);
      s && (this.register(t.id, s), r = s);
    }
    r && (r.handleEvent(t), t.type === "dismiss" && this.unregister(t.id));
  }
}
var Br = Object.defineProperty, Wr = Object.getOwnPropertyDescriptor, Ot = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Wr(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Br(t, r, o), o;
};
let Q = class extends f {
  constructor() {
    super(...arguments), this.value = 0, this.label = "", this.total = 0, this.current = 0;
  }
  handleEvent(e) {
    if (e.type === "clear") {
      this.value = 0, this.label = "", this.total = 0, this.current = 0;
      return;
    }
    const t = e.data;
    t.value != null && (this.value = t.value), t.label != null && (this.label = t.label), t.total != null && (this.total = t.total), t.current != null && (this.current = t.current);
  }
  get _clampedValue() {
    return Math.max(0, Math.min(1, this.value));
  }
  render() {
    const e = Math.round(this._clampedValue * 100);
    return c`
      <div class="progress">
        <div class="header">
          ${this.label ? c`<span class="label">${this.label}</span>` : ""}
          <span class="stats">
            ${this.total > 0 ? c`<span class="count">${this.current}/${this.total}</span>` : ""}
            <span class="percentage">${e}%</span>
          </span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${e}%"></div>
        </div>
      </div>
    `;
  }
};
Q.styles = [
  v,
  u`
      :host { display: block; }
      .progress { padding: var(--spacing-sm); font-size: 0.8rem; }
      .header { display: flex; justify-content: space-between; margin-bottom: var(--spacing-xs); color: var(--text-primary); }
      .label { color: var(--text-primary); }
      .stats { display: flex; gap: var(--spacing-sm); color: var(--text-muted); }
      .bar-track { height: 12px; background: var(--surface-base); border: var(--border-width) solid var(--border-default); overflow: hidden; }
      .bar-fill { height: 100%; background: var(--color-primary); transition: width 0.2s ease; }
    `
];
Ot([
  n({ type: Number })
], Q.prototype, "value", 2);
Ot([
  n({ type: String })
], Q.prototype, "label", 2);
Ot([
  n({ type: Number })
], Q.prototype, "total", 2);
Ot([
  n({ type: Number })
], Q.prototype, "current", 2);
Q = Ot([
  g("tui-progress")
], Q);
var Ur = Object.defineProperty, qr = Object.getOwnPropertyDescriptor, Qt = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? qr(t, r) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (o = (s ? a(t, r, o) : a(o)) || o);
  return s && o && Ur(t, r, o), o;
};
const Gr = {
  success: "✓",
  error: "✗",
  warn: "⚠",
  info: "ℹ",
  pending: "…"
};
let wt = class extends f {
  constructor() {
    super(...arguments), this.state = "", this.message = "";
  }
  handleEvent(e) {
    if (e.type === "clear") {
      this.state = "", this.message = "";
      return;
    }
    const t = e.data;
    t.state != null && (this.state = t.state), t.message != null && (this.message = t.message);
  }
  render() {
    return this.state ? c`
      <div class="badge ${this.state}">
        <span class="indicator">${Gr[this.state] ?? ""}</span>
        <span class="message">${this.message}</span>
      </div>
    ` : c`<div class="empty">No status</div>`;
  }
};
wt.styles = [
  v,
  u`
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
Qt([
  n({ type: String })
], wt.prototype, "state", 2);
Qt([
  n({ type: String })
], wt.prototype, "message", 2);
wt = Qt([
  g("tui-status")
], wt);
export {
  yt as ActionList,
  T as App,
  Xt as BORDER_CHARS,
  z as Button,
  $ as Canvas,
  R as Card,
  B as Checkbox,
  Z as CheckboxGroup,
  M as Console,
  no as EventRouter,
  S as Grid,
  N as Input,
  cr as IsometricProjection,
  ct as Link,
  It as Menu,
  nt as MenuAction,
  qt as MenuDivider,
  at as MenuItem,
  q as Modal,
  Y as Output,
  F as Palette,
  b as Panel,
  Q as Progress,
  W as Radio,
  J as RadioGroup,
  lr as RectangularProjection,
  ao as RetroEmitter,
  to as RetroPush,
  Kr as STATE_BORDERS,
  ot as Sidebar,
  ht as Stat,
  wt as Status,
  lt as StatusItem,
  At as StatusStrip,
  jt as Statusbar,
  _t as StripItem,
  st as Table,
  it as Text,
  K as Tiled,
  xt as Titlebar,
  V as Toast,
  G as Tool,
  Jr as ToolState,
  H as Toolbar,
  hr as TriangularProjection,
  D as Workspace,
  Kt as ansiToHtml,
  Nr as bodyToGrid,
  oo as compose,
  Xr as createGrid,
  so as createMoodCycler,
  Te as getBorderChars,
  U as getProjection,
  ro as isometricOrder,
  Yr as overlay,
  Pr as parseAreas,
  eo as renderGrid,
  Rt as titleDecoration,
  Ue as toolContext,
  Qr as tuiToast,
  io as validateEvent
};
