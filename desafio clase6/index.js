const Contenedor = require('./contenedor');
const express = require('express');
const PORT = 8080;
const APP = express();

let container = new Contenedor('productos.txt');

const agregarProductos = async () => {
    const products = [
        {
            "title": "Escuadra",
            "price": 123.45,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
        },
        {
            "title": "Calculadora",
            "price": 234.56,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
        },
        {
            "title": "Globo Terráqueo",
            "price": 345.67,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
        },
    ];

    for (const product of products) {
        await container.save(product);
    }
};

APP.get("/", (req, res, next) => {
    res.send(`<h1 style="text-align: center;">Server con Express</h1>
    <h4>ir a '/productos' para ver todos los productos</h4>
    <h4>ir a '/productoRandom' para ver un producto random</h4>
    `);
});

APP.get('/productos', async (req, res, next) => {
    let products = await container.getAll();
    res.send(products);
});

APP.get('/productoRandom', async (req, res, next) => {
    let products = await container.getAll();
    res.send(products[Math.floor(Math.random()*3)]);
});

APP.listen(PORT, async () => {
    await agregarProductos();
    console.log(`Server on http://localhost:${PORT}`);
});