const xe = {
  type: "logger",
  log(n) {
    this.output("log", n);
  },
  warn(n) {
    this.output("warn", n);
  },
  error(n) {
    this.output("error", n);
  },
  output(n, e) {
    console && console[n] && console[n].apply(console, e);
  }
};
class V {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(e, t);
  }
  init(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.prefix = t.prefix || "i18next:", this.logger = e || xe, this.options = t, this.debug = t.debug;
  }
  log() {
    for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++)
      t[u] = arguments[u];
    return this.forward(t, "log", "", !0);
  }
  warn() {
    for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++)
      t[u] = arguments[u];
    return this.forward(t, "warn", "", !0);
  }
  error() {
    for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++)
      t[u] = arguments[u];
    return this.forward(t, "error", "");
  }
  deprecate() {
    for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++)
      t[u] = arguments[u];
    return this.forward(t, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(e, t, u, s) {
    return s && !this.debug ? null : (typeof e[0] == "string" && (e[0] = `${u}${this.prefix} ${e[0]}`), this.logger[t](e));
  }
  create(e) {
    return new V(this.logger, {
      prefix: `${this.prefix}:${e}:`,
      ...this.options
    });
  }
  clone(e) {
    return e = e || this.options, e.prefix = e.prefix || this.prefix, new V(this.logger, e);
  }
}
var S = new V();
class J {
  constructor() {
    this.observers = {};
  }
  on(e, t) {
    return e.split(" ").forEach((u) => {
      this.observers[u] = this.observers[u] || [], this.observers[u].push(t);
    }), this;
  }
  off(e, t) {
    if (this.observers[e]) {
      if (!t) {
        delete this.observers[e];
        return;
      }
      this.observers[e] = this.observers[e].filter((u) => u !== t);
    }
  }
  emit(e) {
    for (var t = arguments.length, u = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
      u[s - 1] = arguments[s];
    this.observers[e] && [].concat(this.observers[e]).forEach((r) => {
      r(...u);
    }), this.observers["*"] && [].concat(this.observers["*"]).forEach((r) => {
      r.apply(r, [e, ...u]);
    });
  }
}
function P() {
  let n, e;
  const t = new Promise((u, s) => {
    n = u, e = s;
  });
  return t.resolve = n, t.reject = e, t;
}
function ie(n) {
  return n == null ? "" : "" + n;
}
function Se(n, e, t) {
  n.forEach((u) => {
    e[u] && (t[u] = e[u]);
  });
}
function G(n, e, t) {
  function u(r) {
    return r && r.indexOf("###") > -1 ? r.replace(/###/g, ".") : r;
  }
  function s() {
    return !n || typeof n == "string";
  }
  const i = typeof e != "string" ? [].concat(e) : e.split(".");
  for (; i.length > 1; ) {
    if (s())
      return {};
    const r = u(i.shift());
    !n[r] && t && (n[r] = new t()), Object.prototype.hasOwnProperty.call(n, r) ? n = n[r] : n = {};
  }
  return s() ? {} : {
    obj: n,
    k: u(i.shift())
  };
}
function re(n, e, t) {
  const {
    obj: u,
    k: s
  } = G(n, e, Object);
  u[s] = t;
}
function Ae(n, e, t, u) {
  const {
    obj: s,
    k: i
  } = G(n, e, Object);
  s[i] = s[i] || [], u && (s[i] = s[i].concat(t)), u || s[i].push(t);
}
function K(n, e) {
  const {
    obj: t,
    k: u
  } = G(n, e);
  if (t)
    return t[u];
}
function ve(n, e, t) {
  const u = K(n, t);
  return u !== void 0 ? u : K(e, t);
}
function he(n, e, t) {
  for (const u in e)
    u !== "__proto__" && u !== "constructor" && (u in n ? typeof n[u] == "string" || n[u] instanceof String || typeof e[u] == "string" || e[u] instanceof String ? t && (n[u] = e[u]) : he(n[u], e[u], t) : n[u] = e[u]);
  return n;
}
function O(n) {
  return n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var Le = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function Oe(n) {
  return typeof n == "string" ? n.replace(/[&<>"'\/]/g, (e) => Le[e]) : n;
}
const we = [" ", ",", "?", "!", ";"];
function Ne(n, e, t) {
  e = e || "", t = t || "";
  const u = we.filter((r) => e.indexOf(r) < 0 && t.indexOf(r) < 0);
  if (u.length === 0)
    return !0;
  const s = new RegExp(`(${u.map((r) => r === "?" ? "\\?" : r).join("|")})`);
  let i = !s.test(n);
  if (!i) {
    const r = n.indexOf(t);
    r > 0 && !s.test(n.substring(0, r)) && (i = !0);
  }
  return i;
}
function U(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!n)
    return;
  if (n[e])
    return n[e];
  const u = e.split(t);
  let s = n;
  for (let i = 0; i < u.length; ++i) {
    if (!s || typeof s[u[i]] == "string" && i + 1 < u.length)
      return;
    if (s[u[i]] === void 0) {
      let r = 2, D = u.slice(i, i + r).join(t), a = s[D];
      for (; a === void 0 && u.length > i + r; )
        r++, D = u.slice(i, i + r).join(t), a = s[D];
      if (a === void 0)
        return;
      if (a === null)
        return null;
      if (e.endsWith(D)) {
        if (typeof a == "string")
          return a;
        if (D && typeof a[D] == "string")
          return a[D];
      }
      const l = u.slice(i + r).join(t);
      return l ? U(a, l, t) : void 0;
    }
    s = s[u[i]];
  }
  return s;
}
function H(n) {
  return n && n.indexOf("_") > 0 ? n.replace("_", "-") : n;
}
class ae extends J {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      ns: ["translation"],
      defaultNS: "translation"
    };
    super(), this.data = e || {}, this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(e) {
    this.options.ns.indexOf(e) < 0 && this.options.ns.push(e);
  }
  removeNamespaces(e) {
    const t = this.options.ns.indexOf(e);
    t > -1 && this.options.ns.splice(t, 1);
  }
  getResource(e, t, u) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const i = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator, r = s.ignoreJSONStructure !== void 0 ? s.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let D = [e, t];
    u && typeof u != "string" && (D = D.concat(u)), u && typeof u == "string" && (D = D.concat(i ? u.split(i) : u)), e.indexOf(".") > -1 && (D = e.split("."));
    const a = K(this.data, D);
    return a || !r || typeof u != "string" ? a : U(this.data && this.data[e] && this.data[e][t], u, i);
  }
  addResource(e, t, u, s) {
    let i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const r = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator;
    let D = [e, t];
    u && (D = D.concat(r ? u.split(r) : u)), e.indexOf(".") > -1 && (D = e.split("."), s = t, t = D[1]), this.addNamespaces(t), re(this.data, D, s), i.silent || this.emit("added", e, t, u, s);
  }
  addResources(e, t, u) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
      silent: !1
    };
    for (const i in u)
      (typeof u[i] == "string" || Object.prototype.toString.apply(u[i]) === "[object Array]") && this.addResource(e, t, i, u[i], {
        silent: !0
      });
    s.silent || this.emit("added", e, t, u);
  }
  addResourceBundle(e, t, u, s, i) {
    let r = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: !1
    }, D = [e, t];
    e.indexOf(".") > -1 && (D = e.split("."), s = u, u = t, t = D[1]), this.addNamespaces(t);
    let a = K(this.data, D) || {};
    s ? he(a, u, i) : a = {
      ...a,
      ...u
    }, re(this.data, D, a), r.silent || this.emit("added", e, t, u);
  }
  removeResourceBundle(e, t) {
    this.hasResourceBundle(e, t) && delete this.data[e][t], this.removeNamespaces(t), this.emit("removed", e, t);
  }
  hasResourceBundle(e, t) {
    return this.getResource(e, t) !== void 0;
  }
  getResourceBundle(e, t) {
    return t || (t = this.options.defaultNS), this.options.compatibilityAPI === "v1" ? {
      ...this.getResource(e, t)
    } : this.getResource(e, t);
  }
  getDataByLanguage(e) {
    return this.data[e];
  }
  hasLanguageSomeTranslations(e) {
    const t = this.getDataByLanguage(e);
    return !!(t && Object.keys(t) || []).find((s) => t[s] && Object.keys(t[s]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var de = {
  processors: {},
  addPostProcessor(n) {
    this.processors[n.name] = n;
  },
  handle(n, e, t, u, s) {
    return n.forEach((i) => {
      this.processors[i] && (e = this.processors[i].process(e, t, u, s));
    }), e;
  }
};
const De = {};
class z extends J {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Se(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = S.create("translator");
  }
  changeLanguage(e) {
    e && (this.language = e);
  }
  exists(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    };
    if (e == null)
      return !1;
    const u = this.resolve(e, t);
    return u && u.res !== void 0;
  }
  extractFromKey(e, t) {
    let u = t.nsSeparator !== void 0 ? t.nsSeparator : this.options.nsSeparator;
    u === void 0 && (u = ":");
    const s = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator;
    let i = t.ns || this.options.defaultNS || [];
    const r = u && e.indexOf(u) > -1, D = !this.options.userDefinedKeySeparator && !t.keySeparator && !this.options.userDefinedNsSeparator && !t.nsSeparator && !Ne(e, u, s);
    if (r && !D) {
      const a = e.match(this.interpolator.nestingRegexp);
      if (a && a.length > 0)
        return {
          key: e,
          namespaces: i
        };
      const l = e.split(u);
      (u !== s || u === s && this.options.ns.indexOf(l[0]) > -1) && (i = l.shift()), e = l.join(s);
    }
    return typeof i == "string" && (i = [i]), {
      key: e,
      namespaces: i
    };
  }
  translate(e, t, u) {
    if (typeof t != "object" && this.options.overloadTranslationOptionHandler && (t = this.options.overloadTranslationOptionHandler(arguments)), typeof t == "object" && (t = {
      ...t
    }), t || (t = {}), e == null)
      return "";
    Array.isArray(e) || (e = [String(e)]);
    const s = t.returnDetails !== void 0 ? t.returnDetails : this.options.returnDetails, i = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator, {
      key: r,
      namespaces: D
    } = this.extractFromKey(e[e.length - 1], t), a = D[D.length - 1], l = t.lng || this.language, f = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (l && l.toLowerCase() === "cimode") {
      if (f) {
        const m = t.nsSeparator || this.options.nsSeparator;
        return s ? {
          res: `${a}${m}${r}`,
          usedKey: r,
          exactUsedKey: r,
          usedLng: l,
          usedNS: a
        } : `${a}${m}${r}`;
      }
      return s ? {
        res: r,
        usedKey: r,
        exactUsedKey: r,
        usedLng: l,
        usedNS: a
      } : r;
    }
    const c = this.resolve(e, t);
    let o = c && c.res;
    const d = c && c.usedKey || r, g = c && c.exactUsedKey || r, F = Object.prototype.toString.apply(o), p = ["[object Number]", "[object Function]", "[object RegExp]"], B = t.joinArrays !== void 0 ? t.joinArrays : this.options.joinArrays, C = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (C && o && (typeof o != "string" && typeof o != "boolean" && typeof o != "number") && p.indexOf(F) < 0 && !(typeof B == "string" && F === "[object Array]")) {
      if (!t.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const m = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(d, o, {
          ...t,
          ns: D
        }) : `key '${r} (${this.language})' returned an object instead of string.`;
        return s ? (c.res = m, c) : m;
      }
      if (i) {
        const m = F === "[object Array]", y = m ? [] : {}, x = m ? g : d;
        for (const E in o)
          if (Object.prototype.hasOwnProperty.call(o, E)) {
            const I = `${x}${i}${E}`;
            y[E] = this.translate(I, {
              ...t,
              joinArrays: !1,
              ns: D
            }), y[E] === I && (y[E] = o[E]);
          }
        o = y;
      }
    } else if (C && typeof B == "string" && F === "[object Array]")
      o = o.join(B), o && (o = this.extendTranslation(o, e, t, u));
    else {
      let m = !1, y = !1;
      const x = t.count !== void 0 && typeof t.count != "string", E = z.hasDefaultValue(t), I = x ? this.pluralResolver.getSuffix(l, t.count, t) : "", ye = t.ordinal && x ? this.pluralResolver.getSuffix(l, t.count, {
        ordinal: !1
      }) : "", N = t[`defaultValue${I}`] || t[`defaultValue${ye}`] || t.defaultValue;
      !this.isValidLookup(o) && E && (m = !0, o = N), this.isValidLookup(o) || (y = !0, o = r);
      const be = (t.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && y ? void 0 : o, R = E && N !== o && this.options.updateMissing;
      if (y || m || R) {
        if (this.logger.log(R ? "updateKey" : "missingKey", l, a, r, R ? N : o), i) {
          const b = this.resolve(r, {
            ...t,
            keySeparator: !1
          });
          b && b.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let $ = [];
        const T = this.languageUtils.getFallbackCodes(this.options.fallbackLng, t.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && T && T[0])
          for (let b = 0; b < T.length; b++)
            $.push(T[b]);
        else
          this.options.saveMissingTo === "all" ? $ = this.languageUtils.toResolveHierarchy(t.lng || this.language) : $.push(t.lng || this.language);
        const ue = (b, L, ne) => {
          const se = E && ne !== o ? ne : be;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(b, a, L, se, R, t) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(b, a, L, se, R, t), this.emit("missingKey", b, a, L, o);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && x ? $.forEach((b) => {
          this.pluralResolver.getSuffixes(b, t).forEach((L) => {
            ue([b], r + L, t[`defaultValue${L}`] || N);
          });
        }) : ue($, r, N));
      }
      o = this.extendTranslation(o, e, t, c, u), y && o === r && this.options.appendNamespaceToMissingKey && (o = `${a}:${r}`), (y || m) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? o = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${a}:${r}` : r, m ? o : void 0) : o = this.options.parseMissingKeyHandler(o));
    }
    return s ? (c.res = o, c) : o;
  }
  extendTranslation(e, t, u, s, i) {
    var r = this;
    if (this.i18nFormat && this.i18nFormat.parse)
      e = this.i18nFormat.parse(e, {
        ...this.options.interpolation.defaultVariables,
        ...u
      }, u.lng || this.language || s.usedLng, s.usedNS, s.usedKey, {
        resolved: s
      });
    else if (!u.skipInterpolation) {
      u.interpolation && this.interpolator.init({
        ...u,
        interpolation: {
          ...this.options.interpolation,
          ...u.interpolation
        }
      });
      const l = typeof e == "string" && (u && u.interpolation && u.interpolation.skipOnVariables !== void 0 ? u.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let f;
      if (l) {
        const o = e.match(this.interpolator.nestingRegexp);
        f = o && o.length;
      }
      let c = u.replace && typeof u.replace != "string" ? u.replace : u;
      if (this.options.interpolation.defaultVariables && (c = {
        ...this.options.interpolation.defaultVariables,
        ...c
      }), e = this.interpolator.interpolate(e, c, u.lng || this.language, u), l) {
        const o = e.match(this.interpolator.nestingRegexp), d = o && o.length;
        f < d && (u.nest = !1);
      }
      !u.lng && this.options.compatibilityAPI !== "v1" && s && s.res && (u.lng = s.usedLng), u.nest !== !1 && (e = this.interpolator.nest(e, function() {
        for (var o = arguments.length, d = new Array(o), g = 0; g < o; g++)
          d[g] = arguments[g];
        return i && i[0] === d[0] && !u.context ? (r.logger.warn(`It seems you are nesting recursively key: ${d[0]} in key: ${t[0]}`), null) : r.translate(...d, t);
      }, u)), u.interpolation && this.interpolator.reset();
    }
    const D = u.postProcess || this.options.postProcess, a = typeof D == "string" ? [D] : D;
    return e != null && a && a.length && u.applyPostProcessor !== !1 && (e = de.handle(a, e, t, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: s,
      ...u
    } : u, this)), e;
  }
  resolve(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u, s, i, r, D;
    return typeof e == "string" && (e = [e]), e.forEach((a) => {
      if (this.isValidLookup(u))
        return;
      const l = this.extractFromKey(a, t), f = l.key;
      s = f;
      let c = l.namespaces;
      this.options.fallbackNS && (c = c.concat(this.options.fallbackNS));
      const o = t.count !== void 0 && typeof t.count != "string", d = o && !t.ordinal && t.count === 0 && this.pluralResolver.shouldUseIntlApi(), g = t.context !== void 0 && (typeof t.context == "string" || typeof t.context == "number") && t.context !== "", F = t.lngs ? t.lngs : this.languageUtils.toResolveHierarchy(t.lng || this.language, t.fallbackLng);
      c.forEach((p) => {
        this.isValidLookup(u) || (D = p, !De[`${F[0]}-${p}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(D) && (De[`${F[0]}-${p}`] = !0, this.logger.warn(`key "${s}" for languages "${F.join(", ")}" won't get resolved as namespace "${D}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), F.forEach((B) => {
          if (this.isValidLookup(u))
            return;
          r = B;
          const C = [f];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys)
            this.i18nFormat.addLookupKeys(C, f, B, p, t);
          else {
            let m;
            o && (m = this.pluralResolver.getSuffix(B, t.count, t));
            const y = `${this.options.pluralSeparator}zero`, x = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (o && (C.push(f + m), t.ordinal && m.indexOf(x) === 0 && C.push(f + m.replace(x, this.options.pluralSeparator)), d && C.push(f + y)), g) {
              const E = `${f}${this.options.contextSeparator}${t.context}`;
              C.push(E), o && (C.push(E + m), t.ordinal && m.indexOf(x) === 0 && C.push(E + m.replace(x, this.options.pluralSeparator)), d && C.push(E + y));
            }
          }
          let k;
          for (; k = C.pop(); )
            this.isValidLookup(u) || (i = k, u = this.getResource(B, p, k, t));
        }));
      });
    }), {
      res: u,
      usedKey: s,
      exactUsedKey: i,
      usedLng: r,
      usedNS: D
    };
  }
  isValidLookup(e) {
    return e !== void 0 && !(!this.options.returnNull && e === null) && !(!this.options.returnEmptyString && e === "");
  }
  getResource(e, t, u) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(e, t, u, s) : this.resourceStore.getResource(e, t, u, s);
  }
  static hasDefaultValue(e) {
    const t = "defaultValue";
    for (const u in e)
      if (Object.prototype.hasOwnProperty.call(e, u) && t === u.substring(0, t.length) && e[u] !== void 0)
        return !0;
    return !1;
  }
}
function q(n) {
  return n.charAt(0).toUpperCase() + n.slice(1);
}
class oe {
  constructor(e) {
    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = S.create("languageUtils");
  }
  getScriptPartFromCode(e) {
    if (e = H(e), !e || e.indexOf("-") < 0)
      return null;
    const t = e.split("-");
    return t.length === 2 || (t.pop(), t[t.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(t.join("-"));
  }
  getLanguagePartFromCode(e) {
    if (e = H(e), !e || e.indexOf("-") < 0)
      return e;
    const t = e.split("-");
    return this.formatLanguageCode(t[0]);
  }
  formatLanguageCode(e) {
    if (typeof e == "string" && e.indexOf("-") > -1) {
      const t = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"];
      let u = e.split("-");
      return this.options.lowerCaseLng ? u = u.map((s) => s.toLowerCase()) : u.length === 2 ? (u[0] = u[0].toLowerCase(), u[1] = u[1].toUpperCase(), t.indexOf(u[1].toLowerCase()) > -1 && (u[1] = q(u[1].toLowerCase()))) : u.length === 3 && (u[0] = u[0].toLowerCase(), u[1].length === 2 && (u[1] = u[1].toUpperCase()), u[0] !== "sgn" && u[2].length === 2 && (u[2] = u[2].toUpperCase()), t.indexOf(u[1].toLowerCase()) > -1 && (u[1] = q(u[1].toLowerCase())), t.indexOf(u[2].toLowerCase()) > -1 && (u[2] = q(u[2].toLowerCase()))), u.join("-");
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e;
  }
  isSupportedCode(e) {
    return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1;
  }
  getBestMatchFromCodes(e) {
    if (!e)
      return null;
    let t;
    return e.forEach((u) => {
      if (t)
        return;
      const s = this.formatLanguageCode(u);
      (!this.options.supportedLngs || this.isSupportedCode(s)) && (t = s);
    }), !t && this.options.supportedLngs && e.forEach((u) => {
      if (t)
        return;
      const s = this.getLanguagePartFromCode(u);
      if (this.isSupportedCode(s))
        return t = s;
      t = this.options.supportedLngs.find((i) => {
        if (i === s)
          return i;
        if (!(i.indexOf("-") < 0 && s.indexOf("-") < 0) && i.indexOf(s) === 0)
          return i;
      });
    }), t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]), t;
  }
  getFallbackCodes(e, t) {
    if (!e)
      return [];
    if (typeof e == "function" && (e = e(t)), typeof e == "string" && (e = [e]), Object.prototype.toString.apply(e) === "[object Array]")
      return e;
    if (!t)
      return e.default || [];
    let u = e[t];
    return u || (u = e[this.getScriptPartFromCode(t)]), u || (u = e[this.formatLanguageCode(t)]), u || (u = e[this.getLanguagePartFromCode(t)]), u || (u = e.default), u || [];
  }
  toResolveHierarchy(e, t) {
    const u = this.getFallbackCodes(t || this.options.fallbackLng || [], e), s = [], i = (r) => {
      r && (this.isSupportedCode(r) ? s.push(r) : this.logger.warn(`rejecting language code not found in supportedLngs: ${r}`));
    };
    return typeof e == "string" && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && i(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && i(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && i(this.getLanguagePartFromCode(e))) : typeof e == "string" && i(this.formatLanguageCode(e)), u.forEach((r) => {
      s.indexOf(r) < 0 && i(this.formatLanguageCode(r));
    }), s;
  }
}
let Re = [{
  lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
  nr: [1],
  fc: 3
}, {
  lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ["ar"],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ["cs", "sk"],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ["csb", "pl"],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ["cy"],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ["fr"],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ["ga"],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ["gd"],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ["is"],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ["jv"],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ["kw"],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ["lt"],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ["lv"],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ["mk"],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ["mnk"],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ["mt"],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ["or"],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ["ro"],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ["sl"],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ["he", "iw"],
  nr: [1, 2, 20, 21],
  fc: 22
}], $e = {
  1: function(n) {
    return +(n > 1);
  },
  2: function(n) {
    return +(n != 1);
  },
  3: function(n) {
    return 0;
  },
  4: function(n) {
    return n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  },
  5: function(n) {
    return n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
  },
  6: function(n) {
    return n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
  },
  7: function(n) {
    return n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  },
  8: function(n) {
    return n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3;
  },
  9: function(n) {
    return +(n >= 2);
  },
  10: function(n) {
    return n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4;
  },
  11: function(n) {
    return n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3;
  },
  12: function(n) {
    return +(n % 10 != 1 || n % 100 == 11);
  },
  13: function(n) {
    return +(n !== 0);
  },
  14: function(n) {
    return n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3;
  },
  15: function(n) {
    return n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  },
  16: function(n) {
    return n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2;
  },
  17: function(n) {
    return n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1;
  },
  18: function(n) {
    return n == 0 ? 0 : n == 1 ? 1 : 2;
  },
  19: function(n) {
    return n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3;
  },
  20: function(n) {
    return n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2;
  },
  21: function(n) {
    return n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0;
  },
  22: function(n) {
    return n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3;
  }
};
const Pe = ["v1", "v2", "v3"], je = ["v4"], le = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function ke() {
  const n = {};
  return Re.forEach((e) => {
    e.lngs.forEach((t) => {
      n[t] = {
        numbers: e.nr,
        plurals: $e[e.fc]
      };
    });
  }), n;
}
class Ie {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = e, this.options = t, this.logger = S.create("pluralResolver"), (!this.options.compatibilityJSON || je.includes(this.options.compatibilityJSON)) && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = ke();
  }
  addRule(e, t) {
    this.rules[e] = t;
  }
  getRule(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.shouldUseIntlApi())
      try {
        return new Intl.PluralRules(H(e), {
          type: t.ordinal ? "ordinal" : "cardinal"
        });
      } catch {
        return;
      }
    return this.rules[e] || this.rules[this.languageUtils.getLanguagePartFromCode(e)];
  }
  needsPlural(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const u = this.getRule(e, t);
    return this.shouldUseIntlApi() ? u && u.resolvedOptions().pluralCategories.length > 1 : u && u.numbers.length > 1;
  }
  getPluralFormsOfKey(e, t) {
    let u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.getSuffixes(e, u).map((s) => `${t}${s}`);
  }
  getSuffixes(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const u = this.getRule(e, t);
    return u ? this.shouldUseIntlApi() ? u.resolvedOptions().pluralCategories.sort((s, i) => le[s] - le[i]).map((s) => `${this.options.prepend}${t.ordinal ? `ordinal${this.options.prepend}` : ""}${s}`) : u.numbers.map((s) => this.getSuffix(e, s, t)) : [];
  }
  getSuffix(e, t) {
    let u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const s = this.getRule(e, u);
    return s ? this.shouldUseIntlApi() ? `${this.options.prepend}${u.ordinal ? `ordinal${this.options.prepend}` : ""}${s.select(t)}` : this.getSuffixRetroCompatible(s, t) : (this.logger.warn(`no plural rule found for: ${e}`), "");
  }
  getSuffixRetroCompatible(e, t) {
    const u = e.noAbs ? e.plurals(t) : e.plurals(Math.abs(t));
    let s = e.numbers[u];
    this.options.simplifyPluralSuffix && e.numbers.length === 2 && e.numbers[0] === 1 && (s === 2 ? s = "plural" : s === 1 && (s = ""));
    const i = () => this.options.prepend && s.toString() ? this.options.prepend + s.toString() : s.toString();
    return this.options.compatibilityJSON === "v1" ? s === 1 ? "" : typeof s == "number" ? `_plural_${s.toString()}` : i() : this.options.compatibilityJSON === "v2" || this.options.simplifyPluralSuffix && e.numbers.length === 2 && e.numbers[0] === 1 ? i() : this.options.prepend && u.toString() ? this.options.prepend + u.toString() : u.toString();
  }
  shouldUseIntlApi() {
    return !Pe.includes(this.options.compatibilityJSON);
  }
}
function fe(n, e, t) {
  let u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, i = ve(n, e, t);
  return !i && s && typeof t == "string" && (i = U(n, t, u), i === void 0 && (i = U(e, t, u))), i;
}
class Te {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = S.create("interpolator"), this.options = e, this.format = e.interpolation && e.interpolation.format || ((t) => t), this.init(e);
  }
  init() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    e.interpolation || (e.interpolation = {
      escapeValue: !0
    });
    const t = e.interpolation;
    this.escape = t.escape !== void 0 ? t.escape : Oe, this.escapeValue = t.escapeValue !== void 0 ? t.escapeValue : !0, this.useRawValueToEscape = t.useRawValueToEscape !== void 0 ? t.useRawValueToEscape : !1, this.prefix = t.prefix ? O(t.prefix) : t.prefixEscaped || "{{", this.suffix = t.suffix ? O(t.suffix) : t.suffixEscaped || "}}", this.formatSeparator = t.formatSeparator ? t.formatSeparator : t.formatSeparator || ",", this.unescapePrefix = t.unescapeSuffix ? "" : t.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : t.unescapeSuffix || "", this.nestingPrefix = t.nestingPrefix ? O(t.nestingPrefix) : t.nestingPrefixEscaped || O("$t("), this.nestingSuffix = t.nestingSuffix ? O(t.nestingSuffix) : t.nestingSuffixEscaped || O(")"), this.nestingOptionsSeparator = t.nestingOptionsSeparator ? t.nestingOptionsSeparator : t.nestingOptionsSeparator || ",", this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3, this.alwaysFormat = t.alwaysFormat !== void 0 ? t.alwaysFormat : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const e = `${this.prefix}(.+?)${this.suffix}`;
    this.regexp = new RegExp(e, "g");
    const t = `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`;
    this.regexpUnescape = new RegExp(t, "g");
    const u = `${this.nestingPrefix}(.+?)${this.nestingSuffix}`;
    this.nestingRegexp = new RegExp(u, "g");
  }
  interpolate(e, t, u, s) {
    let i, r, D;
    const a = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function l(g) {
      return g.replace(/\$/g, "$$$$");
    }
    const f = (g) => {
      if (g.indexOf(this.formatSeparator) < 0) {
        const C = fe(t, a, g, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(C, void 0, u, {
          ...s,
          ...t,
          interpolationkey: g
        }) : C;
      }
      const F = g.split(this.formatSeparator), p = F.shift().trim(), B = F.join(this.formatSeparator).trim();
      return this.format(fe(t, a, p, this.options.keySeparator, this.options.ignoreJSONStructure), B, u, {
        ...s,
        ...t,
        interpolationkey: p
      });
    };
    this.resetRegExp();
    const c = s && s.missingInterpolationHandler || this.options.missingInterpolationHandler, o = s && s.interpolation && s.interpolation.skipOnVariables !== void 0 ? s.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (g) => l(g)
    }, {
      regex: this.regexp,
      safeValue: (g) => this.escapeValue ? l(this.escape(g)) : l(g)
    }].forEach((g) => {
      for (D = 0; i = g.regex.exec(e); ) {
        const F = i[1].trim();
        if (r = f(F), r === void 0)
          if (typeof c == "function") {
            const B = c(e, i, s);
            r = typeof B == "string" ? B : "";
          } else if (s && Object.prototype.hasOwnProperty.call(s, F))
            r = "";
          else if (o) {
            r = i[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${F} for interpolating ${e}`), r = "";
        else
          typeof r != "string" && !this.useRawValueToEscape && (r = ie(r));
        const p = g.safeValue(r);
        if (e = e.replace(i[0], p), o ? (g.regex.lastIndex += r.length, g.regex.lastIndex -= i[0].length) : g.regex.lastIndex = 0, D++, D >= this.maxReplaces)
          break;
      }
    }), e;
  }
  nest(e, t) {
    let u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s, i, r;
    function D(a, l) {
      const f = this.nestingOptionsSeparator;
      if (a.indexOf(f) < 0)
        return a;
      const c = a.split(new RegExp(`${f}[ ]*{`));
      let o = `{${c[1]}`;
      a = c[0], o = this.interpolate(o, r);
      const d = o.match(/'/g), g = o.match(/"/g);
      (d && d.length % 2 === 0 && !g || g.length % 2 !== 0) && (o = o.replace(/'/g, '"'));
      try {
        r = JSON.parse(o), l && (r = {
          ...l,
          ...r
        });
      } catch (F) {
        return this.logger.warn(`failed parsing options string in nesting for key ${a}`, F), `${a}${f}${o}`;
      }
      return delete r.defaultValue, a;
    }
    for (; s = this.nestingRegexp.exec(e); ) {
      let a = [];
      r = {
        ...u
      }, r = r.replace && typeof r.replace != "string" ? r.replace : r, r.applyPostProcessor = !1, delete r.defaultValue;
      let l = !1;
      if (s[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(s[1])) {
        const f = s[1].split(this.formatSeparator).map((c) => c.trim());
        s[1] = f.shift(), a = f, l = !0;
      }
      if (i = t(D.call(this, s[1].trim(), r), r), i && s[0] === e && typeof i != "string")
        return i;
      typeof i != "string" && (i = ie(i)), i || (this.logger.warn(`missed to resolve ${s[1]} for nesting ${e}`), i = ""), l && (i = a.reduce((f, c) => this.format(f, c, u.lng, {
        ...u,
        interpolationkey: s[1].trim()
      }), i.trim())), e = e.replace(s[0], i), this.regexp.lastIndex = 0;
    }
    return e;
  }
}
function Me(n) {
  let e = n.toLowerCase().trim();
  const t = {};
  if (n.indexOf("(") > -1) {
    const u = n.split("(");
    e = u[0].toLowerCase().trim();
    const s = u[1].substring(0, u[1].length - 1);
    e === "currency" && s.indexOf(":") < 0 ? t.currency || (t.currency = s.trim()) : e === "relativetime" && s.indexOf(":") < 0 ? t.range || (t.range = s.trim()) : s.split(";").forEach((r) => {
      if (!r)
        return;
      const [D, ...a] = r.split(":"), l = a.join(":").trim().replace(/^'+|'+$/g, "");
      t[D.trim()] || (t[D.trim()] = l), l === "false" && (t[D.trim()] = !1), l === "true" && (t[D.trim()] = !0), isNaN(l) || (t[D.trim()] = parseInt(l, 10));
    });
  }
  return {
    formatName: e,
    formatOptions: t
  };
}
function w(n) {
  const e = {};
  return function(u, s, i) {
    const r = s + JSON.stringify(i);
    let D = e[r];
    return D || (D = n(H(s), i), e[r] = D), D(u);
  };
}
class Ve {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = S.create("formatter"), this.options = e, this.formats = {
      number: w((t, u) => {
        const s = new Intl.NumberFormat(t, {
          ...u
        });
        return (i) => s.format(i);
      }),
      currency: w((t, u) => {
        const s = new Intl.NumberFormat(t, {
          ...u,
          style: "currency"
        });
        return (i) => s.format(i);
      }),
      datetime: w((t, u) => {
        const s = new Intl.DateTimeFormat(t, {
          ...u
        });
        return (i) => s.format(i);
      }),
      relativetime: w((t, u) => {
        const s = new Intl.RelativeTimeFormat(t, {
          ...u
        });
        return (i) => s.format(i, u.range || "day");
      }),
      list: w((t, u) => {
        const s = new Intl.ListFormat(t, {
          ...u
        });
        return (i) => s.format(i);
      })
    }, this.init(e);
  }
  init(e) {
    const u = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    }).interpolation;
    this.formatSeparator = u.formatSeparator ? u.formatSeparator : u.formatSeparator || ",";
  }
  add(e, t) {
    this.formats[e.toLowerCase().trim()] = t;
  }
  addCached(e, t) {
    this.formats[e.toLowerCase().trim()] = w(t);
  }
  format(e, t, u) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return t.split(this.formatSeparator).reduce((D, a) => {
      const {
        formatName: l,
        formatOptions: f
      } = Me(a);
      if (this.formats[l]) {
        let c = D;
        try {
          const o = s && s.formatParams && s.formatParams[s.interpolationkey] || {}, d = o.locale || o.lng || s.locale || s.lng || u;
          c = this.formats[l](D, d, {
            ...f,
            ...s,
            ...o
          });
        } catch (o) {
          this.logger.warn(o);
        }
        return c;
      } else
        this.logger.warn(`there was no format function for ${l}`);
      return D;
    }, e);
  }
}
function Ke(n, e) {
  n.pending[e] !== void 0 && (delete n.pending[e], n.pendingCount--);
}
class Ue extends J {
  constructor(e, t, u) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = e, this.store = t, this.services = u, this.languageUtils = u.languageUtils, this.options = s, this.logger = S.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = s.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = s.maxRetries >= 0 ? s.maxRetries : 5, this.retryTimeout = s.retryTimeout >= 1 ? s.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(u, s.backend, s);
  }
  queueLoad(e, t, u, s) {
    const i = {}, r = {}, D = {}, a = {};
    return e.forEach((l) => {
      let f = !0;
      t.forEach((c) => {
        const o = `${l}|${c}`;
        !u.reload && this.store.hasResourceBundle(l, c) ? this.state[o] = 2 : this.state[o] < 0 || (this.state[o] === 1 ? r[o] === void 0 && (r[o] = !0) : (this.state[o] = 1, f = !1, r[o] === void 0 && (r[o] = !0), i[o] === void 0 && (i[o] = !0), a[c] === void 0 && (a[c] = !0)));
      }), f || (D[l] = !0);
    }), (Object.keys(i).length || Object.keys(r).length) && this.queue.push({
      pending: r,
      pendingCount: Object.keys(r).length,
      loaded: {},
      errors: [],
      callback: s
    }), {
      toLoad: Object.keys(i),
      pending: Object.keys(r),
      toLoadLanguages: Object.keys(D),
      toLoadNamespaces: Object.keys(a)
    };
  }
  loaded(e, t, u) {
    const s = e.split("|"), i = s[0], r = s[1];
    t && this.emit("failedLoading", i, r, t), u && this.store.addResourceBundle(i, r, u), this.state[e] = t ? -1 : 2;
    const D = {};
    this.queue.forEach((a) => {
      Ae(a.loaded, [i], r), Ke(a, e), t && a.errors.push(t), a.pendingCount === 0 && !a.done && (Object.keys(a.loaded).forEach((l) => {
        D[l] || (D[l] = {});
        const f = a.loaded[l];
        f.length && f.forEach((c) => {
          D[l][c] === void 0 && (D[l][c] = !0);
        });
      }), a.done = !0, a.errors.length ? a.callback(a.errors) : a.callback());
    }), this.emit("loaded", D), this.queue = this.queue.filter((a) => !a.done);
  }
  read(e, t, u) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, r = arguments.length > 5 ? arguments[5] : void 0;
    if (!e.length)
      return r(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: e,
        ns: t,
        fcName: u,
        tried: s,
        wait: i,
        callback: r
      });
      return;
    }
    this.readingCalls++;
    const D = (l, f) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const c = this.waitingReads.shift();
        this.read(c.lng, c.ns, c.fcName, c.tried, c.wait, c.callback);
      }
      if (l && f && s < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, e, t, u, s + 1, i * 2, r);
        }, i);
        return;
      }
      r(l, f);
    }, a = this.backend[u].bind(this.backend);
    if (a.length === 2) {
      try {
        const l = a(e, t);
        l && typeof l.then == "function" ? l.then((f) => D(null, f)).catch(D) : D(null, l);
      } catch (l) {
        D(l);
      }
      return;
    }
    return a(e, t, D);
  }
  prepareLoading(e, t) {
    let u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), s && s();
    typeof e == "string" && (e = this.languageUtils.toResolveHierarchy(e)), typeof t == "string" && (t = [t]);
    const i = this.queueLoad(e, t, u, s);
    if (!i.toLoad.length)
      return i.pending.length || s(), null;
    i.toLoad.forEach((r) => {
      this.loadOne(r);
    });
  }
  load(e, t, u) {
    this.prepareLoading(e, t, {}, u);
  }
  reload(e, t, u) {
    this.prepareLoading(e, t, {
      reload: !0
    }, u);
  }
  loadOne(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const u = e.split("|"), s = u[0], i = u[1];
    this.read(s, i, "read", void 0, void 0, (r, D) => {
      r && this.logger.warn(`${t}loading namespace ${i} for language ${s} failed`, r), !r && D && this.logger.log(`${t}loaded namespace ${i} for language ${s}`, D), this.loaded(e, r, D);
    });
  }
  saveMissing(e, t, u, s, i) {
    let r = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {}, D = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {
    };
    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(t)) {
      this.logger.warn(`did not save key "${u}" as the namespace "${t}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(u == null || u === "")) {
      if (this.backend && this.backend.create) {
        const a = {
          ...r,
          isUpdate: i
        }, l = this.backend.create.bind(this.backend);
        if (l.length < 6)
          try {
            let f;
            l.length === 5 ? f = l(e, t, u, s, a) : f = l(e, t, u, s), f && typeof f.then == "function" ? f.then((c) => D(null, c)).catch(D) : D(null, f);
          } catch (f) {
            D(f);
          }
        else
          l(e, t, u, s, D, a);
      }
      !e || !e[0] || this.store.addResource(e[0], t, u, s);
    }
  }
}
function ce() {
  return {
    debug: !1,
    initImmediate: !0,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: "all",
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: "fallback",
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: function(e) {
      let t = {};
      if (typeof e[1] == "object" && (t = e[1]), typeof e[1] == "string" && (t.defaultValue = e[1]), typeof e[2] == "string" && (t.tDescription = e[2]), typeof e[2] == "object" || typeof e[3] == "object") {
        const u = e[3] || e[2];
        Object.keys(u).forEach((s) => {
          t[s] = u[s];
        });
      }
      return t;
    },
    interpolation: {
      escapeValue: !0,
      format: (n, e, t, u) => n,
      prefix: "{{",
      suffix: "}}",
      formatSeparator: ",",
      unescapePrefix: "-",
      nestingPrefix: "$t(",
      nestingSuffix: ")",
      nestingOptionsSeparator: ",",
      maxReplaces: 1e3,
      skipOnVariables: !0
    }
  };
}
function ge(n) {
  return typeof n.ns == "string" && (n.ns = [n.ns]), typeof n.fallbackLng == "string" && (n.fallbackLng = [n.fallbackLng]), typeof n.fallbackNS == "string" && (n.fallbackNS = [n.fallbackNS]), n.supportedLngs && n.supportedLngs.indexOf("cimode") < 0 && (n.supportedLngs = n.supportedLngs.concat(["cimode"])), n;
}
function M() {
}
function He(n) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(n)).forEach((t) => {
    typeof n[t] == "function" && (n[t] = n[t].bind(n));
  });
}
class j extends J {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = ge(e), this.services = {}, this.logger = S, this.modules = {
      external: []
    }, He(this), t && !this.isInitialized && !e.isClone) {
      if (!this.options.initImmediate)
        return this.init(e, t), this;
      setTimeout(() => {
        this.init(e, t);
      }, 0);
    }
  }
  init() {
    var e = this;
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = arguments.length > 1 ? arguments[1] : void 0;
    typeof t == "function" && (u = t, t = {}), !t.defaultNS && t.defaultNS !== !1 && t.ns && (typeof t.ns == "string" ? t.defaultNS = t.ns : t.ns.indexOf("translation") < 0 && (t.defaultNS = t.ns[0]));
    const s = ce();
    this.options = {
      ...s,
      ...this.options,
      ...ge(t)
    }, this.options.compatibilityAPI !== "v1" && (this.options.interpolation = {
      ...s.interpolation,
      ...this.options.interpolation
    }), t.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = t.keySeparator), t.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = t.nsSeparator);
    function i(f) {
      return f ? typeof f == "function" ? new f() : f : null;
    }
    if (!this.options.isClone) {
      this.modules.logger ? S.init(i(this.modules.logger), this.options) : S.init(null, this.options);
      let f;
      this.modules.formatter ? f = this.modules.formatter : typeof Intl < "u" && (f = Ve);
      const c = new oe(this.options);
      this.store = new ae(this.options.resources, this.options);
      const o = this.services;
      o.logger = S, o.resourceStore = this.store, o.languageUtils = c, o.pluralResolver = new Ie(c, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), f && (!this.options.interpolation.format || this.options.interpolation.format === s.interpolation.format) && (o.formatter = i(f), o.formatter.init(o, this.options), this.options.interpolation.format = o.formatter.format.bind(o.formatter)), o.interpolator = new Te(this.options), o.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, o.backendConnector = new Ue(i(this.modules.backend), o.resourceStore, o, this.options), o.backendConnector.on("*", function(d) {
        for (var g = arguments.length, F = new Array(g > 1 ? g - 1 : 0), p = 1; p < g; p++)
          F[p - 1] = arguments[p];
        e.emit(d, ...F);
      }), this.modules.languageDetector && (o.languageDetector = i(this.modules.languageDetector), o.languageDetector.init && o.languageDetector.init(o, this.options.detection, this.options)), this.modules.i18nFormat && (o.i18nFormat = i(this.modules.i18nFormat), o.i18nFormat.init && o.i18nFormat.init(this)), this.translator = new z(this.services, this.options), this.translator.on("*", function(d) {
        for (var g = arguments.length, F = new Array(g > 1 ? g - 1 : 0), p = 1; p < g; p++)
          F[p - 1] = arguments[p];
        e.emit(d, ...F);
      }), this.modules.external.forEach((d) => {
        d.init && d.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, u || (u = M), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const f = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      f.length > 0 && f[0] !== "dev" && (this.options.lng = f[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((f) => {
      this[f] = function() {
        return e.store[f](...arguments);
      };
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((f) => {
      this[f] = function() {
        return e.store[f](...arguments), e;
      };
    });
    const a = P(), l = () => {
      const f = (c, o) => {
        this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), a.resolve(o), u(c, o);
      };
      if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized)
        return f(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, f);
    };
    return this.options.resources || !this.options.initImmediate ? l() : setTimeout(l, 0), a;
  }
  loadResources(e) {
    let u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : M;
    const s = typeof e == "string" ? e : this.language;
    if (typeof e == "function" && (u = e), !this.options.resources || this.options.partialBundledLanguages) {
      if (s && s.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0))
        return u();
      const i = [], r = (D) => {
        if (!D || D === "cimode")
          return;
        this.services.languageUtils.toResolveHierarchy(D).forEach((l) => {
          l !== "cimode" && i.indexOf(l) < 0 && i.push(l);
        });
      };
      s ? r(s) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((a) => r(a)), this.options.preload && this.options.preload.forEach((D) => r(D)), this.services.backendConnector.load(i, this.options.ns, (D) => {
        !D && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), u(D);
      });
    } else
      u(null);
  }
  reloadResources(e, t, u) {
    const s = P();
    return e || (e = this.languages), t || (t = this.options.ns), u || (u = M), this.services.backendConnector.reload(e, t, (i) => {
      s.resolve(), u(i);
    }), s;
  }
  use(e) {
    if (!e)
      throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!e.type)
      throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return e.type === "backend" && (this.modules.backend = e), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && (this.modules.languageDetector = e), e.type === "i18nFormat" && (this.modules.i18nFormat = e), e.type === "postProcessor" && de.addPostProcessor(e), e.type === "formatter" && (this.modules.formatter = e), e.type === "3rdParty" && this.modules.external.push(e), this;
  }
  setResolvedLanguage(e) {
    if (!(!e || !this.languages) && !(["cimode", "dev"].indexOf(e) > -1))
      for (let t = 0; t < this.languages.length; t++) {
        const u = this.languages[t];
        if (!(["cimode", "dev"].indexOf(u) > -1) && this.store.hasLanguageSomeTranslations(u)) {
          this.resolvedLanguage = u;
          break;
        }
      }
  }
  changeLanguage(e, t) {
    var u = this;
    this.isLanguageChangingTo = e;
    const s = P();
    this.emit("languageChanging", e);
    const i = (a) => {
      this.language = a, this.languages = this.services.languageUtils.toResolveHierarchy(a), this.resolvedLanguage = void 0, this.setResolvedLanguage(a);
    }, r = (a, l) => {
      l ? (i(l), this.translator.changeLanguage(l), this.isLanguageChangingTo = void 0, this.emit("languageChanged", l), this.logger.log("languageChanged", l)) : this.isLanguageChangingTo = void 0, s.resolve(function() {
        return u.t(...arguments);
      }), t && t(a, function() {
        return u.t(...arguments);
      });
    }, D = (a) => {
      !e && !a && this.services.languageDetector && (a = []);
      const l = typeof a == "string" ? a : this.services.languageUtils.getBestMatchFromCodes(a);
      l && (this.language || i(l), this.translator.language || this.translator.changeLanguage(l), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(l)), this.loadResources(l, (f) => {
        r(f, l);
      });
    };
    return !e && this.services.languageDetector && !this.services.languageDetector.async ? D(this.services.languageDetector.detect()) : !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(D) : this.services.languageDetector.detect(D) : D(e), s;
  }
  getFixedT(e, t, u) {
    var s = this;
    const i = function(r, D) {
      let a;
      if (typeof D != "object") {
        for (var l = arguments.length, f = new Array(l > 2 ? l - 2 : 0), c = 2; c < l; c++)
          f[c - 2] = arguments[c];
        a = s.options.overloadTranslationOptionHandler([r, D].concat(f));
      } else
        a = {
          ...D
        };
      a.lng = a.lng || i.lng, a.lngs = a.lngs || i.lngs, a.ns = a.ns || i.ns, a.keyPrefix = a.keyPrefix || u || i.keyPrefix;
      const o = s.options.keySeparator || ".";
      let d;
      return a.keyPrefix && Array.isArray(r) ? d = r.map((g) => `${a.keyPrefix}${o}${g}`) : d = a.keyPrefix ? `${a.keyPrefix}${o}${r}` : r, s.t(d, a);
    };
    return typeof e == "string" ? i.lng = e : i.lngs = e, i.ns = t, i.keyPrefix = u, i;
  }
  t() {
    return this.translator && this.translator.translate(...arguments);
  }
  exists() {
    return this.translator && this.translator.exists(...arguments);
  }
  setDefaultNamespace(e) {
    this.options.defaultNS = e;
  }
  hasLoadedNamespace(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!this.isInitialized)
      return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
    if (!this.languages || !this.languages.length)
      return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
    const u = t.lng || this.resolvedLanguage || this.languages[0], s = this.options ? this.options.fallbackLng : !1, i = this.languages[this.languages.length - 1];
    if (u.toLowerCase() === "cimode")
      return !0;
    const r = (D, a) => {
      const l = this.services.backendConnector.state[`${D}|${a}`];
      return l === -1 || l === 2;
    };
    if (t.precheck) {
      const D = t.precheck(this, r);
      if (D !== void 0)
        return D;
    }
    return !!(this.hasResourceBundle(u, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || r(u, e) && (!s || r(i, e)));
  }
  loadNamespaces(e, t) {
    const u = P();
    return this.options.ns ? (typeof e == "string" && (e = [e]), e.forEach((s) => {
      this.options.ns.indexOf(s) < 0 && this.options.ns.push(s);
    }), this.loadResources((s) => {
      u.resolve(), t && t(s);
    }), u) : (t && t(), Promise.resolve());
  }
  loadLanguages(e, t) {
    const u = P();
    typeof e == "string" && (e = [e]);
    const s = this.options.preload || [], i = e.filter((r) => s.indexOf(r) < 0);
    return i.length ? (this.options.preload = s.concat(i), this.loadResources((r) => {
      u.resolve(), t && t(r);
    }), u) : (t && t(), Promise.resolve());
  }
  dir(e) {
    if (e || (e = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), !e)
      return "rtl";
    const t = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], u = this.services && this.services.languageUtils || new oe(ce());
    return t.indexOf(u.getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0;
    return new j(e, t);
  }
  cloneInstance() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : M;
    const u = e.forkResourceStore;
    u && delete e.forkResourceStore;
    const s = {
      ...this.options,
      ...e,
      isClone: !0
    }, i = new j(s);
    return (e.debug !== void 0 || e.prefix !== void 0) && (i.logger = i.logger.clone(e)), ["store", "services", "language"].forEach((D) => {
      i[D] = this[D];
    }), i.services = {
      ...this.services
    }, i.services.utils = {
      hasLoadedNamespace: i.hasLoadedNamespace.bind(i)
    }, u && (i.store = new ae(this.store.data, s), i.services.resourceStore = i.store), i.translator = new z(i.services, s), i.translator.on("*", function(D) {
      for (var a = arguments.length, l = new Array(a > 1 ? a - 1 : 0), f = 1; f < a; f++)
        l[f - 1] = arguments[f];
      i.emit(D, ...l);
    }), i.init(s, t), i.translator.options = s, i.translator.backendConnector.services.utils = {
      hasLoadedNamespace: i.hasLoadedNamespace.bind(i)
    }, i;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const h = j.createInstance();
h.createInstance = j.createInstance;
h.createInstance;
h.dir;
h.init;
h.loadResources;
h.reloadResources;
h.use;
h.changeLanguage;
h.getFixedT;
h.t;
h.exists;
h.setDefaultNamespace;
h.hasLoadedNamespace;
h.loadNamespaces;
h.loadLanguages;
const ze = "Cannot be empty", Je = "Phone cannot be empty", We = "Emoji is unsupportted", qe = "Two passwords you input are different", Ye = "Cannot consist of blank", Ze = "username", Ge = "phone", Qe = "email", Xe = "code", _e = "password", et = "Please input valid phone number", tt = "Please input valid e-mail", ut = "Please input valid verification code", nt = "Password must contain numbers, uppercase and lowercase English letters, or symbols", st = "Should consist of letters and numbers", it = "Should contain {{ min }} - {{ max }} characters", rt = "Should not contain more than {{ max }} characters", at = "Should not contain less than {{ min }} characters", Dt = "The username is already registered", ot = {
  noEmpty: ze,
  noEmptyPhone: Je,
  noEmoji: We,
  noEqual: qe,
  noSpaces: Ye,
  username: Ze,
  phone: Ge,
  email: Qe,
  code: Xe,
  password: _e,
  validPhone: et,
  validEmail: tt,
  validCode: ut,
  noSpacesAndChinese: nt,
  lettersAndNumbers: st,
  lengthMinMax: it,
  lengthMax: rt,
  lengthMin: at,
  usernameRegistered: Dt
}, lt = "不能为空", ft = "手机号不能为空", ct = "暂不支持emoji", gt = "两次密码输入不一致", ht = "不能包含空格", dt = "用户名", Ft = "手机号", pt = "邮箱", mt = "验证码", Ct = "密码", Et = "请输入有效的手机号", Bt = "请输入有效的邮箱名称", yt = "请输入有效的验证码", bt = "密码需由数字、大小写字母或符号组成", xt = "只能由字母、数字组成", St = "长度为 {{ min }} ~ {{ max }} 个字符", At = "不能超过{{ max }}个字符", vt = "不能小于{{ min }}个字符", Lt = "该用户名已被注册", Ot = {
  noEmpty: lt,
  noEmptyPhone: ft,
  noEmoji: ct,
  noEqual: gt,
  noSpaces: ht,
  username: dt,
  phone: Ft,
  email: pt,
  code: mt,
  password: Ct,
  validPhone: Et,
  validEmail: Bt,
  validCode: yt,
  noSpacesAndChinese: bt,
  lettersAndNumbers: xt,
  lengthMinMax: St,
  lengthMax: At,
  lengthMin: vt,
  usernameRegistered: Lt
};
h.init({
  lng: "zh-CN",
  // 设置默认语言
  resources: {
    "en-GB": {
      translation: ot
      // 加载英语翻译
    },
    "zh-CN": {
      translation: Ot
      // 加载中文翻译
    }
  }
});
const wt = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC3\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC08\uDC26](?:\u200D\u2B1B)?|[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g, A = () => ({
  message: h.t("noEmpty"),
  validator(n) {
    return n.trim() === "";
  }
}), Q = () => ({
  message: h.t("noEmoji"),
  validator(n) {
    return wt().exec(n);
  }
}), Fe = () => ({
  message: h.t("noSpaces"),
  validator(n) {
    return !/^[^\s]*$/.test(n);
  }
}), X = () => ({
  message: h.t("validPhone"),
  validator(n) {
    return !/^1[3-9]\d{9}$/.test(n);
  }
}), _ = () => ({
  message: h.t("validEmail"),
  validator(n) {
    return !/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(n);
  }
}), pe = () => ({
  message: h.t("validCode"),
  validator(n) {
    return /^\d{6}$/.test(n);
  }
}), ee = () => ({
  message: h.t("noSpacesAndChinese"),
  validator(n) {
    return !/^[^\s\u4e00-\u9fa5]*$/.test(n);
  }
}), me = () => ({
  message: h.t("lettersAndNumbers"),
  validator(n) {
    return /^[0-9a-zA-Z]+$/.test(n);
  }
}), W = (n = 0, e = 99) => ({
  message: () => h.t("lengthMinMax", { min: n, max: e }),
  validator(t) {
    return !new RegExp(`^.{${n},${e}}$`).test(t);
  }
}), te = (n = 99) => ({
  message: () => h.t("lengthMax", { max: n }),
  validator(e) {
    return !new RegExp(`^(.{1,${n}})$`).test(e);
  }
}), Ce = (n = 0) => ({
  message: () => h.t("lengthMin", { min: n }),
  validator(e) {
    return !new RegExp(`^(.{${n},})$`).test(e);
  }
}), Ee = (n) => ({
  message: h.t("noEqual"),
  validator(e) {
    return e !== n;
  }
}), Nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Code: pe,
  Email: _,
  LengthMax: te,
  LengthMin: Ce,
  LengthMinMax: W,
  LettersAndNumbers: me,
  MatchTargetValue: Ee,
  NoEmoji: Q,
  NoSpaces: Fe,
  NoSpacesAndChinese: ee,
  Phone: X,
  Required: A
}, Symbol.toStringTag, { value: "Module" }));
let Be = "ANTD";
const Rt = (n) => {
  Be = n;
}, Y = () => [Q()], $t = {
  ELE: (...n) => (e, t, u) => {
    for (const s of n)
      if (s.validator(t)) {
        const i = typeof s.message == "function" ? s.message() : s.message;
        return u(new Error(i));
      }
    return u();
  },
  ANTD: (...n) => (e, t) => {
    for (const u of n)
      if (u.validator(t)) {
        const s = typeof u.message == "function" ? u.message() : u.message;
        return Promise.reject(s);
      }
    return Promise.resolve();
  }
}, Z = $t[Be];
function v(...n) {
  return (e) => {
    if (e != null && e.validator) {
      const { validator: t, ...u } = e;
      return [{ validator: Z(...Y(), t, ...n), ...u }];
    }
    return [{ validator: Z(...Y(), ...n), ...e }];
  };
}
const Pt = (n) => v(...Y())(n), jt = (n) => v(A())(n), kt = (n) => v(A(), W(2, 25))(n), It = (n) => {
  const e = A();
  return e.message = h.t("noEmptyPhone"), v(e, X())(n);
}, Tt = (n) => v(A(), _(), te(50))(n), Mt = (n) => v(A(), W(6, 25), ee())(n), Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Code: pe,
  Email: _,
  LengthMax: te,
  LengthMin: Ce,
  LengthMinMax: W,
  LettersAndNumbers: me,
  MatchTargetValue: Ee,
  NoEmoji: Q,
  NoSpaces: Fe,
  NoSpacesAndChinese: ee,
  Phone: X,
  Required: A,
  commonRule: Pt,
  emailRule: Tt,
  nameRule: kt,
  passwordRule: Mt,
  phoneRule: It,
  requiredRule: jt
}, Symbol.toStringTag, { value: "Module" })), Ut = { i18n: h, rules: Vt, baseRules: Nt, setCompiler: Rt, createValidator: Z, formatValidators: v };
export {
  Nt as baseRules,
  Z as createValidator,
  Ut as default,
  v as formatValidators,
  h as i18n,
  Vt as rules,
  Rt as setCompiler
};
