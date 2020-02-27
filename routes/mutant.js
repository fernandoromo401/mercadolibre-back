'use strict'

//Cargar el modulo de express y el modulo creado en el controller

const express = require('express');
const mutantController = require('../controller/mutant');
const mutantMW = require('../middleware/mutant')


//cargamos el router que tiene muchos metodos para acceder a ella
const router = express.Router();

//Middlerware de la dependencia multipart -> se ejecuta antes de que se ejecute el metodo del controlador


//accedemos con get al metodo del controlador


router.get('/test', mutantController.test);

router.post('/mutant',mutantMW.matrix ,mutantMW.adnCaracter, mutantMW.isMutant, mutantController.registrarMutant);
router.post('/person', mutantController.registrarPerson);

router.get('/stats', mutantController.estadistica);




//ahora exporto

module.exports = router;