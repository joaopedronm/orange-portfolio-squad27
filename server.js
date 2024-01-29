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
const projetoRoutes = require('./src/routes/projetoRoutes')
const userRoutes = require('./src/routes/userRoutes')

app.use('/projeto', projetoRoutes)
app.use('/user', userRoutes)

app.listen(5000)

//module.exports = app