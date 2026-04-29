import { Link, useNavigate } from "react-router-dom";

export default function HeaderInterno() {
  const navigate = useNavigate();

  const sair = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center mb-6">
      
      <Link to="/" className="text-xl font-bold">
        Lava Jato
      </Link>

      <div className="flex gap-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Início
        </Link>

        <button
          onClick={sair}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Sair
        </button>
      </div>

    </div>
  );
}