import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Helper untuk header Authorization
const authHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Opsional, sesuaikan dengan backend
    },
  };
};

// 1. Ambil semua daftar kegiatan (GET)
export const getActivities = () => {
  return axios.get(`${API_URL}/activities`, authHeader());
};

// 2. Ambil detail satu kegiatan berdasarkan ID (GET)
export const getActivity = (id) => {
  return axios.get(`${API_URL}/activities/${id}`, authHeader());
};

// 3. Buat kegiatan baru (POST)
export const createActivity = (data) => {
  return axios.post(`${API_URL}/activities`, data, authHeader());
};

// 4. Update kegiatan (PUT/PATCH)
export const updateActivity = (id, data) => {
  return axios.put(`${API_URL}/activities/${id}`, data, authHeader());
};

// 5. Hapus kegiatan (DELETE)
export const deleteActivity = (id) => {
  return axios.delete(`${API_URL}/activities/${id}`, authHeader());
};

// 6. Publikasikan kegiatan (PATCH khusus status)
// Asumsi endpoint backend untuk publish adalah /activities/{id}/publish
export const publishActivity = (id) => {
  return axios.patch(`${API_URL}/activities/${id}/publish`, { status: 'Sudah Dipublikasikan' }, authHeader());
};