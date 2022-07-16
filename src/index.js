const express = require('express')
var viewEngine= require('./config/viewEngine')
const initWebRoutes = require('./route/web');
var bodyParser =require("body-parser");
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
viewEngine(app);
initWebRoutes(app);

app.listen(3000,()=>{
    console.log("Backend Nodejs is runing on the port : " + 3000)
})