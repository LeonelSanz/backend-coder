import { Router } from "express";
import { generateProduct } from '../utils/generateProducs.js';

const productsTestRouter = new Router;

productsTestRouter.get('/', (req, res) => {
    const products = [];

    for (let i = 0; i < 5; i++) {
        products.push(generateProduct())
        console.log('Product created.');
    }
    res.json(products);
});

export default productsTestRouter;