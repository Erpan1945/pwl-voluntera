<script setup>
import { useMarkahStore } from '@/stores/lists';

const props = defineProps({
  list: {
    type: Object,
    required: true
  }
});

const store = useMarkahStore();

const handleDelete = async () => {
  if (confirm("Yakin ingin menghapus daftar ini?")) {
    await store.deleteList(props.list.id);
  }
};
</script>

<template>
  <!-- klik card = masuk detail -->
  <div
    class="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-sm cursor-pointer"
    @click="$router.push(`/activity_lists/${list.id}`)"
  >
    <div class="flex items-center gap-4">
      <div class="text-blue-600">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <rect y="4" width="24" height="2" rx="1" />
          <rect y="11" width="24" height="2" rx="1" />
          <rect y="18" width="24" height="2" rx="1" />
        </svg>
      </div>

      <div>
        <h3 class="font-semibold text-gray-800">
          {{ list.name }}
        </h3>
        <p class="text-sm text-gray-500">
          {{ list.activities?.length ?? 0 }} kegiatan
        </p>
      </div>
    </div>

    <!-- STOP propagasi supaya klik tombol hapus tidak membuka detail -->
    <button
      class="text-red-500 text-sm font-medium hover:underline"
      @click.stop="handleDelete"
    >
      Hapus
    </button>
  </div>
</template>
