const express = require('express')
const reservasController = require('../Controladores/reservas.controller')

const Rutas = express.Router()

Rutas.get('/',  reservasController.getAllReservas)
Rutas.get('/:id', reservasController.getReservasById)
Rutas.delete('/:id', ReservasController.deleteReservasById)
Rutas.post('/', reservasController.crateReserva)


module.exports = { Rutas}