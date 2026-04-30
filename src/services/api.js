import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // 
});

const USE_MOCK = true; // 🔥 muda pra false quando tiver backend
export default api;