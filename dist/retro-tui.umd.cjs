(function(s,l){typeof exports=="object"&&typeof module<"u"?l(exports,require("lit")):typeof define=="function"&&define.amd?define(["exports","lit"],l):(s=typeof globalThis<"u"?globalThis:s||self,l(s.RetroTUI={},s.lit))})(this,function(s,l){"use strict";const we='.theme-terminal-classic,:root{--color-primary: #00ffff;--color-primary-bg: #002b36;--color-primary-fg: #00ffff;--color-secondary: #00ff00;--color-secondary-bg: #003300;--color-secondary-fg: #00ff00;--color-error: #ff5555;--color-error-bg: #330000;--color-error-fg: #ff5555;--color-warning: #e8691e;--color-warning-bg: #331500;--color-warning-fg: #e8691e;--color-success: #50fa7b;--color-success-bg: #003300;--color-success-fg: #50fa7b;--color-info: #8be9fd;--color-info-bg: #002233;--color-info-fg: #8be9fd;--surface-base: #0a0a0a;--surface-elevated: #1a1a1a;--surface-overlay: #2a2a2a;--text-primary: #e0e0e0;--text-muted: #666666;--border-default: #333333;--border-width: 1px;--border-radius: 0px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}.theme-vibrant-scifi{--color-primary: #ff00ff;--color-primary-bg: #ff00ff;--color-primary-fg: #000000;--color-secondary: #00ffcc;--color-secondary-bg: #00ffcc;--color-secondary-fg: #000000;--color-error: #ff3366;--color-error-bg: #ff3366;--color-error-fg: #ffffff;--color-warning: #ff6622;--color-warning-bg: #ff6622;--color-warning-fg: #000000;--color-success: #00ff66;--color-success-bg: #00ff66;--color-success-fg: #000000;--color-info: #6666ff;--color-info-bg: #6666ff;--color-info-fg: #ffffff;--surface-base: #0d0d1a;--surface-elevated: #1a1a2e;--surface-overlay: #2a2a4a;--text-primary: #ffffff;--text-muted: #8888aa;--border-default: #4a4a6a;--border-width: 2px;--border-radius: 2px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}html,body{background:var(--surface-base);color:var(--text-primary);font-family:var(--font-mono);color-scheme:dark}.theme-home-security-interface{--color-primary: #3fb950;--color-primary-bg: #002b36;--color-primary-fg: #3fb950;--color-secondary: #00ff00;--color-secondary-bg: #003300;--color-secondary-fg: #00ff00;--color-error: #ff5555;--color-error-bg: #330000;--color-error-fg: #ff5555;--color-warning: #e8691e;--color-warning-bg: #331500;--color-warning-fg: #e8691e;--color-success: #3fb950;--color-success-bg: #003300;--color-success-fg: #3fb950;--color-info: #8be9fd;--color-info-bg: #002233;--color-info-fg: #8be9fd;--surface-base: #111;--surface-elevated: #1a1a1a;--surface-overlay: #2a2a2a;--text-primary: #e0e0e0;--text-muted: #666666;--border-default: #3fb950;--border-width: 3px;--border-radius: 0px;--spacing-xs: .25rem;--spacing-sm: .5rem;--spacing-md: 1rem;--spacing-lg: 1.5rem;--font-mono: "IBM Plex Mono", "Fira Code", "Consolas", monospace;--font-size-xs: .6rem;--font-size-sm: .75rem;--font-size-md: .85rem;--font-size-lg: 1rem;--font-size-xl: 1.25rem;--font-size-label: var(--font-size-sm);--font-size-body: var(--font-size-md);--font-size-caption: var(--font-size-xs)}',ce="__retro_tui_tokens__";if(typeof document<"u"&&!document[ce]){const n=document.createElement("style");n.textContent=we,(document.head||document.documentElement).appendChild(n);const e=document.documentElement;e.style.setProperty("color","var(--text-primary)"),e.style.setProperty("background","var(--surface-base)"),e.style.setProperty("font-family","var(--font-mono)"),e.style.setProperty("color-scheme","dark"),document[ce]=!0}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const m=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const q=globalThis,te=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,de=Symbol(),he=new WeakMap;let $e=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==de)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(te&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=he.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&he.set(t,e))}return e}toString(){return this.cssText}};const xe=n=>new $e(typeof n=="string"?n:n+"",void 0,de),Se=(n,e)=>{if(te)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const o=document.createElement("style"),r=q.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=t.cssText,n.appendChild(o)}},pe=te?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return xe(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ce,defineProperty:Ee,getOwnPropertyDescriptor:ze,getOwnPropertyNames:ke,getOwnPropertySymbols:Pe,getPrototypeOf:Oe}=Object,w=globalThis,ue=w.trustedTypes,Te=ue?ue.emptyScript:"",re=w.reactiveElementPolyfillSupport,M=(n,e)=>n,F={toAttribute(n,e){switch(e){case Boolean:n=n?Te:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},oe=(n,e)=>!Ce(n,e),me={attribute:!0,type:String,converter:F,reflect:!1,useDefault:!1,hasChanged:oe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),w.litPropertyMetadata??(w.litPropertyMetadata=new WeakMap);class A extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=me){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(e,o,t);r!==void 0&&Ee(this.prototype,e,r)}}static getPropertyDescriptor(e,t,o){const{get:r,set:i}=ze(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:r,set(a){const d=r==null?void 0:r.call(this);i==null||i.call(this,a),this.requestUpdate(e,d,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??me}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;const e=Oe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){const t=this.properties,o=[...ke(t),...Pe(t)];for(const r of o)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,r]of t)this.elementProperties.set(o,r)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const r=this._$Eu(t,o);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const r of o)t.unshift(pe(r))}else e!==void 0&&t.push(pe(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Se(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostConnected)==null?void 0:o.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostDisconnected)==null?void 0:o.call(t)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){var i;const o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(r!==void 0&&o.reflect===!0){const a=(((i=o.converter)==null?void 0:i.toAttribute)!==void 0?o.converter:F).toAttribute(t,o.type);this._$Em=e,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,t){var i,a;const o=this.constructor,r=o._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const d=o.getPropertyOptions(r),h=typeof d.converter=="function"?{fromAttribute:d.converter}:((i=d.converter)==null?void 0:i.fromAttribute)!==void 0?d.converter:F;this._$Em=r;const p=h.fromAttribute(t,d.type);this[r]=p??((a=this._$Ej)==null?void 0:a.get(r))??p,this._$Em=null}}requestUpdate(e,t,o,r=!1,i){var a;if(e!==void 0){const d=this.constructor;if(r===!1&&(i=this[e]),o??(o=d.getPropertyOptions(e)),!((o.hasChanged??oe)(i,t)||o.useDefault&&o.reflect&&i===((a=this._$Ej)==null?void 0:a.get(e))&&!this.hasAttribute(d._$Eu(e,o))))return;this.C(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:r,wrapped:i},a){o&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),i!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[i,a]of r){const{wrapped:d}=a,h=this[i];d!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,a,h)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(o=this._$EO)==null||o.forEach(r=>{var i;return(i=r.hostUpdate)==null?void 0:i.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(o=>{var r;return(r=o.hostUpdated)==null?void 0:r.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[M("elementProperties")]=new Map,A[M("finalized")]=new Map,re==null||re({ReactiveElement:A}),(w.reactiveElementVersions??(w.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const De={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:oe},Ie=(n=De,e,t)=>{const{kind:o,metadata:r}=t;let i=globalThis.litPropertyMetadata.get(r);if(i===void 0&&globalThis.litPropertyMetadata.set(r,i=new Map),o==="setter"&&((n=Object.create(n)).wrapped=!0),i.set(t.name,n),o==="accessor"){const{name:a}=t;return{set(d){const h=e.get.call(this);e.set.call(this,d),this.requestUpdate(a,h,n,!0,d)},init(d){return d!==void 0&&this.C(a,void 0,n,d),d}}}if(o==="setter"){const{name:a}=t;return function(d){const h=this[a];e.call(this,d),this.requestUpdate(a,h,n,!0,d)}}throw Error("Unsupported decorator location: "+o)};function c(n){return(e,t)=>typeof t=="object"?Ie(n,e,t):((o,r,i)=>{const a=r.hasOwnProperty(i);return r.constructor.createProperty(i,o),a?Object.getOwnPropertyDescriptor(r,i):void 0})(n,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(n){return c({...n,state:!0,attribute:!1})}const f=l.css`
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
`;var Me=Object.defineProperty,Ae=Object.getOwnPropertyDescriptor,E=(n,e,t,o)=>{for(var r=o>1?void 0:o?Ae(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&Me(e,t,r),r};s.App=class extends l.LitElement{constructor(){super(...arguments),this.title="TUI",this.subtitle="",this.compact=!1,this.decorations="full",this._focusContext="workspace",this._menuOpen=!1}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",()=>this.classList.add("using-mouse")),this.addEventListener("keydown",e=>{e.key==="Tab"&&this.classList.remove("using-mouse"),this._handleGlobalKeydown(e)})}_handleGlobalKeydown(e){if(e.key==="Escape"){this._menuOpen&&(this._menuOpen=!1,e.preventDefault());return}e.key==="Tab"&&!e.ctrlKey&&e.altKey}render(){const e=this.subtitle?l.html`░░ ${this.title} <span>[ ${this.subtitle} ]</span> ░░`:l.html`░░ ${this.title} ░░`;return l.html`
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
    `}},s.App.styles=[f,l.css`
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
    `],E([c({type:String,reflect:!0})],s.App.prototype,"title",2),E([c({type:String,reflect:!0})],s.App.prototype,"subtitle",2),E([c({type:Boolean,reflect:!0})],s.App.prototype,"compact",2),E([c({type:String,reflect:!0})],s.App.prototype,"decorations",2),E([v()],s.App.prototype,"_focusContext",2),E([v()],s.App.prototype,"_menuOpen",2),s.App=E([m("tui-app")],s.App);var Re=Object.defineProperty,Le=Object.getOwnPropertyDescriptor,se=(n,e,t,o)=>{for(var r=o>1?void 0:o?Le(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&Re(e,t,r),r};s.Workspace=class extends l.LitElement{constructor(){super(...arguments),this._bounds=new DOMRect,this._snapPreview=null,this._resizeObserver=null,this._handlePanelMove=e=>{const t=e.target;if(!t.hasAttribute("floating"))return;const{x:o,y:r}=e.detail,i=t.panelWidth??t.offsetWidth??100,a=t.panelHeight??t.offsetHeight??100,d=this._detectSnapEdge(o,r,i,a);if(this._snapPreview=d,this._bounds.width>0&&this._bounds.height>0){const h=this._bounds.width-i,p=this._bounds.height-a;if(h>0&&p>0){const u=Math.max(0,Math.min(o,h)),_=Math.max(0,Math.min(r,p));(u!==o||_!==r)&&(t.positionX=u,t.positionY=_)}}},this._handlePanelDragEnd=e=>{const t=e.target;if(t){if(this._snapPreview){const o=this._snapPreview,r=t.panelWidth??t.offsetWidth??100;switch(t.panelHeight??t.offsetHeight,o){case"left":t.positionX=0;break;case"right":t.positionX=this._bounds.width-r;break;case"top":t.positionY=0;break}t.snapEdge=o}else t.snapEdge="";this._snapPreview=null,this._emitLayoutChange()}},this._handlePanelResize=e=>{const t=e.target;if(!t.hasAttribute("resizable"))return;const{width:o,height:r}=e.detail,i=t.positionX??0,a=t.positionY??0,d=this._bounds.width-i,h=this._bounds.height-a,p=Math.min(o,d),u=Math.min(r,h);p!==o&&(t.panelWidth=p),u!==r&&(t.panelHeight=u),this._emitLayoutChange()},this._handlePanelDismiss=e=>{this._emitLayoutChange()},this._handlePanelMinimize=e=>{requestAnimationFrame(()=>{this._reflowMinimizedTabs()})},this._handlePanelRestore=e=>{requestAnimationFrame(()=>{this._reflowMinimizedTabs()})}}get bounds(){return this._bounds}getPanelStates(){const e=[],t=this._getFloatingPanels();for(const o of t)e.push({id:o.id||o.title,title:o.title||o.id,snapEdge:o.snapEdge||void 0,x:o.positionX??0,y:o.positionY??0,width:o.panelWidth??o.offsetWidth,height:o.panelHeight??o.offsetHeight,collapsed:o.collapsed??!1,visible:!o.hidden});return e}connectedCallback(){super.connectedCallback(),typeof ResizeObserver<"u"?(this._resizeObserver=new ResizeObserver(e=>{for(const t of e)this._bounds=t.contentRect,this.dispatchEvent(new CustomEvent("bounds-change",{detail:{bounds:this._bounds},bubbles:!0,composed:!0}))}),this._resizeObserver.observe(this)):this._bounds=new DOMRect(0,0,this.offsetWidth||800,this.offsetHeight||600),this.addEventListener("panel-move",this._handlePanelMove),this.addEventListener("panel-resize",this._handlePanelResize),this.addEventListener("panel-dismiss",this._handlePanelDismiss),this.addEventListener("panel-drag-end",this._handlePanelDragEnd),this.addEventListener("panel-minimize",this._handlePanelMinimize),this.addEventListener("panel-restore",this._handlePanelRestore)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._resizeObserver)==null||e.disconnect(),this.removeEventListener("panel-move",this._handlePanelMove),this.removeEventListener("panel-resize",this._handlePanelResize),this.removeEventListener("panel-dismiss",this._handlePanelDismiss),this.removeEventListener("panel-drag-end",this._handlePanelDragEnd),this.removeEventListener("panel-minimize",this._handlePanelMinimize),this.removeEventListener("panel-restore",this._handlePanelRestore)}_detectSnapEdge(e,t,o,r){const i=this._bounds;return e<=s.Workspace.SNAP_ZONE?"left":e+o>=i.width-s.Workspace.SNAP_ZONE?"right":t<=s.Workspace.SNAP_ZONE?"top":null}_reflowMinimizedTabs(){const e=this._getFloatingPanels(),t=4,o=[],r=[];for(const a of e){if(!a.minimized)continue;(a.snapEdge||"left")==="right"?r.push(a):o.push(a)}let i=t;for(const a of o){a.positionY=i;const d=a.offsetHeight||80;i+=d+t}i=t;for(const a of r){a.positionY=i;const d=a.offsetHeight||80;i+=d+t}}_emitLayoutChange(){const t=this._getFloatingPanels().map(o=>({id:o.id||o.title,x:o.positionX,y:o.positionY,width:o.panelWidth??o.offsetWidth,height:o.panelHeight??o.offsetHeight}));this.dispatchEvent(new CustomEvent("layout-change",{detail:{panels:t,bounds:this._bounds},bubbles:!0,composed:!0}))}_getFloatingPanels(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector('slot[name="floating"]');return e?e.assignedElements():[]}_constrainAllPanels(){if(this._bounds.width<=0||this._bounds.height<=0)return;const e=this._getFloatingPanels();for(const t of e){if(!t.hasAttribute("floating"))continue;const o=t.positionX??0,r=t.positionY??0,i=t.panelWidth??t.offsetWidth??100,a=t.panelHeight??t.offsetHeight??100,d=this._bounds.width-i,h=this._bounds.height-a;if(d<0||h<0)continue;const p=Math.max(0,Math.min(o,d)),u=Math.max(0,Math.min(r,h));p!==o&&(t.positionX=p),u!==r&&(t.positionY=u)}}_onFloatingSlotChange(){requestAnimationFrame(()=>{this._constrainAllPanels(),this._reflowMinimizedTabs()})}render(){return l.html`
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
    `}},s.Workspace.SNAP_ZONE=20,s.Workspace.styles=[f,l.css`
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
    `],se([v()],s.Workspace.prototype,"_bounds",2),se([v()],s.Workspace.prototype,"_snapPreview",2),s.Workspace=se([m("tui-workspace")],s.Workspace);var He=Object.defineProperty,je=Object.getOwnPropertyDescriptor,V=(n,e,t,o)=>{for(var r=o>1?void 0:o?je(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&He(e,t,r),r};s.Sidebar=class extends l.LitElement{constructor(){super(...arguments),this.side="left",this.size=200,this._dropIndex=null}_getPanels(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("slot");return e?e.assignedElements().filter(o=>o.tagName.toLowerCase()==="tui-panel"):[]}calculateDropIndex(e){const t=this._getPanels();for(let o=0;o<t.length;o++){const r=t[o].getBoundingClientRect(),i=r.top+r.height/2;if(e<i)return o}return t.length}showDropIndicator(e){this._dropIndex=e}hideDropIndicator(){this._dropIndex=null}insertPanelAt(e,t){const r=this._getPanels().indexOf(e);let i=t;r!==-1&&r<t&&(i=t-1),r!==-1&&e.remove();const a=this._getPanels();e.setAttribute("docked",this.side),i>=a.length?this.appendChild(e):this.insertBefore(e,a[i]),this.hideDropIndicator()}_getDropIndicatorTop(){var r,i,a,d;const e=this._getPanels();if(this._dropIndex===null||this._dropIndex===0)return 0;if(this._dropIndex>=e.length){const h=e[e.length-1];if(h){const p=(i=(r=this.shadowRoot)==null?void 0:r.querySelector(".content"))==null?void 0:i.getBoundingClientRect(),u=h.getBoundingClientRect();if(p)return u.bottom-p.top}return 0}const t=e[this._dropIndex],o=(d=(a=this.shadowRoot)==null?void 0:a.querySelector(".content"))==null?void 0:d.getBoundingClientRect();return t&&o?t.getBoundingClientRect().top-o.top-2:0}connectedCallback(){super.connectedCallback(),this.side==="left"||this.side==="right"?this.style.width=`${this.size}px`:this.style.height=`${this.size}px`}updated(e){e.has("size")&&(this.side==="left"||this.side==="right"?this.style.width=`${this.size}px`:this.style.height=`${this.size}px`)}render(){return l.html`
      <div class="content">
        <slot></slot>
        ${this._dropIndex!==null?l.html`
          <div class="drop-indicator" style="top: ${this._getDropIndicatorTop()}px"></div>
        `:""}
      </div>
    `}},s.Sidebar.styles=[f,l.css`
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
    `],V([c({type:String,reflect:!0})],s.Sidebar.prototype,"side",2),V([c({type:Number})],s.Sidebar.prototype,"size",2),V([v()],s.Sidebar.prototype,"_dropIndex",2),s.Sidebar=V([m("tui-sidebar")],s.Sidebar);const R={single:{tl:"┌",tr:"┐",bl:"└",br:"┘",h:"─",v:"│"},heavy:{tl:"┏",tr:"┓",bl:"┗",br:"┛",h:"━",v:"┃"},double:{tl:"╔",tr:"╗",bl:"╚",br:"╝",h:"═",v:"║"},rounded:{tl:"╭",tr:"╮",bl:"╰",br:"╯",h:"─",v:"│"}};function fe(n){return n==="none"?null:R[n]}function L(n){const e=fe(n);return e?{before:`${e.tl}${e.h} `,after:` ${e.h}${e.tr}`}:{before:"",after:""}}const Be={neutral:"single",hover:"heavy",selected:"double"};var Ne=Object.defineProperty,We=Object.getOwnPropertyDescriptor,b=(n,e,t,o)=>{for(var r=o>1?void 0:o?We(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&Ne(e,t,r),r};s.Panel=class extends l.LitElement{constructor(){super(...arguments),this.title="",this.color="",this.border="single",this.variant="bright",this.selectionStyle="",this.collapsible=!1,this.collapsed=!1,this.selected=!1,this.active=!1,this.persistId="",this.dismissable=!1,this.full=!1,this.floating=!1,this.snapEdge="",this.positionX=0,this.positionY=0,this.resizable=!1,this.minimized=!1,this.panelWidth=null,this.panelHeight=null,this.maxWidth=null,this.maxHeight=null,this.minWidth=150,this.minHeight=100,this.docked="",this._isDragging=!1,this._dragStartX=0,this._dragStartY=0,this._dragOffsetX=0,this._dragOffsetY=0,this._isResizing=!1,this._resizeStartX=0,this._resizeStartY=0,this._resizeStartWidth=0,this._resizeStartHeight=0,this._preMinimizeX=0,this._preMinimizeY=0,this._preMinimizeWidth=null,this._preMinimizeHeight=null,this._handleClick=()=>{this.dispatchEvent(new CustomEvent("focus-request",{bubbles:!0,composed:!0,detail:{panel:this}}))},this._onEdgeTabClick=()=>{this.restore()},this._onDragStart=e=>{if(!this.floating&&!this.docked)return;const t=e.target;t.closest(".collapse-btn")||t.closest(".dismiss-btn")||(e.preventDefault(),this._isDragging=!0,this._dragStartX=e.clientX,this._dragStartY=e.clientY,this._dragOffsetX=this.positionX,this._dragOffsetY=this.positionY,document.addEventListener("pointermove",this._onDragMove),document.addEventListener("pointerup",this._onDragEnd))},this._onDragMove=e=>{if(!this._isDragging)return;const t=e.clientX-this._dragStartX,o=e.clientY-this._dragStartY;this.positionX=this._dragOffsetX+t,this.positionY=this._dragOffsetY+o,this.dispatchEvent(new CustomEvent("panel-move",{detail:{panelId:this.id||this.title,x:this.positionX,y:this.positionY,cursorY:e.clientY},bubbles:!0,composed:!0}))},this._onDragEnd=()=>{this._isDragging=!1,document.removeEventListener("pointermove",this._onDragMove),document.removeEventListener("pointerup",this._onDragEnd),this.dispatchEvent(new CustomEvent("panel-drag-end",{detail:{panelId:this.id||this.title,x:this.positionX,y:this.positionY},bubbles:!0,composed:!0}))},this._onResizeStart=e=>{this.resizable&&(e.preventDefault(),e.stopPropagation(),this._isResizing=!0,this._resizeStartX=e.clientX,this._resizeStartY=e.clientY,this._resizeStartWidth=this.panelWidth??this.offsetWidth,this._resizeStartHeight=this.panelHeight??this.offsetHeight,document.addEventListener("pointermove",this._onResizeMove),document.addEventListener("pointerup",this._onResizeEnd))},this._onResizeMove=e=>{if(!this._isResizing)return;const t=e.clientX-this._resizeStartX,o=e.clientY-this._resizeStartY;let r=this._resizeStartWidth+t,i=this._resizeStartHeight+o;r=Math.max(this.minWidth,r),i=Math.max(this.minHeight,i),this.maxWidth!==null&&(r=Math.min(this.maxWidth,r)),this.maxHeight!==null&&(i=Math.min(this.maxHeight,i)),this.panelWidth=r,this.panelHeight=i,this.dispatchEvent(new CustomEvent("panel-resize",{detail:{panelId:this.id||this.title,width:this.panelWidth,height:this.panelHeight},bubbles:!0,composed:!0}))},this._onResizeEnd=()=>{this._isResizing=!1,document.removeEventListener("pointermove",this._onResizeMove),document.removeEventListener("pointerup",this._onResizeEnd)},this._onCollapseClick=e=>{e.stopPropagation(),this.toggle()},this._onDismissClick=e=>{e.stopPropagation(),this.dismiss()}}connectedCallback(){if(super.connectedCallback(),this.persistId){const e=localStorage.getItem(`tui-panel-${this.persistId}`);e!==null&&(this.collapsed=e==="true")}this.addEventListener("click",this._handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleClick),document.removeEventListener("pointermove",this._onDragMove),document.removeEventListener("pointerup",this._onDragEnd),document.removeEventListener("pointermove",this._onResizeMove),document.removeEventListener("pointerup",this._onResizeEnd)}toggle(){this.collapsible&&(this.collapsed=!this.collapsed,this.persistId&&localStorage.setItem(`tui-panel-${this.persistId}`,String(this.collapsed)),this.dispatchEvent(new CustomEvent("toggle",{detail:{collapsed:this.collapsed},bubbles:!0,composed:!0})))}dismiss(){if(this.floating&&this.dismissable){this.minimize();return}if(this.persistId){const o={x:this.positionX,y:this.positionY,width:this.panelWidth,height:this.panelHeight,collapsed:this.collapsed,snapEdge:this.snapEdge};localStorage.setItem(`tui-panel-memory-${this.persistId}`,JSON.stringify(o))}const e=new CustomEvent("panel-dismiss",{detail:{panelId:this.id||this.title},bubbles:!0,composed:!0,cancelable:!0});this.dispatchEvent(e)&&(this.hidden=!0)}minimize(){if(!this.minimized){if(this._preMinimizeX=this.positionX,this._preMinimizeY=this.positionY,this._preMinimizeWidth=this.panelWidth,this._preMinimizeHeight=this.panelHeight,this.snapEdge||(this.snapEdge="left"),this.minimized=!0,this.persistId){const e={minimized:!0,preMinimize:{x:this._preMinimizeX,y:this._preMinimizeY,width:this._preMinimizeWidth,height:this._preMinimizeHeight},snapEdge:this.snapEdge};localStorage.setItem(`tui-panel-memory-${this.persistId}`,JSON.stringify(e))}this.dispatchEvent(new CustomEvent("panel-minimize",{detail:{panelId:this.id||this.title},bubbles:!0,composed:!0}))}}restore(){if(this.minimized){if(this.positionX=this._preMinimizeX,this.positionY=this._preMinimizeY,this._preMinimizeWidth!==null&&(this.panelWidth=this._preMinimizeWidth),this._preMinimizeHeight!==null&&(this.panelHeight=this._preMinimizeHeight),this.minimized=!1,this.persistId){const e={minimized:!1,x:this.positionX,y:this.positionY,width:this.panelWidth,height:this.panelHeight,collapsed:this.collapsed,snapEdge:this.snapEdge};localStorage.setItem(`tui-panel-memory-${this.persistId}`,JSON.stringify(e))}this.dispatchEvent(new CustomEvent("panel-restore",{detail:{panelId:this.id||this.title},bubbles:!0,composed:!0}))}}restorePosition(){var t,o,r,i;if(!this.persistId)return!1;const e=localStorage.getItem(`tui-panel-memory-${this.persistId}`);if(!e)return!1;try{const a=JSON.parse(e);return a.minimized?(this._preMinimizeX=((t=a.preMinimize)==null?void 0:t.x)??0,this._preMinimizeY=((o=a.preMinimize)==null?void 0:o.y)??0,this._preMinimizeWidth=((r=a.preMinimize)==null?void 0:r.width)??null,this._preMinimizeHeight=((i=a.preMinimize)==null?void 0:i.height)??null,this.snapEdge=a.snapEdge||"left",this.minimized=!0,!0):(a.x!==void 0&&(this.positionX=a.x),a.y!==void 0&&(this.positionY=a.y),a.width!==void 0&&(this.panelWidth=a.width),a.height!==void 0&&(this.panelHeight=a.height),a.collapsed!==void 0&&(this.collapsed=a.collapsed),a.snapEdge!==void 0&&(this.snapEdge=a.snapEdge),!0)}catch(a){return console.warn(`[tui-panel] Failed to restore position for ${this.persistId}:`,a),!1}}firstUpdated(){this.minimized&&this.floating&&(this._preMinimizeX=this.positionX,this._preMinimizeY=this.positionY,this.snapEdge||(this.snapEdge="left")),this.floating&&!this.minimized&&(this.style.left=`${this.positionX}px`,this.style.top=`${this.positionY}px`)}willUpdate(e){this.full&&this.floating&&(this.floating=!1)}updated(e){if(this.minimized){this.snapEdge==="right"?(this.style.left="auto",this.style.right="0"):(this.style.left="0",this.style.right="auto"),this.style.top=`${this.positionY}px`,this.style.width="",this.style.height="",this.style.minWidth="",this.style.minHeight="";return}this.floating&&(e.has("positionX")||e.has("positionY")||e.has("floating")||e.has("minimized"))&&(this.style.left=`${this.positionX}px`,this.style.top=`${this.positionY}px`,this.style.right="auto"),e.has("panelWidth")&&this.panelWidth!==null&&(this.style.width=`${this.panelWidth}px`),(e.has("panelHeight")||e.has("collapsed"))&&(this.collapsed?this.style.height="":this.panelHeight!==null&&(this.style.height=`${this.panelHeight}px`)),e.has("maxWidth")&&this.maxWidth!==null&&(this.style.maxWidth=`${this.maxWidth}px`),e.has("maxHeight")&&this.maxHeight!==null&&(this.style.maxHeight=`${this.maxHeight}px`),e.has("minWidth")&&(this.style.minWidth=`${this.minWidth}px`),e.has("minHeight")&&!this.collapsed?this.style.minHeight=`${this.minHeight}px`:this.collapsed&&e.has("collapsed")&&(this.style.minHeight="")}render(){return this.minimized?l.html`
        <div class="edge-tab" @click=${this._onEdgeTabClick} title="Click to restore ${this.title}">
          ${this.title}
        </div>
      `:l.html`
      <div class="panel ${this.collapsed?"collapsed":""}">
        <div
          class="header ${(this.floating||this.docked)&&!this.full?"draggable":""}"
          @pointerdown=${(this.floating||this.docked)&&!this.full?this._onDragStart:void 0}
        >
          <span class="title"><span class="title-decor">${L(this.border).before}</span>${this.title}<span class="title-decor">${L(this.border).after}</span></span>
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
        ${this.resizable&&this.floating&&!this.full?l.html`
          <div class="resize-handle" @pointerdown=${this._onResizeStart}></div>
        `:""}
      </div>
    `}},s.Panel.styles=[f,l.css`
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
    `],b([c({type:String})],s.Panel.prototype,"title",2),b([c({type:String})],s.Panel.prototype,"color",2),b([c({type:String,reflect:!0})],s.Panel.prototype,"border",2),b([c({type:String,reflect:!0})],s.Panel.prototype,"variant",2),b([c({type:String,attribute:"selection-style",reflect:!0})],s.Panel.prototype,"selectionStyle",2),b([c({type:Boolean})],s.Panel.prototype,"collapsible",2),b([c({type:Boolean,reflect:!0})],s.Panel.prototype,"collapsed",2),b([c({type:Boolean,reflect:!0})],s.Panel.prototype,"selected",2),b([c({type:Boolean,reflect:!0})],s.Panel.prototype,"active",2),b([c({type:String,attribute:"persist-id"})],s.Panel.prototype,"persistId",2),b([c({type:Boolean,reflect:!0})],s.Panel.prototype,"dismissable",2),b([c({type:Boolean,reflect:!0})],s.Panel.prototype,"full",2),b([c({type:Boolean,reflect:!0})],s.Panel.prototype,"floating",2),b([c({type:String,attribute:"snap-edge",reflect:!0})],s.Panel.prototype,"snapEdge",2),b([c({type:Number,attribute:"position-x"})],s.Panel.prototype,"positionX",2),b([c({type:Number,attribute:"position-y"})],s.Panel.prototype,"positionY",2),b([c({type:Boolean,reflect:!0})],s.Panel.prototype,"resizable",2),b([c({type:Boolean,reflect:!0})],s.Panel.prototype,"minimized",2),b([c({type:Number,attribute:"panel-width"})],s.Panel.prototype,"panelWidth",2),b([c({type:Number,attribute:"panel-height"})],s.Panel.prototype,"panelHeight",2),b([c({type:Number,attribute:"max-width"})],s.Panel.prototype,"maxWidth",2),b([c({type:Number,attribute:"max-height"})],s.Panel.prototype,"maxHeight",2),b([c({type:Number,attribute:"min-width"})],s.Panel.prototype,"minWidth",2),b([c({type:Number,attribute:"min-height"})],s.Panel.prototype,"minHeight",2),b([c({type:String,reflect:!0,converter:{fromAttribute:n=>n||"",toAttribute:n=>n||null}})],s.Panel.prototype,"docked",2),s.Panel=b([m("tui-panel")],s.Panel);const be={30:"black",31:"red",32:"green",33:"yellow",34:"blue",35:"magenta",36:"cyan",37:"white",90:"black",91:"red",92:"green",93:"yellow",94:"blue",95:"magenta",96:"cyan",97:"white"},ve={40:"black",41:"red",42:"green",43:"yellow",44:"blue",45:"magenta",46:"cyan",47:"white",100:"black",101:"red",102:"green",103:"yellow",104:"blue",105:"magenta",106:"cyan",107:"white"},ge={1:"bold",2:"dim",3:"italic",4:"underline",7:"reverse",9:"strikethrough"};function ye(n){const e=["#000000","#aa0000","#00aa00","#aa5500","#0000aa","#aa00aa","#00aaaa","#aaaaaa"],t=["#555555","#ff5555","#55ff55","#ffff55","#5555ff","#ff55ff","#55ffff","#ffffff"];if(n<8)return e[n];if(n<16)return t[n-8];if(n<232){const i=n-16,a=Math.floor(i/36),d=Math.floor(i%36/6),h=i%6,p=u=>(u===0?0:55+u*40).toString(16).padStart(2,"0");return`#${p(a)}${p(d)}${p(h)}`}const r=(8+(n-232)*10).toString(16).padStart(2,"0");return`#${r}${r}${r}`}function G(n){if(!n)return"";let e=n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");const t=/\x1b\[([0-9;]+)m/g;let o="",r=0,i=[],a;for(;(a=t.exec(e))!==null;){o+=e.slice(r,a.index),r=a.index+a[0].length;const d=a[1].split(";").map(Number);for(let h=0;h<d.length;h++){const p=d[h];if(p===0)o+=i.map(()=>"</span>").join(""),i=[];else if(p===38&&d[h+1]===5&&d[h+2]!==void 0){const u=ye(d[h+2]);o+=`<span style="color: ${u}">`,i.push("256fg"),h+=2}else if(p===48&&d[h+1]===5&&d[h+2]!==void 0){const u=ye(d[h+2]);o+=`<span style="background-color: ${u}">`,i.push("256bg"),h+=2}else if(p===38&&d[h+1]===2&&d.length>h+4){const u=d[h+2],_=d[h+3],le=d[h+4];o+=`<span style="color: rgb(${u},${_},${le})">`,i.push("tcfg"),h+=4}else if(p===48&&d[h+1]===2&&d.length>h+4){const u=d[h+2],_=d[h+3],le=d[h+4];o+=`<span style="background-color: rgb(${u},${_},${le})">`,i.push("tcbg"),h+=4}else if(be[p]){const u=`ansi-${be[p]}`;o+=`<span class="${u}">`,i.push(u)}else if(ve[p]){const u=`ansi-bg-${ve[p]}`;o+=`<span class="${u}">`,i.push(u)}else if(ge[p]){const u=`ansi-${ge[p]}`;o+=`<span class="${u}">`,i.push(u)}}}return o+=e.slice(r),o+=i.map(()=>"</span>").join(""),o}var Ye=Object.defineProperty,Ue=Object.getOwnPropertyDescriptor,P=(n,e,t,o)=>{for(var r=o>1?void 0:o?Ue(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&Ye(e,t,r),r};s.Output=class extends l.LitElement{constructor(){super(...arguments),this.maxLines=500,this.autoscroll=!0,this.timestamps=!1,this.attr="",this._lines=[]}append(e){const t=this.timestamps?new Date().toLocaleTimeString("en-US",{hour12:!1}):null,o=e.split(`
`).map(r=>({id:Date.now()+Math.random(),text:r,html:G(r),timestamp:t}));this._lines=[...this._lines,...o].slice(-this.maxLines),this.autoscroll&&this._isNearBottom()&&this.updateComplete.then(()=>this.scrollToBottom())}clear(){this._lines=[]}handleEvent(e){if(e.type==="clear"){this.clear();return}const t=e.data;t.message!=null&&this.append(t.message)}_isNearBottom(){var o;const e=(o=this.shadowRoot)==null?void 0:o.querySelector(".output");return e?e.scrollHeight-e.scrollTop-e.clientHeight<30:!0}scrollToBottom(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".output");e&&(e.scrollTop=e.scrollHeight)}get _attrClasses(){return this.attr.split(/\s+/).filter(Boolean).map(e=>`tui-${e}`).join(" ")}render(){return l.html`
      <div class="output ${this._attrClasses}">
        ${this._lines.length===0?l.html`<div class="empty">Waiting for output...</div>`:this._lines.map(e=>l.html`
              <div class="line">
                ${e.timestamp?l.html`<span class="timestamp">[${e.timestamp}]</span>`:""}
                <span .innerHTML=${e.html}></span>
              </div>
            `)}
      </div>
    `}},s.Output.styles=[f,l.css`
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
    `],P([c({type:Number,attribute:"max-lines"})],s.Output.prototype,"maxLines",2),P([c({type:Boolean})],s.Output.prototype,"autoscroll",2),P([c({type:Boolean})],s.Output.prototype,"timestamps",2),P([c({type:String})],s.Output.prototype,"attr",2),P([v()],s.Output.prototype,"_lines",2),s.Output=P([m("tui-output")],s.Output);var Xe=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,K=(n,e,t,o)=>{for(var r=o>1?void 0:o?qe(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&Xe(e,t,r),r};s.Table=class extends l.LitElement{constructor(){super(...arguments),this.border="single",this._columns=[],this._rows=[]}setData(e,t){this._columns=e,this._rows=t}upsertRow(e,t){const o=this._rows.findIndex(r=>r[this._columns[0]]===e);o>=0?this._rows=[...this._rows.slice(0,o),t,...this._rows.slice(o+1)]:this._rows=[...this._rows,t]}handleEvent(e){if(e.type==="clear"){this._columns=[],this._rows=[];return}const t=e.data;if("columns"in t&&"rows"in t){const o=t;this.setData(o.columns,o.rows)}else if("key"in t&&"row"in t){const o=t;this.upsertRow(o.key,o.row)}}getCellClass(e){return typeof e=="number"?"number":e==="✓"||e==="OK"||e==="online"?"status-ok":e==="⚠"||e==="WARN"||e==="degraded"?"status-warn":e==="✗"||e==="ERROR"||e==="offline"?"status-error":""}render(){return this._columns.length===0?l.html`<div class="empty">No data</div>`:l.html`
      <div class="table">
        <div class="row header">
          ${this._columns.map(e=>l.html`<div class="cell">${e}</div>`)}
        </div>
        ${this._rows.map(e=>l.html`
          <div class="row">
            ${this._columns.map(t=>l.html`
              <div class="cell ${this.getCellClass(e[t])}">${e[t]??""}</div>
            `)}
          </div>
        `)}
      </div>
    `}},s.Table.styles=[f,l.css`
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
    `],K([c({type:String})],s.Table.prototype,"border",2),K([v()],s.Table.prototype,"_columns",2),K([v()],s.Table.prototype,"_rows",2),s.Table=K([m("tui-table")],s.Table);var Fe=Object.defineProperty,Ve=Object.getOwnPropertyDescriptor,z=(n,e,t,o)=>{for(var r=o>1?void 0:o?Ve(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&Fe(e,t,r),r};s.Console=class extends l.LitElement{constructor(){super(...arguments),this.prompt="❯ ",this.promptAttr="",this.historySize=100,this._lines=[],this._inputValue="",this._historyIndex=-1,this._history=[]}print(e){const t=e.split(`
`).map(o=>({id:Date.now()+Math.random(),text:o,html:G(o),type:"output"}));this._lines=[...this._lines,...t],this.updateComplete.then(()=>this.scrollToBottom())}clear(){this._lines=[]}handleEvent(e){if(e.type==="clear"){this.clear();return}const t=e.data;t.message!=null&&this.print(t.message)}scrollToBottom(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".output");e&&(e.scrollTop=e.scrollHeight)}focusInput(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("input");e==null||e.focus()}handleKeydown(e){switch(e.key){case"Enter":this.submitCommand();break;case"ArrowUp":e.preventDefault(),this.navigateHistory(1);break;case"ArrowDown":e.preventDefault(),this.navigateHistory(-1);break;case"l":e.ctrlKey&&(e.preventDefault(),this.clear());break;case"c":e.ctrlKey&&(e.preventDefault(),this._inputValue="",this.print("^C"));break}}submitCommand(){const e=this._inputValue.trim();e&&(this._lines=[...this._lines,{id:Date.now(),text:e,html:e,type:"command",prompt:this.prompt}],this._history=[...this._history.slice(-this.historySize+1),e],this._historyIndex=-1,this._inputValue="",this.dispatchEvent(new CustomEvent("command",{detail:e,bubbles:!0,composed:!0})),this.updateComplete.then(()=>this.scrollToBottom()))}navigateHistory(e){const t=this._historyIndex+e;t<0?(this._historyIndex=-1,this._inputValue=""):t<this._history.length&&(this._historyIndex=t,this._inputValue=this._history[this._history.length-1-t])}handleInput(e){this._inputValue=e.target.value}get _promptClasses(){return["prompt",...this.promptAttr.split(/\s+/).filter(Boolean).map(e=>`tui-${e}`)].join(" ")}render(){return l.html`
      <div class="console" @click=${this.focusInput}>
        <div class="output">
          ${this._lines.map(e=>l.html`
            <div class="line ${e.type}" data-prompt=${e.prompt||""}>
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
    `}},s.Console.styles=[f,l.css`
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
    `],z([c({type:String})],s.Console.prototype,"prompt",2),z([c({type:String,attribute:"prompt-attr"})],s.Console.prototype,"promptAttr",2),z([c({type:Number,attribute:"history-size"})],s.Console.prototype,"historySize",2),z([v()],s.Console.prototype,"_lines",2),z([v()],s.Console.prototype,"_inputValue",2),z([v()],s.Console.prototype,"_historyIndex",2),s.Console=z([m("tui-console")],s.Console);var Ge=Object.defineProperty,Ke=Object.getOwnPropertyDescriptor,Z=(n,e,t,o)=>{for(var r=o>1?void 0:o?Ke(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&Ge(e,t,r),r};s.Text=class extends l.LitElement{constructor(){super(...arguments),this.content="",this.attr="",this.variant=""}render(){const e=this.attr.split(/\s+/).filter(Boolean).map(o=>`tui-${o}`).join(" "),t=G(this.content||this.textContent||"");return l.html`<pre class="${e}" .innerHTML=${t}></pre>`}},s.Text.styles=[f,l.css`
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
    `],Z([c({type:String})],s.Text.prototype,"content",2),Z([c({type:String})],s.Text.prototype,"attr",2),Z([c({type:String,reflect:!0})],s.Text.prototype,"variant",2),s.Text=Z([m("tui-text")],s.Text);var Ze=Object.defineProperty,Je=Object.getOwnPropertyDescriptor,$=(n,e,t,o)=>{for(var r=o>1?void 0:o?Je(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&Ze(e,t,r),r};s.Button=class extends l.LitElement{constructor(){super(...arguments),this.variant="default",this.size="md",this.selected=!1,this.disabled=!1,this.block=!1}render(){return l.html`
      <button ?disabled=${this.disabled} part="button">
        <slot></slot>
      </button>
    `}},s.Button.shadowRootOptions={...l.LitElement.shadowRootOptions,delegatesFocus:!0},s.Button.styles=[f,l.css`
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
    `],$([c({reflect:!0})],s.Button.prototype,"variant",2),$([c({reflect:!0})],s.Button.prototype,"size",2),$([c({attribute:"selection-style"})],s.Button.prototype,"selectionStyle",2),$([c({attribute:"tool-id"})],s.Button.prototype,"toolId",2),$([c({type:Boolean,reflect:!0})],s.Button.prototype,"selected",2),$([c({type:Boolean,reflect:!0})],s.Button.prototype,"disabled",2),$([c({type:Boolean,reflect:!0})],s.Button.prototype,"block",2),s.Button=$([m("tui-button")],s.Button);var Qe=Object.defineProperty,et=Object.getOwnPropertyDescriptor,y=(n,e,t,o)=>{for(var r=o>1?void 0:o?et(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&Qe(e,t,r),r};s.Menu=class extends l.LitElement{constructor(){super(...arguments),this._openMenu=null}render(){return l.html`<slot></slot>`}},s.Menu.styles=[f,l.css`
      :host {
        display: flex;
        gap: var(--spacing-xs);
      }
    `],y([v()],s.Menu.prototype,"_openMenu",2),s.Menu=y([m("tui-menu")],s.Menu),s.MenuItem=class extends l.LitElement{constructor(){super(...arguments),this.label="",this.hotkey="",this._open=!1,this._outsideClickHandler=null}connectedCallback(){super.connectedCallback(),this._outsideClickHandler=e=>{this._open&&!this.contains(e.target)&&this._close()},document.addEventListener("click",this._outsideClickHandler),this.addEventListener("keydown",this._handleKeydown.bind(this))}disconnectedCallback(){super.disconnectedCallback(),this._outsideClickHandler&&document.removeEventListener("click",this._outsideClickHandler)}_toggle(){this._open=!this._open,this.classList.toggle("open",this._open)}_close(){this._open=!1,this.classList.remove("open")}_handleKeydown(e){e.key==="Escape"&&(this._close(),e.preventDefault()),(e.key==="Enter"||e.key===" "||e.key==="ArrowDown")&&(this._open||(this._toggle(),e.preventDefault()))}render(){let e=this.label;if(this.hotkey&&this.label.toLowerCase().includes(this.hotkey.toLowerCase())){const t=this.label.toLowerCase().indexOf(this.hotkey.toLowerCase()),o=this.label.slice(0,t),r=this.label.slice(t,t+1),i=this.label.slice(t+1);e=l.html`${o}<span class="hotkey">${r}</span>${i}`}return l.html`
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
    `}},s.MenuItem.styles=[f,l.css`
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
    `],y([c({type:String})],s.MenuItem.prototype,"label",2),y([c({type:String})],s.MenuItem.prototype,"hotkey",2),y([v()],s.MenuItem.prototype,"_open",2),s.MenuItem=y([m("tui-menu-item")],s.MenuItem),s.MenuAction=class extends l.LitElement{constructor(){super(...arguments),this.label="",this.shortcut="",this.danger=!1}_handleClick(){this.dispatchEvent(new CustomEvent("action",{bubbles:!0,composed:!0}))}render(){return l.html`
      <button @click=${this._handleClick}>
        <span>${this.label}</span>
        ${this.shortcut?l.html`<span class="shortcut">${this.shortcut}</span>`:""}
      </button>
    `}},s.MenuAction.styles=[f,l.css`
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
    `],y([c({type:String})],s.MenuAction.prototype,"label",2),y([c({type:String})],s.MenuAction.prototype,"shortcut",2),y([c({type:Boolean,reflect:!0})],s.MenuAction.prototype,"danger",2),s.MenuAction=y([m("tui-menu-action")],s.MenuAction),s.MenuDivider=class extends l.LitElement{render(){return l.html``}},s.MenuDivider.styles=l.css`
    :host {
      display: block;
      height: 1px;
      background: var(--border-default);
      margin: var(--spacing-xs) 0;
    }
  `,s.MenuDivider=y([m("tui-menu-divider")],s.MenuDivider);var tt=Object.defineProperty,rt=Object.getOwnPropertyDescriptor,O=(n,e,t,o)=>{for(var r=o>1?void 0:o?rt(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&tt(e,t,r),r};s.Statusbar=class extends l.LitElement{constructor(){super(...arguments),this.color="magenta"}render(){return l.html`<slot></slot>`}},s.Statusbar.styles=[f,l.css`
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
    `],O([c({type:String,reflect:!0})],s.Statusbar.prototype,"color",2),s.Statusbar=O([m("tui-statusbar")],s.Statusbar),s.StatusItem=class extends l.LitElement{constructor(){super(...arguments),this.label="",this.value="",this.highlight=!1}render(){return l.html`
      <span class="label">${this.label}</span>
      <span class="value">${this.value}</span>
    `}},s.StatusItem.styles=[f,l.css`
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
    `],O([c({type:String})],s.StatusItem.prototype,"label",2),O([c({type:String})],s.StatusItem.prototype,"value",2),O([c({type:Boolean,reflect:!0})],s.StatusItem.prototype,"highlight",2),s.StatusItem=O([m("tui-status-item")],s.StatusItem);var ot=Object.defineProperty,st=Object.getOwnPropertyDescriptor,H=(n,e,t,o)=>{for(var r=o>1?void 0:o?st(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&ot(e,t,r),r};s.Modal=class extends l.LitElement{constructor(){super(...arguments),this.title="",this.border="double",this.open=!1,this.closable=!0,this._boundKeyHandler=this._handleKeydown.bind(this)}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._boundKeyHandler)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this._boundKeyHandler)}_handleKeydown(e){this.open&&e.key==="Escape"&&this.closable&&(this.close(),e.preventDefault(),e.stopPropagation())}_handleOverlayClick(e){e.target===e.currentTarget&&this.closable&&this.close()}show(){this.open=!0,this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}close(){this.open=!1,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return l.html`
      <div class="overlay" @click=${this._handleOverlayClick}>
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="header">
            <span class="title" id="modal-title"><span class="title-decor">${L(this.border).before}</span>${this.title}<span class="title-decor">${L(this.border).after}</span></span>
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
    `}},s.Modal.styles=[f,l.css`
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
    `],H([c({type:String,reflect:!0})],s.Modal.prototype,"title",2),H([c({type:String,reflect:!0})],s.Modal.prototype,"border",2),H([c({type:Boolean,reflect:!0})],s.Modal.prototype,"open",2),H([c({type:Boolean})],s.Modal.prototype,"closable",2),s.Modal=H([m("tui-modal")],s.Modal);var it=Object.defineProperty,at=Object.getOwnPropertyDescriptor,g=(n,e,t,o)=>{for(var r=o>1?void 0:o?at(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&it(e,t,r),r};s.Toolbar=class extends l.LitElement{constructor(){super(...arguments),this.orientation="vertical",this.selected="",this.size="md",this.selectionStyle="",this.tools=[],this.showHotkeys=!0}updated(e){e.has("selectionStyle")&&this.selectionStyle&&this.style.setProperty("--toolbar-selection-style",this.selectionStyle)}_handleClick(e){this.selected=e,this.dispatchEvent(new CustomEvent("tool-select",{bubbles:!0,composed:!0,detail:{tool:e}}))}render(){return this.tools&&this.tools.length>0?l.html`
        <div class="toolbar">
          ${this.tools.map(e=>e.divider?l.html`<div class="divider"></div>`:l.html`
              <div class="tool-item">
                ${this.showHotkeys&&e.key?l.html`<span class="hotkey">${e.key}</span>`:""}
                <tui-button
                  variant="icon"
                  size=${this.size}
                  tool-id=${e.id}
                  ?selected=${this.selected===e.id}
                  selection-style=${this.selectionStyle||"invert"}
                  title="${e.name||e.id}${e.key?` (${e.key})`:""}"
                  @click=${()=>this._handleClick(e.id)}
                >
                  ${e.icon||e.id.charAt(0).toUpperCase()}
                </tui-button>
              </div>
            `)}
        </div>
      `:l.html`
      <div class="toolbar">
        <slot></slot>
      </div>
    `}},s.Toolbar.styles=[f,l.css`
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
    `],g([c({reflect:!0})],s.Toolbar.prototype,"orientation",2),g([c()],s.Toolbar.prototype,"selected",2),g([c({reflect:!0})],s.Toolbar.prototype,"size",2),g([c({attribute:"selection-style"})],s.Toolbar.prototype,"selectionStyle",2),g([c({type:Array})],s.Toolbar.prototype,"tools",2),g([c({type:Boolean,attribute:"show-hotkeys"})],s.Toolbar.prototype,"showHotkeys",2),s.Toolbar=g([m("tui-toolbar")],s.Toolbar),s.Tool=class extends l.LitElement{constructor(){super(...arguments),this.toolId="",this.icon="",this.active=!1,this.size="md"}_handleClick(){this.dispatchEvent(new CustomEvent("tool-select",{bubbles:!0,composed:!0,detail:{tool:this.toolId}}))}render(){return l.html`
      <tui-button
        variant="icon"
        size=${this.size}
        ?selected=${this.active}
        @click=${this._handleClick}
      >
        <slot>${this.icon}</slot>
      </tui-button>
    `}},s.Tool.styles=l.css`
    :host {
      display: contents;
    }
  `,g([c({attribute:"tool-id"})],s.Tool.prototype,"toolId",2),g([c()],s.Tool.prototype,"icon",2),g([c({type:Boolean,reflect:!0})],s.Tool.prototype,"active",2),g([c()],s.Tool.prototype,"size",2),s.Tool=g([m("tui-tool")],s.Tool);var nt=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,j=(n,e,t,o)=>{for(var r=o>1?void 0:o?lt(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&nt(e,t,r),r};s.Toast=class extends l.LitElement{constructor(){super(...arguments),this.position="bottom",this._queue=[],this._current=null,this._visible=!1}show(e,t={}){const o={message:e,type:t.type||null,title:t.title||this._getDefaultTitle(t.type),duration:t.duration||2500,simple:!t.type&&!t.title};this._queue=[...this._queue,o],this._current||this._showNext()}_getDefaultTitle(e){switch(e){case"success":return"Success";case"error":return"Error";case"warning":return"Warning";case"info":return"Info";default:return""}}async _showNext(){if(this._queue.length===0){this._current=null;return}const[e,...t]=this._queue;this._queue=t,this._current=e,this._visible=!1,await this.updateComplete,requestAnimationFrame(()=>{this._visible=!0}),await new Promise(o=>setTimeout(o,this._current.duration)),this._visible=!1,await new Promise(o=>setTimeout(o,200)),this._showNext()}render(){if(!this._current)return l.html``;const{message:e,type:t,title:o,simple:r}=this._current,i=["toast",this._visible?"visible":"",t?`type-${t}`:"",r?"simple":""].filter(Boolean).join(" ");return l.html`
      <div class="${i}">
        <div class="toast-header">${o}</div>
        <div class="toast-body">${e}</div>
      </div>
    `}},s.Toast.styles=[f,l.css`
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
    `],j([c({type:String,reflect:!0})],s.Toast.prototype,"position",2),j([v()],s.Toast.prototype,"_queue",2),j([v()],s.Toast.prototype,"_current",2),j([v()],s.Toast.prototype,"_visible",2),s.Toast=j([m("tui-toast")],s.Toast);let J=null;function ct(n,e){J||(J=document.createElement("tui-toast"),document.body.appendChild(J)),J.show(n,e)}var dt=Object.defineProperty,ht=Object.getOwnPropertyDescriptor,k=(n,e,t,o)=>{for(var r=o>1?void 0:o?ht(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&dt(e,t,r),r};const x=R.single,S=R.heavy,C=R.double;s.Card=class extends l.LitElement{constructor(){super(...arguments),this.rank="",this.suit="",this.faceDown=!1,this.selected=!1,this.disabled=!1,this.size="md"}get isRed(){return this.suit==="♥"||this.suit==="♦"}_handleClick(){this.disabled||this.dispatchEvent(new CustomEvent("card-click",{bubbles:!0,composed:!0,detail:{rank:this.rank,suit:this.suit}}))}render(){const e=this.isRed?"suit red":"suit",t=`size-${this.size}`;return l.html`
      <div 
        class="card ${t} ${this.disabled?"disabled":""}"
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
    `}},s.Card.styles=[f,l.css`
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
         NEUTRAL STATE - Single line border ${l.unsafeCSS(x.tl)}${l.unsafeCSS(x.h)}${l.unsafeCSS(x.h)}${l.unsafeCSS(x.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      .card {
        border: var(--border-width) solid var(--border-default);
      }

      .card::before {
        content: '${l.unsafeCSS(x.tl)}';
        position: absolute;
        top: -1px;
        left: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card::after {
        content: '${l.unsafeCSS(x.tr)}';
        position: absolute;
        top: -1px;
        right: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card-bottom::before {
        content: '${l.unsafeCSS(x.bl)}';
        position: absolute;
        bottom: -1px;
        left: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card-bottom::after {
        content: '${l.unsafeCSS(x.br)}';
        position: absolute;
        bottom: -1px;
        right: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      /* ═══════════════════════════════════════════════════════════════════
         HOVER STATE - Heavy line border ${l.unsafeCSS(S.tl)}${l.unsafeCSS(S.h)}${l.unsafeCSS(S.h)}${l.unsafeCSS(S.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      .card:hover:not(.disabled) {
        border-color: var(--text-primary);
        box-shadow: 2px 2px 0 rgba(255,255,255,0.08);
        transform: translateY(-2px);
      }

      .card:hover:not(.disabled)::before { content: '${l.unsafeCSS(S.tl)}'; color: var(--text-primary); }
      .card:hover:not(.disabled)::after { content: '${l.unsafeCSS(S.tr)}'; color: var(--text-primary); }
      .card:hover:not(.disabled) .card-bottom::before { content: '${l.unsafeCSS(S.bl)}'; color: var(--text-primary); }
      .card:hover:not(.disabled) .card-bottom::after { content: '${l.unsafeCSS(S.br)}'; color: var(--text-primary); }

      /* ═══════════════════════════════════════════════════════════════════
         SELECTED STATE - Double line border ${l.unsafeCSS(C.tl)}${l.unsafeCSS(C.h)}${l.unsafeCSS(C.h)}${l.unsafeCSS(C.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      :host([selected]) .card {
        border-color: var(--color-primary);
        box-shadow: 3px 3px 0 rgba(88, 166, 255, 0.2);
      }

      :host([selected]) .card::before { content: '${l.unsafeCSS(C.tl)}'; color: var(--color-primary); }
      :host([selected]) .card::after { content: '${l.unsafeCSS(C.tr)}'; color: var(--color-primary); }
      :host([selected]) .card-bottom::before { content: '${l.unsafeCSS(C.bl)}'; color: var(--color-primary); }
      :host([selected]) .card-bottom::after { content: '${l.unsafeCSS(C.br)}'; color: var(--color-primary); }

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
    `],k([c({type:String})],s.Card.prototype,"rank",2),k([c({type:String})],s.Card.prototype,"suit",2),k([c({type:Boolean,attribute:"face-down",reflect:!0})],s.Card.prototype,"faceDown",2),k([c({type:Boolean,reflect:!0})],s.Card.prototype,"selected",2),k([c({type:Boolean,reflect:!0})],s.Card.prototype,"disabled",2),k([c({type:String,reflect:!0})],s.Card.prototype,"size",2),s.Card=k([m("tui-card")],s.Card);var pt=Object.defineProperty,ut=Object.getOwnPropertyDescriptor,B=(n,e,t,o)=>{for(var r=o>1?void 0:o?ut(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&pt(e,t,r),r};s.Palette=class extends l.LitElement{constructor(){super(...arguments),this.palettes={},this.currentPalette="",this.selectedChar="",this.columns=8}get _chars(){return this.palettes[this.currentPalette]||[]}_selectPalette(e){var o;const t=((o=this.palettes[e])==null?void 0:o[0])||"";this.dispatchEvent(new CustomEvent("palette-change",{bubbles:!0,composed:!0,detail:{palette:e,firstChar:t}}))}_selectChar(e){this.dispatchEvent(new CustomEvent("char-select",{bubbles:!0,composed:!0,detail:{char:e}}))}render(){const e=Object.keys(this.palettes);return l.html`
      <div class="tabs">
        ${e.map(t=>l.html`
          <button
            class="tab ${t===this.currentPalette?"active":""}"
            @click=${()=>this._selectPalette(t)}
          >${t}</button>
        `)}
      </div>
      <div class="grid" style="grid-template-columns: repeat(${this.columns}, 28px)">
        ${this._chars.map(t=>l.html`
          <button
            class="char ${t===this.selectedChar?"selected":""}"
            @click=${()=>this._selectChar(t)}
          >${t}</button>
        `)}
      </div>
    `}},s.Palette.styles=[f,l.css`
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
    `],B([c({type:Object})],s.Palette.prototype,"palettes",2),B([c({type:String,attribute:"current-palette"})],s.Palette.prototype,"currentPalette",2),B([c({type:String,attribute:"selected-char"})],s.Palette.prototype,"selectedChar",2),B([c({type:Number})],s.Palette.prototype,"columns",2),s.Palette=B([m("tui-palette")],s.Palette);var mt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,Q=(n,e,t,o)=>{for(var r=o>1?void 0:o?ft(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&mt(e,t,r),r};s.Link=class extends l.LitElement{constructor(){super(...arguments),this.href="",this.type="external",this._copied=!1}_handleClick(){this.type==="external"&&this.href?window.open(this.href,"_blank","noopener"):this.type==="copy"&&this.href&&navigator.clipboard.writeText(this.href).then(()=>{this._copied=!0,this.dispatchEvent(new CustomEvent("copy",{detail:{value:this.href},bubbles:!0,composed:!0})),setTimeout(()=>{this._copied=!1},1500)})}render(){const e=this.type==="external"?"↗":"⧉";return l.html`
      <button class="link" @click=${this._handleClick}>
        <slot></slot><span class="icon">${e}</span>
      </button>${this._copied?l.html`<span class="copied">copied</span>`:""}
    `}},s.Link.styles=[f,l.css`
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
    `],Q([c({type:String})],s.Link.prototype,"href",2),Q([c({type:String,reflect:!0})],s.Link.prototype,"type",2),Q([v()],s.Link.prototype,"_copied",2),s.Link=Q([m("tui-link")],s.Link);var bt=Object.defineProperty,vt=Object.getOwnPropertyDescriptor,ie=(n,e,t,o)=>{for(var r=o>1?void 0:o?vt(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&bt(e,t,r),r};s.ActionList=class extends l.LitElement{constructor(){super(...arguments),this.items=[],this.selected=""}_handleClick(e,t){this.selected===e?(this.selected="",this.dispatchEvent(new CustomEvent("item-deselect",{bubbles:!0,composed:!0}))):(this.selected=e,this.dispatchEvent(new CustomEvent("item-select",{detail:{id:e,label:t},bubbles:!0,composed:!0})))}_colorVar(e){return e?{success:"var(--color-success)",error:"var(--color-error)",warning:"var(--color-warning)",primary:"var(--color-primary)",muted:"var(--text-muted)"}[e]??e:""}_hasActions(e){var o;const t=(o=this.shadowRoot)==null?void 0:o.querySelector(`slot[name="actions-${e}"]`);return!!t&&t.assignedNodes().length>0}render(){return this.items.length===0?l.html`<div class="empty">No items</div>`:l.html`${this.items.map(e=>{const t=this._colorVar(e.color),o=this.selected===e.id;return l.html`
        <div
          class="item ${o?"active":""}"
          @click=${()=>this._handleClick(e.id,e.label)}
        >
          <div style=${t&&!o?`color: ${t}`:""}>${e.label}</div>
          ${e.sublabel?l.html`<div class="sublabel">${e.sublabel}</div>`:""}
        </div>
        ${o?l.html`
          <div class="action-panel" style=${this._hasActions(e.id)?"":"display:none"}>
            <slot name="actions-${e.id}" @slotchange=${()=>this.requestUpdate()}></slot>
          </div>
        `:l.nothing}
      `})}`}},s.ActionList.styles=[f,l.css`
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
    `],ie([c({type:Array})],s.ActionList.prototype,"items",2),ie([c({type:String,reflect:!0})],s.ActionList.prototype,"selected",2),s.ActionList=ie([m("tui-action-list")],s.ActionList);var gt=Object.defineProperty,yt=Object.getOwnPropertyDescriptor,ee=(n,e,t,o)=>{for(var r=o>1?void 0:o?yt(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&gt(e,t,r),r};s.Stat=class extends l.LitElement{constructor(){super(...arguments),this.label="",this.value="",this.color=""}render(){return l.html`
      <div class="label">${this.label}</div>
      <div class="value">${this.value}</div>
    `}},s.Stat.styles=[f,l.css`
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
    `],ee([c({type:String})],s.Stat.prototype,"label",2),ee([c({type:String})],s.Stat.prototype,"value",2),ee([c({type:String,reflect:!0})],s.Stat.prototype,"color",2),s.Stat=ee([m("tui-stat")],s.Stat);var _t=Object.defineProperty,wt=Object.getOwnPropertyDescriptor,N=(n,e,t,o)=>{for(var r=o>1?void 0:o?wt(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&_t(e,t,r),r};s.StatusStrip=class extends l.LitElement{constructor(){super(...arguments),this.label=""}render(){return l.html`
      ${this.label?l.html`<span class="label">${this.label}:</span>`:""}
      <slot></slot>
    `}},s.StatusStrip.styles=[f,l.css`
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
    `],N([c({type:String})],s.StatusStrip.prototype,"label",2),s.StatusStrip=N([m("tui-status-strip")],s.StatusStrip),s.StripItem=class extends l.LitElement{constructor(){super(...arguments),this.color="",this.indicator=""}render(){return l.html`
      <span class="separator">│</span>
      <slot></slot>${this.indicator?l.html` ${this.indicator}`:""}
    `}},s.StripItem.styles=[f,l.css`
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
    `],N([c({type:String,reflect:!0})],s.StripItem.prototype,"color",2),N([c({type:String})],s.StripItem.prototype,"indicator",2),s.StripItem=N([m("tui-strip-item")],s.StripItem);var $t=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,ae=(n,e,t,o)=>{for(var r=o>1?void 0:o?xt(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&$t(e,t,r),r};s.Titlebar=class extends l.LitElement{constructor(){super(...arguments),this.app="",this.section=""}render(){return l.html`
      ${this.app?l.html`
        <span class="app-name">${this.app}</span>
        <span class="divider">|</span>
      `:""}
      <slot></slot>
      ${this.section?l.html`<span class="section">${this.section}</span>`:""}
    `}},s.Titlebar.styles=[f,l.css`
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
    `],ae([c({type:String})],s.Titlebar.prototype,"app",2),ae([c({type:String})],s.Titlebar.prototype,"section",2),s.Titlebar=ae([m("tui-titlebar")],s.Titlebar);var St=Object.defineProperty,Ct=Object.getOwnPropertyDescriptor,W=(n,e,t,o)=>{for(var r=o>1?void 0:o?Ct(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&St(e,t,r),r};const Et={monitor:"status status | main aside-1 | main aside-2",viewer:"primary secondary | detail detail",console:"main | footer","console-split":"main aside | footer footer",triad:"left center right"};function _e(n){const t=n.split("|").map(p=>p.trim()).filter(Boolean).map(p=>p.split(/\s+/)),o=t.map(p=>`"${p.join(" ")}"`).join(" "),r=Math.max(...t.map(p=>p.length)),i=Array(r).fill("1fr").join(" "),a=new Set,d=[];for(const p of t)for(const u of p)a.has(u)||(a.add(u),d.push(u));const h=t.map((p,u)=>{const _=new Set(p).size===1;return _&&u===0?"auto":_&&u===t.length-1?"120px":"1fr"}).join(" ");return{areas:o,rows:h,cols:i,slotNames:d}}s.Tiled=class extends l.LitElement{constructor(){super(...arguments),this.preset="",this.areas="",this.gap="1px",this.labels=""}_getGrid(){const e=this.preset?Et[this.preset]:this.areas;return e?_e(e):null}_getDisplayLabels(e){if(!this.preset||!this.areas)return{};const t=this.areas.split("|").flatMap(r=>r.trim().split(/\s+/)).filter(Boolean),o={};return e.forEach((r,i)=>{t[i]&&(o[r]=t[i])}),o}render(){const e=this._getGrid();if(!e)return l.nothing;const t=`
      grid-template-areas: ${e.areas};
      grid-template-rows: ${e.rows};
      grid-template-columns: ${e.cols};
      gap: ${this.gap};
    `,o=this._getDisplayLabels(e.slotNames);return l.html`
      <div class="grid" style=${t}>
        ${e.slotNames.map(r=>{const i=o[r]??r;return l.html`
            <div class="zone ${this.labels==="titlebar"?"has-titlebar":""}" style="grid-area: ${r};">
              ${this.labels==="titlebar"?l.html`<div class="zone-titlebar">${i}</div>`:l.nothing}
              ${this.labels==="caption"?l.html`<span class="zone-label">${i}</span>`:l.nothing}
              <slot name=${r}></slot>
            </div>
          `})}
      </div>
    `}},s.Tiled.styles=[f,l.css`
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
    `],W([c({type:String,reflect:!0})],s.Tiled.prototype,"preset",2),W([c({type:String})],s.Tiled.prototype,"areas",2),W([c({type:String})],s.Tiled.prototype,"gap",2),W([c({type:String})],s.Tiled.prototype,"labels",2),s.Tiled=W([m("tui-tiled")],s.Tiled);var zt=Object.defineProperty,kt=Object.getOwnPropertyDescriptor,T=(n,e,t,o)=>{for(var r=o>1?void 0:o?kt(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&zt(e,t,r),r};s.Input=class extends l.LitElement{constructor(){super(...arguments),this.value="",this.placeholder="",this.disabled=!1,this.name="",this.label=""}handleEvent(e){if(e.type==="clear"){this.value="";return}const t=e.data;t.value!=null&&(this.value=String(t.value)),t.placeholder!=null&&(this.placeholder=String(t.placeholder)),t.disabled!=null&&(this.disabled=!!t.disabled),t.label!=null&&(this.label=String(t.label))}_onInput(e){const t=e.target;this.value=t.value,this.dispatchEvent(new CustomEvent("tui-input",{bubbles:!0,composed:!0,detail:{value:this.value}}))}_onChange(e){const t=e.target;this.value=t.value,this.dispatchEvent(new CustomEvent("tui-change",{bubbles:!0,composed:!0,detail:{value:this.value}}))}render(){return l.html`
      ${this.label?l.html`<label>${this.label}</label>`:""}
      <input
        .value=${this.value}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        @input=${this._onInput}
        @change=${this._onChange}
      />
    `}},s.Input.styles=[f,l.css`
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
    `],T([c({reflect:!0})],s.Input.prototype,"value",2),T([c()],s.Input.prototype,"placeholder",2),T([c({type:Boolean,reflect:!0})],s.Input.prototype,"disabled",2),T([c()],s.Input.prototype,"name",2),T([c()],s.Input.prototype,"label",2),s.Input=T([m("tui-input")],s.Input);var Pt=Object.defineProperty,Ot=Object.getOwnPropertyDescriptor,D=(n,e,t,o)=>{for(var r=o>1?void 0:o?Ot(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&Pt(e,t,r),r};s.Checkbox=class extends l.LitElement{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.name="",this.value="",this.label=""}handleEvent(e){if(e.type==="clear"){this.checked=!1;return}const t=e.data;t.checked!=null&&(this.checked=!!t.checked),t.disabled!=null&&(this.disabled=!!t.disabled),t.label!=null&&(this.label=String(t.label))}_toggle(){this.disabled||(this.checked=!this.checked,this.dispatchEvent(new CustomEvent("tui-change",{bubbles:!0,composed:!0,detail:{checked:this.checked,value:this.value,name:this.name}})))}_onKeydown(e){(e.key===" "||e.key==="Enter")&&(e.preventDefault(),this._toggle())}render(){return l.html`
      <div class="checkbox"
           role="checkbox"
           aria-checked="${this.checked}"
           tabindex="${this.disabled?-1:0}"
           @click=${this._toggle}
           @keydown=${this._onKeydown}>
        <span class="glyph">${this.checked?"▣":"□"}</span>
        <span class="label"><slot>${this.label}</slot></span>
      </div>
    `}},s.Checkbox.styles=[f,l.css`
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
    `],D([c({type:Boolean,reflect:!0})],s.Checkbox.prototype,"checked",2),D([c({type:Boolean,reflect:!0})],s.Checkbox.prototype,"disabled",2),D([c()],s.Checkbox.prototype,"name",2),D([c()],s.Checkbox.prototype,"value",2),D([c()],s.Checkbox.prototype,"label",2),s.Checkbox=D([m("tui-checkbox")],s.Checkbox);var Tt=Object.defineProperty,Dt=Object.getOwnPropertyDescriptor,I=(n,e,t,o)=>{for(var r=o>1?void 0:o?Dt(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&Tt(e,t,r),r};s.Radio=class extends l.LitElement{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.name="",this.value="",this.label=""}handleEvent(e){if(e.type==="clear"){this.checked=!1;return}const t=e.data;t.checked!=null&&(this.checked=!!t.checked),t.disabled!=null&&(this.disabled=!!t.disabled),t.label!=null&&(this.label=String(t.label))}_select(){this.disabled||this.checked||(this.checked=!0,this.dispatchEvent(new CustomEvent("tui-change",{bubbles:!0,composed:!0,detail:{checked:!0,value:this.value,name:this.name}})))}_onKeydown(e){(e.key===" "||e.key==="Enter")&&(e.preventDefault(),this._select())}render(){return l.html`
      <div class="radio"
           role="radio"
           aria-checked="${this.checked}"
           tabindex="${this.disabled?-1:0}"
           @click=${this._select}
           @keydown=${this._onKeydown}>
        <span class="glyph">${this.checked?"◉":"◯"}</span>
        <span class="label"><slot>${this.label}</slot></span>
      </div>
    `}},s.Radio.styles=[f,l.css`
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
    `],I([c({type:Boolean,reflect:!0})],s.Radio.prototype,"checked",2),I([c({type:Boolean,reflect:!0})],s.Radio.prototype,"disabled",2),I([c()],s.Radio.prototype,"name",2),I([c()],s.Radio.prototype,"value",2),I([c()],s.Radio.prototype,"label",2),s.Radio=I([m("tui-radio")],s.Radio);var It=Object.defineProperty,Mt=Object.getOwnPropertyDescriptor,Y=(n,e,t,o)=>{for(var r=o>1?void 0:o?Mt(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&It(e,t,r),r};s.CheckboxGroup=class extends l.LitElement{constructor(){super(...arguments),this.name="",this.label="",this.disabled=!1,this.value=[]}_getChildren(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("slot");return e?e.assignedElements().filter(o=>o.tagName==="TUI-CHECKBOX"):[]}_syncChildren(){const e=this._getChildren();for(const t of e)this.name&&(t.name=this.name),this.disabled&&(t.disabled=!0);this._syncValueFromChildren()}_syncValueFromChildren(){const e=this._getChildren();this.value=e.filter(t=>t.checked).map(t=>t.value)}_syncChildrenFromValue(){const e=this._getChildren();for(const t of e)t.checked=this.value.includes(t.value)}_onSlotChange(){this._syncChildren()}_onChange(e){e.stopPropagation(),this._syncValueFromChildren(),this.dispatchEvent(new CustomEvent("tui-change",{bubbles:!0,composed:!0,detail:{value:this.value,name:this.name}}))}handleEvent(e){if(e.type==="clear"){this.value=[],this._syncChildrenFromValue();return}const t=e.data;t.value!=null&&(this.value=t.value,this._syncChildrenFromValue()),t.disabled!=null&&(this.disabled=!!t.disabled,this._syncChildren())}render(){return l.html`
      ${this.label?l.html`<div class="group-label">${this.label}</div>`:""}
      <div class="group" @tui-change=${this._onChange}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `}},s.CheckboxGroup.styles=[f,l.css`
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
    `],Y([c()],s.CheckboxGroup.prototype,"name",2),Y([c()],s.CheckboxGroup.prototype,"label",2),Y([c({type:Boolean,reflect:!0})],s.CheckboxGroup.prototype,"disabled",2),Y([c({type:Array})],s.CheckboxGroup.prototype,"value",2),s.CheckboxGroup=Y([m("tui-checkbox-group")],s.CheckboxGroup);var At=Object.defineProperty,Rt=Object.getOwnPropertyDescriptor,U=(n,e,t,o)=>{for(var r=o>1?void 0:o?Rt(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&At(e,t,r),r};s.RadioGroup=class extends l.LitElement{constructor(){super(...arguments),this.name="",this.label="",this.disabled=!1,this.value=""}_getChildren(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("slot");return e?e.assignedElements().filter(o=>o.tagName==="TUI-RADIO"):[]}_syncChildren(){const e=this._getChildren();for(const t of e)this.name&&(t.name=this.name),this.disabled&&(t.disabled=!0),t.checked=t.value===this.value}_onSlotChange(){this._syncChildren()}_onChange(e){e.stopPropagation();const t=e.detail;this.value=t.value;for(const o of this._getChildren())o.checked=o.value===this.value;this.dispatchEvent(new CustomEvent("tui-change",{bubbles:!0,composed:!0,detail:{value:this.value,name:this.name}}))}_onKeydown(e){const t=this._getChildren();if(t.length===0)return;const o=t.findIndex(i=>i.value===this.value);let r;if(e.key==="ArrowDown"||e.key==="ArrowRight")e.preventDefault(),r=(o+1)%t.length;else if(e.key==="ArrowUp"||e.key==="ArrowLeft")e.preventDefault(),r=(o-1+t.length)%t.length;else return;this.value=t[r].value;for(const i of t)i.checked=i.value===this.value;t[r].focus(),this.dispatchEvent(new CustomEvent("tui-change",{bubbles:!0,composed:!0,detail:{value:this.value,name:this.name}}))}handleEvent(e){if(e.type==="clear"){this.value="";for(const o of this._getChildren())o.checked=!1;return}const t=e.data;t.value!=null&&(this.value=String(t.value),this._syncChildren()),t.disabled!=null&&(this.disabled=!!t.disabled,this._syncChildren())}render(){return l.html`
      ${this.label?l.html`<div class="group-label">${this.label}</div>`:""}
      <div class="group" role="radiogroup" @tui-change=${this._onChange} @keydown=${this._onKeydown}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `}},s.RadioGroup.styles=[f,l.css`
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
    `],U([c()],s.RadioGroup.prototype,"name",2),U([c()],s.RadioGroup.prototype,"label",2),U([c({type:Boolean,reflect:!0})],s.RadioGroup.prototype,"disabled",2),U([c()],s.RadioGroup.prototype,"value",2),s.RadioGroup=U([m("tui-radio-group")],s.RadioGroup);var Lt=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,X=(n,e,t,o)=>{for(var r=o>1?void 0:o?Ht(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&Lt(e,t,r),r};s.Progress=class extends l.LitElement{constructor(){super(...arguments),this.value=0,this.label="",this.total=0,this.current=0}handleEvent(e){if(e.type==="clear"){this.value=0,this.label="",this.total=0,this.current=0;return}const t=e.data;t.value!=null&&(this.value=t.value),t.label!=null&&(this.label=t.label),t.total!=null&&(this.total=t.total),t.current!=null&&(this.current=t.current)}get _clampedValue(){return Math.max(0,Math.min(1,this.value))}render(){const e=Math.round(this._clampedValue*100);return l.html`
      <div class="progress">
        <div class="header">
          ${this.label?l.html`<span class="label">${this.label}</span>`:""}
          <span class="stats">
            ${this.total>0?l.html`<span class="count">${this.current}/${this.total}</span>`:""}
            <span class="percentage">${e}%</span>
          </span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${e}%"></div>
        </div>
      </div>
    `}},s.Progress.styles=[f,l.css`
      :host { display: block; }
      .progress { padding: var(--spacing-sm); font-size: 0.8rem; }
      .header { display: flex; justify-content: space-between; margin-bottom: var(--spacing-xs); color: var(--text-primary); }
      .label { color: var(--text-primary); }
      .stats { display: flex; gap: var(--spacing-sm); color: var(--text-muted); }
      .bar-track { height: 12px; background: var(--surface-base); border: var(--border-width) solid var(--border-default); overflow: hidden; }
      .bar-fill { height: 100%; background: var(--color-primary); transition: width 0.2s ease; }
    `],X([c({type:Number})],s.Progress.prototype,"value",2),X([c({type:String})],s.Progress.prototype,"label",2),X([c({type:Number})],s.Progress.prototype,"total",2),X([c({type:Number})],s.Progress.prototype,"current",2),s.Progress=X([m("tui-progress")],s.Progress);var jt=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,ne=(n,e,t,o)=>{for(var r=o>1?void 0:o?Bt(e,t):e,i=n.length-1,a;i>=0;i--)(a=n[i])&&(r=(o?a(e,t,r):a(r))||r);return o&&r&&jt(e,t,r),r};const Nt={success:"✓",error:"✗",warn:"⚠",info:"ℹ",pending:"…"};s.Status=class extends l.LitElement{constructor(){super(...arguments),this.state="",this.message=""}handleEvent(e){if(e.type==="clear"){this.state="",this.message="";return}const t=e.data;t.state!=null&&(this.state=t.state),t.message!=null&&(this.message=t.message)}render(){return this.state?l.html`
      <div class="badge ${this.state}">
        <span class="indicator">${Nt[this.state]??""}</span>
        <span class="message">${this.message}</span>
      </div>
    `:l.html`<div class="empty">No status</div>`}},s.Status.styles=[f,l.css`
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
    `],ne([c({type:String})],s.Status.prototype,"state",2),ne([c({type:String})],s.Status.prototype,"message",2),s.Status=ne([m("tui-status")],s.Status),s.BORDER_CHARS=R,s.STATE_BORDERS=Be,s.ansiToHtml=G,s.getBorderChars=fe,s.parseAreas=_e,s.sharedStyles=f,s.titleDecoration=L,s.tuiToast=ct,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})});
