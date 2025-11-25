export const mockUsers = [
  // VOLUNTEERS
  {
    id: 'volunteer-1',
    role: 'volunteer',
    name: 'Budi Santoso',
    email: 'volunteer@test.com',
    password: 'password',
    phone: '081234567890',
    city: 'Malang',
    bio: 'Mahasiswa yang senang membantu sesama dan peduli lingkungan.',
    profileImage: null,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'volunteer-2',
    role: 'volunteer',
    name: 'Siti Nurhaliza',
    email: 'siti@test.com',
    password: 'password',
    phone: '081234567891',
    city: 'Surabaya',
    bio: 'Guru yang ingin berbagi ilmu dan pengalaman.',
    profileImage: null,
    createdAt: '2024-01-16T11:00:00Z'
  },
  {
    id: 'volunteer-3',
    role: 'volunteer',
    name: 'Ahmad Fauzi',
    email: 'ahmad@test.com',
    password: 'password',
    phone: '081234567892',
    city: 'Malang',
    bio: 'Dokter muda yang peduli kesehatan masyarakat.',
    profileImage: null,
    createdAt: '2024-01-17T12:00:00Z'
  },

  // ORGANIZERS
  {
    id: 'organizer-1',
    role: 'organizer',
    name: 'Yayasan Peduli Anak',
    email: 'organizer@test.com',
    password: 'password',
    phone: '081234567893',
    address: 'Jl. Raya Pendidikan No. 123, Malang',
    website: 'https://pedulianak.org',
    bio: 'Yayasan yang fokus pada pendidikan anak-anak kurang mampu di daerah pelosok.',
    profileImage: null,
    createdAt: '2024-01-10T09:00:00Z'
  },
  {
    id: 'organizer-2',
    role: 'organizer',
    name: 'Komunitas Hijau Indonesia',
    email: 'hijau@test.com',
    password: 'password',
    phone: '081234567894',
    address: 'Jl. Lingkungan Hijau No. 45, Surabaya',
    website: 'https://hijauindonesia.org',
    bio: 'Komunitas yang fokus pada pelestarian lingkungan dan penghijauan.',
    profileImage: null,
    createdAt: '2024-01-11T10:00:00Z'
  },
  {
    id: 'organizer-3',
    role: 'organizer',
    name: 'PMI Kota Malang',
    email: 'pmi@test.com',
    password: 'password',
    phone: '081234567895',
    address: 'Jl. Kesehatan No. 78, Malang',
    website: 'https://pmi-malang.org',
    bio: 'Palang Merah Indonesia cabang Kota Malang. Fokus pada kemanusiaan dan kesehatan.',
    profileImage: null,
    createdAt: '2024-01-12T11:00:00Z'
  },

  // ADMIN
  {
    id: 'admin-1',
    role: 'admin',
    name: 'Admin Voluntera',
    email: 'admin@test.com',
    password: 'password',
    phone: '081234567896',
    createdAt: '2024-01-01T08:00:00Z'
  }
]

// ============================================
// 2. ACTIVITIES (Kegiatan Published)
// ============================================

export const mockActivities = [
  // PENDIDIKAN
  {
    id: 'activity-1',
    title: 'Mengajar Anak-anak Desa Sumberejo',
    description: 'Kegiatan mengajar anak-anak SD di desa Sumberejo yang kekurangan tenaga pengajar. Materi yang diajarkan meliputi Matematika, Bahasa Indonesia, dan Bahasa Inggris dasar. Relawan diharapkan dapat menciptakan suasana belajar yang menyenangkan.',
    category: 'education',
    location: 'SDN Sumberejo 1',
    city: 'Malang',
    date: '2025-02-15',
    time: '08:00',
    duration: '4 jam',
    capacity: 10,
    enrolledCount: 7,
    organizerId: 'organizer-1',
    organizerName: 'Yayasan Peduli Anak',
    status: 'published',
    requirements: 'Sabar dalam mengajar, memiliki pengalaman mengajar lebih disukai',
    tags: ['pendidikan', 'anak-anak', 'mengajar', 'desa'],
    rating: 4.8,
    reviewCount: 12,
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    createdAt: '2025-01-20T10:00:00Z'
  },
  {
    id: 'activity-2',
    title: 'Workshop Komputer untuk Remaja',
    description: 'Mengajarkan skill komputer dasar seperti Microsoft Office, internet browsing, dan email kepada remaja di panti asuhan. Kegiatan ini bertujuan mempersiapkan mereka menghadapi dunia digital.',
    category: 'education',
    location: 'Panti Asuhan Harapan',
    city: 'Surabaya',
    date: '2025-02-20',
    time: '13:00',
    duration: '3 jam',
    capacity: 8,
    enrolledCount: 5,
    organizerId: 'organizer-1',
    organizerName: 'Yayasan Peduli Anak',
    status: 'published',
    requirements: 'Menguasai Microsoft Office dan internet, membawa laptop sendiri',
    tags: ['pendidikan', 'komputer', 'remaja', 'teknologi'],
    rating: 4.5,
    reviewCount: 8,
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
    createdAt: '2025-01-21T11:00:00Z'
  },

  // LINGKUNGAN
  {
    id: 'activity-3',
    title: 'Penanaman 1000 Pohon di Gunung Arjuno',
    description: 'Kegiatan penanaman pohon untuk reboisasi area Gunung Arjuno yang telah mengalami deforestasi. Bibit pohon sudah disiapkan oleh panitia. Relawan akan membantu proses penanaman dan perawatan awal.',
    category: 'environment',
    location: 'Lereng Gunung Arjuno',
    city: 'Malang',
    date: '2025-02-10',
    time: '06:00',
    duration: '6 jam',
    capacity: 50,
    enrolledCount: 42,
    organizerId: 'organizer-2',
    organizerName: 'Komunitas Hijau Indonesia',
    status: 'published',
    requirements: 'Sehat jasmani, membawa peralatan berkebun jika ada, siap bekerja outdoor',
    tags: ['lingkungan', 'penanaman', 'pohon', 'gunung'],
    rating: 4.9,
    reviewCount: 35,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
    createdAt: '2025-01-18T09:00:00Z'
  },
  {
    id: 'activity-4',
    title: 'Bersih-bersih Pantai Sendang Biru',
    description: 'Aksi bersih-bersih pantai dari sampah plastik dan limbah. Kegiatan ini bertujuan menjaga kelestarian pantai dan ekosistem laut. Semua peralatan sudah disediakan panitia.',
    category: 'environment',
    location: 'Pantai Sendang Biru',
    city: 'Malang',
    date: '2025-02-25',
    time: '07:00',
    duration: '4 jam',
    capacity: 40,
    enrolledCount: 28,
    organizerId: 'organizer-2',
    organizerName: 'Komunitas Hijau Indonesia',
    status: 'published',
    requirements: 'Membawa sarung tangan jika ada, siap bekerja di pantai',
    tags: ['lingkungan', 'pantai', 'sampah', 'plastik'],
    rating: 4.7,
    reviewCount: 22,
    imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800',
    createdAt: '2025-01-22T10:00:00Z'
  },

  // KESEHATAN
  {
    id: 'activity-5',
    title: 'Donor Darah Sukarela',
    description: 'Kegiatan donor darah yang diadakan oleh PMI untuk membantu persediaan darah di PMI Kota Malang. Setiap pendonor akan mendapat sertifikat dan snack.',
    category: 'health',
    location: 'PMI Kota Malang',
    city: 'Malang',
    date: '2025-02-08',
    time: '08:00',
    duration: '5 jam',
    capacity: 100,
    enrolledCount: 67,
    organizerId: 'organizer-3',
    organizerName: 'PMI Kota Malang',
    status: 'published',
    requirements: 'Sehat, berat badan minimal 45kg, usia 17-60 tahun, tidak sedang hamil/menyusui',
    tags: ['kesehatan', 'donor darah', 'PMI', 'sukarela'],
    rating: 4.9,
    reviewCount: 45,
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    createdAt: '2025-01-15T08:00:00Z'
  },
  {
    id: 'activity-6',
    title: 'Pemeriksaan Kesehatan Gratis untuk Lansia',
    description: 'Kegiatan pemeriksaan kesehatan gratis untuk lansia di puskesmas. Meliputi cek tensi, gula darah, kolesterol, dan konsultasi kesehatan.',
    category: 'health',
    location: 'Puskesmas Dinoyo',
    city: 'Malang',
    date: '2025-02-18',
    time: '08:00',
    duration: '4 jam',
    capacity: 15,
    enrolledCount: 12,
    organizerId: 'organizer-3',
    organizerName: 'PMI Kota Malang',
    status: 'published',
    requirements: 'Tenaga medis atau mahasiswa kesehatan, membawa alat medis jika ada',
    tags: ['kesehatan', 'lansia', 'pemeriksaan', 'gratis'],
    rating: 4.8,
    reviewCount: 10,
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800',
    createdAt: '2025-01-23T09:00:00Z'
  },

  // SOSIAL
  {
    id: 'activity-7',
    title: 'Berbagi Takjil untuk Anak Yatim',
    description: 'Kegiatan berbagi takjil dan berbuka puasa bersama dengan anak-anak yatim di panti asuhan. Relawan membantu persiapan dan distribusi makanan.',
    category: 'social',
    location: 'Panti Asuhan Al-Ikhlas',
    city: 'Surabaya',
    date: '2025-03-15',
    time: '15:00',
    duration: '3 jam',
    capacity: 20,
    enrolledCount: 15,
    organizerId: 'organizer-1',
    organizerName: 'Yayasan Peduli Anak',
    status: 'published',
    requirements: 'Ikhlas membantu, bisa memasak lebih disukai',
    tags: ['sosial', 'berbagi', 'anak yatim', 'ramadhan'],
    rating: 4.9,
    reviewCount: 18,
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
    createdAt: '2025-01-25T10:00:00Z'
  },
  {
    id: 'activity-8',
    title: 'Kunjungan ke Panti Jompo',
    description: 'Kegiatan menghibur dan menemani kakek nenek di panti jompo. Relawan akan bermain games, bernyanyi, dan mengobrol bersama.',
    category: 'social',
    location: 'Panti Jompo Werdha',
    city: 'Malang',
    date: '2025-02-22',
    time: '09:00',
    duration: '3 jam',
    capacity: 15,
    enrolledCount: 10,
    organizerId: 'organizer-1',
    organizerName: 'Yayasan Peduli Anak',
    status: 'published',
    requirements: 'Sabar, ramah, bisa bernyanyi atau membawa alat musik lebih disukai',
    tags: ['sosial', 'lansia', 'panti jompo', 'menghibur'],
    rating: 4.7,
    reviewCount: 9,
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800',
    createdAt: '2025-01-24T11:00:00Z'
  }
]

// ============================================
// 3. ACTIVITY REQUESTS (Permohonan Kegiatan)
// ============================================

export const mockActivityRequests = [
  // PENDING
  {
    id: 'request-1',
    title: 'Renovasi Perpustakaan Desa',
    description: 'Membantu renovasi perpustakaan desa yang sudah lama tidak terurus. Termasuk pengecatan, perbaikan rak buku, dan penataan ulang.',
    category: 'social',
    location: 'Perpustakaan Desa Pandanrejo',
    city: 'Malang',
    date: '2025-03-01',
    time: '08:00',
    duration: '6 jam',
    capacity: 20,
    organizerId: 'organizer-1',
    organizerName: 'Yayasan Peduli Anak',
    status: 'pending',
    requirements: 'Bisa pengecatan, membawa peralatan jika ada',
    tags: ['sosial', 'renovasi', 'perpustakaan', 'desa'],
    requestedAt: '2025-01-26T10:00:00Z'
  },
  {
    id: 'request-2',
    title: 'Edukasi Pemilahan Sampah di Sekolah',
    description: 'Memberikan edukasi kepada siswa SD tentang pentingnya pemilahan sampah organik dan anorganik serta cara daur ulang.',
    category: 'environment',
    location: 'SDN Lowokwaru 3',
    city: 'Malang',
    date: '2025-03-10',
    time: '09:00',
    duration: '3 jam',
    capacity: 5,
    organizerId: 'organizer-2',
    organizerName: 'Komunitas Hijau Indonesia',
    status: 'pending',
    requirements: 'Menguasai materi lingkungan, bisa mengajar anak-anak',
    tags: ['lingkungan', 'edukasi', 'sampah', 'sekolah'],
    requestedAt: '2025-01-27T11:00:00Z'
  },

  // APPROVED
  {
    id: 'request-3',
    title: 'Bakti Sosial Kesehatan di Desa Terpencil',
    description: 'Kegiatan pemeriksaan kesehatan gratis dan pembagian obat-obatan untuk masyarakat desa terpencil.',
    category: 'health',
    location: 'Desa Ngadas',
    city: 'Malang',
    date: '2025-02-28',
    time: '08:00',
    duration: '5 jam',
    capacity: 10,
    organizerId: 'organizer-3',
    organizerName: 'PMI Kota Malang',
    status: 'approved',
    requirements: 'Tenaga medis, membawa peralatan medis',
    tags: ['kesehatan', 'bakti sosial', 'desa', 'gratis'],
    requestedAt: '2025-01-20T09:00:00Z',
    reviewedAt: '2025-01-22T10:00:00Z'
  },

  // REJECTED
  {
    id: 'request-4',
    title: 'Festival Musik Amal',
    description: 'Mengadakan festival musik dengan hasil penjualan tiket untuk donasi anak yatim.',
    category: 'social',
    location: 'Alun-alun Kota Malang',
    city: 'Malang',
    date: '2025-04-01',
    time: '16:00',
    duration: '5 jam',
    capacity: 100,
    organizerId: 'organizer-1',
    organizerName: 'Yayasan Peduli Anak',
    status: 'rejected',
    requirements: 'Panitia acara, keamanan, sound system',
    tags: ['sosial', 'musik', 'amal', 'festival'],
    requestedAt: '2025-01-15T10:00:00Z',
    reviewedAt: '2025-01-18T14:00:00Z',
    rejectionReason: 'Perizinan untuk acara besar di alun-alun memerlukan waktu persiapan lebih lama. Silakan ajukan 3 bulan sebelum kegiatan dengan melampirkan proposal lengkap dan surat izin dari pihak terkait.'
  }
]

// ============================================
// 4. ENROLLMENTS (Pendaftaran)
// ============================================

export const mockEnrollments = [
  // Activity 1 - Mengajar Anak-anak
  {
    id: 'enrollment-1',
    activityId: 'activity-1',
    activityTitle: 'Mengajar Anak-anak Desa Sumberejo',
    volunteerId: 'volunteer-1',
    volunteerName: 'Budi Santoso',
    volunteerEmail: 'volunteer@test.com',
    status: 'accepted',
    message: 'Saya sangat tertarik membantu anak-anak di desa. Saya punya pengalaman mengajar les privat.',
    enrolledAt: '2025-01-21T10:00:00Z'
  },
  {
    id: 'enrollment-2',
    activityId: 'activity-1',
    activityTitle: 'Mengajar Anak-anak Desa Sumberejo',
    volunteerId: 'volunteer-2',
    volunteerName: 'Siti Nurhaliza',
    volunteerEmail: 'siti@test.com',
    status: 'accepted',
    message: 'Sebagai guru, saya ingin berbagi ilmu kepada anak-anak yang membutuhkan.',
    enrolledAt: '2025-01-22T11:00:00Z'
  },

  // Activity 3 - Penanaman Pohon
  {
    id: 'enrollment-3',
    activityId: 'activity-3',
    activityTitle: 'Penanaman 1000 Pohon di Gunung Arjuno',
    volunteerId: 'volunteer-1',
    volunteerName: 'Budi Santoso',
    volunteerEmail: 'volunteer@test.com',
    status: 'accepted',
    message: 'Saya peduli lingkungan dan siap membantu reboisasi.',
    enrolledAt: '2025-01-19T09:00:00Z'
  },
  {
    id: 'enrollment-4',
    activityId: 'activity-3',
    activityTitle: 'Penanaman 1000 Pohon di Gunung Arjuno',
    volunteerId: 'volunteer-3',
    volunteerName: 'Ahmad Fauzi',
    volunteerEmail: 'ahmad@test.com',
    status: 'pending',
    message: 'Ingin ikut berkontribusi untuk lingkungan yang lebih hijau.',
    enrolledAt: '2025-01-28T10:00:00Z'
  },

  // Activity 5 - Donor Darah
  {
    id: 'enrollment-5',
    activityId: 'activity-5',
    activityTitle: 'Donor Darah Sukarela',
    volunteerId: 'volunteer-2',
    volunteerName: 'Siti Nurhaliza',
    volunteerEmail: 'siti@test.com',
    status: 'accepted',
    message: 'Saya rutin donor darah dan ingin membantu.',
    enrolledAt: '2025-01-16T10:00:00Z'
  },
  {
    id: 'enrollment-6',
    activityId: 'activity-5',
    activityTitle: 'Donor Darah Sukarela',
    volunteerId: 'volunteer-3',
    volunteerName: 'Ahmad Fauzi',
    volunteerEmail: 'ahmad@test.com',
    status: 'rejected',
    message: 'Sebagai tenaga medis, saya ingin berkontribusi.',
    enrolledAt: '2025-01-17T11:00:00Z',
    rejectionReason: 'Maaf, berdasarkan riwayat kesehatan terakhir, Anda belum bisa donor darah. Silakan coba lagi 3 bulan ke depan.'
  },

  // Activity 7 - Berbagi Takjil
  {
    id: 'enrollment-7',
    activityId: 'activity-7',
    activityTitle: 'Berbagi Takjil untuk Anak Yatim',
    volunteerId: 'volunteer-1',
    volunteerName: 'Budi Santoso',
    volunteerEmail: 'volunteer@test.com',
    status: 'pending',
    message: 'Saya ingin berbagi kebahagiaan dengan anak-anak yatim.',
    enrolledAt: '2025-01-28T12:00:00Z'
  }
]

// ============================================
// 5. REVIEWS (Review & Rating)
// ============================================

export const mockReviews = [
  // Activity 1 - Mengajar
  {
    id: 'review-1',
    activityId: 'activity-1',
    activityTitle: 'Mengajar Anak-anak Desa Sumberejo',
    volunteerId: 'volunteer-1',
    volunteerName: 'Budi Santoso',
    rating: 5,
    comment: 'Kegiatan yang sangat bermakna! Anak-anak sangat antusias belajar. Panitia juga sangat terorganisir. Recommended!',
    createdAt: '2025-01-23T15:00:00Z'
  },
  {
    id: 'review-2',
    activityId: 'activity-1',
    activityTitle: 'Mengajar Anak-anak Desa Sumberejo',
    volunteerId: 'volunteer-2',
    volunteerName: 'Siti Nurhaliza',
    rating: 5,
    comment: 'Pengalaman mengajar yang luar biasa. Anak-anak sangat lucu dan mau belajar. Terima kasih Yayasan Peduli Anak!',
    createdAt: '2025-01-23T16:00:00Z'
  },

  // Activity 3 - Penanaman Pohon
  {
    id: 'review-3',
    activityId: 'activity-3',
    activityTitle: 'Penanaman 1000 Pohon di Gunung Arjuno',
    volunteerId: 'volunteer-1',
    volunteerName: 'Budi Santoso',
    rating: 5,
    comment: 'Kegiatan yang sangat positif untuk lingkungan. Pemandangan di Gunung Arjuno juga indah. Capek tapi puas!',
    createdAt: '2025-02-11T17:00:00Z'
  },

  // Activity 5 - Donor Darah
  {
    id: 'review-4',
    activityId: 'activity-5',
    activityTitle: 'Donor Darah Sukarela',
    volunteerId: 'volunteer-2',
    volunteerName: 'Siti Nurhaliza',
    rating: 5,
    comment: 'Pelayanan PMI sangat baik dan profesional. Prosesnya cepat dan nyaman. Akan donor lagi next time!',
    createdAt: '2025-02-09T14:00:00Z'
  },

  // Activity 4 - Bersih-bersih Pantai
  {
    id: 'review-5',
    activityId: 'activity-4',
    activityTitle: 'Bersih-bersih Pantai Sendang Biru',
    volunteerId: 'volunteer-3',
    volunteerName: 'Ahmad Fauzi',
    rating: 4,
    comment: 'Kegiatan bagus untuk menjaga kebersihan pantai. Sayang cuaca agak panas, tapi overall oke!',
    createdAt: '2025-02-26T16:00:00Z'
  }
]

// ============================================
// 6. FOLLOWS (Follow Organizer)
// ============================================

export const mockFollows = [
  {
    id: 'follow-1',
    volunteerId: 'volunteer-1',
    volunteerName: 'Budi Santoso',
    organizerId: 'organizer-1',
    organizerName: 'Yayasan Peduli Anak',
    notificationEnabled: true,
    followedAt: '2025-01-21T10:00:00Z'
  },
  {
    id: 'follow-2',
    volunteerId: 'volunteer-1',
    volunteerName: 'Budi Santoso',
    organizerId: 'organizer-2',
    organizerName: 'Komunitas Hijau Indonesia',
    notificationEnabled: true,
    followedAt: '2025-01-19T09:00:00Z'
  },
  {
    id: 'follow-3',
    volunteerId: 'volunteer-2',
    volunteerName: 'Siti Nurhaliza',
    organizerId: 'organizer-1',
    organizerName: 'Yayasan Peduli Anak',
    notificationEnabled: false,
    followedAt: '2025-01-22T11:00:00Z'
  },
  {
    id: 'follow-4',
    volunteerId: 'volunteer-2',
    volunteerName: 'Siti Nurhaliza',
    organizerId: 'organizer-3',
    organizerName: 'PMI Kota Malang',
    notificationEnabled: true,
    followedAt: '2025-01-16T10:00:00Z'
  },
  {
    id: 'follow-5',
    volunteerId: 'volunteer-3',
    volunteerName: 'Ahmad Fauzi',
    organizerId: 'organizer-3',
    organizerName: 'PMI Kota Malang',
    notificationEnabled: true,
    followedAt: '2025-01-17T12:00:00Z'
  }
]

// ============================================
// 7. ACTIVITY LISTS (Daftar Kegiatan)
// ============================================

export const mockActivityLists = [
  {
    id: 'list-1',
    volunteerId: 'volunteer-1',
    volunteerName: 'Budi Santoso',
    listName: 'Kegiatan Favorit',
    activityIds: ['activity-1', 'activity-3', 'activity-7'],
    createdAt: '2025-01-21T10:00:00Z',
    updatedAt: '2025-01-28T12:00:00Z'
  },
  {
    id: 'list-2',
    volunteerId: 'volunteer-1',
    volunteerName: 'Budi Santoso',
    listName: 'Untuk Nanti',
    activityIds: ['activity-2', 'activity-4'],
    createdAt: '2025-01-22T11:00:00Z',
    updatedAt: '2025-01-22T11:00:00Z'
  },
  {
    id: 'list-3',
    volunteerId: 'volunteer-2',
    volunteerName: 'Siti Nurhaliza',
    listName: 'Kegiatan Pendidikan',
    activityIds: ['activity-1', 'activity-2'],
    createdAt: '2025-01-22T12:00:00Z',
    updatedAt: '2025-01-22T12:00:00Z'
  }
]

// ============================================
// HELPER: Category Options
// ============================================

export const categoryOptions = [
  { value: 'education', label: 'Pendidikan' },
  { value: 'environment', label: 'Lingkungan' },
  { value: 'health', label: 'Kesehatan' },
  { value: 'social', label: 'Sosial' }
]

// ============================================
// HELPER: Status Options
// ============================================

export const enrollmentStatusOptions = [
  { value: 'pending', label: 'Menunggu' },
  { value: 'accepted', label: 'Diterima' },
  { value: 'rejected', label: 'Ditolak' }
]

export const requestStatusOptions = [
  { value: 'pending', label: 'Menunggu Review' },
  { value: 'approved', label: 'Disetujui' },
  { value: 'rejected', label: 'Ditolak' }
]