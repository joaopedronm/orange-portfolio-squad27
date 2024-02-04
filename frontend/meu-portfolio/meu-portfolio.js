/* Faz um fetch e retorna todos os projetos do usuário */
fetch('http://localhost:3000/projeto/meusprojetos', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
  .then(res => res.json())
  .then(projetos => {
    projetos.projeto.forEach(projeto => {
      console.log(projeto);
      console.log(projeto.titulo);
      console.log(projeto.tags);
      console.log(projeto.link);
      console.log(projeto.descricao);
      console.log(projeto.imagem);
      exibirProjeto(projeto)


      if (projeto.titulo != '') {
        var btn = document.getElementById('add-btn');
        btn.disabled = false;
      }

      /* Alterar a imagem do avatar */
      /* document.getElementById('avatar-test').src = 'http://localhost:3000/imgs/projeto/' + projeto.imagem[0] */
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



// MODAL VISUALIZAR DETALHES DO PROJETO

const modalVisualizarProjeto = document.createElement('div')
modalVisualizarProjeto.id = 'modal-visualizar-projeto'
modalVisualizarProjeto.style.display = 'none';
modalVisualizarProjeto.innerHTML = `
  <div id="modal" class="modal">
    <span class="close" id="closeModalBtn">&times;</span>

    <div class="modal-container">
        <div class="user-infos">
            <div class="user-img">
                <img src="./img/user-main.png" alt="" width="122px">
            </div>
            <div class="user-dados">
                <p class="subtitle1">João Pedro</p>
                <p class="subtitle1">01/24</p>
            </div>
        </div>

        <div class="titulo">
            <h5>Ecommerce One Page</h5>
        </div>

        <div class="tags">
            <p class="subtitle1">UX</p>
            <p class="subtitle1">Web</p>
        </div>

    </div>

    <div class="modal-container-2">
        <img src="./img/project-01.jpeg" alt="">
        <p class="subtitle1" style="margin-bottom: 32px;">Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Recusandae voluptatum ab officia exercitationem explicabo beatae impedit unde culpa,
            blanditiis, ipsa aspernatur nobis, sit vero dicta consequatur. Sequi eligendi excepturi veniam.
            Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quod. Vitae veniam id quo
            accusantium itaque recusandae? Quos sequi quasi at recusandae optio aperiam, quibusdam tempore amet,
            repudiandae ex facilis.</p>
        <p class="subtitle1">Download</p>
        <a class="link-de-download" href="#" style="text-decoration: none;">google</a>
    </div>
  </div>
`
document.body.appendChild(modalVisualizarProjeto)

document.addEventListener('click', function (e) {
  // exclude select element action ...
  if (!(e.target instanceof HTMLSelectElement) && e.target.closest(`.projeto`)) {
    modalVisualizarProjeto.style.display = 'block'
    // return console.log(e.target.closest(`.projeto`));
  }
});

const closeModalBtn = document.getElementById('closeModalBtn');
closeModalBtn.addEventListener('click', () => {
  const modalVisualizarProjeto = document.getElementById('modal-visualizar-projeto');
  modalVisualizarProjeto.style.display = 'none';
});

// A função abaixo fecha o modal caso o usuário clique fora dele
window.addEventListener('click', function (e) {
  if (e.target == modalVisualizarProjeto) {
    modalVisualizarProjeto.style.display = 'none';
  }
});