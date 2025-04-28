let mat_tarefas = []

function adicionaArray(nome_array, tarefa) {
  nome_array.push(tarefa)
}

function recarregaAbas(tarefas) {
  const btnContainer   = document.getElementById('tabs-buttons');
  const contentContainer = document.getElementById('tabs-contents');

  // limpa tudo
  btnContainer.innerHTML = '';
  contentContainer.innerHTML = '';

  tarefas.forEach((tarefa, idx) => {
    // Cria os botões
    const btn = document.createElement('button');
    btn.classList.add('botao');
    btn.textContent = tarefa.atividade;
    if (idx === 0) btn.classList.add('ativo');
    btn.addEventListener('click', () => ativaAba(idx));
    btnContainer.appendChild(btn);

    // Cria o conteúdo
    const painel = document.createElement('div');
    painel.classList.add('aba-conteudo');
    if (idx === 0) painel.classList.add('ativo');
    painel.innerHTML = `
      <p><strong>Atividade/Prova:</strong> ${tarefa.atividade}</p>
      <p><strong>Data:</strong> ${tarefa.data}</p>
    `;
    contentContainer.appendChild(painel);
  });
}

function ativaAba(i) {
  const botoes = document.querySelectorAll('#tabs-buttons .botao');
  const paineis = document.querySelectorAll('#tabs-contents .aba-conteudo');
  botoes.forEach((b, idx) => {
    b.classList.toggle('ativo', idx === i);
    paineis[idx].classList.toggle('ativo', idx === i);
  });
}

const btnLeft  = document.querySelector('.scroll-left');
const btnRight = document.querySelector('.scroll-right');
const tabsNav  = document.querySelector('.botoes');

btnLeft.addEventListener('click', ()  => tabsNav.scrollBy({ left: -200, behavior: 'smooth' }));
btnRight.addEventListener('click', () => tabsNav.scrollBy({ left: +200, behavior: 'smooth' }));

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

  document.getElementById('btn-adicionar').addEventListener('click', () => adicionarTarefa());
});

  