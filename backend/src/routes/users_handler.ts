import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken'
import User from '../models/user'

function makeCookieOpt(): { sameSite: "lax" | "none" | "strict"; secure: boolean } {
    let sameSite: "lax" | "none" | "strict";
    let secure: boolean;

    if (process.env.NODE_ENV === 'development') {
        sameSite = 'lax';
        secure = false;
    } else {
        sameSite = 'none';
        secure = true;
    }
    return { sameSite, secure };
}

function isQueryError(e: any) {
    return e && e.code;
}

const login: RequestHandler = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        const secretKey = process.env.JWT_SECRET || 'defaultSercretKey';
        if (await User.validateUser(email, password)) {
            const accessToken = jwt.sign({ email }, secretKey, { expiresIn: '14d' });
            res.cookie('access-token', accessToken, makeCookieOpt());
            res.sendStatus(204);
        }
    } catch (e) {
        res.sendStatus(500);
    }
}

const join: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        await User.createUser(email, password);
    } catch (e: any) {
        if (isQueryError(e) && e.code === 'ER_DUP_ENTRY') {
            return res.sendStatus(409);
        }
        throw e;
    }
    res.sendStatus(201);
}

const logout: RequestHandler = async (req, res, next) => {
    res.clearCookie('access-token');
    res.sendStatus(200);
}

export { login, join, logout };