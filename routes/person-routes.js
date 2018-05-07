// _-//TypicalDoofus\\-_
// Person routes (GET, POST, DELETE)
//

//Require for the express module
const express = require('express');
const PersonController = require('../controllers/person-controller');


//Creating the express Router
let routes = express.Router();



//The GET personList request
routes.get('/person', PersonController.getAllPersons);

//The GET person request
routes.get('/person/:id', PersonController.getPersonById);

//The POST request
routes.post('/person', PersonController.createPerson);

//The DELETE request
routes.delete('/person/:id', PersonController.deletePersonById);

//Make routes available to other classes
module.exports = routes;