
// const openModalBtns = document.getElementsByClassName('.projeto-imagem')
const openModalBtns = document.getElementsByClassName('card')
const openModalBtns2 = document.getElementsByClassName('meuperfil__add')


const closeModalBtn = document.getElementById('closeModalBtn')
const modal = document.getElementById('home-modal')

for (const btn of openModalBtns) {
    btn.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  }

  for (const btn of openModalBtns2) {
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
    if(this.mobileMenu) {
      this.addClickEvent()
    }
    return this
  }
}

const mobileNavBar = new MobileNavbar (
  ".mobile-menu",
  "#menu-links",
  "#menu-links li",
)

mobileNavBar.init()
