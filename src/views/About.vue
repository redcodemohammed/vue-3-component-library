<script setup lang="ts">
import { useCounter } from '../composables/useCounter'

const { counter, decrease, increase } = useCounter()
</script>

<template>
  <div class="">
    {{ counter }}
    <button @click="decrease">decrease</button>
    <button @click="increase">increase</button>
  </div>
</template>
