// script.js

let mat_tarefas = [];

/**
 * Formata "aaaa-mm-dd" para "dd/mm/aaaa"
 */
function formatDateBR(isoDate) {
    const [y, m, d] = isoDate.split('-');
    return `${d}/${m}/${y}`;
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
        card.dataset.date = tarefa.data;  // mantém ISO para cálculo

        card.innerHTML = `
            <h4>${tarefa.atividade}</h4>
            <p>Data: ${formatDateBR(tarefa.data)}</p>
            <div class="contador-item">${calculaTempo(new Date(tarefa.data))}</div>
        `;

        card.addEventListener('click', () => {
            document.querySelectorAll('.card-item').forEach(c => c.classList.remove('ativo'));
            card.classList.add('ativo');
        });

        grid.appendChild(card);
    });

    container.querySelector('#btn-adicionar').addEventListener('click', adicionarTarefa);
    iniciarAtualizacao();
}

function iniciarAtualizacao() {
    setInterval(() => {
        document.querySelectorAll('.contador-item').forEach(elemento => {
            const raw = elemento.closest('.card-item').dataset.date;
            elemento.textContent = calculaTempo(new Date(raw));
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

    document.documentElement.style.setProperty('--cor-header', novaCor);
    document.getElementById('btn-adicionar').addEventListener('click', adicionarTarefa);
});
