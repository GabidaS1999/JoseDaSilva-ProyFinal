import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email:{
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    fullName:{
        type: String
    },
    role: {
        type: String, 
        default: 'user',
        enum: ['user', 'admin']
    },
    logedBy: String,
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts' 
    }
})

const userModel = mongoose.model(collection, schema);

export default userModel;