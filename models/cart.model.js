const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    title: String,
    price: Number,
    desc: String,
    img: String
})

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel }