import axios from "axios";

const API = "https://sitelavajato-backend.onrender.com";

export const getAgenda = async () => {
  const res = await axios.get(`${API}/horarios`);
  return res.data;
};

export const criarAgenda = async (data, horarios) => {
  return await axios.post(`${API}/horarios`, {
    data,
    horarios,
  });
};