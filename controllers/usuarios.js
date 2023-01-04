const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = 'no name', apikey } = req.query

  res.json({
    msg: 'get method - Controlador',
    q,
    nombre,
    apikey
  })
}

const usuariosPost = async(req, res) => {
  const { nombre, correo, password, role } = req.body
  const usuario = new Usuario({ nombre, correo, password, role })

  const existeEmail = await Usuario.findOne({ correo })
  if ( existeEmail) {
    return res.status(400).json({
      msg: 'El correo ya está registrado'
    })
  }

  const salt = bcryptjs.genSaltSync()
  usuario.password = bcryptjs.hashSync( password, salt )

  await usuario.save()

  res.json({
    usuario
  })
}

const usuariosPut = (req, res) => {
  const id = req.params.id

  res.json({
    msg: 'put method - Controlador',
    id
  })
}

const usuariosPatch = (req, res) => {
  res.json({
    msg: 'patch method - Controlador'
  })
}

const usuariosDelete = (req, res) => {
  res.json({
    msg: 'delete method - Controlador'
  })
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}