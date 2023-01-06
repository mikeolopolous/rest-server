const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validarJWT = async(req = request, res = response, next) => {
  const token = req.header('x-token')

  if ( !token ) {
    return res.status(401).json({
      msg: 'No hay token en la petición'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY)
    const usuario = await Usuario.findById( uid )

    if ( !usuario ) {
      res.status(401).json({
        msg: 'No existe usuario'
      })
    }

    if ( !usuario.estado ) {
      return res.status(401).json({
        msg: 'Token no válido'
      })
    }

    req.usuario = usuario
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'Token no válido'
    })
  }
}

module.exports = {
  validarJWT
}