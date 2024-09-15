import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js";
import productRoute from "./routes/product.route.js";
import path from "path";
import userRoute from "./routes/user.route.js";
import categoryRoute from "./routes/category.route.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

app.use(express.json()) //MW allows to accept json data in body

app.use("/api/products", productRoute)
app.use("/api/users", userRoute)
app.use("/api/categories", categoryRoute)

if (process.env.NODE_ENV === 'production') {
    //make dist folder (builded front)  as static assets
    app.use(express.static(path.join(__dirname, "frontend/dist")))

    //serve index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}


app.listen(port, (err, res) => {
    connectDB();
    console.log(`server listening on port ${port}`);
})