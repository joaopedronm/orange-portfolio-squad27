const express = require('express')
const cors = require('cors')
const authRouter = require('./src/routes/authRouter')
const app = express()

//Config JSON resonse
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/auth',authRouter)

//Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

//Routes

app.listen(5000)
module.exports = app