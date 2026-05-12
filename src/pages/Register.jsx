import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://sitelavajato-backend.onrender.com/clientes/register",
        {
          nome,
          email,
          senha,
        }
      );

      console.log(response.data);

      alert("Cadastro realizado com sucesso!");

      navigate("/login");

    } catch (err) {
      console.error(err);

      if (err.response?.data?.erro) {
        alert(err.response.data.erro);
      } else {
        alert("Erro ao cadastrar");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Cadastro
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

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
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

        </form>

        <p className="text-center mt-4 text-gray-600">
          Já tem conta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Fazer login
          </Link>
        </p>

      </div>
    </div>
  );
}