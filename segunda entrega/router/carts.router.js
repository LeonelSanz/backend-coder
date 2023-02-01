import { Router } from 'express';
import { APIcarts, APIproducts } from '../index.js';

const cartsRouter = new Router;

cartsRouter.get('/', async (req,res) => {
    let cartsArr = await APIcarts.getAll();
    (cartsArr) ? res.jon({carts: cartsArr}) : res.json({error: "No hay carritos"});
})

cartsRouter.get('/:id', async (req,res) => {
    let cart = await APIcarts.getById(req.params.id);
    cart ? res.json({cart: cart}) : res.json({error: "No existe un carrito con este ID"});
})

cartsRouter.post('/', async (req,res) => {
    try {
        let newCart = await APIcarts.saveCart(req.body);
        res.json({
            new_cart: newCart
        });
    } catch (error) {
        console.log(error);
    }
})

cartsRouter.delete('/:id', async (req,res) => {
    let cart = await APIcarts.getById(req.params.id);
    try {
        let deleted = await APIcarts.deleteById(Number(req.params.id));
        res.json({
            deleted_cart: cart
        });
    } catch (error) {
        console.log("Error al borrar");
        console.log(error);
    }
})

cartsRouter.get('/:id/productos', async (req,res) => {
    let cart = await APIcarts.getById(req.params.id);
    if(cart) res.json({ cart_id: cart.id, cart_products: cart.products })
    else throw new Error("No existe un carrito con ese ID");
})

cartsRouter.post('/:id/productos', async (req,res) => {
    let cart = await APIcarts.getById(req.params.id);
    try {
        let productToAdd = await APIproducts.getById(req.body.id);
        cart.products.push(productToAdd);
        let response = await APIcarts.updateCart(req.params.id, cart);
        res.json({
            new_cart: cart,
            response
        });
    } catch (error) {
        console.log(error);
    }
})

cartsRouter.delete('/:id/productos/:id_product', async (req,res) => {
    let cart = await APIcarts.getById(req.params.id);
    let product = await APIproducts.getById(req.params.id_product);
    if (cart && product) {
        let response = await APIcarts.deleteCartProduct(cart, product);
        res.json({
            newCart: cart,
            response
        });
    } else {
        throw new Error("Carrito o Producto no encontrado");
    }
})

export default cartsRouter;