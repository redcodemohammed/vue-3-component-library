import { shallowRef as wt, unref as Y, shallowReactive as Rt, nextTick as Pt, defineComponent as we, reactive as St, inject as Z, computed as V, h as Fe, provide as fe, ref as Ye, watch as Je, getCurrentInstance as Xe, watchEffect as Nt, openBlock as Ot, createElementBlock as kt, createElementVNode as Ae, renderSlot as Ct, createTextVNode as $t, toDisplayString as At } from "vue";
function xt() {
  return Ze().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Ze() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const It = typeof Proxy == "function", Vt = "devtools-plugin:setup", Tt = "plugin:settings:set";
let K, me;
function Dt() {
  var e;
  return K !== void 0 || (typeof window < "u" && window.performance ? (K = !0, me = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (K = !0, me = global.perf_hooks.performance) : K = !1), K;
}
function jt() {
  return Dt() ? me.now() : Date.now();
}
class Mt {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const f in t.settings) {
        const d = t.settings[f];
        o[f] = d.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let l = Object.assign({}, o);
    try {
      const f = localStorage.getItem(r), d = JSON.parse(f);
      Object.assign(l, d);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return l;
      },
      setSettings(f) {
        try {
          localStorage.setItem(r, JSON.stringify(f));
        } catch {
        }
        l = f;
      },
      now() {
        return jt();
      }
    }, n && n.on(Tt, (f, d) => {
      f === this.plugin.id && this.fallbacks.setSettings(d);
    }), this.proxiedOn = new Proxy({}, {
      get: (f, d) => this.target ? this.target.on[d] : (...c) => {
        this.onQueue.push({
          method: d,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (f, d) => this.target ? this.target[d] : d === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(d) ? (...c) => (this.targetQueue.push({
        method: d,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[d](...c)) : (...c) => new Promise((h) => {
        this.targetQueue.push({
          method: d,
          args: c,
          resolve: h
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function Lt(e, t) {
  const n = e, o = Ze(), r = xt(), l = It && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !l))
    r.emit(Vt, e, t);
  else {
    const f = l ? new Mt(n, r) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: f
    }), f && t(f.proxiedTarget);
  }
}
/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const j = typeof window < "u";
function Ut(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const S = Object.assign;
function de(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = I(r) ? r.map(e) : e(r);
  }
  return n;
}
const J = () => {
}, I = Array.isArray;
function R(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const Bt = /\/$/, Gt = (e) => e.replace(Bt, "");
function he(e, t, n = "/") {
  let o, r = {}, l = "", f = "";
  const d = t.indexOf("#");
  let c = t.indexOf("?");
  return d < c && d >= 0 && (c = -1), c > -1 && (o = t.slice(0, c), l = t.slice(c + 1, d > -1 ? d : t.length), r = e(l)), d > -1 && (o = o || t.slice(0, d), f = t.slice(d, t.length)), o = Wt(o ?? t, n), {
    fullPath: o + (l && "?") + l + f,
    path: o,
    query: r,
    hash: f
  };
}
function Ht(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function xe(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Ie(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && U(t.matched[o], n.matched[r]) && et(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function U(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function et(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!Kt(e[n], t[n]))
      return !1;
  return !0;
}
function Kt(e, t) {
  return I(e) ? Ve(e, t) : I(t) ? Ve(t, e) : e === t;
}
function Ve(e, t) {
  return I(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function Wt(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return R(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let l = n.length - 1, f, d;
  for (f = 0; f < o.length; f++)
    if (d = o[f], d !== ".")
      if (d === "..")
        l > 1 && l--;
      else
        break;
  return n.slice(0, l).join("/") + "/" + o.slice(f - (f === o.length ? 1 : 0)).join("/");
}
var ee;
(function(e) {
  e.pop = "pop", e.push = "push";
})(ee || (ee = {}));
var X;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(X || (X = {}));
function qt(e) {
  if (!e)
    if (j) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Gt(e);
}
const zt = /^[^#]+#/;
function Qt(e, t) {
  return e.replace(zt, "#") + t;
}
function Ft(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const se = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function Yt(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const l = document.querySelector(e.el);
        if (o && l) {
          R(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        R(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const r = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r) {
      process.env.NODE_ENV !== "production" && R(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = Ft(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset);
}
function Te(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const ge = /* @__PURE__ */ new Map();
function Jt(e, t) {
  ge.set(e, t);
}
function Xt(e) {
  const t = ge.get(e);
  return ge.delete(e), t;
}
let Zt = () => location.protocol + "//" + location.host;
function tt(e, t) {
  const { pathname: n, search: o, hash: r } = t, l = e.indexOf("#");
  if (l > -1) {
    let d = r.includes(e.slice(l)) ? e.slice(l).length : 1, c = r.slice(d);
    return c[0] !== "/" && (c = "/" + c), xe(c, "");
  }
  return xe(n, e) + o + r;
}
function en(e, t, n, o) {
  let r = [], l = [], f = null;
  const d = ({ state: u }) => {
    const m = tt(e, location), y = n.value, C = t.value;
    let N = 0;
    if (u) {
      if (n.value = m, t.value = u, f && f === y) {
        f = null;
        return;
      }
      N = C ? u.position - C.position : 0;
    } else
      o(m);
    r.forEach((E) => {
      E(n.value, y, {
        delta: N,
        type: ee.pop,
        direction: N ? N > 0 ? X.forward : X.back : X.unknown
      });
    });
  };
  function c() {
    f = n.value;
  }
  function h(u) {
    r.push(u);
    const m = () => {
      const y = r.indexOf(u);
      y > -1 && r.splice(y, 1);
    };
    return l.push(m), m;
  }
  function s() {
    const { history: u } = window;
    u.state && u.replaceState(S({}, u.state, { scroll: se() }), "");
  }
  function a() {
    for (const u of l)
      u();
    l = [], window.removeEventListener("popstate", d), window.removeEventListener("beforeunload", s);
  }
  return window.addEventListener("popstate", d), window.addEventListener("beforeunload", s, {
    passive: !0
  }), {
    pauseListeners: c,
    listen: h,
    destroy: a
  };
}
function De(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? se() : null
  };
}
function tn(e) {
  const { history: t, location: n } = window, o = {
    value: tt(e, n)
  }, r = { value: t.state };
  r.value || l(o.value, {
    back: null,
    current: o.value,
    forward: null,
    // the length is off by one, we need to decrease it
    position: t.length - 1,
    replaced: !0,
    // don't add a scroll as the user may have an anchor, and we want
    // scrollBehavior to be triggered without a saved position
    scroll: null
  }, !0);
  function l(c, h, s) {
    const a = e.indexOf("#"), u = a > -1 ? (n.host && document.querySelector("base") ? e : e.slice(a)) + c : Zt() + e + c;
    try {
      t[s ? "replaceState" : "pushState"](h, "", u), r.value = h;
    } catch (m) {
      process.env.NODE_ENV !== "production" ? R("Error with push/replace State", m) : console.error(m), n[s ? "replace" : "assign"](u);
    }
  }
  function f(c, h) {
    const s = S({}, t.state, De(
      r.value.back,
      // keep back and forward entries but override current position
      c,
      r.value.forward,
      !0
    ), h, { position: r.value.position });
    l(c, s, !0), o.value = c;
  }
  function d(c, h) {
    const s = S(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      r.value,
      t.state,
      {
        forward: c,
        scroll: se()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && R(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), l(s.current, s, !0);
    const a = S({}, De(o.value, c, null), { position: s.position + 1 }, h);
    l(c, a, !1), o.value = c;
  }
  return {
    location: o,
    state: r,
    push: d,
    replace: f
  };
}
function nn(e) {
  e = qt(e);
  const t = tn(e), n = en(e, t.state, t.location, t.replace);
  function o(l, f = !0) {
    f || n.pauseListeners(), history.go(l);
  }
  const r = S({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: Qt.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function on(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function nt(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const M = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, ve = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var je;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(je || (je = {}));
const rn = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${an(t)}" via a navigation guard.`;
  },
  4({ from: e, to: t }) {
    return `Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`;
  },
  8({ from: e, to: t }) {
    return `Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`;
  },
  16({ from: e, to: t }) {
    return `Avoided redundant navigation to current location: "${e.fullPath}".`;
  }
};
function W(e, t) {
  return process.env.NODE_ENV !== "production" ? S(new Error(rn[e](t)), {
    type: e,
    [ve]: !0
  }, t) : S(new Error(), {
    type: e,
    [ve]: !0
  }, t);
}
function D(e, t) {
  return e instanceof Error && ve in e && (t == null || !!(e.type & t));
}
const sn = ["params", "query", "hash"];
function an(e) {
  if (typeof e == "string")
    return e;
  if ("path" in e)
    return e.path;
  const t = {};
  for (const n of sn)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Me = "[^/]+?", cn = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, ln = /[.+*?^${}()[\]/\\]/g;
function un(e, t) {
  const n = S({}, cn, t), o = [];
  let r = n.start ? "^" : "";
  const l = [];
  for (const h of e) {
    const s = h.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !h.length && (r += "/");
    for (let a = 0; a < h.length; a++) {
      const u = h[a];
      let m = 40 + (n.sensitive ? 0.25 : 0);
      if (u.type === 0)
        a || (r += "/"), r += u.value.replace(ln, "\\$&"), m += 40;
      else if (u.type === 1) {
        const { value: y, repeatable: C, optional: N, regexp: E } = u;
        l.push({
          name: y,
          repeatable: C,
          optional: N
        });
        const b = E || Me;
        if (b !== Me) {
          m += 10;
          try {
            new RegExp(`(${b})`);
          } catch (x) {
            throw new Error(`Invalid custom RegExp for param "${y}" (${b}): ` + x.message);
          }
        }
        let k = C ? `((?:${b})(?:/(?:${b}))*)` : `(${b})`;
        a || (k = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        N && h.length < 2 ? `(?:/${k})` : "/" + k), N && (k += "?"), r += k, m += 20, N && (m += -8), C && (m += -20), b === ".*" && (m += -50);
      }
      s.push(m);
    }
    o.push(s);
  }
  if (n.strict && n.end) {
    const h = o.length - 1;
    o[h][o[h].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && (r += "(?:/|$)");
  const f = new RegExp(r, n.sensitive ? "" : "i");
  function d(h) {
    const s = h.match(f), a = {};
    if (!s)
      return null;
    for (let u = 1; u < s.length; u++) {
      const m = s[u] || "", y = l[u - 1];
      a[y.name] = m && y.repeatable ? m.split("/") : m;
    }
    return a;
  }
  function c(h) {
    let s = "", a = !1;
    for (const u of e) {
      (!a || !s.endsWith("/")) && (s += "/"), a = !1;
      for (const m of u)
        if (m.type === 0)
          s += m.value;
        else if (m.type === 1) {
          const { value: y, repeatable: C, optional: N } = m, E = y in h ? h[y] : "";
          if (I(E) && !C)
            throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const b = I(E) ? E.join("/") : E;
          if (!b)
            if (N)
              u.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : a = !0);
            else
              throw new Error(`Missing required param "${y}"`);
          s += b;
        }
    }
    return s || "/";
  }
  return {
    re: f,
    score: o,
    keys: l,
    parse: d,
    stringify: c
  };
}
function fn(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 40 + 40 ? 1 : -1 : 0;
}
function dn(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const l = fn(o[n], r[n]);
    if (l)
      return l;
    n++;
  }
  if (Math.abs(r.length - o.length) === 1) {
    if (Le(o))
      return 1;
    if (Le(r))
      return -1;
  }
  return r.length - o.length;
}
function Le(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const hn = {
  type: 0,
  value: ""
}, pn = /[a-zA-Z0-9_]/;
function mn(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[hn]];
  if (!e.startsWith("/"))
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${n})/"${h}": ${m}`);
  }
  let n = 0, o = n;
  const r = [];
  let l;
  function f() {
    l && r.push(l), l = [];
  }
  let d = 0, c, h = "", s = "";
  function a() {
    h && (n === 0 ? l.push({
      type: 0,
      value: h
    }) : n === 1 || n === 2 || n === 3 ? (l.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), l.push({
      type: 1,
      value: h,
      regexp: s,
      repeatable: c === "*" || c === "+",
      optional: c === "*" || c === "?"
    })) : t("Invalid state to consume buffer"), h = "");
  }
  function u() {
    h += c;
  }
  for (; d < e.length; ) {
    if (c = e[d++], c === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (h && a(), f()) : c === ":" ? (a(), n = 1) : u();
        break;
      case 4:
        u(), n = o;
        break;
      case 1:
        c === "(" ? n = 2 : pn.test(c) ? u() : (a(), n = 0, c !== "*" && c !== "?" && c !== "+" && d--);
        break;
      case 2:
        c === ")" ? s[s.length - 1] == "\\" ? s = s.slice(0, -1) + c : n = 3 : s += c;
        break;
      case 3:
        a(), n = 0, c !== "*" && c !== "?" && c !== "+" && d--, s = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${h}"`), a(), f(), r;
}
function gn(e, t, n) {
  const o = un(mn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const l = /* @__PURE__ */ new Set();
    for (const f of o.keys)
      l.has(f.name) && R(`Found duplicated params with name "${f.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), l.add(f.name);
  }
  const r = S(o, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function vn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = Ge({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function l(s, a, u) {
    const m = !u, y = yn(s);
    process.env.NODE_ENV !== "production" && wn(y, a), y.aliasOf = u && u.record;
    const C = Ge(t, s), N = [
      y
    ];
    if ("alias" in s) {
      const k = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const x of k)
        N.push(S({}, y, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: u ? u.record.components : y.components,
          path: x,
          // we might be the child of an alias
          aliasOf: u ? u.record : y
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let E, b;
    for (const k of N) {
      const { path: x } = k;
      if (a && x[0] !== "/") {
        const B = a.record.path, T = B[B.length - 1] === "/" ? "" : "/";
        k.path = a.record.path + (x && T + x);
      }
      if (process.env.NODE_ENV !== "production" && k.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (E = gn(k, a, C), process.env.NODE_ENV !== "production" && a && x[0] === "/" && Rn(E, a), u ? (u.alias.push(E), process.env.NODE_ENV !== "production" && bn(u, E)) : (b = b || E, b !== E && b.alias.push(E), m && s.name && !Be(E) && f(s.name)), y.children) {
        const B = y.children;
        for (let T = 0; T < B.length; T++)
          l(B[T], E, u && u.children[T]);
      }
      u = u || E, (E.record.components && Object.keys(E.record.components).length || E.record.name || E.record.redirect) && c(E);
    }
    return b ? () => {
      f(b);
    } : J;
  }
  function f(s) {
    if (nt(s)) {
      const a = o.get(s);
      a && (o.delete(s), n.splice(n.indexOf(a), 1), a.children.forEach(f), a.alias.forEach(f));
    } else {
      const a = n.indexOf(s);
      a > -1 && (n.splice(a, 1), s.record.name && o.delete(s.record.name), s.children.forEach(f), s.alias.forEach(f));
    }
  }
  function d() {
    return n;
  }
  function c(s) {
    let a = 0;
    for (; a < n.length && dn(s, n[a]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (s.record.path !== n[a].record.path || !ot(s, n[a])); )
      a++;
    n.splice(a, 0, s), s.record.name && !Be(s) && o.set(s.record.name, s);
  }
  function h(s, a) {
    let u, m = {}, y, C;
    if ("name" in s && s.name) {
      if (u = o.get(s.name), !u)
        throw W(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const b = Object.keys(s.params || {}).filter((k) => !u.keys.find((x) => x.name === k));
        b.length && R(`Discarded invalid param(s) "${b.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      C = u.record.name, m = S(
        // paramsFromLocation is a new object
        Ue(
          a.params,
          // only keep params that exist in the resolved location
          // TODO: only keep optional params coming from a parent record
          u.keys.filter((b) => !b.optional).map((b) => b.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        s.params && Ue(s.params, u.keys.map((b) => b.name))
      ), y = u.stringify(m);
    } else if ("path" in s)
      y = s.path, process.env.NODE_ENV !== "production" && !y.startsWith("/") && R(`The Matcher cannot resolve relative paths but received "${y}". Unless you directly called \`matcher.resolve("${y}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), u = n.find((b) => b.re.test(y)), u && (m = u.parse(y), C = u.record.name);
    else {
      if (u = a.name ? o.get(a.name) : n.find((b) => b.re.test(a.path)), !u)
        throw W(1, {
          location: s,
          currentLocation: a
        });
      C = u.record.name, m = S({}, a.params, s.params), y = u.stringify(m);
    }
    const N = [];
    let E = u;
    for (; E; )
      N.unshift(E.record), E = E.parent;
    return {
      name: C,
      path: y,
      params: m,
      matched: N,
      meta: _n(N)
    };
  }
  return e.forEach((s) => l(s)), { addRoute: l, resolve: h, removeRoute: f, getRoutes: d, getRecordMatcher: r };
}
function Ue(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function yn(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: En(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function En(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const o in e.components)
      t[o] = typeof n == "object" ? n[o] : n;
  return t;
}
function Be(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function _n(e) {
  return e.reduce((t, n) => S(t, n.meta), {});
}
function Ge(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function ye(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function bn(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(ye.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(ye.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function wn(e, t) {
  t && t.record.name && !e.name && !e.path && R(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function Rn(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(ye.bind(null, n)))
      return R(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function ot(e, t) {
  return t.children.some((n) => n === e || ot(e, n));
}
const rt = /#/g, Pn = /&/g, Sn = /\//g, Nn = /=/g, On = /\?/g, st = /\+/g, kn = /%5B/g, Cn = /%5D/g, it = /%5E/g, $n = /%60/g, at = /%7B/g, An = /%7C/g, ct = /%7D/g, xn = /%20/g;
function Re(e) {
  return encodeURI("" + e).replace(An, "|").replace(kn, "[").replace(Cn, "]");
}
function In(e) {
  return Re(e).replace(at, "{").replace(ct, "}").replace(it, "^");
}
function Ee(e) {
  return Re(e).replace(st, "%2B").replace(xn, "+").replace(rt, "%23").replace(Pn, "%26").replace($n, "`").replace(at, "{").replace(ct, "}").replace(it, "^");
}
function Vn(e) {
  return Ee(e).replace(Nn, "%3D");
}
function Tn(e) {
  return Re(e).replace(rt, "%23").replace(On, "%3F");
}
function Dn(e) {
  return e == null ? "" : Tn(e).replace(Sn, "%2F");
}
function te(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && R(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
function jn(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const l = o[r].replace(st, " "), f = l.indexOf("="), d = te(f < 0 ? l : l.slice(0, f)), c = f < 0 ? null : te(l.slice(f + 1));
    if (d in t) {
      let h = t[d];
      I(h) || (h = t[d] = [h]), h.push(c);
    } else
      t[d] = c;
  }
  return t;
}
function He(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = Vn(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (I(o) ? o.map((l) => l && Ee(l)) : [o && Ee(o)]).forEach((l) => {
      l !== void 0 && (t += (t.length ? "&" : "") + n, l != null && (t += "=" + l));
    });
  }
  return t;
}
function Mn(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = I(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const Ln = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), Ke = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Pe = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), lt = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), _e = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function Q() {
  let e = [];
  function t(o) {
    return e.push(o), () => {
      const r = e.indexOf(o);
      r > -1 && e.splice(r, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  };
}
function L(e, t, n, o, r) {
  const l = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((f, d) => {
    const c = (a) => {
      a === !1 ? d(W(4, {
        from: n,
        to: t
      })) : a instanceof Error ? d(a) : on(a) ? d(W(2, {
        from: t,
        to: a
      })) : (l && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === l && typeof a == "function" && l.push(a), f());
    }, h = e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? Un(c, t, n) : c);
    let s = Promise.resolve(h);
    if (e.length < 3 && (s = s.then(c)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof h == "object" && "then" in h)
        s = s.then((u) => c._called ? u : (R(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (h !== void 0 && !c._called) {
        R(a), d(new Error("Invalid navigation guard"));
        return;
      }
    }
    s.catch((a) => d(a));
  });
}
function Un(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && R(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function pe(e, t, n, o) {
  const r = [];
  for (const l of e) {
    process.env.NODE_ENV !== "production" && !l.components && !l.children.length && R(`Record with path "${l.path}" is either missing a "component(s)" or "children" property.`);
    for (const f in l.components) {
      let d = l.components[f];
      if (process.env.NODE_ENV !== "production") {
        if (!d || typeof d != "object" && typeof d != "function")
          throw R(`Component "${f}" in record with path "${l.path}" is not a valid component. Received "${String(d)}".`), new Error("Invalid route component");
        if ("then" in d) {
          R(`Component "${f}" in record with path "${l.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const c = d;
          d = () => c;
        } else
          d.__asyncLoader && // warn only once per component
          !d.__warnedDefineAsync && (d.__warnedDefineAsync = !0, R(`Component "${f}" in record with path "${l.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !l.instances[f]))
        if (Bn(d)) {
          const h = (d.__vccOpts || d)[t];
          h && r.push(L(h, n, o, l, f));
        } else {
          let c = d();
          process.env.NODE_ENV !== "production" && !("catch" in c) && (R(`Component "${f}" in record with path "${l.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), c = Promise.resolve(c)), r.push(() => c.then((h) => {
            if (!h)
              return Promise.reject(new Error(`Couldn't resolve component "${f}" at "${l.path}"`));
            const s = Ut(h) ? h.default : h;
            l.components[f] = s;
            const u = (s.__vccOpts || s)[t];
            return u && L(u, n, o, l, f)();
          }));
        }
    }
  }
  return r;
}
function Bn(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function We(e) {
  const t = Z(Pe), n = Z(lt), o = V(() => t.resolve(Y(e.to))), r = V(() => {
    const { matched: c } = o.value, { length: h } = c, s = c[h - 1], a = n.matched;
    if (!s || !a.length)
      return -1;
    const u = a.findIndex(U.bind(null, s));
    if (u > -1)
      return u;
    const m = qe(c[h - 2]);
    return (
      // we are dealing with nested routes
      h > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      qe(s) === m && // avoid comparing the child with its parent
      a[a.length - 1].path !== m ? a.findIndex(U.bind(null, c[h - 2])) : u
    );
  }), l = V(() => r.value > -1 && Wn(n.params, o.value.params)), f = V(() => r.value > -1 && r.value === n.matched.length - 1 && et(n.params, o.value.params));
  function d(c = {}) {
    return Kn(c) ? t[Y(e.replace) ? "replace" : "push"](
      Y(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(J) : Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && j) {
    const c = Xe();
    if (c) {
      const h = {
        route: o.value,
        isActive: l.value,
        isExactActive: f.value
      };
      c.__vrl_devtools = c.__vrl_devtools || [], c.__vrl_devtools.push(h), Nt(() => {
        h.route = o.value, h.isActive = l.value, h.isExactActive = f.value;
      }, { flush: "post" });
    }
  }
  return {
    route: o,
    href: V(() => o.value.href),
    isActive: l,
    isExactActive: f,
    navigate: d
  };
}
const Gn = /* @__PURE__ */ we({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: We,
  setup(e, { slots: t }) {
    const n = St(We(e)), { options: o } = Z(Pe), r = V(() => ({
      [ze(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [ze(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const l = t.default && t.default(n);
      return e.custom ? l : Fe("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, l);
    };
  }
}), Hn = Gn;
function Kn(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Wn(e, t) {
  for (const n in t) {
    const o = t[n], r = e[n];
    if (typeof o == "string") {
      if (o !== r)
        return !1;
    } else if (!I(r) || r.length !== o.length || o.some((l, f) => l !== r[f]))
      return !1;
  }
  return !0;
}
function qe(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const ze = (e, t, n) => e ?? t ?? n, qn = /* @__PURE__ */ we({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    process.env.NODE_ENV !== "production" && Qn();
    const o = Z(_e), r = V(() => e.route || o.value), l = Z(Ke, 0), f = V(() => {
      let h = Y(l);
      const { matched: s } = r.value;
      let a;
      for (; (a = s[h]) && !a.components; )
        h++;
      return h;
    }), d = V(() => r.value.matched[f.value]);
    fe(Ke, V(() => f.value + 1)), fe(Ln, d), fe(_e, r);
    const c = Ye();
    return Je(() => [c.value, d.value, e.name], ([h, s, a], [u, m, y]) => {
      s && (s.instances[a] = h, m && m !== s && h && h === u && (s.leaveGuards.size || (s.leaveGuards = m.leaveGuards), s.updateGuards.size || (s.updateGuards = m.updateGuards))), h && s && // if there is no instance but to and from are the same this might be
      // the first visit
      (!m || !U(s, m) || !u) && (s.enterCallbacks[a] || []).forEach((C) => C(h));
    }, { flush: "post" }), () => {
      const h = r.value, s = e.name, a = d.value, u = a && a.components[s];
      if (!u)
        return Qe(n.default, { Component: u, route: h });
      const m = a.props[s], y = m ? m === !0 ? h.params : typeof m == "function" ? m(h) : m : null, N = Fe(u, S({}, y, t, {
        onVnodeUnmounted: (E) => {
          E.component.isUnmounted && (a.instances[s] = null);
        },
        ref: c
      }));
      if (process.env.NODE_ENV !== "production" && j && N.ref) {
        const E = {
          depth: f.value,
          name: a.name,
          path: a.path,
          meta: a.meta
        };
        (I(N.ref) ? N.ref.map((k) => k.i) : [N.ref.i]).forEach((k) => {
          k.__vrv_devtools = E;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        Qe(n.default, { Component: N, route: h }) || N
      );
    };
  }
});
function Qe(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const zn = qn;
function Qn() {
  const e = Xe(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const o = t === "KeepAlive" ? "keep-alive" : "transition";
    R(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${o}>
    <component :is="Component" />
  </${o}>
</router-view>`);
  }
}
function F(e, t) {
  const n = S({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => oo(o, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: !0,
      display: e.fullPath,
      tooltip: t,
      value: n
    }
  };
}
function re(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let Fn = 0;
function Yn(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = Fn++;
  Lt({
    id: "org.vuejs.router" + (o ? "." + o : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (r) => {
    typeof r.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), r.on.inspectComponent((s, a) => {
      s.instanceData && s.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: F(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: s, componentInstance: a }) => {
      if (a.__vrv_devtools) {
        const u = a.__vrv_devtools;
        s.tags.push({
          label: (u.name ? `${u.name.toString()}: ` : "") + u.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: ut
        });
      }
      I(a.__vrl_devtools) && (a.__devtoolsApi = r, a.__vrl_devtools.forEach((u) => {
        let m = ht, y = "";
        u.isExactActive ? (m = dt, y = "This is exactly active") : u.isActive && (m = ft, y = "This link is active"), s.tags.push({
          label: u.route.path,
          textColor: 0,
          tooltip: y,
          backgroundColor: m
        });
      }));
    }), Je(t.currentRoute, () => {
      c(), r.notifyComponentUpdate(), r.sendInspectorTree(d), r.sendInspectorState(d);
    });
    const l = "router:navigations:" + o;
    r.addTimelineLayer({
      id: l,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((s, a) => {
      r.addTimelineEvent({
        layerId: l,
        event: {
          title: "Error during Navigation",
          subtitle: a.fullPath,
          logType: "error",
          time: r.now(),
          data: { error: s },
          groupId: a.meta.__navigationId
        }
      });
    });
    let f = 0;
    t.beforeEach((s, a) => {
      const u = {
        guard: re("beforeEach"),
        from: F(a, "Current Location during this navigation"),
        to: F(s, "Target location")
      };
      Object.defineProperty(s.meta, "__navigationId", {
        value: f++
      }), r.addTimelineEvent({
        layerId: l,
        event: {
          time: r.now(),
          title: "Start of navigation",
          subtitle: s.fullPath,
          data: u,
          groupId: s.meta.__navigationId
        }
      });
    }), t.afterEach((s, a, u) => {
      const m = {
        guard: re("afterEach")
      };
      u ? (m.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: u ? u.message : "",
          tooltip: "Navigation Failure",
          value: u
        }
      }, m.status = re("❌")) : m.status = re("✅"), m.from = F(a, "Current Location during this navigation"), m.to = F(s, "Target location"), r.addTimelineEvent({
        layerId: l,
        event: {
          title: "End of navigation",
          subtitle: s.fullPath,
          time: r.now(),
          data: m,
          logType: u ? "warning" : "default",
          groupId: s.meta.__navigationId
        }
      });
    });
    const d = "router-inspector:" + o;
    r.addInspector({
      id: d,
      label: "Routes" + (o ? " " + o : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function c() {
      if (!h)
        return;
      const s = h;
      let a = n.getRoutes().filter((u) => !u.parent);
      a.forEach(gt), s.filter && (a = a.filter((u) => (
        // save matches state based on the payload
        be(u, s.filter.toLowerCase())
      ))), a.forEach((u) => mt(u, t.currentRoute.value)), s.rootNodes = a.map(pt);
    }
    let h;
    r.on.getInspectorTree((s) => {
      h = s, s.app === e && s.inspectorId === d && c();
    }), r.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === d) {
        const u = n.getRoutes().find((m) => m.record.__vd_id === s.nodeId);
        u && (s.state = {
          options: Xn(u)
        });
      }
    }), r.sendInspectorTree(d), r.sendInspectorState(d);
  });
}
function Jn(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function Xn(e) {
  const { record: t } = e, n = [
    { editable: !1, key: "path", value: t.path }
  ];
  return t.name != null && n.push({
    editable: !1,
    key: "name",
    value: t.name
  }), n.push({ editable: !1, key: "regexp", value: e.re }), e.keys.length && n.push({
    editable: !1,
    key: "keys",
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.keys.map((o) => `${o.name}${Jn(o)}`).join(" "),
        tooltip: "Param keys",
        value: e.keys
      }
    }
  }), t.redirect != null && n.push({
    editable: !1,
    key: "redirect",
    value: t.redirect
  }), e.alias.length && n.push({
    editable: !1,
    key: "aliases",
    value: e.alias.map((o) => o.record.path)
  }), Object.keys(e.record.meta).length && n.push({
    editable: !1,
    key: "meta",
    value: e.record.meta
  }), n.push({
    key: "score",
    editable: !1,
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.score.map((o) => o.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: e.score
      }
    }
  }), n;
}
const ut = 15485081, ft = 2450411, dt = 8702998, Zn = 2282478, ht = 16486972, eo = 6710886;
function pt(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: Zn
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: ht
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: ut
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: dt
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: ft
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: eo
  });
  let o = n.__vd_id;
  return o == null && (o = String(to++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(pt)
  };
}
let to = 0;
const no = /^\/(.*)\/([a-z]*)$/;
function mt(e, t) {
  const n = t.matched.length && U(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => U(o, e.record))), e.children.forEach((o) => mt(o, t));
}
function gt(e) {
  e.__vd_match = !1, e.children.forEach(gt);
}
function be(e, t) {
  const n = String(e.re).match(no);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((f) => be(f, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), l = te(r);
  return !t.startsWith("/") && (l.includes(t) || r.includes(t)) || l.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((f) => be(f, t));
}
function oo(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function ro(e) {
  const t = vn(e.routes, e), n = e.parseQuery || jn, o = e.stringifyQuery || He, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const l = Q(), f = Q(), d = Q(), c = wt(M);
  let h = M;
  j && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = de.bind(null, (i) => "" + i), a = de.bind(null, Dn), u = (
    // @ts-expect-error: intentionally avoid the type check
    de.bind(null, te)
  );
  function m(i, g) {
    let p, v;
    return nt(i) ? (p = t.getRecordMatcher(i), v = g) : v = i, t.addRoute(v, p);
  }
  function y(i) {
    const g = t.getRecordMatcher(i);
    g ? t.removeRoute(g) : process.env.NODE_ENV !== "production" && R(`Cannot remove non-existent route "${String(i)}"`);
  }
  function C() {
    return t.getRoutes().map((i) => i.record);
  }
  function N(i) {
    return !!t.getRecordMatcher(i);
  }
  function E(i, g) {
    if (g = S({}, g || c.value), typeof i == "string") {
      const _ = he(n, i, g.path), O = t.resolve({ path: _.path }, g), G = r.createHref(_.fullPath);
      return process.env.NODE_ENV !== "production" && (G.startsWith("//") ? R(`Location "${i}" resolved to "${G}". A resolved location cannot start with multiple slashes.`) : O.matched.length || R(`No match found for location with path "${i}"`)), S(_, O, {
        params: u(O.params),
        hash: te(_.hash),
        redirectedFrom: void 0,
        href: G
      });
    }
    let p;
    if ("path" in i)
      process.env.NODE_ENV !== "production" && "params" in i && !("name" in i) && // @ts-expect-error: the type is never
      Object.keys(i.params).length && R(`Path "${i.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), p = S({}, i, {
        path: he(n, i.path, g.path).path
      });
    else {
      const _ = S({}, i.params);
      for (const O in _)
        _[O] == null && delete _[O];
      p = S({}, i, {
        params: a(_)
      }), g.params = a(g.params);
    }
    const v = t.resolve(p, g), P = i.hash || "";
    process.env.NODE_ENV !== "production" && P && !P.startsWith("#") && R(`A \`hash\` should always start with the character "#". Replace "${P}" with "#${P}".`), v.params = s(u(v.params));
    const $ = Ht(o, S({}, i, {
      hash: In(P),
      path: v.path
    })), w = r.createHref($);
    return process.env.NODE_ENV !== "production" && (w.startsWith("//") ? R(`Location "${i}" resolved to "${w}". A resolved location cannot start with multiple slashes.`) : v.matched.length || R(`No match found for location with path "${"path" in i ? i.path : i}"`)), S({
      fullPath: $,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: P,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === He ? Mn(i.query) : i.query || {}
      )
    }, v, {
      redirectedFrom: void 0,
      href: w
    });
  }
  function b(i) {
    return typeof i == "string" ? he(n, i, c.value.path) : S({}, i);
  }
  function k(i, g) {
    if (h !== i)
      return W(8, {
        from: g,
        to: i
      });
  }
  function x(i) {
    return q(i);
  }
  function B(i) {
    return x(S(b(i), { replace: !0 }));
  }
  function T(i) {
    const g = i.matched[i.matched.length - 1];
    if (g && g.redirect) {
      const { redirect: p } = g;
      let v = typeof p == "function" ? p(i) : p;
      if (typeof v == "string" && (v = v.includes("?") || v.includes("#") ? v = b(v) : (
        // force empty params
        { path: v }
      ), v.params = {}), process.env.NODE_ENV !== "production" && !("path" in v) && !("name" in v))
        throw R(`Invalid redirect found:
${JSON.stringify(v, null, 2)}
 when navigating to "${i.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return S({
        query: i.query,
        hash: i.hash,
        // avoid transferring params if the redirect has a path
        params: "path" in v ? {} : i.params
      }, v);
    }
  }
  function q(i, g) {
    const p = h = E(i), v = c.value, P = i.state, $ = i.force, w = i.replace === !0, _ = T(p);
    if (_)
      return q(
        S(b(_), {
          state: typeof _ == "object" ? S({}, P, _.state) : P,
          force: $,
          replace: w
        }),
        // keep original redirectedFrom if it exists
        g || p
      );
    const O = p;
    O.redirectedFrom = g;
    let G;
    return !$ && Ie(o, v, p) && (G = W(16, { to: O, from: v }), $e(
      v,
      v,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (G ? Promise.resolve(G) : Ne(O, v)).catch((A) => D(A) ? (
      // navigation redirects still mark the router as ready
      D(
        A,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? A : ce(A)
    ) : (
      // reject any unknown error
      ae(A, O, v)
    )).then((A) => {
      if (A) {
        if (D(
          A,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          Ie(o, E(A.to), O) && // and we have done it a couple of times
          g && // @ts-expect-error: added only in dev
          (g._count = g._count ? (
            // @ts-expect-error
            g._count + 1
          ) : 1) > 30 ? (R(`Detected a possibly infinite redirection in a navigation guard when going from "${v.fullPath}" to "${O.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : q(
            // keep options
            S({
              // preserve an existing replacement but allow the redirect to override it
              replace: w
            }, b(A.to), {
              state: typeof A.to == "object" ? S({}, P, A.to.state) : P,
              force: $
            }),
            // preserve the original redirectedFrom if any
            g || O
          );
      } else
        A = ke(O, v, !0, w, P);
      return Oe(O, v, A), A;
    });
  }
  function yt(i, g) {
    const p = k(i, g);
    return p ? Promise.reject(p) : Promise.resolve();
  }
  function Se(i) {
    const g = oe.values().next().value;
    return g && typeof g.runWithContext == "function" ? g.runWithContext(i) : i();
  }
  function Ne(i, g) {
    let p;
    const [v, P, $] = so(i, g);
    p = pe(v.reverse(), "beforeRouteLeave", i, g);
    for (const _ of v)
      _.leaveGuards.forEach((O) => {
        p.push(L(O, i, g));
      });
    const w = yt.bind(null, i, g);
    return p.push(w), H(p).then(() => {
      p = [];
      for (const _ of l.list())
        p.push(L(_, i, g));
      return p.push(w), H(p);
    }).then(() => {
      p = pe(P, "beforeRouteUpdate", i, g);
      for (const _ of P)
        _.updateGuards.forEach((O) => {
          p.push(L(O, i, g));
        });
      return p.push(w), H(p);
    }).then(() => {
      p = [];
      for (const _ of $)
        if (_.beforeEnter)
          if (I(_.beforeEnter))
            for (const O of _.beforeEnter)
              p.push(L(O, i, g));
          else
            p.push(L(_.beforeEnter, i, g));
      return p.push(w), H(p);
    }).then(() => (i.matched.forEach((_) => _.enterCallbacks = {}), p = pe($, "beforeRouteEnter", i, g), p.push(w), H(p))).then(() => {
      p = [];
      for (const _ of f.list())
        p.push(L(_, i, g));
      return p.push(w), H(p);
    }).catch((_) => D(
      _,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? _ : Promise.reject(_));
  }
  function Oe(i, g, p) {
    d.list().forEach((v) => Se(() => v(i, g, p)));
  }
  function ke(i, g, p, v, P) {
    const $ = k(i, g);
    if ($)
      return $;
    const w = g === M, _ = j ? history.state : {};
    p && (v || w ? r.replace(i.fullPath, S({
      scroll: w && _ && _.scroll
    }, P)) : r.push(i.fullPath, P)), c.value = i, $e(i, g, p, w), ce();
  }
  let z;
  function Et() {
    z || (z = r.listen((i, g, p) => {
      const v = E(i), P = T(v);
      if (P) {
        q(S(P, { replace: !0 }), v).catch(J);
        return;
      }
      h = v;
      const $ = c.value;
      j && Jt(Te($.fullPath, p.delta), se()), Ne(v, $).catch((w) => D(
        w,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? w : D(
        w,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (q(
        w.to,
        v
        // avoid an uncaught rejection, let push call triggerError
      ).then((_) => {
        D(
          _,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !p.delta && p.type === ee.pop && r.go(-1, !1);
      }).catch(J), Promise.reject()) : (p.delta && r.go(-p.delta, !1), ae(w, v, $))).then((w) => {
        w = w || ke(
          // after navigation, all matched components are resolved
          v,
          $,
          !1
        ), w && (p.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !D(
          w,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-p.delta, !1) : p.type === ee.pop && D(
          w,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Oe(v, $, w);
      }).catch(J);
    }));
  }
  let ie = Q(), Ce = Q(), ne;
  function ae(i, g, p) {
    ce(i);
    const v = Ce.list();
    return v.length ? v.forEach((P) => P(i, g, p)) : (process.env.NODE_ENV !== "production" && R("uncaught error during route navigation:"), console.error(i)), Promise.reject(i);
  }
  function _t() {
    return ne && c.value !== M ? Promise.resolve() : new Promise((i, g) => {
      ie.add([i, g]);
    });
  }
  function ce(i) {
    return ne || (ne = !i, Et(), ie.list().forEach(([g, p]) => i ? p(i) : g()), ie.reset()), i;
  }
  function $e(i, g, p, v) {
    const { scrollBehavior: P } = e;
    if (!j || !P)
      return Promise.resolve();
    const $ = !p && Xt(Te(i.fullPath, 0)) || (v || !p) && history.state && history.state.scroll || null;
    return Pt().then(() => P(i, g, $)).then((w) => w && Yt(w)).catch((w) => ae(w, i, g));
  }
  const le = (i) => r.go(i);
  let ue;
  const oe = /* @__PURE__ */ new Set(), bt = {
    currentRoute: c,
    listening: !0,
    addRoute: m,
    removeRoute: y,
    hasRoute: N,
    getRoutes: C,
    resolve: E,
    options: e,
    push: x,
    replace: B,
    go: le,
    back: () => le(-1),
    forward: () => le(1),
    beforeEach: l.add,
    beforeResolve: f.add,
    afterEach: d.add,
    onError: Ce.add,
    isReady: _t,
    install(i) {
      const g = this;
      i.component("RouterLink", Hn), i.component("RouterView", zn), i.config.globalProperties.$router = g, Object.defineProperty(i.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Y(c)
      }), j && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !ue && c.value === M && (ue = !0, x(r.location).catch((P) => {
        process.env.NODE_ENV !== "production" && R("Unexpected error when starting the router:", P);
      }));
      const p = {};
      for (const P in M)
        Object.defineProperty(p, P, {
          get: () => c.value[P],
          enumerable: !0
        });
      i.provide(Pe, g), i.provide(lt, Rt(p)), i.provide(_e, c);
      const v = i.unmount;
      oe.add(i), i.unmount = function() {
        oe.delete(i), oe.size < 1 && (h = M, z && z(), z = null, c.value = M, ue = !1, ne = !1), v();
      }, process.env.NODE_ENV !== "production" && j && Yn(i, g, t);
    }
  };
  function H(i) {
    return i.reduce((g, p) => g.then(() => Se(p)), Promise.resolve());
  }
  return bt;
}
function so(e, t) {
  const n = [], o = [], r = [], l = Math.max(t.matched.length, e.matched.length);
  for (let f = 0; f < l; f++) {
    const d = t.matched[f];
    d && (e.matched.find((h) => U(h, d)) ? o.push(d) : n.push(d));
    const c = e.matched[f];
    c && (t.matched.find((h) => U(h, c)) || r.push(c));
  }
  return [n, o, r];
}
const vt = [
  { path: "/", component: () => import("./Home-d27e48f9.mjs"), name: "home" },
  { path: "/about", component: () => import("./About-ec0d9670.mjs"), name: "about" }
], io = (e = "") => ro({
  history: nn(),
  routes: vt.map((t) => (t.path = e + t.path, t))
}), mo = () => {
  const e = Ye(0);
  return {
    counter: e,
    decrease: () => e.value--,
    increase: () => e.value++
  };
}, ao = { class: "input-container" }, co = ["for"], lo = ["id", "name", "value"], uo = /* @__PURE__ */ we({
  __name: "BetterInput",
  props: {
    label: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(e) {
    return (t, n) => (Ot(), kt("div", ao, [
      Ae("label", {
        class: "input-label",
        for: t.label
      }, [
        Ct(t.$slots, "default", {}, void 0, !0),
        $t(" " + At(t.label), 1)
      ], 8, co),
      Ae("input", {
        id: t.label,
        class: "input",
        name: t.label,
        value: t.modelValue,
        onInput: n[0] || (n[0] = (o) => t.$emit("update:modelValue", o.target.value))
      }, null, 40, lo)
    ]));
  }
});
const fo = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, ho = /* @__PURE__ */ fo(uo, [["__scopeId", "data-v-52b8f1ca"]]), go = {
  install(e, t = { baseUrl: "/app1" }) {
    if (e.component("better-input", ho), !e.config.globalProperties.$router)
      e.use(io(t.baseUrl));
    else {
      const n = e.config.globalProperties.$router;
      vt.forEach((o) => {
        o.path = t.baseUrl + o.path, n.addRoute(o);
      });
    }
  }
};
export {
  go as default,
  mo as useCounter
};
