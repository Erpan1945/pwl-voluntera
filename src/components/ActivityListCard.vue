<template>
  <div
    class="w-full flex justify-between p-5 rounded-lg border border-black/10 !mt-6"
    style="background-color: white; border: 1px solid rgba(0, 0, 0, 0.10); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);"
  >
    <div>
      <p class="text text-[#4A5565] !text-base md:!text-sm">Daftar Kegiatan</p>
      <h1 class="text text-black !text-2xl md:!text-xl !mb-2">
        {{ totalLists }}
      </h1>
    </div>
    <img src="../assets/ListIcon.svg">
  </div>
</template>

<script>
import { computed } from "vue";
import { useMarkahStore } from "@/stores/lists.js"; // sesuaikan path-mu

export default {
  setup() {
    const store = useMarkahStore();

    // jumlah list
    const totalLists = computed(() => store.lists.length);

    return { totalLists };
  },
};
</script>
