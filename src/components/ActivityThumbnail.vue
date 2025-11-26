<template>
  <div
    class="w-full bg-white rounded-2xl shadow-md border overflow-hidden cursor-pointer hover:shadow-lg transition"
    @click="goToDetail"
  >
    <!-- TOP IMAGE -->
    <div class="relative w-full h-48 overflow-hidden">
      <img
        :src="image"
        alt="thumbnail"
        class="w-full h-full object-cover"
      />

      <!-- STATUS BADGE (KUNING) -->
      <div
        class="absolute top-3 left-3 bg-yellow-400 text-xs font-medium text-white py-1 px-3 rounded-full shadow"
      >
        {{ status }}
      </div>

      <!-- CATEGORY BADGE (PUTIH KONTUR) -->
      <div
        class="absolute top-3 right-3 bg-white text-xs font-medium border border-gray-200 py-1 px-3 rounded-full shadow"
      >
        {{ category }}
      </div>
    </div>

    <!-- BOTTOM CONTENT -->
    <div class="p-5">

      <!-- TITLE -->
      <h2 class="text-lg font-bold mb-1">
        {{ title }}
      </h2>

      <!-- DESCRIPTION -->
      <p class="text-sm text-gray-600 mb-4 line-clamp-2">
        {{ description }}
      </p>

      <!-- LOCATION -->
      <div class="flex items-center text-sm text-gray-700 mb-1">
        <img src="@/assets/OrganizerLocationIcon.svg" class="mr-2 w-4 h-4" />
        {{ location }}
      </div>

      <!-- DATE -->
      <div class="flex items-center text-sm text-gray-700 mb-1">
        <img src="@/assets/OrganizerTimeIcon.svg" class="mr-2 w-4 h-4" />
        {{ date }}
      </div>

      <!-- PARTICIPANTS -->
      <div class="flex items-center text-sm text-gray-700 mb-4">
        <img src="@/assets/OrganizerProfileIcon.svg" class="mr-2 w-4 h-4" />
        {{ participants }}/{{ quota }} peserta
      </div>

      <div class="flex justify-between items-center border-t pt-3">

        <!-- RATING -->
        <div class="flex items-center text-sm text-gray-700">
          <img src="@/assets/ReviewIcon.svg" class="w-4 h-4 mr-1" />
          {{ rating }}
          <span class="text-gray-500 text-xs ml-1">({{ reviews }})</span>
        </div>

        <!-- ORGANIZER -->
        <p class="text-xs font-medium text-gray-500">
          {{ organizer }}
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  id: Number,
  image: String,
  status: String,
  category: String,
  title: String,
  description: String,
  location: String,
  date: String,
  participants: Number,
  quota: Number,
  rating: Number,
  reviews: Number,
  organizer: String,
});

const goToDetail = () => {
  router.push(`/activities/${props.id}`);
};
</script>

<style scoped>
/* line clamp 2 */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
