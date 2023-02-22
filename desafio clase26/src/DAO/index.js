import mongoose from "mongoose";

const persistence = "MONGO";

export let usersServices;
export let Products;
export let Messages;

switch(persistence) {
    case 'MONGO':
        mongoose.set('strictQuery', false);
        const connection = mongoose.connect("mongodb+srv://admin:123@cluster0.ikyksqt.mongodb.net/Desafio11?retryWrites=true&w=majority");
        const {default: MongoUser} = await import('./Mongo/UsersContainer.js');
        const {default: MongoProducts} = await import('./Mongo/ProductsMongoContainer.js');
        const {default: MongoMessages} = await import ('./Mongo/MessagesMongoContainer.js');
        usersServices = new MongoUser();
        Products = new MongoProducts();
        Messages = new MongoMessages();
        break;
    case 'FILESYSTEM':
        const {default: FSUser} = await import('./FileSystem/UsersContainer.js');
        usersServices = new FSUser;
        break;
}