import api from "./api";

// 📋 listar todos
export const getAgendamentos = async () => {
  const res = await api.get("/agendamentos");
  return res.data;
};

// ➕ criar agendamento
export const criarAgendamento = async (dados) => {
  const res = await api.post("/agendamentos", dados);
  return res.data;
};

// ✅ confirmar (admin)
export const confirmarAgendamento = async (id) => {
  const res = await api.patch(`/agendamentos/${id}/status`);
  return res.data;
};

// ❌ cancelar
export const cancelarAgendamento = async (id) => {
  const res = await api.patch(`/agendamentos/${id}/cancelar`);
  return res.data;
};

// 🗑 excluir
export const excluirAgendamento = async (id) => {
  const res = await api.delete(`/agendamentos/${id}`);
  return res.data;
};