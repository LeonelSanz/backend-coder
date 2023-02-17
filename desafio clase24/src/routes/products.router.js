import { Router } from "express";
import { APIproducts } from "../app.js";

const productsRouter = new Router();

productsRouter.get('/', async (req,res) => {
    let products = await APIproducts.getAll();
    res.json(products);
});

productsRouter.get('/:id', async (req,res) => {
    let id = req.params.id;
    let product = await APIproducts.getById(id);
    product ? res.json({product}) : res.json({ERROR: `Error: ID ${id} not found`});
    console.log(product[0]);
});

productsRouter.post('/', async (req,res) => {
    let newProd = req.body;
    if (newProd) {
        newProd = await APIproducts.saveProduct(newProd);
        res.json({
            new_product: newProd
        });
    } else {
        console.log("Error al agregar");
        console.log(error);
    }
});

productsRouter.put('/:id', async (req,res) => {
    let prodToUpdate = await APIproducts.getById(req.params.id);
    if (prodToUpdate && req.body.id === prodToUpdate.id) {
        let update = await APIproducts.updateProduct(req.body, req.params.id);
        res.json({
            old_product: prodToUpdate,
            new_product: req.body,
            update
        });
    } else {
        console.log("Error al actualizar");
        console.log(error);
    }
});

productsRouter.delete('/:id', async (req,res) => {
    let deleted = await APIproducts.getById(req.pramas.id);
    if (deleted) {
        await APIproducts.deleteById(req.params.id);
        res.json({
            deleted_product: deleted
        });
    } else {
        console.log("No se encontro el ID");
        console.log(error);
    }
});

export default productsRouter;