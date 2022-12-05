import express from 'express';

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/', function (request, response) {
    response.send('Hello World!');
});

app.listen(PORT, function () {
    console.log('http://localhost:' + PORT);
});
