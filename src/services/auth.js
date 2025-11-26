import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const login = (credentials) => axios.post(`${API_URL}/login`, 
credentials); 
export const register = (data) => axios.post(`${API_URL}/register`, 
data); 
export const logout = () => axios.post(`${API_URL}/logout`); 

export const fetchProfile = async () => {
  const token = localStorage.getItem('access_token'); // ambil token dari localStorage
  return axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};