// _-//TypicalDoofus\\-_
// person-controller
//

//Making a personList Array
let personList = [];
const Person = require('../domain/person');

//Require assert
const assert = require('assert');

module.exports = {

    getAllPersons(req, res, next){
        console.log('---------------A GET request was made---------------');
        console.log('------------------Get all persons-------------------');
        res.status(200).json(personList).end(); //Response to the GET request
    },

    getPersonById(req, res, next) {
        console.log('---------------A GET request was made---------------');
        console.log('------------------Get person by ID------------------');
        const id = req.params.id;  //Requesting the ID for the person object

        if (id >= 0 && id < personList.length) {
            //The ID is correct - Send the person back
            res.status(200).json(personList).end(); //Response to the GET request
        } else {
            //The ID is not correct - Error
            const error = {
                error: 'ID does not exist (index out of bounds)',
                url: req.baseUrl,
                statuscode: 404
            };
        }
    },
        createPerson (req, res, next) {
            console.log('---------------A POST request was made---------------');
            console.log('---------------Adding item to the list---------------');
            console.log(req.body); //Printing the POST request's body
            const firstname = req.body.firstname; //Requesting firstname from the client
            const lastname = req.body.lastname; //Requesting lastname from the client

            const postPerson = new Person(firstname, lastname); //Making a new person using the posted firstname and lastname
            personList.push(postPerson); // adding the postPerson to the personList

            //response to the POST request
            res.status(200).json(postPerson).end();//Response to the POST request
        },

        deletePersonById(req, res, next){
            console.log('---------------A DELETE request was made---------------');
            console.log('------------------Delete person by ID------------------');

            const id = req.params.id; //Getting the number from the end of the URL

            //Preconditions
            //id is a number between 0 and the length of the personList
            assert(req.params.id, 'Invalid ID [1]');
            assert(!isNaN(id) && id >= 0 && id <personList.length, 'invalid ID [2]');

            //Delete person with index ID from the personList

            personList.splice(id,1); //Removing an amount of persons from the personList Array

            //Return a status with message
            res.status(200).json(personList).end();//Response to the DELETE request
        }

};


//CRUD functions

