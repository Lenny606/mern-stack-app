import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js";
import productRoute from "./routes/product.route.js";
import path from "path";
import userRoute from "./routes/user.route.js";
import categoryRoute from "./routes/category.route.js";
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import MongoStore from 'connect-mongo';
//import passport strategy from file
import "./config/strategies.js";


dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

app.use(express.json()) //MW allows to accept json data in body
app.use(cookieParser('cookieParser hello world'))

//////// PASSPORT + set store to DTB
app.use(session({
    secret: "test-secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60 * 60 * 24
    },
    //saves cookies into database>
    store: MongoStore.create({
        mongoUrl: process.env.DTB_URL
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/api/products", productRoute)
app.use("/api/users", userRoute)
app.use("/api/categories", categoryRoute)
app.post("/api/auth/login", passport.authenticate('local'), (req, res) => {
    res.status(200);
})

app.get("/api/auth/status", (req, res) => {
    const user = req.user;
    const session = req.session;
    console.log(session);
    if (!user) {
        res.status(401);
    } else {
        res.status(200).json({
            user,
            session
        });
    }

})
app.post("/api/auth/logout", (req, res) => {
    const user = req.user;
    if (!user) {
        res.status(401);
    } else {
        req.logout((err) => {
            if (err) {
                res.status(400);
            } else {
                res.status(200).json({
                    message:
                        "User logged out"
                })
            }
        })
    }
})

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