<script setup lang="ts"></script>
<template>
  <main>
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <RouterLink :to="{ name: 'about' }">About</RouterLink>
    <RouterView></RouterView>
  </main>
</template>
