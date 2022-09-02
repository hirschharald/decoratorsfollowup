import "./styles.css";
import { IceCreamComponent } from "./decorators";
import { isConstructorDeclaration } from "typescript";

// decorator factory
function useState(seed: any) {
  return (target, key) => {
    target.[key] = seed;
    target[`set${key.replace(/^\w/, (c) => c.toUpperCase())}`] = (val) =>
      (target[key] = val);
  };
}
export class Hookcomponent {
  @useState(0)
  count;
  setCount;
}

export class AppComponent {
  @UseEffect()
  onEffect() {
    document.title = `You clicked ${this.count.value} times`;
  }
}
function UseEffect() {
  return function (target, key, descriptor) {
    target.ngOnInit = descriptor.value;
    target.ngAfterViewChecked = descriptor.value;
  };
}
const app = new AppComponent()




const f = new Hookcomponent();
console.log("count = ", f.count);
f.setCount(8);
console.log("count = ",f.count);

