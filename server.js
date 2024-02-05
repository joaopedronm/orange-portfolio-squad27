const express = require('express')
const cors = require('cors')
const path = require('path')
const connectDatabase = require('./src/db/conn')
const dotenv = require('dotenv')

const app = express()

dotenv.config()

//Conexão com o MongoDBAtlas
connectDatabase()

//Config JSON resonse
app.use(express.json())

// Public folder for images
app.use(express.static('public'))

// Configurar o caminho para servir arquivos estáticos do frontend
app.use("/", express.static(path.resolve("../frontend")))

//Solve CORS
app.use(cors())

//Routes
const projetoRoutes = require('./src/routes/projetoRoutes')
const userRoutes = require('./src/routes/userRoutes')

app.use('/projeto', projetoRoutes)
app.use('/user', userRoutes)

//app.listen(5000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});