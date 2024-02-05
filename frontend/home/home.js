const homeModal = document.getElementById('home-modal')
const projetosContainer = document.getElementById('projetos-container')

fetch('http://localhost:3000/projeto/descobrir', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
  .then(res => res.json())
  .then(projetos => {
    projetos.projeto.forEach(projeto => {
      exibirProjeto(projeto);
    });
  });

/* Renderização dos projetos */
function exibirProjeto(projeto) {
  const div = document.createElement('div')
  const data = new Date(projeto.createdAt);
  var nomeAutor = projeto.user.nome;
  var sobrenomeAutor = projeto.user.sobrenome;

  const projetoStr = JSON.stringify(projeto).replaceAll("\"", "'")

  div.innerHTML = `
  <div class="projeto">
    <div class="projeto-imagem" data-projeto="${projetoStr}">
      <img src="${'http://localhost:3000/imgs/projeto/' + projeto.imagem[0]}" alt="" data-projeto="${projetoStr}">
    </div>
    <div class="projeto-infos">
      <img src="../meu-portfolio/user-menu.png" alt="" width="24px" style="border-radius: 24px;" class="imagem-do-autor">
      <p class="subtitle1"><span class="nome-do-autor">${nomeAutor.charAt(0).toUpperCase() + nomeAutor.slice(1)} ${sobrenomeAutor.charAt(0).toUpperCase() + sobrenomeAutor.slice(1)}</span> &#x2022; <span class="data">${data.getMonth() + 1}/${data.getFullYear().toString().slice(-2)}</span></p>
      <div class="tags">
        ${projeto.tags.map(tag => `<p class="subtitle1">${tag}</p>`).join('')}
      </div>
    </div>
  </div>
  `
  homeModal.style.display = 'none'
  removerDivsPorClasse('card')
  projetosContainer.appendChild(div)
}

//A FUNÇÃO ABAIXO REMOVE AS DIVS COM AS CLASSES DE .CARD (DIVS VAZIAS)
function removerDivsPorClasse(card) {
  const divs = document.getElementsByClassName(card);
  const divsArray = Array.from(divs);

  divsArray.forEach(div => {
    div.parentNode.removeChild(div);
  });
}


const openModalBtns = document.getElementsByClassName('projeto-imagem')

const closeModalBtn = document.getElementById('closeModalBtn')
const modal = document.getElementById('home-modal')

for (const btn of openModalBtns) {
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


// MODAL VISUALIZAR DETALHES DO PROJETO

document.addEventListener('click', function (e) {
  if (!(e.target instanceof HTMLSelectElement) && e.target.closest(`.projeto`) && !e.target.classList.contains('fa-solid')) {

    // Remover modal anterior, se existir
    const modalAnterior = document.getElementById('modal-visualizar-projeto');
    if (modalAnterior) {
      modalAnterior.remove();
    }

    var projeto = JSON.parse(e.target.dataset.projeto.replace(/'/g, '"'));

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