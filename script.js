import Swal from 'sweetalert2'
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
  
  function adicionarTarefa(materia) {
    Swal.fire({
      title: 'Login Form',
      html: `
        <input type="text" id="username" class="swal2-input" placeholder="Username">
        <input type="password" id="password" class="swal2-input" placeholder="Password">
      `,
      confirmButtonText: 'Sign in',
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()
        usernameInput = popup.querySelector('#username')
        passwordInput = popup.querySelector('#password') 
        usernameInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
        passwordInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
      },
      preConfirm: () => {
        const username = usernameInput.value
        const password = passwordInput.value
        if (!username || !password) {
          Swal.showValidationMessage(`Please enter username and password`)
        }
        return { username, password }
      },
    })
  }
});

  