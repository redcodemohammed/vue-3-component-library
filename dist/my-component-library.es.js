import { ref as s, defineComponent as r, openBlock as u, createElementBlock as c, createElementVNode as l, renderSlot as p, createTextVNode as d, toDisplayString as i } from "vue";
const I = () => {
  const t = s(0);
  return {
    counter: t,
    decrease: () => t.value--,
    increase: () => t.value++
  };
}, _ = { class: "input-container" }, m = ["for"], f = ["id", "name", "value"], v = /* @__PURE__ */ r({
  __name: "BetterInput",
  props: {
    label: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    return (e, n) => (u(), c("div", _, [
      l("label", {
        class: "input-label",
        for: e.label
      }, [
        p(e.$slots, "default", {}, void 0, !0),
        d(" " + i(e.label), 1)
      ], 8, m),
      l("input", {
        id: e.label,
        class: "input",
        name: e.label,
        value: e.modelValue,
        onInput: n[0] || (n[0] = (o) => e.$emit("update:modelValue", o.target.value))
      }, null, 40, f)
    ]));
  }
});
const b = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, a] of e)
    n[o] = a;
  return n;
}, V = /* @__PURE__ */ b(v, [["__scopeId", "data-v-52b8f1ca"]]), g = {
  install(t, ...e) {
    t.component("better-input", V);
  }
};
export {
  g as default,
  I as useCounter
};
