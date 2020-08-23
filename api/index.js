var express = require('express')
var app = express()

app.get("/",function(req,res ){
    res.send("hola mundo")
})


module.exports={
    path:"/api/",
    handler:app
}