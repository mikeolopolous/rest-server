const { response, request } = require("express")

const esAdminRole = (req = request, res = response, next) => {
  if ( !req.usuario ) {
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin validar token'
    })
  }
  
  const { role, nombre } = req.usuario

  if ( role !== 'ADMIN_USER') {
    return res.status(401).json({
      msg: `${ nombre } no tiene privilegios de administrador`
    })
  }

  next()
}

const tieneRole = ( ...roles ) => {
  return (req = request, res = response, next) => {
    if ( !req.usuario ) {
      return res.status(500).json({
        msg: 'Se quiere verificar el rol sin validar token'
      })
    }

    if ( !roles.includes(req.usuario.role) ) {
      return res.status(401).json({
        msg: 'No se cuenta con los privilegios necesarios'
      })
    }

    next()
  }
}

module.exports = {
  esAdminRole,
  tieneRole
}