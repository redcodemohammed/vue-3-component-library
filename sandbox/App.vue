<template>
  <main>
    <h1>Welcome to your your sandbox environment</h1>

    <BetterInput
      label="firstname"
      :input-attributes="{
        placeholder: 'Enter your firstname...',
        type: 'text',
        autocomplete: 'given-name'
      }">
      First-name
    </BetterInput>
  </main>
</template>

<script setup lang="ts">
import BetterInput from '../src/components/BetterInput.vue'
</script>

<style lang="scss" scoped></style>
