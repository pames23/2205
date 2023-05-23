const reservas = require('../../datos/reservas.json')

const getAllReservas = (req, res)=>{
    res.json( reservas ).status(200)
}

const getReservasById = (req, res) => {
    const id = req.params.id
    const resultado = reservas.find( reservas => reservas.id == id)
    if(resultado) {
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json({ mensaje: `El Id ${id} no fue encontrado`} )
    }
}

const deleteReservasById = (req, res) => {
    const id = req.params.id
    const indice = reservas.findIndex( reservas => reservas.id == id )
    if(indice==-1) {
        res.status(404).
        json(
            {
            resultado: "La operación de borrado no pudo ser realizada",
            mensaje: `El id ${id} no fue encontrado`
            }
        )
    } else {
        const reservas = reservas[indice];
        const resultado = reservas.splice(indice,1)
        res.status(200)
        .json(
            {resultado: "La operación de borrado pudo realizarse con exito",
                  reservas: reservas
            }
        )
    }
}

const crateReserva = (req, res) => {
    const reservasData = req.body
    const existe = reservas.find(reservas => reservas.id == reservasData.id)
    if (!existe) {
        if( ! reservasData.estahabilitado)
            reservasData.estahabilitado = false
    
        if (!reservasData.marca) {
            res.status(400).json({mensaje: `No puedo generar la reserva con id ${reservasData.id} por no tener marca`})    
        } else  {
            reservas.push(reservasData)
            res.status(201).json({mensaje: `La reserva con Id ${reservasData.id} fue creada correctamente`})
        }
    } else {
        res.status(400).json({mensaje: `La reserva con Id ${reservasData.id} ya existe en la base de datos`})
    }
}



module.exports = { 
    getAllReservas, 
    getReservasById,
    deleteReservasById,
    crateReserva,
 
}