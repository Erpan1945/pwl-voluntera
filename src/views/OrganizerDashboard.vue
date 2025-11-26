<script setup>
import Navbar from '@/components/Navbar.vue';
import ActivityFormModal from '@/components/ActivityFormModal.vue';
import { useActivityStore } from '@/stores/activityStore';
import { ref, computed } from 'vue';
import { Calendar, Users, Clock, CheckCircle, Edit, Trash2, Plus, Eye, Star } from 'lucide-vue-next';

const activityStore = useActivityStore();
const isModalOpen = ref(false);
const selectedActivity = ref(null);
const activeTab = ref('kegiatanSaya'); 

// --- FILTER DATA ---
const myActivities = computed(() => 
    activityStore.activities.filter(a => 
        a.status === 'Aktif' || a.publishStatus === 'Sudah Dipublikasikan'
    )
);

const requestActivities = computed(() => 
    activityStore.activities.filter(a => a.status !== 'Aktif')
);

const openCreateModal = () => {
    selectedActivity.value = null;
    isModalOpen.value = true;
};

const openEditModal = (activity) => {
    selectedActivity.value = activity;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    selectedActivity.value = null;
};

const handleSaveActivity = (activityData) => {
    if (activityData.id) {
        activityStore.updateActivity(activityData);
    } else {
        activityStore.addActivity(activityData);
    }
    closeModal();
    activeTab.value = 'permohonan'; 
};

const handleDelete = (id) => {
    if(confirm('Apakah anda yakin ingin menghapus kegiatan ini?')) {
        activityStore.removeActivity(id);
    }
}

// --- FUNGSI HANDLE PUBLISH (UPDATE) ---
const handlePublish = (id) => {
    if(confirm('Publikasikan kegiatan ini?')) {
        // 1. Update status di store menjadi "Sudah Dipublikasikan"
        activityStore.publishActivity(id);
        
        // 2. Langsung pindah tab ke "Kegiatan Saya"
        activeTab.value = 'kegiatanSaya';

        // (Opsional) Scroll ke atas agar user melihat perpindahan tab
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
</script>

<template>
    <div class="min-h-screen bg-[#F9FAFB] pb-32">
        <Navbar />
        
        <div class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            
            <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-10">
                <h1 class="text-4xl font-bold text-gray-900 tracking-tight mb-2">Dashboard Penyelenggara</h1>
                <p class="text-lg text-gray-500">Yayasan Peduli Sesama</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-md transition-all duration-300">
                    <div><p class="text-gray-500 text-sm font-medium mb-1">Total Kegiatan</p><h2 class="text-4xl font-bold text-gray-900">{{ activityStore.activities.length }}</h2></div>
                    <div class="p-3 bg-blue-50 rounded-xl text-blue-600"><Calendar class="w-7 h-7" /></div>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-md transition-all duration-300">
                    <div><p class="text-gray-500 text-sm font-medium mb-1">Kegiatan Aktif</p><h2 class="text-4xl font-bold text-gray-900">{{ myActivities.length }}</h2></div>
                    <div class="p-3 bg-green-50 rounded-xl text-green-600"><CheckCircle class="w-7 h-7" /></div>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-md transition-all duration-300">
                    <div><p class="text-gray-500 text-sm font-medium mb-1">Total Pendaftar</p><h2 class="text-4xl font-bold text-gray-900">2</h2></div>
                    <div class="p-3 bg-purple-50 rounded-xl text-purple-600"><Users class="w-7 h-7" /></div>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-md transition-all duration-300">
                    <div><p class="text-gray-500 text-sm font-medium mb-1">Menunggu Review</p><h2 class="text-4xl font-bold text-gray-900">1</h2></div>
                    <div class="p-3 bg-orange-50 rounded-xl text-orange-600"><Clock class="w-7 h-7" /></div>
                </div>
            </div>

            <div class="flex flex-wrap items-center gap-6 mb-10">
                <button 
                    @click="activeTab = 'kegiatanSaya'"
                    :class="[
                        'px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm border',
                        activeTab === 'kegiatanSaya' 
                            ? 'bg-[#155DFC] text-white border-[#155DFC]' 
                            : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                    ]"
                >
                    Kegiatan Saya
                </button>

                <button 
                    @click="activeTab = 'permohonan'"
                    :class="[
                        'px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm border',
                        activeTab === 'permohonan' 
                            ? 'bg-[#155DFC] text-white border-[#155DFC]' 
                            : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                    ]"
                >
                    Permohonan Kegiatan
                </button>

                <button 
                    class="px-6 py-3 rounded-xl text-sm font-bold bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-sm"
                >
                    Kelola Pendaftar
                </button>
            </div>

            <div v-if="activeTab === 'kegiatanSaya'">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="item in myActivities" :key="item.id" class="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                        <div class="relative h-48 w-full bg-gray-100">
                            <img :src="item.image || 'https://via.placeholder.com/400x200'" alt="Activity" class="w-full h-full object-cover">
                            <span class="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-sm">
                                Aktif
                            </span>
                        </div>
                        <div class="p-6 flex-1 flex flex-col">
                            <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{{ item.title }}</h3>
                            <p class="text-gray-500 text-sm mb-6 line-clamp-2 flex-1">{{ item.description }}</p>
                            
                            <div class="space-y-3 mb-6">
                                <div class="flex justify-between items-center text-sm">
                                    <span class="text-gray-500">Pendaftar</span>
                                    <span class="font-medium text-gray-900">{{ item.applicants || 0 }}/{{ item.capacity }}</span>
                                </div>
                                <div class="flex justify-between items-center text-sm">
                                    <span class="text-gray-500">Menunggu</span>
                                    <span class="font-medium text-orange-600">{{ item.waiting || 0 }}</span>
                                </div>
                                <div class="flex justify-between items-center text-sm">
                                    <span class="text-gray-500">Rating</span>
                                    <div class="flex items-center gap-1 font-medium text-gray-900">
                                        {{ item.rating || 0 }} <Star class="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                    </div>
                                </div>
                            </div>

                            <div class="flex gap-3 mt-auto">
                                <button class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                                    <Eye class="w-4 h-4" /> Detail
                                </button>
                                <button @click="openEditModal(item)" class="w-12 flex items-center justify-center py-2.5 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Edit class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-if="myActivities.length === 0" class="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                    <p class="text-gray-500">Belum ada kegiatan yang aktif.</p>
                </div>
            </div>

            <div v-if="activeTab === 'permohonan'">
                <div class="mb-8">
                    <button @click="openCreateModal" class="flex items-center gap-3 bg-[#155DFC] text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5">
                        <Plus class="w-6 h-6" />
                        Buat Permohonan Kegiatan Baru
                    </button>
                </div>

                <div class="space-y-8">
                    <div v-for="item in requestActivities" :key="item.id" class="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                        
                        <div class="flex flex-col lg:flex-row justify-between items-start mb-6 gap-4">
                            <h3 class="text-2xl font-bold text-gray-900 flex-1">{{ item.title }}</h3>
                            
                            <div class="flex flex-wrap gap-3 shrink-0 items-center">
                                <span v-if="item.status === 'Disetujui'" class="px-4 py-1.5 bg-[#FEF3C7] text-[#92400E] text-sm rounded-full font-bold border border-[#FDE68A]">
                                    {{ item.status }}
                                </span>
                                <span v-if="item.status === 'Menunggu Verifikasi'" class="px-4 py-1.5 bg-orange-50 text-orange-700 text-sm rounded-full font-bold border border-orange-200">
                                    {{ item.status }}
                                </span>
                                
                                <button 
                                    v-if="item.publishStatus" 
                                    @click="handlePublish(item.id)"
                                    :disabled="item.publishStatus === 'Sudah Dipublikasikan'"
                                    :class="[
                                        'px-4 py-1.5 text-sm rounded-full font-bold border transition-all duration-200',
                                        item.publishStatus === 'Publikasikan Sekarang' 
                                            ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A] hover:bg-[#FDE68A] cursor-pointer hover:scale-105 shadow-sm' 
                                            : 'bg-green-100 text-green-800 border-green-200 cursor-default'
                                    ]"
                                >
                                    {{ item.publishStatus }}
                                </button>
                            </div>
                        </div>

                        <p class="text-gray-600 text-lg mb-8 leading-relaxed max-w-4xl">{{ item.description }}</p>

                        <div class="flex flex-wrap gap-8 text-base text-gray-500 mb-8 items-center border-b border-gray-100 pb-8">
                            <div class="flex items-center gap-3"><Calendar class="w-5 h-5 text-gray-400" /><span class="font-medium text-gray-700">{{ item.date }}</span></div>
                            <div class="flex items-center gap-3"><Users class="w-5 h-5 text-gray-400" /><span>Kapasitas <span class="font-bold text-gray-900">{{ item.capacity }}</span></span></div>
                            <div class="px-4 py-1.5 bg-gray-100 rounded-lg text-gray-700 text-sm font-bold uppercase tracking-wide border border-gray-200">{{ item.category }}</div>
                        </div>

                        <div class="flex gap-4">
                            <button @click="openEditModal(item)" :disabled="item.status === 'Menunggu Verifikasi'" :class="item.status === 'Menunggu Verifikasi' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'" class="flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-colors">
                                <Edit class="w-5 h-5" /> Edit
                            </button>
                            <button @click="handleDelete(item.id)" :disabled="item.status === 'Menunggu Verifikasi'" :class="item.status === 'Menunggu Verifikasi' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-50 text-red-600 hover:bg-red-100'" class="flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-colors">
                                <Trash2 class="w-5 h-5" /> Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <ActivityFormModal 
            :isOpen="isModalOpen" 
            :activityToEdit="selectedActivity"
            @close="closeModal" 
            @submit="handleSaveActivity"
        />
    </div>
</template>