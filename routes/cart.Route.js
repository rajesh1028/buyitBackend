const express = require("express");
const { CartModel } = require("../models/cart.model")

const cartRouter = express.Router();
cartRouter.use(express.json());

cartRouter.get("/", async (req, res) => {
    const query = req.query
    const data = await CartModel.find(query);
    res.send(data);
})

cartRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const data = await CartModel.find({ user: id });
    res.send(data);
})

cartRouter.post("/add", async (req, res) => {
    const { user, products } = req.body
    try {
        const items = await CartModel.find({ user });
        let patch_items = [...items[0].products, ...products];
        if (items.length) {
            await CartModel.findByIdAndUpdate({ "_id": items[0]._id }, { products: patch_items });
            res.send("Items added to cart");
        } else {
            const cart = new CartModel({ user, products });
            await cart.save();
            res.send("Added to cart");
        }

    } catch (error) {
        console.log(error);
        res.send("Error in adding items to cart");
    }
})

cartRouter.patch("/update/:user_id", async (req, res) => {
    const { product } = req.body;
    const user_id = req.params.user_id;
    try {
        const data = await CartModel.find({ user: user_id });
        const products = data[0].products.filter((item) => {
            return item != product;
        });
        // console.log(data);
        const payload = {
            ...data[0]._doc,
            products
        }
        console.log(payload);
        await CartModel.findByIdAndUpdate({ "_id": data[0]._id }, payload);
        res.send("cart updated successfully");
    } catch (error) {
        console.log(error)
        res.send("Error updating")
    }
})

cartRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    try {
        await CartModel.findByIdAndDelete({ "_id": id });
        res.send("Deleted successfully");
    } catch (error) {
        console.log(error)
        res.send("Error deleting")
    }
})

module.exports = { cartRouter }