//Imports
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import * as handlebars from 'express-handlebars';
import productsTestRouter from './routes/products.router.js';
import messagesRouter from './routes/messages.router.js';
import mongoose from 'mongoose';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const __dirname = dirname(fileURLToPath(import.meta.url));
const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/public/views/layout",
    partialsDir: __dirname + "/public/views/partials/"
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('hbs', hbs.engine);
app.set('views', './public/views');
app.set('view engine', 'hbs');
app.use('/api/products-test', productsTestRouter);
app.use('/api/messages', messagesRouter);

//Conexion DB
await mongoose.connect('mongodb+srv://admin:123@cluster0.ikyksqt.mongodb.net/desafio22?retryWrites=true&w=majority', {
    serverSelectionTimeoutMS: 5000
})

//Esquema de datos
const messagesSchema = new mongoose.Schema({
    user: {
        name: {type: String, required: true},
        email: {type: String, required: true}
    },
    date: {type: Date, default: Date.now },
    text: { type: String, required: true }
});

//Creamos el modelo
const messagesModel = mongoose.model( 'messages', messagesSchema );
export const messages = await messagesModel.find({});

app.get('/', async (req, res, next) => {
    res.render('index', {})
});

/*io.on('connection', async socket => {
    const products = productos.createMany(10);
    const messages = await mensajes.getAll();
    socket.emit('update_products', products);
    socket.emit('update_messages', messages);
    socket.on('new_product', async product => {
        product = await productos.saveProduct(product)
        products.push(product)
        io.sockets.emit('update_products', products)
    })
    socket.on('new_message', async message => {
        messages.push(message)
        await mensajes.save(message)
        io.sockets.emit('update_messages', messages)
    })
})
*/
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
connectedServer.on(
    'error', error => console.log(`Error en el servidor : ${error}`)
);
