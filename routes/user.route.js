const express = require("express");
const { UserModel } = require("../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get("/", async (req, res) => {
    try {
        let user = await UserModel.find();
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
})

userRouter.post("/register", async (req, res) => {
    const { email, password, name } = req.body

    try {
        bcrypt.hash(password, 5, async (err, secure_pwd) => {
            if (err) {
                console.log(err);
            } else {
                const user = new UserModel({ email, password: secure_pwd, name });
                await user.save()
                res.status(200).json({ "msg": "Registered Successfully", user });
            }
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ "msg": "Error in registering" });
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        let hashed_pwd = user[0].password
        if (user.length > 0) {
            bcrypt.compare(password, hashed_pwd, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, process.env.key, { expiresIn: '4h' })
                    res.status(200).json({ "msg": "Login Successful", "token": token, userID: user[0]._id });
                } else {
                    res.status(400).json({ "msg": "Wrong credentials" });
                }
            })
        } else {
            res.status(400).json({ "msg": "Wrong credentials" });
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ "msg": "Error in login in" });
    }
})

module.exports = { userRouter }