const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/cliente.controller');

router.get('/:id/readById/',clienteController.readById);
router.get('/:id/history/', clienteController.history);
router.post ('/book/', clienteController.book);
router.put('/:id/:name/possibleVisit/', clienteController.possibleVisit);
router.put('/:id/:name/wish', clienteController.wish);
router.get('/:id/wishlist', clienteController.wishlist);

module.exports = router