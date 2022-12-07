const PORT = 3000;

import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import productsRouter from './routes/products.js';

dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB'));

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use('/products', productsRouter);

app.get('/', (request, response) => {
  response.sendFile('public/html/index.html', { root: '.' });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
