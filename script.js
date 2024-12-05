// Carrega os agendamentos do LocalStorage ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarAgendamentos);

document.getElementById('form-agendamento').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio do formulário

  // Obtém os dados do formulário
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const dataVisita = document.getElementById('data-visita').value;
  const endereco = document.getElementById('endereco').value;

  // Cria o objeto de agendamento
  const agendamento = {
    nome,
    email,
    dataVisita,
    endereco
  };

  // Salva o agendamento no LocalStorage
  salvarAgendamento(agendamento);

  // Limpa o formulário
  document.getElementById('form-agendamento').reset();
});

// Função para carregar os agendamentos da LocalStorage e exibir na tabela
function carregarAgendamentos() {
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  const tabela = document.getElementById('tabela-agendamentos').getElementsByTagName('tbody')[0];
  tabela.innerHTML = ''; // Limpa a tabela antes de atualizar

  agendamentos.forEach(function(agendamento) {
    const row = tabela.insertRow();
    row.innerHTML = `
      <td>${agendamento.nome}</td>
      <td>${agendamento.email}</td>
      <td>${formatarData(agendamento.dataVisita)}</td>
      <td>${agendamento.endereco}</td>
    `;
  });
}

// Função para salvar agendamento no LocalStorage
function salvarAgendamento(agendamento) {
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  agendamentos.push(agendamento);
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

  // Recarrega a tabela com os novos dados
  carregarAgendamentos();
}

// Função para formatar a data de forma mais amigável
function formatarData(data) {
  const date = new Date(data);
  const opcoes = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return date.toLocaleDateString('pt-BR', opcoes);
}
