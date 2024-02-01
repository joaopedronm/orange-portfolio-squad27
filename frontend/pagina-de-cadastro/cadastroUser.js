const url = "http://localhost:3000/user/register";

function fazPost(url, corpo) {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(corpo),
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((response) => {
      console.log(response);
      alert("Usuário cadastrado com sucesso!");
      window.location.href = "meu-portifolio.html"; //verificar se é dessa forma
    })
    .catch((err) => {
      alert("E-mail já cadastrado!");
    });
}

const cadastroButton = document.getElementById("botao-cadastrar");
cadastroButton.addEventListener("click", (event) => cadastrarUsuario(event));

function cadastrarUsuario(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmar-password").value;

  if (!nome || !sobrenome || !email || !password || !confirmPassword) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (password !== confirmPassword) {
    alert("A senha e a confirmação de senha não correspondem.");
    return;
  }

  const corpo = {
    nome: nome,
    sobrenome: sobrenome,
    email: email,
    password: password,
    confirmpassword: confirmPassword,
  };

  fazPost(url, corpo);
}
