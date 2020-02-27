'use strict'
//Un modelo representa a un documento de la conexion de la base de datos
//Cuando creo un objeto modelos creo un nuevo documento en la base de datos

//Se importa mongoose
let mongoose = require('mongoose');
let Schema = mongoose.Schema; // definir esquema de un modelo

//esquema de projects(db) 
//esto es el molde sobre el cual vamos estar utilizando para crear nuevos documentos en la base de datos
let ProjectSchema = Schema({
	adn: [String],
	mutante: Boolean
},{ versionKey: false });
//El versionkey es para que no cree el __v en las colecciones
//Pasamos un json con la estructura de este modelo
//cuando hacemos un new projectScheme tenemos las propiedades del json anterior

//Exportamos este modulo para poder usarlo en otro lugar
//mongoose.model(); es para utilizar este esquema como modelo
/*
2-El primer parametro es el nombre de la entidad
1-El segundo el esquema ProjectScheme
*/
module.exports = mongoose.model('adn', ProjectSchema);