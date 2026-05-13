import api from "./api";

// 📋 listar horários
export const getAgenda = async () => {
  const res = await api.get("/horarios");
  return res.data;
};

// ➕ criar agenda
export const criarAgenda = async (data, horarios) => {

  for (const hora of horarios) {

    await api.post("/horarios", {
      data,
      hora,
    });

  }

};