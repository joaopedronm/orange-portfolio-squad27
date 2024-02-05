/* Faz um fetch e retorna todos os projetos do usuário */
fetch('http://localhost:3000/projeto/meusprojetos', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
  .then(res => res.json())
  .then(projetos => {
    projetos.projeto.forEach(projeto => {
      exibirProjeto(projeto)


      if (projeto.titulo != '') {
        var btn = document.getElementById('add-btn');
        btn.disabled = false;
      }
    });
  });

/* Seta nome e sobrenome do usuário */
function capitalizarPrimeiraLetra(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

document.getElementById('info-user').innerText = capitalizarPrimeiraLetra(localStorage.getItem('nome')) + ' ' + capitalizarPrimeiraLetra(localStorage.getItem('sobrenome'));



// A FUNÇÃO ABAIXO É RESPONSÁVEL POR ATIVAR/DESATIVAR O MENU HAMBÚRGUER

class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu)
    this.navList = document.querySelector(navList)
    this.navLinks = document.querySelectorAll(navLinks)
    this.activeClass = 'active'
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass)
  }

  addClickEvent() {
    this.mobileMenu.addEventListener('click', this.handleClick)
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent()
    }
    return this
  }
}


const mobileNavBar = new MobileNavbar(
  ".mobile-menu",
  "#menu-links",
  "#menu-links li",
)

mobileNavBar.init()


document.getElementById('user-img').addEventListener('click', function () {
  document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', function () {
  var userImgElement = document.getElementById('user-img');
  var fileInput = this;

  // Verifique se há um arquivo selecionado
  if (fileInput.files && fileInput.files[0]) {
    var reader = new FileReader();

    // Quando a leitura do arquivo estiver concluída
    reader.onload = function (e) {
      // Obtenha a URL da imagem
      var imageUrl = e.target.result;

      // Restante do código para exibir a imagem como fundo da div
      var imageElement = document.getElementById('img-input');
      var paragraphElement = document.querySelector('.user-img p.body2');

      // Quando a imagem estiver totalmente carregada
      imageElement.onload = function () {
        // Apagar o conteúdo de texto da div
        paragraphElement.style.display = 'none';
        imageElement.style.display = 'none';

        // Defina a imagem de fundo usando a URL do arquivo
        userImgElement.style.backgroundImage = 'url(' + imageUrl + ')';
      };

      // Configurar a fonte da imagem
      imageElement.src = imageUrl;
    };

    // Leia o arquivo como uma URL de dados
    reader.readAsDataURL(fileInput.files[0]);
  }
});


/* Editar projeto */
document.getElementById('user-img-edit').addEventListener('click', function () {
  document.getElementById('file-input-edit').click();
});

document.getElementById('file-input-edit').addEventListener('change', function () {
  var userImgElement = document.getElementById('user-img-edit');
  var fileInput = this;

  // Verifique se há um arquivo selecionado
  if (fileInput.files && fileInput.files[0]) {
    var reader = new FileReader();

    // Quando a leitura do arquivo estiver concluída
    reader.onload = function (e) {
      // Obtenha a URL da imagem
      var imageUrl = e.target.result;

      // Restante do código para exibir a imagem como fundo da div
      var imageElement = document.getElementById('img-input-edit');
      var paragraphElement = document.querySelector('.user-img p.body2');

      // Quando a imagem estiver totalmente carregada
      imageElement.onload = function () {
        // Apagar o conteúdo de texto da div
        paragraphElement.style.display = 'none';
        imageElement.style.display = 'none';

        // Defina a imagem de fundo usando a URL do arquivo
        userImgElement.style.backgroundImage = 'url(' + imageUrl + ')';
      };

      // Configurar a fonte da imagem
      imageElement.src = imageUrl;
    };

    // Leia o arquivo como uma URL de dados
    reader.readAsDataURL(fileInput.files[0]);
  }
});



// MODAL VISUALIZAR DETALHES DO PROJETO

document.addEventListener('click', function (e) {
  if (!(e.target instanceof HTMLSelectElement) && e.target.closest(`.projeto`) && !e.target.classList.contains('fa-solid')) {

    // Remover modal anterior, se existir
    const modalAnterior = document.getElementById('modal-visualizar-projeto');
    if (modalAnterior) {
      modalAnterior.remove();
    }

    var projeto = JSON.parse(e.target.dataset.projeto.replace(/'/g, '"'));
    console.log(projeto)
    const data = new Date(projeto.createdAt);
    const modalVisualizarProjeto = document.createElement('div')
    modalVisualizarProjeto.id = 'modal-visualizar-projeto'
    modalVisualizarProjeto.innerHTML = `
      <div id="modal2" class="modal2">
        <span class="close close-modal" id="closeModalBtn">&times;</span>

        <div class="modal2-container">
            <div class="user2-infos">
                <div class="usuario-img">
                    <img src="./user-menu.png" alt="" width="122px">
                </div>
                <div class="user2-dados">
                    <p class="subtitle1">${projeto.user.nome} ${projeto.user.sobrenome}</p>
                    <p class="subtitle1">${data.getMonth() + 1}/${data.getFullYear().toString().slice(-2)}</p>
                </div>
            </div>

            <div class="titulo">
                <h5>${projeto.titulo}</h5>
            </div>

            <div class="tags">
              ${projeto.tags.map(tag => `<p class="subtitle1">${tag}</p>`).join('')}
            </div>

        </div>

        <div class="modal-container-2">
            <img src="${'http://localhost:3000/imgs/projeto/' + projeto.imagem[0]}" alt="">
            <p class="subtitle1" style="margin-bottom: 32px;" id="modalDescription">${projeto.descricao}</p>
            <p class="subtitle1">Download</p>
            <a class="link-de-download" href="#" style="text-decoration: none;">${projeto.link}</a>
        </div>
      </div>
    `
    document.body.appendChild(modalVisualizarProjeto)
  }
  const modalVisualizarProjeto = document.getElementById('modal-visualizar-projeto');

  if (!(e.target instanceof HTMLSelectElement) && e.target.closest(`.close-modal`)) {
    if (modalVisualizarProjeto) {
      modalVisualizarProjeto.remove();
    }
  }

  document.addEventListener('click', function (e) {
    if (!(e.target.closest('.modal2-container') || e.target.closest('.modal-container-2'))) {
      if (modalVisualizarProjeto) {
        modalVisualizarProjeto.remove();
      }
    }
  });

});
