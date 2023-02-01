import mongoose from "mongoose";

try {
    await mongoose.connect('mongodb+srv://admin:123@cluster0.ikyksqt.mongodb.net/SegundaEntrega?retryWrites=true&w=majority')
} catch (error) {
    console.log("Error al conectar con MongoDB");
    console.log(error);
}

export default class ContenedorMongo {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema)
    };

    async getAll(){
        let Arr = await this.collection.find({});
        return Arr;
    };

    async getById(id) {
        let resp = await this.collection.find({ _id: id });
        return resp[0];
    };

    async deleteById(id) {
        try {
            console.log(`Deleted: ${JSON.stringify(await this.getById(id))}`);
            await this.collection.deleteOne({ _id: id });
        } catch (error) {
            console.log(error);
        };
    };
};