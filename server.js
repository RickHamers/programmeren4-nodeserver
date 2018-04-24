//
// A basic NodeJS Server //TypicalDoofus\\
//
let express = require('express');
let app = express();

const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('TypicalDoofus');
});

app.listen(port, () => {
    console.log('The server is running on port ' + port)
});