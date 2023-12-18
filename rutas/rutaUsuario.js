const express = require('express');
const router = express.Router();
const ControllerUsuario = require('../controller/controllerUsuario');

// Definir rutas 

router.post('/crearUsuario',ControllerUsuario.crearUsuario);
router.post('/login',ControllerUsuario.login);
router.put('/:id', ControllerUsuario.editarUsuario);
router.get('/todosUsuarios',ControllerUsuario.obtenerUsuarios);
router.get('/pacientes',ControllerUsuario.obtenerPacientes);
router.get('/medicos',ControllerUsuario.obtenerMedicos);
router.get('/:id',ControllerUsuario.obtenerUsuario);
router.get('/especialidad/:especialidad',ControllerUsuario.obtenerMedicosEspecialidad);


module.exports = router;