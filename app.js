const PORT = 3000;

const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const productsRouter = require('./routes/api/products');
const ordersRouter = require('./routes/api/orders');

dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB'));

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

app.get('/', (request, response) => {
  response.redirect('/products');
});

app.get('/products', (request, response) => {
  response.sendFile('public/html/products.html', { root: '.' });
});

app.get('/orders', (request, response) => {
  response.sendFile('public/html/orders.html', { root: '.' });
});

app.get('/notifier', (request, response) => {
  response.sendFile('public/html/notifier.html', { root: '.' });
});

app.get('/product-info', (request, response) => {
  response.sendFile('public/html/product-info.html', { root: '.' });
});



if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}

module.exports = app;
