const { response } = require("express")
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const { generarJWT } = require("../helpers/generar-jwt")

const login = async(req, res = response) => {
  const { correo, password } = req.body

  try {
    const usuario = await Usuario.findOne({ correo })
    if ( !usuario ) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña incorrectos'
      })
    }

    if ( !usuario.estado ) {
      return res.status(400).json({
        msg: 'El usuario no existe en la BD'
      })
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password )
    if ( !validPassword ) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña incorrectos - password'
      })
    }

    const token = await generarJWT( usuario.id )

    res.json({
      usuario,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Algo salió mal'
    })
  }
}

module.exports = {
  login
}