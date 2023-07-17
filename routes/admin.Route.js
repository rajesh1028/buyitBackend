const express = require("express")
const { AdminModel } = require("../models/admin.model")
const bcrypt = require("bcrypt")

const adminRouter = express.Router()

adminRouter.get("/", async (req, res) => {
    let data = await AdminModel.find();
    res.send(data);
})

adminRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        bcrypt.hash(password, 4, async (err, secure_pass) => {
            if (err) {
                console.log(err);
            } else {
                const user = new AdminModel({ name, email, password: secure_pass })
                await user.save()
                res.send("Registered successfully")
            }
        });

    } catch (error) {
        res.send("error in registering the user");
        console.log(error);
    }

})

adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await AdminModel.find({ email })
        const hashed_pass = user[0].password;
        if (user.length > 0) {
            bcrypt.compare(password, hashed_pass, (err, result) => {
                if (result) {
                    //token
                    //1.default algo HMAC SHA256
                    //2.payload { course: 'backend' }
                    //3.secret key "masai"
                    //const token = jwt.sign({ userID:user[0]._id }, 'masai');
                    res.send({ "msg": "Login Successfull" })
                } else {
                    res.send("Wrong credentials")
                    //console.log(err);
                }
            });
        } else {
            res.send("Wrong credentials")
        }
    } catch (error) {
        console.log(error)
        res.send("something went error")
    }
})

adminRouter.delete("/delete/:id", async (req, res) => {
    const obj = req.body
    const id = req.params.id
    try {
        await AdminModel.findByIdAndDelete({ "_id": id }, obj);
        res.send("Deleted successfully");
    } catch (error) {
        console.log(error)
        res.send("Error deleting")
    }
})

module.exports = { adminRouter }