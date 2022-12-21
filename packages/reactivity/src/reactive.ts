import { isObject } from "@vue/shared"
import { mutableHandlers } from "./handler";

export enum ReactiveFlags {
    IS_REACTIVE = '_v_isReactive'
}

const reactiveMap = new WeakMap();

export function reactive(target) {
  // reactive只能处理对象类型的数据，不是对象不处理
  if (!isObject(target)) {
    return target;
  }

  const existedProxy = reactiveMap.get(target);

  if (existedProxy) return existedProxy;

  if (target[ReactiveFlags.IS_REACTIVE]) return target;

  // 缓存可以采用映射表
  const proxy = new Proxy(target, mutableHandlers);

  reactiveMap.set(target, proxy);

  return proxy;
}
