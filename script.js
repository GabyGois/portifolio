let mat_tarefas = [];

// função que cria abas e conteúdos
function recarregaLista(nome_array) {
  const botoesContainer = document.querySelector('.botoes');
  const abasContainer = document.querySelector('.abas-textos');
  
  // Limpa conteúdo anterior
  botoesContainer.innerHTML = '';
  abasContainer.innerHTML = '';
  
  // Cria novos elementos
  nome_array.forEach((tarefa, index) => {
      // Cria botão
      const botao = document.createElement('button');
      botao.className = `botao ${index === 0 ? 'ativo' : ''}`;
      botao.textContent = tarefa.atividade;
      botao.dataset.index = index;
      
      // Cria aba de conteúdo
      const aba = document.createElement('div');
      aba.className = `aba-conteudo ${index === 0 ? 'ativo' : ''}`;
      aba.innerHTML = `
          <h3 class="aba-conteudo-titulo-principal">${tarefa.atividade}</h3>
          <h4 class="aba-conteudo-titulo-secundario">Data: ${tarefa.data}</h4>
          <div class="contador">${calculaTempo(new Date(tarefa.data))}</div>
      `;
      
      // Adiciona eventos
      botao.addEventListener('click', () => {
          document.querySelectorAll('.botao').forEach(b => b.classList.remove('ativo'));
          document.querySelectorAll('.aba-conteudo').forEach(a => a.classList.remove('ativo'));
          botao.classList.add('ativo');
          aba.classList.add('ativo');
      });
      
      botoesContainer.appendChild(botao);
      abasContainer.appendChild(aba);
  });
  
  // Atualiza cronômetro
  atualizaCronometro();
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
  const tempoAtual = new Date();
  const tempoFinal = dataObjetivo - tempoAtual;
  
  if (tempoFinal <= 0) return 'Prazo Finalizado';
  
  const segundos = Math.floor(tempoFinal / 1000 % 60);
  const minutos = Math.floor(tempoFinal / 1000 / 60 % 60);
  const horas = Math.floor(tempoFinal / 1000 / 60 / 60 % 24);
  const dias = Math.floor(tempoFinal / 1000 / 60 / 60 / 24);
  
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
});

  