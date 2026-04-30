import { useState, useEffect } from "react";
import HeaderInterno from "../components/HeaderInterno";
import { criarAgenda, getAgenda } from "../services/agendaService";
import {
  getAgendamentos,
  excluirAgendamento,
} from "../services/agendamentoService";

export default function Admin() {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [novoHorario, setNovoHorario] = useState("");

  const [agenda, setAgenda] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  // 🔄 carregar dados
  useEffect(() => {
    const carregar = async () => {
      try {
        const agendaAPI = await getAgenda();
        const agendamentosAPI = await getAgendamentos();

        setAgenda(agendaAPI);
        setAgendamentos(agendamentosAPI);
      } catch (err) {
        console.log("API falhou, usando localStorage");

        const agendaLocal = JSON.parse(localStorage.getItem("agenda") || "[]");
        const agendamentosLocal = JSON.parse(localStorage.getItem("agendamentos") || "[]");

        setAgenda(agendaLocal);
        setAgendamentos(agendamentosLocal);
      }
    };

    carregar();
  }, []);

  // ➕ adicionar horário
  const adicionarHorario = () => {
    if (!novoHorario) return;

    if (horarios.includes(novoHorario)) {
      alert("Horário já existe!");
      return;
    }

    setHorarios([...horarios, novoHorario]);
    setNovoHorario("");
  };

  // ❌ remover horário
  const removerHorario = (index) => {
    setHorarios(horarios.filter((_, i) => i !== index));
  };

  // ⚡ gerar horários automáticos
  const gerarHorarios = () => {
    const lista = [];
    for (let i = 9; i <= 18; i++) {
      lista.push(`${i.toString().padStart(2, "0")}:00`);
    }
    setHorarios(lista);
  };

  // 💾 salvar agenda
  const salvarAgenda = async () => {
    if (!dataSelecionada || horarios.length === 0) {
      alert("Selecione data e horários!");
      return;
    }

    try {
      await criarAgenda(dataSelecionada, horarios);

      const atualizada = await getAgenda();
      setAgenda(atualizada);

      alert("Agenda salva!");
    } catch (err) {
      console.log("API falhou, salvando local");

      const nova = { data: dataSelecionada, horarios };

      const filtrado = agenda.filter((a) => a.data !== dataSelecionada);
      const novaLista = [...filtrado, nova];

      setAgenda(novaLista);
      localStorage.setItem("agenda", JSON.stringify(novaLista));
    }

    setDataSelecionada("");
    setHorarios([]);
  };

  // 🗑 excluir agenda
  const excluirAgenda = (index) => {
    const nova = agenda.filter((_, i) => i !== index);
    setAgenda(nova);
    localStorage.setItem("agenda", JSON.stringify(nova));
  };

  // ✅ confirmar agendamento
  const confirmar = (index) => {
    const novos = [...agendamentos];
    novos[index].status = "confirmado";

    setAgendamentos(novos);
    localStorage.setItem("agendamentos", JSON.stringify(novos));
  };

  // ❌ excluir agendamento
  const excluir = async (id, index) => {
    try {
      await excluirAgendamento(id);

      const atualizados = await getAgendamentos();
      setAgendamentos(atualizados);
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
        Área do Empreendedor
      </h1>

      {/* 📅 DATA */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">
          Escolha a data:
        </label>

        <input
          type="date"
          value={dataSelecionada}
          onChange={(e) => setDataSelecionada(e.target.value)}
          className="p-3 border rounded-lg"
        />
      </div>

      {/* ⏰ HORÁRIOS */}
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

          <button
            onClick={gerarHorarios}
            className="bg-gray-700 text-white px-4 rounded"
          >
            9h às 18h
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {horarios.map((hora, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="bg-white px-3 py-2 rounded shadow">
                {hora}
              </span>

              <button
                onClick={() => removerHorario(index)}
                className="text-red-500"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 💾 BOTÃO */}
      <button
        onClick={salvarAgenda}
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Salvar Agenda
      </button>

      {/* 📋 AGENDA */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Agenda cadastrada
        </h2>

        <div className="bg-white rounded-xl shadow divide-y">
          {agenda.length === 0 ? (
            <p className="p-4 text-gray-500">
              Nenhuma agenda cadastrada.
            </p>
          ) : (
            agenda.map((item, index) => (
              <div key={index} className="p-4 flex justify-between">
                <div>
                  <p className="font-semibold">{item.data}</p>
                  <p className="text-gray-500 text-sm">
                    {item.horarios.join(", ")}
                  </p>
                </div>

                <button
                  onClick={() => excluirAgenda(index)}
                  className="text-red-600"
                >
                  Excluir
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 📋 AGENDAMENTOS */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Agendamentos dos clientes
        </h2>

        <div className="bg-white rounded-xl shadow divide-y">
          {agendamentos.length === 0 ? (
            <p className="p-4 text-gray-500">
              Nenhum agendamento.
            </p>
          ) : (
            agendamentos.map((item, index) => (
              <div
                key={index}
                className="p-4 flex justify-between items-center"
              >
                <span>
                  {item.data} - {item.hora}

                  <span
                    className={`ml-2 px-2 py-1 rounded text-sm ${
                      item.status === "confirmado"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status || "pendente"}
                  </span>
                </span>

                <div className="flex gap-2">
                  {(item.status === "pendente" || !item.status) && (
                    <button
                      onClick={() => confirmar(index)}
                      className="text-green-600"
                    >
                      Confirmar
                    </button>
                  )}

                  <button
                    onClick={() => excluir(item.id, index)}
                    className="text-red-600"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}