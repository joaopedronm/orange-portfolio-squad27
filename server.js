const express = require('express')
const cors = require('cors')

const app = express()

//Config JSON resonse
app.use(express.json())

//Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

//Routes
const ProjetoRoutes = require('./src/routes/ProjetoRoutes')

app.use('/projeto', ProjetoRoutes)

app.listen(5000)