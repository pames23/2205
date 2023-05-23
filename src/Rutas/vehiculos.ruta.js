const express = require('express')
const vehiculosController = require('../Controladores/vehiculos.controller')

const Rutas = express.Router()

Rutas.get('/', vehiculosController.getAllVehiculos)
Rutas.get('/:patente', vehiculosController.getVehiculosByPatente)
Rutas.post('/', vehiculosController.crateVehiculo)
Rutas.put('/:patente', vehiculosController.updateVehiculo )

module.exports = { Rutas}