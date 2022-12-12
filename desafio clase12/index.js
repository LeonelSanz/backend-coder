const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();

const handlebars = require("express-handlebars");
const {Server: HttpServer} = require("http");
const httpServer = new HttpServer(app);

const Products = require("./resources/products/products.js");
const products = new Products('./resources/products/products.json');
const Messages = require('./resources/messages/messages.js');
const messages = new Messages("./resources/messages/messages.json");

// const Container = require("./components/index");
// const products = new Container("./productos.json");

const {Server: IOServer} = require("socket.io");
const io = new IOServer(httpServer);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/public/views/layout",
    partialsDir: __dirname + "/public/views/partials/"
});
app.engine('hbs', hbs.engine);

app.set('views', './public/views');
app.set('view engine', 'hbs');

app.get('/', async (req, res, next) => {
    res.render('index', {})
});

io.on('connection', async socket => {
    socket.emit('loadProducts', await products.getAll());
    socket.emit('loadMessages', await messages.getAll());
    socket.on('addProduct', async product => {
        await products.saveProduct(product);
        io.emit('loadProducts', await products.getAll());
    })
    socket.on('sendMessage', async message => {
        await messages.save(message);
        io.emit('loadMessages', await messages.getAll());
    })
})

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
connectedServer.on(
    'error', error => console.log(`Error en el servidor : ${error}`)
);
