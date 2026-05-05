import { useState, useEffect } from "react";
import HeaderInterno from "../components/HeaderInterno";

import {
  getAgendamentos,
  criarAgendamento,
  cancelarAgendamento
} from "../services/agendamentoService";

import { getAgenda } from "../services/agendaService";

export default function Dashboard() {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [agenda, setAgenda] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  const [historico] = useState([
    { data: "2026-04-10", hora: "10:00", servico: "Lavagem Completa" },
  ]);

  // 🔄 carregar dados
  const carregarDados = async () => {
    try {
      const agendaAPI = await getAgenda();
      const agendamentosAPI = await getAgendamentos();

      setAgenda(agendaAPI);
      setAgendamentos(agendamentosAPI);
    } catch {
      console.log("API falhou, usando localStorage");

      const agendaLocal = JSON.parse(localStorage.getItem("agenda") || "[]");
      const agendamentosLocal = JSON.parse(localStorage.getItem("agendamentos") || "[]");

      setAgenda(agendaLocal);
      setAgendamentos(agendamentosLocal);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // 🔍 horários disponíveis
  const horariosDisponiveis =
    agenda.find((item) => item.data === dataSelecionada)?.horarios || [];

  // 🧠 verificar ocupado
  const horarioOcupado = (hora) => {
    return agendamentos.some(
      (a) => a.data === dataSelecionada && a.hora === hora
    );
  };

  // ✅ AGENDAR
  const agendar = async (hora) => {
    if (!dataSelecionada) {
      alert("Escolha uma data!");
      return;
    }

    if (horarioOcupado(hora)) {
      alert("Horário já ocupado!");
      return;
    }

    const novo = {
      data: dataSelecionada,
      hora,
      servico: "Lavagem Completa",
    };

    try {
      await criarAgendamento(novo);
      await carregarDados();
      alert("Agendamento realizado!");
    } catch {
      const novos = [novo, ...agendamentos];
      setAgendamentos(novos);
      localStorage.setItem("agendamentos", JSON.stringify(novos));
    }
  };

  // ❌ CANCELAR (CORRIGIDO)
  const cancelar = async (id, index) => {
    try {
      await cancelarAgendamento(id);
      await carregarDados();
    } catch {
      const novos = agendamentos.filter((_, i) => i !== index);
      setAgendamentos(novos);
      localStorage.setItem("agendamentos", JSON.stringify(novos));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <HeaderInterno />

      <h1 className="text-3xl font-bold mb-8">
        Área do Cliente
      </h1>

      {/* 📅 DATA */}
      <input
        type="date"
        value={dataSelecionada}
        onChange={(e) => setDataSelecionada(e.target.value)}
        className="p-3 border rounded-lg mb-6"
      />

      {/* ⏰ HORÁRIOS */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Horários disponíveis
        </h2>

        {!dataSelecionada ? (
          <p className="text-gray-500">Escolha uma data primeiro.</p>
        ) : horariosDisponiveis.length === 0 ? (
          <p className="text-gray-500">Nenhum horário disponível.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {horariosDisponiveis.map((hora) => {
              const ocupado = horarioOcupado(hora);

              return (
                <button
                  key={hora}
                  onClick={() => agendar(hora)}
                  disabled={ocupado}
                  className={`p-4 rounded-xl shadow transition
                    ${
                      ocupado
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-white hover:bg-blue-600 hover:text-white"
                    }`}
                >
                  {hora}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 📋 AGENDAMENTOS */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Meus agendamentos
        </h2>

        <div className="bg-white rounded-xl shadow divide-y">
          {agendamentos.length === 0 ? (
            <p className="p-4 text-gray-500">Nenhum agendamento.</p>
          ) : (
            agendamentos.map((item, index) => (
              <div
                key={item.id || index}
                className="p-4 flex justify-between items-center"
              >
                <span>
                  {item.data} - {item.hora}

                  <span
                    className={`ml-2 px-2 py-1 rounded text-sm ${
                      item.status === "confirmado"
                        ? "bg-green-100 text-green-700"
                        : item.status === "cancelado"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status || "pendente"}
                  </span>
                </span>

                <button
                  onClick={() => cancelar(item.id, index)}
                  className="text-red-500"
                >
                  Cancelar
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 📜 HISTÓRICO */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Histórico de serviços
        </h2>

        <div className="bg-white rounded-xl shadow divide-y">
          {historico.map((item, index) => (
            <div key={index} className="p-4 flex justify-between">
              <span>{item.servico}</span>
              <span className="text-gray-500">
                {item.data} - {item.hora}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}