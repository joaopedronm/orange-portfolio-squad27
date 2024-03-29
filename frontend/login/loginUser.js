const url_login = "http://localhost:3000/user/login";

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

      throw new Error("Erro no login");
    })
    .then((response) => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);
      localStorage.setItem("nome", response.nome);
      localStorage.setItem("sobrenome", response.sobrenome);
      alert("Login realizado com sucesso!");
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

  fazPostLogin(url_login, dados);
}