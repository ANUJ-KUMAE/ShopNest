require('dotenv').config()
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const DBConnection = require("./Database-Connection/Config")
const Authrouter = require("./Router/Auth-Router");
const errorMiddleware = require("./Middleware/error-Middleware");
const AdminRouter = require("./Router/Admin-Router");
const ProductRouter = require("./Router/Product-Router")
const OrderRouter = require("./Router/Order-Router");
const PaymentRouter = require("./Router/Payment-Router");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser")

var corsOption = {
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true,
};

app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true  }));
app.use(express.urlencoded({extended:true, limit:'50mb'}))

// {extended:true, limit:'50mb'}

app.use("/Api/auth", Authrouter);
app.use("/Api/Admin", AdminRouter);
app.use("/Api/user", ProductRouter);
app.use("/Api/users/items", OrderRouter);
app.use("/Api/Stripe", PaymentRouter);

app.use(errorMiddleware);

const port = 8050;

DBConnection().then(() => {
    app.listen(port, () => {
        console.log(`App is running on port ${port}`);
    });
})
