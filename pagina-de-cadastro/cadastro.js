
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

document.getElementById('olho-2').addEventListener('mousedown', function() {
    document.getElementById('confirmar-password').type = 'text';
  });
  
document.getElementById('olho-2').addEventListener('mouseup', function() {
    document.getElementById('confirmar-password').type = 'password';
});

document.getElementById('olho-2').addEventListener('mousemove', function() {
    document.getElementById('confirmar-password').type = 'password';
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