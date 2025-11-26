import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const login = (credentials) => axios.post(`${API_URL}/login`, 
credentials); 
export const register = (data) => axios.post(`${API_URL}/register`, 
data); 
export const logout = () => {
    const token = localStorage.getItem('access_token');

    return axios.post(
        `${API_URL}/logout`,
        {}, // body kosong
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

