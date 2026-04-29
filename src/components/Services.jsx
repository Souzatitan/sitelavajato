import { Car, Sparkles, Sofa } from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <section className="py-16 bg-gray-100">
      
      {/* Título */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Nossos Serviços
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:scale-105 transition">
          <Car size={40} className="mx-auto text-blue-600 mb-4" />
          
          <h3 className="text-xl font-semibold mb-2">
            Lavagem Completa
          </h3>

          <p className="text-gray-600 mb-4">
            R$ 50,00
          </p>

          <Link to="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Agendar
          </Link>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:scale-105 transition">
          <Sparkles size={40} className="mx-auto text-blue-600 mb-4" />
          
          <h3 className="text-xl font-semibold mb-2">
            Estética Automotiva
          </h3>

          <p className="text-gray-600 mb-4">
            R$ 120,00
          </p>

        <Link to="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Agendar
          </Link>
        
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:scale-105 transition">
          <Sofa size={40} className="mx-auto text-blue-600 mb-4" />
          
          <h3 className="text-xl font-semibold mb-2">
            Limpeza Interna
          </h3>

          <p className="text-gray-600 mb-4">
            R$ 70,00
          </p>

          <Link to="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Agendar
          </Link>
        
        </div>

      </div>
    </section>
  );
}