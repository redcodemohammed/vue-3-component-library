import { defineComponent as s, openBlock as r, createElementBlock as u, createElementVNode as n, renderSlot as p, createTextVNode as d, toDisplayString as i } from "vue";
const _ = { class: "input-container" }, c = ["for"], m = ["id", "name", "value"], f = /* @__PURE__ */ s({
  __name: "BetterInput",
  props: {
    label: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(l) {
    return (e, t) => (r(), u("div", _, [
      n("label", {
        class: "input-label",
        for: e.label
      }, [
        p(e.$slots, "default", {}, void 0, !0),
        d(" " + i(e.label), 1)
      ], 8, c),
      n("input", {
        id: e.label,
        class: "input",
        name: e.label,
        value: e.modelValue,
        onInput: t[0] || (t[0] = (o) => e.$emit("update:modelValue", o.target.value))
      }, null, 40, m)
    ]));
  }
});
const v = (l, e) => {
  const t = l.__vccOpts || l;
  for (const [o, a] of e)
    t[o] = a;
  return t;
}, V = /* @__PURE__ */ v(f, [["__scopeId", "data-v-52b8f1ca"]]);
export {
  V as BetterInput
};
