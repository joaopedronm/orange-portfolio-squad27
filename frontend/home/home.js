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
      console.log(projeto);
      /* console.log(projeto.titulo);
      console.log(projeto.tags);
      console.log(projeto.link);
      console.log(projeto.descricao);
      console.log(projeto.imagem); */
      exibirProjeto(projeto);
    });
  });

/* Renderização dos projetos */
function exibirProjeto(projeto) {
  const div = document.createElement('div')
  const data = new Date(projeto.createdAt);
  div.innerHTML = `
  <div class="projeto">
    <div class="projeto-imagem">
      <img src="${'http://localhost:3000/imgs/projeto/' + projeto.imagem[0]}" alt="">
    </div>
    <div class="projeto-infos">
      <img src="./img/user-menu.png" alt="" width="24px" style="border-radius: 24px;" class="imagem-do-autor">
      <p class="subtitle1"><span class="nome-do-autor">${projeto.user.nome} ${projeto.user.sobrenome}</span> &#x2022; <span class="data">${data.getMonth() + 1}/${data.getFullYear().toString().slice(-2)}</span></p>
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

// const openModalBtns = document.getElementsByClassName('.projeto-imagem')
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
