import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getFollowing = async () => {
    const token = localStorage.getItem('access_token'); // ambil token dari localStorage
    return axios.get(`${API_URL}/following`, {
    headers: {
      Authorization: `Bearer ${token}`, // kirim token ke backend
    },
  });
}

export const getFollower = async (id) => {
  const token = localStorage.getItem('access_token'); // ambil token dari localStorage
  return axios.get(`${API_URL}/follower/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, // kirim token ke backend
    },
  });
};

export const createFollow = async (data) => {
  const token = localStorage.getItem('access_token'); // ambil token dari localStorage
  return axios.post(`${API_URL}/following`, data , {
    headers: {
      Authorization: `Bearer ${token}`, // kirim token ke backend
    },
  });
};

export const updateFollow = async (id, data) => {
  const token = localStorage.getItem('access_token'); // ambil token dari localStorage
  return axios.put(`${API_URL}/following/${id}/notifications`, data,  {
    headers: {
      Authorization: `Bearer ${token}`, // kirim token ke backend
    },
  });
};

export const unfollow = async(id) => {
    const token = localStorage.getItem('access_token'); // ambil token dari localStorage
    return axios.delete(`${API_URL}/following/${id}`, {
        headers: {
        Authorization: `Bearer ${token}`, // kirim token ke backend
        },
    });
};
