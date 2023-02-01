import express from 'express';
const { Router } = express;

import productsRouter from './router/products.router.js';
import cartsRouter from './router/carts.router.js';

const app = express();
const PORT = process.env.PORT || 8080;

import setPersistance from './DAO/index.js';
const container = setPersistance('filesystem');

export const APIproducts = container.products;
export const APIcarts = container.carts;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

app.use('/api/productos', productsRouter);
app.use('/api/carritos', cartsRouter);

//Root
app.get('/', (req, res) => {
    res.send('SEGUNDA ENTREGA FINAL');
});

const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});