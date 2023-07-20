const express = require("express");
const { ProductModel } = require("../models/product.model")

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
    const query = req.query
    try {
        const data = await ProductModel.find(query);
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
})

productRouter.get("/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const data = await ProductModel.find({ _id });
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
})

productRouter.post("/add", async (req, res) => {
    const { title, price, desc, img } = req.body

    try {
        const cart = new ProductModel({ title, price, desc, img });
        await cart.save();
        res.status(200).json({ "msg":"Registered" });
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
})

productRouter.patch("/update/:id", async (req, res) => {
    const obj = req.body
    const id = req.params.id
    try {
        await ProductModel.findByIdAndUpdate({ "_id": id }, obj);
        res.status(200).json({ "msg":"Updated successfully" });
    } catch (error) {
        console.log(error)
        res.status(400).json({error});
    }
})

productRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    try {
        await ProductModel.findByIdAndDelete({ "_id": id });
        res.status(200).json({ "msg":"Deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(400).json({error});
    }
})

module.exports = { productRouter }