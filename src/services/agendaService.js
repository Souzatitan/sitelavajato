const USE_MOCK = true;

export const getAgenda = async () => {
  if (USE_MOCK) {
    return JSON.parse(localStorage.getItem("agenda") || "[]");
  }

  const response = await api.get("/agenda");
  return response.data;
};

export const criarAgenda = async (data, horarios) => {
  if (USE_MOCK) {
    const atual = JSON.parse(localStorage.getItem("agenda") || "[]");

    const filtrado = atual.filter((item) => item.data !== data);
    const nova = [...filtrado, { data, horarios }];

    localStorage.setItem("agenda", JSON.stringify(nova));

    return nova;
  }

  const response = await api.post("/agenda", { data, horarios });
  return response.data;
};