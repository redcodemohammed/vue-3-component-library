import { defineComponent as l, ref as a, resolveComponent as r, openBlock as m, createElementBlock as u, createTextVNode as p, toDisplayString as s, createVNode as c } from "vue";
const _ = { class: "" }, v = /* @__PURE__ */ l({
  __name: "Home",
  setup(d) {
    const e = a("");
    return (i, t) => {
      const o = r("better-input");
      return m(), u("div", _, [
        p(" Your name: " + s(e.value) + " ", 1),
        c(o, {
          label: "Name",
          modelValue: e.value,
          "onUpdate:modelValue": t[0] || (t[0] = (n) => e.value = n)
        }, null, 8, ["modelValue"])
      ]);
    };
  }
});
export {
  v as default
};
