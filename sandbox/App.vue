<script setup lang="ts">
import { ref } from 'vue'
import BetterInput from '../src/components/BetterInput.vue'
import { useCounter } from '../src'
const text = ref('')
</script>
<template>
  <main>
    <h1>Welcome to your your sandbox environment</h1>

    <BetterInput v-model="text" label="firstname">First-name</BetterInput>
  </main>
</template>
