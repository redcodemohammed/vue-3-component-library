(function(n,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(n=typeof globalThis<"u"?globalThis:n||self,e(n["my-component-library"]={},n.Vue))})(this,function(n,e){"use strict";const i={class:"input-container"},a=["for"],p=["id","name","value"],r=e.defineComponent({__name:"BetterInput",props:{label:{},modelValue:{}},emits:["update:modelValue"],setup(o){return(t,l)=>(e.openBlock(),e.createElementBlock("div",i,[e.createElementVNode("label",{class:"input-label",for:t.label},[e.renderSlot(t.$slots,"default",{},void 0,!0),e.createTextVNode(" "+e.toDisplayString(t.label),1)],8,a),e.createElementVNode("input",{id:t.label,class:"input",name:t.label,value:t.modelValue,onInput:l[0]||(l[0]=s=>t.$emit("update:modelValue",s.target.value))},null,40,p)]))}}),f="",u=((o,t)=>{const l=o.__vccOpts||o;for(const[s,c]of t)l[s]=c;return l})(r,[["__scopeId","data-v-52b8f1ca"]]),d={install(o,...t){o.component("better-input",u)}};n.componentsPlugin=d,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
