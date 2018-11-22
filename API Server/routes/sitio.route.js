
const express = require('express');
const router = express.Router();

const sitioController = require('../controllers/sitio.controller');

router.get('/readAll/', sitioController.readAll);
router.get('/:name/read/',sitioController.read);
router.post('/register/',sitioController.register);

module.exports = router