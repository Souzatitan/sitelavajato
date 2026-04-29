import { useState, useEffect } from "react";
import HeaderInterno from "../components/HeaderInterno";

export default function Dashboard() {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [diasDisponiveis, setDiasDisponiveis] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  const [historico] = useState([
    { data: "10/04/2026", hora: "10:00", servico: "Lavagem Completa" },
  ]);

  // carregar disponibilidade do admin
  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("disponibilidade"));
    if (dados) {
      setHorarios(dados.horarios || []);
      setDiasDisponiveis(dados.dias || []);
    }

    const salvos = JSON.parse(localStorage.getItem("agendamentos"));
    if (salvos) {
      setAgendamentos(salvos);
    }
  }, []);

  // converter data → dia da semana
  const getDiaSemana = (data) => {
    const dias = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    return dias[new Date(data).getDay()];
  };

  const agendar = (hora) => {
    if (!dataSelecionada) {
      alert("Escolha uma data primeiro!");
      return;
    }

    const dia = getDiaSemana(dataSelecionada);

    // validar se dia está disponível
    if (!diasDisponiveis.includes(dia)) {
      alert("Esse dia não está disponível!");
      return;
    }

    // evitar duplicado
    const jaExiste = agendamentos.find(
      (a) => a.data === dataSelecionada && a.hora === hora
    );

    if (jaExiste) {
      alert("Esse horário já foi agendado!");
      return;
    }

    const novo = {
      data: dataSelecionada,
      hora,
      servico: "Lavagem Completa",
    };

    const novos = [novo, ...agendamentos];

    setAgendamentos(novos);
    localStorage.setItem("agendamentos", JSON.stringify(novos));

    alert("Agendado com sucesso!");
  };

  const cancelar = (index) => {
    const novos = agendamentos.filter((_, i) => i !== index);
    setAgendamentos(novos);
    localStorage.setItem("agendamentos", JSON.stringify(novos));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <HeaderInterno />
      <h1 className="text-3xl font-bold mb-8">
        Área do Cliente
      </h1>
        
      {/* Data */}
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

      {/* Horários */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Escolha um horário
        </h2>

        {horarios.length === 0 ? (
          <p className="text-gray-500">
            Nenhum horário disponível. Configure no painel admin.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {horarios.map((hora, index) => (
              <button
                key={index}
                onClick={() => agendar(hora)}
                className="bg-white p-4 rounded-xl shadow hover:bg-blue-600 hover:text-white transition"
              >
                {hora}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Agendamentos */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Próximos agendamentos
        </h2>

        <div className="bg-white rounded-xl shadow divide-y">
          {agendamentos.length === 0 ? (
            <p className="p-4 text-gray-500">
              Nenhum agendamento ainda.
            </p>
          ) : (
            agendamentos.map((item, index) => (
              <div key={index} className="p-4 flex justify-between items-center">
                <span>{item.servico}</span>
                <span className="text-gray-500">
                  {item.data} - {item.hora}
                </span>

                <button
                  onClick={() => cancelar(index)}
                  className="text-red-500 hover:underline"
                >
                  Cancelar
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Histórico */}
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