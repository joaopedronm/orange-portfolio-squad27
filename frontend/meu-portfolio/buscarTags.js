function buscarProjetosPorTags() {
    console.log('Iniciando busca por projetos...');
    const tagsValue = document.getElementById('tags').value.trim(); 
    console.log('Tags digitadas:', tagsValue);
  
    const token = localStorage.getItem("token");
    const url = `http://localhost:3000/projeto/?tags=${tagsValue}`;
    console.log('URL da requisição:', url);
  
    if (token) {
      return fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (response) => {
          if (response.ok) {
            console.log('Resposta OK, recebendo dados...');
            const data = await response.json();
            console.log('Dados recebidos:', data);
            //alguma logica pra mostrar projeto
            console.log('Projetos exibidos com sucesso!');
          } else {
            console.log('Erro na resposta:', response.status);
            const error = await response.json();
            console.error('Erro:', error.message);
            alert(error.message);
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar projetos por tags:', error);
        });
    }
  }
  
  document.getElementById('tags').addEventListener('input', function() {
    const tagsValue = this.value.trim(); 
    console.log('Valor do campo de tags:', tagsValue);
    if (tagsValue.length > 0) {
      buscarProjetosPorTags();
    } 
  });
