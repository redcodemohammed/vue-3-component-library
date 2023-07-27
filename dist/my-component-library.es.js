import { defineComponent as s, openBlock as p, createElementBlock as r, createElementVNode as l, renderSlot as u, createTextVNode as i, toDisplayString as d } from "vue";
const c = { class: "input-container" }, _ = ["for"], m = ["id", "name", "value"], b = /* @__PURE__ */ s({
  __name: "BetterInput",
  props: {
    label: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    return (e, o) => (p(), r("div", c, [
      l("label", {
        class: "input-label",
        for: e.label
      }, [
        u(e.$slots, "default", {}, void 0, !0),
        i(" " + d(e.label), 1)
      ], 8, _),
      l("input", {
        id: e.label,
        class: "input",
        name: e.label,
        value: e.modelValue,
        onInput: o[0] || (o[0] = (n) => e.$emit("update:modelValue", n.target.value))
      }, null, 40, m)
    ]));
  }
});
const f = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [n, a] of e)
    o[n] = a;
  return o;
}, v = /* @__PURE__ */ f(b, [["__scopeId", "data-v-52b8f1ca"]]), g = {
  install(t, ...e) {
    t.component("better-input", v);
  }
};
export {
  g as componentsPlugin
};
