const PORT = 3000;

import express from 'express';

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/', function (request, response) {
    response.sendFile('public/index.html', { root: '.'});
});

app.get('/products', function (request, response) {
    response.json({
        "products": ["Kebabas", "Mėsainis", "Ledai", "Vanduo", "Coca-Cola"]
    });
});

app.listen(PORT, function () {
    console.log('http://localhost:' + PORT);
});
