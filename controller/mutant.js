/* Es una especie de clase que va a tener una serie de metodos 
	o acciones que va a poder hacer relacionada con la entidad de projets*/

'use strict'

//Cargamos el modelo
const Personas = require('../models/mutant');
const fs = require('fs');



//Se puede hacer un obejto json

var controller = {


	
	//TEST
	////////////////////////////////////////////////////////////////////////////////////////////////////
	test: function(req , res) {
		var respuestaTest = res.status(200).send({
			message: 'Test para probar la API'
		});

		return respuestaTest;
	},
	//METODO SAVE
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	registrarMutant: function(req , res) {
		
		//Cuando hago new automaticamente le asigna un id
		let personas = new Personas();
		let params = req.body;
		
		personas.adn = params;
		personas.mutante = true

		//Guardar objeto en la base de datos
		//Usamos el orm de mogoose
			
			personas.save((err, mutantParams) =>{
			
				if (err) {return res.status(503).send({message: 'Error al guardar el documento'});};
				if (!mutantParams) {return res.status(404).send({message: 'Error no se encontro'});};
				return res.status(200).send({Registro: mutantParams});
				
			});		
	},

	registrarPerson: function(req, res){

		//Cuando hago new automaticamente le asigna un id
		let personas = new Personas();
		let params = req.body;
		personas.adn = params;
		personas.mutante = false

		//Guardar objeto en la base de datos
		//Usamos el orm de mogoose
			
			personas.save((err, personParams) =>{
			
				if (err) {return res.status(503).send({message: 'Error al guardar el documento'});};
				if (!personParams) {return res.status(404).send({message: 'Error no se encontro'});};
				return res.status(200).send({Registro: personParams});
				
			});
	},
	//Metodo GETALL
	///////////////////////////////////////////////////////////////////////////////////////////////////
	estadistica: function(req, res){
		
		//Uso promesas anidadas para hacer consultas anidadas
		Personas.countDocuments({}, (err, contador) => {
			
			Personas.countDocuments({mutante: true},(err, countV) => {
				let promedio = (countV*100)/contador
				let redondeo = Math.round(promedio)
				if (err) return res.status(503).send({Mensaje: 'Error al obtener datos'});
				if (!contador) return res.status(404).send({Mensaje: 'No hay registros'});
				return res.status(200).send({
					Total_Registrado: contador,
					Mutantes_Detectados: countV,
					Radio: `${redondeo}%`
				});
				
			})
			if (err) return res.status(503).send({Mensaje: 'Error al obtener datos'});			
			
	   });
	}
};

module.exports = controller;

//Se recomienda crear un fichero de rutas por cada uno de los controladores