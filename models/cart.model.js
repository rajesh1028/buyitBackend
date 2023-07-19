const { mongoose, Schema } = require("mongoose");

const cartSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel }