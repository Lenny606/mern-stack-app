import passport from "passport";
// import User from "../models/test/user.model.js";
import mongoose from "mongoose";
import UserTest from "../models/User/UserTest.model.js";
import {createUser} from "./user.controller.js";

// export const loginUser = async (req, res) => {
//     app.post("/api/auth", passport.authenticate('local'), (req, res) => {
//         res.status(200);
//     })
// }

export const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err); // Passes error to Express's default error handler
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password', success: false });
        }

        // Log the user in
        req.logIn(user, (err) => {
            if (err) {
                return next(err); // Handle error during login
            }
            return res.status(200).json({ message: 'Login successful', success: true, user });
        });
    })(req, res, next); // Call the passport.authenticate function
};

export const registerUser = async (req, res) => {
    const user = req.body // deconstruct => {body} = req
    if (!user.name) {
        return res.status(400).json({success: false, message: "Some fields ware not provided"})
    }

    const newUser = new UserTest(user)
    newUser.isRegistered = true;

    try {
        await newUser.save()
        res.status(200).json({success: true, message: "Product saved successfully", data: newUser})
    } catch (err) {
        console.log("Error saving product" + err.message)
        res.status(500).json({success: false, message: "Product not saved", error: err.message})
    }
}

export const status = async (req, res) => {
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
}

export const logout = async (req, res) => {
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
}


// app.get("/api/auth/status", (req, res) => {
//     const user = req.user;
//     const session = req.session;
//     console.log(session);
//     if (!user) {
//         res.status(401);
//     } else {
//         res.status(200).json({
//             user,
//             session
//         });
//     }
//
// })
// app.post("/api/auth/logout", (req, res) => {
//     const user = req.user;
//     if (!user) {
//         res.status(401);
//     } else {
//         req.logout((err) => {
//             if (err) {
//                 res.status(400);
//             } else {
//                 res.status(200).json({
//                     message:
//                         "User logged out"
//                 })
//             }
//         })
//     }
// })