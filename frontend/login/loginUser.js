const url = "http://localhost:3000/user/login";

function fazPostLogin(url, dados) {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(dados),
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 401) {
        // Redirecionar para o login do Google em caso de falha de autenticação
        window.location.href = urlGoogleLogin;
      }
      throw new Error("Erro no login");
    })
    .then((response) => {
      console.log(response);
      alert("Login realizado com sucesso!");

      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);
      localStorage.setItem("nome", response.nome);
      localStorage.setItem("sobrenome", response.sobrenome);
      window.location.href = "../meu-portfolio/meu-portfolio.html"; // vai para a página de portfólio
    })
    .catch((err) => {
      alert("Dados incorretos!");
    });
}

const loginButton = document.getElementById("botao-login");
loginButton.addEventListener("click", (event) => fazerLogin(event));

function fazerLogin(event) {
  event.preventDefault();

  const email = document.getElementById("iemail").value;
  const password = document.getElementById("ipass").value;

  if (!email || !password) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const dados = {
    email: email,
    password: password,
  };

  fazPostLogin(url, dados);
}



// FUNÇÃO QUE ATIVA/DESATIVA O VISUALIZADOR DE SENHAS

document.getElementById('olho').addEventListener('mousedown', function() {
  document.getElementById('password').type = 'text';
});

document.getElementById('olho').addEventListener('mouseup', function() {
  document.getElementById('password').type = 'password';
});

document.getElementById('olho').addEventListener('mousemove', function() {
  document.getElementById('password').type = 'password';
});



// FUNÇÃO QUE VERIFICA SE AS SENHAS COINCIDEM

const verificarSenhas = () => {
  const senha = document.getElementById("password").value;
  const confirmarSenha = document.getElementById("confirmar-password").value;

  if (senha !== confirmarSenha) {
      alert("As senhas não coincidem. Por favor, verifique e tente novamente.");
      return false
  }

}