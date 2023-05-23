const vehiculos = require('../../datos/vehiculos.json')

const getAllVehiculos = (req, res)=>{
    res.json( vehiculos ).status(200)
}

const getVehiculosByPatente = (req, res) => {
    const patente = req.params.patente
    const resultado = vehiculos.find( vehiculos => vehiculos.patente == patente)
    if(resultado) {
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json({ mensaje: `El vehiculo con patente ${patente} no fue encontrado`} )
    }
}



const crateVehiculo = (req, res) => {
    const vehiculosData = req.body
    const existe = vehiculos.find(vehiculos => vehiculos.patente == vehiculosData.patente)
    if (!existe) {
        if( ! vehiculosData.estahabilitado)
            vehiculosData.estahabilitado = false
    
        if (!vehiculosData.marca) {
            res.status(400).json({mensaje: `No puedo generar el vehiculo con patente ${vehiculosData.patente} por no tener marca`})    
        } else  {
            vehiculos.push(vehiculosData)
            res.status(201).json({mensaje: `El vehiculo con patente ${vehiculosData.patente} fue creado correctamente`})
        }
    } else {
        res.status(400).json({mensaje: `El vehiculo con patente ${vehiculosData.patente} ya existe en la base de datos`})
    }
}

const updateVehiculo = (req, res)=>{
    const patente = req.params.patente  //Path Parameter
    const vehiculosData = req.body //Body
    const indice = vehiculos.findIndex(vehiculo => vehiculo.patente == patente)
    if ( indice >= 0 ) {
        vehiculos[indice].patente = vehiculosData.patente
        if (vehiculosData.estahabilitado!==undefined) {
            vehiculos[indice].estahabilitado = vehiculosData.estahabilitado
        }
        res.status(201).json({"vehiculo": vehiculos[indice]})
    }
    else {
        res.status(404).
        json(
            {
                resultado: "La operación de modicar no pudo ser realizada",
                mensaje: `El vehiculo con patente ${patente} no fue encontrado`
            }
        )
    }
}

module.exports = { 
    getAllVehiculos, 
    getVehiculosByPatente,
    crateVehiculo,
    updateVehiculo
}