import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginAdmin, loginCliente } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    setLoading(true);

    let response;

    if (email.includes("admin")) {
      response = await loginAdmin(email, senha);
    } else {
      response = await loginCliente(email, senha);
    }

    // 🔐 salva token
    localStorage.setItem("token", response.token);

    // 👤 salva usuário (APENAS o usuario)
    localStorage.setItem("user", JSON.stringify(response.usuario));

    // 🚀 redireciona (com reload)
    if (response.usuario.tipo === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/dashboard";
    }

  } catch (err) {
    console.error(err);
    alert("Email ou senha inválidos");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="text-blue-600 hover:underline">
            Cadastre-se
          </Link>
        </p>

      </div>
    </div>
  );
}