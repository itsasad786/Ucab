import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// Add JWT to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('ucab_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle 401 - clear token and redirect
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem('ucab_token');
            localStorage.removeItem('ucab_user');
        }
        return Promise.reject(err);
    }
);

export default api;
