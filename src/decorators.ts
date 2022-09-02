function Frozen(constructor: function) {
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}
// method decorator
function Confirmable(message: string) {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    target.constructor = function (...args: any[]) {
      const allow = confirm(message);

      if (allow) {
        const result = original.apply(this, args);
        return result;
      } else {
        return null;
      }
    };
    return descriptor;
  };
}

// property Decorator
function Emoji() {
  return function (target: Object, key: string | symbol) {
    let val = target[key];
    const getter = () => {
      return val;
    };
    const setter = (next: string) => {
      console.log("updating flavour", target);
      val = `😎 ${next} 😎`;
    };
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

@Frozen
export class IceCreamComponent {
  @Emoji()
  flavour = "vanilla";
  toppings = [];
  @Confirmable("Are you shure?")
  addTopping(topping = "sprikles") {
    this.toppings.push(topping);
  }
}
