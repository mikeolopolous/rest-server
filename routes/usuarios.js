const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId
} = require('../helpers/db-validators')

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
} = require('../controllers/usuarios')

const router = Router()

router.get('/', usuariosGet)

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('correo', 'Correo no válido').isEmail(),
  check('correo').custom( emailExiste ),
  check('password', 'El password debe contener más de 6 caracteres').isLength({ min: 6 }),
  check('role').custom( esRoleValido ),
  validarCampos
], usuariosPost)

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  check('role').custom( esRoleValido ),
  validarCampos
], usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/:id', [
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
], usuariosDelete)

module.exports = router