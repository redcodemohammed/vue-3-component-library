<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <div class="">
    Your name: {{ text }}
    <better-input label="Name" v-model="text" />
  </div>
</template>
