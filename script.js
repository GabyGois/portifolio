let mat_tarefas = [];

function adicionaArray(nome_array, tarefa) {
  nome_array.push(tarefa)
}

// função que cria abas e conteúdos
function recarregaLista(nome_array) {
  const container = document.querySelector('.conteudo-principal');
  container.innerHTML = `
      <button id="btn-adicionar" class="botao-adicionar">
          Adicionar Atividades/Provas
      </button>
      <div class="botoes-grid"></div>
      <div class="detalhes-container"></div>
  `;

  const grid = document.querySelector('.botoes-grid');
  const detalhes = document.querySelector('.detalhes-container');

  nome_array.forEach((tarefa, index) => {
      const botao = document.createElement('div');
      botao.className = `botao-item ${index === 0 ? 'ativo' : ''}`;
      botao.innerHTML = `
          <h3>${tarefa.atividade}</h3>
          <p>Data: ${tarefa.data}</p>
          <div class="contador">${calculaTempo(new Date(tarefa.data))}</div>
      `;

      botao.addEventListener('click', () => {
          document.querySelectorAll('.botao-item').forEach(b => b.classList.remove('ativo'));
          botao.classList.add('ativo');
          atualizarDetalhes(tarefa);
      });

      grid.appendChild(botao);
  });

  if (nome_array.length > 0) {
      atualizarDetalhes(nome_array[0]);
  }

  // Reconectar evento ao botão
  document.getElementById('btn-adicionar').addEventListener('click', adicionarTarefa);

  // Iniciar cronômetro
  iniciarAtualizacaoAutomatica();
}

function atualizarDetalhes(tarefa) {
  const detalhes = document.querySelector('.detalhes-container');
  detalhes.innerHTML = `
      <h3 class="aba-conteudo-titulo-principal">${tarefa.atividade}</h3>
      <h4 class="aba-conteudo-titulo-secundario">Data: ${tarefa.data}</h4>
      <div class="contador-detalhe">${calculaTempo(new Date(tarefa.data))}</div>
  `;
}

function iniciarAtualizacaoAutomatica() {
  setInterval(() => {
      document.querySelectorAll('.contador').forEach((elemento, index) => {
          const tarefa = mat_tarefas[index];
          if (tarefa) {
              elemento.textContent = calculaTempo(new Date(tarefa.data));
          }
      });
      
      const detalhe = document.querySelector('.contador-detalhe');
      if (detalhe) {
          const tarefaAtiva = document.querySelector('.botao-item.ativo');
          if (tarefaAtiva) {
              const index = Array.from(document.querySelectorAll('.botao-item')).indexOf(tarefaAtiva);
              detalhe.textContent = calculaTempo(new Date(mat_tarefas[index].data));
          }
      }
  }, 1000);
}

document.querySelectorAll('.scroll-btn').forEach(btn => {
  btn.addEventListener('click', () => {
      const wrapper = document.querySelector('.botoes-wrapper');
      const scrollAmount = 200; // Ajuste conforme necessário
      wrapper.scrollBy({
          left: btn.classList.contains('left') ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
      });
  });
});

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

  document.getElementById('btn-adicionar').addEventListener('click', function() {
    adicionarTarefa();
  });
});

  