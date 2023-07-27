import { ref } from 'vue'

export const useCounter = () => {
  const counter = ref(0)
  const increase = () => counter.value++
  const decrease = () => counter.value--

  return {
    counter,
    decrease,
    increase
  }
}
