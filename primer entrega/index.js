const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const isAdmin = true;

function checkAdmin(req,res, next) {
    if (!isAdmin) {
        const error = {
            error: -1,
            description: "ruta 'X' metodo 'Y' no autorizada"
        };
        return res.json({error});
    } else {
        next();
    };
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Products = require("./resources/products/products.js");
const products = new Products('./resources/products/products.json');

const Carts = require("./resources/cart/cart");
const carts = new Carts("./resources/cart/cart.json");

app.get('/', async (req, res, next) => {
    res.send("Primera entrega proyecto final");
});

// Router productos
app.get('/api/productos', async (req,res) => {
    let productsArr = await products.getAll();
    productsArr.forEach(element => element.timestamp = Date.now());
    res.json(productsArr);
});
app.get('/api/productos/:id', async (req,res) => {
    let id = req.params.id;
    let product = await products.getById(id);
    product ? res.json({product}) : res.json({ERROR: `Error: ID ${id} not found`});
});
app.post('api/productos/', checkAdmin, async (req,res) => {
    let newProduct = req.body;
    if (newProduct) {
        newProduct = await products.saveProduct(newProduct);
        res.json({
            new_product: newProduct
        });
    } else {
        console.error('Error de lectura.');
        console.error(error);
    }
});
app.put('/api/productos/:id', checkAdmin, async (req,res) => {
    let oldProd = await products.getById(req.params.id);
    let newProd = await products.updateProduct(req.body);
    if (oldProd.id === req.body.id) {
        try {
            res.json({
                newProd,
                oldProd: oldProd,
                newProduct: req.body
            });
            console.log("Product updated");
        } catch (error) {
            console.error('Error de lectura.');
            console.error(error);
        }
    } else {
        console.log("Failed to update");
    }
});
app.delete('/api/productos/:id', checkAdmin, async (req,res) => {
    let deleted = await products.getById(req.params.id);
    if (deleted) {
        await products.deleteById(req.params.id);
        res.json({deleted_product: deleted});
    } else {
        console.error('Error de lectura.');
        console.error(error);
    }
});

// Router carts
app.post('/api/carrito', async (req, res) => {
    try {
        let cart = await carts.newCart();
        res.json({
            cart: cart
        });
    } catch (error) {
        console.error('Failed to create');
        console.error(error);
    }
});
app.delete('/api/carrito/:id', async (req,res) => {
    try {
        let deleted = await carts.deleteById(req.params.id);
        res.json({deleted_cart: deleted});
    } catch (error) {
        console.error('Error de lectura.');
        console.error(error);
    }
});
app.get('/api/carrito/:id/productos', async (req,res) => {
    let cart = await carts.getById(req.params.id);
    if (cart) {
        try {
            res.json({
                cart_id: cart.id,
                cart_products: cart.products
            });
        } catch (error) {
            console.error('Error de lectura.');
            console.error(error);
        }
    } else {
        res.json({
            error: "Cart not found"
        });
    }
});
app.post('/api/carrito/:id/productos', async(req,res) => {
    let cart = await carts.getById(req.params.id);
    let product = await products.getById(req.body.id);
    try {
        cart.products.push(products);
        await carts.updateCart(cart);
        res.json({
            added_product: product,
            cart: cart
        });
    } catch (error) {
        console.error('Error de lectura.');
        console.error(error);
    }
});
app.delete('/api/carrito/:id/productos/:id_prod', async (req,res) => {
    let cart = await carts.getById(req.params.id);
    let product = await products.getById(req.params.id_prod);
    if (cart && product) {
        let check = cart.products.some(element => element.id == product.id);
        if (check) {
            await carts.updateCart({...cart, "products": cart.products.filter(element => element.id != product.id )});
            res.json({deleted_prod: product});
        } else {
            res.json({"error": "No cart or product with this ID"});
        }
    } else {
        res.json({"error": "No cart or product with this ID"});
    }
});

const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});