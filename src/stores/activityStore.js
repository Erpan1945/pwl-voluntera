


import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useActivityStore = defineStore('activity', () => {
    const activities = ref([
        // --- Data Tab: Kegiatan Saya (Status: Aktif) ---
        {
            id: 101,
            title: "Bimbingan Belajar Gratis Untuk SD",
            description: "Program bimbingan belajar gratis untuk siswa SD kelas 4-6 dengan fokus pada mata pelajaran Matematika.",
            date: "2025-02-25",
            time: "15:00",
            capacity: 30,
            category: "Pendidikan",
            location: "Ruang Serbaguna RW 05",
            status: "Aktif", 
            publishStatus: "Sudah Dipublikasikan",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
            applicants: 0,
            applicantsMax: 30,
            waiting: 0,
            rating: 4.8
        },
        {
            id: 102,
            title: "Bakti Sosial Bersih-bersih Sungai",
            description: "Mari bersama-sama membersihkan sungai dari sampah plastik dan limbah. Kegiatan ini bertujuan...",
            date: "2025-03-10",
            time: "07:00",
            capacity: 50,
            category: "Lingkungan",
            location: "Sungai Ciliwung",
            status: "Aktif",
            publishStatus: "Sudah Dipublikasikan",
            image: "https://images.unsplash.com/photo-1618477461853-586068ad82c6?auto=format&fit=crop&w=800&q=80",
            applicants: 38,
            applicantsMax: 50,
            waiting: 0,
            rating: 4.5
        },
        {
            id: 103,
            title: "Donor Darah untuk Kemanusiaan",
            description: "Ikuti kegiatan donor darah dan selamatkan nyawa. Setiap tetes darah Anda sangat berarti.",
            date: "2025-03-15",
            time: "09:00",
            capacity: 100,
            category: "Kesehatan",
            location: "PMI Pusat",
            status: "Aktif",
            publishStatus: "Sudah Dipublikasikan",
            image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
            applicants: 67,
            applicantsMax: 100,
            waiting: 1,
            rating: 4.9
        },

        // --- Data Tab: Permohonan Kegiatan (Status: Disetujui / Menunggu) ---
        {
            id: 1,
            title: "Pelatihan Komputer Dasar",
            description: "Pelatihan Microsoft Office dasar untuk pemuda karang taruna.",
            date: "2025-04-01",
            time: "13:00",
            capacity: 20,
            category: "Pendidikan",
            location: "Lab Komputer Desa",
            status: "Disetujui",
            publishStatus: "Publikasikan Sekarang",
            image: "",
            applicants: 0,
            applicantsMax: 20,
            waiting: 0,
            rating: 0
        },
        {
            id: 2,
            title: "Renovasi Rumah Warga Kurang Mampu",
            description: "Membantu renovasi rumah warga kurang mampu yang kondisinya sudah tidak layak huni.",
            date: "2025-03-05",
            time: "08:00",
            capacity: 25,
            category: "Sosial",
            location: "Desa Sukamaju",
            status: "Menunggu Verifikasi",
            publishStatus: "",
            image: "",
            applicants: 0,
            applicantsMax: 25,
            waiting: 0,
            rating: 0
        }
    ]);

    const addActivity = (activity) => {
        const newId = activities.value.length > 0 ? Math.max(...activities.value.map(a => a.id)) + 1 : 1;
        activities.value.push({ 
            ...activity, 
            id: newId,
            applicants: 0,
            applicantsMax: activity.capacity,
            waiting: 0,
            rating: 0,
            image: activity.photoUrl || 'https://via.placeholder.com/400x200'
        });
    };

    const updateActivity = (updatedActivity) => {
        const index = activities.value.findIndex(a => a.id === updatedActivity.id);
        if (index !== -1) {
            activities.value[index] = { ...activities.value[index], ...updatedActivity };
        }
    };

    const removeActivity = (id) => {
        activities.value = activities.value.filter(a => a.id !== id);
    };

    // --- PERBAIKAN FUNGSI PUBLISH ---
    const publishActivity = (id) => {
        const activity = activities.value.find(a => a.id === id);
        if (activity) {
            // JANGAN ubah status jadi 'Aktif', agar tetap stay di list Permohonan
            // Kita hanya ubah publishStatus-nya
            activity.publishStatus = "Sudah Dipublikasikan";
            
            // Berikan gambar default jika belum ada (agar tampil bagus di Grid)
            if (!activity.image) {
                activity.image = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80";
            }
        }
    };

    return { activities, addActivity, updateActivity, removeActivity, publishActivity };
});