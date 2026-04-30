import api from "./api";

const USE_MOCK = true;

export const login = async (email, senha) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !senha) {
        reject("Campos obrigatórios");
      }

      if (email.includes("admin")) {
        resolve({ email, tipo: "admin" });
      } else {
        resolve({ email, tipo: "cliente" });
      }
    }, 500);
  });

  // 🔥 QUANDO TIVER BACK
  const response = await api.post("/login", { email, senha });
  return response.data;
};