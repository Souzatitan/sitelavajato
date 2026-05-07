import axios from "axios";

const API = "https://sitelavajato-backend.onrender.com";

// login cliente
export const loginCliente = async (email, senha) => {
  const res = await axios.post(`${API}/clientes/login`, {
    email,
    senha,
  });
  return res.data;
};

// login admin
export const loginAdmin = async (email, senha) => {
  const res = await axios.post(`${API}/admin/login`, {
    email,
    senha,
  });
  return res.data;
};