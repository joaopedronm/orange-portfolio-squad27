console.log("foi")

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

// A fun~ção abaixo fecha o modal caso o usuário clique fora dele
window.addEventListener('click', function (e) {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
});