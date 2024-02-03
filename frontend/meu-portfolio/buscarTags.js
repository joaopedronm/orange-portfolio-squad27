function buscarProjetosPorTags() {

  const tagsValue = document.getElementById("tags").value.trim();
  const token = localStorage.getItem("token");
  const url = `http://localhost:3000/projeto/?tags=${tagsValue}`;

  if (token) {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        const projetosFiltrados = data.projetos.filter((projeto) => {
          return projeto.tags.includes(tagsValue);
        });
        exibirProjetosPorTags(projetosFiltrados);
        
      } else {
        const error = await response.json();
        console.error("Erro:", error.message);
        alert(error.message);
      }
    });
  }
}

document.getElementById("tags").addEventListener("input", function () {
  const tagsValue = this.value.trim();
  console.log("Valor do campo de tags:", tagsValue);
  if (tagsValue.length > 0) {
    buscarProjetosPorTags();
  } else {
    location.reload();
  }
});

function exibirProjetosPorTags(projetos) {
  projetosContainer.innerHTML = "";

  if (projetos && Array.isArray(projetos) && projetos.length > 0) {
    projetos.forEach((projeto) => {
      const divProjeto = document.createElement("div");
      divProjeto.classList.add("projeto");

      const data = new Date(projeto.createdAt);

      divProjeto.innerHTML = `
      <div class="projeto">
        <div class="projeto-imagem">
          <img src="${'http://localhost:3000/imgs/projeto/' + projeto.imagem[0]}" alt="">
          <div class="botao-lapis" onclick="mostrarEditarExcluir(this)">
            <i class="fa-solid fa-pencil"></i>
          </div>
          <div class="editar-excluir" data-projeto-id="${projeto._id}">
            <a href="#" onclick="editarProjeto()">Editar</a>
            <a href="#" onclick="excluirProjeto(event)">Excluir</a>
          </div>
        </div>
        <div class="projeto-infos">
          <img src="./user-menu.png" alt="" width="24px" style="border-radius: 24px;" class="imagem-do-autor">
          <p class="subtitle1"><span class="nome-do-autor">${projeto.user.nome} ${projeto.user.sobrenome}</span> &#x2022; <span class="data">${data.getMonth() + 1}/${data.getFullYear().toString().slice(-2)}</span></p>
          <p class="subtitle1"><span class="nome-do-autor">${projeto.user.nome} ${projeto.user.sobrenome}</span> &#x2022; <span class="data">${projeto.user.createdAt}</span></p>
          <div class="tags">
            ${projeto.tags.map(tag => `<p class="subtitle1">${tag}</p>`).join('')}
          </div>
        </div>
      </div>
      `;
      
      projetosContainer.appendChild(divProjeto);
    });
  } else {
    const mensagem = document.createElement("p");
    mensagem.textContent =
      "Nenhum projeto encontrado para as tags pesquisadas.";
    projetosContainer.appendChild(mensagem);
  }
}