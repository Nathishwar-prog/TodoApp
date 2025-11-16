import axios from 'axios';

// For the integrated deployment, we need to proxy API requests
const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || '/api' 
});

export default API;