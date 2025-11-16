import axios from 'axios';

// For Netlify deployment, we need to use the correct API URL
const API = axios.create({ 
  baseURL: '/api'
});

export default API;