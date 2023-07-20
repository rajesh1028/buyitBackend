const express = require("express");
const { CartModel } = require("../models/cart.model")

const cartRouter = express.Router();
cartRouter.use(express.json());

cartRouter.get("/", async (req, res) => {
    const query = req.query
    try {
        const data = await CartModel.find(query);
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
})

cartRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await CartModel.find({ user: id });
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
})

cartRouter.post("/add", async (req, res) => {
    const { user, products } = req.body
    try {
        const items = await CartModel.findOne({ user });
        if (items) {
            let patch_items = [...items.products, ...products];
            await CartModel.findByIdAndUpdate({ "_id": items._id }, { products: patch_items });
            res.status(200).json({ "msg": "Items added to cart" });
        } else {
            const cart = new CartModel({ user, products });
            await cart.save();
            res.status(200).json({ "msg": "Added to cart" });
        }
        res.send("data");

    } catch (error) {
        console.log(error);
        res.status(400).json({ "msg": "Error in adding items to cart" });
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
        res.status(200).json({ "msg": "cart updated successfully" });
    } catch (error) {
        console.log(error)
        res.status(400).json({ "msg": "Error updating" })
    }
})

cartRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    try {
        await CartModel.findByIdAndDelete({ "_id": id });
        res.status(200).json({ "msg": "Deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(400).json({ "msg": "Error deleting" })
    }
})

module.exports = { cartRouter }