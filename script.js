document.addEventListener('DOMContentLoaded', function() {
    // addEventListener -> ao carregar(DOMContentLoaded) a pagina(document) executa a função
    const path = window.location.pathname; // captura a url da pagina
    let novaCor = '';
  
    // Verifica se a URL contem o texto passado, verificando a página no processo
    if (path.includes('fisica.html')) {
      novaCor = '#FFA725';
    } else if (path.includes('matematica.html')) {
      novaCor = '#161179';
    } else if (path.includes('quimica.html')) {
      novaCor = '#211C84';
    } else if (path.includes('biologia.html')) {
      novaCor = '#27391C';
    } else {
      novaCor = '#333'; // cor padrão para a página index
    }
  
    // Atualiza a variável CSS no :root
    document.documentElement.style.setProperty('--cor-header', novaCor);
  });
  