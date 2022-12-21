// packages/shared/src/index.ts
var isObject = (obj) => {
  return obj !== null && typeof obj === "object";
};

// packages/reactivity/src/effect.ts
function track(target, key, value) {
}

// packages/reactivity/src/handler.ts
var mutableHandlers = {
  get(target, key, receiver) {
    if (key === "_v_isReactive" /* IS_REACTIVE */) {
      return true;
    }
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    return Reflect.set(target, key, value, receiver);
  }
};

// packages/reactivity/src/reactive.ts
var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
  ReactiveFlags2["IS_REACTIVE"] = "_v_isReactive";
  return ReactiveFlags2;
})(ReactiveFlags || {});
var reactiveMap = /* @__PURE__ */ new WeakMap();
function reactive(target) {
  if (!isObject(target)) {
    return target;
  }
  const existedProxy = reactiveMap.get(target);
  if (existedProxy)
    return existedProxy;
  if (target["_v_isReactive" /* IS_REACTIVE */])
    return target;
  const proxy = new Proxy(target, mutableHandlers);
  reactiveMap.set(target, proxy);
  return proxy;
}
export {
  ReactiveFlags,
  reactive
};
//# sourceMappingURL=reactivity.js.map
