import express from 'express';
import {connectDB} from "./config/db.js";
import productRoute from "./routes/product.route.js";


const app = express();

app.use(express.json()) //MW allows to accept json data in body

app.use("/api/products", productRoute)


app.listen(5000, (err, res) => {
    connectDB();
    console.log("server listening on port 5000");
})