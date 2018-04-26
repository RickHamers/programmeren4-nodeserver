// _-//TypicalDoofus\\-_
// A basic NodeJS Server
//

//Require for the used modules
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
//Importing the person.js class
const person = require('./domain/person');

//Initializing the Express module
const app = express();

//Setting the port for the NodeJS server
const port = process.env.PORT || 3000;

//Defining the modules used in the Express server
app.use(morgan('dev'));
app.use(bodyparser.json());

//Making a personList Array
let personList = [];

//Parsing the request
app.use('*', (req, res, next) => {
    let httpMethod = req.method;
    let requestUrl = req.baseUrl;
    console.log('We received a ' + httpMethod + ' request at ' + requestUrl);


    next();
});

//The GET personList request
app.get('/api/person', (req, res) => {
    console.log('---------------A GET request was made---------------');

    const newPerson = new person('Typical', 'Doofus'); //Making a new Person object

    res.status(200).json(personList).end(); //Response to the GET request
});

//The GET person request
app.get('/api/person/:id', (req, res, next) => {
    console.log('---------------A GET request was made---------------');

    const id = req.params.id;  //Requesting the ID for the person object

    if (id >= 0 && id < personList.length){
        //The ID is correct - Send the person back
        res.status(200).json(personList).end(); //Response to the GET request
    } else {
        //The ID is not correct - Error
        const error = {
            error: 'ID does not exist (index out of bounds)',
            url: req.baseUrl,
            statuscode: 404
        };
        next(error);
    }

});

//The POST request
app.post('/api/person', (req, res) => {
    console.log('---------------A POST request was made---------------');

    console.log(req.body); //Printing the POST request's body
    const firstname = req.body.firstname; //Requesting firstname from the client
    const lastname = req.body.lastname; //Requesting lastname from the client

    const postPerson = new person(firstname, lastname); //Making a new person using the posted firstname and lastname
    personList.push(postPerson); // adding the postPerson to the personList

    //response to the POST request
    res.status(200).json(postPerson).end();//Response to the POST request
});

//The DELETE request
app.delete('/api/person/:number', (req, res) => {
    console.log('---------------A DELETE request was made---------------');

    console.log(req.body); //Printing the POST request's body
    const number = req.params.number; //Getting the number from the end of the URL

    personList.splice(number,1); //Removing the user from the personList Array

    //response to the DELETE request
    res.status(200).json(personList).end();//Response to the DELETE request
});

//No endpoint found
app.use('*', (req, res, next) => {
    let httpMethod = req.method;
    let requestUrl = req.baseUrl;
    console.log('We received a ' + httpMethod + ' request at ' + requestUrl);

    //Creating a response for error 404 : Page not found
    const error = {
        error: 'Endpoint does not exist',
        url: requestUrl
    };
    //Sending error info to Final error Handler
    next(error);
});

// Final error handler for Next(Info);
app.use((err,req,res,next) => {
    console.log('Final error handler: an error occurred');
    console.log(err);

    //Responding to the error
    res.status(500).json(err).end();
});

//Starting the server
app.listen(port, () => {
    console.log('The server is running on port ' + port)
});