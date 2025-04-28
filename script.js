// script.js

// Arrays de tarefas por matéria
const mat_tarefas = [];
const fis_tarefas = [];
const qui_tarefas = [];
const bio_tarefas = [];

let subjectConfig;

function formatDateBR(isoDate) {
  const [y, m, d] = isoDate.split('-');
  return `${d}/${m}/${y}`;
}

function getSubjectConfig() {
  const path = window.location.pathname;
  if (path.includes('fisica.html')) {
    return { array: fis_tarefas, cor: '#F0A04B', gridCols: '30% 65% 5%' };
  }
  if (path.includes('matematica.html')) {
    return { array: mat_tarefas, cor: '#161179', gridCols: '30% 65% 5%' };
  }
  if (path.includes('quimica.html')) {
    return { array: qui_tarefas, cor: '#493D9E', gridCols: '30% 65% 5%' };
  }
  if (path.includes('biologia.html')) {
    return { array: bio_tarefas, cor: '#3F7D58', gridCols: '30% 65% 5%' };
  }
  return { array: [], cor: '#333', gridCols: '95% 5%' };
}

function adicionaArray(nome_array, tarefa) {
  const existe = nome_array.some(item =>
    item.atividade === tarefa.atividade &&
    item.data === tarefa.data
  );
  if (!existe) {
    nome_array.push(tarefa);
    return true;
  }
  return false;
}

function adicionarTarefa() {
  Swal.fire({
    title: 'Nova Atividade',
    html: `
      <input type="text" id="atividade" class="swal2-input" placeholder="Nome da atividade">
      <input type="date" id="data" class="swal2-input">
    `,
    confirmButtonText: 'Adicionar',
    preConfirm: () => {
      const atividade = Swal.getPopup().querySelector('#atividade').value;
      const data = Swal.getPopup().querySelector('#data').value;
      if (!atividade || !data) {
        Swal.showValidationMessage('Preencha todos os campos');
        return false;
      }
      // Insere no array da matéria detectada
      if (adicionaArray(subjectConfig.array, { atividade, data })) {
        recarregaLista(subjectConfig.array);
      } else {
        Swal.showValidationMessage('Esta atividade já existe!');
        return false;
      }
    }
  });
}

function recarregaLista(nome_array) {
  const container = document.querySelector('.conteudo-principal');
  container.innerHTML = `
    <button id="btn-adicionar" class="botao-adicionar">
      Adicionar Atividades/Provas
    </button>
    <div class="cards-grid"></div>
  `;
  const grid = container.querySelector('.cards-grid');

  nome_array.forEach(tarefa => {
    const card = document.createElement('div');
    card.className = 'card-item';
    card.dataset.date = tarefa.data;

    card.innerHTML = `
      <h4>${tarefa.atividade}</h4>
      <p>Data: ${formatDateBR(tarefa.data)}</p>
      <div class="contador-item">${calculaTempo(new Date(tarefa.data))}</div>
    `;

    grid.appendChild(card);
  });

  container.querySelector('#btn-adicionar')
           .addEventListener('click', adicionarTarefa);

  iniciarAtualizacao();
}

function iniciarAtualizacao() {
  setInterval(() => {
    document.querySelectorAll('.contador-item').forEach(el => {
      const raw = el.closest('.card-item').dataset.date;
      el.textContent = calculaTempo(new Date(raw));
    });
  }, 1000);
}

function calculaTempo(dataObjetivo) {
  const agora = new Date();
  const diferenca = dataObjetivo - agora;
  if (diferenca < 0) return 'Prazo Finalizado';

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

  return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

// Ao carregar a página, configura dados e renderiza
document.addEventListener('DOMContentLoaded', () => {
  subjectConfig = getSubjectConfig();

  // Ajusta o header
  const header = document.querySelector('header');
  header.style.backgroundColor = subjectConfig.cor;
  header.style.gridTemplateColumns = subjectConfig.gridCols;
  document.documentElement.style.setProperty('--cor-header', subjectConfig.cor);

  // Monta a lista inicial e vincula o botão
  recarregaLista(subjectConfig.array);
  document.getElementById('btn-adicionar').addEventListener('click', adicionarTarefa);
});
