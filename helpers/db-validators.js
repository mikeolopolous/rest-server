const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async(role = '') => {
  const existeRole = await Role.findOne({role})
  if ( !existeRole ) {
    throw new Error(`El rol ${role} no está registrado en DB`)
  }
}

const emailExiste = async(correo = '') => {
  const existeCorreo = await Usuario.findOne({correo})
  if ( existeCorreo ) {
    throw new Error(`El correo ${correo} ya está registrado`)
  }
}

const existeUsuarioPorId = async(id = '') => {
  const existeUsuario = await Usuario.findById(id)
  if ( !existeUsuario ) {
    throw new Error(`El id ${id} no está registrado en BD`)
  }
}

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId
}