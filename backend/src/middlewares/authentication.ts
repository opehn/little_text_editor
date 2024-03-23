import jwt from 'jsonwebtoken'
import { RequestHandler } from "express";

const authenticateUser: RequestHandler = async (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    const secretKey = 'soije';

    if (!accessToken) {
        return res.sendStatus(401);
    }
    let decoded: any = jwt.verify(accessToken, secretKey);
    if (!decoded)
        return res.sendStatus(401);
    req.user = decoded.email;
    return next();
}