import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="h-[90vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/carro.png')", // coloque sua imagem na pasta public
      }}
    >
      {/* Overlay escuro */}
      <div className="bg-black/60 w-full h-full flex items-center justify-center">
        
        <div className="text-center text-white px-4">
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            O cuidado que seu carro merece <br />
            sem sair de casa.
          </h2>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            
            <Link to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition">
              Agendar lavagem
            </Link>

            <a
              href="#"
              className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold transition"
            >
              Conhecer serviços
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}