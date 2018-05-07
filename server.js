// _-//TypicalDoofus\\-_
// A basic NodeJS Server
//

//Require for the used modules
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');

//Importing the other classes
const person_routes = require('./routes/person-routes.js');

//Initializing the Express module
const app = express();

//Setting the port for the NodeJS server
const port = process.env.PORT || 3000;

//Defining the modules used in the Express server
app.use(morgan('dev'));
app.use(bodyparser.json());

//Parsing the request
app.use('*', (req, res, next) => {
    let httpMethod = req.method;
    let requestUrl = req.baseUrl;
    console.log('We received a ' + httpMethod + ' request at ' + requestUrl);

    next();
});

app.use('/api', person_routes);

//No endpoint found
app.use('*', (req, res, next) => {
    let httpMethod = req.method;
    let requestUrl = req.baseUrl;
    console.log('We received a ' + httpMethod + ' request at ' + requestUrl);


    //Sending error info to Final error Handler
    next('Endpoint does not exist');
});

// Final error handler for Next(Info);
app.use((err,req,res,next) => {
    console.log('Final error handler: an error occurred');
    console.log(err.toString());
    let requestUrl = req.baseUrl;

    //Creating a response for errors
    const error = {
        error: err.toString(),
        url: requestUrl
    };

    //Responding to the error
    res.status(500).json(error).end();
});

//Starting the server
app.listen(port, () => {
    console.log('The server is running on port ' + port)
});