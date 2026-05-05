import { useState, useEffect } from "react";
import HeaderInterno from "../components/HeaderInterno";
import { criarAgenda, getAgenda } from "../services/agendaService";

import {
  getAgendamentos,
  confirmarAgendamento,
  cancelarAgendamento,
  excluirAgendamento
} from "../services/agendamentoService";

export default function Admin() {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [novoHorario, setNovoHorario] = useState("");

  const [agenda, setAgenda] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  // 🔄 carregar dados
  const carregarDados = async () => {
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

  useEffect(() => {
    carregarDados();
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

  // ⚡ gerar horários
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
      await carregarDados();
      alert("Agenda salva!");
    } catch {
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

  // ✅ CONFIRMAR (AGORA COM API)
  const confirmar = async (id) => {
    try {
      await confirmarAgendamento(id);
      await carregarDados();
    } catch {
      alert("Erro ao confirmar");
    }
  };

  // ❌ CANCELAR
  const cancelar = async (id) => {
    try {
      await cancelarAgendamento(id);
      await carregarDados();
    } catch {
      alert("Erro ao cancelar");
    }
  };

  // 🗑 EXCLUIR
  const excluir = async (id, index) => {
    try {
      await excluirAgendamento(id);
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
        Área do Empreendedor
      </h1>

      {/* DATA */}
      <input
        type="date"
        value={dataSelecionada}
        onChange={(e) => setDataSelecionada(e.target.value)}
        className="p-3 border rounded-lg mb-6"
      />

      {/* HORÁRIOS */}
      <div className="mb-10">
        <div className="flex gap-2 mb-4">
          <input
            type="time"
            value={novoHorario}
            onChange={(e) => setNovoHorario(e.target.value)}
            className="p-2 border rounded"
          />

          <button onClick={adicionarHorario} className="bg-blue-600 text-white px-4 rounded">
            Adicionar
          </button>

          <button onClick={gerarHorarios} className="bg-gray-700 text-white px-4 rounded">
            9h às 18h
          </button>
        </div>
      </div>

      {/* SALVAR */}
      <button onClick={salvarAgenda} className="bg-green-600 text-white px-6 py-3 rounded-lg">
        Salvar Agenda
      </button>

      {/* AGENDAMENTOS */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Agendamentos
        </h2>

        <div className="bg-white rounded-xl shadow divide-y">
          {agendamentos.map((item) => (
            <div key={item.id} className="p-4 flex justify-between items-center">

              <span>
                {item.data} - {item.hora}

                <span className="ml-2 px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-700">
                  {item.status || "pendente"}
                </span>
              </span>

              <div className="flex gap-2">

                {item.status !== "confirmado" && (
                  <button
                    onClick={() => confirmar(item.id)}
                    className="text-green-600"
                  >
                    Confirmar
                  </button>
                )}

                <button
                  onClick={() => cancelar(item.id)}
                  className="text-yellow-600"
                >
                  Cancelar
                </button>

                <button
                  onClick={() => excluir(item.id)}
                  className="text-red-600"
                >
                  Excluir
                </button>

              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}