import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios'; // Import axios

export const useActivityStore = defineStore('activity', () => {
    // 1. Definisi State (Data Dummy)
    const activities = ref([
        // --- DATA DUMMY: Kegiatan Saya (Status: Aktif) ---
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
            image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
            applicants: 12,
            applicantsMax: 30,
            waiting: 2,
            rating: 4.8
        },
        {
            id: 102,
            title: "Bakti Sosial Bersih-bersih Sungai",
            description: "Mari bersama-sama membersihkan sungai dari sampah plastik dan limbah agar lingkungan menjadi lebih asri.",
            date: "2025-03-10",
            time: "07:00",
            capacity: 50,
            category: "Lingkungan",
            location: "Sungai Ciliwung",
            status: "Aktif",
            publishStatus: "Sudah Dipublikasikan",
            image: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=800&q=80",
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

        // --- DATA DUMMY: Permohonan Kegiatan ---
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
    ]); // <--- PENUTUP ARRAY HARUS DI SINI

    // 2. Definisi Actions (Fungsi)
    // Fetch dari Database (Opsional, jika backend sudah siap)
    const fetchActivities = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/activities');
            // Jika ingin menimpa data dummy dengan data database:
            // activities.value = response.data; 
        } catch (error) {
            console.error(error);
        }
    };

    const addActivity = (activity) => {
        const newId = activities.value.length > 0 ? Math.max(...activities.value.map(a => a.id)) + 1 : 1;
        activities.value.push({ 
            ...activity, 
            id: newId,
            applicants: 0,
            applicantsMax: activity.capacity,
            waiting: 0,
            rating: 0,
            image: activity.photoUrl || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
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

    const publishActivity = (id) => {
        const activity = activities.value.find(a => a.id === id);
        if (activity) {
            activity.publishStatus = "Sudah Dipublikasikan";
            if (!activity.image) {
                activity.image = "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80";
            }
        }
    };

    return { activities, addActivity, fetchActivities, updateActivity, removeActivity, publishActivity };
});