import jwt from "jsonwebtoken";
import { Router } from "express";
import config from "../config/config.js";
import { transporter } from "../services/mailing.js";
import carritoM from '../DAO/Mongo/CartsMongoContainer.js';
import productosM from '../DAO/Mongo/ProductsMongoContainer.js';

const carrito = new carritoM();
const productos = new productosM();
const cartsRouter = new Router();

cartsRouter.post("/", async (req, res, next) => {
    //consultar por este problema. No puedo acceder a req.body sin .stringify y .parse a pesar de que aplique .stringify en la peticion de login
    const body = JSON.stringify(req.body)
    const { email } = JSON.parse(body)
    const cartExist = await carrito.getCart(email)
    const response = !cartExist? await carrito.createCart(email) : cartExist
    res.send(JSON.stringify(response));
});
cartsRouter.get("/", async(req, res, next) => {
    const body = JSON.stringify(req.body)
    const email = JSON.parse(body)
    const cartExist = await carrito.getCart(email)
    res.send(JSON.stringify(cartExist))
})
cartsRouter.post("/add", async(req, res, next) => {
    const body = JSON.stringify(req.body)
    const bodyParsed = JSON.parse(body)
    const token = req.cookies[config.jwt.cookie]
    const {nombre, email} = jwt.verify(token, config.jwt.token)
    const cart = await carrito.getCart(email)
    cart.productos = [...bodyParsed]
    let contenedor = ``;
    for (const producto of bodyParsed) {
        const prod = await productos.getById(producto.id)
        if (prod) {
            contenedor += `<p style="color:blue;"><span>Titulo:${prod.title}</span> <span>$${prod.price}</span> <span>Cantidad:${producto.cantidad}</span> <span>${prod.thumbnail}</span></p>`
        }
    }
    const result = await transporter.sendMail({
        from:`Entrega Final 3 ahora si que si <${config.app.GMAIL_USER}>`,
        to:email,
        subject:`Nuevo pedido de ${nombre} (${email})`,
        html:`<div>${contenedor}</div>`
    })
    console.log(contenedor);
    res.send({status: "success", message: "Compra finalizada"})
})
//vacía un carrito y lo elimina
cartsRouter.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    await carrito.deleteById(id);
    res.send("Carrito eliminado");
});
//lista todos los productos del carrito
cartsRouter.get("/:id/productos", async (req, res, next) => {
    const { id } = req.params;
    const listado = await carrito.getProductos(id);
    res.send(JSON.stringify(listado));
});
//agrega productos (por su id) al carrito
cartsRouter.post("/:id/productos", async (req, res, next) => {
    const { id } = req.params;
    const { idProduct } = req.body;
    await carrito.saveProduct(id, idProduct);
    res.send("Producto agregado")
});
//elimina un producto del carrito por su id de carrito y de producto
cartsRouter.delete("/:id/productos/:id_prod", async (req, res, next) => {
    const { id } = req.params;
    const { id_prod } = req.params;
    await carrito.delProdById(id, id_prod);
    res.send("Producto borrado")
});
export default cartsRouter;