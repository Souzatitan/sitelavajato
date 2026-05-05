import api from "./api";

export const getHorariosDisponiveis = async () => {
  const res = await api.get("/horarios/disponiveis");
  return res.data;
};