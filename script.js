let mat_tarefas = [];

function adicionaArray(nome_array, tarefa) {
    // Verifica se a tarefa já existe
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

function recarregaLista(nome_array) {
    const container = document.querySelector('.conteudo-principal');
    container.innerHTML = `
        <button id="btn-adicionar" class="botao-adicionar">
            Adicionar Atividades/Provas
        </button>
        <div class="botoes-grid"></div>
        <div class="detalhes-container"></div>
    `;

    const grid = container.querySelector('.botoes-grid');
    const detalhes = container.querySelector('.detalhes-container');

    nome_array.forEach((tarefa, index) => {
        const botao = document.createElement('div');
        botao.className = 'botao-item';
        botao.innerHTML = `
            <h4>${tarefa.atividade}</h4>
            <p>Data: ${tarefa.data}</p>
            <div class="contador-item">${calculaTempo(new Date(tarefa.data))}</div>
        `;

        botao.addEventListener('click', () => {
            // Remove a classe ativo de todos
            document.querySelectorAll('.botao-item').forEach(b => b.classList.remove('ativo'));
            document.querySelectorAll('.detalhes-container').forEach(d => d.classList.remove('ativo'));
            
            // Adiciona a classe ativo ao selecionado
            botao.classList.add('ativo');
            detalhes.classList.add('ativo');
            
            // Atualiza detalhes
            detalhes.innerHTML = `
                <h3>${tarefa.atividade}</h3>
                <p>Data de Entrega: ${tarefa.data}</p>
                <div class="contador-detalhe">${calculaTempo(new Date(tarefa.data))}</div>
            `;
        });

        grid.appendChild(botao);
    });

    // Configura o botão de adicionar
    container.querySelector('#btn-adicionar').addEventListener('click', adicionarTarefa);

    // Inicia atualização automática
    iniciarAtualizacao();
}

function iniciarAtualizacao() {
    setInterval(() => {
        document.querySelectorAll('.contador-item, .contador-detalhe').forEach(elemento => {
            const data = elemento.closest('.botao-item')?.querySelector('p')?.textContent.split(': ')[1];
            if (data) {
                elemento.textContent = calculaTempo(new Date(data));
            }
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

  