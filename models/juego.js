const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const juegoSchema = new Schema({
    nombre: String,
    descripcion: String,
})

//crear modelo
const Juego = mongoose.model("Juego", juegoSchema);

module.exports = Juego;