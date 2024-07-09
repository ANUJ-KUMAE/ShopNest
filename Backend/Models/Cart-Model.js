const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const  CartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type:ObjectId,
                ref: 'ProductModel',
            },
            quantity: Number,
            price: Number
        },
    ],
    totalItems: Number,
    totalPrice:Number,
    user:{
        type:ObjectId,
        ref:'UserModel'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
}
)

const CartModel = new mongoose.model('CartModel', CartSchema);
module.exports = CartModel;