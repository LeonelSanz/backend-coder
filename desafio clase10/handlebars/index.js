const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const handlebars = require("express-handlebars");

const Container = require("./components/index");
const products = new Container("./productos.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })
);

app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', async (req, res, next) => {
    res.render('post')
});

app.get('/productos', async (req, res, next) => {
    res.render('list', { productos: await products.getAll() });
});

app.post('/productos', async (req, res) => {
    const { title, price, thumbnail } = req.body;
    const id = await products.save({ title, price, thumbnail });
    res.redirect('/')
}); 

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
