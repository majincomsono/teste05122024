// Função para carregar os agendamentos do LocalStorage
function loadAgendamentos() {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const agendaListElement = document.getElementById('agendaList');
    agendaListElement.innerHTML = ''; // Limpa a lista antes de adicionar os novos agendamentos
  
    agendamentos.forEach((agendamento, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `
        <div>
          <strong>${agendamento.nome}</strong><br>
          <small>${agendamento.servico}</small><br>
          <span class="text-muted">${agendamento.data}</span>
        </div>
        <button onclick="deleteAgendamento(${index})">Excluir</button>
      `;
      agendaListElement.appendChild(li);
    });
  }
  
  // Função para adicionar um novo agendamento
  function addAgendamento() {
    const nomeInput = document.getElementById('nome');
    const dataInput = document.getElementById('data');
    const servicoInput = document.getElementById('servico');
  
    const nome = nomeInput.value.trim();
    const data = dataInput.value.trim();
    const servico = servicoInput.value.trim();
  
    if (nome && data && servico) {
      const novoAgendamento = { nome, data, servico };
      const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
      agendamentos.push(novoAgendamento);
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
  
      nomeInput.value = '';
      dataInput.value = '';
      servicoInput.value = '';
      loadAgendamentos(); // Atualiza a lista de agendamentos
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  }
  
  // Função para excluir um agendamento
  function deleteAgendamento(index) {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    agendamentos.splice(index, 1); // Remove o agendamento pela posição
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    loadAgendamentos(); // Atualiza a lista de agendamentos
  }
  
  // Evento de clique no botão de agendamento
  document.getElementById('agendarBtn').addEventListener('click', addAgendamento);
  
  // Carrega os agendamentos quando a página for carregada
  window.onload = loadAgendamentos;
  