const url = "http://localhost:3000/projeto/create";
const projetosContainer = document.getElementById('projetos-container')
const homeModal = document.getElementById('home-modal')
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
        console.log(projeto);
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
  div.innerHTML = `
  <div class="projeto">
    <div class="projeto-imagem">
      <img src="${'http://localhost:3000/imgs/projeto/' + projeto.imagem[0]}" alt="">
      <div class="botao-lapis" onclick="mostrarEditarExcluir(this)">
        <i class="fa-solid fa-pencil"></i>
      </div>
      <div class="editar-excluir">
        <a href="#" onclick="editarProjeto()">Editar</a>
        <a href="#" onclick="excluirProjeto()">Excluir</a>
      </div>
    </div>
    <div class="projeto-infos">
      <img src="./user-menu.png" alt="" width="24px" style="border-radius: 24px;" class="imagem-do-autor">
      <p class="subtitle1"><span class="nome-do-autor">${projeto.user.nome} ${projeto.user.sobrenome}</span> &#x2022; <span class="data">${projeto.user.createdAt}</span></p>
      <div class="tags">
        ${projeto.tags.map(tag => `<p class="subtitle1">${tag}</p>`).join('')}
      </div>
    </div>
  </div>
  `
  homeModal.style.display = 'none'
  removerDivsPorClasse('card')
  projetosContainer.appendChild(div)
  console.log(projeto.user.createdAt)
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

// A função abaixo é responsável por abrir o modal de editar/excluir projeto
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

// A função abaixo é responsável por abrir o modal de fazer logout

userMenu.addEventListener('click', () => {
  if (logout.style.display === 'block') {
    // Se estiver visível, oculta
    logout.style.display = 'none';
  } else {
    // Se não estiver visível, exibe
    logout.style.display = 'block';
  }
})


function editarProjeto() {
  alert('Opção Editar selecionada');
  // Lógica de edição aqui
}

function excluirProjeto() {
  alert('Opção Excluir selecionada');
  // Lógica de exclusão aqui
}