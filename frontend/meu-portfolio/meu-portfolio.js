const openModalBtn = document.getElementsByClassName('card')
const openModalBtn2 = document.getElementsByClassName('adicionar-projeto')

const closeModalBtn = document.getElementById('btn-cancel')
const modal = document.getElementById('home-modal')

for (const btn of openModalBtn) {
  btn.addEventListener('click', () => {
    modal.style.display = 'block';
  });
}

for (const btn of openModalBtn2) {
  btn.addEventListener('click', () => {
    modal.style.display = 'block';
  });
}

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none'
})

// A função abaixo fecha o modal caso o usuário clique fora dele
window.addEventListener('click', function (e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});

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


/* ------------------------------ Modal Sucess ------------------------------ */
function openModalSucess() {
  document.getElementById("overlay-sucess").style.display = "flex";
}

// Fechar o modal se o usuário clicar fora dele
window.onclick = function (event) {
  var overlay = document.getElementById("overlay-sucess");
  if (event.target == overlay) {
    overlay.style.display = "none";
  }
}

/* ------------------------------ Modal Update ------------------------------ */
function openModalUpdate() {
  document.getElementById("overlay-update").style.display = "flex";
}

window.onclick = function (event) {
  var overlay = document.getElementById("overlay-update");
  if (event.target == overlay) {
    overlay.style.display = "none";
  }
}

/* ------------------------------ Modal Delete ------------------------------ */
function openModalDelete() {
  document.getElementById("overlay-delete").style.display = "flex";
}

window.onclick = function (event) {
  var overlay = document.getElementById("overlay-delete");
  if (event.target == overlay) {
    overlay.style.display = "none";
  }
}

/* ------------------------------ Modal Delete Sucess ------------------------------ */
function openModalDeleteSucess() {
  document.getElementById("overlay-delete2").style.display = "flex";
}

window.onclick = function (event) {
  var overlay = document.getElementById("overlay-delete2");
  if (event.target == overlay) {
    overlay.style.display = "none";
  }
}



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