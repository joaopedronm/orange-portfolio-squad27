const url = "http://localhost:3000/projeto/create"

function criaProjeto(url, projeto) {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(projeto),
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoiYWxleCAiLCJpZCI6IjY1YmFiZWRjMjI4OGI1ZWRjY2QzNmE1MiIsImlhdCI6MTcwNjczNzM3Mn0.89WN18hIkAu-Iorh4AJZsAdTS2FYBBZFZcJfkq4Qq-o"
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

const adicionarProjetoButton = document.getElementById("adicionar-projeto");
adicionarProjetoButton.addEventListener("click", (event) => cadastrarProjeto(event));

function cadastrarProjeto(event) {
  event.preventDefault()

  const img = document.getElementById('img-input')
  const titulo = document.getElementById('titulo').value;
  const tags = document.getElementById('tags-form').value;
  const link = document.getElementById('link').value;
  const descricao = document.getElementById('descricao').value;

  const projeto = {
    img: img,
    titulo: titulo,
    tags: tags,
    link: link,
    descricao: descricao
  }

  criaProjeto(url, projeto);

}

