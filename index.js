const express = require("express");
const { connection } = require("./configs/db")
const { userRouter } = require("./routes/user.route")
const { productRouter } = require("./routes/product.Route")
const { cartRouter } = require("./routes/cart.Route")
const { adminRouter } = require("./routes/admin.Route")
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 4500;
const { authenticate } = require("./middlewares/authenticate.middleware");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home Page");
})
app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use(authenticate)

app.use("/products", productRouter);
app.use("/cart", cartRouter);


app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running at ${process.env.port}`);
})
