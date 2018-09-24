const express = require('express');
const router = express.Router();
const  customerController= require('../controllers/controllerMaps.js');

//inicio
router.get('/',customerController.index);
router.get('/localidades',customerController.localidades);
router.get('/tipo',customerController.tipo);
router.get('/coordenadas',customerController.coordenadas);
router.get('/coordenadas_todo',customerController.coordenadas_todo);

module.exports = router;
