const url_register = "http://localhost:3000/user/register";

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
      alert("Usuário cadastrado com sucesso!");
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);
      localStorage.setItem("nome", response.nome);
      localStorage.setItem("sobrenome", response.sobrenome);
      window.location.href = "../meu-portfolio/meu-portfolio.html";
    })
    .catch((err) => {
      alert("Erro ao cadastrar usuário");
    });
}

function fazPostGoogle(url, corpo) {
  let erro = false;
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
      alert("Usuário cadastrado com sucesso!");
      localStorage.setItem("token", response.token);
      localStorage.setItem("nome", response.nome);
      localStorage.setItem("sobrenome", response.sobrenome);
      window.location.href = "../meu-portfolio/meu-portfolio.html";
    })
    .catch((err) => {
      erro = true;
    })
    .finally(() => {
      if (erro) {
        fazPostLogin(url_login, corpo);
      }
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
  const confirmpassword = document.getElementById("confirmar-password").value;

  const user = { nome, sobrenome, email, password, confirmpassword };

  if (user.password !== user.confirmpassword) {
    alert("A senha e a confirmação de senha não correspondem.");
    return;
  }

  fazPost(url_register, user)
}

function validaUsuario(user) {
  if (!user.nome || !user.sobrenome || !user.email || !user.password || !user.confirmpassword) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (user.password !== user.confirmpassword) {
    alert("A senha e a confirmação de senha não correspondem.");
    return;
  }
}

function cadastraUsuarioGoogle(userGoogle) {
  fazPostGoogle(url_register, userGoogle);
}