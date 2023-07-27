import { defineComponent as i, openBlock as u, createElementBlock as a, createTextVNode as l, toDisplayString as m, unref as e, createElementVNode as s } from "vue";
import { useCounter as p } from "./my-component-library.es.js";
const d = { class: "" }, b = /* @__PURE__ */ i({
  __name: "About",
  setup(f) {
    const { counter: c, decrease: n, increase: r } = p();
    return (_, t) => (u(), a("div", d, [
      l(m(e(c)) + " ", 1),
      s("button", {
        onClick: t[0] || (t[0] = //@ts-ignore
        (...o) => e(n) && e(n)(...o))
      }, "decrease"),
      s("button", {
        onClick: t[1] || (t[1] = //@ts-ignore
        (...o) => e(r) && e(r)(...o))
      }, "increase")
    ]));
  }
});
export {
  b as default
};
