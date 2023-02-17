import mongoose from "mongoose";
import ContenedorMongo from "./ContenedorMongo.js";

const productsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: Number, required: true},
    thumbnail: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
});


export default class ContenedorProductsMongo extends ContenedorMongo {

    constructor() {
        super('products', productsSchema);
    };

    async saveProduct(product) {
        if (product.id) {
            delete product.id;
        };
        let newProd = await this.collection.create(product);
        return newProd;
    };

    async updateProduct(product, productId) {
        let updatedProduct = this.collection.updateOne({ _id: productId}, product);
        if(product) return updatedProduct
        else {throw new Error('INVALID PRODUCT')};  
    };
};