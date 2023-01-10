const { response, json } = require("express")
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const { generarJWT } = require("../helpers/generar-jwt")
const { googleVerify } = require("../helpers/google-verify")

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

const googleSignIn = async(req, res = response) => {
  const { id_token } = req.body

  try {
    const { correo, img,  nombre } = await googleVerify( id_token )

    let usuario = await Usuario.findOne({ correo })

    if ( !usuario ) {
      const data = {
        nombre,
        correo,
        img,
        password: ':P',
        google: true,
        role: 'USER_ROLE'
      }

      usuario = new Usuario(data)
      await usuario.save()
    }

    if ( !usuario.estado ) {
      return res.status(401).json({
        msg: 'Usuario bloqueado'
      })
    }

    const token = await generarJWT( usuario.id )

    res.json({
      usuario,
      token
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'El token no se pudo verificar'
    })
  }

}

module.exports = {
  login,
  googleSignIn
}