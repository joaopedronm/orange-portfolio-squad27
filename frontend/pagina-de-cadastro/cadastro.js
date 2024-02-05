
// FUNÇÃO QUE ATIVA/DESATIVA O VISUALIZADOR DE SENHAS

function toggleVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}

// Adiciona evento de clique ao primeiro ícone do olho
document.getElementById('olho').addEventListener('click', function () {
    toggleVisibility('password');
});

// Adiciona evento de clique ao segundo ícone do olho
document.getElementById('olho-2').addEventListener('click', function () {
    toggleVisibility('confirmar-password');
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