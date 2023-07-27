declare module '*.vue' {
  import { defineComponent } from 'vue'
  const BetterInput: ReturnType<typeof defineComponent>

  export default BetterInput
}
