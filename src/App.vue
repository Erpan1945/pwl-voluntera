<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { initAuth } = useAuth()

// Initialize auth on app mount
onMounted(() => {
  initAuth()
})
</script>

<style>
#app {
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
</style>