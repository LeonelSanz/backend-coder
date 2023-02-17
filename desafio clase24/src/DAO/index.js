import mongoose from "mongoose";

const persistence = "MONGO";

export let usersServices;

switch(persistence) {
    case 'MONGO':
        mongoose.set('strictQuery', false);
        const connection = mongoose.connect("mongodb+srv://admin:123@cluster0.ikyksqt.mongodb.net/Desafio10?retryWrites=true&w=majority");
        const {default: MongoUser} = await import('./Mongo/UsersContainer.js');
        usersServices = new MongoUser();
        break;
    case 'FILESYSTEM':
        const {default: FSUser} = await import('./FileSystem/UsersContainer.js');
        usersServices = new FSUser;
        break;
}