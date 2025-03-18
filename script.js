document.addEventListener('DOMContentLoaded', function() {
    // addEventListener -> ao carregar(DOMContentLoaded) a pagina(document) executa a função
    const path = window.location.pathname; // captura a url da pagina
    let novaCor = '';
  
    // Verifica se a URL contem o texto passado, verificando a página
    if (path.includes('fisica.html')) {
      novaCor = 'orange';
    } else if (path.includes('matematica.html')) {
      novaCor = 'red';
    } else if (path.includes('quimica.html')) {
      novaCor = 'green';
    } else if (path.includes('biologia.html')) {
      novaCor = 'blue';
    } else {
      novaCor = '#333'; // cor padrão para a página index
    }
  
    // Atualiza a variável CSS no :root
    document.documentElement.style.setProperty('--cor-header', novaCor);
  });
  