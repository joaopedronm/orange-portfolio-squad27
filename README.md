# Orange Portfólio | Squad 27 🍊

Bem-vindo ao Orange Portfólio, um projeto desenvolvido pela equipe Squad 27 como parte do programa de formação da FCamara. Esta aplicação web permite que os usuários criem perfis, compartilhem seus projetos web e visualizem os projetos de outros usuários.
<br>
## 🚀 Funcionalidades

- **Cadastro de Usuários:** Os usuários podem se cadastrar na plataforma, fornecendo informações básicas para criar seus perfis.
- **Perfil do Usuário:** Cada usuário possui um perfil personalizado onde pode adicionar detalhes sobre si mesmo e exibir seus projetos.
- **Compartilhamento de Projetos:** Os usuários podem adicionar projetos ao seu perfil, fornecendo detalhes como nome, descrição, tecnologias utilizadas e links relacionados.
- **Visualização de Projetos:** Visitantes podem navegar pelos perfis dos usuários e explorar os projetos compartilhados.
<br>
## 🖥️ Tecnologias Utilizadas

- **Front-end:** HTML, CSS, JavaScript
- **Back-end:** Node.js, Express
- **Banco de Dados:** MongoDB
<br>
## 💡  Como Rodar a Aplicação

### 📌 Passo a Passo:

1. Clone este repositório em sua máquina local.
2. Certifique-se de ter o Node.js instalado em sua máquina.
3. No terminal, navegue até o diretório do projeto e execute o comando `npm install` para instalar as dependências.
4. Configure o banco de dados de acordo com as variáveis de ambiente fornecidas no arquivo de configuração. 
5. Execute o comando `npm start` para iniciar o servidor.

### 🛠️ Comandos do Node.js:

- `npm install`: Instala todas as dependências necessárias.

-  sugestão de rotas para o banco de dados:
-  MongoDB instalado:
await mongoose.connect('mongodb://127.0.0.1:27017/orangeportfolio')
-  Utilizando docker.compose:
const uri = "mongodb://root:example@localhost:27017/mydatabase?authSource=admin";
await mongoose.connect(uri);
Obs: Os comandos estão pré-configurados na pasta backend/db/conn.js

- `npm start`: Inicia o servidor.
<br>

## 📋 Modelo JSON para teste em Postman:

#### ✅Login:
    {
        "email": "exemploemail@exemplo.com",
        "password": "exemplo1234"
    }

#### ✅Cadastro: 
    {
        "nome": "exemplo_nome",
        "sobrenome": "exemplo_sobrenome",
        "email": "exemploemail@exemplo.com",
        "password": "exemplo1234",
        "confirmpassword": "exemplo1234"
    }

#### ✅Cadastro Projeto:
    {
        "titulo": "exemplo_titulo",
        "tags": "exemplo_tags",
        "link": "www.exemplo.com.br",
        "descricao": "exemplo_descricao",
        "imagem": "fazer upload da imagem desejada"
    }


### ⌛ Para rotas das solicitações utilizar:

  - Rota: http://localhost:3000/projeto/{requisição desejada}
  - Rota: http://localhost:3000/user/{requisição desejada}
 <br> 

## 👤 Participantes

- Adriel Luigi
- Estefania Carrer
- João Pedro Nascimento
- Matheus Thomé

