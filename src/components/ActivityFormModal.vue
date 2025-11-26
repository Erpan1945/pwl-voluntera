ActivityFormModal.vue     componet


<script setup>
import { ref, defineEmits, defineProps, watch, computed } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    activityToEdit: Object
});

const emit = defineEmits(['close', 'submit']);

const form = ref({
    id: null,
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    capacity: '',
    category: '',
    photoUrl: ''
});

const modalTitle = ref('Buat Kegiatan Baru');

// Cek apakah sedang dalam mode Edit
const isEditMode = computed(() => !!form.value.id);

watch(() => props.isOpen, (newValue) => {
    if (newValue) {
        if (props.activityToEdit) {
            modalTitle.value = 'Edit Kegiatan';
            form.value = { ...props.activityToEdit };
        } else {
            modalTitle.value = 'Buat Kegiatan Baru';
            form.value = { 
                id: null, 
                title: '', 
                description: '', 
                location: '', 
                date: '', 
                time: '', 
                capacity: '', 
                category: '',
                photoUrl: ''
            };
        }
    }
});

const handleSubmit = () => {
    const status = form.value.id ? form.value.status : 'Menunggu Verifikasi';
    emit('submit', { ...form.value, status });
};
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">
        
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
            
            <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-2xl z-10">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">{{ modalTitle }}</h2>
                    <p class="text-gray-500 text-sm mt-1">Lengkapi informasi kegiatan volunteer.</p>
                </div>
                <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="p-8 overflow-y-auto custom-scrollbar">
                <form id="activityForm" @submit.prevent="handleSubmit" class="space-y-6">
                    
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Judul Kegiatan <span class="text-red-500">*</span></label>
                        <input 
                            v-model="form.title" 
                            type="text" 
                            placeholder="Contoh: Bimbingan Belajar Gratis" 
                            :disabled="isEditMode"
                            :class="isEditMode ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900'"
                            class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Deskripsi <span class="text-red-500">*</span></label>
                        <textarea 
                            v-model="form.description" 
                            rows="4" 
                            placeholder="Jelaskan detail kegiatan..." 
                            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" 
                            required
                        ></textarea>
                        <p v-if="isEditMode" class="text-xs text-green-600 mt-1">* Bagian ini dapat diubah</p>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Lokasi <span class="text-red-500">*</span></label>
                        <input 
                            v-model="form.location" 
                            type="text" 
                            placeholder="Contoh: Balai Desa Sukamaju" 
                            :disabled="isEditMode"
                            :class="isEditMode ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900'"
                            class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                            required
                        />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Tanggal <span class="text-red-500">*</span></label>
                            <input 
                                v-model="form.date" 
                                type="date" 
                                :disabled="isEditMode"
                                :class="isEditMode ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900 cursor-pointer'"
                                class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Waktu <span class="text-red-500">*</span></label>
                            <input 
                                v-model="form.time" 
                                type="time" 
                                :disabled="isEditMode"
                                :class="isEditMode ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900 cursor-pointer'"
                                class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Kapasitas</label>
                            <input 
                                v-model="form.capacity" 
                                type="number" 
                                min="1" 
                                placeholder="Contoh: 30" 
                                class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            <p v-if="isEditMode" class="text-xs text-green-600 mt-1">* Bagian ini dapat diubah</p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Bidang</label>
                            <div class="relative">
                                <select 
                                    v-model="form.category" 
                                    :disabled="isEditMode"
                                    :class="isEditMode ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900 cursor-pointer'"
                                    class="w-full border border-gray-300 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                >
                                    <option value="" disabled selected>Pilih Bidang</option>
                                    <option>Pendidikan</option>
                                    <option>Sosial</option>
                                    <option>Lingkungan</option>
                                    <option>Kesehatan</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">URL Foto Kegiatan</label>
                        <input 
                            v-model="form.photoUrl" 
                            type="text" 
                            placeholder="https://example.com/foto-kegiatan.jpg" 
                            :disabled="isEditMode"
                            :class="isEditMode ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900'"
                            class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>

                </form>
            </div>

            <div class="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex flex-col-reverse sm:flex-row gap-3">
                <button type="button" @click="$emit('close')" class="w-full sm:w-1/2 px-6 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition-all focus:ring-2 focus:ring-gray-200">
                    Batal
                </button>
                <button type="submit" form="activityForm" class="w-full sm:w-1/2 px-6 py-3.5 bg-[#155DFC] text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Simpan
                </button>
            </div>

        </div>
    </div>
</template>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}
</style>