const jt = '.theme-terminal-classic,:root{--color-primary: #00ffff;--color-primary-bg: #002b36;--color-primary-fg: #00ffff;--color-secondary: #00ff00;--color-secondary-bg: #003300;--color-secondary-fg: #00ff00;--color-error: #ff5555;--color-error-bg: #330000;--color-error-fg: #ff5555;--color-warning: #e8691e;--color-warning-bg: #331500;--color-warning-fg: #e8691e;--color-success: #50fa7b;--color-success-bg: #003300;--color-success-fg: #50fa7b;--color-info: #8be9fd;--color-info-bg: #002233;--color-info-fg: #8be9fd;--surface-base: #0a0a0a;--surface-elevated: #1a1a1a;--surface-overlay: #2a2a2a;--text-primary: #e0e0e0;--text-muted: #666666;--border-default: #333333;--border-width: 1px;--border-radius: 0px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}.theme-vibrant-scifi{--color-primary: #ff00ff;--color-primary-bg: #ff00ff;--color-primary-fg: #000000;--color-secondary: #00ffcc;--color-secondary-bg: #00ffcc;--color-secondary-fg: #000000;--color-error: #ff3366;--color-error-bg: #ff3366;--color-error-fg: #ffffff;--color-warning: #ff6622;--color-warning-bg: #ff6622;--color-warning-fg: #000000;--color-success: #00ff66;--color-success-bg: #00ff66;--color-success-fg: #000000;--color-info: #6666ff;--color-info-bg: #6666ff;--color-info-fg: #ffffff;--surface-base: #0d0d1a;--surface-elevated: #1a1a2e;--surface-overlay: #2a2a4a;--text-primary: #ffffff;--text-muted: #8888aa;--border-default: #4a4a6a;--border-width: 2px;--border-radius: 2px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}html,body{background:var(--surface-base);color:var(--text-primary);font-family:var(--font-mono);color-scheme:dark}.theme-home-security-interface{--color-primary: #3fb950;--color-primary-bg: #002b36;--color-primary-fg: #3fb950;--color-secondary: #00ff00;--color-secondary-bg: #003300;--color-secondary-fg: #00ff00;--color-error: #ff5555;--color-error-bg: #330000;--color-error-fg: #ff5555;--color-warning: #e8691e;--color-warning-bg: #331500;--color-warning-fg: #e8691e;--color-success: #3fb950;--color-success-bg: #003300;--color-success-fg: #3fb950;--color-info: #8be9fd;--color-info-bg: #002233;--color-info-fg: #8be9fd;--surface-base: #111;--surface-elevated: #1a1a1a;--surface-overlay: #2a2a2a;--text-primary: #e0e0e0;--text-muted: #666666;--border-default: #3fb950;--border-width: 3px;--border-radius: 0px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}', mt = "__retro_tui_tokens__";
if (typeof document < "u" && !document[mt]) {
  const t = document.createElement("style");
  t.textContent = jt, (document.head || document.documentElement).appendChild(t);
  const e = document.documentElement;
  e.style.setProperty("color", "var(--text-primary)"), e.style.setProperty("background", "var(--surface-base)"), e.style.setProperty("font-family", "var(--font-mono)"), e.style.setProperty("color-scheme", "dark"), document[mt] = !0;
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Le = globalThis, at = Le.ShadowRoot && (Le.ShadyCSS === void 0 || Le.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, nt = Symbol(), bt = /* @__PURE__ */ new WeakMap();
let Tt = class {
  constructor(e, r, s) {
    if (this._$cssResult$ = !0, s !== nt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (at && e === void 0) {
      const s = r !== void 0 && r.length === 1;
      s && (e = bt.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && bt.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const _ = (t) => new Tt(typeof t == "string" ? t : t + "", void 0, nt), m = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((s, o, i) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[i + 1], t[0]);
  return new Tt(r, t, nt);
}, Lt = (t, e) => {
  if (at) t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of e) {
    const s = document.createElement("style"), o = Le.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = r.cssText, t.appendChild(s);
  }
}, vt = at ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const s of e.cssRules) r += s.cssText;
  return _(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Bt, defineProperty: Wt, getOwnPropertyDescriptor: Ut, getOwnPropertyNames: Yt, getOwnPropertySymbols: Xt, getPrototypeOf: Vt } = Object, N = globalThis, gt = N.trustedTypes, qt = gt ? gt.emptyScript : "", et = N.reactiveElementPolyfillSupport, xe = (t, e) => t, Be = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? qt : null;
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
} }, lt = (t, e) => !Bt(t, e), yt = { attribute: !0, type: String, converter: Be, reflect: !1, useDefault: !1, hasChanged: lt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), N.litPropertyMetadata ?? (N.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let se = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, r = yt) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(e, r), !r.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, r);
      o !== void 0 && Wt(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, r, s) {
    const { get: o, set: i } = Ut(this.prototype, e) ?? { get() {
      return this[r];
    }, set(a) {
      this[r] = a;
    } };
    return { get: o, set(a) {
      const d = o == null ? void 0 : o.call(this);
      i == null || i.call(this, a), this.requestUpdate(e, d, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? yt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(xe("elementProperties"))) return;
    const e = Vt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(xe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(xe("properties"))) {
      const r = this.properties, s = [...Yt(r), ...Xt(r)];
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
      for (const o of s) r.unshift(vt(o));
    } else e !== void 0 && r.push(vt(e));
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
    return Lt(e, this.constructor.elementStyles), e;
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
      const a = (((i = s.converter) == null ? void 0 : i.toAttribute) !== void 0 ? s.converter : Be).toAttribute(r, s.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, r) {
    var i, a;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const d = s.getPropertyOptions(o), l = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((i = d.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? d.converter : Be;
      this._$Em = o;
      const h = l.fromAttribute(r, d.type);
      this[o] = h ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, r, s, o = !1, i) {
    var a;
    if (e !== void 0) {
      const d = this.constructor;
      if (o === !1 && (i = this[e]), s ?? (s = d.getPropertyOptions(e)), !((s.hasChanged ?? lt)(i, r) || s.useDefault && s.reflect && i === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(d._$Eu(e, s)))) return;
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
        const { wrapped: d } = a, l = this[i];
        d !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, a, l);
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
};
se.elementStyles = [], se.shadowRootOptions = { mode: "open" }, se[xe("elementProperties")] = /* @__PURE__ */ new Map(), se[xe("finalized")] = /* @__PURE__ */ new Map(), et == null || et({ ReactiveElement: se }), (N.reactiveElementVersions ?? (N.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const we = globalThis, _t = (t) => t, We = we.trustedTypes, xt = We ? We.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ht = "$lit$", R = `lit$${Math.random().toFixed(9).slice(2)}$`, It = "?" + R, Ft = `<${It}>`, V = document, $e = () => V.createComment(""), Ee = (t) => t === null || typeof t != "object" && typeof t != "function", ct = Array.isArray, Kt = (t) => ct(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", tt = `[ 	
\f\r]`, _e = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, wt = /-->/g, $t = />/g, U = RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Et = /'/g, zt = /"/g, Mt = /^(?:script|style|textarea|title)$/i, Gt = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), c = Gt(1), ie = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), Ct = /* @__PURE__ */ new WeakMap(), Y = V.createTreeWalker(V, 129);
function Rt(t, e) {
  if (!ct(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return xt !== void 0 ? xt.createHTML(e) : e;
}
const Zt = (t, e) => {
  const r = t.length - 1, s = [];
  let o, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = _e;
  for (let d = 0; d < r; d++) {
    const l = t[d];
    let h, u, p = -1, x = 0;
    for (; x < l.length && (a.lastIndex = x, u = a.exec(l), u !== null); ) x = a.lastIndex, a === _e ? u[1] === "!--" ? a = wt : u[1] !== void 0 ? a = $t : u[2] !== void 0 ? (Mt.test(u[2]) && (o = RegExp("</" + u[2], "g")), a = U) : u[3] !== void 0 && (a = U) : a === U ? u[0] === ">" ? (a = o ?? _e, p = -1) : u[1] === void 0 ? p = -2 : (p = a.lastIndex - u[2].length, h = u[1], a = u[3] === void 0 ? U : u[3] === '"' ? zt : Et) : a === zt || a === Et ? a = U : a === wt || a === $t ? a = _e : (a = U, o = void 0);
    const C = a === U && t[d + 1].startsWith("/>") ? " " : "";
    i += a === _e ? l + Ft : p >= 0 ? (s.push(h), l.slice(0, p) + Ht + l.slice(p) + R + C) : l + R + (p === -2 ? d : C);
  }
  return [Rt(t, i + (t[r] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
let st = class Nt {
  constructor({ strings: e, _$litType$: r }, s) {
    let o;
    this.parts = [];
    let i = 0, a = 0;
    const d = e.length - 1, l = this.parts, [h, u] = Zt(e, r);
    if (this.el = Nt.createElement(h, s), Y.currentNode = this.el.content, r === 2 || r === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = Y.nextNode()) !== null && l.length < d; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(Ht)) {
          const x = u[a++], C = o.getAttribute(p).split(R), Ne = /([.?@])?(.*)/.exec(x);
          l.push({ type: 1, index: i, name: Ne[2], strings: C, ctor: Ne[1] === "." ? Qt : Ne[1] === "?" ? er : Ne[1] === "@" ? tr : qe }), o.removeAttribute(p);
        } else p.startsWith(R) && (l.push({ type: 6, index: i }), o.removeAttribute(p));
        if (Mt.test(o.tagName)) {
          const p = o.textContent.split(R), x = p.length - 1;
          if (x > 0) {
            o.textContent = We ? We.emptyScript : "";
            for (let C = 0; C < x; C++) o.append(p[C], $e()), Y.nextNode(), l.push({ type: 2, index: ++i });
            o.append(p[x], $e());
          }
        }
      } else if (o.nodeType === 8) if (o.data === It) l.push({ type: 2, index: i });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(R, p + 1)) !== -1; ) l.push({ type: 7, index: i }), p += R.length - 1;
      }
      i++;
    }
  }
  static createElement(e, r) {
    const s = V.createElement("template");
    return s.innerHTML = e, s;
  }
};
function ae(t, e, r = t, s) {
  var a, d;
  if (e === ie) return e;
  let o = s !== void 0 ? (a = r._$Co) == null ? void 0 : a[s] : r._$Cl;
  const i = Ee(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== i && ((d = o == null ? void 0 : o._$AO) == null || d.call(o, !1), i === void 0 ? o = void 0 : (o = new i(t), o._$AT(t, r, s)), s !== void 0 ? (r._$Co ?? (r._$Co = []))[s] = o : r._$Cl = o), o !== void 0 && (e = ae(t, o._$AS(t, e.values), o, s)), e;
}
class Jt {
  constructor(e, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: r }, parts: s } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? V).importNode(r, !0);
    Y.currentNode = o;
    let i = Y.nextNode(), a = 0, d = 0, l = s[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let h;
        l.type === 2 ? h = new Oe(i, i.nextSibling, this, e) : l.type === 1 ? h = new l.ctor(i, l.name, l.strings, this, e) : l.type === 6 && (h = new rr(i, this, e)), this._$AV.push(h), l = s[++d];
      }
      a !== (l == null ? void 0 : l.index) && (i = Y.nextNode(), a++);
    }
    return Y.currentNode = V, o;
  }
  p(e) {
    let r = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, r), r += s.strings.length - 2) : s._$AI(e[r])), r++;
  }
}
class Oe {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, r, s, o) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = ae(this, e, r), Ee(e) ? e === w || e == null || e === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : e !== this._$AH && e !== ie && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Kt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== w && Ee(this._$AH) ? this._$AA.nextSibling.data = e : this.T(V.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var i;
    const { values: r, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = st.createElement(Rt(s.h, s.h[0]), this.options)), s);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === o) this._$AH.p(r);
    else {
      const a = new Jt(o, this), d = a.u(this.options);
      a.p(r), this.T(d), this._$AH = a;
    }
  }
  _$AC(e) {
    let r = Ct.get(e.strings);
    return r === void 0 && Ct.set(e.strings, r = new st(e)), r;
  }
  k(e) {
    ct(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let s, o = 0;
    for (const i of e) o === r.length ? r.push(s = new Oe(this.O($e()), this.O($e()), this, this.options)) : s = r[o], s._$AI(i), o++;
    o < r.length && (this._$AR(s && s._$AB.nextSibling, o), r.length = o);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, r); e !== this._$AB; ) {
      const o = _t(e).nextSibling;
      _t(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var r;
    this._$AM === void 0 && (this._$Cv = e, (r = this._$AP) == null || r.call(this, e));
  }
}
let qe = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, r, s, o, i) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = e, this.name = r, this._$AM = o, this.options = i, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = w;
  }
  _$AI(e, r = this, s, o) {
    const i = this.strings;
    let a = !1;
    if (i === void 0) e = ae(this, e, r, 0), a = !Ee(e) || e !== this._$AH && e !== ie, a && (this._$AH = e);
    else {
      const d = e;
      let l, h;
      for (e = i[0], l = 0; l < i.length - 1; l++) h = ae(this, d[s + l], r, l), h === ie && (h = this._$AH[l]), a || (a = !Ee(h) || h !== this._$AH[l]), h === w ? e = w : e !== w && (e += (h ?? "") + i[l + 1]), this._$AH[l] = h;
    }
    a && !o && this.j(e);
  }
  j(e) {
    e === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
class Qt extends qe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === w ? void 0 : e;
  }
}
class er extends qe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== w);
  }
}
class tr extends qe {
  constructor(e, r, s, o, i) {
    super(e, r, s, o, i), this.type = 5;
  }
  _$AI(e, r = this) {
    if ((e = ae(this, e, r, 0) ?? w) === ie) return;
    const s = this._$AH, o = e === w && s !== w || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, i = e !== w && (s === w || o);
    o && this.element.removeEventListener(this.name, this, s), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class rr {
  constructor(e, r, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ae(this, e);
  }
}
const rt = we.litHtmlPolyfillSupport;
rt == null || rt(st, Oe), (we.litHtmlVersions ?? (we.litHtmlVersions = [])).push("3.3.2");
const or = (t, e, r) => {
  const s = (r == null ? void 0 : r.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const i = (r == null ? void 0 : r.renderBefore) ?? null;
    s._$litPart$ = o = new Oe(e.insertBefore($e(), i), i, void 0, r ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis;
class f extends se {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var r;
    const e = super.createRenderRoot();
    return (r = this.renderOptions).renderBefore ?? (r.renderBefore = e.firstChild), e;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = or(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return ie;
  }
}
var Dt;
f._$litElement$ = !0, f.finalized = !0, (Dt = X.litElementHydrateSupport) == null || Dt.call(X, { LitElement: f });
const ot = X.litElementPolyfillSupport;
ot == null || ot({ LitElement: f });
(X.litElementVersions ?? (X.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const b = (t) => (e, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const sr = { attribute: !0, type: String, converter: Be, reflect: !1, hasChanged: lt }, ir = (t = sr, e, r) => {
  const { kind: s, metadata: o } = r;
  let i = globalThis.litPropertyMetadata.get(o);
  if (i === void 0 && globalThis.litPropertyMetadata.set(o, i = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), i.set(r.name, t), s === "accessor") {
    const { name: a } = r;
    return { set(d) {
      const l = e.get.call(this);
      e.set.call(this, d), this.requestUpdate(a, l, t, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(a, void 0, t, d), d;
    } };
  }
  if (s === "setter") {
    const { name: a } = r;
    return function(d) {
      const l = this[a];
      e.call(this, d), this.requestUpdate(a, l, t, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function n(t) {
  return (e, r) => typeof r == "object" ? ir(t, e, r) : ((s, o, i) => {
    const a = o.hasOwnProperty(i);
    return o.constructor.createProperty(i, s), a ? Object.getOwnPropertyDescriptor(o, i) : void 0;
  })(t, e, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $(t) {
  return n({ ...t, state: !0, attribute: !1 });
}
const v = m`
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
var ar = Object.defineProperty, nr = Object.getOwnPropertyDescriptor, te = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? nr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && ar(e, r, o), o;
};
let O = class extends f {
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
    const t = this.subtitle ? c`░░ ${this.title} <span>[ ${this.subtitle} ]</span> ░░` : c`░░ ${this.title} ░░`;
    return c`
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
O.styles = [
  v,
  m`
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
te([
  n({ type: String, reflect: !0 })
], O.prototype, "title", 2);
te([
  n({ type: String, reflect: !0 })
], O.prototype, "subtitle", 2);
te([
  n({ type: Boolean, reflect: !0 })
], O.prototype, "compact", 2);
te([
  n({ type: String, reflect: !0 })
], O.prototype, "decorations", 2);
te([
  $()
], O.prototype, "_focusContext", 2);
te([
  $()
], O.prototype, "_menuOpen", 2);
O = te([
  b("tui-app")
], O);
var lr = Object.defineProperty, cr = Object.getOwnPropertyDescriptor, dt = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? cr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && lr(e, r, o), o;
};
let k = class extends f {
  constructor() {
    super(...arguments), this._bounds = new DOMRect(), this._snapPreview = null, this._resizeObserver = null, this._handlePanelMove = (t) => {
      const e = t.target;
      if (!e.hasAttribute("floating")) return;
      const { x: r, y: s } = t.detail, o = e.panelWidth ?? e.offsetWidth ?? 100, i = e.panelHeight ?? e.offsetHeight ?? 100, a = this._detectSnapEdge(r, s, o, i);
      if (this._snapPreview = a, this._bounds.width > 0 && this._bounds.height > 0) {
        const d = this._bounds.width - o, l = this._bounds.height - i;
        if (d > 0 && l > 0) {
          const h = Math.max(0, Math.min(r, d)), u = Math.max(0, Math.min(s, l));
          (h !== r || u !== s) && (e.positionX = h, e.positionY = u);
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
      const { width: r, height: s } = t.detail, o = e.positionX ?? 0, i = e.positionY ?? 0, a = this._bounds.width - o, d = this._bounds.height - i, l = Math.min(r, a), h = Math.min(s, d);
      l !== r && (e.panelWidth = l), h !== s && (e.panelHeight = h), this._emitLayoutChange();
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
        this._bounds = e.contentRect, this.dispatchEvent(new CustomEvent("tui-workspace-bounds-change", {
          detail: { bounds: this._bounds },
          bubbles: !0,
          composed: !0
        }));
    }), this._resizeObserver.observe(this)) : this._bounds = new DOMRect(0, 0, this.offsetWidth || 800, this.offsetHeight || 600), this.addEventListener("tui-panel-move", this._handlePanelMove), this.addEventListener("tui-panel-resize", this._handlePanelResize), this.addEventListener("tui-panel-dismiss", this._handlePanelDismiss), this.addEventListener("tui-panel-drag-end", this._handlePanelDragEnd), this.addEventListener("tui-panel-minimize", this._handlePanelMinimize), this.addEventListener("tui-panel-restore", this._handlePanelRestore);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._resizeObserver) == null || t.disconnect(), this.removeEventListener("tui-panel-move", this._handlePanelMove), this.removeEventListener("tui-panel-resize", this._handlePanelResize), this.removeEventListener("tui-panel-dismiss", this._handlePanelDismiss), this.removeEventListener("tui-panel-drag-end", this._handlePanelDragEnd), this.removeEventListener("tui-panel-minimize", this._handlePanelMinimize), this.removeEventListener("tui-panel-restore", this._handlePanelRestore);
  }
  _detectSnapEdge(t, e, r, s) {
    const o = this._bounds;
    return t <= k.SNAP_ZONE ? "left" : t + r >= o.width - k.SNAP_ZONE ? "right" : e <= k.SNAP_ZONE ? "top" : null;
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
    this.dispatchEvent(new CustomEvent("tui-workspace-layout-change", {
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
      const r = e.positionX ?? 0, s = e.positionY ?? 0, o = e.panelWidth ?? e.offsetWidth ?? 100, i = e.panelHeight ?? e.offsetHeight ?? 100, a = this._bounds.width - o, d = this._bounds.height - i;
      if (a < 0 || d < 0) continue;
      const l = Math.max(0, Math.min(r, a)), h = Math.max(0, Math.min(s, d));
      l !== r && (e.positionX = l), h !== s && (e.positionY = h);
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
k.SNAP_ZONE = 20;
k.styles = [
  v,
  m`
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
dt([
  $()
], k.prototype, "_bounds", 2);
dt([
  $()
], k.prototype, "_snapPreview", 2);
k = dt([
  b("tui-workspace")
], k);
var dr = Object.defineProperty, hr = Object.getOwnPropertyDescriptor, Fe = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? hr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && dr(e, r, o), o;
};
let ne = class extends f {
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
      const d = t[t.length - 1];
      if (d) {
        const l = (o = (s = this.shadowRoot) == null ? void 0 : s.querySelector(".content")) == null ? void 0 : o.getBoundingClientRect(), h = d.getBoundingClientRect();
        if (l)
          return h.bottom - l.top;
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
ne.styles = [
  v,
  m`
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
Fe([
  n({ type: String, reflect: !0 })
], ne.prototype, "side", 2);
Fe([
  n({ type: Number })
], ne.prototype, "size", 2);
Fe([
  $()
], ne.prototype, "_dropIndex", 2);
ne = Fe([
  b("tui-sidebar")
], ne);
const Ke = {
  single: { tl: "┌", tr: "┐", bl: "└", br: "┘", h: "─", v: "│" },
  heavy: { tl: "┏", tr: "┓", bl: "┗", br: "┛", h: "━", v: "┃" },
  double: { tl: "╔", tr: "╗", bl: "╚", br: "╝", h: "═", v: "║" },
  rounded: { tl: "╭", tr: "╮", bl: "╰", br: "╯", h: "─", v: "│" }
};
function pr(t) {
  return t === "none" ? null : Ke[t];
}
function Ue(t) {
  const e = pr(t);
  return e ? {
    before: `${e.tl}${e.h} `,
    after: ` ${e.h}${e.tr}`
  } : { before: "", after: "" };
}
const yo = {
  neutral: "single",
  hover: "heavy",
  selected: "double"
};
var ur = Object.defineProperty, fr = Object.getOwnPropertyDescriptor, y = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? fr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && ur(e, r, o), o;
};
let g = class extends f {
  constructor() {
    super(...arguments), this.title = "", this.color = "", this.border = "single", this.variant = "bright", this.selectionStyle = "", this.collapsible = !1, this.collapsed = !1, this.selected = !1, this.active = !1, this.persistId = "", this.dismissable = !1, this.full = !1, this.floating = !1, this.snapEdge = "", this.positionX = 0, this.positionY = 0, this.resizable = !1, this.minimized = !1, this.panelWidth = null, this.panelHeight = null, this.maxWidth = null, this.maxHeight = null, this.minWidth = 150, this.minHeight = 100, this.docked = "", this._isDragging = !1, this._dragStartX = 0, this._dragStartY = 0, this._dragOffsetX = 0, this._dragOffsetY = 0, this._isResizing = !1, this._resizeStartX = 0, this._resizeStartY = 0, this._resizeStartWidth = 0, this._resizeStartHeight = 0, this._preMinimizeX = 0, this._preMinimizeY = 0, this._preMinimizeWidth = null, this._preMinimizeHeight = null, this._handleClick = () => {
      this.dispatchEvent(new CustomEvent("tui-panel-focus-request", {
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
      this.positionX = this._dragOffsetX + e, this.positionY = this._dragOffsetY + r, this.dispatchEvent(new CustomEvent("tui-panel-move", {
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
      this._isDragging = !1, document.removeEventListener("pointermove", this._onDragMove), document.removeEventListener("pointerup", this._onDragEnd), this.dispatchEvent(new CustomEvent("tui-panel-drag-end", {
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
      s = Math.max(this.minWidth, s), o = Math.max(this.minHeight, o), this.maxWidth !== null && (s = Math.min(this.maxWidth, s)), this.maxHeight !== null && (o = Math.min(this.maxHeight, o)), this.panelWidth = s, this.panelHeight = o, this.dispatchEvent(new CustomEvent("tui-panel-resize", {
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
    this.collapsible && (this.collapsed = !this.collapsed, this.persistId && localStorage.setItem(`tui-panel-${this.persistId}`, String(this.collapsed)), this.dispatchEvent(new CustomEvent("tui-panel-toggle", {
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
    const t = new CustomEvent("tui-panel-dismiss", {
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
      this.dispatchEvent(new CustomEvent("tui-panel-minimize", {
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
      this.dispatchEvent(new CustomEvent("tui-panel-restore", {
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
    return this.minimized ? c`
        <div class="edge-tab" @click=${this._onEdgeTabClick} title="Click to restore ${this.title}">
          ${this.title}
        </div>
      ` : c`
      <div class="panel ${this.collapsed ? "collapsed" : ""}">
        <div
          class="header ${(this.floating || this.docked) && !this.full ? "draggable" : ""}"
          @pointerdown=${(this.floating || this.docked) && !this.full ? this._onDragStart : void 0}
        >
          <span class="title"><span class="title-decor">${Ue(this.border).before}</span>${this.title}<span class="title-decor">${Ue(this.border).after}</span></span>
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
g.styles = [
  v,
  m`
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
         SEMANTIC COLORS — see docs/api/semantic-colors.md
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

      :host([color="warning"]) {
        --panel-color: var(--color-warning);
        --panel-color-bg: var(--color-warning-bg);
        --panel-color-fg: var(--color-warning-fg);
      }

      /* muted has no -bg/-fg companions in tokens.css — surface-elevated is
         the correct neutral ground for a de-emphasised panel. */
      :host([color="muted"]) {
        --panel-color: var(--text-muted);
        --panel-color-bg: var(--surface-elevated);
        --panel-color-fg: var(--text-muted);
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
y([
  n({ type: String })
], g.prototype, "title", 2);
y([
  n({ type: String, reflect: !0 })
], g.prototype, "color", 2);
y([
  n({ type: String, reflect: !0 })
], g.prototype, "border", 2);
y([
  n({ type: String, reflect: !0 })
], g.prototype, "variant", 2);
y([
  n({ type: String, attribute: "selection-style", reflect: !0 })
], g.prototype, "selectionStyle", 2);
y([
  n({ type: Boolean })
], g.prototype, "collapsible", 2);
y([
  n({ type: Boolean, reflect: !0 })
], g.prototype, "collapsed", 2);
y([
  n({ type: Boolean, reflect: !0 })
], g.prototype, "selected", 2);
y([
  n({ type: Boolean, reflect: !0 })
], g.prototype, "active", 2);
y([
  n({ type: String, attribute: "persist-id" })
], g.prototype, "persistId", 2);
y([
  n({ type: Boolean, reflect: !0 })
], g.prototype, "dismissable", 2);
y([
  n({ type: Boolean, reflect: !0 })
], g.prototype, "full", 2);
y([
  n({ type: Boolean, reflect: !0 })
], g.prototype, "floating", 2);
y([
  n({ type: String, attribute: "snap-edge", reflect: !0 })
], g.prototype, "snapEdge", 2);
y([
  n({ type: Number, attribute: "position-x" })
], g.prototype, "positionX", 2);
y([
  n({ type: Number, attribute: "position-y" })
], g.prototype, "positionY", 2);
y([
  n({ type: Boolean, reflect: !0 })
], g.prototype, "resizable", 2);
y([
  n({ type: Boolean, reflect: !0 })
], g.prototype, "minimized", 2);
y([
  n({ type: Number, attribute: "panel-width" })
], g.prototype, "panelWidth", 2);
y([
  n({ type: Number, attribute: "panel-height" })
], g.prototype, "panelHeight", 2);
y([
  n({ type: Number, attribute: "max-width" })
], g.prototype, "maxWidth", 2);
y([
  n({ type: Number, attribute: "max-height" })
], g.prototype, "maxHeight", 2);
y([
  n({ type: Number, attribute: "min-width" })
], g.prototype, "minWidth", 2);
y([
  n({ type: Number, attribute: "min-height" })
], g.prototype, "minHeight", 2);
y([
  n({
    type: String,
    reflect: !0,
    converter: {
      fromAttribute: (t) => t || "",
      toAttribute: (t) => t || null
      // Don't reflect empty string
    }
  })
], g.prototype, "docked", 2);
g = y([
  b("tui-panel")
], g);
const St = {
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
}, kt = {
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
}, Ot = {
  1: "bold",
  2: "dim",
  3: "italic",
  4: "underline",
  7: "reverse",
  9: "strikethrough"
};
function Pt(t) {
  const e = ["#000000", "#aa0000", "#00aa00", "#aa5500", "#0000aa", "#aa00aa", "#00aaaa", "#aaaaaa"], r = ["#555555", "#ff5555", "#55ff55", "#ffff55", "#5555ff", "#ff55ff", "#55ffff", "#ffffff"];
  if (t < 8) return e[t];
  if (t < 16) return r[t - 8];
  if (t < 232) {
    const i = t - 16, a = Math.floor(i / 36), d = Math.floor(i % 36 / 6), l = i % 6, h = (u) => (u === 0 ? 0 : 55 + u * 40).toString(16).padStart(2, "0");
    return `#${h(a)}${h(d)}${h(l)}`;
  }
  const o = (8 + (t - 232) * 10).toString(16).padStart(2, "0");
  return `#${o}${o}${o}`;
}
function ht(t) {
  if (!t) return "";
  let e = t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const r = /\x1b\[([0-9;]+)m/g;
  let s = "", o = 0, i = [], a;
  for (; (a = r.exec(e)) !== null; ) {
    s += e.slice(o, a.index), o = a.index + a[0].length;
    const d = a[1].split(";").map(Number);
    for (let l = 0; l < d.length; l++) {
      const h = d[l];
      if (h === 0)
        s += i.map(() => "</span>").join(""), i = [];
      else if (h === 38 && d[l + 1] === 5 && d[l + 2] !== void 0) {
        const u = Pt(d[l + 2]);
        s += `<span style="color: ${u}">`, i.push("256fg"), l += 2;
      } else if (h === 48 && d[l + 1] === 5 && d[l + 2] !== void 0) {
        const u = Pt(d[l + 2]);
        s += `<span style="background-color: ${u}">`, i.push("256bg"), l += 2;
      } else if (h === 38 && d[l + 1] === 2 && d.length > l + 4) {
        const u = d[l + 2], p = d[l + 3], x = d[l + 4];
        s += `<span style="color: rgb(${u},${p},${x})">`, i.push("tcfg"), l += 4;
      } else if (h === 48 && d[l + 1] === 2 && d.length > l + 4) {
        const u = d[l + 2], p = d[l + 3], x = d[l + 4];
        s += `<span style="background-color: rgb(${u},${p},${x})">`, i.push("tcbg"), l += 4;
      } else if (St[h]) {
        const u = `ansi-${St[h]}`;
        s += `<span class="${u}">`, i.push(u);
      } else if (kt[h]) {
        const u = `ansi-bg-${kt[h]}`;
        s += `<span class="${u}">`, i.push(u);
      } else if (Ot[h]) {
        const u = `ansi-${Ot[h]}`;
        s += `<span class="${u}">`, i.push(u);
      }
    }
  }
  return s += e.slice(o), s += i.map(() => "</span>").join(""), s;
}
var mr = Object.defineProperty, br = Object.getOwnPropertyDescriptor, me = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? br(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && mr(e, r, o), o;
};
let j = class extends f {
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
      html: ht(s),
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
    return c`
      <div class="output ${this._attrClasses}">
        ${this._lines.length === 0 ? c`<div class="empty">Waiting for output...</div>` : this._lines.map((t) => c`
              <div class="line">
                ${t.timestamp ? c`<span class="timestamp">[${t.timestamp}]</span>` : ""}
                <span .innerHTML=${t.html}></span>
              </div>
            `)}
      </div>
    `;
  }
};
j.styles = [
  v,
  m`
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
me([
  n({ type: Number, attribute: "max-lines" })
], j.prototype, "maxLines", 2);
me([
  n({ type: Boolean })
], j.prototype, "autoscroll", 2);
me([
  n({ type: Boolean })
], j.prototype, "timestamps", 2);
me([
  n({ type: String })
], j.prototype, "attr", 2);
me([
  $()
], j.prototype, "_lines", 2);
j = me([
  b("tui-output")
], j);
var vr = Object.defineProperty, gr = Object.getOwnPropertyDescriptor, Ge = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? gr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && vr(e, r, o), o;
};
let le = class extends f {
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
    return this._columns.length === 0 ? c`<div class="empty">No data</div>` : c`
      <div class="table">
        <div class="row header">
          ${this._columns.map((t) => c`<div class="cell">${t}</div>`)}
        </div>
        ${this._rows.map((t) => c`
          <div class="row">
            ${this._columns.map((e) => c`
              <div class="cell ${this.getCellClass(t[e])}">${t[e] ?? ""}</div>
            `)}
          </div>
        `)}
      </div>
    `;
  }
};
le.styles = [
  v,
  m`
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
Ge([
  n({ type: String })
], le.prototype, "border", 2);
Ge([
  $()
], le.prototype, "_columns", 2);
Ge([
  $()
], le.prototype, "_rows", 2);
le = Ge([
  b("tui-table")
], le);
var yr = Object.defineProperty, _r = Object.getOwnPropertyDescriptor, re = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? _r(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && yr(e, r, o), o;
};
let P = class extends f {
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
      html: ht(r),
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
    }], this._history = [...this._history.slice(-this.historySize + 1), t], this._historyIndex = -1, this._inputValue = "", this.dispatchEvent(new CustomEvent("tui-console-command", {
      detail: { command: t },
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
    return c`
      <div class="console" @click=${this.focusInput}>
        <div class="output">
          ${this._lines.map((t) => c`
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
P.styles = [
  v,
  m`
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
re([
  n({ type: String })
], P.prototype, "prompt", 2);
re([
  n({ type: String, attribute: "prompt-attr" })
], P.prototype, "promptAttr", 2);
re([
  n({ type: Number, attribute: "history-size" })
], P.prototype, "historySize", 2);
re([
  $()
], P.prototype, "_lines", 2);
re([
  $()
], P.prototype, "_inputValue", 2);
re([
  $()
], P.prototype, "_historyIndex", 2);
P = re([
  b("tui-console")
], P);
var xr = Object.defineProperty, wr = Object.getOwnPropertyDescriptor, Ze = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? wr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && xr(e, r, o), o;
};
let ce = class extends f {
  constructor() {
    super(...arguments), this.content = "", this.attr = "", this.variant = "";
  }
  render() {
    const t = this.attr.split(/\s+/).filter(Boolean).map((r) => `tui-${r}`).join(" "), e = ht(this.content || this.textContent || "");
    return c`<pre class="${t}" .innerHTML=${e}></pre>`;
  }
};
ce.styles = [
  v,
  m`
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
Ze([
  n({ type: String })
], ce.prototype, "content", 2);
Ze([
  n({ type: String })
], ce.prototype, "attr", 2);
Ze([
  n({ type: String, reflect: !0 })
], ce.prototype, "variant", 2);
ce = Ze([
  b("tui-text")
], ce);
var $r = Object.defineProperty, Er = Object.getOwnPropertyDescriptor, T = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Er(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && $r(e, r, o), o;
};
let E = class extends f {
  constructor() {
    super(...arguments), this.variant = "default", this.color = "", this.size = "md", this.selected = !1, this.disabled = !1, this.block = !1;
  }
  render() {
    return c`
      <button ?disabled=${this.disabled} part="button">
        <slot></slot>
      </button>
    `;
  }
};
E.shadowRootOptions = {
  ...f.shadowRootOptions,
  delegatesFocus: !0
};
E.styles = [
  v,
  m`
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

        /* The accent the filled and outline treatments paint with. The color
           attribute overrides it; unset, both treatments read as primary. */
        --_btn-accent: var(--color-primary);

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
         SEMANTIC COLOUR — sets the accent the filled/outline treatments use
         ═══════════════════════════════════════════════════════════════════ */

      :host([color="primary"])   { --_btn-accent: var(--color-primary); }
      :host([color="secondary"]) { --_btn-accent: var(--color-secondary); }
      :host([color="success"])   { --_btn-accent: var(--color-success); }
      :host([color="warning"])   { --_btn-accent: var(--color-warning); }
      :host([color="error"])     { --_btn-accent: var(--color-error); }
      :host([color="info"])      { --_btn-accent: var(--color-info); }

      /* muted is a de-emphasis accent, meant for the outline treatment. Under
         filled it becomes the background behind --surface-base text, which does
         not clear AA contrast in the dark themes — reach for ghost instead. */
      :host([color="muted"])     { --_btn-accent: var(--text-muted); }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: FILLED — solid accent, brightens on hover
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="filled"]) {
        --_btn-bg: var(--_btn-accent);
        --_btn-color: var(--surface-base);
        --_btn-border-color: var(--_btn-accent);

        & button:hover:not(:disabled) {
          filter: brightness(1.15);
          background: var(--_btn-accent);
          border-color: var(--_btn-accent);
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
         VARIANT: OUTLINE — accent border and text, fills on hover
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="outline"]) {
        --_btn-bg: transparent;
        --_btn-color: var(--_btn-accent);
        --_btn-border-color: var(--_btn-accent);

        & button:hover:not(:disabled) {
          background: var(--_btn-accent);
          color: var(--surface-base);
          border-color: var(--_btn-accent);
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
T([
  n({ reflect: !0 })
], E.prototype, "variant", 2);
T([
  n({ reflect: !0 })
], E.prototype, "color", 2);
T([
  n({ reflect: !0 })
], E.prototype, "size", 2);
T([
  n({ attribute: "selection-style" })
], E.prototype, "selectionStyle", 2);
T([
  n({ attribute: "tool-id" })
], E.prototype, "toolId", 2);
T([
  n({ type: Boolean, reflect: !0 })
], E.prototype, "selected", 2);
T([
  n({ type: Boolean, reflect: !0 })
], E.prototype, "disabled", 2);
T([
  n({ type: Boolean, reflect: !0 })
], E.prototype, "block", 2);
E = T([
  b("tui-button")
], E);
var zr = Object.defineProperty, Cr = Object.getOwnPropertyDescriptor, S = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Cr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && zr(e, r, o), o;
};
let Ye = class extends f {
  constructor() {
    super(...arguments), this._openMenu = null;
  }
  render() {
    return c`<slot></slot>`;
  }
};
Ye.styles = [
  v,
  m`
      :host {
        display: flex;
        gap: var(--spacing-xs);
      }
    `
];
S([
  $()
], Ye.prototype, "_openMenu", 2);
Ye = S([
  b("tui-menu")
], Ye);
let de = class extends f {
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
      t = c`${r}<span class="hotkey">${s}</span>${o}`;
    }
    return c`
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
de.styles = [
  v,
  m`
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
S([
  n({ type: String })
], de.prototype, "label", 2);
S([
  n({ type: String })
], de.prototype, "hotkey", 2);
S([
  $()
], de.prototype, "_open", 2);
de = S([
  b("tui-menu-item")
], de);
let he = class extends f {
  constructor() {
    super(...arguments), this.label = "", this.shortcut = "", this.danger = !1;
  }
  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("tui-menu-action-select", {
        detail: { label: this.label },
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
he.styles = [
  v,
  m`
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
S([
  n({ type: String })
], he.prototype, "label", 2);
S([
  n({ type: String })
], he.prototype, "shortcut", 2);
S([
  n({ type: Boolean, reflect: !0 })
], he.prototype, "danger", 2);
he = S([
  b("tui-menu-action")
], he);
let it = class extends f {
  render() {
    return c``;
  }
};
it.styles = m`
    :host {
      display: block;
      height: 1px;
      background: var(--border-default);
      margin: var(--spacing-xs) 0;
    }
  `;
it = S([
  b("tui-menu-divider")
], it);
var Sr = Object.defineProperty, kr = Object.getOwnPropertyDescriptor, be = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? kr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Sr(e, r, o), o;
};
let Xe = class extends f {
  constructor() {
    super(...arguments), this.color = "primary";
  }
  render() {
    return c`<slot></slot>`;
  }
};
Xe.styles = [
  v,
  m`
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

      /* Semantic colours — see docs/api/semantic-colors.md */
      :host([color="primary"])   { --bar-color: var(--color-primary);   border-color: var(--color-primary); }
      :host([color="secondary"]) { --bar-color: var(--color-secondary); border-color: var(--color-secondary); }
      :host([color="success"])   { --bar-color: var(--color-success);   border-color: var(--color-success); }
      :host([color="warning"])   { --bar-color: var(--color-warning);   border-color: var(--color-warning); }
      :host([color="error"])     { --bar-color: var(--color-error);     border-color: var(--color-error); }
      :host([color="info"])      { --bar-color: var(--color-info);      border-color: var(--color-info); }
      :host([color="muted"])     { --bar-color: var(--text-muted);      border-color: var(--border-default); }

      /* Style slotted status-items with dividers */
      ::slotted(tui-status-item) {
        border-right: 1px solid var(--bar-color);
      }

      ::slotted(tui-status-item:last-child) {
        border-right: none;
      }
    `
];
be([
  n({ type: String, reflect: !0 })
], Xe.prototype, "color", 2);
Xe = be([
  b("tui-statusbar")
], Xe);
let pe = class extends f {
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
pe.styles = [
  v,
  m`
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
        color: var(--color-warning);
      }
    `
];
be([
  n({ type: String })
], pe.prototype, "label", 2);
be([
  n({ type: String })
], pe.prototype, "value", 2);
be([
  n({ type: Boolean, reflect: !0 })
], pe.prototype, "highlight", 2);
pe = be([
  b("tui-status-item")
], pe);
var Or = Object.defineProperty, Pr = Object.getOwnPropertyDescriptor, Pe = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Pr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Or(e, r, o), o;
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
    this.open = !0, this.dispatchEvent(new CustomEvent("tui-modal-open", { bubbles: !0, composed: !0 }));
  }
  /**
   * Close the modal
   */
  close() {
    this.open = !1, this.dispatchEvent(new CustomEvent("tui-modal-close", { bubbles: !0, composed: !0 }));
  }
  render() {
    return c`
      <div class="overlay" @click=${this._handleOverlayClick}>
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="header">
            <span class="title" id="modal-title"><span class="title-decor">${Ue(this.border).before}</span>${this.title}<span class="title-decor">${Ue(this.border).after}</span></span>
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
  m`
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
Pe([
  n({ type: String, reflect: !0 })
], q.prototype, "title", 2);
Pe([
  n({ type: String, reflect: !0 })
], q.prototype, "border", 2);
Pe([
  n({ type: Boolean, reflect: !0 })
], q.prototype, "open", 2);
Pe([
  n({ type: Boolean })
], q.prototype, "closable", 2);
q = Pe([
  b("tui-modal")
], q);
var Ar = Object.defineProperty, Dr = Object.getOwnPropertyDescriptor, z = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Dr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Ar(e, r, o), o;
};
let A = class extends f {
  constructor() {
    super(...arguments), this.orientation = "vertical", this.selected = "", this.size = "md", this.selectionStyle = "", this.tools = [], this.showHotkeys = !0;
  }
  updated(t) {
    t.has("selectionStyle") && this.selectionStyle && this.style.setProperty("--toolbar-selection-style", this.selectionStyle);
  }
  _handleClick(t) {
    this.selected = t, this.dispatchEvent(
      new CustomEvent("tui-tool-select", {
        bubbles: !0,
        composed: !0,
        detail: { tool: t }
      })
    );
  }
  render() {
    return this.tools && this.tools.length > 0 ? c`
        <div class="toolbar">
          ${this.tools.map((t) => t.divider ? c`<div class="divider"></div>` : c`
              <div class="tool-item">
                ${this.showHotkeys && t.key ? c`<span class="hotkey">${t.key}</span>` : ""}
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
      ` : c`
      <div class="toolbar">
        <slot></slot>
      </div>
    `;
  }
};
A.styles = [
  v,
  m`
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
z([
  n({ reflect: !0 })
], A.prototype, "orientation", 2);
z([
  n()
], A.prototype, "selected", 2);
z([
  n({ reflect: !0 })
], A.prototype, "size", 2);
z([
  n({ attribute: "selection-style" })
], A.prototype, "selectionStyle", 2);
z([
  n({ type: Array })
], A.prototype, "tools", 2);
z([
  n({ type: Boolean, attribute: "show-hotkeys" })
], A.prototype, "showHotkeys", 2);
A = z([
  b("tui-toolbar")
], A);
let F = class extends f {
  constructor() {
    super(...arguments), this.toolId = "", this.icon = "", this.active = !1, this.size = "md";
  }
  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("tui-tool-select", {
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
F.styles = m`
    :host {
      display: contents;
    }
  `;
z([
  n({ attribute: "tool-id" })
], F.prototype, "toolId", 2);
z([
  n()
], F.prototype, "icon", 2);
z([
  n({ type: Boolean, reflect: !0 })
], F.prototype, "active", 2);
z([
  n()
], F.prototype, "size", 2);
F = z([
  b("tui-tool")
], F);
var Tr = Object.defineProperty, Hr = Object.getOwnPropertyDescriptor, Ae = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Hr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Tr(e, r, o), o;
};
let K = class extends f {
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
      return c``;
    const { message: t, type: e, title: r, simple: s } = this._current, o = [
      "toast",
      this._visible ? "visible" : "",
      e ? `type-${e}` : "",
      s ? "simple" : ""
    ].filter(Boolean).join(" ");
    return c`
      <div class="${o}">
        <div class="toast-header">${r}</div>
        <div class="toast-body">${t}</div>
      </div>
    `;
  }
};
K.styles = [
  v,
  m`
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
Ae([
  n({ type: String, reflect: !0 })
], K.prototype, "position", 2);
Ae([
  $()
], K.prototype, "_queue", 2);
Ae([
  $()
], K.prototype, "_current", 2);
Ae([
  $()
], K.prototype, "_visible", 2);
K = Ae([
  b("tui-toast")
], K);
let je = null;
function _o(t, e) {
  je || (je = document.createElement("tui-toast"), document.body.appendChild(je)), je.show(t, e);
}
var Ir = Object.defineProperty, Mr = Object.getOwnPropertyDescriptor, oe = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Mr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Ir(e, r, o), o;
};
const H = Ke.single, I = Ke.heavy, M = Ke.double;
let D = class extends f {
  constructor() {
    super(...arguments), this.rank = "", this.suit = "", this.faceDown = !1, this.selected = !1, this.disabled = !1, this.size = "md";
  }
  get isRed() {
    return this.suit === "♥" || this.suit === "♦";
  }
  _handleClick() {
    this.disabled || this.dispatchEvent(new CustomEvent("tui-card-click", {
      bubbles: !0,
      composed: !0,
      detail: { rank: this.rank, suit: this.suit }
    }));
  }
  render() {
    const t = this.isRed ? "suit red" : "suit", e = `size-${this.size}`;
    return c`
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
D.styles = [
  v,
  m`
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
         NEUTRAL STATE - Single line border ${_(H.tl)}${_(H.h)}${_(H.h)}${_(H.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      .card {
        border: var(--border-width) solid var(--border-default);
      }

      .card::before {
        content: '${_(H.tl)}';
        position: absolute;
        top: -1px;
        left: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card::after {
        content: '${_(H.tr)}';
        position: absolute;
        top: -1px;
        right: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card-bottom::before {
        content: '${_(H.bl)}';
        position: absolute;
        bottom: -1px;
        left: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card-bottom::after {
        content: '${_(H.br)}';
        position: absolute;
        bottom: -1px;
        right: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      /* ═══════════════════════════════════════════════════════════════════
         HOVER STATE - Heavy line border ${_(I.tl)}${_(I.h)}${_(I.h)}${_(I.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      .card:hover:not(.disabled) {
        border-color: var(--text-primary);
        box-shadow: 2px 2px 0 rgba(255,255,255,0.08);
        transform: translateY(-2px);
      }

      .card:hover:not(.disabled)::before { content: '${_(I.tl)}'; color: var(--text-primary); }
      .card:hover:not(.disabled)::after { content: '${_(I.tr)}'; color: var(--text-primary); }
      .card:hover:not(.disabled) .card-bottom::before { content: '${_(I.bl)}'; color: var(--text-primary); }
      .card:hover:not(.disabled) .card-bottom::after { content: '${_(I.br)}'; color: var(--text-primary); }

      /* ═══════════════════════════════════════════════════════════════════
         SELECTED STATE - Double line border ${_(M.tl)}${_(M.h)}${_(M.h)}${_(M.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      :host([selected]) .card {
        border-color: var(--color-primary);
        box-shadow: 3px 3px 0 rgba(88, 166, 255, 0.2);
      }

      :host([selected]) .card::before { content: '${_(M.tl)}'; color: var(--color-primary); }
      :host([selected]) .card::after { content: '${_(M.tr)}'; color: var(--color-primary); }
      :host([selected]) .card-bottom::before { content: '${_(M.bl)}'; color: var(--color-primary); }
      :host([selected]) .card-bottom::after { content: '${_(M.br)}'; color: var(--color-primary); }

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
oe([
  n({ type: String })
], D.prototype, "rank", 2);
oe([
  n({ type: String })
], D.prototype, "suit", 2);
oe([
  n({ type: Boolean, attribute: "face-down", reflect: !0 })
], D.prototype, "faceDown", 2);
oe([
  n({ type: Boolean, reflect: !0 })
], D.prototype, "selected", 2);
oe([
  n({ type: Boolean, reflect: !0 })
], D.prototype, "disabled", 2);
oe([
  n({ type: String, reflect: !0 })
], D.prototype, "size", 2);
D = oe([
  b("tui-card")
], D);
var Rr = Object.defineProperty, Nr = Object.getOwnPropertyDescriptor, De = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Nr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Rr(e, r, o), o;
};
let G = class extends f {
  constructor() {
    super(...arguments), this.palettes = {}, this.currentPalette = "", this.selectedChar = "", this.columns = 8;
  }
  get _chars() {
    return this.palettes[this.currentPalette] || [];
  }
  _selectPalette(t) {
    var r;
    const e = ((r = this.palettes[t]) == null ? void 0 : r[0]) || "";
    this.dispatchEvent(new CustomEvent("tui-palette-change", {
      bubbles: !0,
      composed: !0,
      detail: { palette: t, firstChar: e }
    }));
  }
  _selectChar(t) {
    this.dispatchEvent(new CustomEvent("tui-palette-char-select", {
      bubbles: !0,
      composed: !0,
      detail: { char: t }
    }));
  }
  render() {
    const t = Object.keys(this.palettes);
    return c`
      <div class="tabs">
        ${t.map((e) => c`
          <button
            class="tab ${e === this.currentPalette ? "active" : ""}"
            @click=${() => this._selectPalette(e)}
          >${e}</button>
        `)}
      </div>
      <div class="grid" style="grid-template-columns: repeat(${this.columns}, 28px)">
        ${this._chars.map((e) => c`
          <button
            class="char ${e === this.selectedChar ? "selected" : ""}"
            @click=${() => this._selectChar(e)}
          >${e}</button>
        `)}
      </div>
    `;
  }
};
G.styles = [
  v,
  m`
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
De([
  n({ type: Object })
], G.prototype, "palettes", 2);
De([
  n({ type: String, attribute: "current-palette" })
], G.prototype, "currentPalette", 2);
De([
  n({ type: String, attribute: "selected-char" })
], G.prototype, "selectedChar", 2);
De([
  n({ type: Number })
], G.prototype, "columns", 2);
G = De([
  b("tui-palette")
], G);
var jr = Object.defineProperty, Lr = Object.getOwnPropertyDescriptor, Je = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Lr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && jr(e, r, o), o;
};
let ue = class extends f {
  constructor() {
    super(...arguments), this.href = "", this.type = "external", this._copied = !1;
  }
  _handleClick() {
    this.type === "external" && this.href ? window.open(this.href, "_blank", "noopener") : this.type === "copy" && this.href && navigator.clipboard.writeText(this.href).then(() => {
      this._copied = !0, this.dispatchEvent(new CustomEvent("tui-link-copy", {
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
    return c`
      <button class="link" @click=${this._handleClick}>
        <slot></slot><span class="icon">${t}</span>
      </button>${this._copied ? c`<span class="copied">copied</span>` : ""}
    `;
  }
};
ue.styles = [
  v,
  m`
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
Je([
  n({ type: String })
], ue.prototype, "href", 2);
Je([
  n({ type: String, reflect: !0 })
], ue.prototype, "type", 2);
Je([
  $()
], ue.prototype, "_copied", 2);
ue = Je([
  b("tui-link")
], ue);
var Br = Object.defineProperty, Wr = Object.getOwnPropertyDescriptor, pt = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Wr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Br(e, r, o), o;
};
let ze = class extends f {
  constructor() {
    super(...arguments), this.items = [], this.selected = "";
  }
  _handleClick(t, e) {
    this.selected === t ? (this.selected = "", this.dispatchEvent(new CustomEvent("tui-list-item-deselect", {
      detail: { id: t, label: e },
      bubbles: !0,
      composed: !0
    }))) : (this.selected = t, this.dispatchEvent(new CustomEvent("tui-list-item-select", {
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
    return this.items.length === 0 ? c`<div class="empty">No items</div>` : c`${this.items.map((t) => {
      const e = this._colorVar(t.color), r = this.selected === t.id;
      return c`
        <div
          class="item ${r ? "active" : ""}"
          @click=${() => this._handleClick(t.id, t.label)}
        >
          <div style=${e && !r ? `color: ${e}` : ""}>${t.label}</div>
          ${t.sublabel ? c`<div class="sublabel">${t.sublabel}</div>` : ""}
        </div>
        ${r ? c`
          <div class="action-panel" style=${this._hasActions(t.id) ? "" : "display:none"}>
            <slot name="actions-${t.id}" @slotchange=${() => this.requestUpdate()}></slot>
          </div>
        ` : w}
      `;
    })}`;
  }
};
ze.styles = [
  v,
  m`
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
pt([
  n({ type: Array })
], ze.prototype, "items", 2);
pt([
  n({ type: String, reflect: !0 })
], ze.prototype, "selected", 2);
ze = pt([
  b("tui-action-list")
], ze);
var Ur = Object.defineProperty, Yr = Object.getOwnPropertyDescriptor, Qe = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Yr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Ur(e, r, o), o;
};
let fe = class extends f {
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
fe.styles = [
  v,
  m`
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

      :host([color="primary"])   .value { color: var(--color-primary); }
      :host([color="secondary"]) .value { color: var(--color-secondary); }
      :host([color="success"])   .value { color: var(--color-success); }
      :host([color="warning"])   .value { color: var(--color-warning); }
      :host([color="error"])     .value { color: var(--color-error); }
      :host([color="info"])      .value { color: var(--color-info); }
      :host([color="muted"])     .value { color: var(--text-muted); }
    `
];
Qe([
  n({ type: String })
], fe.prototype, "label", 2);
Qe([
  n({ type: String })
], fe.prototype, "value", 2);
Qe([
  n({ type: String, reflect: !0 })
], fe.prototype, "color", 2);
fe = Qe([
  b("tui-stat")
], fe);
var Xr = Object.defineProperty, Vr = Object.getOwnPropertyDescriptor, Te = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Vr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Xr(e, r, o), o;
};
let Ve = class extends f {
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
Ve.styles = [
  v,
  m`
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
Te([
  n({ type: String })
], Ve.prototype, "label", 2);
Ve = Te([
  b("tui-status-strip")
], Ve);
let Ce = class extends f {
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
Ce.styles = [
  v,
  m`
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

      :host([color="primary"])   { color: var(--color-primary); }
      :host([color="secondary"]) { color: var(--color-secondary); }
      :host([color="success"])   { color: var(--color-success); }
      :host([color="warning"])   { color: var(--color-warning); }
      :host([color="error"])     { color: var(--color-error); }
      :host([color="info"])      { color: var(--color-info); }
      :host([color="muted"])     { color: var(--text-muted); }

      .separator {
        color: var(--border-default);
        margin: 0 var(--spacing-sm);
      }
    `
];
Te([
  n({ type: String, reflect: !0 })
], Ce.prototype, "color", 2);
Te([
  n({ type: String })
], Ce.prototype, "indicator", 2);
Ce = Te([
  b("tui-strip-item")
], Ce);
var qr = Object.defineProperty, Fr = Object.getOwnPropertyDescriptor, ut = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Fr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && qr(e, r, o), o;
};
let Se = class extends f {
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
Se.styles = [
  v,
  m`
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
ut([
  n({ type: String })
], Se.prototype, "app", 2);
ut([
  n({ type: String })
], Se.prototype, "section", 2);
Se = ut([
  b("tui-titlebar")
], Se);
var Kr = Object.defineProperty, Gr = Object.getOwnPropertyDescriptor, He = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? Gr(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && Kr(e, r, o), o;
};
const Zr = "120px", At = `var(--tui-tiled-footer-height, ${Zr})`, Jr = {
  monitor: "status status | main aside-1 | main aside-2",
  viewer: "primary secondary | detail detail",
  console: "main | footer",
  "console-split": "main aside | footer footer",
  triad: "left center right"
};
function Qr(t) {
  const r = t.split("|").map((p) => p.trim()).filter(Boolean).map((p) => p.split(/\s+/)), s = r.map((p) => `"${p.join(" ")}"`).join(" "), o = Math.max(...r.map((p) => p.length)), i = Array(o).fill("1fr").join(" "), a = /* @__PURE__ */ new Set(), d = [];
  for (const p of r)
    for (const x of p)
      a.has(x) || (a.add(x), d.push(x));
  const l = r.length - 1, h = r.map((p, x) => {
    const C = new Set(p).size === 1;
    return r.length > 1 && C && x === 0 ? "auto" : r.length > 1 && C && x === l ? At : "1fr";
  });
  if (!h.includes("1fr")) {
    const p = h.findIndex((x) => x !== At);
    h[p === -1 ? 0 : p] = "1fr";
  }
  const u = h.join(" ");
  return { areas: s, rows: u, cols: i, slotNames: d };
}
let Z = class extends f {
  constructor() {
    super(...arguments), this.preset = "", this.areas = "", this.gap = "1px", this.labels = "";
  }
  _getGrid() {
    const t = this.preset ? Jr[this.preset] : this.areas;
    return t ? Qr(t) : null;
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
    if (!t) return w;
    const e = `
      grid-template-areas: ${t.areas};
      grid-template-rows: ${t.rows};
      grid-template-columns: ${t.cols};
      gap: ${this.gap};
    `, r = this._getDisplayLabels(t.slotNames);
    return c`
      <div class="grid" style=${e}>
        ${t.slotNames.map((s) => {
      const o = r[s] ?? s;
      return c`
            <div class="zone ${this.labels === "titlebar" ? "has-titlebar" : ""}" style="grid-area: ${s};">
              ${this.labels === "titlebar" ? c`<div class="zone-titlebar">${o}</div>` : w}
              ${this.labels === "caption" ? c`<span class="zone-label">${o}</span>` : w}
              <slot name=${s}></slot>
            </div>
          `;
    })}
      </div>
    `;
  }
};
Z.styles = [
  v,
  m`
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
He([
  n({ type: String, reflect: !0 })
], Z.prototype, "preset", 2);
He([
  n({ type: String })
], Z.prototype, "areas", 2);
He([
  n({ type: String })
], Z.prototype, "gap", 2);
He([
  n({ type: String })
], Z.prototype, "labels", 2);
Z = He([
  b("tui-tiled")
], Z);
var eo = Object.defineProperty, to = Object.getOwnPropertyDescriptor, ve = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? to(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && eo(e, r, o), o;
};
let L = class extends f {
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
      detail: { value: this.value, name: this.name }
    }));
  }
  _onChange(t) {
    const e = t.target;
    this.value = e.value, this.dispatchEvent(new CustomEvent("tui-change", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value, name: this.name }
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
L.styles = [
  v,
  m`
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
ve([
  n({ reflect: !0 })
], L.prototype, "value", 2);
ve([
  n()
], L.prototype, "placeholder", 2);
ve([
  n({ type: Boolean, reflect: !0 })
], L.prototype, "disabled", 2);
ve([
  n()
], L.prototype, "name", 2);
ve([
  n()
], L.prototype, "label", 2);
L = ve([
  b("tui-input")
], L);
var ro = Object.defineProperty, oo = Object.getOwnPropertyDescriptor, ge = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? oo(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && ro(e, r, o), o;
};
let B = class extends f {
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
  m`
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
ge([
  n({ type: Boolean, reflect: !0 })
], B.prototype, "checked", 2);
ge([
  n({ type: Boolean, reflect: !0 })
], B.prototype, "disabled", 2);
ge([
  n()
], B.prototype, "name", 2);
ge([
  n()
], B.prototype, "value", 2);
ge([
  n()
], B.prototype, "label", 2);
B = ge([
  b("tui-checkbox")
], B);
var so = Object.defineProperty, io = Object.getOwnPropertyDescriptor, ye = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? io(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && so(e, r, o), o;
};
let W = class extends f {
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
  m`
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
ye([
  n({ type: Boolean, reflect: !0 })
], W.prototype, "checked", 2);
ye([
  n({ type: Boolean, reflect: !0 })
], W.prototype, "disabled", 2);
ye([
  n()
], W.prototype, "name", 2);
ye([
  n()
], W.prototype, "value", 2);
ye([
  n()
], W.prototype, "label", 2);
W = ye([
  b("tui-radio")
], W);
var ao = Object.defineProperty, no = Object.getOwnPropertyDescriptor, Ie = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? no(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && ao(e, r, o), o;
};
let J = class extends f {
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
    return c`
      ${this.label ? c`<div class="group-label">${this.label}</div>` : ""}
      <div class="group" @tui-change=${this._onChange}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
};
J.styles = [
  v,
  m`
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
Ie([
  n()
], J.prototype, "name", 2);
Ie([
  n()
], J.prototype, "label", 2);
Ie([
  n({ type: Boolean, reflect: !0 })
], J.prototype, "disabled", 2);
Ie([
  n({ type: Array })
], J.prototype, "value", 2);
J = Ie([
  b("tui-checkbox-group")
], J);
var lo = Object.defineProperty, co = Object.getOwnPropertyDescriptor, Me = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? co(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && lo(e, r, o), o;
};
let Q = class extends f {
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
    return c`
      ${this.label ? c`<div class="group-label">${this.label}</div>` : ""}
      <div class="group" role="radiogroup" @tui-change=${this._onChange} @keydown=${this._onKeydown}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
};
Q.styles = [
  v,
  m`
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
Me([
  n()
], Q.prototype, "name", 2);
Me([
  n()
], Q.prototype, "label", 2);
Me([
  n({ type: Boolean, reflect: !0 })
], Q.prototype, "disabled", 2);
Me([
  n()
], Q.prototype, "value", 2);
Q = Me([
  b("tui-radio-group")
], Q);
const xo = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "info",
  "muted"
], wo = {
  primary: "--color-primary",
  secondary: "--color-secondary",
  success: "--color-success",
  warning: "--color-warning",
  error: "--color-error",
  info: "--color-info",
  muted: "--text-muted"
};
var ho = Object.defineProperty, po = Object.getOwnPropertyDescriptor, Re = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? po(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && ho(e, r, o), o;
};
let ee = class extends f {
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
    return c`
      <div class="progress">
        <div class="header">
          ${this.label ? c`<span class="label">${this.label}</span>` : ""}
          <span class="stats">
            ${this.total > 0 ? c`<span class="count">${this.current}/${this.total}</span>` : ""}
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
ee.styles = [
  v,
  m`
      :host { display: block; }
      .progress { padding: var(--spacing-sm); font-size: 0.8rem; }
      .header { display: flex; justify-content: space-between; margin-bottom: var(--spacing-xs); color: var(--text-primary); }
      .label { color: var(--text-primary); }
      .stats { display: flex; gap: var(--spacing-sm); color: var(--text-muted); }
      .bar-track { height: 12px; background: var(--surface-base); border: var(--border-width) solid var(--border-default); overflow: hidden; }
      .bar-fill { height: 100%; background: var(--color-primary); transition: width 0.2s ease; }
    `
];
Re([
  n({ type: Number })
], ee.prototype, "value", 2);
Re([
  n({ type: String })
], ee.prototype, "label", 2);
Re([
  n({ type: Number })
], ee.prototype, "total", 2);
Re([
  n({ type: Number })
], ee.prototype, "current", 2);
ee = Re([
  b("tui-progress")
], ee);
var uo = Object.defineProperty, fo = Object.getOwnPropertyDescriptor, ft = (t, e, r, s) => {
  for (var o = s > 1 ? void 0 : s ? fo(e, r) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (o = (s ? a(e, r, o) : a(o)) || o);
  return s && o && uo(e, r, o), o;
};
const mo = {
  success: "✓",
  error: "✗",
  warning: "⚠",
  info: "ℹ",
  pending: "…"
};
let ke = class extends f {
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
    return this.state ? c`
      <div class="badge ${this.state}">
        <span class="indicator">${mo[this.state] ?? ""}</span>
        <span class="message">${this.message}</span>
      </div>
    ` : c`<div class="empty">No status</div>`;
  }
};
ke.styles = [
  v,
  m`
      :host { display: block; }
      .badge {
        display: flex; align-items: center; gap: var(--spacing-sm);
        padding: var(--spacing-sm); font-size: 0.8rem;
        border-left: 3px solid transparent;
      }
      /* Each state uses its own semantic token — see docs/api/semantic-colors.md.
         Before 4.0.0 the warn state pointed at --color-info and info pointed at
         --color-primary, so warnings rendered light blue and --color-warning
         went unused entirely. */
      .badge.success { border-left-color: var(--color-success); color: var(--color-success); }
      .badge.error   { border-left-color: var(--color-error);   color: var(--color-error); }
      .badge.warning { border-left-color: var(--color-warning); color: var(--color-warning); }
      .badge.info    { border-left-color: var(--color-info);    color: var(--color-info); }
      .badge.pending { border-left-color: var(--text-muted);    color: var(--text-muted); }
      .indicator { flex-shrink: 0; }
      .message { color: var(--text-primary); }
      .empty { color: var(--text-muted); font-style: italic; padding: var(--spacing-sm); }
    `
];
ft([
  n({ type: String })
], ke.prototype, "state", 2);
ft([
  n({ type: String })
], ke.prototype, "message", 2);
ke = ft([
  b("tui-status")
], ke);
export {
  ze as ActionList,
  O as App,
  Ke as BORDER_CHARS,
  E as Button,
  D as Card,
  B as Checkbox,
  J as CheckboxGroup,
  P as Console,
  L as Input,
  ue as Link,
  Ye as Menu,
  he as MenuAction,
  it as MenuDivider,
  de as MenuItem,
  q as Modal,
  j as Output,
  G as Palette,
  g as Panel,
  ee as Progress,
  W as Radio,
  Q as RadioGroup,
  xo as SEMANTIC_COLORS,
  wo as SEMANTIC_TOKENS,
  yo as STATE_BORDERS,
  ne as Sidebar,
  fe as Stat,
  ke as Status,
  pe as StatusItem,
  Ve as StatusStrip,
  Xe as Statusbar,
  Ce as StripItem,
  le as Table,
  ce as Text,
  Z as Tiled,
  Se as Titlebar,
  K as Toast,
  F as Tool,
  A as Toolbar,
  k as Workspace,
  ht as ansiToHtml,
  pr as getBorderChars,
  Qr as parseAreas,
  v as sharedStyles,
  Ue as titleDecoration,
  _o as tuiToast
};
