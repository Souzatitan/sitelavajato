import { useState, useEffect } from "react";
import HeaderInterno from "../components/HeaderInterno";

export default function Admin() {
  const [dias, setDias] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [novoHorario, setNovoHorario] = useState("");

  // carregar dados salvos
  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("disponibilidade"));
    if (dados) {
      setDias(dados.dias || []);
      setHorarios(dados.horarios || []);
    }
  }, []);

  // salvar no localStorage
  const salvar = () => {
    const dados = { dias, horarios };
    localStorage.setItem("disponibilidade", JSON.stringify(dados));
    alert("Disponibilidade salva!");
  };

  // adicionar horário
  const adicionarHorario = () => {
    if (!novoHorario) return;
    setHorarios([...horarios, novoHorario]);
    setNovoHorario("");
  };

  // selecionar dias
  const toggleDia = (dia) => {
    if (dias.includes(dia)) {
      setDias(dias.filter((d) => d !== dia));
    } else {
      setDias([...dias, dia]);
    }
  };

  const diasSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  return (
    
    <div className="min-h-screen bg-gray-100 p-6">
        <HeaderInterno />
      
      <h1 className="text-3xl font-bold mb-8">
        Área do Empreendedor
      </h1>

      {/* Dias */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Dias disponíveis
        </h2>

        <div className="flex flex-wrap gap-3">
          {diasSemana.map((dia) => (
            <button
              key={dia}
              onClick={() => toggleDia(dia)}
              className={`px-4 py-2 rounded-lg ${
                dias.includes(dia)
                  ? "bg-blue-600 text-white"
                  : "bg-white shadow"
              }`}
            >
              {dia}
            </button>
          ))}
        </div>
      </div>

      {/* Horários */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Horários disponíveis
        </h2>

        <div className="flex gap-2 mb-4">
          <input
            type="time"
            value={novoHorario}
            onChange={(e) => setNovoHorario(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={adicionarHorario}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Adicionar
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {horarios.map((hora, index) => (
            <span
              key={index}
              className="bg-white px-3 py-2 rounded shadow"
            >
              {hora}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={salvar}
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Salvar Disponibilidade
      </button>

     

    </div>
  );
}