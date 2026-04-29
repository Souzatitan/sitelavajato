import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import HeaderInterno from "../components/HeaderInterno";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 👑 ADMIN
    if (email === "admin@teste.com" && senha === "123") {
      localStorage.setItem("user", JSON.stringify({ tipo: "admin" }));
      navigate("/admin");
      return;
    }

    // 👤 CLIENTE
    if (email && senha) {
      localStorage.setItem("user", JSON.stringify({ tipo: "cliente" }));
      navigate("/dashboard");
      return;
    }

    alert("Preencha os campos!");
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

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Entrar
          </button>
        </form>

        <p className="text-center mt-4">
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="text-blue-600">
            Cadastre-se
          </Link>
        </p>

      </div>
    </div>
  );
}