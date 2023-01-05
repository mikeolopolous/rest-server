const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')

const usuariosGet = async(req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query
  const query = { estado: true}

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(desde)
      .limit(limite)
  ])

  res.json({
    total,
    usuarios
  })
}

const usuariosPost = async(req, res) => {
  const { nombre, correo, password, role } = req.body
  const usuario = new Usuario({ nombre, correo, password, role })

  const salt = bcryptjs.genSaltSync()
  usuario.password = bcryptjs.hashSync( password, salt )

  await usuario.save()

  res.json({
    usuario
  })
}

const usuariosPut = async(req, res) => {
  const { id } = req.params
  const { _id, password, google, correo, ...resto } = req.body

  if ( password ) {
    const salt = bcryptjs.genSaltSync()
    resto.password = bcryptjs.hashSync( password, salt )
  }

  const usuario = await Usuario.findByIdAndUpdate( id, resto )

  res.json(usuario)
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