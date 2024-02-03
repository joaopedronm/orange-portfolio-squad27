
// -------------------- Modal de Adicionar Novo Projeto -----------------------

const openModalBtn = document.getElementsByClassName('card')
const openModalBtn2 = document.getElementsByClassName('adicionar-projeto')

const closeModalBtn = document.getElementById('btn-cancel')
const modal = document.getElementById('home-modal')

const imodalDelete = document.getElementById('imodal-delete')

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



// ------------------------------ Modal Sucess ------------------------------ 

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
  
  // ------------------------------ Modal Update ------------------------------ 

  function openModalUpdate() {
    document.getElementById("overlay-update").style.display = "flex";
  }
  
  window.onclick = function (event) {
    var overlay = document.getElementById("overlay-update");
    if (event.target == overlay) {
      overlay.style.display = "none";
    }
  }
  
  // ------------------------------ Modal Delete ------------------------------ 

  function openModalDelete() {
    imodalDelete.style.display = "block";
  }

  function closeModalDelete() {
    document.getElementById("imodal-delete").style.display = "none";
  }
  
//   window.onclick = function (event) {
//     var overlay = document.getElementById("overlay-delete");
//     if (event.target == overlay) {
//       overlay.style.display = "none";
//     }
//   }
  
  // ------------------------------ Modal Delete Sucess ------------------------------ 

  function openModalDeleteSucess() {
    document.getElementById("overlay-delete2").style.display = "flex";
  }
  
  window.onclick = function (event) {
    var overlay = document.getElementById("overlay-delete2");
    if (event.target == overlay) {
      overlay.style.display = "none";
    }
  }