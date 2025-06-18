import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // cookie parser package allow us to parse cookie
        const token = req.cookies.jwt;

        if(!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        //decode the token if there is, userid is the payload we put in the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalix Token" });
        }


    } catch (error) {

    }
}