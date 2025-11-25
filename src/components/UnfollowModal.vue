<template>
  <transition name="fade">
    <div 
      v-if="show" 
      class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="close"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-xl">
        <h2 class="!text-2xl font-bold !mb-3 text-black">Berhenti Mengikuti {{ organizationName }} ?</h2>
        <p class="text-gray-700 !mb-4 text-sm">
          Akun ini tidak akan muncul di Halaman Mengikuti Anda. 
          Anda tetap dapat melihat profile penyelenggara dan mengikuti kegiatannya.
        </p>
        <div class="w-full flex justify-center gap-3">
          <button 
            class="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            @click="confirm"
          >
            Berhenti mengikuti
          </button>
          <button 
            class="w-full px-4 py-2 border border-black-300 text-black rounded-lg hover:bg-gray-100"
            @click="close"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: { type: Boolean, required: true },
  organizationName: { type: String, required: true }
})

const emit = defineEmits(['update:show', 'confirm'])

const close = () => emit('update:show', false)
const confirm = () => emit('confirm')
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
