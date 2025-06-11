const mat_tarefas = [];
const fis_tarefas = [];
const qui_tarefas = [];
const bio_tarefas = [];

let subjectConfig;
let contadorInterval;

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

function adicionaArray(lista, tarefa) {
  const existe = lista.some(item =>
    item.atividade === tarefa.atividade &&
    item.data === tarefa.data
  );
  if (!existe) {
    lista.push(tarefa);
    return true;
  }
  return false;
}

function removeArray(lista, index) {
  lista.splice(index, 1);
}

function adicionarTarefa() {
  Swal.fire({
    title: 'Nova Atividade',
    html: `
      <input type="text" id="atividade" class="swal2-input" placeholder="Nome da atividade" autofocus>
      <input type="date" id="data" class="swal2-input">
    `,
    confirmButtonText: 'Adicionar',
    preConfirm: () => {
      const atividade = Swal.getPopup().querySelector('#atividade').value.trim();
      const data = Swal.getPopup().querySelector('#data').value;

      if (!atividade || !data) {
        Swal.showValidationMessage('Preencha todos os campos');
        return false;
      }

      const novaTarefa = { atividade, data };

      if (adicionaArray(subjectConfig.array, novaTarefa)) {
        recarregaLista(subjectConfig.array);
      } else {
        Swal.showValidationMessage('Esta atividade já existe!');
        return false;
      }
    }
  });
}

function recarregaLista(lista) {
  const container = document.querySelector('.conteudo-principal');
  container.innerHTML = `
    <button id="btn-adicionar" class="botao-adicionar">
      Adicionar Atividades/Provas
    </button>
    <div class="cards-grid"></div>
  `;

  const grid = container.querySelector('.cards-grid');

  lista.forEach((tarefa, idx) => {
    const card = document.createElement('div');
    card.className = 'card-item';
    card.dataset.date = tarefa.data;

    card.innerHTML = `
      <i class="fa fa-trash delete-icon"></i>
      <h4>${tarefa.atividade}</h4>
      <p>Data: ${formatDateBR(tarefa.data)}</p>
      <div class="contador-item">${calculaTempo(new Date(tarefa.data))}</div>
    `;

    card.querySelector('.delete-icon').addEventListener('click', (e) => {
      e.stopPropagation();
      removeArray(subjectConfig.array, idx);
      recarregaLista(subjectConfig.array);
    });

    grid.appendChild(card);
  });

  document.getElementById('btn-adicionar').addEventListener('click', adicionarTarefa);

  iniciarAtualizacao();
}

function iniciarAtualizacao() {
  if (contadorInterval) clearInterval(contadorInterval);

  contadorInterval = setInterval(() => {
    document.querySelectorAll('.contador-item').forEach(el => {
      const raw = el.closest('.card-item').dataset.date;
      el.textContent = calculaTempo(new Date(raw));
    });
  }, 1000);
}

function calculaTempo(dataObjetivo) {
  const agora = new Date();
  const dataCorrigida = new Date(dataObjetivo.getTime() + (3 * 60 * 60 * 1000)); // +3h
  const diff = dataCorrigida - agora;

  if (diff <= 0) return 'Prazo Finalizado';

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const
