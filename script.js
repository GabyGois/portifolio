let mat_tarefas = [];
let tempos = [];

// Quando a página carrega, prepara o botão e inicia o cronômetro
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-adicionar')
    .addEventListener('click', adicionarTarefa);
  startCronometro();
});

// Abre SweetAlert para adicionar
function adicionarTarefa() {
  Swal.fire({
    title: 'Nova Atividade/Prova',
    html: `
      <input type="text" id="atividade" class="swal2-input" placeholder="Atividade/Prova">
      <input type="date" id="data" class="swal2-input">
    `,
    confirmButtonText: 'Adicionar',
    focusConfirm: false,
    didOpen: () => {
      Swal.getPopup().querySelector('#atividade').focus();
    },
    preConfirm: () => {
      const atividade = Swal.getPopup().querySelector('#atividade').value.trim();
      const dataStr   = Swal.getPopup().querySelector('#data').value;
      if (!atividade || !dataStr) {
        Swal.showValidationMessage('Por favor, preencha todos os campos');
        return false;
      }
      const deadline = new Date(dataStr);
      mat_tarefas.push({ atividade, data: dataStr });
      tempos.push(deadline);
      recarregaAbas(mat_tarefas);
      return true;
    }
  });
}

// Gera dinamicamente os botões e conteúdos de cada aba
function recarregaAbas(tarefas) {
  const btnContainer     = document.getElementById('tabs-buttons');
  const contentContainer = document.getElementById('tabs-contents');

  btnContainer.innerHTML     = '';
  contentContainer.innerHTML = '';

  tarefas.forEach((tarefa, idx) => {
    // Botão
    const btn = document.createElement('button');
    btn.className = 'botao' + (idx === 0 ? ' ativo' : '');
    btn.textContent = tarefa.atividade;
    btn.addEventListener('click', () => ativaAba(idx));
    btnContainer.appendChild(btn);

    // Painel de conteúdo
    const painel = document.createElement('div');
    painel.className = 'aba-conteudo' + (idx === 0 ? ' ativo' : '');
    painel.innerHTML = `
      <h3 class="aba-conteudo-titulo-principal">${tarefa.atividade}</h3>
      <h4 class="aba-conteudo-titulo-secundario">
        Tempo para completar o objetivo
      </h4>
      <div class="contador">
        <div class="time-segment">
          <span class="number" id="dias-${idx}"></span>
          <span class="label">dias</span>
        </div>
        <div class="time-segment">
          <span class="number" id="horas-${idx}"></span>
          <span class="label">horas</span>
        </div>
        <div class="time-segment">
          <span class="number" id="min-${idx}"></span>
          <span class="label">min</span>
        </div>
        <div class="time-segment">
          <span class="number" id="seg-${idx}"></span>
          <span class="label">seg</span>
        </div>
      </div>
    `;
    contentContainer.appendChild(painel);
  });

  ajustaScrollBtns();
  ativaAba(0);
}

// Ativa a aba de índice i
function ativaAba(i) {
  const botoes = document.querySelectorAll('#tabs-buttons .botao');
  const paineis = document.querySelectorAll('#tabs-contents .aba-conteudo');
  botoes.forEach((b, idx) => b.classList.toggle('ativo', idx === i));
  paineis.forEach((p, idx) => p.classList.toggle('ativo', idx === i));
}

// Mostra ou esconde setas de scroll conforme precisar
function ajustaScrollBtns() {
  const nav   = document.querySelector('.botoes');
  const left  = document.querySelector('.scroll-left');
  const right = document.querySelector('.scroll-right');
  if (nav.scrollWidth > nav.clientWidth) {
    left.style.display  = 'flex';
    right.style.display = 'flex';
  } else {
    left.style.display  = 'none';
    right.style.display = 'none';
  }
}

// Scroll lateral
document.addEventListener('click', e => {
  const nav = document.querySelector('.botoes');
  if (e.target.matches('.scroll-left'))  nav.scrollBy({ left: -200, behavior: 'smooth' });
  if (e.target.matches('.scroll-right')) nav.scrollBy({ left:  200, behavior: 'smooth' });
});

// Calcula diferença de tempo e retorna [dias, horas, minutos, segundos]
function calculaTempo(deadline) {
  const diff = deadline - new Date();
  if (diff <= 0) return [0,0,0,0];
  let s = Math.floor(diff/1000);
  let m = Math.floor(s/60);
  let h = Math.floor(m/60);
  let d = Math.floor(h/24);
  s %= 60; m %= 60; h %= 24;
  return [d,h,m,s];
}

// Atualiza todos os cronômetros
function atualizaCronometro() {
  tempos.forEach((t, idx) => {
    const [d,h,m,s] = calculaTempo(t);
    document.getElementById(`dias-${idx}`).textContent  = d;
    document.getElementById(`horas-${idx}`).textContent = h;
    document.getElementById(`min-${idx}`).textContent   = m;
    document.getElementById(`seg-${idx}`).textContent   = s;
  });
}

// Inicia o loop de atualização a cada segundo
function startCronometro() {
  atualizaCronometro();
  setInterval(atualizaCronometro, 1000);
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

  