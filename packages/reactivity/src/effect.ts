export let activeEffect = undefined;

export class ReactiveEffect {
  constructor(private fn) {}
  parent = undefined;
  deps = [];

  run() {
    try {
      this.parent = activeEffect;
      activeEffect = this;
      return this.fn();
    } finally {
      activeEffect = this.parent;
      this.parent = undefined;
    }
  }
}

export function effect(fn) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
};

const targetMap = new WeakMap();
// 依赖收集
export function track(target, key) {
   if (activeEffect) {
     let depsMap = targetMap.get(target);

     if (!depsMap) {
       targetMap.set(target, (depsMap = new Map()
        ))
     }
     let dep = depsMap.get(key);

     if (!dep) {
       
     }

   }
}

// 
export function trigger(target, key, value) {

}