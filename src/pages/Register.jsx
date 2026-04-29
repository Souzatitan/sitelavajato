import { Link } from "react-router-dom";


export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Cadastro
        </h2>

        <form className="space-y-4">
          
          <input
            type="text"
            placeholder="Nome"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 border rounded-lg"
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Cadastrar
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