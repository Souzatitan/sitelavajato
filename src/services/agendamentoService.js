const USE_MOCK = true;

export const getAgendamentos = async () => {
  if (USE_MOCK) {
    return JSON.parse(localStorage.getItem("agendamentos") || "[]");
  }

  const response = await api.get("/agendamentos");
  return response.data;
};

export const criarAgendamento = async (dados) => {
  if (USE_MOCK) {
    const atual = JSON.parse(localStorage.getItem("agendamentos") || "[]");

    const novo = { ...dados, id: Date.now() };

    const lista = [novo, ...atual];

    localStorage.setItem("agendamentos", JSON.stringify(lista));

    return novo;
  }

  const response = await api.post("/agendamentos", dados);
  return response.data;
};

export const excluirAgendamento = async (id) => {
  if (USE_MOCK) {
    const atual = JSON.parse(localStorage.getItem("agendamentos") || "[]");

    const nova = atual.filter((item) => item.id !== id);

    localStorage.setItem("agendamentos", JSON.stringify(nova));

    return;
  }

  await api.delete(`/agendamentos/${id}`);
};