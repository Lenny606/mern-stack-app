import express from 'express';
import {connectDB} from "./config/db.js";


const app = express();


app.get('/products', (req, res) => {
    res.send("hello")
})

app.listen(5000, (err, res) => {
    connectDB();
    console.log("server listening on port 5000");
})