const url = "http://localhost:3000/project/create"

function criaProjeto(url, projeto) {
    return fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(projeto),
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response)
      return response.json();
    });
  }

const adicionarProjetoButton = document.getElementById("adicionar-projeto");
adicionarProjetoButton.addEventListener("click", (event) => cadastrarProjeto(event));

function cadastrarProjeto(event) {
    event.preventDefault()

    const img = document.getElementById('img-input')
    const titulo = document.getElementById('titulo')
    const tags = document.getElementById('tags')
    const link = document.getElementById('link')
    const descricao = document.getElementById('descricao')

    const projeto = {
        img: img,
        titulo: titulo,
        tags: tags,
        link: link,
        descricao: descricao
    }

    criaProjeto(url, projeto);
    alert("Projeto cadastrado com sucesso! Você é um ótimo desenvolveor.");
}

