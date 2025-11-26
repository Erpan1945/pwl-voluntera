<script setup>
import { useMarkahStore } from "../stores/lists";
import { onMounted } from "vue";

const emit = defineEmits(["close"]);
const props = defineProps({
  lists: Array,
  activityId: Number,   // ⬅ wajib diterima dari parent
});

const markahStore = useMarkahStore();

const handleSelectList = async (listId) => {
  try {
    await markahStore.save(props.activityId, listId);
    alert("Aktivitas berhasil disimpan ke daftar!");
    emit("close");
  } catch (err) {
    console.error(err);
    alert("Gagal menyimpan aktivitas.");
  }
};
</script>

<template>
  <div
    class="absolute mt-2 right-0 bg-white shadow-xl rounded-2xl w-80 p-4 z-50"
  >
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-4">
      <button @click="emit('close')" class="text-gray-600 flex items-center gap-1">
        ← Kembali
      </button>
    </div>

    <!-- LIST ITEM -->
    <div class="space-y-3 overflow-y-auto max-h-80">

      <div
        v-for="item in lists"
        :key="item.id"
        @click="handleSelectList(item.id)"
        class="flex justify-between items-center p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition"
      >
        <span>{{ item.name }}</span>
      </div>

    </div>
  </div>
</template>
