import mongoose from "mongoose";

const collection = 'Users';

const usersSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:'user'
    }
})

const userModel = mongoose.model(collection, usersSchema);

export default userModel;