import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login as loginAPI, logout as logoutAPI } from
'../services/auth';

export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref(localStorage.getItem('access_token') || '');
    const isLoggedIn = ref(!!accessToken.value);
    const login = async (credentials) => {
        try {
            const res = await loginAPI(credentials);
            accessToken.value = res.data.access_token;
            localStorage.setItem('access_token', accessToken.value);
            isLoggedIn.value = true;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
    try {
        await logoutAPI();
    } catch {
        // ignore error saat logout API gagal
    }
    accessToken.value = '';
    localStorage.removeItem('access_token');
    isLoggedIn.value = false;
};

return { accessToken, isLoggedIn, login, logout };
});