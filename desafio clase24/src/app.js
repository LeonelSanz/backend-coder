import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';

/* 
import productsRouter from './router/products.router.js';
import cartsRouter from './router/carts.router.js'; 
*/

const app = express();
const PORT = process.env.PORT || 8080;

/* import setPersistance from '../DAO/index.js';
const container = setPersistance('filesystem'); // " mongo " || " filesystem "

export const APIproducts = container.products;
export const APIcarts = container.carts;
*/

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://admin:123@cluster0.ikyksqt.mongodb.net/Desafio10?retryWrites=true&w=majority",
        ttl: 20
    }),
    secret: 'aspdiasc903ok1pkc',
    resave: false,
    saveUninitialized: false
}));

//Inicializar el motor
app.engine('handlebars',handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Routers
app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);


const server = app.listen(PORT, () => console.log(`Connected on: http://localhost:${PORT}`));