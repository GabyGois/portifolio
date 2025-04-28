// script.js

let mat_tarefas = [];

/**
 * Adiciona uma tarefa ao array, se ainda não existir
 * @param {Array} nome_array 
 * @param {Object} tarefa 
 */
function adicionaArray(nome_array, tarefa) {
    // Verifica se a tarefa já existe (mesmo nome e data)
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

/**
 * Recarrega o grid de cards com as tarefas atuais
 * @param {Array} nome_array 
 */
function recarregaLista(nome_array) {
    const container = document.querySelector('.conteudo-principal');
    container.innerHTML = `
        <button id="btn-adicionar" class="botao-adicionar">
            Adicionar Atividades/Provas
        </button>
        <div class="cards-grid"></div>
    `;

    const grid = container.querySelector('.cards-grid');

    nome_array.forEach((tarefa) => {
        const card = document.createElement('div');
        card.className = 'card-item';
        card.innerHTML = `
            <h4>${tarefa.atividade}</h4>
            <p>Data: ${tarefa.data}</p>
            <div class="contador-item">${calculaTempo(new Date(tarefa.data))}</div>
        `;

        card.addEventListener('click', () => {
            // Toggle de destaque (só um ativo por vez)
            document.querySelectorAll('.card-item').forEach(c => c.classList.remove('ativo'));
            card.classList.add('ativo');
        });

        grid.appendChild(card);
    });

    // Configura o listener do botão de adicionar
    container.querySelector('#btn-adicionar').addEventListener('click', adicionarTarefa);

    // Inicia atualização automática dos temporizadores
    iniciarAtualizacao();
}

/**
 * Atualiza o contador de cada card a cada segundo
 */
function iniciarAtualizacao() {
    setInterval(() => {
        document.querySelectorAll('.contador-item').forEach(elemento => {
            const data = elemento.closest('.card-item')
                .querySelector('p').textContent.split(': ')[1];
            elemento.textContent = calculaTempo(new Date(data));
        });
    }, 1000);
}

/**
 * Calcula tempo restante até dataObjetivo
 * @param {Date} dataObjetivo 
 * @returns {string}
 */
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
    // addEventListener -> ao carregar (DOMContentLoaded) a página executa esta função
    const path = window.location.pathname;
    const header = document.querySelector('header');
    let novaCor = '';

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
        header.style.gridTemplateColumns = '95% 5%';
        novaCor = '#333';
    }

    // Atualiza a variável CSS --cor-header
    document.documentElement.style.setProperty('--cor-header', novaCor);

    // Associa o Swal de adicionar tarefa ao botão
    document.getElementById('btn-adicionar').addEventListener('click', adicionarTarefa);
});
