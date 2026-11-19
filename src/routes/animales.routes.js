const express = require('express');
//el .. sube un nivel en la carpeta
const controlador = require('../controllers/animales.controller');
const router = express.Router();

router.post('/', controlador.crearAnimal);
router.put('/:id', controlador.actualizarAnimal);
router.get('/:id', controlador.obtenerAnimal);
module.exports = router;