<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <div class="app flex h-screen w-full items-center justify-center" @click="increment">
    {{ count }}
  </div>
</template>

<style scoped></style>
