const express = require('express')

const app = express()

const port = 3002

app.get('/',(req,res,next) => {
    res.send("hello from post service")
})

app.listen(port,()=>{
    console.log(`post server is running on port ${port}`)
})