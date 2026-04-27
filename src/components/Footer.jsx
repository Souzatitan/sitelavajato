import { FaInstagram, FaFacebook } from "react-icons/fa";
import {  Phone, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        
        {/* 1️⃣ Horário + Endereço */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Atendimento
          </h3>

          <p className="text-gray-300">
            Seg - Sáb: 08:00 às 18:00
          </p>
          <p className="text-gray-300 mb-4">
            Domingos: Fechado
          </p>

          <p className="text-gray-400">
            Rua Exemplo, 123 <br />
            Jaboticabal - SP
          </p>
        </div>

        {/* 2️⃣ Google Maps */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Localização
          </h3>

          <iframe
            title="mapa"
            src="https://www.google.com/maps?q=Jaboticabal+SP&output=embed"
            className="w-full h-48 rounded-lg border-0"
            loading="lazy"
          ></iframe>
        </div>

        {/* 3️⃣ Contato + Redes */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contato
          </h3>

          <div className="flex items-center gap-2 mb-4">
            <Phone size={18} />
            <span>(16) 99999-9999</span>
          </div>

          <div className="flex gap-4">
            
            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition"
            >
              <FaInstagram size={20} />
            </a>

            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition"
            >
              <FaFacebook size={20} />
            </a>

          </div>
        </div>

      </div>

      {/* Linha final */}
      <div className="text-center text-gray-500 mt-10 text-sm">
        © {new Date().getFullYear()} Lava Jato - Todos os direitos reservados
      </div>
    </footer>
  );
}