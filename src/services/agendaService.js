const salvarAgenda = async () => {
  if (!dataSelecionada || horarios.length === 0) {
    alert("Selecione data e horários!");
    return;
  }

  try {
    for (const hora of horarios) {
      await criarAgenda(dataSelecionada, hora);
    }

    await carregarDados();

    alert("Agenda salva!");

    setDataSelecionada("");
    setHorarios([]);

  } catch (err) {
    console.log(err);
    alert("Erro ao salvar agenda");
  }
};