import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import forkRouter from './routes/fork.router.js';
import passport from 'passport';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { Messages, Products } from './DAO/index.js';
import initializeStrategies from './config/passport.config.js';
import mongoose from 'mongoose';
import config from './config/config.js';
import { addLogger } from './middleware/logger.js';

const app = express();
const PORT = config.app.PORT;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongo.URL,
        ttl: 30
    }),
    secret: config.mongo.SECRET,
    resave: false,
    saveUninitialized: false
}));

//Passport
initializeStrategies();
app.use(passport.initialize());
app.use(passport.session());

//Inicializar el motor
app.engine('handlebars',handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine','handlebars');
app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Logger
app.use(addLogger);

//Socket.io config.
io.on('connection', async socket => {
    socket.emit('loadProducts', await Products.getAll());
    socket.emit('loadMessages', await Messages.getAll());
    socket.on('addProduct', async product => {
        await Products.saveProduct(product);
        io.emit('loadProducts', await Products.getAll());
    })
    socket.on('sendMessage', async message => {
        await Messages.save(message);
        io.emit('loadMessages', await Messages.getAll());
    });
}); 

//Routers
app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/random', forkRouter);


const server = app.listen(PORT, () => console.log(`Connected on: http://localhost:${PORT}`));