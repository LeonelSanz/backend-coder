import mongoose from "mongoose";

const collection = 'Products';

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque sagittis sem vitae placerat. Proin consequat lorem nulla. Sed at nunc orci. Praesent sem nisl.'
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    }
});
const productsModel = new mongoose.model(collection, productsSchema);
export default productsModel;