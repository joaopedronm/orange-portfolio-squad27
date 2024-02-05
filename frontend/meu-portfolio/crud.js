const url = "http://localhost:3000/projeto/create";
const projetosContainer = document.getElementById('projetos-container')
const homeModal = document.getElementById('home-modal')
const editModal = document.getElementById('home-modal-edit')
const editarExcluir = document.getElementById('editar-excluir')
const fazerLogout = document.getElementById('fazer-logout')

const userMenu = document.getElementById('user-menu')
const logout = document.getElementById('logout-modal')

function criaProjeto(url, projeto) {
  const token = localStorage.getItem("token");

  if (token) {
    return fetch(url, {
      method: "POST",
      mode: "cors",
      body: projeto,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        alert("Projeto adicionado com sucesso!");
        exibirProjeto(projeto)
      } else {
        const error = await response.json();
        alert(error.message);
      }
    });
  }
}

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
      <div class="botao-lapis" onclick="mostrarEditarExcluir(this)" data-projeto="${projetoStr}">
        <i class="fa-solid fa-pencil" data-projeto="${projetoStr}"></i>
      </div>
      <div class="editar-excluir" data-projeto-id="${projeto._id}">
        <a href="#" onclick="editarProjeto('${projeto._id}')">Editar</a>
        <a href="#" onclick="openModalDelete('${projeto._id}')">Excluir</a>
      </div>
    </div>
    <div class="projeto-infos">
      <img src="./user-menu.png" alt="" width="24px" style="border-radius: 24px;" class="imagem-do-autor">
      <p class="subtitle1"><span class="nome-do-autor">${capitalizarPrimeiraLetra(nomeAutor)} ${capitalizarPrimeiraLetra(sobrenomeAutor)}</span> &#x2022; <span class="data">${data.getMonth() + 1}/${data.getFullYear().toString().slice(-2)}</span></p>
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

const adicionarProjetoButton = document.getElementById("adicionar-projeto");
adicionarProjetoButton.addEventListener("click", (event) =>
  cadastrarProjeto(event)
);

function cadastrarProjeto(event) {
  event.preventDefault();

  const img = document.getElementById("file-input").files[0];
  const titulo = document.getElementById("titulo").value;
  const tags = document.getElementById("tags-form").value;
  const link = document.getElementById("link").value;
  const descricao = document.getElementById("descricao").value;

  const projeto = new FormData();
  projeto.append("imagem", img);
  projeto.append("titulo", titulo);
  projeto.append("tags", tags);
  projeto.append("link", link);
  projeto.append("descricao", descricao);

  criaProjeto(url, projeto);
}

// A função abaixo é responsável por abrir o botão de editar/excluir projeto
function mostrarEditarExcluir(botaoLapis) {
  const editarExcluir = botaoLapis.parentElement.querySelector('.editar-excluir');
  if (editarExcluir.style.display === 'block') {
    // Se estiver visível, oculta
    editarExcluir.style.display = 'none';
  } else {
    // Se não estiver visível, exibe
    editarExcluir.style.display = 'block';
  }
}


document.addEventListener('click', function (event) {
  if (event.target.closest('.editar-excluir') || event.target.closest('.botao-lapis')) {
    return;
  }

  const allEditDeleteMenus = document.querySelectorAll('.editar-excluir');

  allEditDeleteMenus.forEach(menu => {
    menu.style.display = 'none';
  });
});


// A função abaixo é responsável por abrir o botão de fazer logout
userMenu.addEventListener('click', () => {
  if (logout.style.display === 'block') {
    // Se estiver visível, oculta
    logout.style.display = 'none';
  } else {
    // Se não estiver visível, exibe
    logout.style.display = 'block';
  }
})


function editarProjeto(projetoId) {

  editModal.dataset.projetoId = projetoId;
  editModal.style.display = 'block';

}

function editar(projetoId, projetoEditado) {
  const url = `http://localhost:3000/projeto/${projetoId}`;
  const token = localStorage.getItem("token");


  if (token) {
    return fetch(url, {
      method: "PATCH",
      mode: "cors",
      body: projetoEditado,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        alert("Projeto editado com sucesso!");
      } else {
        const error = await response.json();
        alert(error.message);
      }
    });
  }
}

const btnEdit = document.getElementById("btn-edit");
btnEdit.addEventListener("click", (event) => editaProjeto(event));

async function editaProjeto(event) {
  event.preventDefault();

  const img = document.getElementById("file-input-edit").files[0];
  const titulo = document.getElementById("titulo-edit").value;
  const tags = document.getElementById("tags-form-edit").value;
  const link = document.getElementById("link-edit").value;
  const descricao = document.getElementById("descricao-edit").value;

  const projetoEditado = new FormData();
  projetoEditado.append("imagem", img);
  projetoEditado.append("titulo", titulo);
  projetoEditado.append("tags", tags);
  projetoEditado.append("link", link);
  projetoEditado.append("descricao", descricao);

  const projetoId = editModal.dataset.projetoId;

  editar(projetoId, projetoEditado);
}



function excluirProjeto() {
  const projetoId = imodalDelete.dataset.projetoId;
  if (projetoId) {
    const url = `http://localhost:3000/projeto/${projetoId}`;
    const token = localStorage.getItem("token");

    if (token) {
      return fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (response) => {
          if (response.ok) {
            alert("Projeto excluído com sucesso!");
            location.reload();
          } else {
            const error = await response.json();
            alert(error.message);
          }
        })
        .catch((error) => {
          console.error('Erro ao excluir o projeto:', error);
        });
    }
  }
}