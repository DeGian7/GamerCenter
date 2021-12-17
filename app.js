const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

require("dotenv").config()

const port = process.env.PORT || 3000;

//conexion a base de datos
const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@clustercertus.6psro.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri,
    {useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => console.log("Base de datos conectada"))
    .catch(e => console.log(e))

//motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

//rutas Web
app.use("/", require("./router/RutasWeb"));
//rutas mascota
app.use("/juegos", require("./router/Juego"));

app.use((req, res, next) =>{
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "No se encontro la pagina Web"
    });
})

app.listen(port, ()=>{
    console.log("servidor a su servicio en el puerto", port);
})
