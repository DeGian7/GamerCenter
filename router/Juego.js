const express = require("express");
const router = express.Router();

const Juego = require("../models/juego");

router.get("/", async(req, res) => {
    try {
        const arrayJuegosDB = await Juego.find()
        //console.log(arrayMascotasDB)

        res.render("juegos", {
            arrayJuegos: arrayJuegosDB
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/crear", (req,res) => {
    res.render("crear")
})

router.post("/", async(req, res) => {
    const body = req.body
    try {
        await Juego.create(body)
        res.redirect("/juegos")
    } catch (error) {
        console.log(error)
    }
})

router.get("/:id", async (req, res) =>{
    const id= req.params.id
    try {
        const juegoDB = await Juego.findOne({_id:id})
        console.log(juegoDB)
        res.render("detalle",{
            juego: juegoDB,
            error: false
        })
    } catch (error) {
        console.log(error)
        res.render("detalle",{
            error: true,
            mensaje: "No se encuentra el id seleccionado"
        })
    }
})

router.delete("/:id", async(req, res)=>{
    const id = req.params.id
    try {
        const juegoDB = await Juego.findByIdAndDelete({_id:id})
        if(juegoDB){
            res.json({
                estado: true,
                mensaje: "eliminado!"
            })
        }else{
            res.json({
                estado: false,
                mensaje: "fallo eliminar!"
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.put("/:id", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        const juegoDB = await Juego.findByIdAndUpdate(id, body,{
            useFindAndModify: false
        })
        console.log(juegoDB)
        res.json({
            estado: true,
            mensaje: "Editado"
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: "Fallado"
        })      
    }
})

module.exports = router