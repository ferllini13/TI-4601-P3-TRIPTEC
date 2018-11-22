const express = require('express');
const router = express.Router();

const consultasController = require('../controllers/consultas.controller');


router.get('/:id/sitiosCliente/', consultasController.sitiosCliente);
router.get('/sitiosReservados/', consultasController.sitiosReservados);
router.get('/sitiosMasReservados/', consultasController.sitiosMasReservados);
router.get('/:id/sitiosEnComun/', consultasController.sitiosEnComun);
module.exports = router