import jwt from 'jsonwebtoken'
import { RequestHandler } from "express";

export const authenticateUser: RequestHandler = async (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey)
        return;

    if (!accessToken) {
        return res.sendStatus(401);
    }
    let decoded: any = jwt.verify(accessToken, secretKey);
    if (!decoded)
        return res.sendStatus(401);
    const userToken = { userId: decoded.userId };
    req.user = userToken;
    return next();
}