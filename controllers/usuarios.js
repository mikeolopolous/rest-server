const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = 'no name', apikey } = req.query

  res.json({
    msg: 'get method - Controlador',
    q,
    nombre,
    apikey
  })
}

const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body

  res.json({
    msg: 'post method - Controlador',
    nombre,
    edad
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