import { track } from "./effect";
import { ReactiveFlags } from "./reactive";

export const mutableHandlers = {
  get(target, key, receiver) { // 我们在使用proxy的时候要搭配reflect来使用，receiver用来解决this问题
    // 取值的时候 改变依赖的属性也需要收集依赖，让这个属性与effect产生关系

    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    }
    // 依赖收集，记录属性和当前effect的关系
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    // 更新数据

    // 找到这个属性对应的effect执行
    return Reflect.set(target, key, value, receiver);
  }
};