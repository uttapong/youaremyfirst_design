const express = require('express')
const app = express();

app.use('/', express.static(__dirname + '/'));

app.listen(8080, '127.0.0.1');
console.log('Running server at http://localhost:8080');