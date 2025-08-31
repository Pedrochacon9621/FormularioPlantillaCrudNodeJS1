const  Router = require('express');
const {seleccionarTodos, actualizar, nuevoRegistro, eliminar, buscarCedula} = require('./routerFuntion.js');
const router = Router();

router.get('/seleccionarTodos', seleccionarTodos);
router.put('/actualizar/:id', actualizar);
router.post('/paginas/registro.html', nuevoRegistro);
router.get('/buscarCedula', buscarCedula);
router.delete('/eliminar/:id', eliminar);

module.exports = router;