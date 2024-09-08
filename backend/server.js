import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js";
import productRoute from "./routes/product.route.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json()) //MW allows to accept json data in body

app.use("/api/products", productRoute)


app.listen(port, (err, res) => {
    connectDB();
    console.log(`server listening on port ${port}`);
})