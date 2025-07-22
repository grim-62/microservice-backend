const express = require("express");
const expressProxy = require('express-http-proxy')

const app = express()
const port = 3000;

app.use('/user-api',expressProxy('http://user:3001'))
app.use('/post-api',expressProxy('http://post:3002'))
app.get('/',(req,res,next)=>{
    res.send("it is working")
})

app.listen(port,()=>{
    console.log(`gateway server is running on port ${port}`)
})

