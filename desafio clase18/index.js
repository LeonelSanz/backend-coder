/*
//Importamos las dependencias
import mongoose from "mongoose";

//Instanciaos el Schema
const productsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true }
});

const messageSchema = new mongoose.Schema({
    user: {
        name: { type: String, required: true },
        email: { type: String, required: true }
    },
    date: { type: Date, default: Date.now },
    message: { type: String, required: true }
});
*/
//Creamos constantes de mensajes y productos
const products = [
    {title: "Escuadra", price: 123.45, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png", stock: 25},
    {title: "Calculadora", price: 234.56, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png", stock: 35},
    {title: "Globo Terráqueo", price: 345.67, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png", stock: 45},
    {title: "Monitor", price: 12800, thumbnail: "https://st.depositphotos.com/1005574/4001/v/600/depositphotos_40012595-stock-illustration-tv-monitor.jpg", stock: 20},
    {title: "Televisor", price: 100000, thumbnail: "data:image/jpeg;base64,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", stock: 15},
    {title: "product6", price: 1213.25, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png", stock: 25},
    {title: "product7", price: 2314.56, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png", stock: 35},
    {title: "product8", price: 3435.67, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png", stock: 45},
    {title: "product9", price: 15200, thumbnail: "https://st.depositphotos.com/1005574/4001/v/600/depositphotos_40012595-stock-illustration-tv-monitor.jpg", stock: 20},
    {title: "product10", price: 155000, thumbnail: 'data:image/jpeg;base64,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', stock: 15}
];

const messages = [
    {user: {name: "Leonel", email: "leo@gmail.com"}, date: new Date().toDateString(), message: "Hola"},
    {user: {name: "user2", email: "user2@gmail.com"}, date: new Date().toDateString(), message: "Hola2"},
    {user: {name: "user3", email: "user3@gmail.com"}, date: new Date().toDateString(), message: "Hola3"},
    {user: {name: "user4", email: "user4@gmail.com"}, date: new Date().toDateString(), message: "Hola4"},
    {user: {name: "user5", email: "user5@gmail.com"}, date: new Date().toDateString(), message: "Hola5"},
    {user: {name: "user6", email: "user6@gmail.com"}, date: new Date().toDateString(), message: "Hola6"},
    {user: {name: "user7", email: "user7@gmail.com"}, date: new Date().toDateString(), message: "Hola7"},
    {user: {name: "user8", email: "user8@gmail.com"}, date: new Date().toDateString(), message: "Hola8"},
    {user: {name: "user9", email: "user9@gmail.com"}, date: new Date().toDateString(), message: "Hola9"},
    {user: {name: "user10", email: "user10@gmail.com"}, date: new Date().toDateString(), message: "Hola10"}
];
/*
//Creamos el model
const productsModel = mongoose.model('products', productsSchema);
const messagesModel = mongoose.model('messages', messageSchema);

//Conectamos a mongo
await mongoose.connect('mongodb://localhost/ecommerce', {
    serverSelectionTimeoutMS: 5000
});

//Cargamos productos
const insertedProducts = [];
const insertedMessages = [];

for (const product of products) {
    insertedProducts.push(productsModel.create(product));
};

for (const message of messages) {
    insertedMessages.push(messagesModel.create(message));
};

//Resultados
const productsResult = await Promise.allSettled(insertedProducts);
const messagesResult = await Promise.allSettled(insertedMessages);

const rejectedProducts = productsResult.filter( r => r.status == 'rejected');
const rejectedMessages = messagesResult.filter( r => r.status == 'rejected');

(rejectedProducts.length > 0) ? console.log(`There´s ${rejectedProducts.length} failures on "products".`) : console.log('There´s no failures on "products".');
(rejectedMessages.length > 0) ? console.log(`There´s ${rejectedMessages.length} failures on "messages".`) : console.log('There´s no failures on "messages".');

await mongoose.disconnect();
*/


//MongoDB
//Importamos las dependencias
import { MongoClient } from 'mongodb';

//Conectamos a mongo
const client = await MongoClient.connect(
    'mongodb://localhost/ecommerce',
    { serverSelectionTimeoutMS: 5000, useNewUrlParser: true, useUnifiedTopology: true }
);
console.log("Conectado");

const productsCollection = client.db('ecommerce').collection('products');
const messagesCollection = client.db('ecommerce').collection('messages');

// 3)
const resultProducts = await productsCollection.find().toArray();
const resultMessages = await messagesCollection.find().toArray();

console.log(resultProducts);
// 4)
console.log(resultProducts.length);
console.log(resultMessages);
// 4)
console.log(resultMessages.length);


// 5)
/*
// A)
const newProduct = {title: "newProduct", price: 2314.56, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png", stock: 35}
await productsCollection.insertOne(newProduct);
console.log("Producto agregado");
*/
// B)
// I)
const cursor = productsCollection.find({
    price: { $lt: 1000 }
});
const result = await cursor.toArray();
console.log(result);

// II)
const cursor2 = productsCollection.find({
    'price': {
        $gt: 1000,
        $lt: 3000
    }
});
const result2 = await cursor2.toArray();
console.log(result2);

// III)
const cursor3 = productsCollection.find({
    price: { $gt: 3000 }
});
const result3 = await cursor3.toArray();
console.log(result3);

// IV)
const sort = {
    'price': 1
};
const skip = 2;
const result4 = await productsCollection.findOne( {}, {sort, skip} ).name;
console.log(result4);

/*
// 5 C)
await productsCollection.updateMany({}, { $set: { stock: 100 } });
*/
/*
// 5 D)
await productsCollection.updateMany(
    { price: { $gt: 4000 } },
    { $set: { stock: 0 } }
);
*/
/*
// 5 E)
await productsCollection.deleteMany({ price: { $lt: 1000 } });
*/

// 6)
// db.createUser({ user: 'pepe', pwd: 'asd456', roles: [{role: 'read', db: 'ecommerce'}]})