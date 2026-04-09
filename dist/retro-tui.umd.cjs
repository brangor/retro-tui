(function(r,l){typeof exports=="object"&&typeof module<"u"?l(exports,require("lit")):typeof define=="function"&&define.amd?define(["exports","lit"],l):(r=typeof globalThis<"u"?globalThis:r||self,l(r.RetroTUI={},r.lit))})(this,function(r,l){"use strict";const Dt='.theme-terminal-classic,:root{--color-primary: #00ffff;--color-primary-bg: #002b36;--color-primary-fg: #00ffff;--color-secondary: #00ff00;--color-secondary-bg: #003300;--color-secondary-fg: #00ff00;--color-error: #ff5555;--color-error-bg: #330000;--color-error-fg: #ff5555;--color-warning: #e8691e;--color-warning-bg: #331500;--color-warning-fg: #e8691e;--color-success: #50fa7b;--color-success-bg: #003300;--color-success-fg: #50fa7b;--color-info: #8be9fd;--color-info-bg: #002233;--color-info-fg: #8be9fd;--surface-base: #0a0a0a;--surface-elevated: #1a1a1a;--surface-overlay: #2a2a2a;--text-primary: #e0e0e0;--text-muted: #666666;--border-default: #333333;--border-width: 1px;--border-radius: 0px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}.theme-vibrant-scifi{--color-primary: #ff00ff;--color-primary-bg: #ff00ff;--color-primary-fg: #000000;--color-secondary: #00ffcc;--color-secondary-bg: #00ffcc;--color-secondary-fg: #000000;--color-error: #ff3366;--color-error-bg: #ff3366;--color-error-fg: #ffffff;--color-warning: #ff6622;--color-warning-bg: #ff6622;--color-warning-fg: #000000;--color-success: #00ff66;--color-success-bg: #00ff66;--color-success-fg: #000000;--color-info: #6666ff;--color-info-bg: #6666ff;--color-info-fg: #ffffff;--surface-base: #0d0d1a;--surface-elevated: #1a1a2e;--surface-overlay: #2a2a4a;--text-primary: #ffffff;--text-muted: #8888aa;--border-default: #4a4a6a;--border-width: 2px;--border-radius: 2px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}html,body{background:var(--surface-base);color:var(--text-primary);font-family:var(--font-mono);color-scheme:dark}.theme-home-security-interface{--color-primary: #3fb950;--color-primary-bg: #002b36;--color-primary-fg: #3fb950;--color-secondary: #00ff00;--color-secondary-bg: #003300;--color-secondary-fg: #00ff00;--color-error: #ff5555;--color-error-bg: #330000;--color-error-fg: #ff5555;--color-warning: #e8691e;--color-warning-bg: #331500;--color-warning-fg: #e8691e;--color-success: #3fb950;--color-success-bg: #003300;--color-success-fg: #3fb950;--color-info: #8be9fd;--color-info-bg: #002233;--color-info-fg: #8be9fd;--surface-base: #111;--surface-elevated: #1a1a1a;--surface-overlay: #2a2a2a;--text-primary: #e0e0e0;--text-muted: #666666;--border-default: #3fb950;--border-width: 3px;--border-radius: 0px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}',ft="__retro_tui_tokens__";if(typeof document<"u"&&!document[ft]){const n=document.createElement("style");n.textContent=Dt,(document.head||document.documentElement).appendChild(n);const t=document.documentElement;t.style.setProperty("color","var(--text-primary)"),t.style.setProperty("background","var(--surface-base)"),t.style.setProperty("font-family","var(--font-mono)"),t.style.setProperty("color-scheme","dark"),document[ft]=!0}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const f=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z=globalThis,at=Z.ShadowRoot&&(Z.ShadyCSS===void 0||Z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,mt=Symbol(),bt=new WeakMap;let Mt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==mt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(at&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=bt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&bt.set(e,t))}return t}toString(){return this.cssText}};const It=n=>new Mt(typeof n=="string"?n:n+"",void 0,mt),Lt=(n,t)=>{if(at)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),o=Z.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=e.cssText,n.appendChild(s)}},gt=at?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return It(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Rt,defineProperty:At,getOwnPropertyDescriptor:Ht,getOwnPropertyNames:jt,getOwnPropertySymbols:Bt,getPrototypeOf:Xt}=Object,x=globalThis,vt=x.trustedTypes,Yt=vt?vt.emptyScript:"",nt=x.reactiveElementPolyfillSupport,j=(n,t)=>n,J={toAttribute(n,t){switch(t){case Boolean:n=n?Yt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},lt=(n,t)=>!Rt(n,t),yt={attribute:!0,type:String,converter:J,reflect:!1,useDefault:!1,hasChanged:lt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),x.litPropertyMetadata??(x.litPropertyMetadata=new WeakMap);class B extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=yt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(t,s,e);o!==void 0&&At(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){const{get:o,set:i}=Ht(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:o,set(a){const h=o==null?void 0:o.call(this);i==null||i.call(this,a),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??yt}static _$Ei(){if(this.hasOwnProperty(j("elementProperties")))return;const t=Xt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(j("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(j("properties"))){const e=this.properties,s=[...jt(e),...Bt(e)];for(const o of s)this.createProperty(o,e[o])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,o]of e)this.elementProperties.set(s,o)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const o=this._$Eu(e,s);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const o of s)e.unshift(gt(o))}else t!==void 0&&e.push(gt(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Lt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var i;const s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){const a=(((i=s.converter)==null?void 0:i.toAttribute)!==void 0?s.converter:J).toAttribute(e,s.type);this._$Em=t,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(t,e){var i,a;const s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const h=s.getPropertyOptions(o),d=typeof h.converter=="function"?{fromAttribute:h.converter}:((i=h.converter)==null?void 0:i.fromAttribute)!==void 0?h.converter:J;this._$Em=o;const p=d.fromAttribute(e,h.type);this[o]=p??((a=this._$Ej)==null?void 0:a.get(o))??p,this._$Em=null}}requestUpdate(t,e,s,o=!1,i){var a;if(t!==void 0){const h=this.constructor;if(o===!1&&(i=this[t]),s??(s=h.getPropertyOptions(t)),!((s.hasChanged??lt)(i,e)||s.useDefault&&s.reflect&&i===((a=this._$Ej)==null?void 0:a.get(t))&&!this.hasAttribute(h._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:i},a){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??e??this[t]),i!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[i,a]of o){const{wrapped:h}=a,d=this[i];h!==!0||this._$AL.has(i)||d===void 0||this.C(i,void 0,a,d)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(o=>{var i;return(i=o.hostUpdate)==null?void 0:i.call(o)}),this.update(e)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var o;return(o=s.hostUpdated)==null?void 0:o.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}}B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[j("elementProperties")]=new Map,B[j("finalized")]=new Map,nt==null||nt({ReactiveElement:B}),(x.reactiveElementVersions??(x.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:lt},Nt=(n=Wt,t,e)=>{const{kind:s,metadata:o}=e;let i=globalThis.litPropertyMetadata.get(o);if(i===void 0&&globalThis.litPropertyMetadata.set(o,i=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),i.set(e.name,n),s==="accessor"){const{name:a}=e;return{set(h){const d=t.get.call(this);t.set.call(this,h),this.requestUpdate(a,d,n,!0,h)},init(h){return h!==void 0&&this.C(a,void 0,n,h),h}}}if(s==="setter"){const{name:a}=e;return function(h){const d=this[a];t.call(this,h),this.requestUpdate(a,d,n,!0,h)}}throw Error("Unsupported decorator location: "+s)};function c(n){return(t,e)=>typeof e=="object"?Nt(n,t,e):((s,o,i)=>{const a=o.hasOwnProperty(i);return o.constructor.createProperty(i,s),a?Object.getOwnPropertyDescriptor(o,i):void 0})(n,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(n){return c({...n,state:!0,attribute:!1})}const m=l.css`
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
`;var Ut=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,D=(n,t,e,s)=>{for(var o=s>1?void 0:s?Gt(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&Ut(t,e,o),o};r.App=class extends l.LitElement{constructor(){super(...arguments),this.title="TUI",this.subtitle="",this.compact=!1,this._focusContext="workspace",this._menuOpen=!1}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",()=>this.classList.add("using-mouse")),this.addEventListener("keydown",t=>{t.key==="Tab"&&this.classList.remove("using-mouse"),this._handleGlobalKeydown(t)})}_handleGlobalKeydown(t){if(t.key==="Escape"){this._menuOpen&&(this._menuOpen=!1,t.preventDefault());return}t.key==="Tab"&&!t.ctrlKey&&t.altKey}render(){const t=this.subtitle?l.html`░░ ${this.title} <span>[ ${this.subtitle} ]</span> ░░`:l.html`░░ ${this.title} ░░`;return l.html`
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
    `}},r.App.styles=[m,l.css`
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
    `],D([c({type:String,reflect:!0})],r.App.prototype,"title",2),D([c({type:String,reflect:!0})],r.App.prototype,"subtitle",2),D([c({type:Boolean,reflect:!0})],r.App.prototype,"compact",2),D([g()],r.App.prototype,"_focusContext",2),D([g()],r.App.prototype,"_menuOpen",2),r.App=D([f("tui-app")],r.App);var qt=Object.defineProperty,Vt=Object.getOwnPropertyDescriptor,ct=(n,t,e,s)=>{for(var o=s>1?void 0:s?Vt(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&qt(t,e,o),o};r.Workspace=class extends l.LitElement{constructor(){super(...arguments),this._bounds=new DOMRect,this._snapPreview=null,this._resizeObserver=null,this._handlePanelMove=t=>{const e=t.target;if(!e.hasAttribute("floating"))return;const{x:s,y:o}=t.detail,i=e.panelWidth??e.offsetWidth??100,a=e.panelHeight??e.offsetHeight??100,h=this._detectSnapEdge(s,o,i,a);if(this._snapPreview=h,this._bounds.width>0&&this._bounds.height>0){const d=this._bounds.width-i,p=this._bounds.height-a;if(d>0&&p>0){const u=Math.max(0,Math.min(s,d)),v=Math.max(0,Math.min(o,p));(u!==s||v!==o)&&(e.positionX=u,e.positionY=v)}}},this._handlePanelDragEnd=t=>{const e=t.target;if(e){if(this._snapPreview){const s=this._snapPreview,o=e.panelWidth??e.offsetWidth??100;switch(e.panelHeight??e.offsetHeight,s){case"left":e.positionX=0;break;case"right":e.positionX=this._bounds.width-o;break;case"top":e.positionY=0;break}e.snapEdge=s}else e.snapEdge="";this._snapPreview=null,this._emitLayoutChange()}},this._handlePanelResize=t=>{const e=t.target;if(!e.hasAttribute("resizable"))return;const{width:s,height:o}=t.detail,i=e.positionX??0,a=e.positionY??0,h=this._bounds.width-i,d=this._bounds.height-a,p=Math.min(s,h),u=Math.min(o,d);p!==s&&(e.panelWidth=p),u!==o&&(e.panelHeight=u),this._emitLayoutChange()},this._handlePanelDismiss=t=>{this._emitLayoutChange()},this._handlePanelMinimize=t=>{requestAnimationFrame(()=>{this._reflowMinimizedTabs()})},this._handlePanelRestore=t=>{requestAnimationFrame(()=>{this._reflowMinimizedTabs()})}}get bounds(){return this._bounds}getPanelStates(){const t=[],e=this._getFloatingPanels();for(const s of e)t.push({id:s.id||s.title,title:s.title||s.id,snapEdge:s.snapEdge||void 0,x:s.positionX??0,y:s.positionY??0,width:s.panelWidth??s.offsetWidth,height:s.panelHeight??s.offsetHeight,collapsed:s.collapsed??!1,visible:!s.hidden});return t}connectedCallback(){super.connectedCallback(),typeof ResizeObserver<"u"?(this._resizeObserver=new ResizeObserver(t=>{for(const e of t)this._bounds=e.contentRect,this.dispatchEvent(new CustomEvent("bounds-change",{detail:{bounds:this._bounds},bubbles:!0,composed:!0}))}),this._resizeObserver.observe(this)):this._bounds=new DOMRect(0,0,this.offsetWidth||800,this.offsetHeight||600),this.addEventListener("panel-move",this._handlePanelMove),this.addEventListener("panel-resize",this._handlePanelResize),this.addEventListener("panel-dismiss",this._handlePanelDismiss),this.addEventListener("panel-drag-end",this._handlePanelDragEnd),this.addEventListener("panel-minimize",this._handlePanelMinimize),this.addEventListener("panel-restore",this._handlePanelRestore)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._resizeObserver)==null||t.disconnect(),this.removeEventListener("panel-move",this._handlePanelMove),this.removeEventListener("panel-resize",this._handlePanelResize),this.removeEventListener("panel-dismiss",this._handlePanelDismiss),this.removeEventListener("panel-drag-end",this._handlePanelDragEnd),this.removeEventListener("panel-minimize",this._handlePanelMinimize),this.removeEventListener("panel-restore",this._handlePanelRestore)}_detectSnapEdge(t,e,s,o){const i=this._bounds;return t<=r.Workspace.SNAP_ZONE?"left":t+s>=i.width-r.Workspace.SNAP_ZONE?"right":e<=r.Workspace.SNAP_ZONE?"top":null}_reflowMinimizedTabs(){const t=this._getFloatingPanels(),e=4,s=[],o=[];for(const a of t){if(!a.minimized)continue;(a.snapEdge||"left")==="right"?o.push(a):s.push(a)}let i=e;for(const a of s){a.positionY=i;const h=a.offsetHeight||80;i+=h+e}i=e;for(const a of o){a.positionY=i;const h=a.offsetHeight||80;i+=h+e}}_emitLayoutChange(){const e=this._getFloatingPanels().map(s=>({id:s.id||s.title,x:s.positionX,y:s.positionY,width:s.panelWidth??s.offsetWidth,height:s.panelHeight??s.offsetHeight}));this.dispatchEvent(new CustomEvent("layout-change",{detail:{panels:e,bounds:this._bounds},bubbles:!0,composed:!0}))}_getFloatingPanels(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector('slot[name="floating"]');return t?t.assignedElements():[]}_constrainAllPanels(){if(this._bounds.width<=0||this._bounds.height<=0)return;const t=this._getFloatingPanels();for(const e of t){if(!e.hasAttribute("floating"))continue;const s=e.positionX??0,o=e.positionY??0,i=e.panelWidth??e.offsetWidth??100,a=e.panelHeight??e.offsetHeight??100,h=this._bounds.width-i,d=this._bounds.height-a;if(h<0||d<0)continue;const p=Math.max(0,Math.min(s,h)),u=Math.max(0,Math.min(o,d));p!==s&&(e.positionX=p),u!==o&&(e.positionY=u)}}_onFloatingSlotChange(){requestAnimationFrame(()=>{this._constrainAllPanels(),this._reflowMinimizedTabs()})}render(){return l.html`
      <div class="workspace">
        <div class="main-area">
          <slot name="main"></slot>
        </div>
        <div class="floating-layer">
          <slot name="floating" @slotchange=${this._onFloatingSlotChange}></slot>
        </div>
        ${this._snapPreview?l.html`
          <div class="snap-preview ${this._snapPreview}"></div>
        `:""}
      </div>
    `}},r.Workspace.SNAP_ZONE=20,r.Workspace.styles=[m,l.css`
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
    `],ct([g()],r.Workspace.prototype,"_bounds",2),ct([g()],r.Workspace.prototype,"_snapPreview",2),r.Workspace=ct([f("tui-workspace")],r.Workspace);var Ft=Object.defineProperty,Kt=Object.getOwnPropertyDescriptor,Q=(n,t,e,s)=>{for(var o=s>1?void 0:s?Kt(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&Ft(t,e,o),o};r.Sidebar=class extends l.LitElement{constructor(){super(...arguments),this.side="left",this.size=200,this._dropIndex=null}_getPanels(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector("slot");return t?t.assignedElements().filter(s=>s.tagName.toLowerCase()==="tui-panel"):[]}calculateDropIndex(t){const e=this._getPanels();for(let s=0;s<e.length;s++){const o=e[s].getBoundingClientRect(),i=o.top+o.height/2;if(t<i)return s}return e.length}showDropIndicator(t){this._dropIndex=t}hideDropIndicator(){this._dropIndex=null}insertPanelAt(t,e){const o=this._getPanels().indexOf(t);let i=e;o!==-1&&o<e&&(i=e-1),o!==-1&&t.remove();const a=this._getPanels();t.setAttribute("docked",this.side),i>=a.length?this.appendChild(t):this.insertBefore(t,a[i]),this.hideDropIndicator()}_getDropIndicatorTop(){var o,i,a,h;const t=this._getPanels();if(this._dropIndex===null||this._dropIndex===0)return 0;if(this._dropIndex>=t.length){const d=t[t.length-1];if(d){const p=(i=(o=this.shadowRoot)==null?void 0:o.querySelector(".content"))==null?void 0:i.getBoundingClientRect(),u=d.getBoundingClientRect();if(p)return u.bottom-p.top}return 0}const e=t[this._dropIndex],s=(h=(a=this.shadowRoot)==null?void 0:a.querySelector(".content"))==null?void 0:h.getBoundingClientRect();return e&&s?e.getBoundingClientRect().top-s.top-2:0}connectedCallback(){super.connectedCallback(),this.side==="left"||this.side==="right"?this.style.width=`${this.size}px`:this.style.height=`${this.size}px`}updated(t){t.has("size")&&(this.side==="left"||this.side==="right"?this.style.width=`${this.size}px`:this.style.height=`${this.size}px`)}render(){return l.html`
      <div class="content">
        <slot></slot>
        ${this._dropIndex!==null?l.html`
          <div class="drop-indicator" style="top: ${this._getDropIndicatorTop()}px"></div>
        `:""}
      </div>
    `}},r.Sidebar.styles=[m,l.css`
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
    `],Q([c({type:String,reflect:!0})],r.Sidebar.prototype,"side",2),Q([c({type:Number})],r.Sidebar.prototype,"size",2),Q([g()],r.Sidebar.prototype,"_dropIndex",2),r.Sidebar=Q([f("tui-sidebar")],r.Sidebar);const X={single:{tl:"┌",tr:"┐",bl:"└",br:"┘",h:"─",v:"│"},heavy:{tl:"┏",tr:"┓",bl:"┗",br:"┛",h:"━",v:"┃"},double:{tl:"╔",tr:"╗",bl:"╚",br:"╝",h:"═",v:"║"},rounded:{tl:"╭",tr:"╮",bl:"╰",br:"╯",h:"─",v:"│"}};function _t(n){return n==="none"?null:X[n]}function Y(n){const t=_t(n);return t?{before:`${t.tl}${t.h} `,after:` ${t.h}${t.tr}`}:{before:"",after:""}}const Zt={neutral:"single",hover:"heavy",selected:"double"};var Jt=Object.defineProperty,Qt=Object.getOwnPropertyDescriptor,b=(n,t,e,s)=>{for(var o=s>1?void 0:s?Qt(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&Jt(t,e,o),o};r.Panel=class extends l.LitElement{constructor(){super(...arguments),this.title="",this.color="",this.border="single",this.variant="bright",this.selectionStyle="",this.collapsible=!1,this.collapsed=!1,this.selected=!1,this.active=!1,this.persistId="",this.dismissable=!1,this.floating=!0,this.snapEdge="",this.positionX=0,this.positionY=0,this.resizable=!1,this.minimized=!1,this.panelWidth=null,this.panelHeight=null,this.maxWidth=null,this.maxHeight=null,this.minWidth=150,this.minHeight=100,this.docked="",this._isDragging=!1,this._dragStartX=0,this._dragStartY=0,this._dragOffsetX=0,this._dragOffsetY=0,this._isResizing=!1,this._resizeStartX=0,this._resizeStartY=0,this._resizeStartWidth=0,this._resizeStartHeight=0,this._preMinimizeX=0,this._preMinimizeY=0,this._preMinimizeWidth=null,this._preMinimizeHeight=null,this._handleClick=()=>{this.dispatchEvent(new CustomEvent("focus-request",{bubbles:!0,composed:!0,detail:{panel:this}}))},this._onEdgeTabClick=()=>{this.restore()},this._onDragStart=t=>{if(!this.floating)return;const e=t.target;e.closest(".collapse-btn")||e.closest(".dismiss-btn")||(t.preventDefault(),this._isDragging=!0,this._dragStartX=t.clientX,this._dragStartY=t.clientY,this._dragOffsetX=this.positionX,this._dragOffsetY=this.positionY,document.addEventListener("pointermove",this._onDragMove),document.addEventListener("pointerup",this._onDragEnd))},this._onDragMove=t=>{if(!this._isDragging)return;const e=t.clientX-this._dragStartX,s=t.clientY-this._dragStartY;this.positionX=this._dragOffsetX+e,this.positionY=this._dragOffsetY+s,this.dispatchEvent(new CustomEvent("panel-move",{detail:{panelId:this.id||this.title,x:this.positionX,y:this.positionY,cursorY:t.clientY},bubbles:!0,composed:!0}))},this._onDragEnd=()=>{this._isDragging=!1,document.removeEventListener("pointermove",this._onDragMove),document.removeEventListener("pointerup",this._onDragEnd),this.dispatchEvent(new CustomEvent("panel-drag-end",{detail:{panelId:this.id||this.title,x:this.positionX,y:this.positionY},bubbles:!0,composed:!0}))},this._onResizeStart=t=>{this.resizable&&(t.preventDefault(),t.stopPropagation(),this._isResizing=!0,this._resizeStartX=t.clientX,this._resizeStartY=t.clientY,this._resizeStartWidth=this.panelWidth??this.offsetWidth,this._resizeStartHeight=this.panelHeight??this.offsetHeight,document.addEventListener("pointermove",this._onResizeMove),document.addEventListener("pointerup",this._onResizeEnd))},this._onResizeMove=t=>{if(!this._isResizing)return;const e=t.clientX-this._resizeStartX,s=t.clientY-this._resizeStartY;let o=this._resizeStartWidth+e,i=this._resizeStartHeight+s;o=Math.max(this.minWidth,o),i=Math.max(this.minHeight,i),this.maxWidth!==null&&(o=Math.min(this.maxWidth,o)),this.maxHeight!==null&&(i=Math.min(this.maxHeight,i)),this.panelWidth=o,this.panelHeight=i,this.dispatchEvent(new CustomEvent("panel-resize",{detail:{panelId:this.id||this.title,width:this.panelWidth,height:this.panelHeight},bubbles:!0,composed:!0}))},this._onResizeEnd=()=>{this._isResizing=!1,document.removeEventListener("pointermove",this._onResizeMove),document.removeEventListener("pointerup",this._onResizeEnd)},this._onCollapseClick=t=>{t.stopPropagation(),this.toggle()},this._onDismissClick=t=>{t.stopPropagation(),this.dismiss()}}connectedCallback(){if(super.connectedCallback(),this.persistId){const t=localStorage.getItem(`tui-panel-${this.persistId}`);t!==null&&(this.collapsed=t==="true")}this.addEventListener("click",this._handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleClick),document.removeEventListener("pointermove",this._onDragMove),document.removeEventListener("pointerup",this._onDragEnd),document.removeEventListener("pointermove",this._onResizeMove),document.removeEventListener("pointerup",this._onResizeEnd)}toggle(){this.collapsible&&(this.collapsed=!this.collapsed,this.persistId&&localStorage.setItem(`tui-panel-${this.persistId}`,String(this.collapsed)),this.dispatchEvent(new CustomEvent("toggle",{detail:{collapsed:this.collapsed},bubbles:!0,composed:!0})))}dismiss(){if(this.floating&&this.dismissable){this.minimize();return}if(this.persistId){const s={x:this.positionX,y:this.positionY,width:this.panelWidth,height:this.panelHeight,collapsed:this.collapsed,snapEdge:this.snapEdge};localStorage.setItem(`tui-panel-memory-${this.persistId}`,JSON.stringify(s))}const t=new CustomEvent("panel-dismiss",{detail:{panelId:this.id||this.title},bubbles:!0,composed:!0,cancelable:!0});this.dispatchEvent(t)&&(this.hidden=!0)}minimize(){if(!this.minimized){if(this._preMinimizeX=this.positionX,this._preMinimizeY=this.positionY,this._preMinimizeWidth=this.panelWidth,this._preMinimizeHeight=this.panelHeight,this.snapEdge||(this.snapEdge="left"),this.minimized=!0,this.persistId){const t={minimized:!0,preMinimize:{x:this._preMinimizeX,y:this._preMinimizeY,width:this._preMinimizeWidth,height:this._preMinimizeHeight},snapEdge:this.snapEdge};localStorage.setItem(`tui-panel-memory-${this.persistId}`,JSON.stringify(t))}this.dispatchEvent(new CustomEvent("panel-minimize",{detail:{panelId:this.id||this.title},bubbles:!0,composed:!0}))}}restore(){if(this.minimized){if(this.positionX=this._preMinimizeX,this.positionY=this._preMinimizeY,this._preMinimizeWidth!==null&&(this.panelWidth=this._preMinimizeWidth),this._preMinimizeHeight!==null&&(this.panelHeight=this._preMinimizeHeight),this.minimized=!1,this.persistId){const t={minimized:!1,x:this.positionX,y:this.positionY,width:this.panelWidth,height:this.panelHeight,collapsed:this.collapsed,snapEdge:this.snapEdge};localStorage.setItem(`tui-panel-memory-${this.persistId}`,JSON.stringify(t))}this.dispatchEvent(new CustomEvent("panel-restore",{detail:{panelId:this.id||this.title},bubbles:!0,composed:!0}))}}restorePosition(){var e,s,o,i;if(!this.persistId)return!1;const t=localStorage.getItem(`tui-panel-memory-${this.persistId}`);if(!t)return!1;try{const a=JSON.parse(t);return a.minimized?(this._preMinimizeX=((e=a.preMinimize)==null?void 0:e.x)??0,this._preMinimizeY=((s=a.preMinimize)==null?void 0:s.y)??0,this._preMinimizeWidth=((o=a.preMinimize)==null?void 0:o.width)??null,this._preMinimizeHeight=((i=a.preMinimize)==null?void 0:i.height)??null,this.snapEdge=a.snapEdge||"left",this.minimized=!0,!0):(a.x!==void 0&&(this.positionX=a.x),a.y!==void 0&&(this.positionY=a.y),a.width!==void 0&&(this.panelWidth=a.width),a.height!==void 0&&(this.panelHeight=a.height),a.collapsed!==void 0&&(this.collapsed=a.collapsed),a.snapEdge!==void 0&&(this.snapEdge=a.snapEdge),!0)}catch(a){return console.warn(`[tui-panel] Failed to restore position for ${this.persistId}:`,a),!1}}firstUpdated(){this.minimized&&this.floating&&(this._preMinimizeX=this.positionX,this._preMinimizeY=this.positionY,this.snapEdge||(this.snapEdge="left")),this.floating&&!this.minimized&&(this.style.left=`${this.positionX}px`,this.style.top=`${this.positionY}px`)}updated(t){if(this.minimized){this.snapEdge==="right"?(this.style.left="auto",this.style.right="0"):(this.style.left="0",this.style.right="auto"),this.style.top=`${this.positionY}px`,this.style.width="",this.style.height="",this.style.minWidth="",this.style.minHeight="";return}this.floating&&(t.has("positionX")||t.has("positionY")||t.has("floating")||t.has("minimized"))&&(this.style.left=`${this.positionX}px`,this.style.top=`${this.positionY}px`,this.style.right="auto"),t.has("panelWidth")&&this.panelWidth!==null&&(this.style.width=`${this.panelWidth}px`),(t.has("panelHeight")||t.has("collapsed"))&&(this.collapsed?this.style.height="":this.panelHeight!==null&&(this.style.height=`${this.panelHeight}px`)),t.has("maxWidth")&&this.maxWidth!==null&&(this.style.maxWidth=`${this.maxWidth}px`),t.has("maxHeight")&&this.maxHeight!==null&&(this.style.maxHeight=`${this.maxHeight}px`),t.has("minWidth")&&(this.style.minWidth=`${this.minWidth}px`),t.has("minHeight")&&!this.collapsed?this.style.minHeight=`${this.minHeight}px`:this.collapsed&&t.has("collapsed")&&(this.style.minHeight="")}render(){return this.minimized?l.html`
        <div class="edge-tab" @click=${this._onEdgeTabClick} title="Click to restore ${this.title}">
          ${this.title}
        </div>
      `:l.html`
      <div class="panel ${this.collapsed?"collapsed":""}">
        <div
          class="header ${this.floating?"draggable":""}"
          @pointerdown=${this.floating?this._onDragStart:void 0}
        >
          <span class="title"><span class="title-decor">${Y(this.border).before}</span>${this.title}<span class="title-decor">${Y(this.border).after}</span></span>
          <div class="header-controls">
            ${this.collapsible?l.html`
              <button class="collapse-btn" aria-label="Toggle panel" @click=${this._onCollapseClick}>
                ${this.collapsed?"▸":"▾"}
              </button>
            `:""}
            ${this.dismissable?l.html`
              <button class="dismiss-btn" aria-label="Minimize panel" @click=${this._onDismissClick}>−</button>
            `:""}
          </div>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        ${this.resizable&&this.floating?l.html`
          <div class="resize-handle" @pointerdown=${this._onResizeStart}></div>
        `:""}
      </div>
    `}},r.Panel.styles=[m,l.css`
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
    `],b([c({type:String})],r.Panel.prototype,"title",2),b([c({type:String})],r.Panel.prototype,"color",2),b([c({type:String,reflect:!0})],r.Panel.prototype,"border",2),b([c({type:String,reflect:!0})],r.Panel.prototype,"variant",2),b([c({type:String,attribute:"selection-style",reflect:!0})],r.Panel.prototype,"selectionStyle",2),b([c({type:Boolean})],r.Panel.prototype,"collapsible",2),b([c({type:Boolean,reflect:!0})],r.Panel.prototype,"collapsed",2),b([c({type:Boolean,reflect:!0})],r.Panel.prototype,"selected",2),b([c({type:Boolean,reflect:!0})],r.Panel.prototype,"active",2),b([c({type:String,attribute:"persist-id"})],r.Panel.prototype,"persistId",2),b([c({type:Boolean,reflect:!0})],r.Panel.prototype,"dismissable",2),b([c({type:Boolean,reflect:!0})],r.Panel.prototype,"floating",2),b([c({type:String,attribute:"snap-edge",reflect:!0})],r.Panel.prototype,"snapEdge",2),b([c({type:Number,attribute:"position-x"})],r.Panel.prototype,"positionX",2),b([c({type:Number,attribute:"position-y"})],r.Panel.prototype,"positionY",2),b([c({type:Boolean,reflect:!0})],r.Panel.prototype,"resizable",2),b([c({type:Boolean,reflect:!0})],r.Panel.prototype,"minimized",2),b([c({type:Number,attribute:"panel-width"})],r.Panel.prototype,"panelWidth",2),b([c({type:Number,attribute:"panel-height"})],r.Panel.prototype,"panelHeight",2),b([c({type:Number,attribute:"max-width"})],r.Panel.prototype,"maxWidth",2),b([c({type:Number,attribute:"max-height"})],r.Panel.prototype,"maxHeight",2),b([c({type:Number,attribute:"min-width"})],r.Panel.prototype,"minWidth",2),b([c({type:Number,attribute:"min-height"})],r.Panel.prototype,"minHeight",2),b([c({type:String,reflect:!0,converter:{fromAttribute:n=>n||"",toAttribute:n=>n||null}})],r.Panel.prototype,"docked",2),r.Panel=b([f("tui-panel")],r.Panel);const wt={30:"black",31:"red",32:"green",33:"yellow",34:"blue",35:"magenta",36:"cyan",37:"white",90:"black",91:"red",92:"green",93:"yellow",94:"blue",95:"magenta",96:"cyan",97:"white"},$t={40:"black",41:"red",42:"green",43:"yellow",44:"blue",45:"magenta",46:"cyan",47:"white",100:"black",101:"red",102:"green",103:"yellow",104:"blue",105:"magenta",106:"cyan",107:"white"},St={1:"bold",2:"dim",3:"italic",4:"underline",7:"reverse",9:"strikethrough"};function xt(n){const t=["#000000","#aa0000","#00aa00","#aa5500","#0000aa","#aa00aa","#00aaaa","#aaaaaa"],e=["#555555","#ff5555","#55ff55","#ffff55","#5555ff","#ff55ff","#55ffff","#ffffff"];if(n<8)return t[n];if(n<16)return e[n-8];if(n<232){const i=n-16,a=Math.floor(i/36),h=Math.floor(i%36/6),d=i%6,p=u=>(u===0?0:55+u*40).toString(16).padStart(2,"0");return`#${p(a)}${p(h)}${p(d)}`}const o=(8+(n-232)*10).toString(16).padStart(2,"0");return`#${o}${o}${o}`}function tt(n){if(!n)return"";let t=n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");const e=/\x1b\[([0-9;]+)m/g;let s="",o=0,i=[],a;for(;(a=e.exec(t))!==null;){s+=t.slice(o,a.index),o=a.index+a[0].length;const h=a[1].split(";").map(Number);for(let d=0;d<h.length;d++){const p=h[d];if(p===0)s+=i.map(()=>"</span>").join(""),i=[];else if(p===38&&h[d+1]===5&&h[d+2]!==void 0){const u=xt(h[d+2]);s+=`<span style="color: ${u}">`,i.push("256fg"),d+=2}else if(p===48&&h[d+1]===5&&h[d+2]!==void 0){const u=xt(h[d+2]);s+=`<span style="background-color: ${u}">`,i.push("256bg"),d+=2}else if(p===38&&h[d+1]===2&&h.length>d+4){const u=h[d+2],v=h[d+3],y=h[d+4];s+=`<span style="color: rgb(${u},${v},${y})">`,i.push("tcfg"),d+=4}else if(p===48&&h[d+1]===2&&h.length>d+4){const u=h[d+2],v=h[d+3],y=h[d+4];s+=`<span style="background-color: rgb(${u},${v},${y})">`,i.push("tcbg"),d+=4}else if(wt[p]){const u=`ansi-${wt[p]}`;s+=`<span class="${u}">`,i.push(u)}else if($t[p]){const u=`ansi-bg-${$t[p]}`;s+=`<span class="${u}">`,i.push(u)}else if(St[p]){const u=`ansi-${St[p]}`;s+=`<span class="${u}">`,i.push(u)}}}return s+=t.slice(o),s+=i.map(()=>"</span>").join(""),s}var te=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,M=(n,t,e,s)=>{for(var o=s>1?void 0:s?ee(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&te(t,e,o),o};r.Output=class extends l.LitElement{constructor(){super(...arguments),this.maxLines=500,this.autoscroll=!0,this.timestamps=!1,this.attr="",this._lines=[]}append(t){const e=this.timestamps?new Date().toLocaleTimeString("en-US",{hour12:!1}):null,s=t.split(`
`).map(o=>({id:Date.now()+Math.random(),text:o,html:tt(o),timestamp:e}));this._lines=[...this._lines,...s].slice(-this.maxLines),this.autoscroll&&this._isNearBottom()&&this.updateComplete.then(()=>this.scrollToBottom())}clear(){this._lines=[]}handleEvent(t){if(t.type==="clear"){this.clear();return}const e=t.data;e.message!=null&&this.append(e.message)}_isNearBottom(){var s;const t=(s=this.shadowRoot)==null?void 0:s.querySelector(".output");return t?t.scrollHeight-t.scrollTop-t.clientHeight<30:!0}scrollToBottom(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector(".output");t&&(t.scrollTop=t.scrollHeight)}get _attrClasses(){return this.attr.split(/\s+/).filter(Boolean).map(t=>`tui-${t}`).join(" ")}render(){return l.html`
      <div class="output ${this._attrClasses}">
        ${this._lines.length===0?l.html`<div class="empty">Waiting for output...</div>`:this._lines.map(t=>l.html`
              <div class="line">
                ${t.timestamp?l.html`<span class="timestamp">[${t.timestamp}]</span>`:""}
                <span .innerHTML=${t.html}></span>
              </div>
            `)}
      </div>
    `}},r.Output.styles=[m,l.css`
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
    `],M([c({type:Number,attribute:"max-lines"})],r.Output.prototype,"maxLines",2),M([c({type:Boolean})],r.Output.prototype,"autoscroll",2),M([c({type:Boolean})],r.Output.prototype,"timestamps",2),M([c({type:String})],r.Output.prototype,"attr",2),M([g()],r.Output.prototype,"_lines",2),r.Output=M([f("tui-output")],r.Output);var oe=Object.defineProperty,se=Object.getOwnPropertyDescriptor,et=(n,t,e,s)=>{for(var o=s>1?void 0:s?se(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&oe(t,e,o),o};r.Table=class extends l.LitElement{constructor(){super(...arguments),this.border="single",this._columns=[],this._rows=[]}setData(t,e){this._columns=t,this._rows=e}upsertRow(t,e){const s=this._rows.findIndex(o=>o[this._columns[0]]===t);s>=0?this._rows=[...this._rows.slice(0,s),e,...this._rows.slice(s+1)]:this._rows=[...this._rows,e]}handleEvent(t){if(t.type==="clear"){this._columns=[],this._rows=[];return}const e=t.data;if("columns"in e&&"rows"in e){const s=e;this.setData(s.columns,s.rows)}else if("key"in e&&"row"in e){const s=e;this.upsertRow(s.key,s.row)}}getCellClass(t){return typeof t=="number"?"number":t==="✓"||t==="OK"||t==="online"?"status-ok":t==="⚠"||t==="WARN"||t==="degraded"?"status-warn":t==="✗"||t==="ERROR"||t==="offline"?"status-error":""}render(){return this._columns.length===0?l.html`<div class="empty">No data</div>`:l.html`
      <div class="table">
        <div class="row header">
          ${this._columns.map(t=>l.html`<div class="cell">${t}</div>`)}
        </div>
        ${this._rows.map(t=>l.html`
          <div class="row">
            ${this._columns.map(e=>l.html`
              <div class="cell ${this.getCellClass(t[e])}">${t[e]??""}</div>
            `)}
          </div>
        `)}
      </div>
    `}},r.Table.styles=[m,l.css`
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
    `],et([c({type:String})],r.Table.prototype,"border",2),et([g()],r.Table.prototype,"_columns",2),et([g()],r.Table.prototype,"_rows",2),r.Table=et([f("tui-table")],r.Table);var re=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,O=(n,t,e,s)=>{for(var o=s>1?void 0:s?ie(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&re(t,e,o),o};r.Console=class extends l.LitElement{constructor(){super(...arguments),this.prompt="❯ ",this.promptAttr="",this.historySize=100,this._lines=[],this._inputValue="",this._historyIndex=-1,this._history=[]}print(t){const e=t.split(`
`).map(s=>({id:Date.now()+Math.random(),text:s,html:tt(s),type:"output"}));this._lines=[...this._lines,...e],this.updateComplete.then(()=>this.scrollToBottom())}clear(){this._lines=[]}handleEvent(t){if(t.type==="clear"){this.clear();return}const e=t.data;e.message!=null&&this.print(e.message)}scrollToBottom(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector(".output");t&&(t.scrollTop=t.scrollHeight)}focusInput(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector("input");t==null||t.focus()}handleKeydown(t){switch(t.key){case"Enter":this.submitCommand();break;case"ArrowUp":t.preventDefault(),this.navigateHistory(1);break;case"ArrowDown":t.preventDefault(),this.navigateHistory(-1);break;case"l":t.ctrlKey&&(t.preventDefault(),this.clear());break;case"c":t.ctrlKey&&(t.preventDefault(),this._inputValue="",this.print("^C"));break}}submitCommand(){const t=this._inputValue.trim();t&&(this._lines=[...this._lines,{id:Date.now(),text:t,html:t,type:"command",prompt:this.prompt}],this._history=[...this._history.slice(-this.historySize+1),t],this._historyIndex=-1,this._inputValue="",this.dispatchEvent(new CustomEvent("command",{detail:t,bubbles:!0,composed:!0})),this.updateComplete.then(()=>this.scrollToBottom()))}navigateHistory(t){const e=this._historyIndex+t;e<0?(this._historyIndex=-1,this._inputValue=""):e<this._history.length&&(this._historyIndex=e,this._inputValue=this._history[this._history.length-1-e])}handleInput(t){this._inputValue=t.target.value}get _promptClasses(){return["prompt",...this.promptAttr.split(/\s+/).filter(Boolean).map(t=>`tui-${t}`)].join(" ")}render(){return l.html`
      <div class="console" @click=${this.focusInput}>
        <div class="output">
          ${this._lines.map(t=>l.html`
            <div class="line ${t.type}" data-prompt=${t.prompt||""}>
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
    `}},r.Console.styles=[m,l.css`
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
    `],O([c({type:String})],r.Console.prototype,"prompt",2),O([c({type:String,attribute:"prompt-attr"})],r.Console.prototype,"promptAttr",2),O([c({type:Number,attribute:"history-size"})],r.Console.prototype,"historySize",2),O([g()],r.Console.prototype,"_lines",2),O([g()],r.Console.prototype,"_inputValue",2),O([g()],r.Console.prototype,"_historyIndex",2),r.Console=O([f("tui-console")],r.Console);var ae=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,ot=(n,t,e,s)=>{for(var o=s>1?void 0:s?ne(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&ae(t,e,o),o};r.Text=class extends l.LitElement{constructor(){super(...arguments),this.content="",this.attr="",this.variant=""}render(){const t=this.attr.split(/\s+/).filter(Boolean).map(s=>`tui-${s}`).join(" "),e=tt(this.content||this.textContent||"");return l.html`<pre class="${t}" .innerHTML=${e}></pre>`}},r.Text.styles=[m,l.css`
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
    `],ot([c({type:String})],r.Text.prototype,"content",2),ot([c({type:String})],r.Text.prototype,"attr",2),ot([c({type:String,reflect:!0})],r.Text.prototype,"variant",2),r.Text=ot([f("tui-text")],r.Text);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let le=class extends Event{constructor(t,e,s,o){super("context-request",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=e,this.callback=s,this.subscribe=o??!1}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function po(n){return n}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ct{constructor(t,e,s,o){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(i,a)=>{this.unsubscribe&&(this.unsubscribe!==a&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=i,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(i,a)),this.unsubscribe=a},this.host=t,e.context!==void 0){const i=e;this.context=i.context,this.callback=i.callback,this.subscribe=i.subscribe??!1}else this.context=e,this.callback=s,this.subscribe=o??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new le(this.context,this.host,this.t,this.subscribe))}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ce({context:n,subscribe:t}){return(e,s)=>{typeof s=="object"?s.addInitializer(function(){new Ct(this,{context:n,callback:o=>{e.set.call(this,o)},subscribe:t})}):e.constructor.addInitializer(o=>{new Ct(o,{context:n,callback:i=>{o[s]=i},subscribe:t})})}}class he{constructor(t){this.activeTool=null,this.activeTools=[],this.palette={currentColor:"#000000",colors:[]},this.groups=t.groups,this.tools=t.tools}selectTool(t){const e=this.tools.find(o=>o.id===t);if(!e)return this;const s=this.groups[e.group];return s?(s.exclusive?this.activeTool=t:this.activeTools.includes(t)||(this.activeTools=[...this.activeTools,t]),this):this}toggleTool(t){const e=this.tools.find(i=>i.id===t);if(!e)return this;const s=this.groups[e.group];if(!s)return this;if(s.exclusive)return this.selectTool(t);const o=this.activeTools.includes(t);return this.activeTools=o?this.activeTools.filter(i=>i!==t):[...this.activeTools,t],this}isActive(t){return this.activeTool===t||this.activeTools.includes(t)}setColor(t){return this.palette={...this.palette,currentColor:t},this}}const Et="tool-state";var de=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,S=(n,t,e,s)=>{for(var o=s>1?void 0:s?pe(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&de(t,e,o),o};r.Button=class extends l.LitElement{constructor(){super(...arguments),this.variant="default",this.size="md",this.selected=!1,this.disabled=!1,this.block=!1}updated(t){super.updated(t),this.toolId&&this.toolState&&(this.selected=this.toolState.isActive(this.toolId))}render(){return l.html`
      <button ?disabled=${this.disabled} part="button">
        <slot></slot>
      </button>
    `}},r.Button.shadowRootOptions={...l.LitElement.shadowRootOptions,delegatesFocus:!0},r.Button.styles=[m,l.css`
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
    `],S([c({reflect:!0})],r.Button.prototype,"variant",2),S([c({reflect:!0})],r.Button.prototype,"size",2),S([c({attribute:"selection-style"})],r.Button.prototype,"selectionStyle",2),S([c({attribute:"tool-id"})],r.Button.prototype,"toolId",2),S([ce({context:Et,subscribe:!0})],r.Button.prototype,"toolState",2),S([c({type:Boolean,reflect:!0})],r.Button.prototype,"selected",2),S([c({type:Boolean,reflect:!0})],r.Button.prototype,"disabled",2),S([c({type:Boolean,reflect:!0})],r.Button.prototype,"block",2),r.Button=S([f("tui-button")],r.Button);var ue=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,w=(n,t,e,s)=>{for(var o=s>1?void 0:s?fe(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&ue(t,e,o),o};r.Menu=class extends l.LitElement{constructor(){super(...arguments),this._openMenu=null}render(){return l.html`<slot></slot>`}},r.Menu.styles=[m,l.css`
      :host {
        display: flex;
        gap: var(--spacing-xs);
      }
    `],w([g()],r.Menu.prototype,"_openMenu",2),r.Menu=w([f("tui-menu")],r.Menu),r.MenuItem=class extends l.LitElement{constructor(){super(...arguments),this.label="",this.hotkey="",this._open=!1,this._outsideClickHandler=null}connectedCallback(){super.connectedCallback(),this._outsideClickHandler=t=>{this._open&&!this.contains(t.target)&&this._close()},document.addEventListener("click",this._outsideClickHandler),this.addEventListener("keydown",this._handleKeydown.bind(this))}disconnectedCallback(){super.disconnectedCallback(),this._outsideClickHandler&&document.removeEventListener("click",this._outsideClickHandler)}_toggle(){this._open=!this._open,this.classList.toggle("open",this._open)}_close(){this._open=!1,this.classList.remove("open")}_handleKeydown(t){t.key==="Escape"&&(this._close(),t.preventDefault()),(t.key==="Enter"||t.key===" "||t.key==="ArrowDown")&&(this._open||(this._toggle(),t.preventDefault()))}render(){let t=this.label;if(this.hotkey&&this.label.toLowerCase().includes(this.hotkey.toLowerCase())){const e=this.label.toLowerCase().indexOf(this.hotkey.toLowerCase()),s=this.label.slice(0,e),o=this.label.slice(e,e+1),i=this.label.slice(e+1);t=l.html`${s}<span class="hotkey">${o}</span>${i}`}return l.html`
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
    `}},r.MenuItem.styles=[m,l.css`
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
    `],w([c({type:String})],r.MenuItem.prototype,"label",2),w([c({type:String})],r.MenuItem.prototype,"hotkey",2),w([g()],r.MenuItem.prototype,"_open",2),r.MenuItem=w([f("tui-menu-item")],r.MenuItem),r.MenuAction=class extends l.LitElement{constructor(){super(...arguments),this.label="",this.shortcut="",this.danger=!1}_handleClick(){this.dispatchEvent(new CustomEvent("action",{bubbles:!0,composed:!0}))}render(){return l.html`
      <button @click=${this._handleClick}>
        <span>${this.label}</span>
        ${this.shortcut?l.html`<span class="shortcut">${this.shortcut}</span>`:""}
      </button>
    `}},r.MenuAction.styles=[m,l.css`
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
    `],w([c({type:String})],r.MenuAction.prototype,"label",2),w([c({type:String})],r.MenuAction.prototype,"shortcut",2),w([c({type:Boolean,reflect:!0})],r.MenuAction.prototype,"danger",2),r.MenuAction=w([f("tui-menu-action")],r.MenuAction),r.MenuDivider=class extends l.LitElement{render(){return l.html``}},r.MenuDivider.styles=l.css`
    :host {
      display: block;
      height: 1px;
      background: var(--border-default);
      margin: var(--spacing-xs) 0;
    }
  `,r.MenuDivider=w([f("tui-menu-divider")],r.MenuDivider);var me=Object.defineProperty,be=Object.getOwnPropertyDescriptor,I=(n,t,e,s)=>{for(var o=s>1?void 0:s?be(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&me(t,e,o),o};r.Statusbar=class extends l.LitElement{constructor(){super(...arguments),this.color="magenta"}render(){return l.html`<slot></slot>`}},r.Statusbar.styles=[m,l.css`
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
    `],I([c({type:String,reflect:!0})],r.Statusbar.prototype,"color",2),r.Statusbar=I([f("tui-statusbar")],r.Statusbar),r.StatusItem=class extends l.LitElement{constructor(){super(...arguments),this.label="",this.value="",this.highlight=!1}render(){return l.html`
      <span class="label">${this.label}</span>
      <span class="value">${this.value}</span>
    `}},r.StatusItem.styles=[m,l.css`
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
    `],I([c({type:String})],r.StatusItem.prototype,"label",2),I([c({type:String})],r.StatusItem.prototype,"value",2),I([c({type:Boolean,reflect:!0})],r.StatusItem.prototype,"highlight",2),r.StatusItem=I([f("tui-status-item")],r.StatusItem);var ge=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,W=(n,t,e,s)=>{for(var o=s>1?void 0:s?ve(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&ge(t,e,o),o};r.Modal=class extends l.LitElement{constructor(){super(...arguments),this.title="",this.border="double",this.open=!1,this.closable=!0,this._boundKeyHandler=this._handleKeydown.bind(this)}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._boundKeyHandler)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this._boundKeyHandler)}_handleKeydown(t){this.open&&t.key==="Escape"&&this.closable&&(this.close(),t.preventDefault(),t.stopPropagation())}_handleOverlayClick(t){t.target===t.currentTarget&&this.closable&&this.close()}show(){this.open=!0,this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}close(){this.open=!1,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return l.html`
      <div class="overlay" @click=${this._handleOverlayClick}>
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="header">
            <span class="title" id="modal-title"><span class="title-decor">${Y(this.border).before}</span>${this.title}<span class="title-decor">${Y(this.border).after}</span></span>
            ${this.closable?l.html`
              <button class="close" @click=${this.close} aria-label="Close">✕</button>
            `:""}
          </div>
          <div class="content">
            <slot></slot>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `}},r.Modal.styles=[m,l.css`
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
    `],W([c({type:String,reflect:!0})],r.Modal.prototype,"title",2),W([c({type:String,reflect:!0})],r.Modal.prototype,"border",2),W([c({type:Boolean,reflect:!0})],r.Modal.prototype,"open",2),W([c({type:Boolean})],r.Modal.prototype,"closable",2),r.Modal=W([f("tui-modal")],r.Modal);var ye=Object.defineProperty,_e=Object.getOwnPropertyDescriptor,_=(n,t,e,s)=>{for(var o=s>1?void 0:s?_e(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&ye(t,e,o),o};r.Toolbar=class extends l.LitElement{constructor(){super(...arguments),this.orientation="vertical",this.selected="",this.size="md",this.selectionStyle="",this.tools=[],this.showHotkeys=!0}updated(t){t.has("selectionStyle")&&this.selectionStyle&&this.style.setProperty("--toolbar-selection-style",this.selectionStyle)}_handleClick(t){this.selected=t,this.dispatchEvent(new CustomEvent("tool-select",{bubbles:!0,composed:!0,detail:{tool:t}}))}render(){return this.tools&&this.tools.length>0?l.html`
        <div class="toolbar">
          ${this.tools.map(t=>t.divider?l.html`<div class="divider"></div>`:l.html`
              <div class="tool-item">
                ${this.showHotkeys&&t.key?l.html`<span class="hotkey">${t.key}</span>`:""}
                <tui-button
                  variant="icon"
                  size=${this.size}
                  tool-id=${t.id}
                  ?selected=${this.selected===t.id}
                  selection-style=${this.selectionStyle||"invert"}
                  title="${t.name||t.id}${t.key?` (${t.key})`:""}"
                  @click=${()=>this._handleClick(t.id)}
                >
                  ${t.icon||t.id.charAt(0).toUpperCase()}
                </tui-button>
              </div>
            `)}
        </div>
      `:l.html`
      <div class="toolbar">
        <slot></slot>
      </div>
    `}},r.Toolbar.styles=[m,l.css`
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
    `],_([c({reflect:!0})],r.Toolbar.prototype,"orientation",2),_([c()],r.Toolbar.prototype,"selected",2),_([c({reflect:!0})],r.Toolbar.prototype,"size",2),_([c({attribute:"selection-style"})],r.Toolbar.prototype,"selectionStyle",2),_([c({type:Array})],r.Toolbar.prototype,"tools",2),_([c({type:Boolean,attribute:"show-hotkeys"})],r.Toolbar.prototype,"showHotkeys",2),r.Toolbar=_([f("tui-toolbar")],r.Toolbar),r.Tool=class extends l.LitElement{constructor(){super(...arguments),this.toolId="",this.icon="",this.active=!1,this.size="md"}_handleClick(){this.dispatchEvent(new CustomEvent("tool-select",{bubbles:!0,composed:!0,detail:{tool:this.toolId}}))}render(){return l.html`
      <tui-button
        variant="icon"
        size=${this.size}
        ?selected=${this.active}
        @click=${this._handleClick}
      >
        <slot>${this.icon}</slot>
      </tui-button>
    `}},r.Tool.styles=l.css`
    :host {
      display: contents;
    }
  `,_([c({attribute:"tool-id"})],r.Tool.prototype,"toolId",2),_([c()],r.Tool.prototype,"icon",2),_([c({type:Boolean,reflect:!0})],r.Tool.prototype,"active",2),_([c()],r.Tool.prototype,"size",2),r.Tool=_([f("tui-tool")],r.Tool);var we=Object.defineProperty,$e=Object.getOwnPropertyDescriptor,N=(n,t,e,s)=>{for(var o=s>1?void 0:s?$e(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&we(t,e,o),o};r.Toast=class extends l.LitElement{constructor(){super(...arguments),this.position="bottom",this._queue=[],this._current=null,this._visible=!1}show(t,e={}){const s={message:t,type:e.type||null,title:e.title||this._getDefaultTitle(e.type),duration:e.duration||2500,simple:!e.type&&!e.title};this._queue=[...this._queue,s],this._current||this._showNext()}_getDefaultTitle(t){switch(t){case"success":return"Success";case"error":return"Error";case"warning":return"Warning";case"info":return"Info";default:return""}}async _showNext(){if(this._queue.length===0){this._current=null;return}const[t,...e]=this._queue;this._queue=e,this._current=t,this._visible=!1,await this.updateComplete,requestAnimationFrame(()=>{this._visible=!0}),await new Promise(s=>setTimeout(s,this._current.duration)),this._visible=!1,await new Promise(s=>setTimeout(s,200)),this._showNext()}render(){if(!this._current)return l.html``;const{message:t,type:e,title:s,simple:o}=this._current,i=["toast",this._visible?"visible":"",e?`type-${e}`:"",o?"simple":""].filter(Boolean).join(" ");return l.html`
      <div class="${i}">
        <div class="toast-header">${s}</div>
        <div class="toast-body">${t}</div>
      </div>
    `}},r.Toast.styles=[m,l.css`
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
    `],N([c({type:String,reflect:!0})],r.Toast.prototype,"position",2),N([g()],r.Toast.prototype,"_queue",2),N([g()],r.Toast.prototype,"_current",2),N([g()],r.Toast.prototype,"_visible",2),r.Toast=N([f("tui-toast")],r.Toast);let st=null;function Se(n,t){st||(st=document.createElement("tui-toast"),document.body.appendChild(st)),st.show(n,t)}var xe=Object.defineProperty,Ce=Object.getOwnPropertyDescriptor,T=(n,t,e,s)=>{for(var o=s>1?void 0:s?Ce(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&xe(t,e,o),o};const C=X.single,E=X.heavy,z=X.double;r.Card=class extends l.LitElement{constructor(){super(...arguments),this.rank="",this.suit="",this.faceDown=!1,this.selected=!1,this.disabled=!1,this.size="md"}get isRed(){return this.suit==="♥"||this.suit==="♦"}_handleClick(){this.disabled||this.dispatchEvent(new CustomEvent("card-click",{bubbles:!0,composed:!0,detail:{rank:this.rank,suit:this.suit}}))}render(){const t=this.isRed?"suit red":"suit",e=`size-${this.size}`;return l.html`
      <div 
        class="card ${e} ${this.disabled?"disabled":""}"
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
    `}},r.Card.styles=[m,l.css`
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
         NEUTRAL STATE - Single line border ${l.unsafeCSS(C.tl)}${l.unsafeCSS(C.h)}${l.unsafeCSS(C.h)}${l.unsafeCSS(C.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      .card {
        border: var(--border-width) solid var(--border-default);
      }

      .card::before {
        content: '${l.unsafeCSS(C.tl)}';
        position: absolute;
        top: -1px;
        left: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card::after {
        content: '${l.unsafeCSS(C.tr)}';
        position: absolute;
        top: -1px;
        right: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card-bottom::before {
        content: '${l.unsafeCSS(C.bl)}';
        position: absolute;
        bottom: -1px;
        left: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card-bottom::after {
        content: '${l.unsafeCSS(C.br)}';
        position: absolute;
        bottom: -1px;
        right: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      /* ═══════════════════════════════════════════════════════════════════
         HOVER STATE - Heavy line border ${l.unsafeCSS(E.tl)}${l.unsafeCSS(E.h)}${l.unsafeCSS(E.h)}${l.unsafeCSS(E.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      .card:hover:not(.disabled) {
        border-color: var(--text-primary);
        box-shadow: 2px 2px 0 rgba(255,255,255,0.08);
        transform: translateY(-2px);
      }

      .card:hover:not(.disabled)::before { content: '${l.unsafeCSS(E.tl)}'; color: var(--text-primary); }
      .card:hover:not(.disabled)::after { content: '${l.unsafeCSS(E.tr)}'; color: var(--text-primary); }
      .card:hover:not(.disabled) .card-bottom::before { content: '${l.unsafeCSS(E.bl)}'; color: var(--text-primary); }
      .card:hover:not(.disabled) .card-bottom::after { content: '${l.unsafeCSS(E.br)}'; color: var(--text-primary); }

      /* ═══════════════════════════════════════════════════════════════════
         SELECTED STATE - Double line border ${l.unsafeCSS(z.tl)}${l.unsafeCSS(z.h)}${l.unsafeCSS(z.h)}${l.unsafeCSS(z.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      :host([selected]) .card {
        border-color: var(--color-primary);
        box-shadow: 3px 3px 0 rgba(88, 166, 255, 0.2);
      }

      :host([selected]) .card::before { content: '${l.unsafeCSS(z.tl)}'; color: var(--color-primary); }
      :host([selected]) .card::after { content: '${l.unsafeCSS(z.tr)}'; color: var(--color-primary); }
      :host([selected]) .card-bottom::before { content: '${l.unsafeCSS(z.bl)}'; color: var(--color-primary); }
      :host([selected]) .card-bottom::after { content: '${l.unsafeCSS(z.br)}'; color: var(--color-primary); }

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
    `],T([c({type:String})],r.Card.prototype,"rank",2),T([c({type:String})],r.Card.prototype,"suit",2),T([c({type:Boolean,attribute:"face-down",reflect:!0})],r.Card.prototype,"faceDown",2),T([c({type:Boolean,reflect:!0})],r.Card.prototype,"selected",2),T([c({type:Boolean,reflect:!0})],r.Card.prototype,"disabled",2),T([c({type:String,reflect:!0})],r.Card.prototype,"size",2),r.Card=T([f("tui-card")],r.Card);var Ee=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,U=(n,t,e,s)=>{for(var o=s>1?void 0:s?ze(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&Ee(t,e,o),o};r.Palette=class extends l.LitElement{constructor(){super(...arguments),this.palettes={},this.currentPalette="",this.selectedChar="",this.columns=8}get _chars(){return this.palettes[this.currentPalette]||[]}_selectPalette(t){var s;const e=((s=this.palettes[t])==null?void 0:s[0])||"";this.dispatchEvent(new CustomEvent("palette-change",{bubbles:!0,composed:!0,detail:{palette:t,firstChar:e}}))}_selectChar(t){this.dispatchEvent(new CustomEvent("char-select",{bubbles:!0,composed:!0,detail:{char:t}}))}render(){const t=Object.keys(this.palettes);return l.html`
      <div class="tabs">
        ${t.map(e=>l.html`
          <button
            class="tab ${e===this.currentPalette?"active":""}"
            @click=${()=>this._selectPalette(e)}
          >${e}</button>
        `)}
      </div>
      <div class="grid" style="grid-template-columns: repeat(${this.columns}, 28px)">
        ${this._chars.map(e=>l.html`
          <button
            class="char ${e===this.selectedChar?"selected":""}"
            @click=${()=>this._selectChar(e)}
          >${e}</button>
        `)}
      </div>
    `}},r.Palette.styles=[m,l.css`
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
    `],U([c({type:Object})],r.Palette.prototype,"palettes",2),U([c({type:String,attribute:"current-palette"})],r.Palette.prototype,"currentPalette",2),U([c({type:String,attribute:"selected-char"})],r.Palette.prototype,"selectedChar",2),U([c({type:Number})],r.Palette.prototype,"columns",2),r.Palette=U([f("tui-palette")],r.Palette);class zt{constructor(t){this.cellSize=t,this._gridWidth=0,this._gridHeight=0}screenToGrid(t,e,s){const o=Math.floor(t/this.cellSize),i=Math.floor(e/this.cellSize),a=Math.floor(s.width/this.cellSize),h=Math.floor(s.height/this.cellSize);return o<0||o>=a||i<0||i>=h?null:{x:o,y:i}}gridToScreen(t,e,s){return{x:(t+.5)*this.cellSize,y:(e+.5)*this.cellSize}}getCellPath(t,e){const s=t*this.cellSize,o=e*this.cellSize,i=this.cellSize;return`M ${s},${o} L ${s+i},${o} L ${s+i},${o+i} L ${s},${o+i} Z`}getBoundsPath(){const t=this._gridWidth*this.cellSize,e=this._gridHeight*this.cellSize;return`M 0,0 L ${t},0 L ${t},${e} L 0,${e} Z`}getDimensions(t,e){return this._gridWidth=t,this._gridHeight=e,{width:t*this.cellSize,height:e*this.cellSize}}}class Pt{constructor(t){this.cellSize=t,this._gridWidth=0,this._gridHeight=0}get tileWidth(){return this.cellSize}get tileHeight(){return this.cellSize/2}getOriginX(t){return t*(this.tileWidth/2)}screenToGrid(t,e,s){const o=this.tileWidth,i=this.tileHeight,a=this.getOriginX(this._gridHeight),h=t-a,d=e,p=Math.floor((h/(o/2)+d/(i/2))/2),u=Math.floor((d/(i/2)-h/(o/2))/2);return p<0||u<0||p>=this._gridWidth||u>=this._gridHeight?null:{x:p,y:u}}gridToScreen(t,e,s){const o=this.tileWidth,i=this.tileHeight;return{x:this.getOriginX(this._gridHeight)+(t-e)*(o/2),y:(t+e)*(i/2)+i/2}}getCellPath(t,e){const s=this.tileWidth,o=this.tileHeight,a=this.getOriginX(this._gridHeight)+(t-e)*(s/2),h=(t+e)*(o/2)+o/2;return`M ${a},${h-o/2} L ${a+s/2},${h} L ${a},${h+o/2} L ${a-s/2},${h} Z`}getBoundsPath(){const t=this.tileWidth,e=this.tileHeight,s=this._gridWidth,o=this._gridHeight,i=this.getOriginX(o),a=i,h=0,d=i+s*(t/2),p=s*(e/2),u=i+(s-o)*(t/2),v=(s+o)*(e/2),y=i-o*(t/2),k=o*(e/2);return`M ${a},${h} L ${d},${p} L ${u},${v} L ${y},${k} Z`}getDimensions(t,e){const s=this.tileWidth,o=this.tileHeight;return this._gridWidth=t,this._gridHeight=e,{width:(t+e)*(s/2),height:(t+e)*(o/2)+o}}}class kt{constructor(t){this.cellSize=t,this._gridWidth=0,this._gridHeight=0}screenToGrid(t,e,s){const o=Math.floor(t/this.cellSize),i=Math.floor(e/this.cellSize),a=Math.floor(s.width/this.cellSize),h=Math.floor(s.height/this.cellSize);if(o<0||o>=a||i<0||i>=h)return null;const d=t%this.cellSize/this.cellSize,p=e%this.cellSize/this.cellSize;let u;return p<d?u=p<1-d?"top":"right":u=p<1-d?"left":"bottom",{x:o,y:i,region:u}}gridToScreen(t,e,s,o){const i=(t+.5)*this.cellSize,a=(e+.5)*this.cellSize;if(!o)return{x:i,y:a};const h=this.cellSize/6,p={top:{x:0,y:-h},right:{x:h,y:0},bottom:{x:0,y:h},left:{x:-h,y:0}}[o]||{x:0,y:0};return{x:i+p.x,y:a+p.y}}getCellPath(t,e,s){const o=t*this.cellSize,i=e*this.cellSize,a=this.cellSize;if(!s)return`M ${o},${i} L ${o+a},${i} L ${o+a},${i+a} L ${o},${i+a} Z`;const h=o+a/2,d=i+a/2;return{top:`M ${o},${i} L ${o+a},${i} L ${h},${d} Z`,right:`M ${o+a},${i} L ${o+a},${i+a} L ${h},${d} Z`,bottom:`M ${o+a},${i+a} L ${o},${i+a} L ${h},${d} Z`,left:`M ${o},${i+a} L ${o},${i} L ${h},${d} Z`}[s]||""}getBoundsPath(){const t=this._gridWidth*this.cellSize,e=this._gridHeight*this.cellSize;return`M 0,0 L ${t},0 L ${t},${e} L 0,${e} Z`}getDimensions(t,e){return this._gridWidth=t,this._gridHeight=e,{width:t*this.cellSize,height:e*this.cellSize}}}function P(n,t){switch(n){case"rectangular":return new zt(t);case"isometric":return new Pt(t);case"triangular":return new kt(t);default:throw new Error(`Unknown projection type: ${n}`)}}var Pe=Object.defineProperty,ke=Object.getOwnPropertyDescriptor,$=(n,t,e,s)=>{for(var o=s>1?void 0:s?ke(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&Pe(t,e,o),o};r.Canvas=class extends l.LitElement{constructor(){super(...arguments),this.width=16,this.height=16,this.cellSize=20,this.readonly=!1,this.showGrid=!0,this.continuous=!1,this.projection="rectangular",this.hoverX=-1,this.hoverY=-1,this.projectionEngine=null,this.isDrawing=!1,this.startX=-1,this.startY=-1,this.lastX=-1,this.lastY=-1,this.lastPointerCoords=null,this.currentPointerId=null,this.handlePointerDown=t=>{if(this.readonly||t.button!==0)return;const e=this.screenToGrid(t.clientX,t.clientY);e&&(t.target.setPointerCapture(t.pointerId),t.preventDefault(),this.isDrawing=!0,this.currentPointerId=t.pointerId,this.startX=e.x,this.startY=e.y,this.lastX=e.x,this.lastY=e.y,this.lastPointerCoords={x:t.clientX,y:t.clientY},this.dispatchEvent(new CustomEvent("canvas-drag-start",{detail:{x:e.x,y:e.y,region:e.region,pointerType:t.pointerType},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("canvas-draw",{detail:{x:e.x,y:e.y,region:e.region,pointerType:t.pointerType},bubbles:!0,composed:!0})))},this.handlePointerMove=t=>{const e=this.screenToGrid(t.clientX,t.clientY);if(e?(e.x!==this.hoverX||e.y!==this.hoverY)&&(this.hoverX=e.x,this.hoverY=e.y,this.dispatchEvent(new CustomEvent("canvas-hover",{detail:{x:e.x,y:e.y,region:e.region},bubbles:!0,composed:!0}))):this.hoverX!==-1&&(this.hoverX=-1,this.hoverY=-1),!(!this.isDrawing||this.readonly)&&t.pointerId===this.currentPointerId){if(t.preventDefault(),this.lastPointerCoords){const s=this.interpolatePoints(this.lastPointerCoords.x,this.lastPointerCoords.y,t.clientX,t.clientY);for(const o of s)(o.x!==this.lastX||o.y!==this.lastY||this.continuous)&&(this.dispatchEvent(new CustomEvent("canvas-draw",{detail:{x:o.x,y:o.y,region:o.region,pointerType:t.pointerType},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("canvas-drag",{detail:{x:o.x,y:o.y,region:o.region,startX:this.startX,startY:this.startY,pointerType:t.pointerType},bubbles:!0,composed:!0})),this.lastX=o.x,this.lastY=o.y)}this.lastPointerCoords={x:t.clientX,y:t.clientY}}},this.handlePointerUp=t=>{var s,o;if(!this.isDrawing||t.pointerId!==this.currentPointerId)return;(o=(s=t.target).hasPointerCapture)!=null&&o.call(s,t.pointerId)&&t.target.releasePointerCapture(t.pointerId);const e=this.screenToGrid(t.clientX,t.clientY);this.dispatchEvent(new CustomEvent("canvas-drag-end",{detail:{x:(e==null?void 0:e.x)??this.lastX,y:(e==null?void 0:e.y)??this.lastY,region:e==null?void 0:e.region,startX:this.startX,startY:this.startY,pointerType:t.pointerType},bubbles:!0,composed:!0})),this.isDrawing=!1,this.currentPointerId=null,this.lastPointerCoords=null},this.handlePointerLeave=t=>{var e,s;(s=(e=t.target).hasPointerCapture)!=null&&s.call(e,t.pointerId)||(this.hoverX=-1,this.hoverY=-1,this.dispatchEvent(new CustomEvent("canvas-leave",{bubbles:!0,composed:!0})))},this.handleContextMenu=t=>{t.preventDefault()}}connectedCallback(){super.connectedCallback(),this.projectionEngine=P(this.projection,this.cellSize)}updated(t){super.updated(t),(t.has("projection")||t.has("cellSize")||t.has("width")||t.has("height"))&&(this.projectionEngine=P(this.projection,this.cellSize),this.hoverX=-1,this.hoverY=-1,this.dispatchEvent(new CustomEvent("canvas-ready",{bubbles:!0,composed:!0,detail:{width:this.canvasWidth,height:this.canvasHeight,viewBox:this.viewBox}})))}screenToGrid(t,e){var p;const s=(p=this.shadowRoot)==null?void 0:p.querySelector(".canvas-container");if(!s||!this.projectionEngine)return null;const o=s.getBoundingClientRect(),i=t-o.left,a=e-o.top,{width:h,height:d}=this.projectionEngine.getDimensions(this.width,this.height);return this.projectionEngine.screenToGrid(i,a,{width:h,height:d})}interpolatePoints(t,e,s,o){const i=[],a=s-t,h=o-e,d=Math.sqrt(a*a+h*h),p=Math.max(1,Math.ceil(d/(this.cellSize/2)));for(let u=0;u<=p;u++){const v=u/p,y=t+a*v,k=e+h*v,H=this.screenToGrid(y,k);if(H){const ut=i[i.length-1];(!ut||ut.x!==H.x||ut.y!==H.y)&&i.push(H)}}return i}renderGrid(){if(!this.showGrid)return null;const t=this.projectionEngine||P("rectangular",this.cellSize),{width:e,height:s}=t.getDimensions(this.width,this.height),o=[];for(let a=0;a<this.height;a++)for(let h=0;h<this.width;h++)o.push(`<path d="${t.getCellPath(h,a)}" fill="none"/>`);const i=t.getBoundsPath();return l.html`
      <div class="grid-layer">
        <svg viewBox="0 0 ${e} ${s}">
          <path d="${i}" fill="var(--_canvas-grid-fill)" stroke="var(--_canvas-grid-color)" stroke-width="1"/>
          <g stroke="var(--_canvas-grid-color)" stroke-width="0.5" opacity="0.5">
            ${o.map(a=>l.html`${this.unsafeSVG(a)}`)}
          </g>
        </svg>
      </div>
    `}unsafeSVG(t){const e=document.createElement("template");return e.innerHTML=t,e.content.firstChild}renderHover(){if(this.hoverX<0||this.hoverY<0)return null;const t=this.projectionEngine||P("rectangular",this.cellSize),{width:e,height:s}=t.getDimensions(this.width,this.height),o=t.getCellPath(this.hoverX,this.hoverY);return l.html`
      <div class="hover-layer">
        <svg viewBox="0 0 ${e} ${s}" style="width:100%;height:100%;">
          <path d="${o}" fill="var(--_canvas-hover-color)" />
        </svg>
      </div>
    `}render(){const t=this.projectionEngine||P("rectangular",this.cellSize),{width:e,height:s}=t.getDimensions(this.width,this.height),o=`
      width: ${e}px;
      height: ${s}px;
    `;return l.html`
      <div
        class="canvas-container"
        style=${o}
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
    `}getDimensions(){return{width:this.width,height:this.height,cellSize:this.cellSize}}get canvasWidth(){return(this.projectionEngine||P("rectangular",this.cellSize)).getDimensions(this.width,this.height).width}get canvasHeight(){return(this.projectionEngine||P("rectangular",this.cellSize)).getDimensions(this.width,this.height).height}get viewBox(){return`0 0 ${this.canvasWidth} ${this.canvasHeight}`}gridToScreen(t,e){var d;const s=(d=this.shadowRoot)==null?void 0:d.querySelector(".canvas-container");if(!s||!this.projectionEngine)return null;const o=s.getBoundingClientRect(),{width:i,height:a}=this.projectionEngine.getDimensions(this.width,this.height),h=this.projectionEngine.gridToScreen(t,e,{width:i,height:a});return{x:o.left+h.x,y:o.top+h.y}}setHover(t,e){t>=0&&t<this.width&&e>=0&&e<this.height?(this.hoverX=t,this.hoverY=e):(this.hoverX=-1,this.hoverY=-1)}},r.Canvas.styles=[m,l.css`
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
    `],$([c({type:Number})],r.Canvas.prototype,"width",2),$([c({type:Number})],r.Canvas.prototype,"height",2),$([c({type:Number,attribute:"cell-size"})],r.Canvas.prototype,"cellSize",2),$([c({type:Boolean,reflect:!0})],r.Canvas.prototype,"readonly",2),$([c({type:Boolean,attribute:"show-grid"})],r.Canvas.prototype,"showGrid",2),$([c({type:Boolean})],r.Canvas.prototype,"continuous",2),$([c({type:String})],r.Canvas.prototype,"projection",2),$([g()],r.Canvas.prototype,"hoverX",2),$([g()],r.Canvas.prototype,"hoverY",2),$([g()],r.Canvas.prototype,"projectionEngine",2),r.Canvas=$([f("tui-canvas")],r.Canvas);var Oe=Object.defineProperty,Te=Object.getOwnPropertyDescriptor,rt=(n,t,e,s)=>{for(var o=s>1?void 0:s?Te(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&Oe(t,e,o),o};r.Link=class extends l.LitElement{constructor(){super(...arguments),this.href="",this.type="external",this._copied=!1}_handleClick(){this.type==="external"&&this.href?window.open(this.href,"_blank","noopener"):this.type==="copy"&&this.href&&navigator.clipboard.writeText(this.href).then(()=>{this._copied=!0,this.dispatchEvent(new CustomEvent("copy",{detail:{value:this.href},bubbles:!0,composed:!0})),setTimeout(()=>{this._copied=!1},1500)})}render(){const t=this.type==="external"?"↗":"⧉";return l.html`
      <button class="link" @click=${this._handleClick}>
        <slot></slot><span class="icon">${t}</span>
      </button>${this._copied?l.html`<span class="copied">copied</span>`:""}
    `}},r.Link.styles=[m,l.css`
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
    `],rt([c({type:String})],r.Link.prototype,"href",2),rt([c({type:String,reflect:!0})],r.Link.prototype,"type",2),rt([g()],r.Link.prototype,"_copied",2),r.Link=rt([f("tui-link")],r.Link);var De=Object.defineProperty,Me=Object.getOwnPropertyDescriptor,ht=(n,t,e,s)=>{for(var o=s>1?void 0:s?Me(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&De(t,e,o),o};r.ActionList=class extends l.LitElement{constructor(){super(...arguments),this.items=[],this.selected=""}_handleClick(t,e){this.selected===t?(this.selected="",this.dispatchEvent(new CustomEvent("item-deselect",{bubbles:!0,composed:!0}))):(this.selected=t,this.dispatchEvent(new CustomEvent("item-select",{detail:{id:t,label:e},bubbles:!0,composed:!0})))}_colorVar(t){return t?{success:"var(--color-success)",error:"var(--color-error)",warning:"var(--color-warning)",primary:"var(--color-primary)",muted:"var(--text-muted)"}[t]??t:""}_hasActions(t){var s;const e=(s=this.shadowRoot)==null?void 0:s.querySelector(`slot[name="actions-${t}"]`);return!!e&&e.assignedNodes().length>0}render(){return this.items.length===0?l.html`<div class="empty">No items</div>`:l.html`${this.items.map(t=>{const e=this._colorVar(t.color),s=this.selected===t.id;return l.html`
        <div
          class="item ${s?"active":""}"
          @click=${()=>this._handleClick(t.id,t.label)}
        >
          <div style=${e&&!s?`color: ${e}`:""}>${t.label}</div>
          ${t.sublabel?l.html`<div class="sublabel">${t.sublabel}</div>`:""}
        </div>
        ${s?l.html`
          <div class="action-panel" style=${this._hasActions(t.id)?"":"display:none"}>
            <slot name="actions-${t.id}" @slotchange=${()=>this.requestUpdate()}></slot>
          </div>
        `:l.nothing}
      `})}`}},r.ActionList.styles=[m,l.css`
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
    `],ht([c({type:Array})],r.ActionList.prototype,"items",2),ht([c({type:String,reflect:!0})],r.ActionList.prototype,"selected",2),r.ActionList=ht([f("tui-action-list")],r.ActionList);var Ie=Object.defineProperty,Le=Object.getOwnPropertyDescriptor,it=(n,t,e,s)=>{for(var o=s>1?void 0:s?Le(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&Ie(t,e,o),o};r.Stat=class extends l.LitElement{constructor(){super(...arguments),this.label="",this.value="",this.color=""}render(){return l.html`
      <div class="label">${this.label}</div>
      <div class="value">${this.value}</div>
    `}},r.Stat.styles=[m,l.css`
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
    `],it([c({type:String})],r.Stat.prototype,"label",2),it([c({type:String})],r.Stat.prototype,"value",2),it([c({type:String,reflect:!0})],r.Stat.prototype,"color",2),r.Stat=it([f("tui-stat")],r.Stat);var Re=Object.defineProperty,Ae=Object.getOwnPropertyDescriptor,G=(n,t,e,s)=>{for(var o=s>1?void 0:s?Ae(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&Re(t,e,o),o};r.StatusStrip=class extends l.LitElement{constructor(){super(...arguments),this.label=""}render(){return l.html`
      ${this.label?l.html`<span class="label">${this.label}:</span>`:""}
      <slot></slot>
    `}},r.StatusStrip.styles=[m,l.css`
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
    `],G([c({type:String})],r.StatusStrip.prototype,"label",2),r.StatusStrip=G([f("tui-status-strip")],r.StatusStrip),r.StripItem=class extends l.LitElement{constructor(){super(...arguments),this.color="",this.indicator=""}render(){return l.html`
      <span class="separator">│</span>
      <slot></slot>${this.indicator?l.html` ${this.indicator}`:""}
    `}},r.StripItem.styles=[m,l.css`
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
    `],G([c({type:String,reflect:!0})],r.StripItem.prototype,"color",2),G([c({type:String})],r.StripItem.prototype,"indicator",2),r.StripItem=G([f("tui-strip-item")],r.StripItem);var He=Object.defineProperty,je=Object.getOwnPropertyDescriptor,dt=(n,t,e,s)=>{for(var o=s>1?void 0:s?je(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&He(t,e,o),o};r.Titlebar=class extends l.LitElement{constructor(){super(...arguments),this.app="",this.section=""}render(){return l.html`
      ${this.app?l.html`
        <span class="app-name">${this.app}</span>
        <span class="divider">|</span>
      `:""}
      <slot></slot>
      ${this.section?l.html`<span class="section">${this.section}</span>`:""}
    `}},r.Titlebar.styles=[m,l.css`
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
    `],dt([c({type:String})],r.Titlebar.prototype,"app",2),dt([c({type:String})],r.Titlebar.prototype,"section",2),r.Titlebar=dt([f("tui-titlebar")],r.Titlebar);var Be=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,q=(n,t,e,s)=>{for(var o=s>1?void 0:s?Xe(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&Be(t,e,o),o};const Ye={monitor:"status status | main aside-1 | main aside-2",viewer:"primary secondary | detail detail",console:"main | footer","console-split":"main aside | footer footer",triad:"left center right"};function Ot(n){const e=n.split("|").map(p=>p.trim()).filter(Boolean).map(p=>p.split(/\s+/)),s=e.map(p=>`"${p.join(" ")}"`).join(" "),o=Math.max(...e.map(p=>p.length)),i=Array(o).fill("1fr").join(" "),a=new Set,h=[];for(const p of e)for(const u of p)a.has(u)||(a.add(u),h.push(u));const d=e.map((p,u)=>{const v=new Set(p).size===1;return v&&u===0?"auto":v&&u===e.length-1?"120px":"1fr"}).join(" ");return{areas:s,rows:d,cols:i,slotNames:h}}r.Tiled=class extends l.LitElement{constructor(){super(...arguments),this.preset="",this.areas="",this.gap="1px",this.labels=""}_getGrid(){const t=this.preset?Ye[this.preset]:this.areas;return t?Ot(t):null}_getDisplayLabels(t){if(!this.preset||!this.areas)return{};const e=this.areas.split("|").flatMap(o=>o.trim().split(/\s+/)).filter(Boolean),s={};return t.forEach((o,i)=>{e[i]&&(s[o]=e[i])}),s}render(){const t=this._getGrid();if(!t)return l.nothing;const e=`
      grid-template-areas: ${t.areas};
      grid-template-rows: ${t.rows};
      grid-template-columns: ${t.cols};
      gap: ${this.gap};
    `,s=this._getDisplayLabels(t.slotNames);return l.html`
      <div class="grid" style=${e}>
        ${t.slotNames.map(o=>{const i=s[o]??o;return l.html`
            <div class="zone ${this.labels==="titlebar"?"has-titlebar":""}" style="grid-area: ${o};">
              ${this.labels==="titlebar"?l.html`<div class="zone-titlebar">${i}</div>`:l.nothing}
              ${this.labels==="caption"?l.html`<span class="zone-label">${i}</span>`:l.nothing}
              <slot name=${o}></slot>
            </div>
          `})}
      </div>
    `}},r.Tiled.styles=[m,l.css`
      :host {
        display: flex;
        flex-direction: column;
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
    `],q([c({type:String,reflect:!0})],r.Tiled.prototype,"preset",2),q([c({type:String})],r.Tiled.prototype,"areas",2),q([c({type:String})],r.Tiled.prototype,"gap",2),q([c({type:String})],r.Tiled.prototype,"labels",2),r.Tiled=q([f("tui-tiled")],r.Tiled);var We=Object.defineProperty,Ne=Object.getOwnPropertyDescriptor,L=(n,t,e,s)=>{for(var o=s>1?void 0:s?Ne(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&We(t,e,o),o};r.Input=class extends l.LitElement{constructor(){super(...arguments),this.value="",this.placeholder="",this.disabled=!1,this.name="",this.label=""}handleEvent(t){if(t.type==="clear"){this.value="";return}const e=t.data;e.value!=null&&(this.value=String(e.value)),e.placeholder!=null&&(this.placeholder=String(e.placeholder)),e.disabled!=null&&(this.disabled=!!e.disabled),e.label!=null&&(this.label=String(e.label))}_onInput(t){const e=t.target;this.value=e.value,this.dispatchEvent(new CustomEvent("tui-input",{bubbles:!0,composed:!0,detail:{value:this.value}}))}_onChange(t){const e=t.target;this.value=e.value,this.dispatchEvent(new CustomEvent("tui-change",{bubbles:!0,composed:!0,detail:{value:this.value}}))}render(){return l.html`
      ${this.label?l.html`<label>${this.label}</label>`:""}
      <input
        .value=${this.value}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        @input=${this._onInput}
        @change=${this._onChange}
      />
    `}},r.Input.styles=[m,l.css`
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
    `],L([c({reflect:!0})],r.Input.prototype,"value",2),L([c()],r.Input.prototype,"placeholder",2),L([c({type:Boolean,reflect:!0})],r.Input.prototype,"disabled",2),L([c()],r.Input.prototype,"name",2),L([c()],r.Input.prototype,"label",2),r.Input=L([f("tui-input")],r.Input);var Ue=Object.defineProperty,Ge=Object.getOwnPropertyDescriptor,R=(n,t,e,s)=>{for(var o=s>1?void 0:s?Ge(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&Ue(t,e,o),o};r.Checkbox=class extends l.LitElement{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.name="",this.value="",this.label=""}handleEvent(t){if(t.type==="clear"){this.checked=!1;return}const e=t.data;e.checked!=null&&(this.checked=!!e.checked),e.disabled!=null&&(this.disabled=!!e.disabled),e.label!=null&&(this.label=String(e.label))}_toggle(){this.disabled||(this.checked=!this.checked,this.dispatchEvent(new CustomEvent("tui-change",{bubbles:!0,composed:!0,detail:{checked:this.checked,value:this.value,name:this.name}})))}_onKeydown(t){(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this._toggle())}render(){return l.html`
      <div class="checkbox"
           role="checkbox"
           aria-checked="${this.checked}"
           tabindex="${this.disabled?-1:0}"
           @click=${this._toggle}
           @keydown=${this._onKeydown}>
        <span class="glyph">${this.checked?"▣":"□"}</span>
        <span class="label"><slot>${this.label}</slot></span>
      </div>
    `}},r.Checkbox.styles=[m,l.css`
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
    `],R([c({type:Boolean,reflect:!0})],r.Checkbox.prototype,"checked",2),R([c({type:Boolean,reflect:!0})],r.Checkbox.prototype,"disabled",2),R([c()],r.Checkbox.prototype,"name",2),R([c()],r.Checkbox.prototype,"value",2),R([c()],r.Checkbox.prototype,"label",2),r.Checkbox=R([f("tui-checkbox")],r.Checkbox);var qe=Object.defineProperty,Ve=Object.getOwnPropertyDescriptor,A=(n,t,e,s)=>{for(var o=s>1?void 0:s?Ve(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&qe(t,e,o),o};r.Radio=class extends l.LitElement{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.name="",this.value="",this.label=""}handleEvent(t){if(t.type==="clear"){this.checked=!1;return}const e=t.data;e.checked!=null&&(this.checked=!!e.checked),e.disabled!=null&&(this.disabled=!!e.disabled),e.label!=null&&(this.label=String(e.label))}_select(){this.disabled||this.checked||(this.checked=!0,this.dispatchEvent(new CustomEvent("tui-change",{bubbles:!0,composed:!0,detail:{checked:!0,value:this.value,name:this.name}})))}_onKeydown(t){(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this._select())}render(){return l.html`
      <div class="radio"
           role="radio"
           aria-checked="${this.checked}"
           tabindex="${this.disabled?-1:0}"
           @click=${this._select}
           @keydown=${this._onKeydown}>
        <span class="glyph">${this.checked?"◉":"◯"}</span>
        <span class="label"><slot>${this.label}</slot></span>
      </div>
    `}},r.Radio.styles=[m,l.css`
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
    `],A([c({type:Boolean,reflect:!0})],r.Radio.prototype,"checked",2),A([c({type:Boolean,reflect:!0})],r.Radio.prototype,"disabled",2),A([c()],r.Radio.prototype,"name",2),A([c()],r.Radio.prototype,"value",2),A([c()],r.Radio.prototype,"label",2),r.Radio=A([f("tui-radio")],r.Radio);var Fe=Object.defineProperty,Ke=Object.getOwnPropertyDescriptor,V=(n,t,e,s)=>{for(var o=s>1?void 0:s?Ke(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&Fe(t,e,o),o};r.CheckboxGroup=class extends l.LitElement{constructor(){super(...arguments),this.name="",this.label="",this.disabled=!1,this.value=[]}_getChildren(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector("slot");return t?t.assignedElements().filter(s=>s.tagName==="TUI-CHECKBOX"):[]}_syncChildren(){const t=this._getChildren();for(const e of t)this.name&&(e.name=this.name),this.disabled&&(e.disabled=!0);this._syncValueFromChildren()}_syncValueFromChildren(){const t=this._getChildren();this.value=t.filter(e=>e.checked).map(e=>e.value)}_syncChildrenFromValue(){const t=this._getChildren();for(const e of t)e.checked=this.value.includes(e.value)}_onSlotChange(){this._syncChildren()}_onChange(t){t.stopPropagation(),this._syncValueFromChildren(),this.dispatchEvent(new CustomEvent("tui-change",{bubbles:!0,composed:!0,detail:{value:this.value,name:this.name}}))}handleEvent(t){if(t.type==="clear"){this.value=[],this._syncChildrenFromValue();return}const e=t.data;e.value!=null&&(this.value=e.value,this._syncChildrenFromValue()),e.disabled!=null&&(this.disabled=!!e.disabled,this._syncChildren())}render(){return l.html`
      ${this.label?l.html`<div class="group-label">${this.label}</div>`:""}
      <div class="group" @tui-change=${this._onChange}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `}},r.CheckboxGroup.styles=[m,l.css`
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
    `],V([c()],r.CheckboxGroup.prototype,"name",2),V([c()],r.CheckboxGroup.prototype,"label",2),V([c({type:Boolean,reflect:!0})],r.CheckboxGroup.prototype,"disabled",2),V([c({type:Array})],r.CheckboxGroup.prototype,"value",2),r.CheckboxGroup=V([f("tui-checkbox-group")],r.CheckboxGroup);var Ze=Object.defineProperty,Je=Object.getOwnPropertyDescriptor,F=(n,t,e,s)=>{for(var o=s>1?void 0:s?Je(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&Ze(t,e,o),o};r.RadioGroup=class extends l.LitElement{constructor(){super(...arguments),this.name="",this.label="",this.disabled=!1,this.value=""}_getChildren(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector("slot");return t?t.assignedElements().filter(s=>s.tagName==="TUI-RADIO"):[]}_syncChildren(){const t=this._getChildren();for(const e of t)this.name&&(e.name=this.name),this.disabled&&(e.disabled=!0),e.checked=e.value===this.value}_onSlotChange(){this._syncChildren()}_onChange(t){t.stopPropagation();const e=t.detail;this.value=e.value;for(const s of this._getChildren())s.checked=s.value===this.value;this.dispatchEvent(new CustomEvent("tui-change",{bubbles:!0,composed:!0,detail:{value:this.value,name:this.name}}))}_onKeydown(t){const e=this._getChildren();if(e.length===0)return;const s=e.findIndex(i=>i.value===this.value);let o;if(t.key==="ArrowDown"||t.key==="ArrowRight")t.preventDefault(),o=(s+1)%e.length;else if(t.key==="ArrowUp"||t.key==="ArrowLeft")t.preventDefault(),o=(s-1+e.length)%e.length;else return;this.value=e[o].value;for(const i of e)i.checked=i.value===this.value;e[o].focus(),this.dispatchEvent(new CustomEvent("tui-change",{bubbles:!0,composed:!0,detail:{value:this.value,name:this.name}}))}handleEvent(t){if(t.type==="clear"){this.value="";for(const s of this._getChildren())s.checked=!1;return}const e=t.data;e.value!=null&&(this.value=String(e.value),this._syncChildren()),e.disabled!=null&&(this.disabled=!!e.disabled,this._syncChildren())}render(){return l.html`
      ${this.label?l.html`<div class="group-label">${this.label}</div>`:""}
      <div class="group" role="radiogroup" @tui-change=${this._onChange} @keydown=${this._onKeydown}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `}},r.RadioGroup.styles=[m,l.css`
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
    `],F([c()],r.RadioGroup.prototype,"name",2),F([c()],r.RadioGroup.prototype,"label",2),F([c({type:Boolean,reflect:!0})],r.RadioGroup.prototype,"disabled",2),F([c()],r.RadioGroup.prototype,"value",2),r.RadioGroup=F([f("tui-radio-group")],r.RadioGroup);class Qe{constructor(t="ws://localhost:3001"){this.url=t,this.ws=null,this.handlers=new Map,this.reconnectDelay=1e3,this.maxReconnectDelay=3e4,this.shouldReconnect=!0}connect(){try{this.ws=new WebSocket(this.url),this.ws.onopen=()=>{console.log("[RetroPush] Connected to",this.url),this.reconnectDelay=1e3,this.emit("_connected",{})},this.ws.onmessage=t=>{try{const e=JSON.parse(t.data),{channel:s,type:o,data:i}=e;this.emit(s,{type:o,data:i}),this.emit("*",{channel:s,type:o,data:i})}catch(e){console.error("[RetroPush] Invalid message:",e)}},this.ws.onclose=()=>{console.log("[RetroPush] Disconnected"),this.emit("_disconnected",{}),this.shouldReconnect&&(setTimeout(()=>this.connect(),this.reconnectDelay),this.reconnectDelay=Math.min(this.reconnectDelay*2,this.maxReconnectDelay))},this.ws.onerror=t=>{console.error("[RetroPush] Error:",t)}}catch(t){console.error("[RetroPush] Connection failed:",t),this.shouldReconnect&&setTimeout(()=>this.connect(),this.reconnectDelay)}}disconnect(){this.shouldReconnect=!1,this.ws&&(this.ws.close(),this.ws=null)}on(t,e){return this.handlers.has(t)||this.handlers.set(t,new Set),this.handlers.get(t).add(e),()=>{var s;(s=this.handlers.get(t))==null||s.delete(e)}}emit(t,e){const s=this.handlers.get(t);if(s)for(const o of s)try{o(e)}catch(i){console.error("[RetroPush] Handler error:",i)}}}function to({grid:n,projection:t,cellRenderer:e,regions:s,sortOrder:o}){const i=n.length,a=i>0?n[0].length:0;t.getDimensions&&t.getDimensions(a,i);const h=o?o(a,i):oo(a,i);let d="";for(const{x:p,y:u}of h){const v=n[u][p];if(v)if(s)for(const y of s){const k=e(p,u,v,y);if(!k)continue;const H=t.getCellPath(p,u,y);d+=Tt(H,k)}else{const y=e(p,u,v);if(!y)continue;const k=t.getCellPath(p,u);d+=Tt(k,y)}}return d}function eo(n,t){const e=[];for(let s=0;s<n+t-1;s++)for(let o=0;o<=s;o++){const i=s-o;i>=0&&i<n&&o>=0&&o<t&&e.push({x:i,y:o})}return e}function oo(n,t){const e=[];for(let s=0;s<t;s++)for(let o=0;o<n;o++)e.push({x:o,y:s});return e}function Tt(n,{fill:t,stroke:e="none",strokeWidth:s=0,opacity:o=1}){let i=`d="${n}" fill="${t}"`;return e!=="none"&&(i+=` stroke="${e}" stroke-width="${s}"`),o<1&&(i+=` opacity="${o}"`),`<path ${i}/>`}function so(n){return typeof n.channel=="string"&&n.channel.length>0&&typeof n.type=="string"&&n.type.length>0&&typeof n.id=="string"&&n.id.length>0&&n.data!=null&&typeof n.data=="object"}class ro{constructor(t){this.channel=t.channel,this.url=t.url??"http://localhost:3001/push"}async log(t,e,s){const o={message:e};s&&(o.level=s),await this.emit("log",t,o)}async progress(t,e,s){const o={value:e,...s};await this.emit("progress",t,o)}async table(t,e){await this.emit("table",t,e)}async status(t,e,s){await this.emit("status",t,{state:e,message:s})}async clear(t){await this.emit("clear",t,{})}async dismiss(t){await this.emit("dismiss",t,{})}async emit(t,e,s){const o={channel:this.channel,type:t,id:e,data:s};await fetch(this.url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})}}class io{constructor(t={}){this.components=new Map,this.onCreate=t.onCreate}register(t,e){this.components.set(t,e)}unregister(t){this.components.delete(t)}has(t){return this.components.has(t)}route(t){let e=this.components.get(t.id);if(!e&&this.onCreate){const s=this.onCreate(t);s&&(this.register(t.id,s),e=s)}e&&(e.handleEvent(t),t.type==="dismiss"&&this.unregister(t.id))}}var ao=Object.defineProperty,no=Object.getOwnPropertyDescriptor,K=(n,t,e,s)=>{for(var o=s>1?void 0:s?no(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&ao(t,e,o),o};r.Progress=class extends l.LitElement{constructor(){super(...arguments),this.value=0,this.label="",this.total=0,this.current=0}handleEvent(t){if(t.type==="clear"){this.value=0,this.label="",this.total=0,this.current=0;return}const e=t.data;e.value!=null&&(this.value=e.value),e.label!=null&&(this.label=e.label),e.total!=null&&(this.total=e.total),e.current!=null&&(this.current=e.current)}get _clampedValue(){return Math.max(0,Math.min(1,this.value))}render(){const t=Math.round(this._clampedValue*100);return l.html`
      <div class="progress">
        <div class="header">
          ${this.label?l.html`<span class="label">${this.label}</span>`:""}
          <span class="stats">
            ${this.total>0?l.html`<span class="count">${this.current}/${this.total}</span>`:""}
            <span class="percentage">${t}%</span>
          </span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${t}%"></div>
        </div>
      </div>
    `}},r.Progress.styles=[m,l.css`
      :host { display: block; }
      .progress { padding: var(--spacing-sm); font-size: 0.8rem; }
      .header { display: flex; justify-content: space-between; margin-bottom: var(--spacing-xs); color: var(--text-primary); }
      .label { color: var(--text-primary); }
      .stats { display: flex; gap: var(--spacing-sm); color: var(--text-muted); }
      .bar-track { height: 12px; background: var(--surface-base); border: var(--border-width) solid var(--border-default); overflow: hidden; }
      .bar-fill { height: 100%; background: var(--color-primary); transition: width 0.2s ease; }
    `],K([c({type:Number})],r.Progress.prototype,"value",2),K([c({type:String})],r.Progress.prototype,"label",2),K([c({type:Number})],r.Progress.prototype,"total",2),K([c({type:Number})],r.Progress.prototype,"current",2),r.Progress=K([f("tui-progress")],r.Progress);var lo=Object.defineProperty,co=Object.getOwnPropertyDescriptor,pt=(n,t,e,s)=>{for(var o=s>1?void 0:s?co(t,e):t,i=n.length-1,a;i>=0;i--)(a=n[i])&&(o=(s?a(t,e,o):a(o))||o);return s&&o&&lo(t,e,o),o};const ho={success:"✓",error:"✗",warn:"⚠",info:"ℹ",pending:"…"};r.Status=class extends l.LitElement{constructor(){super(...arguments),this.state="",this.message=""}handleEvent(t){if(t.type==="clear"){this.state="",this.message="";return}const e=t.data;e.state!=null&&(this.state=e.state),e.message!=null&&(this.message=e.message)}render(){return this.state?l.html`
      <div class="badge ${this.state}">
        <span class="indicator">${ho[this.state]??""}</span>
        <span class="message">${this.message}</span>
      </div>
    `:l.html`<div class="empty">No status</div>`}},r.Status.styles=[m,l.css`
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
    `],pt([c({type:String})],r.Status.prototype,"state",2),pt([c({type:String})],r.Status.prototype,"message",2),r.Status=pt([f("tui-status")],r.Status),r.BORDER_CHARS=X,r.EventRouter=io,r.IsometricProjection=Pt,r.RectangularProjection=zt,r.RetroEmitter=ro,r.RetroPush=Qe,r.STATE_BORDERS=Zt,r.ToolState=he,r.TriangularProjection=kt,r.ansiToHtml=tt,r.getBorderChars=_t,r.getProjection=P,r.isometricOrder=eo,r.parseAreas=Ot,r.renderGrid=to,r.titleDecoration=Y,r.toolContext=Et,r.tuiToast=Se,r.validateEvent=so,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})});
