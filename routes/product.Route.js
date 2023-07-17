const express = require("express");
const { ProductModel } = require("../models/product.model")

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
    const query = req.query
    const data = await ProductModel.find(query);
    res.send(data);
})

productRouter.post("/add", async (req, res) => {
    const { title, price, desc, img } = req.body

    try {
        const cart = new ProductModel({ title, price, desc, img });
        await cart.save()
        res.send("Registered");

    } catch (error) {
        console.log(error);
        res.send("Error in creating");
    }
})

productRouter.patch("/update/:id", async (req, res) => {
    const obj = req.body
    const id = req.params.id
    try {
        await ProductModel.findByIdAndUpdate({"_id":id},obj);
        res.send("Updated successfully");
    } catch (error) {
        console.log(error)
        res.send("Error updating")
    }
})

productRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    try {
        await ProductModel.findByIdAndDelete({"_id":id});
        res.send("Deleted successfully");
    } catch (error) {
        console.log(error)
        res.send("Error deleting")
    }
})

module.exports = { productRouter }