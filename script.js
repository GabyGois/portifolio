let mat_tarefas = [];

// função que cria abas e conteúdos
function recarregaAbas(array) {
  const botoesContainer = document.querySelector('.botoes-scroll');
  const textosContainer = document.querySelector('.abas-textos');
  botoesContainer.innerHTML = '';
  textosContainer.innerHTML = '';

  array.forEach((tarefa, idx) => {
    // cria botão da aba
    const btn = document.createElement('button');
    btn.className = 'botao';
    btn.textContent = tarefa.atividade;
    btn.dataset.index = idx;
    botoesContainer.appendChild(btn);

    // cria conteúdo da aba
    const div = document.createElement('div');
    div.className = 'aba-conteudo';
    div.innerHTML = `
      <h3 class="aba-conteudo-titulo-principal">${tarefa.atividade}</h3>
      <h4 class="aba-conteudo-titulo-secundario">Data de entrega</h4>
      <p class="contador">${tarefa.data}</p>
    `;
    textosContainer.appendChild(div);
  });

  // ativa a primeira aba por padrão, se existir
  if (array.length > 0) {
    botoesContainer.firstElementChild.classList.add('ativo');
    textosContainer.firstElementChild.classList.add('ativo');
  }

  // vincula evento de clique em todos os botões
  botoesContainer.querySelectorAll('.botao').forEach(btn => {
    btn.addEventListener('click', () => {
      // remove todos os estados ativos
      botoesContainer.querySelectorAll('.botao').forEach(b => b.classList.remove('ativo'));
      textosContainer.querySelectorAll('.aba-conteudo').forEach(c => c.classList.remove('ativo'));

      // ativa o clicado
      btn.classList.add('ativo');
      textosContainer.children[btn.dataset.index].classList.add('ativo');
    });
  });
}

// scroll com as setas
document.getElementById('scroll-left').addEventListener('click', () => {
  document.querySelector('.botoes-scroll').scrollBy({ left: -200, behavior: 'smooth' });
});
document.getElementById('scroll-right').addEventListener('click', () => {
  document.querySelector('.botoes-scroll').scrollBy({ left:  200, behavior: 'smooth' });
});

// === seu SweetAlert para adicionar ===
document.getElementById('btn-adicionar').addEventListener('click', () => {
  Swal.fire({
    title: 'Formulário',
    html: `
      <input type="text" id="atividade" class="swal2-input" placeholder="Atividade/Prova">
      <input type="date" id="data" class="swal2-input" placeholder="Data de entrega">
    `,
    confirmButtonText: 'Adicionar Atividade',
    focusConfirm: false,
    didOpen: () => {
      const popup = Swal.getPopup();
      atividadeInput = popup.querySelector('#atividade');
      dataInput     = popup.querySelector('#data');
      atividadeInput.onkeyup = e => e.key === 'Enter' && Swal.clickConfirm();
      dataInput.onkeyup      = e => e.key === 'Enter' && Swal.clickConfirm();
    },
    preConfirm: () => {
      const atividade = atividadeInput.value.trim();
      const data      = dataInput.value;
      if (!atividade || !data) {
        Swal.showValidationMessage('Por favor, preencha atividade e data');
        return false;
      }
      mat_tarefas.push({ atividade, data });
      recarregaAbas(mat_tarefas);
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // addEventListener -> ao carregar(DOMContentLoaded) a pagina(document) executa a função
  const path = window.location.pathname; // captura a url da pagina
  const header = document.querySelector('header'); // captura o header
  let novaCor = ''; 

  // Verifica se a URL contem o texto passado, verificando a página no processo e define a cor e atualiza colunas do grid
  if (path.includes('fisica.html')) {
    novaCor = '#F0A04B';
    header.style.gridTemplateColumns = '30% 65% 5%';
  } else if (path.includes('matematica.html')) {
    novaCor = '#161179';
    header.style.gridTemplateColumns = '30% 65% 5%';
    recarregaAbas(mat_tarefas);
  } else if (path.includes('quimica.html')) {
    novaCor = '#493D9E';
    header.style.gridTemplateColumns = '30% 65% 5%';
  } else if (path.includes('biologia.html')) {
    novaCor = '#3F7D58';
    header.style.gridTemplateColumns = '30% 65% 5%';
  } else {
    header.style.gridTemplateColumns = '95% 5%'; // grid padrão para a página index
    novaCor = '#333'; // cor padrão para a página index
  }

  // Atualiza a variável CSS no :root
  document.documentElement.style.setProperty('--cor-header', novaCor);
});

  