const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const connectDB = require('./db/db')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(logger("dev"))

const port = 3002

app.use('/',require('./routes/post.routes'))
app.get("/",(req,res,next)=>{
    res.send("hello from post service")
})


app.listen(port,()=>{
    console.log(`post server is running on port ${port}`)
})