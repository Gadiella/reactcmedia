import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Gestion globale des erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log l'erreur de manière sécurisée
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return Promise.reject(error);
  }
);

export const authService = {
  register: (data) => api.post('/register', data),
  verifyEmail: (data) => api.post('/verify-email', data),
  login: (data) => api.post('/login', data),
};


export const artistService = {
  getAll: () => api.get('/artists'),
  getOne: (id) => api.get(`/artists/${id}`),
  getVoteCount: (id) => api.get(`/artists/${id}/votes`),  // Ajout de la méthode pour récupérer les votes
  getByName: (name) => api.get(`/artists/search/${name}`),
  getByCountry: (country) => api.get(`/artists/country/${country}`),
  getByCategory: (category) => api.get(`/artists/category/${category}`),
  getCategories: () => api.get('/categories'),
  getCountries: () => api.get('/countries'),
  getArtistStats: () => api.get('/artists/count-by-category'),
  create: (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }
    return api.post('/artists', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  update: (id, data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }
    formData.append('_method', 'POST'); // Pour Laravel
    return api.post(`/artists/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: (id) => api.delete(`/artists/${id}`),
};


export default api;