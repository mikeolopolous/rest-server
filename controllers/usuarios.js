const { response, request } = require('express')
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
  const body = req.body
  const usuario = new Usuario(body)

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