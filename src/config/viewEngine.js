const express = require('express')
let configViewEngine = (app) => {
   app.engine('ejs', require('express-ejs-extend')); 
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views")

}

module.exports = configViewEngine;