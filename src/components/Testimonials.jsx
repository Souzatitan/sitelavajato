import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-100">
      
      {/* Título */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          O que nossos clientes dizem
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        
        {/* Depoimento 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          
          <div className="flex mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          <p className="text-gray-600 mb-4">
            Serviço excelente! Meu carro ficou como novo, super recomendo.
          </p>

          <h4 className="font-semibold text-gray-800">
            João Silva
          </h4>
        </div>

        {/* Depoimento 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          
          <div className="flex mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          <p className="text-gray-600 mb-4">
            Atendimento rápido e de qualidade. Vale muito a pena!
          </p>

          <h4 className="font-semibold text-gray-800">
            Maria Souza
          </h4>
        </div>

        {/* Depoimento 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          
          <div className="flex mb-3">
            {[...Array(4)].map((_, i) => (
              <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
            ))}
            <Star size={18} className="text-gray-300" />
          </div>

          <p className="text-gray-600 mb-4">
            Gostei muito do resultado, equipe bem profissional!
          </p>

          <h4 className="font-semibold text-gray-800">
            Carlos Oliveira
          </h4>
        </div>

      </div>
    </section>
  );
}