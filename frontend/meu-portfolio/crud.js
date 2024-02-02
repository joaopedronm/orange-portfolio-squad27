const url = "http://localhost:3000/projeto/create";

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
      } else {
        const error = await response.json();
        alert(error.message);
      }
    });
  }
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
