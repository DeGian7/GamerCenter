const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", (req, res) => {
    res.render("index", {titulo : "A la mejor plataforma de ventas online en Videojuegos"});
})

router.get("/categorias", (req, res) => {
    res.render("categorias", {tituloCategorias: "ELIGE TU PLATAFORMA FAVORITA"});
})

//------------
router.get("/PC", (req, res) => {
    res.render("PC")
})
router.get("/CELULAR", (req, res) => {
    res.render("CELULAR")
})
router.get("/PS4", (req, res) => {
    res.render("PS4")
})
router.get("/XBOX", (req, res) => {
    res.render("XBOX")
})

router.get("/videoCelular", (req, res) => {
    res.render("videoCelular")
})
router.get("/videoPc", (req, res) => {
    res.render("videoPc")
})
router.get("/videoPs4", (req, res) => {
    res.render("videoPs4")
})
router.get("/videoXbox", (req, res) => {
    res.render("videoXbox")
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/signUp", (req, res) => {
    res.render("signUp")
})

router.post("/register", (req, res) => {
    const {username, useremail, password} = req.body;
    const user = new User({username, useremail ,password});

    user.save(err => {
        if(err){
            res.status(500).send("Error al registrar al usuario");
        }else{
            res.status(200).render("login");
        }
    })
})

router.post("/authenticate", (req, res) => {
    const {useremail, password} = req.body;

    User.findOne({useremail}, (err, user)=> {
        if(err){
            res.status(500).send("Error al autenticar al Usuario");
        }else if(!user){
            res.status(500).send("El usuario no existe");
        }else{
            user.isCorrectPassword(password, (err, result) => {
                if(err){
                    res.status(500).send("Error al auntenticar");
                }else if(result){
                    res.status(200).render("index", {titulo : "Bienvenido a GAMER CENTER"});
                }else{
                    res.status(500).send("Usuario y/o contraseña incorrecta");
                }
            });
        }
    });
})

module.exports = router